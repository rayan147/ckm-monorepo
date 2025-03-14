<!-- src/lib/recipe/tabs/NutritionTab.svelte -->
<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Separator } from '$lib/components/ui/separator';
  import { Button } from '$lib/components/ui/button';
  import { Progress } from '$lib/components/ui/progress';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';
  import { RotateCw, AlertCircle } from 'lucide-svelte';
  import { api } from '@ckm/lib-api';
  import { toast } from 'svelte-sonner';
  import IngredientMatchDialog from './ingredient-match-dialog.svelte';

  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;

  let calculating = $state(false);
  let dialogOpen = $state(false);
  let usdaMatches = $state<any[]>([]);
  let currentIngredient = $state<any>(null);
  let ingredientQueue = $state<any[]>([]);
  let processingIngredients = $state(false);

  // Daily recommended values
  const dailyValues = {
    calories: 2000,
    fat: 65,
    carbohydrates: 300,
    fiber: 25,
    protein: 50,
    sugar: 50,
    sodium: 2300 // in mg
  };

  async function calculateNutrition() {
    calculating = true;

    try {
      if (!recipe) throw Error(`A recipe is needed`);
      // First, check if any ingredients are missing nutrition data
      const missingNutritionIngredients = recipe.ingredients.filter(
        (item) =>
          item.ingredient &&
          !item.ingredient.calories &&
          !item.ingredient.protein &&
          !item.ingredient.carbohydrates &&
          !item.ingredient.fat
      );

      // If there are ingredients missing nutrition data, start the matching process
      if (missingNutritionIngredients.length > 0) {
        // Set up the queue of ingredients to process
        ingredientQueue = [...missingNutritionIngredients];
        processingIngredients = true;

        // Process the first ingredient
        await processNextIngredient();
      } else {
        // If all ingredients have nutrition data, just calculate
        await performCalculation();
      }
    } catch (error: any) {
      console.error('Error initiating nutrition calculation:', error);
      toast.error('Calculation error', {
        description: error.message || 'An unknown error occurred'
      });
      calculating = false;
      processingIngredients = false;
    }
  }

  async function processNextIngredient() {
    // If queue is empty, finish processing
    if (ingredientQueue.length === 0) {
      processingIngredients = false;
      // Perform final calculation
      await performCalculation();
      return;
    }

    // Get the next ingredient
    currentIngredient = ingredientQueue.shift();
    console.log('Processing ingredient:', currentIngredient.ingredient.name);

    try {
      // Search USDA for matches using the contract-aligned endpoint
      console.log('Searching USDA for:', currentIngredient.ingredient.name);
      const { status, body } = await api.nutrition.ingredientNutrition({
        query: {
          query: currentIngredient.ingredient.name,
          pageSize: 10
        }
      });

      console.log('Search response:', status, body);
      console.log('Response foods array:', body?.foods);

      if (status === 200 && body?.foods && body.foods.length > 0) {
        // First set the matches, then open the dialog
        usdaMatches = [...body.foods]; // Create a new array to ensure reactivity
        console.log('Set usdaMatches to:', usdaMatches.length, 'items');

        // Give time for the state to update
        setTimeout(() => {
          dialogOpen = true;
          console.log('Dialog should now be open, dialogOpen =', dialogOpen);
        }, 100);
      } else {
        console.log('No matches found or empty response, continuing to next ingredient');
        // Continue to next ingredient
        processNextIngredient();
      }
    } catch (error) {
      console.error('Error searching USDA:', error);
      // Continue to next ingredient
      processNextIngredient();
    }
  }

  async function handleIngredientMatchSelect(match: any) {
    try {
      // Import nutrition data from selected match using the contract-aligned endpoint
      const { status, body } = await api.nutrition.importUSDANutrition({
        params: { id: currentIngredient.ingredient.id },
        body: { usdaFoodId: match.fdcId.toString() }
      });

      if (status === 200 && body.success) {
        toast.success('Nutrition imported', {
          description: `Imported nutrition data for ${currentIngredient.ingredient.name}`
        });
      } else {
        toast.error('Import issue', {
          description: body.message || `Issue with ${currentIngredient.ingredient.name} data`
        });
      }

      // Continue with next ingredient
      processNextIngredient();
    } catch (error) {
      console.error('Error importing nutrition:', error);
      toast.error('Import error', {
        description: `Failed to import nutrition data for ${currentIngredient.ingredient.name}`
      });
      // Continue with next ingredient anyway
      processNextIngredient();
    }
  }

  function handleIngredientMatchCancel() {
    // Skip current ingredient and proceed to next
    processNextIngredient();
  }

  async function searchUsdaForIngredient(query: string) {
    const { status, body } = await api.nutrition.ingredientNutrition({
      query: {
        query: query,
        pageSize: 10
      }
    });

    console.log(`searchUsdaForIngredient body is ${body}`);
    if (status === 200 && body?.foods) {
      usdaMatches = body.foods;
    } else {
      usdaMatches = [];
    }
  }

  // In NutritionTab.svelte, update the performCalculation function

  async function performCalculation() {
    try {
      // Make sure to pass the recipe ID correctly as a parameter
      const { status, body } = await api.nutrition.calculateRecipeNutrition({
        params: { id: recipe.id } // Make sure this is properly structured
      });

      if (status === 200 && body) {
        // Update the recipe's nutrition info
        recipe.nutritionalInfo = body;

        toast.success('Nutrition updated', {
          description: 'Recipe nutrition has been calculated'
        });

        // Refresh recipe data to get updated ingredients with nutrition
        const refreshedRecipe = await api.recipe.getRecipe({
          params: { id: recipe.id } // Make sure params is structured correctly
        });

        if (refreshedRecipe.status === 200) {
          // Update recipe with refreshed data
          Object.assign(recipe, refreshedRecipe.body);
        }
      } else {
        toast.error('Calculation failed', {
          description: 'There was a problem calculating nutrition'
        });
      }
    } catch (error) {
      console.error('Error calculating nutrition:', error);
      toast.error('Calculation error', {
        description: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    } finally {
      calculating = false;
      processingIngredients = false;
    }
  }
  // Check if nutrition data is missing or incomplete
  const hasIncompleteData = $derived(
    !recipe.nutritionalInfo ||
      (recipe.nutritionalInfo.calories === 0 &&
        recipe.nutritionalInfo.protein === 0 &&
        recipe.nutritionalInfo.carbohydrates === 0 &&
        recipe.nutritionalInfo.fat === 0)
  );

  // Check if ingredient nutrition is missing
  const missingIngredientData = $derived(
    recipe.ingredients?.some(
      (item) =>
        !item.ingredient ||
        (item.ingredient.calories === undefined &&
          item.ingredient.protein === undefined &&
          item.ingredient.carbohydrates === undefined &&
          item.ingredient.fat === undefined)
    )
  );

  // Compute the number of ingredients with missing nutrition
  const missingNutritionCount = $derived(
    recipe.ingredients?.filter(
      (item) =>
        item.ingredient &&
        item.ingredient.calories === undefined &&
        item.ingredient.protein === undefined &&
        item.ingredient.carbohydrates === undefined &&
        item.ingredient.fat === undefined
    ).length || 0
  );
</script>

<section aria-labelledby="nutrition-tab-heading">
  <Card.Root>
    <Card.Header>
      <div class="flex items-center justify-between">
        <div>
          <Card.Title id="nutrition-tab-heading">Nutrition Information</Card.Title>
          <Card.Description>Nutritional facts per serving</Card.Description>
        </div>

        <Button
          variant="outline"
          size="sm"
          onclick={calculateNutrition}
          disabled={calculating || processingIngredients}
        >
          <RotateCw
            class={`h-4 w-4 mr-2 ${calculating || processingIngredients ? 'animate-spin' : ''}`}
          />
          {#if calculating || processingIngredients}
            {processingIngredients ? 'Matching Ingredients...' : 'Calculating...'}
          {:else}
            Calculate Nutrition
          {/if}
        </Button>
      </div>
    </Card.Header>

    <Card.Content>
      {#if hasIncompleteData}
        <div class="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
          <div class="flex">
            <AlertCircle class="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <h3 class="font-medium text-amber-800">Missing nutrition data</h3>
              <p class="text-sm text-amber-700">
                This recipe doesn't have complete nutrition information. Click "Calculate Nutrition"
                to analyze ingredients and generate nutritional facts.
              </p>

              {#if missingIngredientData}
                <p class="text-sm text-amber-700 mt-2">
                  {missingNutritionCount} ingredient{missingNutritionCount !== 1 ? 's' : ''}
                  {missingNutritionCount !== 1 ? 'are' : 'is'} missing nutrition data. You'll be prompted
                  to select matching ingredients from the USDA database.
                </p>
              {/if}
            </div>
          </div>
        </div>
      {/if}

      <div class="space-y-8">
        <!-- Main nutrition facts -->
        <div>
          <h3 class="text-lg font-medium mb-4">Nutrition Facts</h3>

          <!-- Calories -->
          <div class="mb-4">
            <div class="flex justify-between">
              <span class="font-semibold">Calories</span>
              <span class="text-xl font-bold"
                >{Math.round(recipe.nutritionalInfo?.calories || 0)}</span
              >
            </div>
          </div>

          <Separator class="my-4" />

          <!-- Macronutrients -->
          <div class="space-y-6">
            <!-- Protein -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <span>Protein</span>
                <div class="text-right">
                  <span>{recipeState.formatNutrient(recipe.nutritionalInfo?.protein || 0)}g</span>
                  <span class="text-xs text-muted-foreground ml-1">
                    ({recipeState.getDailyValuePercentage(
                      recipe.nutritionalInfo?.protein || 0,
                      dailyValues.protein
                    )}% DV)
                  </span>
                </div>
              </div>
              <Progress
                value={recipeState.getDailyValuePercentage(
                  recipe.nutritionalInfo?.protein || 0,
                  dailyValues.protein
                )}
              />
            </div>

            <!-- Carbohydrates -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <span>Carbohydrates</span>
                <div class="text-right">
                  <span
                    >{recipeState.formatNutrient(recipe.nutritionalInfo?.carbohydrates || 0)}g</span
                  >
                  <span class="text-xs text-muted-foreground ml-1">
                    ({recipeState.getDailyValuePercentage(
                      recipe.nutritionalInfo?.carbohydrates || 0,
                      dailyValues.carbohydrates
                    )}% DV)
                  </span>
                </div>
              </div>
              <Progress
                value={recipeState.getDailyValuePercentage(
                  recipe.nutritionalInfo?.carbohydrates || 0,
                  dailyValues.carbohydrates
                )}
              />
            </div>

            <!-- Fat -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <span>Fat</span>
                <div class="text-right">
                  <span>{recipeState.formatNutrient(recipe.nutritionalInfo?.fat || 0)}g</span>
                  <span class="text-xs text-muted-foreground ml-1">
                    ({recipeState.getDailyValuePercentage(
                      recipe.nutritionalInfo?.fat || 0,
                      dailyValues.fat
                    )}% DV)
                  </span>
                </div>
              </div>
              <Progress
                value={recipeState.getDailyValuePercentage(
                  recipe.nutritionalInfo?.fat || 0,
                  dailyValues.fat
                )}
              />
            </div>
          </div>

          <Separator class="my-4" />

          <!-- Additional nutrients -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="text-muted-foreground text-sm">Fiber</span>
              <p class="font-medium">
                {recipeState.formatNutrient(recipe.nutritionalInfo?.fiber || 0)}g
                <span class="text-xs text-muted-foreground">
                  ({recipeState.getDailyValuePercentage(
                    recipe.nutritionalInfo?.fiber || 0,
                    dailyValues.fiber
                  )}% DV)
                </span>
              </p>
            </div>

            <div>
              <span class="text-muted-foreground text-sm">Sugar</span>
              <p class="font-medium">
                {recipeState.formatNutrient(recipe.nutritionalInfo?.sugar || 0)}g
                <span class="text-xs text-muted-foreground">
                  ({recipeState.getDailyValuePercentage(
                    recipe.nutritionalInfo?.sugar || 0,
                    dailyValues.sugar
                  )}% DV)
                </span>
              </p>
            </div>

            <div>
              <span class="text-muted-foreground text-sm">Sodium</span>
              <p class="font-medium">
                {recipeState.formatNutrient(recipe.nutritionalInfo?.sodium || 0)}mg
                <span class="text-xs text-muted-foreground">
                  ({recipeState.getDailyValuePercentage(
                    recipe.nutritionalInfo?.sodium || 0,
                    dailyValues.sodium
                  )}% DV)
                </span>
              </p>
            </div>

            <div>
              <span class="text-muted-foreground text-sm">Serving Size</span>
              <p class="font-medium">
                {recipe.nutritionalInfo?.servingSize || recipe.servings || 1}
                {recipe.nutritionalInfo?.servingUnit || 'serving'}
              </p>
            </div>
          </div>
        </div>

        <!-- Ingredient nutrition contribution -->
        <div>
          <h3 class="text-lg font-medium mb-4">Ingredient Breakdown</h3>

          {#if recipe.ingredients && recipe.ingredients.length > 0}
            <div class="border rounded-lg overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ingredient
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Calories
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Protein
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {#each recipe.ingredients as ingredient}
                    <tr class={!ingredient.ingredient?.calories ? 'bg-amber-50' : ''}>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <div class="text-sm font-medium">
                          {ingredient.ingredient?.name || 'Unknown ingredient'}
                        </div>
                        {#if !ingredient.ingredient?.calories}
                          <div class="text-xs text-amber-600">Missing nutrition data</div>
                        {/if}
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm">
                        {ingredient.quantity.toFixed(1)}
                        {ingredient.unit}
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm">
                        {ingredient.ingredient?.calories !== undefined &&
                        ingredient.ingredient.calories !== null
                          ? Math.round(
                              (ingredient.ingredient.calories * ingredient.quantity) /
                                100 /
                                (recipe.servings || 1)
                            )
                          : '—'} cal
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm">
                        {ingredient.ingredient?.protein !== undefined &&
                        ingredient.ingredient.protein !== null
                          ? (
                              (ingredient.ingredient.protein * ingredient.quantity) /
                              100 /
                              (recipe.servings || 1)
                            ).toFixed(1)
                          : '—'} g
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {:else}
            <p class="text-muted-foreground italic">No ingredients added to this recipe yet.</p>
          {/if}
        </div>
      </div>
    </Card.Content>
  </Card.Root>
</section>

<!-- Ingredient matching dialog -->
<IngredientMatchDialog
  open={dialogOpen}
  onOpenChange={(open) => (dialogOpen = open)}
  ingredientName={currentIngredient?.ingredient?.name || ''}
  matches={usdaMatches}
  onSelect={handleIngredientMatchSelect}
  onCancel={handleIngredientMatchCancel}
  onSearch={searchUsdaForIngredient}
/>


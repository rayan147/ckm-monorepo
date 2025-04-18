<!-- src/lib/recipe/tabs/NutritionTab.svelte -->
<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Progress } from '$lib/components/ui/progress';
  import { Separator } from '$lib/components/ui/separator';
  import * as Table from '$lib/components/ui/table';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';
  import { zodSchemas, type RecipeNutrition } from '@ckm/db';
  import { api } from '@ckm/lib-api';
  import { AlertCircle, Check, Info, RotateCw } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';
  import { z } from 'zod';
  import IngredientMatchDialog from './ingredient-match-dialog.svelte';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';

  let { dailyValues, form, usdaMatches = [] } = $props();

  const RecipeIngredientSchema = zodSchemas.RecipeIngredientSchema.extend({
    ingredient: zodSchemas.IngredientSchema
  });

  type RecipeIngredientIncludeIngredient = z.infer<typeof RecipeIngredientSchema>;
  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;

  // State variables
  let calculating = $state(false);
  let dialogOpen = $state(false);
  let currentIngredient = $state<any>(null);
  let processingIngredients = $state(false);
  let ingredientsNeedingMatching = $state<any[]>([]);
  let currentIngredientIndex = $state(0);
  let calculationComplete = $state(false);

  // Manual nutrition input states
  let showManualInputDialog = $state(false);
  let selectedIngredient = $state<any>(null);
  let manualNutritionData = $state<Partial<RecipeNutrition>>({
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    containsShellfish: false,
    containsFish: false,
    containsSesame: false,
    containsSoy: false,
    containsEggs: false,
    containsDairy: false,
    containsNuts: false,
    containsGluten: false
  });

  // Get ingredients that need nutrition data
  function getIngredientsNeedingMatching() {
    return recipe.ingredients.filter(
      (item) =>
        item.ingredient &&
        !item.ingredient.calories &&
        !item.ingredient.protein &&
        !item.ingredient.carbohydrates &&
        !item.ingredient.fat
    );
  }

  async function startNutritionCalculation() {
    calculating = true;
    calculationComplete = false;

    try {
      // Find ingredients that need nutrition data
      ingredientsNeedingMatching = getIngredientsNeedingMatching();

      if (ingredientsNeedingMatching.length > 0) {
        // If there are ingredients needing matching, start the process
        processingIngredients = true;
        currentIngredientIndex = 0;
        currentIngredient = ingredientsNeedingMatching[0];

        // Search for the first ingredient
        await searchForCurrentIngredient();
        dialogOpen = true;
      } else {
        // If all ingredients have nutrition data, just calculate
        await calculateNutrition();
      }
    } catch (error: any) {
      console.error('Error starting nutrition calculation:', error);
      toast.error('Calculation error', {
        description: error.message || 'An unknown error occurred'
      });
      resetCalculationState();
    }
  }

  async function searchForCurrentIngredient() {
    if (!currentIngredient?.ingredient?.name) return;

    try {
      const { status, body } = await api.nutrition.ingredientNutrition({
        query: {
          query: currentIngredient.ingredient.name,
          pageSize: 10
        }
      });

      if (status === 200 && body?.foods && body.foods.length > 0) {
        usdaMatches = [...body.foods];
      } else {
        usdaMatches = [];
        toast.warning('No matches found', {
          description: `No nutrition matches found for "${currentIngredient.ingredient.name}"`
        });
      }
    } catch (error) {
      console.error('Error searching for ingredient:', error);
      usdaMatches = [];
      toast.error('Search error', {
        description: 'Could not search for ingredient matches'
      });
    }
  }

  async function handleIngredientMatchSelect(match: any) {
    try {
      // Import nutrition data from selected match
      const { status, body } = await api.nutrition.importUSDANutrition({
        params: { id: currentIngredient.ingredient.id },
        body: { usdaFoodId: match.fdcId.toString() }
      });

      if (status === 200 && body.success) {
        toast.success('Nutrition imported', {
          description: `Imported nutrition data for ${currentIngredient.ingredient.name}`
        });
        // Update the ingredients list to reflect the one with matched nutrition
        const updatedNeedingMatching = getIngredientsNeedingMatching();
        ingredientsNeedingMatching = updatedNeedingMatching;
      } else {
        toast.error('Import issue', {
          description: body.message || `Issue with ${currentIngredient.ingredient.name} data`
        });
      }

      // Move to next ingredient or complete
      moveToNextIngredient();
    } catch (error) {
      console.error('Error importing nutrition:', error);
      toast.error('Import error', {
        description: `Failed to import nutrition data for ${currentIngredient.ingredient.name}`
      });
      moveToNextIngredient();
    }
  }

  function handleIngredientMatchCancel() {
    // Skip current ingredient
    moveToNextIngredient();
  }

  async function moveToNextIngredient() {
    // Update the list of ingredients still needing matching
    const updatedNeedingMatching = getIngredientsNeedingMatching();
    ingredientsNeedingMatching = updatedNeedingMatching;

    // If this was the last ingredient or no more ingredients need matching, complete the process
    if (
      ingredientsNeedingMatching.length === 0 ||
      currentIngredientIndex >= ingredientsNeedingMatching.length - 1
    ) {
      completeIngredientMatching();
    } else {
      // Move to next ingredient
      currentIngredientIndex++;
      currentIngredient = ingredientsNeedingMatching[currentIngredientIndex];
      await searchForCurrentIngredient();
    }
  }

  async function completeIngredientMatching() {
    // Close the dialog
    dialogOpen = false;
    processingIngredients = false;

    // Calculate nutrition with the matches we have
    await calculateNutrition();
  }

  async function calculateNutrition() {
    try {
      const { status, body } = await api.nutrition.calculateRecipeNutrition({
        params: { id: recipe.id }
      });

      if (status === 200 && body) {
        // Update the recipe's nutrition info
        recipe.nutritionalInfo = body;

        toast.success('Nutrition calculated', {
          description: 'Recipe nutrition has been calculated successfully'
        });

        // Refresh recipe data to get updated ingredients with nutrition
        const refreshedRecipe = await api.recipe.getRecipe({
          params: { id: recipe.id }
        });

        if (refreshedRecipe.status === 200) {
          // Update recipe with refreshed data
          Object.assign(recipe, refreshedRecipe.body);
        }

        // Mark calculation as complete
        calculationComplete = true;
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
      resetCalculationState();
    }
  }

  function resetCalculationState() {
    calculating = false;
    processingIngredients = false;
    currentIngredient = null;
    currentIngredientIndex = 0;
  }

  async function searchUsdaForIngredient(query: string) {
    try {
      const { status, body } = await api.nutrition.ingredientNutrition({
        query: {
          query: query,
          pageSize: 10
        }
      });

      if (status === 200 && body?.foods) {
        usdaMatches = body.foods;
      } else {
        usdaMatches = [];
        toast.warning('No matches found', {
          description: `No matches found for "${query}"`
        });
      }
    } catch (error) {
      console.error('Error searching for ingredient:', error);
      usdaMatches = [];
      toast.error('Search error', {
        description: 'Could not search the USDA database'
      });
    }
  }

  function startMatchingForIngredient(ingredient: RecipeIngredientIncludeIngredient) {
    currentIngredient = ingredient;
    // Use goto to navigate with the query parameter
    goto(`?matchIngredient=${encodeURIComponent(ingredient.ingredient?.name || '')}`, {
      keepFocus: true
    });
    // Dialog will show based on usdaMatches from the load function
    dialogOpen = true;
  }

  // Open the manual nutrition input dialog
  function openManualInputDialog(ingredient: RecipeIngredientIncludeIngredient) {
    selectedIngredient = ingredient;

    // Pre-fill existing values if they exist
    if (ingredient.ingredient) {
      manualNutritionData = {
        calories: ingredient.nutrition?.calories || ingredient.ingredient.calories || 0,
        protein: ingredient.nutrition?.protein || ingredient.ingredient.protein || 0,
        carbohydrates:
          ingredient.nutrition?.carbohydrates || ingredient.ingredient.carbohydrates || 0,
        fat: ingredient.nutrition?.fat || ingredient.ingredient.fat || 0,
        fiber: ingredient.nutrition?.fiber || ingredient.ingredient.fiber || 0,
        sugar: ingredient.nutrition?.sugar || ingredient.ingredient.sugar || 0,
        sodium: ingredient.nutrition?.sodium || ingredient.ingredient.sodium || 0,
        // Always set allergen properties with defaults
        containsGluten: ingredient.allergens?.containsGluten || false,
        containsDairy: ingredient.allergens?.containsDairy || false,
        containsNuts: ingredient.allergens?.containsNuts || false,
        containsEggs: ingredient.allergens?.containsEggs || false,
        containsSoy: ingredient.allergens?.containsSoy || false,
        containsFish: ingredient.allergens?.containsFish || false,
        containsShellfish: ingredient.allergens?.containsShellfish || false,
        containsSesame: ingredient.allergens?.containsSesame || false
      };
    } else {
      // Reset to defaults
      manualNutritionData = {
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
        sodium: 0,
        containsGluten: false,
        containsDairy: false,
        containsNuts: false,
        containsEggs: false,
        containsSoy: false,
        containsFish: false,
        containsShellfish: false,
        containsSesame: false
      };
    }

    showManualInputDialog = true;
  }

  // Validate nutrition data to catch unrealistic values
  function validateNutritionData(data) {
    const maxValues = {
      calories: 1000, // Per 100g, most calorie-dense foods are <900 kcal/100g
      protein: 100, // 100g of pure protein would be 100g
      carbohydrates: 100,
      fat: 100,
      fiber: 50,
      sugar: 100,
      sodium: 10000 // Most high-sodium foods have <3000mg/100g
    };

    const warnings = [];

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'number') {
        if (value < 0) {
          warnings.push(`${key} cannot be negative`);
        } else if (maxValues[key] && value > maxValues[key]) {
          warnings.push(`${key} value (${value}) seems very high for a 100g portion`);
        }
      }
    }

    // Check that macros don't exceed 100g total in 100g of food
    const macroSum = (data.protein || 0) + (data.carbohydrates || 0) + (data.fat || 0);
    if (macroSum > 100) {
      warnings.push(
        `Total of protein, carbs, and fat (${macroSum.toFixed(1)}g) exceeds 100g for a 100g portion`
      );
    }

    return warnings;
  }

  // Save manually entered nutrition data
  async function saveManualNutritionData() {
    try {
      if (!selectedIngredient || !selectedIngredient.ingredient) {
        toast.error('Error', { description: 'No ingredient selected' });
        return;
      }

      // Validate the entered data
      const validationWarnings = validateNutritionData(manualNutritionData);

      if (validationWarnings.length > 0) {
        // Show warnings but allow user to proceed if they confirm
        const confirmed = window.confirm(
          `Please review these potential issues with the nutrition data:\n\n` +
            `${validationWarnings.join('\n')}\n\n` +
            `Would you still like to save these values?`
        );

        if (!confirmed) {
          return;
        }
      }

      // Call API to update the ingredient with manual nutrition data
      const { status, body } = await api.nutrition.updateManualNutrition({
        params: { id: selectedIngredient.ingredient.id },
        body: manualNutritionData
      });

      if (status === 200 && body.success) {
        toast.success('Nutrition updated', {
          description: `Manually entered nutrition data saved for ${selectedIngredient.ingredient.name}`
        });

        // Update ingredient in the UI
        selectedIngredient.ingredient = {
          ...selectedIngredient.ingredient,
          ...manualNutritionData
        };

        // Close dialog
        showManualInputDialog = false;

        // Recalculate nutrition if needed
        await calculateNutrition();
      } else {
        toast.error('Update failed', {
          description: body.message || 'Failed to update nutrition data'
        });
      }
    } catch (error) {
      console.error('Error saving manual nutrition data:', error);
      toast.error('Update error', {
        description: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    }
  }

  // Calculate nutrition per serving more safely
  function calculateNutritionPerServing(value, quantity, unit) {
    if (value === undefined || value === null) return 0;

    // Convert to number if it's a string
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    const numericQuantity = typeof quantity === 'string' ? parseFloat(quantity) : quantity;

    if (isNaN(numericValue) || isNaN(numericQuantity) || numericQuantity <= 0) return 0;

    // Calculate nutrition value per serving
    const servings = recipe.servings || 1;
    return (numericValue * numericQuantity) / 100 / servings;
  }

  // Format number to avoid excessive decimal places
  function formatNumber(value, decimals = 1) {
    if (value === undefined || value === null) return '0';

    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numericValue)) return '0';

    // For values less than 1, show one decimal place
    // For larger values, round to the nearest integer
    return numericValue < 1 ? numericValue.toFixed(decimals) : Math.round(numericValue).toString();
  }

  // Derived states for UI
  const hasIncompleteData = $derived(
    !recipe.nutritionalInfo ||
      (recipe.nutritionalInfo.calories === 0 &&
        recipe.nutritionalInfo.protein === 0 &&
        recipe.nutritionalInfo.carbohydrates === 0 &&
        recipe.nutritionalInfo.fat === 0)
  );

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

  // Progress tracking for the matching process
  const matchingProgress = $derived(
    processingIngredients && ingredientsNeedingMatching.length > 0
      ? `Matching ingredient ${currentIngredientIndex + 1} of ${ingredientsNeedingMatching.length}`
      : ''
  );

  // Calculate completion percentage
  const completionPercentage = $derived(() => {
    if (!recipe.ingredients || recipe.ingredients.length === 0) return 100;

    const total = recipe.ingredients.length;
    const missing = missingNutritionCount;
    return Math.round(((total - missing) / total) * 100);
  });

  // Export functionality for institutional use
  function exportNutritionData() {
    if (!recipe.nutritionalInfo) {
      toast.error('Error', { description: 'No nutrition data available to export' });
      return;
    }

    try {
      // Create a basic CSV string
      const nutritionData = [
        ['Nutrition Facts - ' + recipe.name, ''],
        [
          'Serving Size',
          `${recipe.nutritionalInfo.servingSize || recipe.servings || 1} ${recipe.nutritionalInfo.servingUnit || 'serving'}`
        ],
        ['Calories', Math.round(recipe.nutritionalInfo.calories || 0)],
        ['Protein', `${formatNumber(recipe.nutritionalInfo.protein || 0)}g`],
        ['Carbohydrates', `${formatNumber(recipe.nutritionalInfo.carbohydrates || 0)}g`],
        ['Fat', `${formatNumber(recipe.nutritionalInfo.fat || 0)}g`],
        ['Fiber', `${formatNumber(recipe.nutritionalInfo.fiber || 0)}g`],
        ['Sugar', `${formatNumber(recipe.nutritionalInfo.sugar || 0)}g`],
        ['Sodium', `${formatNumber(recipe.nutritionalInfo.sodium || 0)}mg`],
        ['', ''],
        ['Allergen Information', ''],
        ['Contains Gluten', recipe.nutritionalInfo.containsGluten ? 'Yes' : 'No'],
        ['Contains Dairy', recipe.nutritionalInfo.containsDairy ? 'Yes' : 'No'],
        ['Contains Nuts', recipe.nutritionalInfo.containsNuts ? 'Yes' : 'No'],
        ['Contains Eggs', recipe.nutritionalInfo.containsEggs ? 'Yes' : 'No'],
        ['Contains Soy', recipe.nutritionalInfo.containsSoy ? 'Yes' : 'No'],
        ['Contains Fish', recipe.nutritionalInfo.containsFish ? 'Yes' : 'No'],
        ['Contains Shellfish', recipe.nutritionalInfo.containsShellfish ? 'Yes' : 'No'],
        ['Contains Sesame', recipe.nutritionalInfo.containsSesame ? 'Yes' : 'No']
      ]
        .map((row) => row.join(','))
        .join('\n');

      // Create and trigger download
      const blob = new Blob([nutritionData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${recipe.name.replace(/[^a-zA-Z0-9]/g, '_')}_nutrition.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Export successful', {
        description: 'Nutrition data has been exported to CSV'
      });
    } catch (error) {
      console.error('Error exporting nutrition data:', error);
      toast.error('Export failed', {
        description: 'Could not export nutrition data'
      });
    }
  }
</script>

<section aria-labelledby="nutrition-tab-heading" class="max-w-4xl mx-auto">
  <Card.Root
    class="border-0 shadow-md rounded-xl overflow-hidden"
    role="region"
    aria-label="Nutrition Information Panel"
  >
    <Card.Header class="bg-gradient-to-r from-green-50 to-blue-50 pb-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Card.Title id="nutrition-tab-heading" class="text-2xl font-bold text-gray-800"
            >Nutrition Information</Card.Title
          >
          <Card.Description class="text-gray-600" id="nutrition-description"
            >Detailed nutritional facts per serving</Card.Description
          >
        </div>

        <div class="flex items-center gap-3">
          {#if processingIngredients && matchingProgress}
            <div
              class="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full inline-flex items-center"
              role="status"
              aria-live="polite"
            >
              <Info class="h-4 w-4 mr-2 text-blue-500" aria-hidden="true" />
              {matchingProgress}
            </div>
          {/if}
          {#if form?.error}
            <p class="text-red-500">{form.error}</p>
          {/if}
          <form
            method="POST"
            action="?/calculateNutrition"
            use:enhance={() => {
              calculating = true;
              return async ({ result, update }) => {
                // Reset state
                console.log({ result });
                calculating = false;
                ingredientsNeedingMatching = getIngredientsNeedingMatching();
                if (ingredientsNeedingMatching.length > 0) {
                  // If there are ingredients needing matching, start the process
                  processingIngredients = true;
                  currentIngredientIndex = 0;
                  currentIngredient = ingredientsNeedingMatching[0];

                  // Search for the first ingredient
                  await searchForCurrentIngredient();
                  dialogOpen = true;
                }

                if (result.type === 'success') {
                  // Update recipe data
                  if (result.data?.nutritionalInfo) {
                    recipe.nutritionalInfo = result.data.nutritionalInfo;
                  }

                  if (result.data?.updatedRecipe) {
                    Object.assign(recipe, result.data.updatedRecipe);
                  }

                  toast.success('Success', {
                    description: result.data?.message || 'Nutrition calculated successfully'
                  });
                } else if (result.type === 'failure') {
                  toast.error('Error', {
                    description: result.data?.message || 'Calculation failed'
                  });
                } else if (result.type === 'error') {
                  toast.error('Error', {
                    description: 'An unexpected error occurred'
                  });
                }

                // Call update to apply default behaviors
                update();
              };
            }}
          >
            <Button
              type="submit"
              variant={hasIncompleteData ? 'default' : 'outline'}
              size="sm"
              class={hasIncompleteData
                ? 'bg-green-600 hover:bg-green-700 text-white font-medium'
                : 'border-gray-300 text-gray-700'}
              disabled={calculating || processingIngredients}
              aria-live="polite"
              aria-busy={calculating || processingIngredients}
              aria-describedby="nutrition-description"
            >
              {#if calculating || processingIngredients}
                <RotateCw class="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
                <span>{processingIngredients ? 'Matching...' : 'Calculating...'}</span>
              {:else}
                <span>{hasIncompleteData ? 'Calculate Nutrition' : 'Recalculate Nutrition'}</span>
              {/if}
            </Button>
          </form>
        </div>
      </div>
    </Card.Header>

    <Card.Content class="p-6">
      {#if hasIncompleteData}
        <div
          class="bg-amber-50 border-l-4 border-amber-500 rounded-md p-4 mb-6"
          role="alert"
          aria-labelledby="missing-data-heading"
        >
          <div class="flex">
            <AlertCircle
              class="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <h3 id="missing-data-heading" class="font-semibold text-amber-800">
                Missing nutrition data
              </h3>
              <p class="text-sm text-amber-700 mt-1">
                This recipe doesn't have complete nutrition information. Click "Calculate Nutrition"
                to analyze ingredients and generate nutritional facts.
              </p>

              {#if missingIngredientData}
                <div class="mt-4 bg-white bg-opacity-50 p-3 rounded-md">
                  <p class="text-sm text-amber-700">
                    <span class="font-medium">{missingNutritionCount}</span>
                    ingredient{missingNutritionCount !== 1 ? 's' : ''}
                    {missingNutritionCount !== 1 ? 'are' : 'is'} missing nutrition data. You'll be prompted
                    to select matching ingredients from the USDA database.
                  </p>

                  <div class="mt-3">
                    <Progress
                      value={completionPercentage()}
                      class="h-2 bg-amber-100"
                      aria-label="Ingredient completion percentage"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow={completionPercentage()}
                    />
                    <p class="text-xs text-amber-700 mt-2 flex justify-between" aria-live="polite">
                      <span>{completionPercentage()}% complete</span>
                      <span
                        >({recipe.ingredients.length - missingNutritionCount}/{recipe.ingredients
                          .length} ingredients)</span
                      >
                    </p>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>
      {:else if calculationComplete}
        <div
          class="bg-green-50 border-l-4 border-green-500 rounded-md p-4 mb-6"
          role="status"
          aria-labelledby="complete-data-heading"
        >
          <div class="flex">
            <Check class="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 id="complete-data-heading" class="font-semibold text-green-800">
                Nutrition data complete
              </h3>
              <p class="text-sm text-green-700 mt-1">
                All ingredients have nutrition data and calculations are up to date.
              </p>
            </div>
          </div>
        </div>
      {/if}

      <div class="space-y-8">
        <!-- Main nutrition facts - Redesigned with cards -->
        <div
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          role="region"
          aria-labelledby="nutrition-facts-heading"
        >
          <h3
            id="nutrition-facts-heading"
            class="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100"
          >
            Nutrition Facts
          </h3>

          <!-- Calories - Make it stand out -->
          <div class="mb-6 bg-blue-50 p-4 rounded-lg">
            <div class="flex justify-between items-center">
              <span class="text-lg font-semibold text-gray-700" id="calories-label">Calories</span>
              <span class="text-3xl font-bold text-blue-700" aria-labelledby="calories-label">
                {new Intl.NumberFormat('en-US').format(
                  Math.round(recipe.nutritionalInfo?.calories || 0)
                )}
              </span>
            </div>
          </div>

          <!-- Macronutrients - Visual improvements -->
          <div class="space-y-6">
            <!-- Protein -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="font-medium text-gray-700">Protein</span>
                <div class="text-right">
                  <span class="font-bold"
                    >{new Intl.NumberFormat('en-US').format(
                      parseFloat(recipeState.formatNutrient(recipe.nutritionalInfo?.protein || 0))
                    )}g</span
                  >
                  <span class="text-xs text-gray-500 ml-1">
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
                class="h-2 bg-gray-100"
                aria-label="Protein daily value percentage"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={recipeState.getDailyValuePercentage(
                  recipe.nutritionalInfo?.protein || 0,
                  dailyValues.protein
                )}
              />
            </div>

            <!-- Carbohydrates -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="font-medium text-gray-700">Carbohydrates</span>
                <div class="text-right">
                  <span class="font-bold"
                    >{new Intl.NumberFormat('en-US').format(
                      parseFloat(
                        recipeState.formatNutrient(recipe.nutritionalInfo?.carbohydrates || 0)
                      )
                    )}g</span
                  >
                  <span class="text-xs text-gray-500 ml-1">
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
                class="h-2 bg-gray-100"
                aria-label="Carbohydrates daily value percentage"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={recipeState.getDailyValuePercentage(
                  recipe.nutritionalInfo?.carbohydrates || 0,
                  dailyValues.carbohydrates
                )}
              />
            </div>

            <!-- Fat -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="font-medium text-gray-700">Fat</span>
                <div class="text-right">
                  <span class="font-bold"
                    >{new Intl.NumberFormat('en-US').format(
                      parseFloat(recipeState.formatNutrient(recipe.nutritionalInfo?.fat || 0))
                    )}g</span
                  >
                  <span class="text-xs text-gray-500 ml-1">
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
                class="h-2 bg-gray-100"
                aria-label="Fat daily value percentage"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={recipeState.getDailyValuePercentage(
                  recipe.nutritionalInfo?.fat || 0,
                  dailyValues.fat
                )}
              />
            </div>
          </div>

          <Separator class="my-6" />

          <!-- Additional nutrients - Card layout -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 p-3 rounded-lg">
              <span class="text-gray-500 text-sm block mb-1" id="fiber-label">Fiber</span>
              <p class="font-bold text-gray-800" aria-labelledby="fiber-label">
                {recipeState.formatNutrient(recipe.nutritionalInfo?.fiber || 0)}g
                <span class="text-xs text-gray-500 block mt-1">
                  {recipeState.getDailyValuePercentage(
                    recipe.nutritionalInfo?.fiber || 0,
                    dailyValues.fiber
                  )}% DV
                </span>
              </p>
            </div>

            <div class="bg-gray-50 p-3 rounded-lg">
              <span class="text-gray-500 text-sm block mb-1" id="sugar-label">Sugar</span>
              <p class="font-bold text-gray-800" aria-labelledby="sugar-label">
                {recipeState.formatNutrient(recipe.nutritionalInfo?.sugar || 0)}g
                <span class="text-xs text-gray-500 block mt-1">
                  {recipeState.getDailyValuePercentage(
                    recipe.nutritionalInfo?.sugar || 0,
                    dailyValues.sugar
                  )}% DV
                </span>
              </p>
            </div>

            <div class="bg-gray-50 p-3 rounded-lg">
              <span class="text-gray-500 text-sm block mb-1" id="sodium-label">Sodium</span>
              <p class="font-bold text-gray-800" aria-labelledby="sodium-label">
                {recipeState.formatNutrient(recipe.nutritionalInfo?.sodium || 0)}mg
                <span class="text-xs text-gray-500 block mt-1">
                  {recipeState.getDailyValuePercentage(
                    recipe.nutritionalInfo?.sodium || 0,
                    dailyValues.sodium
                  )}% DV
                </span>
              </p>
            </div>

            <div class="bg-gray-50 p-3 rounded-lg">
              <span class="text-gray-500 text-sm block mb-1" id="serving-size-label"
                >Serving Size</span
              >
              <p class="font-bold text-gray-800" aria-labelledby="serving-size-label">
                {recipe.nutritionalInfo?.servingSize?.toFixed(2) || recipe.servings || 1}
                <span class="block text-sm font-normal mt-1"
                  >{recipe.nutritionalInfo?.servingUnit || 'serving'}</span
                >
              </p>
            </div>
          </div>
        </div>

        <!-- Ingredient nutrition contribution - Enhanced table -->
        <div
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          role="region"
          aria-labelledby="ingredient-breakdown-heading"
        >
          <h3
            id="ingredient-breakdown-heading"
            class="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100"
          >
            Ingredient Breakdown
          </h3>

          {#if recipe.ingredients && recipe.ingredients.length > 0}
            <div class="rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <Table.Root
                class="w-full divide-y divide-gray-200"
                role="table"
                aria-label="Ingredient nutrition breakdown"
              >
                <Table.Header class="bg-gray-50">
                  <Table.Row>
                    <Table.Head
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Ingredient
                    </Table.Head>
                    <Table.Head
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Quantity
                    </Table.Head>
                    <Table.Head
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Calories
                    </Table.Head>
                    <Table.Head
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Protein
                    </Table.Head>
                    <Table.Head
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Actions
                    </Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body class="bg-white divide-y divide-gray-200">
                  {#each recipe.ingredients as ingredient}
                    <Table.Row
                      class={`hover:bg-gray-50 transition-colors ${!ingredient.ingredient?.calories ? 'bg-amber-50' : ''} ${ingredient === currentIngredient ? 'bg-blue-50' : ''}`}
                    >
                      <Table.Cell class="px-6 py-4 whitespace-nowrap" role="cell">
                        <div class="text-sm font-medium text-gray-900">
                          {ingredient.ingredient?.name || 'Unknown ingredient'}
                        </div>
                      </Table.Cell>
                      <Table.Cell
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                        role="cell"
                      >
                        <span class="font-medium">{ingredient.quantity?.toFixed(1) || 0}</span>
                        <span class="text-gray-500">{ingredient.unit || 'g'}</span>
                      </Table.Cell>
                      <Table.Cell class="px-6 py-4 whitespace-nowrap text-sm" role="cell">
                        {#if ingredient.ingredient?.calories !== undefined && ingredient.ingredient.calories !== null}
                          <span class="font-medium text-gray-900">
                            {formatNumber(
                              calculateNutritionPerServing(
                                ingredient.ingredient.calories,
                                ingredient.quantity,
                                ingredient.unit
                              )
                            )}
                          </span>
                        {:else}
                          <span class="text-gray-400">—</span>
                        {/if}
                        <span class="text-gray-500">cal</span>
                      </Table.Cell>
                      <Table.Cell class="px-6 py-4 whitespace-nowrap text-sm" role="cell">
                        {#if ingredient.ingredient?.protein !== undefined && ingredient.ingredient.protein !== null}
                          <span class="font-medium text-gray-900">
                            {formatNumber(
                              calculateNutritionPerServing(
                                ingredient.ingredient.protein,
                                ingredient.quantity,
                                ingredient.unit
                              )
                            )}
                          </span>
                        {:else}
                          <span class="text-gray-400">—</span>
                        {/if}
                        <span class="text-gray-500">g</span>
                      </Table.Cell>
                      <Table.Cell class="px-6 py-4 whitespace-nowrap text-sm" role="cell">
                        <div class="flex items-center space-x-2">
                          {#if ingredient.ingredient?.calories !== undefined}
                            <div class="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onclick={() => startMatchingForIngredient(ingredient)}
                                class="text-gray-600 hover:text-gray-900"
                                aria-label={`Replace ${ingredient.ingredient?.name || 'ingredient'}`}
                              >
                                Replace
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onclick={() => openManualInputDialog(ingredient)}
                                class="text-gray-600 hover:text-gray-900"
                                aria-label={`Edit ${ingredient.ingredient?.name || 'ingredient'}`}
                              >
                                Edit
                              </Button>
                            </div>
                          {:else}
                            <div class="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onclick={() => startMatchingForIngredient(ingredient)}
                                class="border-amber-500 text-amber-600 hover:bg-amber-50"
                                aria-label={`Match ${ingredient.ingredient?.name || 'ingredient'} with database entry`}
                              >
                                Match
                              </Button>
                              <Button
                                variant="secondary"
                                size="sm"
                                onclick={() => openManualInputDialog(ingredient)}
                                class="bg-blue-50 text-blue-700 hover:bg-blue-100"
                                aria-label={`Enter nutrition data manually for ${ingredient.ingredient?.name || 'ingredient'}`}
                              >
                                Enter Manually
                              </Button>
                            </div>
                          {/if}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  {/each}
                </Table.Body>
              </Table.Root>
            </div>
          {:else}
            <div class="text-center py-8 bg-gray-50 rounded-lg" role="status">
              <span class="block text-gray-400 mb-2">
                <AlertCircle class="h-10 w-10 mx-auto" aria-hidden="true" />
              </span>
              <p class="text-gray-500">No ingredients added to this recipe yet.</p>
              <Button variant="outline" class="mt-4" aria-label="Add your first ingredient"
                >Add First Ingredient</Button
              >
            </div>
          {/if}
        </div>

        <!-- Allergen Information Section - New Section for Healthcare/Institutional Use -->
        {#if recipe.nutritionalInfo}
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            role="region"
            aria-labelledby="allergen-heading"
          >
            <h3
              id="allergen-heading"
              class="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100"
            >
              Allergen Information
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <h4 class="font-medium text-gray-700">Common Allergens Present</h4>
                <ul class="space-y-2">
                  {#if recipe.nutritionalInfo.containsGluten}
                    <li class="flex items-center text-red-600">
                      <span
                        class="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"
                        aria-hidden="true"
                      ></span>
                      Contains Gluten
                    </li>
                  {/if}
                  {#if recipe.nutritionalInfo.containsDairy}
                    <li class="flex items-center text-red-600">
                      <span
                        class="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"
                        aria-hidden="true"
                      ></span>
                      Contains Dairy
                    </li>
                  {/if}
                  {#if recipe.nutritionalInfo.containsNuts}
                    <li class="flex items-center text-red-600">
                      <span
                        class="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"
                        aria-hidden="true"
                      ></span>
                      Contains Nuts
                    </li>
                  {/if}
                  {#if recipe.nutritionalInfo.containsEggs}
                    <li class="flex items-center text-red-600">
                      <span
                        class="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"
                        aria-hidden="true"
                      ></span>
                      Contains Eggs
                    </li>
                  {/if}
                  {#if recipe.nutritionalInfo.containsSoy}
                    <li class="flex items-center text-red-600">
                      <span
                        class="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"
                        aria-hidden="true"
                      ></span>
                      Contains Soy
                    </li>
                  {/if}
                  {#if recipe.nutritionalInfo.containsFish}
                    <li class="flex items-center text-red-600">
                      <span
                        class="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"
                        aria-hidden="true"
                      ></span>
                      Contains Fish
                    </li>
                  {/if}
                  {#if recipe.nutritionalInfo.containsShellfish}
                    <li class="flex items-center text-red-600">
                      <span
                        class="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"
                        aria-hidden="true"
                      ></span>
                      Contains Shellfish
                    </li>
                  {/if}
                  {#if recipe.nutritionalInfo.containsSesame}
                    <li class="flex items-center text-red-600">
                      <span
                        class="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"
                        aria-hidden="true"
                      ></span>
                      Contains Sesame
                    </li>
                  {/if}
                  {#if !recipe.nutritionalInfo.containsGluten && !recipe.nutritionalInfo.containsDairy && !recipe.nutritionalInfo.containsNuts && !recipe.nutritionalInfo.containsEggs && !recipe.nutritionalInfo.containsSoy && !recipe.nutritionalInfo.containsFish && !recipe.nutritionalInfo.containsShellfish && !recipe.nutritionalInfo.containsSesame}
                    <li class="flex items-center text-green-600">
                      <span
                        class="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"
                        aria-hidden="true"
                      ></span>
                      No common allergens detected
                    </li>
                  {/if}
                </ul>
              </div>

              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-medium text-gray-700 mb-2">Special Dietary Notes</h4>
                <p class="text-sm text-gray-600 mb-4">
                  This information is suitable for institutional meal planning and meets healthcare
                  documentation requirements. Always verify with individual ingredient labels for
                  complete allergen information.
                </p>
                <div class="flex flex-wrap gap-2">
                  {#if !recipe.nutritionalInfo.containsGluten}
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                      >Gluten-Free</span
                    >
                  {/if}
                  {#if !recipe.nutritionalInfo.containsDairy}
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                      >Dairy-Free</span
                    >
                  {/if}
                  {#if !recipe.nutritionalInfo.containsNuts}
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                      >Nut-Free</span
                    >
                  {/if}
                  {#if !recipe.nutritionalInfo.containsEggs}
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                      >Egg-Free</span
                    >
                  {/if}
                  {#if !recipe.nutritionalInfo.containsSoy}
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                      >Soy-Free</span
                    >
                  {/if}
                </div>
              </div>
            </div>
          </div>
        {/if}

        <!-- Healthcare/Institutional Documentation Section -->
        {#if recipe.nutritionalInfo}
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            role="region"
            aria-labelledby="documentation-heading"
          >
            <h3
              id="documentation-heading"
              class="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100"
            >
              Institutional Documentation
            </h3>

            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium text-gray-700 mb-3">Dietary Compliance</h4>
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <ul class="space-y-2 text-sm">
                      <li class="flex items-center">
                        <span
                          class={`inline-block w-3 h-3 ${parseFloat(recipeState.formatNutrient(recipe.nutritionalInfo?.sodium || 0)) < 400 ? 'bg-green-500' : 'bg-amber-500'} rounded-full mr-2`}
                          aria-hidden="true"
                        ></span>
                        Sodium: {parseFloat(
                          recipeState.formatNutrient(recipe.nutritionalInfo?.sodium || 0)
                        ) < 400
                          ? 'Low Sodium'
                          : 'Standard'}
                      </li>
                      <li class="flex items-center">
                        <span
                          class={`inline-block w-3 h-3 ${parseFloat(recipeState.formatNutrient(recipe.nutritionalInfo?.fat || 0)) < 10 ? 'bg-green-500' : 'bg-amber-500'} rounded-full mr-2`}
                          aria-hidden="true"
                        ></span>
                        Fat: {parseFloat(
                          recipeState.formatNutrient(recipe.nutritionalInfo?.fat || 0)
                        ) < 10
                          ? 'Low Fat'
                          : 'Standard'}
                      </li>
                      <li class="flex items-center">
                        <span
                          class={`inline-block w-3 h-3 ${parseFloat(recipeState.formatNutrient(recipe.nutritionalInfo?.fiber || 0)) >= 5 ? 'bg-green-500' : 'bg-amber-500'} rounded-full mr-2`}
                          aria-hidden="true"
                        ></span>
                        Fiber: {parseFloat(
                          recipeState.formatNutrient(recipe.nutritionalInfo?.fiber || 0)
                        ) >= 5
                          ? 'High Fiber'
                          : 'Standard'}
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 class="font-medium text-gray-700 mb-3">Export Options</h4>
                  <div class="space-y-3">
                    <Button
                      variant="outline"
                      size="sm"
                      class="w-full justify-between text-left flex items-center gap-2 text-gray-600"
                      onclick={() => window.print()}
                      aria-label="Print nutrition information"
                    >
                      <span>Print Nutrition Label</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="6 9 6 2 18 2 18 9"></polyline>
                        <path
                          d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
                        ></path>
                        <rect x="6" y="14" width="12" height="8"></rect>
                      </svg>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      class="w-full justify-between text-left flex items-center gap-2 text-gray-600"
                      onclick={exportNutritionData}
                      aria-label="Export nutrition data as CSV"
                    >
                      <span>Export as CSV</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>

              <!-- Healthcare/Catering Notes Section -->
              <div class="mt-6">
                <h4 class="font-medium text-gray-700 mb-3">Institutional Notes</h4>
                <div class="bg-blue-50 p-4 rounded-lg">
                  <div class="flex items-start">
                    <Info class="h-5 w-5 text-blue-600 mr-2 mt-0.5" aria-hidden="true" />
                    <div>
                      <p class="text-sm text-blue-700">
                        This nutrition panel is designed for institutional use, including catering
                        services, healthcare facilities, schools, and nursing homes. The information
                        provided includes:
                      </p>
                      <ul class="mt-2 space-y-1 text-sm text-blue-700 list-disc list-inside">
                        <li>Comprehensive allergen information for patient safety</li>
                        <li>Per-serving nutritional breakdown for portion control</li>
                        <li>
                          Exportable data formats for electronic health records (EHR) integration
                        </li>
                        <li>Printable nutrition labels for kitchen/serving compliance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </Card.Content>
  </Card.Root>
</section>

<!-- Ingredient matching dialog -->
<IngredientMatchDialog
  open={dialogOpen}
  onOpenChange={(open) => {
    // Only allow closing dialog if not actively processing
    if (!processingIngredients || open) {
      dialogOpen = open;
    }
  }}
  ingredientName={currentIngredient?.ingredient?.name || ''}
  matches={usdaMatches}
  onSelect={handleIngredientMatchSelect}
  onCancel={handleIngredientMatchCancel}
  onSearch={searchUsdaForIngredient}
  onEnterManually={() => {
    // Close search dialog and open manual entry dialog
    if (currentIngredient) {
      openManualInputDialog(currentIngredient);
    }
  }}
/>

<!-- Manual nutrition input dialog -->
{#if showManualInputDialog && selectedIngredient}
  <AlertDialog.Root
    open={showManualInputDialog}
    onOpenChange={(open) => (showManualInputDialog = open)}
  >
    <AlertDialog.Content class="max-w-md">
      <AlertDialog.Header>
        <AlertDialog.Title>Enter Nutrition Data</AlertDialog.Title>
        <AlertDialog.Description>
          Manually enter nutrition data for {selectedIngredient.ingredient?.name} (per 100g)
        </AlertDialog.Description>
      </AlertDialog.Header>
      <form method="POST" action="?/saveManualNutrition" use:enhance>
        <input type="hidden" name="ingredientId" value={selectedIngredient.ingredient?.id} />
        <div class="bg-blue-50 border border-blue-200 rounded-md p-3 my-3">
          <p class="text-xs text-blue-800">
            <strong>Note:</strong> Enter values per 100g of the ingredient, regardless of the recipe
            quantity. The system will automatically calculate the nutrition based on the actual quantity
            used.
          </p>
        </div>

        <div class="space-y-4 pt-2">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="calories">Calories</Label>
              <Input
                id="calories"
                type="number"
                min="0"
                placeholder="kcal per 100g"
                bind:value={manualNutritionData.calories}
              />
              <p class="text-xs text-muted-foreground">Typical range: 0-900 kcal</p>
            </div>
            <div class="space-y-2">
              <Label for="protein">Protein (g)</Label>
              <Input
                id="protein"
                type="number"
                min="0"
                step="0.1"
                placeholder="g per 100g"
                bind:value={manualNutritionData.carbohydrates}
              />
              <p class="text-xs text-muted-foreground">Typical range: 0-90g</p>
            </div>
            <div class="space-y-2">
              <Label for="fat">Fat (g)</Label>
              <Input
                id="fat"
                type="number"
                min="0"
                step="0.1"
                placeholder="g per 100g"
                bind:value={manualNutritionData.fat}
              />
              <p class="text-xs text-muted-foreground">Typical range: 0-100g</p>
            </div>
            <div class="space-y-2">
              <Label for="fiber">Fiber (g)</Label>
              <Input
                id="fiber"
                type="number"
                min="0"
                step="0.1"
                placeholder="g per 100g"
                bind:value={manualNutritionData.fiber}
              />
              <p class="text-xs text-muted-foreground">Typical range: 0-15g</p>
            </div>
            <div class="space-y-2">
              <Label for="sugar">Sugar (g)</Label>
              <Input
                id="sugar"
                type="number"
                min="0"
                step="0.1"
                placeholder="g per 100g"
                bind:value={manualNutritionData.sugar}
              />
              <p class="text-xs text-muted-foreground">Typical range: 0-70g</p>
            </div>
            <div class="space-y-2 col-span-2">
              <Label for="sodium">Sodium (mg)</Label>
              <Input
                id="sodium"
                type="number"
                min="0"
                step="1"
                placeholder="mg per 100g"
                bind:value={manualNutritionData.sodium}
              />
              <p class="text-xs text-muted-foreground">Typical range: 0-2000mg</p>
            </div>
          </div>

          <!-- Allergen Section -->
          <div class="pt-4 border-t border-gray-200">
            <h3 class="text-sm font-medium mb-3">Allergen Information</h3>
            <div class="grid grid-cols-2 gap-3">
              <div class="flex items-center space-x-2">
                <Checkbox id="containsGluten" bind:checked={manualNutritionData.containsGluten} />
                <Label for="containsGluten" class="text-sm font-normal">Contains Gluten</Label>
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox id="containsDairy" bind:checked={manualNutritionData.containsDairy} />
                <Label for="containsDairy" class="text-sm font-normal">Contains Dairy</Label>
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox id="containsNuts" bind:checked={manualNutritionData.containsNuts} />
                <Label for="containsNuts" class="text-sm font-normal">Contains Nuts</Label>
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox id="containsEggs" bind:checked={manualNutritionData.containsEggs} />
                <Label for="containsEggs" class="text-sm font-normal">Contains Eggs</Label>
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox id="containsSoy" bind:checked={manualNutritionData.containsSoy} />
                <Label for="containsSoy" class="text-sm font-normal">Contains Soy</Label>
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox id="containsFish" bind:checked={manualNutritionData.containsFish} />
                <Label for="containsFish" class="text-sm font-normal">Contains Fish</Label>
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="containsShellfish"
                  bind:checked={manualNutritionData.containsShellfish}
                />
                <Label for="containsShellfish" class="text-sm font-normal">Contains Shellfish</Label
                >
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox id="containsSesame" bind:checked={manualNutritionData.containsSesame} />
                <Label for="containsSesame" class="text-sm font-normal">Contains Sesame</Label>
              </div>
            </div>
          </div>
        </div>

        <AlertDialog.Footer class="mt-4">
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action onclick={saveManualNutritionData}>Save Data</AlertDialog.Action>
        </AlertDialog.Footer>
      </form>
    </AlertDialog.Content>
  </AlertDialog.Root>
{/if}

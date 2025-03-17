<!-- src/lib/components/recipes/recipe-allergens.svelte -->
<script lang="ts">
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Separator } from '$lib/components/ui/separator';
  import { Badge } from '$lib/components/ui/badge';
  import { AlertTriangle, Check, Info, Leaf, ChevronDown, ChevronUp } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  // Get recipe from context
  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;

  // Track expanded allergen details
  let expandedAllergens = {};

  // Toggle expanded state for allergen
  function toggleAllergen(allergen) {
    expandedAllergens[allergen] = !expandedAllergens[allergen];
    expandedAllergens = { ...expandedAllergens }; // Trigger reactivity
  }

  // Function to determine if an allergen is present
  function allergenStatus(name) {
    if (!recipe.nutritionalInfo) return null;

    const allergenMap = {
      Gluten: recipe.nutritionalInfo.containsGluten,
      Dairy: recipe.nutritionalInfo.containsDairy,
      Nuts: recipe.nutritionalInfo.containsNuts,
      Eggs: recipe.nutritionalInfo.containsEggs,
      Soy: recipe.nutritionalInfo.containsSoy,
      Fish: recipe.nutritionalInfo.containsFish,
      Shellfish: recipe.nutritionalInfo.containsShellfish,
      Sesame: recipe.nutritionalInfo.containsSesame
    };

    return allergenMap[name];
  }

  // Function to find ingredients that may contain an allergen
  function findAllergensInIngredients(allergen) {
    if (!recipe.ingredients) return [];

    // Map of keywords to look for in ingredient names/descriptions
    const allergenKeywords = {
      Gluten: ['wheat', 'barley', 'rye', 'flour', 'bread', 'pasta', 'seitan', 'couscous', 'bulgur'],
      Dairy: ['milk', 'cream', 'butter', 'cheese', 'yogurt', 'whey', 'lactose', 'casein'],
      Nuts: ['nut', 'almond', 'cashew', 'pecan', 'walnut', 'hazelnut', 'pistachio', 'macadamia'],
      Eggs: ['egg', 'yolk', 'albumin', 'meringue', 'mayonnaise'],
      Soy: ['soy', 'tofu', 'edamame', 'miso', 'tempeh'],
      Fish: ['fish', 'salmon', 'tuna', 'cod', 'anchovy', 'tilapia', 'halibut', 'trout'],
      Shellfish: ['shrimp', 'crab', 'lobster', 'prawn', 'clam', 'mussel', 'oyster', 'scallop'],
      Sesame: ['sesame', 'tahini']
    };

    // Check each ingredient's name and notes for allergen keywords
    return recipe.ingredients
      .filter((ri) => {
        const ingredient = ri.ingredient;
        const name = ingredient.name.toLowerCase();
        const processingNotes = (ri.processingInstructions || '').toLowerCase();

        // Check if ingredient name or notes contain any allergen keywords
        return allergenKeywords[allergen].some(
          (keyword) =>
            name.includes(keyword.toLowerCase()) || processingNotes.includes(keyword.toLowerCase())
        );
      })
      .map((ri) => ri.ingredient.name);
  }

  // Common allergens list
  const allergens = ['Gluten', 'Dairy', 'Nuts', 'Eggs', 'Soy', 'Fish', 'Shellfish', 'Sesame'];

  // We actually want to display dietary restrictions as restrictions
  // rather than suitability indicators

  // Function to check if a restriction is present
  function hasRestriction(name) {
    if (!recipe.dietaryRestrictions) return false;
    return recipe.dietaryRestrictions.some(
      (restriction) => restriction.name.toLowerCase() === name.toLowerCase()
    );
  }

  // Format date helper
  function formatDate(date: Date) {
    if (!date) return 'Not yet published';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<Card class="mb-6">
  <CardHeader class="pb-3">
    <CardTitle class="text-base font-medium flex items-center gap-2">
      <Info class="h-4 w-4 text-primary-500" />
      Dietary & Allergen Information
    </CardTitle>
  </CardHeader>

  <CardContent>
    <h4 class="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
      <Leaf class="h-4 w-4 text-red-600" />
      Dietary Restrictions
    </h4>

    {#if recipe.dietaryRestrictions && recipe.dietaryRestrictions.length > 0}
      <div class="mb-4">
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {#each recipe.dietaryRestrictions as restriction}
            <div class="flex items-center gap-2 bg-red-50 border border-red-200 rounded-md p-2">
              <span
                class="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center"
              >
                <Leaf class="h-3 w-3 text-red-600" />
              </span>
              <span class="text-sm font-medium text-red-700">{restriction.name}</span>
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <p class="text-sm text-gray-500 italic mb-4">No dietary restrictions specified</p>
    {/if}

    <Separator class="my-3" />

    <h4 class="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
      <AlertTriangle class="h-4 w-4 text-amber-500" />
      Allergen Information
    </h4>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {#each allergens as allergen}
        {@const status = allergenStatus(allergen)}
        {@const allergenIngredients = status ? findAllergensInIngredients(allergen) : []}
        {@const hasIngredients = allergenIngredients.length > 0}

        <div class="rounded-md border overflow-hidden">
          <button
            class={`w-full p-3 flex items-center justify-between ${status === true ? 'bg-red-50 border-red-200' : status === false ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
            onclick={() => hasIngredients && toggleAllergen(allergen)}
            aria-expanded={expandedAllergens[allergen]}
            disabled={!hasIngredients}
          >
            <div class="flex items-center gap-2">
              {#if status === true}
                <span
                  class="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <AlertTriangle class="h-3 w-3 text-red-600" />
                </span>
                <span class="text-sm font-medium">Contains {allergen}</span>
              {:else if status === false}
                <span
                  class="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Check class="h-3 w-3 text-green-600" />
                </span>
                <span class="text-sm">{allergen}-Free</span>
              {:else}
                <span
                  class="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Info class="h-3 w-3 text-gray-500" />
                </span>
                <span class="text-sm text-gray-500">{allergen}</span>
              {/if}
            </div>

            {#if hasIngredients}
              <span class="text-sm text-gray-500" aria-hidden="true">
                {#if expandedAllergens[allergen]}
                  <ChevronUp class="h-4 w-4" />
                {:else}
                  <ChevronDown class="h-4 w-4" />
                {/if}
              </span>
            {/if}
          </button>

          {#if hasIngredients && expandedAllergens[allergen]}
            <div
              class="p-3 bg-white border-t border-red-100 text-sm"
              transition:slide={{ duration: 200 }}
            >
              <p class="font-medium text-gray-700 mb-1">Found in these ingredients:</p>
              <ul class="space-y-1 pl-2">
                {#each allergenIngredients as ingredient}
                  <li class="text-gray-600 flex items-start">
                    <span class="text-red-400 mr-1.5" aria-hidden="true">•</span>
                    {ingredient}
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    {#if recipe.criticalPoints && recipe.criticalPoints.length > 0}
      <Separator class="my-3" />

      <h4 class="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        <AlertTriangle class="h-4 w-4 text-amber-500" />
        Food Safety Critical Points
      </h4>

      <ul class="space-y-1.5 text-sm text-gray-600">
        {#each recipe.criticalPoints as point}
          <li class="flex items-start gap-2">
            <span class="text-amber-500 mt-0.5">•</span>
            <span>{point.description}</span>
          </li>
        {/each}
      </ul>
    {/if}

    <div class="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
      Last updated: {formatDate(recipe.publishedAt)}
    </div>
  </CardContent>
</Card>

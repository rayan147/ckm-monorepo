<!-- src/lib/recipe/tabs/OverviewTab.svelte -->
<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Separator } from '$lib/components/ui/separator';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';
  import NutritionCard from '$lib/components/recipes/nutrition-card.svelte';
  import CostAnalysis from '$lib/components/recipes/cost-analysis.svelte';

  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;
</script>

<section aria-labelledby="overview-description">
  <h3 id="overview-description" class="sr-only">Recipe Overview</h3>
  <Card.Root>
    <Card.Content class="p-6">
      <p class="text-gray-700">
        {recipe.description || 'No detailed description available.'}
      </p>
      <dl class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div class="bg-gray-50 p-4 rounded-lg text-center">
          <dt class="text-sm text-gray-500">Prep Time</dt>
          <dd class="font-semibold mt-1">{recipeState.formatTime(recipe.prepTime)}</dd>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg text-center">
          <dt class="text-sm text-gray-500">Cook Time</dt>
          <dd class="font-semibold mt-1">{recipeState.formatTime(recipe.cookTime)}</dd>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg text-center">
          <dt class="text-sm text-gray-500">Total Time</dt>
          <dd class="font-semibold mt-1">{recipeState.getTotalTime()}</dd>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg text-center">
          <dt class="text-sm text-gray-500">Servings</dt>
          <dd class="font-semibold mt-1">{recipe.servings}</dd>
        </div>
      </dl>
    </Card.Content>
  </Card.Root>
</section>

{#if recipe.laborCosts && recipe.laborCosts.length > 0}
  <CostAnalysis />
{/if}

<Separator class="mb-4" />

{#if recipe.nutritionalInfo}
  <NutritionCard />
{/if}

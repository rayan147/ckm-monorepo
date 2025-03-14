<!-- src/lib/recipe/components/CostAnalysis.svelte -->
<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';

  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;
</script>

<section aria-labelledby="cost-analysis-heading">
  <Card.Root class="mt-6">
    <Card.Header>
      <Card.Title id="cost-analysis-heading">Cost Analysis</Card.Title>
      <Card.Description>Cost breakdown for this recipe</Card.Description>
    </Card.Header>
    <Card.Content class="p-6">
      <dl class="grid grid-cols-2 gap-3 space-x-3">
        <div class="flex justify-between">
          <dt class="text-gray-500">Food Cost</dt>
          <dd class="font-semibold">${recipe.foodCost?.toFixed(2) || '0.00'}</dd>
        </div>
        <div class="flex justify-between">
          <dt class="text-gray-500">Labor Cost</dt>
          <dd class="font-semibold">
            ${recipe.laborCosts[0].totalLaborCost.toFixed(2)}
          </dd>
        </div>
        <div class="flex justify-between">
          <dt class="text-gray-500">Total Cost</dt>
          <dd class="font-semibold">
            ${((recipe.foodCost || 0) + recipe.laborCosts[0].totalLaborCost).toFixed(2)}
          </dd>
        </div>
        <div class="flex justify-between">
          <dt class="text-gray-500">Cost per Serving</dt>
          <dd class="font-semibold">
            ${(
              ((recipe.foodCost || 0) + recipe.laborCosts[0].totalLaborCost) /
              recipe.servings
            ).toFixed(2)}
          </dd>
        </div>
      </dl>
    </Card.Content>
  </Card.Root>
</section>

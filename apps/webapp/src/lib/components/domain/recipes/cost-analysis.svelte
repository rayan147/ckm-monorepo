<!-- src/lib/recipe/components/CostAnalysis.svelte -->
<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { DollarSign, Calculator, TrendingUp } from 'lucide-svelte';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';
  import * as Separator from '$lib/components/ui/separator';

  // Get recipe context
  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;

  // Computed values with safe fallbacks
  const foodCost = $derived(recipe.foodCost || 0);
  const laborCost = $derived(recipe.laborCosts?.[0]?.totalLaborCost || 0);
  const totalCost = $derived(foodCost + laborCost);
  const costPerServing = $derived(recipe.servings > 0 ? totalCost / recipe.servings : 0);

  // Format currency helper
  const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
  };
</script>

<section aria-labelledby="cost-analysis-heading" class="max-w-4xl mx-auto">
  <Card.Root
    class="mt-6 border-0 shadow-md rounded-xl overflow-hidden"
    role="region"
    aria-label="Recipe cost breakdown"
  >
    <Card.Header class="bg-gradient-to-r from-indigo-50 to-purple-50 pb-6">
      <div class="flex items-center gap-3">
        <div class="bg-indigo-100 p-2 rounded-full">
          <DollarSign class="h-5 w-5 text-indigo-600" aria-hidden="true" />
        </div>
        <hgroup>
          <Card.Title id="cost-analysis-heading" class="text-2xl font-bold text-gray-800"
            >Cost Analysis</Card.Title
          >
          <Card.Description class="text-gray-600"
            >Detailed cost breakdown for this recipe</Card.Description
          >
        </hgroup>
      </div>
    </Card.Header>

    <Card.Content class="p-6">
      <!-- Summary total card -->
      <article
        class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-4 mb-6 shadow-sm"
        aria-labelledby="total-cost-heading"
      >
        <div class="flex justify-between items-center">
          <div>
            <h3 id="total-cost-heading" class="text-indigo-100 font-medium">Total Recipe Cost</h3>
            <p class="text-3xl font-bold" aria-describedby="total-cost-heading">
              {formatCurrency(totalCost)}
            </p>
          </div>
          <div class="text-right">
            <h3 id="per-serving-heading" class="text-indigo-100 font-medium">Per Serving</h3>
            <p class="text-2xl font-bold" aria-describedby="per-serving-heading">
              {formatCurrency(costPerServing)}
            </p>
          </div>
        </div>
      </article>

      <!-- Cost breakdown -->
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Food costs -->
        <article
          class="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
          aria-labelledby="food-cost-heading"
        >
          <header class="flex items-center gap-2 mb-4">
            <div class="bg-green-100 p-1.5 rounded-full">
              <DollarSign class="h-4 w-4 text-green-600" aria-hidden="true" />
            </div>
            <h3 id="food-cost-heading" class="font-semibold text-gray-800">Food Cost</h3>
          </header>

          <dl>
            <div class="flex justify-between items-baseline">
              <dt class="text-gray-500">Ingredients Total</dt>
              <dd class="text-2xl font-bold text-gray-800">{formatCurrency(foodCost)}</dd>
            </div>

            <div
              class="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm"
            >
              <dt class="text-gray-500">Per Serving</dt>
              <dd class="font-medium">
                {formatCurrency(recipe.servings > 0 ? foodCost / recipe.servings : 0)}
              </dd>
            </div>
          </dl>
        </article>

        <!-- Labor costs -->
        <article
          class="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
          aria-labelledby="labor-cost-heading"
        >
          <header class="flex items-center gap-2 mb-4">
            <div class="bg-blue-100 p-1.5 rounded-full">
              <Calculator class="h-4 w-4 text-blue-600" aria-hidden="true" />
            </div>
            <h3 id="labor-cost-heading" class="font-semibold text-gray-800">Labor Cost</h3>
          </header>

          <dl>
            <div class="flex justify-between items-baseline">
              <dt class="text-gray-500">Prep & Cooking</dt>
              <dd class="text-2xl font-bold text-gray-800">{formatCurrency(laborCost)}</dd>
            </div>

            {#if recipe.laborCosts?.[0]?.hourlyRate && recipe.laborCosts?.[0]?.timeInMinutes}
              <div class="mt-2 text-sm text-gray-500 flex justify-between">
                <dd>
                  <span
                    >({recipe.laborCosts[0].timeInMinutes} min @ ${recipe.laborCosts[0].hourlyRate.toFixed(
                      2
                    )}/hr)</span
                  >
                </dd>
              </div>
            {/if}

            <div
              class="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm"
            >
              <dt class="text-gray-500">Per Serving</dt>
              <dd class="font-medium">
                {formatCurrency(recipe.servings > 0 ? laborCost / recipe.servings : 0)}
              </dd>
            </div>
          </dl>
        </article>
      </div>

      <!-- Cost distribution chart -->
      <figure
        class="mt-6 bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
        aria-labelledby="cost-distribution-heading"
      >
        <figcaption class="flex items-center gap-2 mb-4">
          <div class="bg-purple-100 p-1.5 rounded-full">
            <TrendingUp class="h-4 w-4 text-purple-600" aria-hidden="true" />
          </div>
          <h3 id="cost-distribution-heading" class="font-semibold text-gray-800">
            Cost Distribution
          </h3>
        </figcaption>

        <div class="flex items-center mt-3" role="group" aria-labelledby="food-percentage-label">
          <div class="flex-1">
            <div class="relative h-4 overflow-hidden rounded-full bg-gray-100">
              {#if totalCost > 0}
                <div
                  class="absolute inset-y-0 left-0 bg-indigo-600 transition-all duration-300 ease-in-out"
                  style={`width: ${Math.min(100, (foodCost / totalCost) * 100)}%`}
                  role="progressbar"
                  aria-labelledby="food-percentage-label"
                  aria-valuenow={Math.round((foodCost / totalCost) * 100)}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              {/if}
            </div>
          </div>
          <div class="ml-4 w-20 text-right">
            <div id="food-percentage-label" class="text-xs font-medium text-gray-500">Food</div>
            <div class="text-sm font-semibold">
              {totalCost > 0 ? Math.round((foodCost / totalCost) * 100) : 0}%
            </div>
          </div>
        </div>

        <div class="flex items-center mt-3" role="group" aria-labelledby="labor-percentage-label">
          <div class="flex-1">
            <div class="relative h-4 overflow-hidden rounded-full bg-gray-100">
              {#if totalCost > 0}
                <div
                  class="absolute inset-y-0 left-0 bg-blue-500 transition-all duration-300 ease-in-out"
                  style={`width: ${Math.min(100, (laborCost / totalCost) * 100)}%`}
                  role="progressbar"
                  aria-labelledby="labor-percentage-label"
                  aria-valuenow={Math.round((laborCost / totalCost) * 100)}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              {/if}
            </div>
          </div>
          <div class="ml-4 w-20 text-right">
            <div id="labor-percentage-label" class="text-xs font-medium text-gray-500">Labor</div>
            <div class="text-sm font-semibold">
              {totalCost > 0 ? Math.round((laborCost / totalCost) * 100) : 0}%
            </div>
          </div>
        </div>
      </figure>

      <!-- Serving cost info -->
      <footer class="mt-6 flex justify-between items-center">
        <div class="text-sm text-gray-500">
          <strong>Recipe yields:</strong>
          <span class="font-medium text-gray-700">{recipe.servings}</span> servings
        </div>
        <time datetime={new Date().toISOString()} class="text-sm text-gray-600">
          Updated <span class="font-medium">{new Date().toLocaleDateString()}</span>
        </time>
      </footer>
    </Card.Content>
  </Card.Root>
</section>

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

<section aria-labelledby="overview-heading" class="max-w-4xl mx-auto">
  <Card.Root class="border-0 shadow-md rounded-xl overflow-hidden">
    <Card.Header class="bg-gradient-to-r from-amber-50 to-orange-50 pb-4">
      <Card.Title id="overview-heading" class="text-2xl font-bold text-gray-800"
        >Recipe Overview</Card.Title
      >
    </Card.Header>

    <Card.Content class="p-6">
      <!-- Recipe description with appropriate semantic markup -->
      <article class="prose max-w-none text-gray-700">
        {#if recipe.description}
          <p>{recipe.description}</p>
        {:else}
          <p class="italic text-gray-500">No detailed description available.</p>
        {/if}
      </article>

      <!-- Recipe specifications with improved layout and semantics -->
      <dl class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div
          class="bg-amber-50 border border-amber-100 p-4 rounded-lg text-center"
          role="group"
          aria-labelledby="prep-time-label"
        >
          <dt
            id="prep-time-label"
            class="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-amber-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Prep Time</span>
          </dt>
          <dd class="font-semibold mt-1 text-lg text-gray-800">
            {recipeState.formatTime(recipe.prepTime)}
          </dd>
        </div>

        <div
          class="bg-orange-50 border border-orange-100 p-4 rounded-lg text-center"
          role="group"
          aria-labelledby="cook-time-label"
        >
          <dt
            id="cook-time-label"
            class="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span>Cook Time</span>
          </dt>
          <dd class="font-semibold mt-1 text-lg text-gray-800">
            {recipeState.formatTime(recipe.cookTime)}
          </dd>
        </div>

        <div
          class="bg-red-50 border border-red-100 p-4 rounded-lg text-center"
          role="group"
          aria-labelledby="total-time-label"
        >
          <dt
            id="total-time-label"
            class="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Total Time</span>
          </dt>
          <dd class="font-semibold mt-1 text-lg text-gray-800">{recipeState.getTotalTime()}</dd>
        </div>

        <div
          class="bg-green-50 border border-green-100 p-4 rounded-lg text-center"
          role="group"
          aria-labelledby="servings-label"
        >
          <dt
            id="servings-label"
            class="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>Servings</span>
          </dt>
          <dd class="font-semibold mt-1 text-lg text-gray-800">
            <span>{recipe.servings}</span>
            <span class="sr-only">servings</span>
          </dd>
        </div>
      </dl>

      <!-- Difficulty and Category information -->
      {#if recipe.difficulty || recipe.category}
        <div class="flex flex-wrap gap-4 mt-6">
          {#if recipe.difficulty}
            <div
              class="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
            >
              <span class="mr-1 text-xs">Difficulty:</span>
              <span>{recipe.difficulty}</span>
            </div>
          {/if}

          {#if recipe.category}
            <div
              class="inline-flex items-center rounded-full bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-700"
            >
              <span class="mr-1 text-xs">Category:</span>
              <span>{recipe.category}</span>
            </div>
          {/if}
        </div>
      {/if}

      <!-- Time breakdown visualization - optional enhancement -->
      {#if recipe.prepTime > 0 || recipe.cookTime > 0}
        <div class="mt-6" aria-hidden="true">
          <p class="text-xs text-gray-500 mb-2">Time Distribution</p>
          <div class="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            {#if recipe.prepTime > 0 && recipe.cookTime > 0}
              <div
                class="h-full bg-amber-400"
                style={`width: ${(recipe.prepTime / (recipe.prepTime + recipe.cookTime)) * 100}%`}
              ></div>
            {/if}
          </div>
          <div class="flex justify-between mt-1">
            <span class="text-xs text-gray-500"
              >Prep ({Math.round(
                (recipe.prepTime / (recipe.prepTime + recipe.cookTime)) * 100
              )}%)</span
            >
            <span class="text-xs text-gray-500"
              >Cook ({Math.round(
                (recipe.cookTime / (recipe.prepTime + recipe.cookTime)) * 100
              )}%)</span
            >
          </div>
        </div>
      {/if}
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

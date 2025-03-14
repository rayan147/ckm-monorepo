<!-- src/lib/recipe/tabs/IngredientsTab.svelte -->
<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';

  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;
</script>

<section aria-labelledby="ingredients-list-heading">
  <Card.Root>
    <Card.Header>
      <Card.Title>Ingredients</Card.Title>
      <Card.Description>Ingredients for {recipe.servings} servings</Card.Description>
    </Card.Header>
    <Card.Content class="p-6">
      {#if recipe.ingredients && recipe.ingredients.length > 0}
        <ul class="space-y-4">
          {#each recipe.ingredients as ingredient}
            <li
              class="flex justify-between items-center gap-1 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span>{ingredient.ingredient?.name || 'Unknown ingredient'}</span>
              <span class="font-semibold">{ingredient.quantity.toFixed(2)} {ingredient.unit}</span>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="text-gray-500 italic">No ingredients added yet.</p>
      {/if}
    </Card.Content>
  </Card.Root>
</section>

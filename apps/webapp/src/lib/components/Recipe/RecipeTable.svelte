<script lang="ts">
  import { Edit, Trash2 } from 'lucide-svelte';
  import { getContext } from 'svelte';
  import { recipeStore } from '$lib/stores/recipeStore';
  import type { RecipeState } from '$lib/stores/recipe.svelte';

  // interface Props {
  // 	recipes: Recipe[];
  // 	viewRecipe: (recipe: Recipe) => void;
  // 	editRecipe: (recipe: Recipe) => void;
  // }
  //
  // let { recipes, viewRecipe, editRecipe }: Props = $props();
  const recipeState = getContext<RecipeState>('recipeState');
  $effect(() => {
    console.log(recipeState);
  });
</script>

<div class="overflow-x-auto">
  <table class="min-w-full bg-white border border-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >Name</th
        >
        <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >Image</th
        >
        <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >Prep Time</th
        >
        <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >Cook Time</th
        >
        <th class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
          >Actions</th
        >
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      {#each recipeState.recipes as recipe (recipe.id)}
        <tr>
          <td class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
            >{recipe.name}</td
          >
          <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
            {#if recipe.imageUrl && recipe.imageUrl.length > 0}
              <img
                src={recipe.imageUrl[0]}
                alt={recipe.name}
                class="object-cover w-10 h-10 rounded"
              />
            {/if}
          </td>
          <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{recipe.prepTime} mins</td>
          <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{recipe.cookTime} mins</td>
          <td class="px-6 py-4 text-sm text-center whitespace-nowrap">
            <button
              onclick={() => recipeState.viewRecipe(recipe)}
              class="mr-2 text-indigo-600 hover:text-indigo-900"
              aria-label="View Recipe"
            >
              <Edit class="inline-block w-4 h-4" />
              <span class="sr-only">View</span>
            </button>
            <button
              onclick={() => recipeState.editRecipe(recipe)}
              class="mr-2 text-yellow-600 hover:text-yellow-900"
              aria-label="Edit Recipe"
            >
              <Edit class="inline-block w-4 h-4" />
              <span class="sr-only">Edit</span>
            </button>
            <button
              onclick={() => recipeStore.deleteRecipe(recipe.id)}
              class="text-red-600 hover:text-red-900"
              aria-label="Delete Recipe"
            >
              <Trash2 class="inline-block w-4 h-4" />
              <span class="sr-only">Delete</span>
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

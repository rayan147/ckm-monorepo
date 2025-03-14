<!-- src/routes/recipe/[id]/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageProps } from './$types';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { RecipeState, setRecipeContext } from '$lib/contexts/recipe-context.svelte';
  import RecipeHeader from '$lib/components/recipes/recipe-header.svelte';
  import RecipeVisuals from '$lib/components/recipes/recipe-visuals.svelte';
  import RecipeTabs from '$lib/components/recipes/recipe-tabs.svelte';
  import TimerDialog from '$lib/components/recipes/timer-dialog.svelte';
  import ImageModal from '$lib/components/recipes/image-modal.svelte';
  import CompletionModal from '$lib/components/recipes/completion-modal.svelte';

  // Initialize props
  let { data }: PageProps = $props();

  // Create recipe state instance
  const recipeState = $state(new RecipeState(data.recipe));

  // Set context for child components
  setRecipeContext(recipeState);

  // Store active tab preference
  $effect(() => {
    if (browser && recipeState.activeTab) {
      try {
        localStorage.setItem('recipeDetailActiveTab', recipeState.activeTab);
      } catch (e) {
        console.error('Error saving tab preference:', e);
      }
    }
  });

  // Load saved tab preference on mount
  onMount(() => {
    try {
      if (browser) {
        const savedTab = localStorage.getItem('recipeDetailActiveTab');
        if (savedTab) {
          recipeState.activeTab = savedTab;
        }
      }
    } catch (e) {
      console.error('Error loading tab preference:', e);
    }

    // Clean up timer on component destroy
    return () => {
      if (recipeState.timerInterval) clearInterval(recipeState.timerInterval);
    };
  });

  // Navigate back to recipes list
  function goBack() {
    goto('/dashboard/kitchen/');
  }
</script>

<main class="container mx-auto px-6 py-8 max-w-7xl">
  <RecipeHeader {goBack} />

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 m-3">
    <RecipeVisuals />
    <article aria-labelledby="recipe-title" class="space-y-8">
      <header>
        <h1 id="recipe-title" class="text-4xl font-bold text-gray-800">
          {data.recipe.name}
        </h1>
        {#if data.recipe.description}
          <p class="text-lg text-gray-600 max-w-prose mt-4">
            {data.recipe.description}
          </p>
        {/if}
        {#if data.recipe.tags && data.recipe.tags.length > 0}
          <ul class="flex flex-wrap gap-2 mt-4" aria-label="Recipe tags">
            {#each data.recipe.tags as tag}
              <li>
                <Badge variant="secondary" class="text-xs">{tag.name}</Badge>
              </li>
            {/each}
          </ul>
        {/if}
      </header>

      <RecipeTabs />
    </article>
  </div>

  <!-- Modals -->
  <TimerDialog />
  <ImageModal />
  <CompletionModal />
</main>

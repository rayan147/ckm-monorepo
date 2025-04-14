<!-- src/lib/components/domain/recipes/recipe-header.svelte -->
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { History, Printer, Share2, Tag } from 'lucide-svelte';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';
  import { printRecipe } from './print-recipe';
  import { printRecipeLabel } from './print-recipe-label';
  // Get props
  const recipeState = getRecipeContext();
  let { showVersionHistory = $bindable() } = $props();
  // Function to handle print button click
  function handlePrintClick() {
    printRecipe(recipeState.recipe);
  }
  // Function to handle print label click
  function handlePrintLabelClick() {
    printRecipeLabel(recipeState.recipe);
  }
  function shareRecipe() {
    if (navigator.share) {
      navigator
        .share({
          title: recipeState.name,
          text: recipeState.description || `Check out this ${recipeState.name} recipe!`,
          url: window.location.href
        })
        .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          // Show toast notification
          // Assuming you have a toast component
          console.log('Link copied to clipboard');
        })
        .catch((err) => {
          console.error('Could not copy text: ', err);
        });
    }
  }
</script>

<header class="flex justify-between items-center mb-8">
  <nav aria-label="Recipe actions">
    <!-- Alternative approach with separate button -->
    <ul class="flex items-center gap-4">
      <li>
        <Button
          variant="outline"
          onclick={() => (showVersionHistory = !showVersionHistory)}
          size="sm"
          class="flex items-center gap-1 hover:bg-primary/10 transition-colors rounded-lg"
          aria-label="Save recipe"
        >
          <History class="h-4 w-4 mr-1" aria-hidden="true" />
          <span class="hidden md:inline">Version</span>
        </Button>
      </li>
      <li>
        <Button
          variant="outline"
          size="sm"
          onclick={handlePrintClick}
          class="flex items-center gap-1 hover:bg-primary/10 transition-colors rounded-lg"
          aria-label="Print recipe"
        >
          <Printer class="h-4 w-4" aria-hidden="true" />
          <span class="hidden md:inline">Print</span>
        </Button>
      </li>
      <li>
        <Button
          variant="outline"
          size="sm"
          onclick={handlePrintLabelClick}
          class="flex items-center gap-1 hover:bg-primary/10 transition-colors rounded-lg"
          aria-label="Print recipe label"
        >
          <Tag class="h-4 w-4" aria-hidden="true" />
          <span class="hidden md:inline">Label</span>
        </Button>
      </li>
      <li>
        <Button
          variant="outline"
          onclick={shareRecipe}
          size="sm"
          class="flex items-center gap-1 hover:bg-primary/10 transition-colors rounded-lg"
          aria-label="Share recipe"
        >
          <Share2 class="h-4 w-4" aria-hidden="true" />
          <span class="hidden md:inline">Share</span>
        </Button>
      </li>
    </ul>
  </nav>
</header>

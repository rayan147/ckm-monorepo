<!-- src/lib/recipe/tabs/InstructionsTab.svelte -->
<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';
  import CurrentStep from '../current-step.svelte';

  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;
</script>

<section aria-labelledby="cooking-instructions-heading" class="recipe-instructions-container">
  <Card.Root class="bg-white shadow-sm">
    <Card.Header class="border-b">
      <Card.Title id="cooking-instructions-heading" class="text-xl">Recipe Instructions</Card.Title>
      <Card.Description>
        Follow these {recipe.instructions?.length || 0} steps to prepare {recipe.name ||
          'this recipe'}
      </Card.Description>
    </Card.Header>

    <Card.Content class="p-6">
      <CurrentStep />

      <!-- Optional footer note -->
      <p class="mt-6 text-sm text-gray-500 text-center italic">
        Expand each step to view detailed instructions and visual guides
      </p>
    </Card.Content>
  </Card.Root>
</section>

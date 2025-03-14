<!-- src/lib/recipe/components/StepIndicators.svelte -->
<script lang="ts">
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';

  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;
</script>

<div class="flex flex-wrap gap-2 mb-6 justify-center">
  {#each recipe.instructions as _, index}
    {@const stepNumber = index + 1}
    <button
      on:click={() => recipeState.goToStep(stepNumber)}
      class={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors
      ${recipeState.currentStep === stepNumber ? 'ring-2 ring-primary ring-offset-2' : ''}
      ${
        recipeState.completedSteps.includes(stepNumber)
          ? 'bg-green-500 text-white'
          : stepNumber < recipeState.currentStep
            ? 'bg-gray-300 text-gray-700'
            : 'bg-gray-100 text-gray-700'
      }`}
      aria-label={`Go to step ${stepNumber}`}
      aria-current={recipeState.currentStep === stepNumber ? 'step' : undefined}
    >
      {recipeState.completedSteps.includes(stepNumber) ? '✓' : stepNumber}
    </button>
  {/each}
</div>

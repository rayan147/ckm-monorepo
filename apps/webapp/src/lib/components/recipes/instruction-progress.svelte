<!-- src/lib/recipe/components/InstructionProgress.svelte -->
<script lang="ts">
  import { Progress } from '$lib/components/ui/progress';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';

  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;
</script>

<div class="mb-6">
  <div class="flex items-center justify-between mb-2">
    <span class="text-sm font-medium text-gray-700">
      Step {recipeState.currentStep} of {recipe.instructions.length}
    </span>
    <span class="text-sm text-primary font-medium">
      {recipeState.completedSteps.length} of {recipe.instructions.length} steps completed
    </span>
  </div>
  <Progress value={recipeState.getProgressValue()} max={100} class="w-full h-2" />
</div>

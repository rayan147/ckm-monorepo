<!-- src/lib/recipe/components/CurrentStep.svelte -->
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { AspectRatio } from '$lib/components/ui/aspect-ratio';
  import { ArrowLeft, ArrowRight, Clock, Check, CheckCircle, AlertTriangle } from 'lucide-svelte';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';
  import StepDetails from './step-details.svelte';
  import StepTips from './step-tips.svelte';

  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;

  const instruction = recipe.instructions[recipeState.currentStep - 1];

  // Helper function to check if a step is completed
  function isStepCompleted(stepNumber: number): boolean {
    return recipeState.completedSteps.includes(stepNumber);
  }
</script>

{#if instruction}
  <div
    id={`step-${recipeState.currentStep}`}
    class="p-5 rounded-lg border border-gray-200 instruction-step transition-all duration-200 mb-8 ring-2 ring-primary ring-offset-2"
  >
    <!-- Step header -->
    <div class="flex items-center justify-between mb-4">
      <h4 class="text-lg font-semibold flex items-center gap-2">
        <span
          class={`flex items-center justify-center w-8 h-8 rounded-full text-sm 
          ${
            isStepCompleted(recipeState.currentStep)
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {isStepCompleted(recipeState.currentStep)
            ? '✓'
            : instruction.stepNumber || recipeState.currentStep}
        </span>
        <span>Step {instruction.stepNumber || recipeState.currentStep}</span>

        {#if instruction.isCritical}
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 ml-2"
          >
            <AlertTriangle class="h-3 w-3 mr-1" />
            Critical
          </span>
        {/if}
      </h4>

      <!-- Step action buttons -->
      <div class="flex gap-2">
        {#if instruction.timeInMinutes}
          <Button
            variant="outline"
            size="sm"
            onclick={() => recipeState.startTimer(instruction.timeInMinutes)}
          >
            <Clock class="h-4 w-4 mr-1" />
            Set Timer
          </Button>
        {/if}

        <Button
          variant={isStepCompleted(recipeState.currentStep) ? 'outline' : 'default'}
          size="sm"
          onclick={() => recipeState.markStepComplete(recipeState.currentStep)}
        >
          <CheckCircle class="h-4 w-4 mr-1" />
          {isStepCompleted(recipeState.currentStep) ? 'Completed' : 'Mark Complete'}
        </Button>
      </div>
    </div>

    <!-- Step instruction -->
    <p class="mb-4 text-gray-700">{instruction.instruction}</p>

    <!-- Step image -->
    {#if instruction.imageUrl}
      <figure class="mb-4 overflow-hidden rounded-lg">
        <button
          class="w-full cursor-zoom-in block"
          onclick={() =>
            recipeState.openImageModal(
              instruction.imageUrl,
              `Step ${instruction.stepNumber || recipeState.currentStep}`
            )}
        >
          <AspectRatio ratio={16 / 9} class="bg-muted overflow-hidden rounded-md">
            <img
              src={instruction.imageUrl}
              alt={`Visual guide for step ${instruction.stepNumber || recipeState.currentStep}`}
              class="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </AspectRatio>
        </button>
        <figcaption class="mt-2 text-sm text-gray-500 text-center">
          Step {instruction.stepNumber || recipeState.currentStep} visual guide
        </figcaption>
      </figure>
    {/if}

    <!-- Step details (time & temperature) -->
    <StepDetails {instruction} />

    <!-- Step tips -->
    <StepTips {instruction} />

    <!-- Step navigation -->
    <div class="flex justify-between gap-2 mt-6">
      <Button
        variant="outline"
        disabled={recipeState.currentStep === 1}
        onclick={() => recipeState.previousStep()}
      >
        <ArrowLeft class="h-4 w-4 mr-1" />
        Previous
      </Button>

      {#if recipeState.currentStep < recipe.instructions.length}
        <Button
          variant="default"
          onclick={() => {
            // First mark current step as complete
            recipeState.markStepComplete(recipeState.currentStep);
            // Then move to next step
            recipeState.nextStep();
          }}
        >
          Complete & Continue
          <ArrowRight class="h-4 w-4 ml-1" />
        </Button>
      {:else}
        <Button
          variant="default"
          onclick={() => {
            recipeState.markStepComplete(recipeState.currentStep);
            recipeState.finishRecipe();
          }}
        >
          <Check class="h-4 w-4 mr-1" />
          Finish Recipe
        </Button>
      {/if}
    </div>
  </div>
{/if}

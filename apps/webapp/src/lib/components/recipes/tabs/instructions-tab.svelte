<!-- src/lib/recipe/tabs/InstructionsTab.svelte -->
<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { AlertTriangle } from 'lucide-svelte';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';
  import InstructionProgress from '../instruction-progress.svelte';
  import StepIndicators from '../step-indicators.svelte';
  import CurrentStep from '../current-step.svelte';
  import TimerDialog from '../timer-dialog.svelte';
  import ImageModal from '../image-modal.svelte';
  import CompletionModal from '../completion-modal.svelte';

  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;

  // Highlight current step and auto-scroll when changed
  $effect(() => {
    if (recipeState.currentStep > 0) {
      const stepElement = document.getElementById(`step-${recipeState.currentStep}`);
      if (stepElement) {
        // Remove highlight from all steps
        document.querySelectorAll('.instruction-step').forEach((el) => {
          el.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
        });

        // Add highlight to current step
        stepElement.classList.add('ring-2', 'ring-primary', 'ring-offset-2');

        // Scroll to the step
        stepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
</script>

<section aria-labelledby="cooking-instructions-heading">
  <Card.Root class="bg-white">
    <Card.Header class="border-b">
      <Card.Title id="cooking-instructions-heading">Step-by-Step Instructions</Card.Title>
      <Card.Description>Follow these steps to prepare the recipe</Card.Description>
    </Card.Header>

    <Card.Content class="p-6">
      {#if recipe.instructions && recipe.instructions.length > 0}
        <!-- Progress tracking -->
        <InstructionProgress />

        <!-- Step indicator pills -->
        <StepIndicators />

        <!-- Current instruction -->
        <CurrentStep />

        <!-- Recipe completion button -->
        <div class="border-t pt-6 flex justify-center">
          <Button onclick={() => recipeState.finishRecipe()}>
            <span class="flex items-center">
              <svg
                class="h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              I've Completed This Recipe
            </span>
          </Button>
        </div>
        <p class="mt-2 text-sm text-gray-500 text-center">
          Mark as complete to save to your cooking history
        </p>

        <TimerDialog />
        <ImageModal />
        <CompletionModal />
      {:else}
        <!-- Empty state -->
        <div class="text-center py-12">
          <div
            class="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4"
          >
            <AlertTriangle class="h-8 w-8 text-gray-400" />
          </div>
          <p class="text-gray-500 italic mb-4">No instructions added yet.</p>
          <Button>Add First Instruction</Button>
        </div>
      {/if}
    </Card.Content>
  </Card.Root>
</section>

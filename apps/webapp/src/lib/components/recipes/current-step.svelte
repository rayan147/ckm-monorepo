<!-- src/lib/recipe/components/CurrentStep.svelte -->
<script lang="ts">
  import { AspectRatio } from '$lib/components/ui/aspect-ratio';
  import * as Accordion from '$lib/components/ui/accordion/index.js';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';

  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;

  // Make sure we have a default value for the accordion
  let defaultOpenStep = `step-1`;
</script>

<div class="recipe-steps-accordion">
  {#if recipe.instructions && recipe.instructions.length > 0}
    <Accordion.Root type="single" value={defaultOpenStep} class="w-full">
      {#each recipe.instructions as instruction, index}
        {@const stepNumber = index + 1}

        <Accordion.Item
          value={`step-${stepNumber}`}
          class="mb-3 border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
        >
          <Accordion.Trigger
            class="px-5 py-4 w-full flex items-center justify-between bg-gray-50/50 hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center gap-3">
              <span
                class="flex items-center justify-center w-8 h-8 rounded-full text-sm bg-primary/10 text-primary font-medium"
              >
                {stepNumber}
              </span>
              <span class="font-medium text-gray-900">Step {stepNumber}</span>
            </div>
          </Accordion.Trigger>

          <Accordion.Content class="px-5 pb-5 pt-2 bg-white">
            <!-- Step instruction -->
            <p class="mb-4 text-gray-700">{instruction.instruction}</p>

            <!-- Step image (if available) -->
            {#if instruction.imageUrl}
              {console.log({ instruction })}
              <figure class="mb-4 overflow-hidden rounded-lg border border-gray-100">
                <AspectRatio ratio={16 / 9} class="bg-muted overflow-hidden rounded-md">
                  <img
                    src={instruction.imageUrl}
                    alt={`Visual guide for step ${stepNumber}`}
                    class="h-full w-full object-cover"
                  />
                </AspectRatio>
                <figcaption class="mt-2 text-sm text-gray-500 text-center p-2 bg-gray-50 border-t">
                  Visual guide for Step {stepNumber}
                </figcaption>
              </figure>
            {/if}

            <!-- Additional step details (if available) -->
            {#if instruction.details || instruction.timeInMinutes || instruction.temperature}
              <div class="mt-3 p-3 bg-gray-50 rounded-md text-sm text-gray-700">
                {#if instruction.timeInMinutes}
                  <div class="flex items-center gap-2 mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-gray-500"
                      ><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg
                    >
                    <span>Time: {instruction.timeInMinutes} minutes</span>
                  </div>
                {/if}

                {#if instruction.temperature}
                  <div class="flex items-center gap-2 mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-gray-500"
                      ><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" /></svg
                    >
                    <span>Temperature: {instruction.temperature}°</span>
                  </div>
                {/if}

                {#if instruction.details}
                  <div class="mt-1">{instruction.details}</div>
                {/if}
              </div>
            {/if}

            <!-- Tips (if available) -->
            {#if instruction.tips && instruction.tips.length > 0}
              <div class="mt-4 pt-3 border-t border-gray-100">
                <h5 class="text-sm font-medium text-gray-900 mb-2">Helpful Tips:</h5>
                <ul class="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {#each instruction.tips as tip}
                    <li>{tip}</li>
                  {/each}
                </ul>
              </div>
            {/if}
          </Accordion.Content>
        </Accordion.Item>
      {/each}
    </Accordion.Root>
  {:else}
    <div
      class="text-center py-8 text-gray-500 italic border border-dashed border-gray-200 rounded-lg p-6"
    >
      <p>No recipe instructions available</p>
    </div>
  {/if}
</div>

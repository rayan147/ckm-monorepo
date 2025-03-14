<!-- src/lib/recipe/tabs/SafetyTab.svelte -->
<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { AlertTriangle, Thermometer, Flame, Clock, Badge } from 'lucide-svelte';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';
  import StorageInstructions from '$lib/components/recipes/storage-instructions.svelte';

  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;
</script>

<section aria-labelledby="control-points-heading">
  <Card.Root>
    <Card.Header>
      <Card.Title id="control-points-heading" class="flex items-center gap-2">
        <AlertTriangle class="h-4 w-4 text-amber-500" aria-hidden="true" />
        Critical Control Points
      </Card.Title>
      <Card.Description>Important safety checkpoints</Card.Description>
    </Card.Header>
    <Card.Content class="p-6">
      {#if recipe.temperatures && recipe.temperatures.length > 0}
        <ul class="space-y-4">
          {#each recipe.temperatures as temp}
            <li
              class="p-4 border rounded-lg transition-shadow hover:shadow-md {temp.isCritical
                ? 'border-amber-200 bg-amber-50'
                : 'border-gray-200 bg-gray-50'}"
            >
              <div class="flex justify-between items-center">
                <h4 class="font-semibold flex items-center gap-2">
                  <Thermometer class="h-4 w-4 text-primary" aria-hidden="true" />
                  Step {temp.stepNumber}
                </h4>
                {#if temp.isCritical}
                  <Badge variant="outline" class="bg-amber-100 text-amber-800 border-amber-300">
                    Critical
                  </Badge>
                {/if}
              </div>
              <dl class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="flex items-center gap-2">
                  <Flame class="h-4 w-4 text-gray-500" aria-hidden="true" />
                  <div>
                    <dt class="sr-only">Temperature range</dt>
                    <dd class="text-sm">
                      {temp.minTemp.toFixed(2)}<strong>°C </strong> - {temp.maxTemp.toFixed(
                        2
                      )}<strong>°C</strong>
                    </dd>
                  </div>
                </div>

                {#if temp.holdTime}
                  <div class="flex items-center gap-2">
                    <Clock class="h-4 w-4 text-gray-500" aria-hidden="true" />
                    <div>
                      <dt class="sr-only">Hold time</dt>
                      <dd class="text-sm">Hold {temp.holdTime} mins</dd>
                    </div>
                  </div>
                {/if}
              </dl>

              {#if temp.description}
                <p class="mt-2 text-sm {temp.isCritical ? 'text-amber-800' : 'text-gray-600'}">
                  {temp.description}
                </p>
              {/if}
            </li>
          {/each}
        </ul>
      {:else}
        <p class="text-gray-500 italic">No temperature control points defined.</p>
      {/if}
    </Card.Content>
  </Card.Root>
</section>

{#if recipe.storage}
  <StorageInstructions />
{/if}

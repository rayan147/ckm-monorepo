<!-- src/lib/recipe/components/StorageInstructions.svelte -->
<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';
  import { Clock, AlertTriangle } from 'lucide-svelte';

  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;
</script>

<section aria-labelledby="storage-instructions-heading" class="mt-6">
  <Card.Root>
    <Card.Header>
      <Card.Title id="storage-instructions-heading" class="flex items-center gap-2">
        <Clock class="h-4 w-4 text-primary" aria-hidden="true" />
        Storage Instructions
      </Card.Title>
      <Card.Description>How to store this dish</Card.Description>
    </Card.Header>
    <Card.Content class="p-6">
      <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-gray-50 p-4 rounded-lg">
          <dt class="font-semibold text-sm text-gray-600 mb-2">Storage Method</dt>
          <dd class="text-gray-700">{recipe.storage.method}</dd>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg">
          <dt class="font-semibold text-sm text-gray-600 mb-2">Shelf Life</dt>
          <dd class="text-gray-700">
            {recipe.storage.shelfLife > 24
              ? `${Math.floor(recipe.storage.shelfLife / 24)} days ${recipe.storage.shelfLife % 24 > 0 ? 'and ' + (recipe.storage.shelfLife % 24) + ' hours' : ''}`
              : `${recipe.storage.shelfLife} hours`}
          </dd>
        </div>
      </dl>
      <dl class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {#if recipe.storage.temperature}
          <div class="bg-gray-50 p-4 rounded-lg">
            <dt class="font-semibold text-sm text-gray-600 mb-2">Storage Temperature</dt>
            <dd class="text-gray-700">
              {recipe.storage.temperature.toFixed(2)}°C
            </dd>
          </div>
        {/if}
        {#if recipe.storage.containerType}
          <div class="bg-gray-50 p-4 rounded-lg">
            <dt class="font-semibold text-sm text-gray-600 mb-2">Container Type</dt>
            <dd class="text-gray-700">{recipe.storage.containerType}</dd>
          </div>
        {/if}
      </dl>
      {#if recipe.storage.specialNotes}
        <div class="mt-4 p-4 border border-blue-200 bg-blue-50 rounded-lg" role="note">
          <h4 class="font-semibold flex items-center gap-2 text-blue-600 text-sm">
            <AlertTriangle class="h-4 w-4" aria-hidden="true" />
            Special Notes
          </h4>
          <p class="text-blue-800 text-sm">{recipe.storage.specialNotes}</p>
        </div>
      {/if}
    </Card.Content>
  </Card.Root>
</section>

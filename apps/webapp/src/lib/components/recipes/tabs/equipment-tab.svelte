<!-- src/lib/recipe/tabs/EquipmentTab.svelte -->
<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Utensils } from 'lucide-svelte';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';

  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;
</script>

<section aria-labelledby="equipment-list-heading">
  <Card.Root>
    <Card.Header>
      <Card.Title id="equipment-list-heading">Required Equipment</Card.Title>
      <Card.Description>Tools needed for this recipe</Card.Description>
    </Card.Header>
    <Card.Content class="p-6">
      {#if recipe.equipment && recipe.equipment.length > 0}
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each recipe.equipment as item}
            <li
              class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <Utensils class="h-5 w-5 text-gray-500" aria-hidden="true" />
              <div>
                <h3 class="font-semibold">{item.name}</h3>
                {#if item.description}
                  <p class="text-sm text-gray-600">{item.description}</p>
                {/if}
              </div>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="text-gray-500 italic">No equipment specified yet.</p>
      {/if}
    </Card.Content>
  </Card.Root>
</section>

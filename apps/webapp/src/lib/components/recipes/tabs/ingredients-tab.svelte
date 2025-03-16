<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Select } from '$lib/components/ui/select';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { MinusCircle, PlusCircle, Check, ArrowDownUp, ShoppingBag } from 'lucide-svelte';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';
  import { writable, derived } from 'svelte/store';

  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;

  // Servings adjustment
  const originalServings = recipe.servings;
  const servingsCount = writable(originalServings);

  // Unit preference
  const unitPreference = writable('metric'); // 'metric' or 'imperial'

  // Ingredient grouping (if available in the data model)
  function groupIngredients(ingredients) {
    // Group by processing step or ingredient type if available
    // For now we'll just return all ingredients, but this could be extended
    return {
      main: ingredients || []
    };
  }

  const groupedIngredients = groupIngredients(recipe.ingredients);

  // Calculate adjusted quantities based on servings
  const adjustedIngredients = derived(servingsCount, ($servingsCount) => {
    const ratio = $servingsCount / originalServings;

    const adjusted = {};

    for (const [group, items] of Object.entries(groupedIngredients)) {
      adjusted[group] = items.map((ingredient) => ({
        ...ingredient,
        adjustedQuantity: ingredient.quantity * ratio
      }));
    }

    return adjusted;
  });

  // Convert units if needed (basic implementation)
  function convertUnit(quantity, fromUnit, toPreference) {
    // Implement conversion logic for common units
    // This is a simplified example
    if (fromUnit === 'g' && toPreference === 'imperial') {
      return { quantity: quantity * 0.035274, unit: 'oz' };
    } else if (fromUnit === 'ml' && toPreference === 'imperial') {
      return { quantity: quantity * 0.033814, unit: 'fl oz' };
    } else if (fromUnit === 'oz' && toPreference === 'metric') {
      return { quantity: quantity * 28.3495, unit: 'g' };
    } else if (fromUnit === 'fl oz' && toPreference === 'metric') {
      return { quantity: quantity * 29.5735, unit: 'ml' };
    }

    // Default: no conversion needed
    return { quantity, unit: fromUnit };
  }

  // Format quantity for display
  function formatQuantity(quantity) {
    // For small quantities, show more precision
    if (quantity < 0.1) {
      return quantity.toFixed(3);
    } else if (quantity < 1) {
      return quantity.toFixed(2);
    } else if (Number.isInteger(quantity)) {
      return quantity.toString();
    } else {
      // Try to convert to fractions for common cooking measurements
      const fraction = approximateFraction(quantity);
      if (fraction) {
        return fraction;
      }
      return quantity.toFixed(1);
    }
  }

  // Convert decimal to fraction for cooking measurements
  function approximateFraction(decimal) {
    const tolerance = 0.01;
    const fractions = {
      0.25: '¼',
      0.33: '⅓',
      0.5: '½',
      0.66: '⅔',
      0.75: '¾'
    };

    // Handle whole numbers with fractions
    const wholePart = Math.floor(decimal);
    const decimalPart = decimal - wholePart;

    // Find closest fraction
    for (const [key, value] of Object.entries(fractions)) {
      if (Math.abs(decimalPart - parseFloat(key)) < tolerance) {
        return wholePart > 0 ? `${wholePart} ${value}` : value;
      }
    }

    return null;
  }

  // For shopping list functionality
  const shoppingItems = writable([]);

  function addToShoppingList(ingredient) {
    shoppingItems.update((items) => {
      const newItems = [...items, ingredient];
      // We would save this to localStorage or user's profile
      return newItems;
    });
  }

  function toggleAllShoppingItems() {
    const allIngredients = Object.values(groupedIngredients).flat();
    shoppingItems.update((items) => {
      // If all ingredients are already in the list, clear it
      if (items.length === allIngredients.length) {
        return [];
      }
      // Otherwise add all ingredients
      return [...allIngredients];
    });
  }
</script>

<section aria-labelledby="ingredients-heading" class="mb-6">
  <Card.Root>
    <Card.Header class="flex flex-row items-center justify-between">
      <div>
        <Card.Title id="ingredients-heading" class="text-xl">Ingredients</Card.Title>
        <Card.Description>
          Ingredients for {$servingsCount} servings
        </Card.Description>
      </div>

      <div class="flex items-center gap-2">
        <!-- Servings adjustment -->
        <div class="flex items-center bg-gray-100 rounded-md">
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8"
            aria-label="Decrease servings"
            disabled={$servingsCount <= 1}
            onclick={() => servingsCount.update((n) => Math.max(1, n - 1))}
          >
            <MinusCircle class="h-4 w-4" />
          </Button>
          <Input
            type="number"
            min="1"
            class="h-8 w-16 text-center border-0 bg-transparent"
            bind:value={$servingsCount}
          />
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8"
            aria-label="Increase servings"
            onclick={() => servingsCount.update((n) => n + 1)}
          >
            <PlusCircle class="h-4 w-4" />
          </Button>
        </div>

        <!-- Unit toggle -->
        <Select bind:value={$unitPreference} aria-label="Measurement unit preference" class="h-8">
          <option value="metric">Metric</option>
          <option value="imperial">Imperial</option>
        </Select>

        <!-- Shopping list button -->
        <Button
          variant="outline"
          size="sm"
          class="flex items-center gap-1"
          on:click={toggleAllShoppingItems}
          aria-label="Add all ingredients to shopping list"
        >
          <ShoppingBag class="h-4 w-4" />
          <span class="sr-only md:not-sr-only">Shopping List</span>
        </Button>
      </div>
    </Card.Header>

    <Card.Content class="p-6">
      {#if recipe.ingredients && recipe.ingredients.length > 0}
        <div class="space-y-6">
          {#each Object.entries($adjustedIngredients) as [group, ingredients]}
            {#if ingredients.length > 0}
              {#if Object.keys($adjustedIngredients).length > 1}
                <h3 class="font-medium text-gray-900 mb-3 capitalize">{group}</h3>
              {/if}

              <ul class="space-y-2 divide-y divide-gray-100">
                {#each ingredients as ingredient}
                  {@const converted = convertUnit(
                    ingredient.adjustedQuantity,
                    ingredient.unit,
                    $unitPreference
                  )}

                  <li class="flex items-center py-2 group">
                    <div
                      class="flex-1 flex justify-between items-center gap-1 hover:bg-gray-50 rounded-lg p-2 transition-colors"
                    >
                      <div class="flex items-center gap-2">
                        <!-- Optional checkbox for ingredients -->
                        <Checkbox
                          id={`ingredient-${ingredient.id}`}
                          class="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                        />

                        <span class={ingredient.isOptional ? 'text-gray-500 italic' : ''}>
                          {ingredient.ingredient?.name || 'Unknown ingredient'}
                          {#if ingredient.processingInstructions}
                            <span class="text-gray-500 text-sm ml-1">
                              ({ingredient.processingInstructions})
                            </span>
                          {/if}
                        </span>
                      </div>

                      <div class="flex items-center gap-2">
                        <span class="font-semibold whitespace-nowrap">
                          {formatQuantity(converted.quantity)}
                          {converted.unit}
                        </span>

                        <Button
                          variant="ghost"
                          size="icon"
                          class="h-6 w-6 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                          aria-label="Add to shopping list"
                          on:click={() => addToShoppingList(ingredient)}
                        >
                          <ShoppingBag class="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </li>
                {/each}
              </ul>
            {/if}
          {/each}
        </div>
      {:else}
        <div class="text-center py-8">
          <p class="text-gray-500 italic">No ingredients added yet.</p>
          <Button variant="outline" class="mt-4">Add ingredients</Button>
        </div>
      {/if}
    </Card.Content>
  </Card.Root>
</section>

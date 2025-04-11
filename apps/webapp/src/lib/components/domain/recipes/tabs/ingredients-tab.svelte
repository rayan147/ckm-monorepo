<!-- File: $lib/components/ingredients-card.svelte -->

<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Select } from '$lib/components/ui/select';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import * as Tooltip from '$lib/components/ui/tooltip';
  import { Badge } from '$lib/components/ui/badge';
  import { MinusCircle, PlusCircle, ShoppingBag, Scale } from 'lucide-svelte';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';
  import { convertUnits, isVolumeUnit, isWeightUnit } from '$lib/utils/unitConversion';

  // Define interfaces for type safety
  interface Ingredient {
    id: string;
    name?: string;
    ingredient?: {
      name: string;
      [key: string]: any;
    };
    quantity: number;
    adjustedQuantity?: number;
    unit?: string;
    category?: string;
    processingInstructions?: string;
    isOptional?: boolean;
    density?: number;
    customDensity?: number;
  }

  interface Recipe {
    servings: number;
    ingredients: Ingredient[];
    [key: string]: any;
  }

  interface DensityPreset {
    name: string;
    value: number;
    fromUnit: string;
    toUnit: string;
  }

  interface ConvertedUnit {
    quantity: number;
    unit: string;
  }

  interface IngredientGroups {
    [groupName: string]: Ingredient[];
  }

  // Get recipe data from context
  const recipeState = getRecipeContext();
  const recipe = $state(recipeState.recipe as Recipe);

  // Runes for state management
  const originalServings = recipe.servings || 2;
  let servingsCount = $state(originalServings);
  let unitPreference = $state<'metric' | 'imperial'>('metric');
  let showDensityControls = $state(false);
  let editingDensityFor = $state<string | null>(null);
  let shoppingItems = $state<Ingredient[]>([]);

  // Common ingredient densities (g/ml)
  const commonDensities: DensityPreset[] = [
    { name: 'All-purpose flour', value: 0.53, fromUnit: 'cup', toUnit: 'gram' },
    { name: 'Bread flour', value: 0.55, fromUnit: 'cup', toUnit: 'gram' },
    { name: 'Sugar, granulated', value: 0.85, fromUnit: 'cup', toUnit: 'gram' },
    { name: 'Sugar, brown', value: 0.8, fromUnit: 'cup', toUnit: 'gram' },
    { name: 'Sugar, powdered', value: 0.56, fromUnit: 'cup', toUnit: 'gram' },
    { name: 'Salt', value: 1.2, fromUnit: 'cup', toUnit: 'gram' },
    { name: 'Butter', value: 0.96, fromUnit: 'cup', toUnit: 'gram' },
    { name: 'Oil', value: 0.92, fromUnit: 'cup', toUnit: 'gram' },
    { name: 'Milk', value: 1.03, fromUnit: 'cup', toUnit: 'gram' },
    { name: 'Water', value: 1.0, fromUnit: 'cup', toUnit: 'gram' },
    { name: 'Honey', value: 1.42, fromUnit: 'cup', toUnit: 'gram' },
    { name: 'Rice, uncooked', value: 0.75, fromUnit: 'cup', toUnit: 'gram' }
  ];

  // Assign densities to ingredients when possible
  function assignIngredientDensities(ingredients: Ingredient[]): Ingredient[] {
    if (!ingredients) return [];

    return ingredients.map((ingredient) => {
      const ingredientName = ingredient.ingredient?.name?.toLowerCase() || '';

      // Try to find a matching density from our common densities
      let density: number | undefined = undefined;

      if (ingredientName.includes('flour')) {
        density = commonDensities.find((d) => d.name.toLowerCase().includes('flour'))?.value;
      } else if (ingredientName.includes('sugar')) {
        if (ingredientName.includes('brown')) {
          density = commonDensities.find((d) => d.name.toLowerCase().includes('brown'))?.value;
        } else if (ingredientName.includes('powder')) {
          density = commonDensities.find((d) => d.name.toLowerCase().includes('powdered'))?.value;
        } else {
          density = commonDensities.find((d) => d.name.toLowerCase().includes('granulated'))?.value;
        }
      } else if (ingredientName.includes('salt')) {
        density = commonDensities.find((d) => d.name.toLowerCase().includes('salt'))?.value;
      } else if (ingredientName.includes('butter')) {
        density = commonDensities.find((d) => d.name.toLowerCase().includes('butter'))?.value;
      } else if (ingredientName.includes('oil')) {
        density = commonDensities.find((d) => d.name.toLowerCase().includes('oil'))?.value;
      } else if (ingredientName.includes('milk')) {
        density = commonDensities.find((d) => d.name.toLowerCase().includes('milk'))?.value;
      } else if (ingredientName.includes('water')) {
        density = commonDensities.find((d) => d.name.toLowerCase().includes('water'))?.value;
      } else if (ingredientName.includes('honey')) {
        density = commonDensities.find((d) => d.name.toLowerCase().includes('honey'))?.value;
      } else if (ingredientName.includes('rice')) {
        density = commonDensities.find((d) => d.name.toLowerCase().includes('rice'))?.value;
      }

      return {
        ...ingredient,
        density,
        customDensity: density
      };
    });
  }

  // Group ingredients by category if available
  function groupIngredients(ingredients: Ingredient[]): IngredientGroups {
    if (!ingredients || !ingredients.length) {
      return { main: [] };
    }

    // Add density information and assign reasonable defaults
    let withDensity = assignIngredientDensities(ingredients);

    // Add sensible defaults for units if missing based on ingredient type
    withDensity = withDensity.map((ingredient) => {
      // Skip if unit is already defined
      if (ingredient.unit) return ingredient;

      const name = (ingredient.ingredient?.name || ingredient.name || '').toLowerCase();

      // Assign default units based on ingredient type
      if (
        name.includes('flour') ||
        name.includes('sugar') ||
        name.includes('rice') ||
        name.includes('oat') ||
        name.includes('bean') ||
        name.includes('grain') ||
        name.includes('salt') ||
        name.includes('powder')
      ) {
        // Dry ingredients typically measured by weight
        return { ...ingredient, unit: unitPreference === 'metric' ? 'gram' : 'ounce' };
      } else if (
        name.includes('water') ||
        name.includes('milk') ||
        name.includes('cream') ||
        name.includes('stock') ||
        name.includes('broth') ||
        name.includes('juice') ||
        name.includes('oil') ||
        name.includes('vinegar') ||
        name.includes('sauce') ||
        name.includes('wine') ||
        name.includes('beer')
      ) {
        // Liquid ingredients
        return { ...ingredient, unit: unitPreference === 'metric' ? 'milliliter' : 'cup' };
      } else if (
        name.includes('herb') ||
        name.includes('spice') ||
        name.includes('basil') ||
        name.includes('oregano') ||
        name.includes('thyme') ||
        name.includes('mint') ||
        name.includes('cilantro') ||
        name.includes('parsley') ||
        name.includes('tarragon') ||
        name.includes('pepper') ||
        name.includes('cinnamon') ||
        name.includes('cumin')
      ) {
        // Herbs and spices
        return { ...ingredient, unit: unitPreference === 'metric' ? 'gram' : 'teaspoon' };
      } else if (
        name.includes('meat') ||
        name.includes('beef') ||
        name.includes('chicken') ||
        name.includes('pork') ||
        name.includes('fish') ||
        name.includes('salmon') ||
        name.includes('tuna') ||
        name.includes('lamb') ||
        name.includes('shrimp') ||
        name.includes('turkey') ||
        name.includes('scallop')
      ) {
        // Meats and fish
        return { ...ingredient, unit: unitPreference === 'metric' ? 'gram' : 'pound' };
      } else if (
        name.includes('vegetable') ||
        name.includes('spinach') ||
        name.includes('lettuce') ||
        name.includes('cabbage') ||
        name.includes('carrot') ||
        name.includes('potato') ||
        name.includes('onion') ||
        name.includes('garlic') ||
        name.includes('tomato') ||
        name.includes('pepper') ||
        name.includes('broccoli') ||
        name.includes('parsnip')
      ) {
        // Vegetables
        return { ...ingredient, unit: unitPreference === 'metric' ? 'gram' : 'ounce' };
      } else if (
        name.includes('fruit') ||
        name.includes('apple') ||
        name.includes('banana') ||
        name.includes('orange') ||
        name.includes('grape') ||
        name.includes('berry') ||
        name.includes('strawberry') ||
        name.includes('blueberry') ||
        name.includes('raspberry')
      ) {
        // Fruits
        return { ...ingredient, unit: unitPreference === 'metric' ? 'gram' : 'ounce' };
      } else {
        // Default fallback for unknown ingredients
        return { ...ingredient, unit: unitPreference === 'metric' ? 'gram' : 'ounce' };
      }
    });

    // Group by category if available
    const grouped = withDensity.reduce<IngredientGroups>((acc, ingredient) => {
      const group = ingredient.category || 'main';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(ingredient);
      return acc;
    }, {});

    // Ensure there's at least a 'main' group
    if (Object.keys(grouped).length === 0) {
      return { main: withDensity };
    }

    return grouped;
  }

  // Initial grouped ingredients
  const groupedIngredients = $state(groupIngredients(recipe.ingredients || []));

  // Calculate adjusted ingredients
  function calculateAdjustedIngredients(): IngredientGroups {
    const ratio = servingsCount / originalServings;
    const adjusted: IngredientGroups = {};

    for (const [group, items] of Object.entries(groupedIngredients)) {
      adjusted[group] = items.map((ingredient) => {
        // Calculate scaled quantity
        const scaledQuantity = ingredient.quantity * ratio;

        return {
          ...ingredient,
          adjustedQuantity: scaledQuantity
        };
      });
    }

    return adjusted;
  }

  // Get the adjusted ingredients (reactively)
  const adjustedIngredients = $derived(calculateAdjustedIngredients());

  // Smart unit conversion with appropriate scaling
  function convertUnit(ingredient: Ingredient): ConvertedUnit {
    if (!ingredient || !ingredient.unit)
      return { quantity: ingredient.adjustedQuantity || 0, unit: '' };

    const { adjustedQuantity = 0, unit, customDensity } = ingredient;
    const fromUnit = unit;
    let targetUnit: string;
    let quantity = adjustedQuantity;

    // Determine the most appropriate unit based on quantity and preference
    // rather than direct conversion which can lead to impractical measurements

    // VOLUME CONVERSIONS (based on cooking practicality)
    if (isVolumeUnit(fromUnit)) {
      if (unitPreference === 'metric') {
        // Convert to appropriate metric volume unit
        if (quantity < 0.005) {
          // Less than 5ml
          targetUnit = 'milliliter';
        } else if (quantity < 0.1) {
          // Less than 100ml
          targetUnit = 'milliliter';
        } else if (quantity < 1) {
          // Less than 1L
          targetUnit = 'milliliter';
        } else {
          targetUnit = 'liter';
        }
      } else {
        // Convert to appropriate imperial volume unit
        if (quantity < 0.015) {
          // Less than ~1/4 tsp
          targetUnit = 'teaspoon';
        } else if (quantity < 0.05) {
          // Less than 1 tbsp
          targetUnit = 'teaspoon';
        } else if (quantity < 0.25) {
          // Less than 1/4 cup
          targetUnit = 'tablespoon';
        } else if (quantity < 2) {
          // Less than 2 cups
          targetUnit = 'cup';
        } else if (quantity < 4) {
          // Less than 1 quart
          targetUnit = 'cup';
        } else {
          targetUnit = 'quart';
        }
      }
    }
    // WEIGHT CONVERSIONS
    else if (isWeightUnit(fromUnit)) {
      if (unitPreference === 'metric') {
        // Convert to appropriate metric weight unit
        if (quantity < 1000) {
          // Less than 1kg
          targetUnit = 'gram';
        } else {
          targetUnit = 'kilogram';
        }
      } else {
        // Convert to appropriate imperial weight unit
        if (quantity < 454) {
          // Less than 1lb (454g)
          targetUnit = 'ounce';
        } else {
          targetUnit = 'pound';
        }
      }
    } else {
      // For non-standard units, keep as is
      targetUnit = fromUnit;
    }

    try {
      // Check if we need to do a weight/volume conversion
      const fromIsVolume = isVolumeUnit(fromUnit);
      const toIsVolume = isVolumeUnit(targetUnit);
      const fromIsWeight = isWeightUnit(fromUnit);
      const toIsWeight = isWeightUnit(targetUnit);

      // If conversion between volume and weight, we need density
      if ((fromIsVolume && toIsWeight) || (fromIsWeight && toIsVolume)) {
        if (!customDensity) {
          // Fall back to same category if density not available
          if (fromIsVolume) {
            if (unitPreference === 'metric') {
              targetUnit = quantity < 1 ? 'milliliter' : 'liter';
            } else {
              targetUnit = quantity < 0.25 ? 'tablespoon' : 'cup';
            }
          } else {
            if (unitPreference === 'metric') {
              targetUnit = quantity < 1000 ? 'gram' : 'kilogram';
            } else {
              targetUnit = quantity < 454 ? 'ounce' : 'pound';
            }
          }
        }
      }

      // Perform the conversion
      const converted = convertUnits(adjustedQuantity, fromUnit, targetUnit, customDensity);

      // Additional sanity check for reasonable cooking quantities
      // Adjust units if the converted amount is too large or small
      if (targetUnit === 'teaspoon' && converted > 12) {
        // Convert to tablespoons if more than 12 teaspoons
        return convertUnit({ ...ingredient, unit: 'tablespoon', adjustedQuantity: converted / 3 });
      } else if (targetUnit === 'tablespoon' && converted > 8) {
        // Convert to cups if more than 8 tablespoons
        return convertUnit({ ...ingredient, unit: 'cup', adjustedQuantity: converted / 16 });
      } else if (targetUnit === 'milliliter' && converted > 1000) {
        // Convert to liters if more than 1000ml
        return convertUnit({ ...ingredient, unit: 'liter', adjustedQuantity: converted / 1000 });
      } else if (targetUnit === 'gram' && converted > 1000) {
        // Convert to kilograms if more than 1000g
        return convertUnit({ ...ingredient, unit: 'kilogram', adjustedQuantity: converted / 1000 });
      } else if (targetUnit === 'ounce' && converted > 16) {
        // Convert to pounds if more than 16oz
        return convertUnit({ ...ingredient, unit: 'pound', adjustedQuantity: converted / 16 });
      }

      // For ingredients like herbs and spices, prefer smaller units
      const name = (ingredient.ingredient?.name || ingredient.name || '').toLowerCase();
      if (
        (name.includes('herb') ||
          name.includes('spice') ||
          name.includes('tarragon') ||
          name.includes('basil') ||
          name.includes('oregano') ||
          name.includes('thyme') ||
          name.includes('salt') ||
          name.includes('pepper')) &&
        (targetUnit === 'liter' ||
          targetUnit === 'kilogram' ||
          targetUnit === 'pound' ||
          targetUnit === 'quart')
      ) {
        // Scale down to more appropriate units for herbs and spices
        if (unitPreference === 'metric') {
          if (isVolumeUnit(targetUnit)) {
            return convertUnit({
              ...ingredient,
              unit: 'milliliter',
              adjustedQuantity: converted * 1000
            });
          } else {
            return convertUnit({ ...ingredient, unit: 'gram', adjustedQuantity: converted * 1000 });
          }
        } else {
          if (isVolumeUnit(targetUnit)) {
            return convertUnit({
              ...ingredient,
              unit: 'tablespoon',
              adjustedQuantity: converted * 16
            });
          } else {
            return convertUnit({ ...ingredient, unit: 'ounce', adjustedQuantity: converted * 16 });
          }
        }
      }

      return { quantity: converted, unit: targetUnit };
    } catch (error) {
      console.error('Conversion error:', error);
      // Fall back to original if conversion fails
      return { quantity: adjustedQuantity, unit: fromUnit };
    }
  }

  // Format quantity for display with better readability for cooking measurements
  function formatQuantity(quantity: number): string {
    // Zero case
    if (quantity === 0) return '0';

    // For very small quantities, show as appropriate cooking fraction
    if (quantity <= 0.125) return '⅛';
    if (quantity > 0.125 && quantity <= 0.167) return '⅙';
    if (quantity > 0.167 && quantity <= 0.188) return '⅙'; // Closer to 1/6 than 1/4
    if (quantity > 0.188 && quantity <= 0.29) return '¼';
    if (quantity > 0.29 && quantity <= 0.35) return '⅓';
    if (quantity > 0.35 && quantity <= 0.42) return '⅜';
    if (quantity > 0.42 && quantity <= 0.58) return '½';
    if (quantity > 0.58 && quantity <= 0.625) return '⅝';
    if (quantity > 0.625 && quantity <= 0.71) return '⅔';
    if (quantity > 0.71 && quantity <= 0.79) return '¾';
    if (quantity > 0.79 && quantity <= 0.875) return '⅞';
    if (quantity > 0.875 && quantity < 1) return '1';

    // For integer values, simply return as is
    if (Number.isInteger(quantity)) {
      return quantity.toString();
    }

    // For values > 1, split into whole number and fraction
    const wholePart = Math.floor(quantity);
    const fractionalPart = quantity - wholePart;

    // For the fractional part, use the same logic as above
    let fractionStr = '';
    if (fractionalPart <= 0.125) fractionStr = '⅛';
    else if (fractionalPart <= 0.167) fractionStr = '⅙';
    else if (fractionalPart <= 0.188) fractionStr = '⅙';
    else if (fractionalPart <= 0.29) fractionStr = '¼';
    else if (fractionalPart <= 0.35) fractionStr = '⅓';
    else if (fractionalPart <= 0.42) fractionStr = '⅜';
    else if (fractionalPart <= 0.58) fractionStr = '½';
    else if (fractionalPart <= 0.625) fractionStr = '⅝';
    else if (fractionalPart <= 0.71) fractionStr = '⅔';
    else if (fractionalPart <= 0.79) fractionStr = '¾';
    else if (fractionalPart <= 0.875) fractionStr = '⅞';
    else return (wholePart + 1).toString(); // Round up if very close to the next whole number

    // If fractional part is very small, just return the whole number
    if (fractionalPart < 0.05) return wholePart.toString();

    return `${wholePart} ${fractionStr}`;
  }

  // Convert decimal to fraction for cooking measurements
  function approximateFraction(decimal: number): string | null {
    const tolerance = 0.01;
    const fractions: Record<string, string> = {
      '0.25': '¼',
      '0.33': '⅓',
      '0.5': '½',
      '0.66': '⅔',
      '0.75': '¾'
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
  function addToShoppingList(ingredient: Ingredient): void {
    if (!shoppingItems.some((item) => item.id === ingredient.id)) {
      shoppingItems = [...shoppingItems, ingredient];
    } else {
      // Remove if already in list (toggle behavior)
      shoppingItems = shoppingItems.filter((item) => item.id !== ingredient.id);
    }
  }

  function toggleAllShoppingItems(): void {
    const allIngredients = Object.values(groupedIngredients).flat();
    if (shoppingItems.length === allIngredients.length) {
      shoppingItems = [];
    } else {
      shoppingItems = [...allIngredients];
    }
  }

  // Toggle density controls display
  function toggleDensityControls(): void {
    showDensityControls = !showDensityControls;
  }

  // Update custom density for an ingredient
  function updateCustomDensity(ingredient: Ingredient, value: string): void {
    ingredient.customDensity = parseFloat(value);
    editingDensityFor = null;
  }

  // Toggle density editor for an ingredient
  function toggleDensityEditor(ingredient: Ingredient): void {
    editingDensityFor = editingDensityFor === ingredient.id ? null : ingredient.id;
  }

  // Apply a preset density from our common list
  function applyPresetDensity(ingredient: Ingredient, preset: DensityPreset): void {
    ingredient.customDensity = preset.value;
    editingDensityFor = null;
  }

  // Increase servings
  function increaseServings(): void {
    servingsCount += 1;
  }

  // Decrease servings
  function decreaseServings(): void {
    servingsCount = Math.max(1, servingsCount - 1);
  }

  // Set servings directly
  function setServings(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value);
    if (value > 0) {
      servingsCount = value;
    } else {
      servingsCount = 1;
      input.value = '1';
    }
  }
</script>

<section aria-labelledby="ingredients-heading" class="mb-6">
  <Card.Root>
    <Card.Header class="flex flex-row items-center justify-between">
      <div>
        <Card.Title id="ingredients-heading" class="text-xl">Ingredients</Card.Title>
        <Card.Description>
          Ingredients for {servingsCount}
          {servingsCount === 1 ? 'serving' : 'servings'}
        </Card.Description>
      </div>

      <div class="flex items-center gap-2">
        <!-- Servings adjustment - improved with better spacing and labels -->
        <div class="flex items-center bg-gray-100 rounded-md">
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8"
            aria-label="Decrease servings"
            disabled={servingsCount <= 1}
            onclick={decreaseServings}
          >
            <MinusCircle class="h-4 w-4" />
          </Button>
          <Input
            type="number"
            min="1"
            class="h-8 w-16 text-center border-0 bg-transparent"
            value={servingsCount}
            onchange={setServings}
            aria-label="Number of servings"
          />
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8"
            aria-label="Increase servings"
            onclick={increaseServings}
          >
            <PlusCircle class="h-4 w-4" />
          </Button>
        </div>

        <!-- Unit toggle - improved with clearer labels -->
        <Select bind:value={unitPreference} aria-label="Measurement unit preference" class="h-8">
          <option value="metric">Metric</option>
          <option value="imperial">Imperial</option>
        </Select>

        <!-- Advanced conversion toggle - clearer tooltip -->
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <Button
                variant="ghost"
                size="icon"
                class="h-8 w-8"
                aria-label="Toggle volume/weight conversion"
                onclick={toggleDensityControls}
              >
                <Scale class="h-4 w-4" />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p>Convert between volume and weight</p>
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>

        <!-- Shopping list button with more descriptive tooltip -->
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <Button
                variant={shoppingItems.length > 0 ? 'default' : 'outline'}
                size="sm"
                class="flex items-center gap-1"
                onclick={toggleAllShoppingItems}
              >
                <ShoppingBag class="h-4 w-4" />
                <span class="sr-only md:not-sr-only">
                  {shoppingItems.length > 0 ? `${shoppingItems.length} Items` : 'Shopping List'}
                </span>
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p>{shoppingItems.length > 0 ? 'Clear shopping list' : 'Add all to shopping list'}</p>
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </Card.Header>

    <Card.Content class="p-6">
      {#if showDensityControls}
        <div class="bg-blue-50 p-4 mb-4 rounded-lg">
          <h3 class="text-sm font-medium text-blue-800 mb-2">Volume/Weight Conversion</h3>
          <p class="text-xs text-blue-700 mb-2">
            Convert between volume (cups, ml) and weight (g, oz) units with ingredient densities.
          </p>
          <div class="flex items-center gap-2">
            <Button variant="outline" size="sm" class="text-xs" onclick={toggleDensityControls}>
              Hide Advanced Options
            </Button>
          </div>
        </div>
      {/if}

      {#if adjustedIngredients && Object.keys(adjustedIngredients).length > 0}
        <div class="space-y-6">
          {#each Object.entries(adjustedIngredients) as [group, ingredients]}
            {#if ingredients.length > 0}
              {#if Object.keys(adjustedIngredients).length > 1}
                <h3 class="font-medium text-gray-900 mb-3 capitalize">{group}</h3>
              {/if}

              <ul class="space-y-1 divide-y divide-gray-100">
                {#each ingredients as ingredient}
                  {@const converted = convertUnit(ingredient)}
                  {@const isInShoppingList = shoppingItems.some(
                    (item) => item.id === ingredient.id
                  )}

                  <li class="flex items-center py-2 group">
                    <div
                      class="flex-1 flex justify-between items-center gap-2 hover:bg-gray-50 rounded-lg p-2 transition-colors"
                    >
                      <div class="flex items-center gap-2">
                        <!-- Checkbox for ingredient completion -->
                        <Checkbox
                          id={`ingredient-${ingredient.id}`}
                          class="transition-opacity"
                          aria-label={`Mark ${ingredient.ingredient?.name || ingredient.name || 'ingredient'} as complete`}
                        />

                        <div class={ingredient.isOptional ? 'text-gray-500 italic' : ''}>
                          <span
                            >{ingredient.ingredient?.name || ingredient.name || 'Ingredient'}</span
                          >
                          {#if ingredient.processingInstructions}
                            <span class="text-gray-500 text-sm ml-1">
                              ({ingredient.processingInstructions})
                            </span>
                          {/if}
                          {#if ingredient.isOptional}
                            <span class="ml-2">
                              <Badge variant="outline" class="text-xs">Optional</Badge>
                            </span>
                          {/if}
                        </div>
                      </div>

                      <div class="flex items-center gap-3">
                        <div class="font-medium whitespace-nowrap">
                          {formatQuantity(converted.quantity)}
                          <span class="ml-1">{converted.unit}</span>
                        </div>

                        {#if showDensityControls && (isVolumeUnit(ingredient.unit || '') || isWeightUnit(ingredient.unit || ''))}
                          <div class="relative">
                            <Tooltip.Provider>
                              <Tooltip.Root>
                                <Tooltip.Trigger>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    class="h-6 w-6 text-gray-500 hover:text-gray-700"
                                    onclick={() => toggleDensityEditor(ingredient)}
                                  >
                                    <Scale class="h-3 w-3" />
                                  </Button>
                                </Tooltip.Trigger>
                                <Tooltip.Content>
                                  <p>Set density for volume/weight conversion</p>
                                </Tooltip.Content>
                              </Tooltip.Root>
                            </Tooltip.Provider>

                            {#if editingDensityFor === ingredient.id}
                              <div
                                class="absolute right-0 top-6 z-10 bg-white shadow-lg rounded-md p-3 w-64"
                              >
                                <div class="text-sm font-medium mb-2">Density (g/ml)</div>
                                <Input
                                  type="number"
                                  min="0.1"
                                  step="0.01"
                                  value={ingredient.customDensity || 1}
                                  onchange={(e) =>
                                    updateCustomDensity(
                                      ingredient,
                                      (e.target as HTMLInputElement).value
                                    )}
                                  class="mb-2"
                                />
                                <div class="text-xs mb-2">Common ingredients:</div>
                                <div class="flex flex-wrap gap-1 mb-2">
                                  {#each commonDensities.slice(0, 5) as density}
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      class="text-xs"
                                      onclick={() => applyPresetDensity(ingredient, density)}
                                    >
                                      {density.name.split(',')[0]}
                                    </Button>
                                  {/each}
                                </div>
                                <div class="flex justify-end">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    class="text-xs"
                                    onclick={() => (editingDensityFor = null)}
                                  >
                                    Close
                                  </Button>
                                </div>
                              </div>
                            {/if}
                          </div>
                        {/if}

                        <Button
                          variant={isInShoppingList ? 'default' : 'ghost'}
                          size="icon"
                          class="h-6 w-6 opacity-60 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                          aria-label={isInShoppingList
                            ? 'Remove from shopping list'
                            : 'Add to shopping list'}
                          onclick={() => addToShoppingList(ingredient)}
                        >
                          <ShoppingBag
                            class="h-3 w-3"
                            color={isInShoppingList ? '#ffffff' : '#64748b'}
                          />
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

      {#if shoppingItems.length > 0}
        <div class="mt-6 pt-6 border-t border-gray-200">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-medium text-gray-900">Shopping List ({shoppingItems.length} items)</h3>
            <Button variant="outline" size="sm" onclick={() => (shoppingItems = [])}>
              Clear List
            </Button>
          </div>
          <ul class="space-y-1">
            {#each shoppingItems as item}
              {@const converted = convertUnit(item)}
              <li class="text-sm text-gray-600 flex justify-between p-2 hover:bg-gray-50 rounded">
                <span>{item.ingredient?.name || item.name}</span>
                <span class="font-medium"
                  >{formatQuantity(converted.quantity)}
                  <span class="ml-1">{converted.unit}</span></span
                >
              </li>
            {/each}
          </ul>
          <div class="mt-4">
            <Button variant="default" size="sm" class="w-full">Save Shopping List</Button>
          </div>
        </div>
      {/if}
    </Card.Content>
  </Card.Root>
</section>


<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Label } from '$lib/components/ui/label';
  import { Button } from '$lib/components/ui/button';
  import { Switch } from '$lib/components/ui/switch';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
  import { Badge } from '$lib/components/ui/badge';
  import { AlertCircle, Plus, Trash2, X, ChefHat } from 'lucide-svelte';

  // Types
  interface MenuItem {
    id: number | null;
    name: string;
    description: string | null;
    price: number;
    foodCost: number;
    isActive: boolean;
    categoryId: number | null;
    allergens: string[];
    recipeIds: number[];
    recipeServingsAmount: number[];
    recipeServingsCost: number[];
    nutritionalInfo?: NutritionalInfo | null;
  }

  interface NutritionalInfo {
    id?: number;
    menuItemId?: number;
    calories: number;
    fat: number;
    saturatedFat: number;
    transFat: number;
    cholesterol: number;
    sodium: number;
    carbohydrates: number;
    fiber: number;
    sugar: number;
    protein: number;
  }

  interface Category {
    id: number | null;
    name: string;
    description: string | null;
    displayOrder: number;
  }

  interface Recipe {
    id: number;
    name: string;
    foodCost: number;
    // Other fields not needed for this component
  }

  interface Props {
    item: MenuItem;
    categories: Category[];
    recipes: Recipe[];
    onSave: (item: MenuItem) => void;
    onCancel: () => void;
    onDelete?: (itemId: number) => void;
    validationErrors?: Record<string, string>;
  }

  let {
    item,
    categories,
    recipes,
    onSave,
    onCancel,
    onDelete,
    validationErrors = {}
  }: Props = $props();

  // Local state
  let editingItem = $state<MenuItem>({ ...item });
  let activeTab = $state('basic');
  let newAllergen = $state('');
  let errors = $state<Record<string, string>>({});
  let selectedRecipeId = $state<number | null>(null);
  let recipeServings = $state<number>(1);

  // Update local errors when validation errors change
  $effect(() => {
    errors = validationErrors;
  });

  // Common allergens for quick selection
  const commonAllergens = [
    'Gluten',
    'Dairy',
    'Eggs',
    'Soy',
    'Peanuts',
    'Tree Nuts',
    'Fish',
    'Shellfish',
    'Sesame',
    'Mustard',
    'Celery',
    'Sulphites'
  ];

  // Calculate profit margin
  const profitMargin = $derived(
    editingItem.price > 0
      ? (((editingItem.price - editingItem.foodCost) / editingItem.price) * 100).toFixed(1)
      : '0.0'
  );

  // Form validation
  function validateForm() {
    const newErrors: Record<string, string> = {};

    if (!editingItem.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (editingItem.price < 0) {
      newErrors.price = 'Price cannot be negative';
    }

    if (editingItem.foodCost < 0) {
      newErrors.foodCost = 'Food cost cannot be negative';
    }

    if (editingItem.price < editingItem.foodCost) {
      newErrors.price = 'Price should be higher than food cost';
    }

    errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  // Form submission
  function handleSubmit() {
    if (validateForm()) {
      onSave(editingItem);
    }
  }

  // Delete confirmation
  function handleDelete() {
    if (editingItem.id !== null && onDelete) {
      onDelete(editingItem.id);
    }
  }

  // Allergen management
  function addAllergen() {
    if (newAllergen.trim() && !editingItem.allergens.includes(newAllergen.trim())) {
      editingItem.allergens = [...editingItem.allergens, newAllergen.trim()];
      newAllergen = '';
    }
  }

  function removeAllergen(allergen: string) {
    editingItem.allergens = editingItem.allergens.filter((a) => a !== allergen);
  }

  function addCommonAllergen(allergen: string) {
    if (!editingItem.allergens.includes(allergen)) {
      editingItem.allergens = [...editingItem.allergens, allergen];
    }
  }

  // Recipe management
  function addRecipe() {
    if (selectedRecipeId && !editingItem.recipeIds.includes(selectedRecipeId)) {
      const recipe = recipes.find((r) => r.id === selectedRecipeId);
      if (recipe) {
        // Add recipe to the item
        editingItem.recipeIds = [...editingItem.recipeIds, recipe.id];
        editingItem.recipeServingsAmount = [...editingItem.recipeServingsAmount, recipeServings];

        // Calculate cost based on servings
        const recipeCost = recipe.foodCost * recipeServings;
        editingItem.recipeServingsCost = [...editingItem.recipeServingsCost, recipeCost];

        // Update total food cost
        updateFoodCostFromRecipes();

        // Reset selection
        selectedRecipeId = null;
        recipeServings = 1;
      }
    }
  }

  function removeRecipe(index: number) {
    editingItem.recipeIds = editingItem.recipeIds.filter((_, i) => i !== index);
    editingItem.recipeServingsAmount = editingItem.recipeServingsAmount.filter(
      (_, i) => i !== index
    );
    editingItem.recipeServingsCost = editingItem.recipeServingsCost.filter((_, i) => i !== index);

    // Update total food cost
    updateFoodCostFromRecipes();
  }

  function updateRecipeServings(index: number, servings: number) {
    if (servings <= 0) servings = 0.25; // Minimum value

    // Update servings
    editingItem.recipeServingsAmount = editingItem.recipeServingsAmount.map((amount, i) => {
      if (i === index) return servings;
      return amount;
    });

    // Update cost
    const recipeId = editingItem.recipeIds[index];
    const recipe = recipes.find((r) => r.id === recipeId);
    if (recipe) {
      const recipeCost = recipe.foodCost * servings;
      editingItem.recipeServingsCost = editingItem.recipeServingsCost.map((cost, i) => {
        if (i === index) return recipeCost;
        return cost;
      });

      // Update total food cost
      updateFoodCostFromRecipes();
    }
  }

  function updateFoodCostFromRecipes() {
    // Sum up all recipe costs
    const totalCost = editingItem.recipeServingsCost.reduce((sum, cost) => sum + cost, 0);
    editingItem.foodCost = parseFloat(totalCost.toFixed(2));
  }

  // Format price inputs
  function formatPrice(event: Event, field: 'price' | 'foodCost') {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);

    if (!isNaN(value)) {
      editingItem[field] = parseFloat(value.toFixed(2));
    } else {
      editingItem[field] = 0;
    }
  }

  // Get recipe name by ID
  function getRecipeName(recipeId: number): string {
    const recipe = recipes.find((r) => r.id === recipeId);
    return recipe ? recipe.name : 'Unknown Recipe';
  }
</script>

<form onsubmit={handleSubmit} class="space-y-6">
  <Tabs value={activeTab} class="w-full">
    <TabsList class="grid grid-cols-4 mb-6">
      <TabsTrigger value="basic" onclick={() => (activeTab = 'basic')}>Basic Info</TabsTrigger>
      <TabsTrigger value="recipes" onclick={() => (activeTab = 'recipes')}>Recipes</TabsTrigger>
      <TabsTrigger value="allergens" onclick={() => (activeTab = 'allergens')}
        >Allergens</TabsTrigger
      >
      <TabsTrigger value="nutrition" onclick={() => (activeTab = 'nutrition')}
        >Nutrition</TabsTrigger
      >
    </TabsList>

    <!-- Basic Info Tab -->
    <TabsContent value="basic" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <Label for="item-name" class={errors.name || errors['name'] ? 'text-red-500' : ''}
            >Name *</Label
          >
          <Input
            id="item-name"
            type="text"
            bind:value={editingItem.name}
            class={errors.name || errors['name'] ? 'border-red-500' : ''}
          />
          {#if errors.name || errors['name']}
            <p class="text-xs text-red-500">{errors.name || errors['name']}</p>
          {/if}
        </div>

        <div class="space-y-2">
          <Label for="item-category">Category</Label>
          <select
            id="item-category"
            class="w-full rounded-md border border-input bg-background px-3 py-2"
            bind:value={editingItem.categoryId}
          >
            <option value={null}>Uncategorized</option>
            {#each categories as category}
              <option value={category.id}>{category.name}</option>
            {/each}
          </select>
          {#if errors.categoryId || errors['categoryId']}
            <p class="text-xs text-red-500">{errors.categoryId || errors['categoryId']}</p>
          {/if}
        </div>
      </div>

      <div class="space-y-2">
        <Label for="item-description">Description</Label>
        <Textarea id="item-description" rows={3} bind:value={editingItem.description} />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="space-y-2">
          <Label for="item-price" class={errors.price || errors['price'] ? 'text-red-500' : ''}
            >Price *</Label
          >
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="item-price"
              type="number"
              step="0.01"
              min="0"
              class={`pl-7 ${errors.price || errors['price'] ? 'border-red-500' : ''}`}
              value={editingItem.price.toFixed(2)}
              onblur={(e) => formatPrice(e, 'price')}
            />
          </div>
          {#if errors.price || errors['price']}
            <p class="text-xs text-red-500">{errors.price || errors['price']}</p>
          {/if}
        </div>

        <div class="space-y-2">
          <Label
            for="item-food-cost"
            class={errors.foodCost || errors['foodCost'] ? 'text-red-500' : ''}>Food Cost *</Label
          >
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="item-food-cost"
              type="number"
              step="0.01"
              min="0"
              class={`pl-7 ${errors.foodCost || errors['foodCost'] ? 'border-red-500' : ''}`}
              value={editingItem.foodCost.toFixed(2)}
              onblur={(e) => formatPrice(e, 'foodCost')}
            />
          </div>
          {#if errors.foodCost || errors['foodCost']}
            <p class="text-xs text-red-500">{errors.foodCost || errors['foodCost']}</p>
          {/if}
        </div>

        <div class="space-y-2">
          <Label>Profit Margin</Label>
          <div
            class="w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-center font-medium {parseFloat(
              profitMargin
            ) >= 70
              ? 'text-green-600'
              : parseFloat(profitMargin) >= 50
                ? 'text-emerald-600'
                : parseFloat(profitMargin) >= 30
                  ? 'text-amber-600'
                  : 'text-red-600'}"
          >
            {profitMargin}%
          </div>
          <p class="text-xs text-gray-500 text-center">
            {parseFloat(profitMargin) >= 70
              ? 'Star (High profit)'
              : parseFloat(profitMargin) >= 50
                ? 'Puzzle (Good profit)'
                : parseFloat(profitMargin) >= 30
                  ? 'Plow Horse (Moderate)'
                  : 'Dog (Low profit)'}
          </p>
        </div>
      </div>

      <div class="flex items-center space-x-2 pt-2">
        <Switch
          id="item-active"
          checked={editingItem.isActive}
          onchange={(e) => (editingItem.isActive = e.target.checked)}
        />
        <Label for="item-active">Item is active and visible on menus</Label>
      </div>
    </TabsContent>

    <!-- Recipes Tab -->
    <TabsContent value="recipes" class="space-y-6">
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
        <div class="flex">
          <ChefHat class="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
          <div>
            <h3 class="text-sm font-medium text-blue-800">Recipe-Based Food Cost</h3>
            <p class="text-sm text-blue-700">
              Adding recipes will automatically calculate the food cost based on recipe servings.
            </p>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div class="flex gap-2">
          <div class="flex-1">
            <Label for="recipe-select">Add Recipe</Label>
            <select
              id="recipe-select"
              class="w-full rounded-md border border-input bg-background px-3 py-2"
              bind:value={selectedRecipeId}
            >
              <option value={null}>Select a recipe</option>
              {#each recipes as recipe}
                <option value={recipe.id}
                  >{recipe.name} (${recipe.foodCost.toFixed(2)}/serving)</option
                >
              {/each}
            </select>
          </div>

          <div class="w-32">
            <Label for="recipe-servings">Servings</Label>
            <Input
              id="recipe-servings"
              type="number"
              step="0.25"
              min="0.25"
              bind:value={recipeServings}
            />
          </div>

          <div class="pt-6">
            <Button
              type="button"
              variant="outline"
              onclick={addRecipe}
              disabled={!selectedRecipeId}
            >
              <Plus class="h-4 w-4" />
            </Button>
          </div>
        </div>

        {#if editingItem.recipeIds.length === 0}
          <p class="text-sm text-gray-500">No recipes added to this menu item.</p>
        {:else}
          <div class="border rounded-md overflow-hidden">
            <div class="bg-gray-50 px-4 py-2 grid grid-cols-12 text-sm font-medium">
              <div class="col-span-6">Recipe</div>
              <div class="col-span-2 text-center">Servings</div>
              <div class="col-span-3 text-right">Cost</div>
              <div class="col-span-1"></div>
            </div>
            <div class="divide-y">
              {#each editingItem.recipeIds as recipeId, index}
                <div class="px-4 py-3 grid grid-cols-12 items-center">
                  <div class="col-span-6">{getRecipeName(recipeId)}</div>
                  <div class="col-span-2 text-center">
                    <Input
                      type="number"
                      step="0.25"
                      min="0.25"
                      class="h-8 text-center"
                      value={editingItem.recipeServingsAmount[index]}
                      onblur={(e) => updateRecipeServings(index, parseFloat(e.target.value))}
                    />
                  </div>
                  <div class="col-span-3 text-right">
                    ${editingItem.recipeServingsCost[index].toFixed(2)}
                  </div>
                  <div class="col-span-1 text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      class="h-8 w-8 p-0"
                      onclick={() => removeRecipe(index)}
                    >
                      <X class="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              {/each}
              <div class="px-4 py-2 grid grid-cols-12 bg-gray-50">
                <div class="col-span-6 font-medium">Total Cost</div>
                <div class="col-span-2"></div>
                <div class="col-span-3 text-right font-medium">
                  ${editingItem.foodCost.toFixed(2)}
                </div>
                <div class="col-span-1"></div>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </TabsContent>

    <!-- Allergens Tab -->
    <TabsContent value="allergens" class="space-y-6">
      <div>
        <h3 class="text-sm font-medium mb-2">Common Allergens</h3>
        <div class="flex flex-wrap gap-2">
          {#each commonAllergens as allergen}
            <button
              type="button"
              class="px-3 py-1 text-sm rounded-full border {editingItem.allergens.includes(allergen)
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}"
              onclick={() => addCommonAllergen(allergen)}
            >
              {allergen}
            </button>
          {/each}
        </div>
      </div>

      <div class="space-y-4">
        <div class="flex gap-2">
          <div class="flex-1">
            <Label for="new-allergen">Add Custom Allergen</Label>
            <Input
              id="new-allergen"
              type="text"
              bind:value={newAllergen}
              placeholder="e.g., Garlic"
            />
          </div>
          <div class="pt-6">
            <Button
              type="button"
              variant="outline"
              onclick={addAllergen}
              disabled={!newAllergen.trim()}
            >
              <Plus class="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <Label>Current Allergens</Label>
          {#if editingItem.allergens.length === 0}
            <p class="text-sm text-gray-500 mt-2">No allergens added</p>
          {:else}
            <div class="flex flex-wrap gap-2 mt-2">
              {#each editingItem.allergens as allergen}
                <Badge variant="outline" class="bg-red-50 text-red-700 border-red-200 gap-1 pl-3">
                  {allergen}
                  <button
                    type="button"
                    class="ml-1 rounded-full p-0.5 hover:bg-red-200"
                    onclick={() => removeAllergen(allergen)}
                  >
                    <X class="h-3 w-3" />
                  </button>
                </Badge>
              {/each}
            </div>
          {/if}
        </div>
      </div>

      <div class="bg-amber-50 border-l-4 border-amber-500 p-4">
        <div class="flex">
          <AlertCircle class="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
          <div>
            <h3 class="text-sm font-medium text-amber-800">Important</h3>
            <p class="text-sm text-amber-700">
              Accurately listing allergens is crucial for customer safety. Always verify ingredients
              with your kitchen staff.
            </p>
          </div>
        </div>
      </div>
    </TabsContent>

    <!-- Nutrition Tab -->
    <TabsContent value="nutrition" class="space-y-4">
      {#if !editingItem.nutritionalInfo}
        <div class="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
          <p class="text-amber-700">
            Nutritional information is not set up. Please fill in the values below.
          </p>
        </div>
      {/if}

      <div class="grid grid-cols-2 gap-x-4 gap-y-3">
        <div class="space-y-2">
          <Label for="nutrition-calories">Calories</Label>
          <Input
            id="nutrition-calories"
            type="number"
            min="0"
            bind:value={editingItem.nutritionalInfo.calories}
          />
          {#if errors['nutritionalInfo.calories']}
            <p class="text-xs text-red-500">{errors['nutritionalInfo.calories']}</p>
          {/if}
        </div>

        <div class="space-y-2">
          <Label for="nutrition-protein">Protein (g)</Label>
          <Input
            id="nutrition-protein"
            type="number"
            min="0"
            step="0.1"
            bind:value={editingItem.nutritionalInfo.protein}
          />
          {#if errors['nutritionalInfo.protein']}
            <p class="text-xs text-red-500">{errors['nutritionalInfo.protein']}</p>
          {/if}
        </div>

        <div class="space-y-2">
          <Label for="nutrition-fat">Total Fat (g)</Label>
          <Input
            id="nutrition-fat"
            type="number"
            min="0"
            step="0.1"
            bind:value={editingItem.nutritionalInfo.fat}
          />
          {#if errors['nutritionalInfo.fat']}
            <p class="text-xs text-red-500">{errors['nutritionalInfo.fat']}</p>
          {/if}
        </div>

        <div class="space-y-2">
          <Label for="nutrition-saturated-fat">Saturated Fat (g)</Label>
          <Input
            id="nutrition-saturated-fat"
            type="number"
            min="0"
            step="0.1"
            bind:value={editingItem.nutritionalInfo.saturatedFat}
          />
          {#if errors['nutritionalInfo.saturatedFat']}
            <p class="text-xs text-red-500">{errors['nutritionalInfo.saturatedFat']}</p>
          {/if}
        </div>

        <div class="space-y-2">
          <Label for="nutrition-trans-fat">Trans Fat (g)</Label>
          <Input
            id="nutrition-trans-fat"
            type="number"
            min="0"
            step="0.1"
            bind:value={editingItem.nutritionalInfo.transFat}
          />
          {#if errors['nutritionalInfo.transFat']}
            <p class="text-xs text-red-500">{errors['nutritionalInfo.transFat']}</p>
          {/if}
        </div>

        <div class="space-y-2">
          <Label for="nutrition-cholesterol">Cholesterol (mg)</Label>
          <Input
            id="nutrition-cholesterol"
            type="number"
            min="0"
            bind:value={editingItem.nutritionalInfo.cholesterol}
          />
          {#if errors['nutritionalInfo.cholesterol']}
            <p class="text-xs text-red-500">{errors['nutritionalInfo.cholesterol']}</p>
          {/if}
        </div>

        <div class="space-y-2">
          <Label for="nutrition-sodium">Sodium (mg)</Label>
          <Input
            id="nutrition-sodium"
            type="number"
            min="0"
            bind:value={editingItem.nutritionalInfo.sodium}
          />
          {#if errors['nutritionalInfo.sodium']}
            <p class="text-xs text-red-500">{errors['nutritionalInfo.sodium']}</p>
          {/if}
        </div>

        <div class="space-y-2">
          <Label for="nutrition-carbs">Carbohydrates (g)</Label>
          <Input
            id="nutrition-carbs"
            type="number"
            min="0"
            step="0.1"
            bind:value={editingItem.nutritionalInfo.carbohydrates}
          />
          {#if errors['nutritionalInfo.carbohydrates']}
            <p class="text-xs text-red-500">{errors['nutritionalInfo.carbohydrates']}</p>
          {/if}
        </div>

        <div class="space-y-2">
          <Label for="nutrition-fiber">Dietary Fiber (g)</Label>
          <Input
            id="nutrition-fiber"
            type="number"
            min="0"
            step="0.1"
            bind:value={editingItem.nutritionalInfo.fiber}
          />
          {#if errors['nutritionalInfo.fiber']}
            <p class="text-xs text-red-500">{errors['nutritionalInfo.fiber']}</p>
          {/if}
        </div>

        <div class="space-y-2">
          <Label for="nutrition-sugar">Sugars (g)</Label>
          <Input
            id="nutrition-sugar"
            type="number"
            min="0"
            step="0.1"
            bind:value={editingItem.nutritionalInfo.sugar}
          />
          {#if errors['nutritionalInfo.sugar']}
            <p class="text-xs text-red-500">{errors['nutritionalInfo.sugar']}</p>
          {/if}
        </div>
      </div>

      <div class="pt-2">
        <p class="text-sm text-gray-500">
          Nutritional information is used to help customers make informed choices and is required
          for healthcare facilities.
        </p>
      </div>
    </TabsContent>
  </Tabs>

  <div class="flex justify-between pt-4">
    <div>
      {#if editingItem.id !== null && onDelete}
        <Button
          type="button"
          variant="destructive"
          onclick={handleDelete}
          class="flex items-center gap-1"
        >
          <Trash2 class="h-4 w-4" />
          <span>Delete</span>
        </Button>
      {/if}
    </div>

    <div class="flex gap-2">
      <Button type="button" variant="outline" onclick={onCancel}>Cancel</Button>
      <Button type="submit" variant="default">Save Item</Button>
    </div>
  </div>
</form>

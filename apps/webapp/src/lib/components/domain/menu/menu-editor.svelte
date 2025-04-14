<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
  // import { api } from '@ckm/lib-api'; // API import removed
  import { AlertCircle, ChevronDown, ChevronUp, Plus } from 'lucide-svelte';
  import CategoryManager from './category-manager.svelte';
  import MenuItemForm from '$lib/components/domain/menu/menu-item-form.svelte';

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
    menuItems?: any[];
  }

  interface Props {
    menuId: number;
    restaurantId: number;
    onSave?: () => void;
    onCancel?: () => void;
  }

  let { menuId, restaurantId, onSave, onCancel }: Props = $props();

  // State management
  let menuItems = $state<MenuItem[]>([]);
  let categories = $state<Category[]>([]);
  let editingItem = $state<MenuItem | null>(null);
  let editingCategory = $state<Category | null>(null);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let activeTab = $state('items');
  let recipes = $state<any[]>([]);

  // Dummy data for testing
  const dummyMenuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Classic Burger',
      description: 'Juicy beef patty with lettuce, tomato, and our special sauce',
      price: 12.99,
      foodCost: 4.25,
      isActive: true,
      categoryId: 1,
      allergens: ['gluten', 'dairy'],
      recipeIds: [1, 2],
      recipeServingsAmount: [1, 0.5],
      recipeServingsCost: [3.75, 0.5],
      nutritionalInfo: {
        calories: 650,
        fat: 32,
        saturatedFat: 12,
        transFat: 0,
        cholesterol: 85,
        sodium: 980,
        carbohydrates: 48,
        fiber: 3,
        sugar: 8,
        protein: 35
      }
    },
    {
      id: 2,
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with parmesan and croutons',
      price: 9.99,
      foodCost: 2.5,
      isActive: true,
      categoryId: 2,
      allergens: ['gluten', 'dairy', 'eggs'],
      recipeIds: [3],
      recipeServingsAmount: [1],
      recipeServingsCost: [2.5],
      nutritionalInfo: {
        calories: 320,
        fat: 18,
        saturatedFat: 4,
        transFat: 0,
        cholesterol: 40,
        sodium: 780,
        carbohydrates: 22,
        fiber: 4,
        sugar: 3,
        protein: 12
      }
    },
    {
      id: 3,
      name: 'Chocolate Cake',
      description: 'Rich chocolate cake with ganache',
      price: 7.99,
      foodCost: 1.8,
      isActive: false,
      categoryId: 3,
      allergens: ['gluten', 'dairy', 'eggs'],
      recipeIds: [4],
      recipeServingsAmount: [1],
      recipeServingsCost: [1.8],
      nutritionalInfo: {
        calories: 450,
        fat: 22,
        saturatedFat: 12,
        transFat: 0,
        cholesterol: 60,
        sodium: 320,
        carbohydrates: 58,
        fiber: 2,
        sugar: 38,
        protein: 6
      }
    }
  ];

  const dummyCategories: Category[] = [
    {
      id: 1,
      name: 'Main Dishes',
      description: 'Our signature entrees',
      displayOrder: 0
    },
    {
      id: 2,
      name: 'Salads',
      description: 'Fresh and healthy options',
      displayOrder: 1
    },
    {
      id: 3,
      name: 'Desserts',
      description: 'Sweet treats to finish your meal',
      displayOrder: 2
    }
  ];

  const dummyRecipes = [
    {
      id: 1,
      name: 'Burger Patty',
      servingCost: 3.75
    },
    {
      id: 2,
      name: 'Burger Bun',
      servingCost: 0.5
    },
    {
      id: 3,
      name: 'Caesar Salad Base',
      servingCost: 2.5
    },
    {
      id: 4,
      name: 'Chocolate Cake',
      servingCost: 1.8
    }
  ];

  // Fetch data on component mount
  $effect(() => {
    loadData();
  });

  async function loadData() {
    try {
      loading = true;

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Use dummy data instead of API calls
      menuItems = dummyMenuItems;
      categories = dummyCategories;
      recipes = dummyRecipes;

      /* Original API calls commented out
      // Fetch menu items
      const menuItemsResponse = await api.menuItem.getMenuItem({
        params: {
          id: menuId
        }
      });

      if (menuItemsResponse.status === 200) {
        menuItems = menuItemsResponse.body;
      }

      // Fetch categories
      const categoriesResponse = await api.menu.getMenuCategories(menuId);
      if (categoriesResponse.status === 200) {
        categories = categoriesResponse.body.sort((a, b) => a.displayOrder - b.displayOrder);
      }

      // Fetch recipes (for recipe selection in menu items)
      const recipesResponse = await api.recipe.getRecipes(restaurantId);
      if (recipesResponse.status === 200) {
        recipes = recipesResponse.body;
      }
      */

      loading = false;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load menu data';
      loading = false;
    }
  }

  // Menu item actions
  function handleEditItem(item: MenuItem) {
    editingItem = { ...item };
    activeTab = 'editItem';
  }

  function handleCreateItem() {
    editingItem = {
      id: null,
      name: '',
      description: '',
      price: 0,
      foodCost: 0,
      isActive: true,
      categoryId: categories.length > 0 ? categories[0].id : null,
      allergens: [],
      recipeIds: [],
      recipeServingsAmount: [],
      recipeServingsCost: [],
      nutritionalInfo: {
        calories: 0,
        fat: 0,
        saturatedFat: 0,
        transFat: 0,
        cholesterol: 0,
        sodium: 0,
        carbohydrates: 0,
        fiber: 0,
        sugar: 0,
        protein: 0
      }
    };
    activeTab = 'editItem';
  }

  async function handleSaveItem(item: MenuItem) {
    try {
      loading = true;

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Mock save functionality
      if (item.id === null) {
        // Create new item with a generated ID
        const newId = Math.max(0, ...menuItems.map((item) => item.id || 0)) + 1;
        const newItem = { ...item, id: newId };
        menuItems = [...menuItems, newItem];
      } else {
        // Update existing item
        menuItems = menuItems.map((mi) => (mi.id === item.id ? item : mi));
      }

      /* Original API calls commented out
      let response;
      if (item.id === null) {
        // Create new item
        response = await api.menu.createMenuItem({
          ...item,
          menuId
        });
      } else {
        // Update existing item
        response = await api.menu.updateMenuItem(item.id, item);
      }

      if (response.status === 200 || response.status === 201) {
        await loadData(); // Refresh data
        editingItem = null;
        activeTab = 'items';
      } else {
        throw new Error('Failed to save menu item');
      }
      */

      editingItem = null;
      activeTab = 'items';
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to save menu item';
    } finally {
      loading = false;
    }
  }

  async function handleDeleteItem(itemId: number) {
    if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      return;
    }

    try {
      loading = true;

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Mock delete functionality
      menuItems = menuItems.filter((item) => item.id !== itemId);

      /* Original API call commented out
      const response = await api.menu.deleteMenuItem(itemId);

      if (response.status === 200) {
        menuItems = menuItems.filter((item) => item.id !== itemId);
        editingItem = null;
        activeTab = 'items';
      } else {
        throw new Error('Failed to delete menu item');
      }
      */

      editingItem = null;
      activeTab = 'items';
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to delete menu item';
    } finally {
      loading = false;
    }
  }

  // Category actions
  function handleEditCategory(category: Category) {
    editingCategory = { ...category };
    activeTab = 'editCategory';
  }

  function handleCreateCategory() {
    editingCategory = {
      id: null,
      name: '',
      description: '',
      displayOrder: categories.length
    };
    activeTab = 'editCategory';
  }

  async function handleSaveCategory(category: Category) {
    try {
      loading = true;

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Mock save functionality
      if (category.id === null) {
        // Create new category with a generated ID
        const newId = Math.max(0, ...categories.map((cat) => cat.id || 0)) + 1;
        const newCategory = { ...category, id: newId };
        categories = [...categories, newCategory];
      } else {
        // Update existing category
        categories = categories.map((cat) => (cat.id === category.id ? category : cat));
      }

      /* Original API calls commented out
      let response;
      if (category.id === null) {
        // Create new category
        response = await api.menu.createMenuCategory({
          ...category,
          menuId
        });
      } else {
        // Update existing category
        response = await api.menu.updateMenuCategory(category.id, category);
      }

      if (response.status === 200 || response.status === 201) {
        await loadData(); // Refresh data
        editingCategory = null;
        activeTab = 'categories';
      } else {
        throw new Error('Failed to save category');
      }
      */

      editingCategory = null;
      activeTab = 'categories';
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to save category';
    } finally {
      loading = false;
    }
  }

  async function handleDeleteCategory(categoryId: number) {
    if (
      !confirm(
        'Are you sure you want to delete this category? Items will be moved to uncategorized.'
      )
    ) {
      return;
    }

    try {
      loading = true;

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Mock delete functionality
      categories = categories.filter((category) => category.id !== categoryId);

      // Move items in this category to uncategorized
      menuItems = menuItems.map((item) =>
        item.categoryId === categoryId ? { ...item, categoryId: null } : item
      );

      /* Original API call commented out
      const response = await api.menu.deleteMenuCategory(categoryId);

      if (response.status === 200) {
        categories = categories.filter((category) => category.id !== categoryId);
        // Items are moved to uncategorized on the server
        await loadData(); // Refresh data to get updated items
        editingCategory = null;
        activeTab = 'categories';
      } else {
        throw new Error('Failed to delete category');
      }
      */

      editingCategory = null;
      activeTab = 'categories';
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to delete category';
    } finally {
      loading = false;
    }
  }

  // Cancel edit
  function handleCancel() {
    if (activeTab === 'editItem') {
      editingItem = null;
      activeTab = 'items';
    } else if (activeTab === 'editCategory') {
      editingCategory = null;
      activeTab = 'categories';
    } else if (onCancel) {
      onCancel();
    }
  }

  // Calculate profit margin
  function calculateProfitMargin(price: number, foodCost: number): string {
    if (price <= 0) return '0.0';
    return (((price - foodCost) / price) * 100).toFixed(1);
  }

  // Category name lookup helper
  function getCategoryName(categoryId: number | null): string {
    if (categoryId === null) return 'Uncategorized';
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : 'Uncategorized';
  }
</script>

<div class="space-y-6">
  {#if loading}
    <div class="flex justify-center items-center h-40">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  {:else if error}
    <div class="bg-red-50 border-l-4 border-red-500 p-4">
      <div class="flex">
        <AlertCircle class="h-6 w-6 text-red-500 mr-3" />
        <p class="text-red-700">{error}</p>
      </div>
    </div>
  {:else}
    <Tabs bind:value={activeTab} class="w-full">
      <TabsList class="grid grid-cols-3 mb-6">
        <TabsTrigger value="items">Menu Items</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
        <TabsTrigger value="bulk" disabled={true}>Bulk Operations</TabsTrigger>
      </TabsList>

      <!-- Menu Items Tab -->
      <TabsContent value="items" class="space-y-6">
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-semibold">Menu Items ({menuItems.length})</h3>
          <Button onclick={handleCreateItem} class="flex items-center gap-2">
            <Plus class="h-4 w-4" />
            <span>Add Menu Item</span>
          </Button>
        </div>

        {#if menuItems.length === 0}
          <div class="bg-amber-50 border-l-4 border-amber-500 p-4">
            <p class="text-amber-700">
              No menu items yet. Add your first menu item to get started.
            </p>
          </div>
        {:else}
          <!-- Group items by category -->
          {#each [...categories, null] as category (category?.id ?? 'uncategorized')}
            {#if menuItems.some((item) => item.categoryId === category?.id)}
              <div class="border rounded-md overflow-hidden">
                <div class="bg-gray-50 px-4 py-2 font-medium">
                  {category ? category.name : 'Uncategorized'}
                </div>
                <div class="divide-y">
                  {#each menuItems.filter((item) => item.categoryId === category?.id) as item (item.id)}
                    <div
                      class="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center"
                    >
                      <div class="flex-1">
                        <div class="flex items-center gap-2">
                          <span class="font-medium">{item.name}</span>
                          {#if !item.isActive}
                            <Badge variant="outline" class="bg-gray-100">Inactive</Badge>
                          {/if}
                          {#if item.allergens.length > 0}
                            <Badge variant="outline" class="bg-red-50 text-red-700 border-red-200">
                              {item.allergens.length} Allergen{item.allergens.length !== 1
                                ? 's'
                                : ''}
                            </Badge>
                          {/if}
                        </div>
                        <div class="text-sm text-gray-500 mt-1">
                          {#if item.description}
                            <p class="line-clamp-1">{item.description}</p>
                          {/if}
                          <div class="flex gap-4 mt-1">
                            <span>${item.price.toFixed(2)}</span>
                            <span class="text-gray-400">Food Cost: ${item.foodCost.toFixed(2)}</span
                            >
                            <span
                              class={`font-medium ${
                                parseFloat(calculateProfitMargin(item.price, item.foodCost)) >= 70
                                  ? 'text-green-600'
                                  : parseFloat(calculateProfitMargin(item.price, item.foodCost)) >=
                                      50
                                    ? 'text-emerald-600'
                                    : parseFloat(
                                          calculateProfitMargin(item.price, item.foodCost)
                                        ) >= 30
                                      ? 'text-amber-600'
                                      : 'text-red-600'
                              }`}
                            >
                              Margin: {calculateProfitMargin(item.price, item.foodCost)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onclick={() => handleEditItem(item)}>
                        Edit
                      </Button>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          {/each}
        {/if}
      </TabsContent>

      <!-- Categories Tab -->
      <TabsContent value="categories" class="space-y-6">
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-semibold">Categories ({categories.length})</h3>
          <Button onclick={handleCreateCategory} class="flex items-center gap-2">
            <Plus class="h-4 w-4" />
            <span>Add Category</span>
          </Button>
        </div>

        {#if categories.length === 0}
          <div class="bg-amber-50 border-l-4 border-amber-500 p-4">
            <p class="text-amber-700">
              No categories yet. Categories help organize your menu items.
            </p>
          </div>
        {:else}
          <div class="border rounded-md overflow-hidden">
            <div class="bg-gray-50 px-4 py-2 font-medium flex">
              <div class="w-12 text-center">Order</div>
              <div class="flex-1 ml-4">Name</div>
              <div class="w-24 text-center">Items</div>
              <div class="w-24 text-right">Actions</div>
            </div>
            <div class="divide-y">
              {#each categories as category (category.id)}
                <div class="p-4 hover:bg-gray-50 transition-colors flex items-center">
                  <div class="w-12 flex flex-col items-center gap-1">
                    <button
                      class="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      disabled={category.displayOrder === 0}
                      onclick={() => {}}
                    >
                      <ChevronUp class="h-4 w-4" />
                    </button>
                    <span>{category.displayOrder + 1}</span>
                    <button
                      class="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      disabled={category.displayOrder === categories.length - 1}
                      onclick={() => {}}
                    >
                      <ChevronDown class="h-4 w-4" />
                    </button>
                  </div>
                  <div class="flex-1 ml-4">
                    <div class="font-medium">{category.name}</div>
                    {#if category.description}
                      <div class="text-sm text-gray-500 line-clamp-1">{category.description}</div>
                    {/if}
                  </div>
                  <div class="w-24 text-center">
                    {menuItems.filter((item) => item.categoryId === category.id).length}
                  </div>
                  <div class="w-24 flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onclick={() => handleEditCategory(category)}>
                      Edit
                    </Button>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </TabsContent>

      <!-- Edit Item Tab -->
      <TabsContent value="editItem" class="space-y-6">
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-semibold">
            {editingItem?.id ? 'Edit' : 'Add'} Menu Item
          </h3>
        </div>

        {#if editingItem}
          <MenuItemForm
            item={editingItem}
            {categories}
            {recipes}
            onSave={handleSaveItem}
            onCancel={handleCancel}
            onDelete={editingItem.id ? handleDeleteItem : undefined}
          />
        {/if}
      </TabsContent>

      <!-- Edit Category Tab -->
      <TabsContent value="editCategory" class="space-y-6">
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-semibold">
            {editingCategory?.id ? 'Edit' : 'Add'} Category
          </h3>
        </div>

        {#if editingCategory}
          <CategoryManager
            category={editingCategory}
            onSave={handleSaveCategory}
            onCancel={handleCancel}
            onDelete={editingCategory.id ? handleDeleteCategory : undefined}
          />
        {/if}
      </TabsContent>
    </Tabs>
  {/if}
</div>

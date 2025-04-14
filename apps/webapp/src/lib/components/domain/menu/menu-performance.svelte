<script lang="ts">
  import { onMount } from 'svelte';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from '$lib/components/ui/card';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import { AlertCircle, TrendingUp, DollarSign, Star, Info, Download } from 'lucide-svelte';

  interface Props {
    menuId: number | null;
  }

  let { menuId }: Props = $props();

  interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    foodCost: number;
    isActive: boolean;
    categoryId: number;
    categoryName: string;
    allergens: string[];
    salesCount: number;
    totalSales: number;
  }

  interface MenuCategory {
    id: number;
    name: string;
    itemCount: number;
    totalSales: number;
    averageMargin: number;
  }

  interface MenuEngineeringData {
    stars: MenuItem[];
    puzzles: MenuItem[];
    plowHorses: MenuItem[];
    dogs: MenuItem[];
    totalSales: number;
    totalProfit: number;
    averageMargin: number;
    categories: MenuCategory[];
  }

  let loading = $state(true);
  let error = $state<string | null>(null);
  let data = $state<MenuEngineeringData | null>(null);

  // Dummy data for testing
  const dummyData: MenuEngineeringData = {
    totalSales: 12785.5,
    totalProfit: 8321.25,
    averageMargin: 65.1,
    categories: [
      {
        id: 1,
        name: 'Main Dishes',
        itemCount: 8,
        totalSales: 6780.25,
        averageMargin: 68.3
      },
      {
        id: 2,
        name: 'Appetizers',
        itemCount: 5,
        totalSales: 2980.75,
        averageMargin: 74.8
      },
      {
        id: 3,
        name: 'Desserts',
        itemCount: 4,
        totalSales: 1890.5,
        averageMargin: 82.1
      },
      {
        id: 4,
        name: 'Beverages',
        itemCount: 3,
        totalSales: 1134.0,
        averageMargin: 35.2
      }
    ],
    stars: [
      {
        id: 1,
        name: 'Filet Mignon',
        description: 'Premium cut steak with red wine reduction and roasted vegetables',
        price: 34.99,
        foodCost: 11.25,
        isActive: true,
        categoryId: 1,
        categoryName: 'Main Dishes',
        allergens: ['none'],
        salesCount: 75,
        totalSales: 2624.25
      },
      {
        id: 2,
        name: 'Truffle Mac & Cheese',
        description: 'Creamy four-cheese blend with black truffle and breadcrumb topping',
        price: 16.99,
        foodCost: 4.85,
        isActive: true,
        categoryId: 2,
        categoryName: 'Appetizers',
        allergens: ['gluten', 'dairy'],
        salesCount: 95,
        totalSales: 1614.05
      },
      {
        id: 3,
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center and vanilla ice cream',
        price: 9.99,
        foodCost: 2.1,
        isActive: true,
        categoryId: 3,
        categoryName: 'Desserts',
        allergens: ['gluten', 'dairy', 'eggs'],
        salesCount: 115,
        totalSales: 1148.85
      }
    ],
    puzzles: [
      {
        id: 4,
        name: 'Lobster Ravioli',
        description: 'Handmade pasta filled with lobster in a saffron cream sauce',
        price: 28.99,
        foodCost: 8.45,
        isActive: true,
        categoryId: 1,
        categoryName: 'Main Dishes',
        allergens: ['gluten', 'shellfish', 'dairy'],
        salesCount: 35,
        totalSales: 1014.65
      },
      {
        id: 5,
        name: 'Foie Gras Terrine',
        description: 'Duck liver pate with port wine reduction and brioche toast',
        price: 21.99,
        foodCost: 6.3,
        isActive: true,
        categoryId: 2,
        categoryName: 'Appetizers',
        allergens: ['gluten'],
        salesCount: 28,
        totalSales: 615.72
      }
    ],
    plowHorses: [
      {
        id: 6,
        name: 'Classic Burger',
        description: 'Half-pound beef patty with lettuce, tomato, and house sauce',
        price: 14.99,
        foodCost: 5.85,
        isActive: true,
        categoryId: 1,
        categoryName: 'Main Dishes',
        allergens: ['gluten', 'dairy'],
        salesCount: 105,
        totalSales: 1573.95
      },
      {
        id: 7,
        name: 'House Salad',
        description: 'Mixed greens with cucumber, tomato, and house vinaigrette',
        price: 8.99,
        foodCost: 3.25,
        isActive: true,
        categoryId: 2,
        categoryName: 'Appetizers',
        allergens: ['none'],
        salesCount: 82,
        totalSales: 737.18
      },
      {
        id: 8,
        name: 'Soft Drinks',
        description: 'Assorted sodas and soft drinks',
        price: 3.99,
        foodCost: 0.75,
        isActive: true,
        categoryId: 4,
        categoryName: 'Beverages',
        allergens: ['none'],
        salesCount: 168,
        totalSales: 670.32
      }
    ],
    dogs: [
      {
        id: 9,
        name: 'Quinoa Bowl',
        description: 'Organic quinoa with seasonal vegetables and tahini dressing',
        price: 15.99,
        foodCost: 6.25,
        isActive: true,
        categoryId: 1,
        categoryName: 'Main Dishes',
        allergens: ['sesame'],
        salesCount: 26,
        totalSales: 415.74
      },
      {
        id: 10,
        name: 'Fruit Parfait',
        description: 'Seasonal fruit with yogurt and granola',
        price: 7.99,
        foodCost: 3.5,
        isActive: true,
        categoryId: 3,
        categoryName: 'Desserts',
        allergens: ['dairy', 'gluten'],
        salesCount: 31,
        totalSales: 247.69
      },
      {
        id: 11,
        name: 'Herbal Tea',
        description: 'Assorted organic herbal teas',
        price: 4.99,
        foodCost: 1.85,
        isActive: true,
        categoryId: 4,
        categoryName: 'Beverages',
        allergens: ['none'],
        salesCount: 22,
        totalSales: 109.78
      }
    ]
  };

  onMount(() => {
    fetchMenuEngineering();
  });

  async function fetchMenuEngineering() {
    if (!menuId) return;

    loading = true;
    error = null;

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Use dummy data instead of actual API call
      data = dummyData;

      /* Original API call commented out
      const response = await fetch(`/api/menus/${menuId}/engineering`);
      if (!response.ok) throw new Error('Failed to fetch menu engineering data');
      data = await response.json();
      */
    } catch (err) {
      error = err instanceof Error ? err.message : 'An unknown error occurred';
    } finally {
      loading = false;
    }
  }

  function calculateProfitMargin(item: MenuItem) {
    return (((item.price - item.foodCost) / item.price) * 100).toFixed(1);
  }

  function calculateProfit(item: MenuItem) {
    return (item.price - item.foodCost) * item.salesCount;
  }

  function exportToCSV() {
    if (!data) return;

    const headers = [
      'Item Name',
      'Category',
      'Price',
      'Food Cost',
      'Profit Margin',
      'Sales Count',
      'Total Sales',
      'Total Profit',
      'Classification'
    ];

    // Combine all items
    const allItems = [
      ...data.stars.map((item) => ({ ...item, classification: 'Star' })),
      ...data.puzzles.map((item) => ({ ...item, classification: 'Puzzle' })),
      ...data.plowHorses.map((item) => ({ ...item, classification: 'Plow Horse' })),
      ...data.dogs.map((item) => ({ ...item, classification: 'Dog' }))
    ];

    // Create CSV content
    let csvContent = headers.join(',') + '\n';

    allItems.forEach((item) => {
      const profit = (item.price - item.foodCost) * item.salesCount;
      const profitMargin = (((item.price - item.foodCost) / item.price) * 100).toFixed(1);

      const row = [
        `"${item.name}"`,
        `"${item.categoryName}"`,
        item.price.toFixed(2),
        item.foodCost.toFixed(2),
        `${profitMargin}%`,
        item.salesCount,
        item.totalSales.toFixed(2),
        profit.toFixed(2),
        item.classification
      ];

      csvContent += row.join(',') + '\n';
    });

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `menu-engineering-${menuId}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
</script>

<div>
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold">Menu Performance Analysis</h2>

    {#if data}
      <Button variant="outline" class="flex items-center gap-2" on:click={exportToCSV}>
        <Download class="h-4 w-4" />
        <span>Export CSV</span>
      </Button>
    {/if}
  </div>

  {#if loading}
    <div class="flex items-center justify-center h-64">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  {:else if error}
    <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
      <div class="flex">
        <AlertCircle class="h-5 w-5 text-red-500 mr-2" />
        <p class="text-red-700">{error}</p>
      </div>
    </div>
  {:else if data}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-lg flex items-center gap-2">
            <TrendingUp class="h-5 w-5 text-indigo-600" />
            <span>Sales Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <p class="text-sm text-gray-500">Total Sales</p>
              <p class="text-2xl font-bold">${data.totalSales.toFixed(2)}</p>
            </div>
            <div class="space-y-1">
              <p class="text-sm text-gray-500">Total Profit</p>
              <p class="text-2xl font-bold">${data.totalProfit.toFixed(2)}</p>
            </div>
            <div class="space-y-1">
              <p class="text-sm text-gray-500">Average Margin</p>
              <p class="text-2xl font-bold">{data.averageMargin.toFixed(1)}%</p>
            </div>
            <div class="space-y-1">
              <p class="text-sm text-gray-500">Total Items</p>
              <p class="text-2xl font-bold">
                {data.stars.length +
                  data.puzzles.length +
                  data.plowHorses.length +
                  data.dogs.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-lg flex items-center gap-2">
            <DollarSign class="h-5 w-5 text-green-600" />
            <span>Menu Engineering</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-3 bg-green-50 rounded-lg border border-green-100">
              <div class="flex items-center gap-2 mb-1">
                <div class="h-3 w-3 rounded-full bg-green-500"></div>
                <p class="font-semibold text-green-700">Stars</p>
              </div>
              <p class="text-sm text-gray-600">High Profit, High Sales</p>
              <p class="text-xl font-bold mt-1">{data.stars.length}</p>
            </div>

            <div class="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div class="flex items-center gap-2 mb-1">
                <div class="h-3 w-3 rounded-full bg-blue-500"></div>
                <p class="font-semibold text-blue-700">Puzzles</p>
              </div>
              <p class="text-sm text-gray-600">High Profit, Low Sales</p>
              <p class="text-xl font-bold mt-1">{data.puzzles.length}</p>
            </div>

            <div class="p-3 bg-amber-50 rounded-lg border border-amber-100">
              <div class="flex items-center gap-2 mb-1">
                <div class="h-3 w-3 rounded-full bg-amber-500"></div>
                <p class="font-semibold text-amber-700">Plow Horses</p>
              </div>
              <p class="text-sm text-gray-600">Low Profit, High Sales</p>
              <p class="text-xl font-bold mt-1">{data.plowHorses.length}</p>
            </div>

            <div class="p-3 bg-red-50 rounded-lg border border-red-100">
              <div class="flex items-center gap-2 mb-1">
                <div class="h-3 w-3 rounded-full bg-red-500"></div>
                <p class="font-semibold text-red-700">Dogs</p>
              </div>
              <p class="text-sm text-gray-600">Low Profit, Low Sales</p>
              <p class="text-xl font-bold mt-1">{data.dogs.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <div class="mb-6">
      <Button variant="ghost" class="flex items-center gap-2 text-indigo-600">
        <Info class="h-4 w-4" />
        <span>What do these classifications mean?</span>
      </Button>

      <div class="bg-gray-50 p-4 rounded-lg mt-2">
        <h3 class="font-medium mb-3">Menu Engineering Classifications</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 class="font-medium text-green-700 mb-1">Stars</h4>
            <p class="text-sm text-gray-600">
              High profitability and popularity. Feature these prominently and protect their recipe
              integrity.
            </p>
          </div>

          <div>
            <h4 class="font-medium text-blue-700 mb-1">Puzzles</h4>
            <p class="text-sm text-gray-600">
              High profitability but lower popularity. Reposition these items with better placement,
              descriptions, or photos.
            </p>
          </div>

          <div>
            <h4 class="font-medium text-amber-700 mb-1">Plow Horses</h4>
            <p class="text-sm text-gray-600">
              Low profitability but popular. Consider raising prices slightly or reducing food
              costs.
            </p>
          </div>

          <div>
            <h4 class="font-medium text-red-700 mb-1">Dogs</h4>
            <p class="text-sm text-gray-600">
              Low profitability and popularity. Consider removing or completely reimagining these
              items.
            </p>
          </div>
        </div>
      </div>
    </div>

    <Tabs value="stars" class="w-full">
      <TabsList class="w-full grid grid-cols-4">
        <TabsTrigger value="stars" class="flex items-center gap-1">
          <div class="h-2 w-2 rounded-full bg-green-500"></div>
          <span>Stars ({data.stars.length})</span>
        </TabsTrigger>
        <TabsTrigger value="puzzles" class="flex items-center gap-1">
          <div class="h-2 w-2 rounded-full bg-blue-500"></div>
          <span>Puzzles ({data.puzzles.length})</span>
        </TabsTrigger>
        <TabsTrigger value="plowhorses" class="flex items-center gap-1">
          <div class="h-2 w-2 rounded-full bg-amber-500"></div>
          <span>Plow Horses ({data.plowHorses.length})</span>
        </TabsTrigger>
        <TabsTrigger value="dogs" class="flex items-center gap-1">
          <div class="h-2 w-2 rounded-full bg-red-500"></div>
          <span>Dogs ({data.dogs.length})</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="stars" class="mt-6">
        <div class="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
          <div class="flex gap-2">
            <Star class="h-5 w-5 text-green-600 flex-shrink-0" />
            <p class="text-green-800">
              <span class="font-medium">Stars</span> are your menu's top performers with high profit
              margins and popularity. Maintain quality while keeping them prominently featured.
            </p>
          </div>
        </div>

        {#if data.stars.length === 0}
          <div class="text-center py-8 text-gray-500">
            <p>No items in this category yet.</p>
          </div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each data.stars as item}
              <Card>
                <CardHeader class="pb-2">
                  <div class="flex justify-between">
                    <CardTitle class="text-base">{item.name}</CardTitle>
                    <Badge variant="outline" class="bg-green-50 text-green-700 border-green-200"
                      >Star</Badge
                    >
                  </div>
                  <CardDescription>{item.categoryName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p class="text-gray-500">Price</p>
                      <p class="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Food Cost</p>
                      <p class="font-medium">${item.foodCost.toFixed(2)}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Margin</p>
                      <p class="font-medium text-green-600">{calculateProfitMargin(item)}%</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Sales Count</p>
                      <p class="font-medium">{item.salesCount}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Total Sales</p>
                      <p class="font-medium">${item.totalSales.toFixed(2)}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Total Profit</p>
                      <p class="font-medium">${calculateProfit(item).toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            {/each}
          </div>
        {/if}
      </TabsContent>

      <TabsContent value="puzzles" class="mt-6">
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
          <div class="flex gap-2">
            <Info class="h-5 w-5 text-blue-600 flex-shrink-0" />
            <p class="text-blue-800">
              <span class="font-medium">Puzzles</span> have high profit margins but lower popularity.
              Focus on repositioning these items with better menu placement, descriptions, or photos.
            </p>
          </div>
        </div>

        {#if data.puzzles.length === 0}
          <div class="text-center py-8 text-gray-500">
            <p>No items in this category yet.</p>
          </div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each data.puzzles as item}
              <Card>
                <CardHeader class="pb-2">
                  <div class="flex justify-between">
                    <CardTitle class="text-base">{item.name}</CardTitle>
                    <Badge variant="outline" class="bg-blue-50 text-blue-700 border-blue-200"
                      >Puzzle</Badge
                    >
                  </div>
                  <CardDescription>{item.categoryName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p class="text-gray-500">Price</p>
                      <p class="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Food Cost</p>
                      <p class="font-medium">${item.foodCost.toFixed(2)}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Margin</p>
                      <p class="font-medium text-blue-600">{calculateProfitMargin(item)}%</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Sales Count</p>
                      <p class="font-medium">{item.salesCount}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Total Sales</p>
                      <p class="font-medium">${item.totalSales.toFixed(2)}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Total Profit</p>
                      <p class="font-medium">${calculateProfit(item).toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            {/each}
          </div>
        {/if}
      </TabsContent>

      <TabsContent value="plowhorses" class="mt-6">
        <div class="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
          <div class="flex gap-2">
            <AlertCircle class="h-5 w-5 text-amber-600 flex-shrink-0" />
            <p class="text-amber-800">
              <span class="font-medium">Plow Horses</span> are popular but have lower profit margins.
              Consider raising prices slightly or finding ways to reduce food costs.
            </p>
          </div>
        </div>

        {#if data.plowHorses.length === 0}
          <div class="text-center py-8 text-gray-500">
            <p>No items in this category yet.</p>
          </div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each data.plowHorses as item}
              <Card>
                <CardHeader class="pb-2">
                  <div class="flex justify-between">
                    <CardTitle class="text-base">{item.name}</CardTitle>
                    <Badge variant="outline" class="bg-amber-50 text-amber-700 border-amber-200"
                      >Plow Horse</Badge
                    >
                  </div>
                  <CardDescription>{item.categoryName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p class="text-gray-500">Price</p>
                      <p class="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Food Cost</p>
                      <p class="font-medium">${item.foodCost.toFixed(2)}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Margin</p>
                      <p class="font-medium text-amber-600">{calculateProfitMargin(item)}%</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Sales Count</p>
                      <p class="font-medium">{item.salesCount}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Total Sales</p>
                      <p class="font-medium">${item.totalSales.toFixed(2)}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Total Profit</p>
                      <p class="font-medium">${calculateProfit(item).toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            {/each}
          </div>
        {/if}
      </TabsContent>

      <TabsContent value="dogs" class="mt-6">
        <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div class="flex gap-2">
            <AlertCircle class="h-5 w-5 text-red-600 flex-shrink-0" />
            <p class="text-red-800">
              <span class="font-medium">Dogs</span> have low profit margins and low popularity. Consider
              removing or completely reimagining these items.
            </p>
          </div>
        </div>

        {#if data.dogs.length === 0}
          <div class="text-center py-8 text-gray-500">
            <p>No items in this category yet.</p>
          </div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each data.dogs as item}
              <Card>
                <CardHeader class="pb-2">
                  <div class="flex justify-between">
                    <CardTitle class="text-base">{item.name}</CardTitle>
                    <Badge variant="outline" class="bg-red-50 text-red-700 border-red-200"
                      >Dog</Badge
                    >
                  </div>
                  <CardDescription>{item.categoryName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p class="text-gray-500">Price</p>
                      <p class="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Food Cost</p>
                      <p class="font-medium">${item.foodCost.toFixed(2)}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Margin</p>
                      <p class="font-medium text-red-600">{calculateProfitMargin(item)}%</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Sales Count</p>
                      <p class="font-medium">{item.salesCount}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Total Sales</p>
                      <p class="font-medium">${item.totalSales.toFixed(2)}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Total Profit</p>
                      <p class="font-medium">${calculateProfit(item).toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            {/each}
          </div>
        {/if}
      </TabsContent>
    </Tabs>
  {:else}
    <div class="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
      <p class="text-gray-600 mb-2">No performance data available for this menu yet.</p>
      <p class="text-sm text-gray-500">
        Performance data will be available after you've added menu items and recorded sales.
      </p>
    </div>
  {/if}
</div>

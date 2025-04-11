<!-- InventoryManagement.svelte -->
<script lang="ts">
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import * as Select from '$lib/components/ui/select/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import {
    Search,
    Plus,
    FileBarChart,
    Truck,
    ArrowDown,
    ArrowUp,
    Package,
    Refrigerator,
    PanelLeft,
    AlertTriangle,
    BarChart4,
    Filter,
    ArrowUpDown,
    ChevronDown,
    History,
    Clipboard,
    ClipboardCheck,
    Edit,
    Trash2,
    MoreVertical
  } from 'lucide-svelte';

  // Reactive variables
  let tabValue = $state('all-items');
  let searchQuery = $state('');
  let selectedInventory = $state('all');
  let selectedCategory = $state('all');
  let sortBy = $state('name-asc');

  // Enums for various types
  const InventoryType = ['MAIN', 'BAR', 'PREP', 'STORAGE', 'WALK_IN', 'FREEZER'] as const;

  const TransactionType = [
    'PURCHASE',
    'USAGE',
    'ADJUSTMENT',
    'WASTE',
    'TRANSFER_IN',
    'TRANSFER_OUT'
  ] as const;

  const CountStatus = ['DRAFT', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as const;

  // Inventory location options
  const inventoryOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'main', label: 'Main Kitchen' },
    { value: 'prep', label: 'Prep Kitchen' },
    { value: 'walkin', label: 'Walk-in Cooler' },
    { value: 'freezer', label: 'Freezer' },
    { value: 'dry', label: 'Dry Storage' }
  ];

  // Category options
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'produce', label: 'Produce' },
    { value: 'meat', label: 'Meat & Poultry' },
    { value: 'dairy', label: 'Dairy' },
    { value: 'seafood', label: 'Seafood' },
    { value: 'dry', label: 'Dry Goods' },
    { value: 'spices', label: 'Spices & Herbs' },
    { value: 'canned', label: 'Canned Goods' },
    { value: 'frozen', label: 'Frozen Foods' },
    { value: 'beverages', label: 'Beverages' }
  ];

  // Sort options
  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'quantity-asc', label: 'Quantity (Low-High)' },
    { value: 'quantity-desc', label: 'Quantity (High-Low)' },
    { value: 'restock', label: 'Restock Needed' },
    { value: 'date-asc', label: 'Last Updated (Oldest)' },
    { value: 'date-desc', label: 'Last Updated (Newest)' }
  ];

  // Derived values for select components
  const inventoryContent = $derived(
    inventoryOptions.find((opt) => opt.value === selectedInventory)?.label ?? 'All Locations'
  );

  const categoryContent = $derived(
    categoryOptions.find((opt) => opt.value === selectedCategory)?.label ?? 'All Categories'
  );

  const sortContent = $derived(
    sortOptions.find((opt) => opt.value === sortBy)?.label ?? 'Name (A-Z)'
  );

  // Dummy inventory data
  const inventoryItems = [
    {
      id: 1,
      name: 'Chicken Breast, Boneless',
      category: 'meat',
      categoryName: 'Meat & Poultry',
      inventoryId: 1,
      inventoryName: 'Main Kitchen',
      inventoryType: InventoryType.MAIN,
      quantity: 25.5,
      unit: 'kg',
      minQuantity: 10,
      restockThreshold: 15,
      par: 30,
      reorderPoint: 15,
      currentPrice: 8.99,
      averageCost: 8.5,
      lastCountDate: new Date(2025, 3, 7), // April 7, 2025
      lastOrderDate: new Date(2025, 3, 1), // April 1, 2025
      barcode: '100123456789',
      location: 'Refrigerator 2, Shelf 3',
      notes: 'Preferred supplier: Premium Meats',
      needsRestock: false
    },
    {
      id: 2,
      name: 'Romaine Lettuce',
      category: 'produce',
      categoryName: 'Produce',
      inventoryId: 1,
      inventoryName: 'Main Kitchen',
      inventoryType: InventoryType.MAIN,
      quantity: 8.0,
      unit: 'kg',
      minQuantity: 5,
      restockThreshold: 10,
      par: 15,
      reorderPoint: 10,
      currentPrice: 3.49,
      averageCost: 3.25,
      lastCountDate: new Date(2025, 3, 8), // April 8, 2025
      lastOrderDate: new Date(2025, 3, 5), // April 5, 2025
      barcode: '100123456790',
      location: 'Walk-in, Produce Section',
      notes: 'Order 3x weekly',
      needsRestock: true
    },
    {
      id: 3,
      name: 'Olive Oil, Extra Virgin',
      category: 'dry',
      categoryName: 'Dry Goods',
      inventoryId: 3,
      inventoryName: 'Dry Storage',
      inventoryType: InventoryType.STORAGE,
      quantity: 12.0,
      unit: 'liter',
      minQuantity: 5,
      restockThreshold: 8,
      par: 15,
      reorderPoint: 8,
      currentPrice: 15.99,
      averageCost: 15.75,
      lastCountDate: new Date(2025, 3, 5), // April 5, 2025
      lastOrderDate: new Date(2025, 2, 20), // March 20, 2025
      barcode: '100123456791',
      location: 'Shelf B2',
      notes: 'Italian import, bulk containers',
      needsRestock: false
    },
    {
      id: 4,
      name: 'Whole Milk',
      category: 'dairy',
      categoryName: 'Dairy',
      inventoryId: 2,
      inventoryName: 'Walk-in Cooler',
      inventoryType: InventoryType.WALK_IN,
      quantity: 9.0,
      unit: 'liter',
      minQuantity: 10,
      restockThreshold: 15,
      par: 25,
      reorderPoint: 15,
      currentPrice: 2.49,
      averageCost: 2.45,
      lastCountDate: new Date(2025, 3, 8), // April 8, 2025
      lastOrderDate: new Date(2025, 3, 7), // April 7, 2025
      barcode: '100123456792',
      location: 'Dairy Section, Shelf 1',
      notes: 'Order daily, local supplier',
      needsRestock: true
    },
    {
      id: 5,
      name: 'Ground Beef, 85/15',
      category: 'meat',
      categoryName: 'Meat & Poultry',
      inventoryId: 2,
      inventoryName: 'Walk-in Cooler',
      inventoryType: InventoryType.WALK_IN,
      quantity: 18.5,
      unit: 'kg',
      minQuantity: 8,
      restockThreshold: 10,
      par: 20,
      reorderPoint: 10,
      currentPrice: 6.99,
      averageCost: 6.85,
      lastCountDate: new Date(2025, 3, 8), // April 8, 2025
      lastOrderDate: new Date(2025, 3, 3), // April 3, 2025
      barcode: '100123456793',
      location: 'Meat Section, Shelf 2',
      notes: 'Use within 3 days of delivery',
      needsRestock: false
    },
    {
      id: 6,
      name: 'Brown Rice',
      category: 'dry',
      categoryName: 'Dry Goods',
      inventoryId: 3,
      inventoryName: 'Dry Storage',
      inventoryType: InventoryType.STORAGE,
      quantity: 28.0,
      unit: 'kg',
      minQuantity: 15,
      restockThreshold: 20,
      par: 50,
      reorderPoint: 20,
      currentPrice: 3.25,
      averageCost: 3.1,
      lastCountDate: new Date(2025, 3, 1), // April 1, 2025
      lastOrderDate: new Date(2025, 2, 15), // March 15, 2025
      barcode: '100123456794',
      location: 'Bin 12',
      notes: 'Bulk order monthly',
      needsRestock: false
    },
    {
      id: 7,
      name: 'Atlantic Salmon Fillets',
      category: 'seafood',
      categoryName: 'Seafood',
      inventoryId: 4,
      inventoryName: 'Freezer',
      inventoryType: InventoryType.FREEZER,
      quantity: 5.0,
      unit: 'kg',
      minQuantity: 8,
      restockThreshold: 10,
      par: 15,
      reorderPoint: 8,
      currentPrice: 22.99,
      averageCost: 21.75,
      lastCountDate: new Date(2025, 3, 8), // April 8, 2025
      lastOrderDate: new Date(2025, 3, 2), // April 2, 2025
      barcode: '100123456795',
      location: 'Seafood Section, Shelf 1',
      notes: 'Sustainably sourced',
      needsRestock: true
    },
    {
      id: 8,
      name: 'Vanilla Extract',
      category: 'spices',
      categoryName: 'Spices & Herbs',
      inventoryId: 3,
      inventoryName: 'Dry Storage',
      inventoryType: InventoryType.STORAGE,
      quantity: 3.0,
      unit: 'liter',
      minQuantity: 1,
      restockThreshold: 2,
      par: 5,
      reorderPoint: 2,
      currentPrice: 42.99,
      averageCost: 40.5,
      lastCountDate: new Date(2025, 3, 5), // April 5, 2025
      lastOrderDate: new Date(2025, 2, 10), // March 10, 2025
      barcode: '100123456796',
      location: 'Spice Cabinet',
      notes: 'Pure Madagascar vanilla',
      needsRestock: false
    },
    {
      id: 9,
      name: 'Tomato Paste',
      category: 'canned',
      categoryName: 'Canned Goods',
      inventoryId: 3,
      inventoryName: 'Dry Storage',
      inventoryType: InventoryType.STORAGE,
      quantity: 22.0,
      unit: 'kg',
      minQuantity: 10,
      restockThreshold: 15,
      par: 25,
      reorderPoint: 15,
      currentPrice: 2.99,
      averageCost: 2.85,
      lastCountDate: new Date(2025, 3, 5), // April 5, 2025
      lastOrderDate: new Date(2025, 2, 25), // March 25, 2025
      barcode: '100123456797',
      location: 'Canned Goods, Shelf C3',
      notes: 'Case size: 24 cans',
      needsRestock: false
    },
    {
      id: 10,
      name: 'Orange Juice, Fresh',
      category: 'beverages',
      categoryName: 'Beverages',
      inventoryId: 2,
      inventoryName: 'Walk-in Cooler',
      inventoryType: InventoryType.WALK_IN,
      quantity: 8.0,
      unit: 'liter',
      minQuantity: 10,
      restockThreshold: 12,
      par: 20,
      reorderPoint: 12,
      currentPrice: 5.49,
      averageCost: 5.25,
      lastCountDate: new Date(2025, 3, 8), // April 8, 2025
      lastOrderDate: new Date(2025, 3, 7), // April 7, 2025
      barcode: '100123456798',
      location: 'Beverage Section, Shelf 2',
      notes: '3-day shelf life once opened',
      needsRestock: true
    }
  ];

  // Dummy recent transactions
  const recentTransactions = [
    {
      id: 1,
      itemName: 'Chicken Breast, Boneless',
      type: TransactionType.PURCHASE,
      quantity: 20,
      unit: 'kg',
      previousQty: 10.5,
      newQty: 30.5,
      cost: 179.8,
      reference: 'PO-2025-0412',
      createdBy: 'Jane Smith',
      createdAt: new Date(2025, 3, 8, 9, 30) // April 8, 2025, 9:30 AM
    },
    {
      id: 2,
      itemName: 'Romaine Lettuce',
      type: TransactionType.USAGE,
      quantity: 3.5,
      unit: 'kg',
      previousQty: 11.5,
      newQty: 8.0,
      createdBy: 'Michael Johnson',
      createdAt: new Date(2025, 3, 8, 11, 15) // April 8, 2025, 11:15 AM
    },
    {
      id: 3,
      itemName: 'Whole Milk',
      type: TransactionType.PURCHASE,
      quantity: 15,
      unit: 'liter',
      previousQty: 5.0,
      newQty: 20.0,
      cost: 37.35,
      reference: 'PO-2025-0413',
      createdBy: 'Jane Smith',
      createdAt: new Date(2025, 3, 8, 14, 45) // April 8, 2025, 2:45 PM
    },
    {
      id: 4,
      itemName: 'Whole Milk',
      type: TransactionType.USAGE,
      quantity: 11,
      unit: 'liter',
      previousQty: 20.0,
      newQty: 9.0,
      createdBy: 'Sarah Williams',
      createdAt: new Date(2025, 3, 8, 16, 30) // April 8, 2025, 4:30 PM
    },
    {
      id: 5,
      itemName: 'Atlantic Salmon Fillets',
      type: TransactionType.WASTE,
      quantity: 1.2,
      unit: 'kg',
      previousQty: 6.2,
      newQty: 5.0,
      cost: 26.1,
      createdBy: 'Robert Davis',
      createdAt: new Date(2025, 3, 8, 17, 20) // April 8, 2025, 5:20 PM
    }
  ];

  // Dummy recent stock counts
  const recentStockCounts = [
    {
      id: 1,
      inventoryName: 'Main Kitchen',
      status: CountStatus.COMPLETED,
      startedAt: new Date(2025, 3, 8, 6, 0), // April 8, 2025, 6:00 AM
      completedAt: new Date(2025, 3, 8, 7, 30), // April 8, 2025, 7:30 AM
      createdBy: 'Jane Smith',
      itemCount: 45,
      discrepancies: 3
    },
    {
      id: 2,
      inventoryName: 'Walk-in Cooler',
      status: CountStatus.COMPLETED,
      startedAt: new Date(2025, 3, 8, 7, 0), // April 8, 2025, 7:00 AM
      completedAt: new Date(2025, 3, 8, 8, 15), // April 8, 2025, 8:15 AM
      createdBy: 'Michael Johnson',
      itemCount: 32,
      discrepancies: 5
    },
    {
      id: 3,
      inventoryName: 'Freezer',
      status: CountStatus.COMPLETED,
      startedAt: new Date(2025, 3, 8, 6, 30), // April 8, 2025, 6:30 AM
      completedAt: new Date(2025, 3, 8, 7, 0), // April 8, 2025, 7:00 AM
      createdBy: 'Sarah Williams',
      itemCount: 18,
      discrepancies: 1
    },
    {
      id: 4,
      inventoryName: 'Dry Storage',
      status: CountStatus.IN_PROGRESS,
      startedAt: new Date(2025, 3, 9, 6, 0), // April 9, 2025, 6:00 AM
      completedAt: null,
      createdBy: 'Robert Davis',
      itemCount: 67,
      discrepancies: null
    }
  ];

  // Get transaction type badge color
  function getTransactionTypeClass(type) {
    switch (type) {
      case TransactionType.PURCHASE:
        return 'bg-green-100 text-green-800 border-green-200';
      case TransactionType.USAGE:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case TransactionType.ADJUSTMENT:
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case TransactionType.WASTE:
        return 'bg-red-100 text-red-800 border-red-200';
      case TransactionType.TRANSFER_IN:
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case TransactionType.TRANSFER_OUT:
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  // Get status badge color
  function getStatusClass(status) {
    switch (status) {
      case CountStatus.COMPLETED:
        return 'bg-green-100 text-green-800 border-green-200';
      case CountStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case CountStatus.DRAFT:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case CountStatus.CANCELLED:
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  // Format date
  function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  }

  // Format date and time
  function formatDateTime(date) {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  }

  // Create an inventory item
  function addInventoryItem() {
    console.log('Adding new inventory item');
    // In a real application, this would open a modal or navigate to a form
  }

  // Create a stock count
  function startStockCount() {
    console.log('Starting new stock count');
    // In a real application, this would open a modal or navigate to a form
  }

  // Create a transaction
  function addTransaction() {
    console.log('Adding new transaction');
    // In a real application, this would open a modal or navigate to a form
  }

  // View details (generic)
  function handleViewDetails(itemId) {
    console.log(`View details for item ID: ${itemId}`);
    // In a real app, you would navigate to the item detail page or show a modal
  }

  // Filtered inventory items based on search and filters
  function getFilteredItems() {
    return inventoryItems.filter(
      (item) =>
        (selectedInventory === 'all' || item.inventoryId.toString() === selectedInventory) &&
        (selectedCategory === 'all' || item.category === selectedCategory) &&
        (searchQuery === '' ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }
</script>

<div class="container mx-auto p-4 max-w-7xl">
  <div class="mb-6">
    <h1 class="text-2xl font-bold mb-2">Inventory Management</h1>
    <p class="text-gray-600">Track and manage inventory across all kitchen locations</p>
  </div>

  <!-- Summary Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <Card.Root>
      <Card.Content class="p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Total Items</p>
            <p class="text-2xl font-bold">{inventoryItems.length}</p>
          </div>
          <div class="p-3 bg-blue-100 rounded-full">
            <Package class="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Items Below Par</p>
            <p class="text-2xl font-bold">
              {inventoryItems.filter((item) => item.quantity < item.par).length}
            </p>
          </div>
          <div class="p-3 bg-amber-100 rounded-full">
            <ArrowDown class="h-6 w-6 text-amber-600" />
          </div>
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Need to Reorder</p>
            <p class="text-2xl font-bold">
              {inventoryItems.filter((item) => item.quantity <= item.reorderPoint).length}
            </p>
          </div>
          <div class="p-3 bg-red-100 rounded-full">
            <AlertTriangle class="h-6 w-6 text-red-600" />
          </div>
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Inventory Value</p>
            <p class="text-2xl font-bold">
              ${inventoryItems
                .reduce((total, item) => total + item.quantity * item.currentPrice, 0)
                .toFixed(2)}
            </p>
          </div>
          <div class="p-3 bg-green-100 rounded-full">
            <BarChart4 class="h-6 w-6 text-green-600" />
          </div>
        </div>
      </Card.Content>
    </Card.Root>
  </div>

  <!-- Action Buttons and Tabs -->
  <div class="flex flex-col md:flex-row gap-4 md:justify-between mb-4">
    <Tabs.Root bind:value={tabValue} class="w-full md:w-auto">
      <Tabs.List class="w-full md:w-auto inline-flex">
        <Tabs.Trigger value="all-items" class="rounded-l-md">All Items</Tabs.Trigger>
        <Tabs.Trigger value="low-stock" class="rounded-none">Low Stock</Tabs.Trigger>
        <Tabs.Trigger value="transactions" class="rounded-none">Transactions</Tabs.Trigger>
        <Tabs.Trigger value="stock-counts" class="rounded-r-md">Stock Counts</Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>

    <div class="flex gap-2">
      <Button variant="outline" class="gap-2" on:click={startStockCount}>
        <ClipboardCheck size={16} />
        New Count
      </Button>
      <Button variant="outline" class="gap-2" on:click={addTransaction}>
        <ArrowUpDown size={16} />
        Transaction
      </Button>
      <Button class="gap-2" on:click={addInventoryItem}>
        <Plus size={16} />
        Add Item
      </Button>
    </div>
  </div>

  <!-- Filtering Bar (for Items view) -->
  {#if tabValue === 'all-items' || tabValue === 'low-stock'}
    <div class="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div class="flex flex-col md:flex-row gap-4 justify-between">
        <!-- Search and Filters -->
        <div class="flex flex-col sm:flex-row gap-3 flex-grow">
          <div class="relative flex-grow">
            <Search
              size={18}
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              type="text"
              placeholder="Search items by name, category or location..."
              class="pl-10"
              bind:value={searchQuery}
            />
          </div>

          <div class="flex gap-3">
            <Select.Root type="single" bind:value={selectedInventory}>
              <Select.Trigger class="min-w-[150px]">
                {inventoryContent}
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each inventoryOptions as option}
                    <Select.Item value={option.value} label={option.label}>
                      {option.label}
                    </Select.Item>
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>

            <Select.Root type="single" bind:value={selectedCategory}>
              <Select.Trigger class="min-w-[150px]">
                {categoryContent}
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each categoryOptions as option}
                    <Select.Item value={option.value} label={option.label}>
                      {option.label}
                    </Select.Item>
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </div>
        </div>

        <!-- Sort By -->
        <div>
          <Select.Root type="single" bind:value={sortBy}>
            <Select.Trigger class="min-w-[180px]">
              <div class="flex items-center gap-2">
                <ArrowUpDown size={16} />
                <span>Sort: {sortContent}</span>
              </div>
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                {#each sortOptions as option}
                  <Select.Item value={option.value} label={option.label}>
                    {option.label}
                  </Select.Item>
                {/each}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
      </div>
    </div>
  {/if}

  <!-- Content based on selected tab -->
  <Card.Root>
    <!-- All Items Tab -->
    {#if tabValue === 'all-items'}
      <Card.Header class="pb-0 px-0">
        <div class="px-6">
          <Card.Title>Inventory Items</Card.Title>
          <Card.Description>Manage all inventory items across locations</Card.Description>
        </div>
      </Card.Header>
      <Card.Content class="p-0">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Item</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Category</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Location</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Quantity</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Par Level</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Last Updated</th
                >
                <th class="text-right p-4 w-[100px]"></th>
              </tr>
            </thead>
            <tbody>
              {#each getFilteredItems() as item}
                <tr class="border-b hover:bg-gray-50">
                  <td class="p-4">
                    <div class="font-medium">{item.name}</div>
                    <div class="text-sm text-gray-500">{item.barcode}</div>
                  </td>
                  <td class="p-4">
                    <Badge variant="outline" class="bg-gray-100 text-gray-800">
                      {item.categoryName}
                    </Badge>
                  </td>
                  <td class="p-4">
                    <div class="flex items-center gap-1">
                      {#if item.inventoryType === InventoryType.WALK_IN}
                        <Refrigerator size={16} class="text-blue-500" />
                      {:else if item.inventoryType === InventoryType.FREEZER}
                        <Refrigerator size={16} class="text-indigo-500" />
                      {:else if item.inventoryType === InventoryType.STORAGE}
                        <Package size={16} class="text-amber-500" />
                      {:else}
                        <Package size={16} class="text-gray-500" />
                      {/if}
                      <span>{item.inventoryName}</span>
                    </div>
                    {#if item.location}
                      <div class="text-xs text-gray-500">{item.location}</div>
                    {/if}
                  </td>
                  <td class="p-4">
                    <div
                      class={item.quantity <= item.reorderPoint
                        ? 'font-medium text-red-600'
                        : 'font-medium'}
                    >
                      {item.quantity}
                      {item.unit}
                    </div>
                    {#if item.quantity <= item.reorderPoint}
                      <div class="text-xs text-red-600 flex items-center gap-1">
                        <AlertTriangle size={12} />
                        Reorder needed
                      </div>
                    {/if}
                  </td>
                  <td class="p-4">
                    {item.par}
                    {item.unit}
                    <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div
                        class={`h-1.5 rounded-full ${
                          item.quantity >= item.par
                            ? 'bg-green-600'
                            : item.quantity > item.reorderPoint
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                        }`}
                        style={`width: ${Math.min(100, Math.round((item.quantity / item.par) * 100))}%`}
                      ></div>
                    </div>
                  </td>
                  <td class="p-4">
                    <div class="text-sm">{formatDate(item.lastCountDate)}</div>
                  </td>
                  <td class="p-4 text-right">
                    <Button variant="ghost" size="icon" on:click={() => handleViewDetails(item.id)}>
                      <MoreVertical size={16} />
                    </Button>
                  </td>
                </tr>
              {/each}
              {#if getFilteredItems().length === 0}
                <tr>
                  <td colspan="7" class="p-8 text-center text-gray-500">
                    No items found matching your filters. Try adjusting your search or filters.
                  </td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
      </Card.Content>
    {/if}

    <!-- Low Stock Tab -->
    {#if tabValue === 'low-stock'}
      <Card.Header class="pb-0 px-0">
        <div class="px-6">
          <Card.Title>Low Stock Items</Card.Title>
          <Card.Description>Items that need to be reordered soon</Card.Description>
        </div>
      </Card.Header>
      <Card.Content class="p-0">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Item</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Category</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Location</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Current Qty</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Reorder Point</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Order Amount</th
                >
                <th class="text-right p-4 w-[100px]"></th>
              </tr>
            </thead>
            <tbody>
              {#each getFilteredItems().filter((item) => item.quantity <= item.reorderPoint) as item}
                <tr class="border-b hover:bg-gray-50">
                  <td class="p-4">
                    <div class="font-medium">{item.name}</div>
                    <div class="text-sm text-gray-500">{item.barcode}</div>
                  </td>
                  <td class="p-4">
                    <Badge variant="outline" class="bg-gray-100 text-gray-800">
                      {item.categoryName}
                    </Badge>
                  </td>
                  <td class="p-4">
                    <div class="flex items-center gap-1">
                      {#if item.inventoryType === InventoryType.WALK_IN}
                        <Refrigerator size={16} class="text-blue-500" />
                      {:else if item.inventoryType === InventoryType.FREEZER}
                        <Refrigerator size={16} class="text-indigo-500" />
                      {:else if item.inventoryType === InventoryType.STORAGE}
                        <Package size={16} class="text-amber-500" />
                      {:else}
                        <Package size={16} class="text-gray-500" />
                      {/if}
                      <span>{item.inventoryName}</span>
                    </div>
                  </td>
                  <td class="p-4 font-medium text-red-600">
                    {item.quantity}
                    {item.unit}
                  </td>
                  <td class="p-4">
                    {item.reorderPoint}
                    {item.unit}
                  </td>
                  <td class="p-4">
                    <div class="font-medium">{item.par - item.quantity} {item.unit}</div>
                    <div class="text-xs text-gray-600">To reach par level</div>
                  </td>
                  <td class="p-4 text-right">
                    <Button variant="outline" size="sm">Reorder</Button>
                  </td>
                </tr>
              {/each}
              {#if getFilteredItems().filter((item) => item.quantity <= item.reorderPoint).length === 0}
                <tr>
                  <td colspan="7" class="p-8 text-center text-gray-500">
                    No low stock items found. Everything is above reorder points.
                  </td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
      </Card.Content>
    {/if}

    <!-- Transactions Tab -->
    {#if tabValue === 'transactions'}
      <Card.Header class="pb-0 px-0">
        <div class="px-6">
          <Card.Title>Recent Transactions</Card.Title>
          <Card.Description>Track all inventory movements and adjustments</Card.Description>
        </div>
      </Card.Header>
      <Card.Content class="p-0">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Date/Time</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Item</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Type</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Quantity</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Change</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Created By</th
                >
                <th class="text-right p-4 w-[100px]"></th>
              </tr>
            </thead>
            <tbody>
              {#each recentTransactions as transaction}
                <tr class="border-b hover:bg-gray-50">
                  <td class="p-4">
                    <div class="font-medium">{formatDateTime(transaction.createdAt)}</div>
                    {#if transaction.reference}
                      <div class="text-xs text-gray-500">Ref: {transaction.reference}</div>
                    {/if}
                  </td>
                  <td class="p-4">
                    {transaction.itemName}
                  </td>
                  <td class="p-4">
                    <Badge variant="outline" class={getTransactionTypeClass(transaction.type)}>
                      {transaction.type}
                    </Badge>
                  </td>
                  <td class="p-4">
                    {transaction.quantity}
                    {transaction.unit}
                    {#if transaction.cost}
                      <div class="text-xs text-gray-500">${transaction.cost.toFixed(2)}</div>
                    {/if}
                  </td>
                  <td class="p-4">
                    <div class="flex items-center gap-1">
                      {#if transaction.type === TransactionType.PURCHASE || transaction.type === TransactionType.ADJUSTMENT || transaction.type === TransactionType.TRANSFER_IN}
                        <ArrowUp size={16} class="text-green-500" />
                        <span class="text-green-600"
                          >+{(transaction.newQty - transaction.previousQty).toFixed(1)}
                          {transaction.unit}</span
                        >
                      {:else}
                        <ArrowDown size={16} class="text-red-500" />
                        <span class="text-red-600"
                          >-{(transaction.previousQty - transaction.newQty).toFixed(1)}
                          {transaction.unit}</span
                        >
                      {/if}
                    </div>
                  </td>
                  <td class="p-4">
                    {transaction.createdBy}
                  </td>
                  <td class="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      on:click={() => handleViewDetails(transaction.id)}
                    >
                      <MoreVertical size={16} />
                    </Button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </Card.Content>
    {/if}

    <!-- Stock Counts Tab -->
    {#if tabValue === 'stock-counts'}
      <Card.Header class="pb-0 px-0">
        <div class="px-6">
          <Card.Title>Stock Counts</Card.Title>
          <Card.Description>View and manage physical inventory counts</Card.Description>
        </div>
      </Card.Header>
      <Card.Content class="p-0">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Date</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Location</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Status</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Items Counted</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Discrepancies</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Created By</th
                >
                <th class="text-right p-4 w-[100px]"></th>
              </tr>
            </thead>
            <tbody>
              {#each recentStockCounts as count}
                <tr class="border-b hover:bg-gray-50">
                  <td class="p-4">
                    <div class="font-medium">{formatDate(count.startedAt)}</div>
                    <div class="text-xs text-gray-500">
                      Started: {count.startedAt.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                      {#if count.completedAt}
                        <br />Completed: {count.completedAt.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      {/if}
                    </div>
                  </td>
                  <td class="p-4">
                    {count.inventoryName}
                  </td>
                  <td class="p-4">
                    <Badge variant="outline" class={getStatusClass(count.status)}>
                      {count.status}
                    </Badge>
                  </td>
                  <td class="p-4">
                    {count.itemCount} items
                  </td>
                  <td class="p-4">
                    {#if count.discrepancies !== null}
                      <div
                        class={count.discrepancies > 0
                          ? 'text-amber-600 font-medium'
                          : 'text-green-600 font-medium'}
                      >
                        {count.discrepancies}
                        {count.discrepancies === 1 ? 'item' : 'items'}
                      </div>
                    {:else}
                      <div class="text-gray-500">Not completed</div>
                    {/if}
                  </td>
                  <td class="p-4">
                    {count.createdBy}
                  </td>
                  <td class="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      on:click={() => handleViewDetails(count.id)}
                    >
                      <MoreVertical size={16} />
                    </Button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </Card.Content>
    {/if}

    <Card.Footer class="flex justify-between items-center px-6 py-4 border-t">
      <div class="text-sm text-gray-500">
        {#if tabValue === 'all-items'}
          Showing <span class="font-medium">{getFilteredItems().length}</span> of
          <span class="font-medium">{inventoryItems.length}</span> inventory items
        {:else if tabValue === 'low-stock'}
          <span class="font-medium"
            >{getFilteredItems().filter((item) => item.quantity <= item.reorderPoint).length}</span
          > items below reorder point
        {:else if tabValue === 'transactions'}
          Showing last <span class="font-medium">{recentTransactions.length}</span> transactions
        {:else if tabValue === 'stock-counts'}
          Showing <span class="font-medium">{recentStockCounts.length}</span> recent stock counts
        {/if}
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Previous</Button>
        <Button variant="outline" size="sm">Next</Button>
      </div>
    </Card.Footer>
  </Card.Root>

  <!-- Item Detail View Placeholder -->
  <div class="mt-6">
    <Card.Root>
      <Card.Header>
        <Card.Title class="text-xl">Inventory Item Details</Card.Title>
        <Card.Description>
          View complete details and transaction history for this item
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Left column - Basic Info -->
          <div class="md:w-1/3">
            <div class="border rounded-lg p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold">Chicken Breast, Boneless</h3>
                <Badge variant="outline" class="bg-green-100 text-green-800 border-green-200">
                  In Stock
                </Badge>
              </div>

              <div class="space-y-4 mt-4">
                <div class="border-b pb-4">
                  <p class="text-sm text-gray-500 mb-1">Current Quantity</p>
                  <div class="flex items-center justify-between">
                    <p class="text-2xl font-bold">25.5 kg</p>
                    <Badge variant="outline" class="bg-blue-50 text-blue-700 border-blue-200">
                      <div class="flex items-center gap-1">
                        <Package size={14} />
                        Main Kitchen
                      </div>
                    </Badge>
                  </div>
                  <div class="mt-2">
                    <div class="text-sm text-gray-600 mb-1 flex justify-between">
                      <span>Stock Level</span>
                      <span>25.5 / 30 kg</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-green-600 h-2 rounded-full" style="width: 85%"></div>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4 border-b pb-4">
                  <div>
                    <p class="text-sm text-gray-500">Par Level</p>
                    <p class="font-medium">30 kg</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Reorder Point</p>
                    <p class="font-medium">15 kg</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Min Quantity</p>
                    <p class="font-medium">10 kg</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Unit</p>
                    <p class="font-medium">kg</p>
                  </div>
                </div>

                <div class="border-b pb-4">
                  <p class="text-sm text-gray-500 mb-1">Location</p>
                  <p class="font-medium">Refrigerator 2, Shelf 3</p>
                  <p class="text-sm text-gray-500 mt-2">Barcode</p>
                  <p class="font-medium">100123456789</p>
                </div>

                <div class="border-b pb-4">
                  <p class="text-sm text-gray-500 mb-1">Pricing</p>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-gray-500">Current Price</p>
                      <p class="font-medium">$8.99 / kg</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">Average Cost</p>
                      <p class="font-medium">$8.50 / kg</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p class="text-sm text-gray-500 mb-1">Notes</p>
                  <p>Preferred supplier: Premium Meats</p>
                </div>

                <div class="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" class="flex-1 gap-1">
                    <Edit size={16} />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" class="flex-1 gap-1">
                    <ArrowUpDown size={16} />
                    Transaction
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right column - Additional Details -->
          <div class="md:w-2/3">
            <Tabs.Root value="history" class="w-full">
              <Tabs.List class="w-full border-b mb-4">
                <Tabs.Trigger
                  value="history"
                  class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary mr-6"
                >
                  Transaction History
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="usage"
                  class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary mr-6"
                >
                  Usage Analytics
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="recipes"
                  class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary mr-6"
                >
                  Linked Recipes
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>

            <!-- Transaction History Content -->
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <h3 class="font-medium text-lg">Recent Transactions</h3>
                <div class="flex gap-2">
                  <Button variant="outline" size="sm" class="gap-1">
                    <Filter size={14} />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" class="gap-1">
                    <FileBarChart size={14} />
                    Export
                  </Button>
                </div>
              </div>

              <div class="overflow-x-auto border rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >Date</th
                      >
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >Type</th
                      >
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >Quantity</th
                      >
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >Stock After</th
                      >
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >Created By</th
                      >
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >Notes</th
                      >
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    {#each [{ date: 'Apr 8, 2025, 9:30 AM', type: TransactionType.PURCHASE, quantity: 20, unit: 'kg', stockAfter: 30.5, createdBy: 'Jane Smith', notes: 'Weekly delivery', reference: 'PO-2025-0412' }, { date: 'Apr 7, 2025, 2:15 PM', type: TransactionType.USAGE, quantity: 3.5, unit: 'kg', stockAfter: 10.5, createdBy: 'Michael Johnson', notes: 'Used for lunch service' }, { date: 'Apr 6, 2025, 5:20 PM', type: TransactionType.USAGE, quantity: 2.0, unit: 'kg', stockAfter: 14.0, createdBy: 'Sarah Williams', notes: 'Used for dinner service' }, { date: 'Apr 5, 2025, 10:45 AM', type: TransactionType.ADJUSTMENT, quantity: 0.5, unit: 'kg', stockAfter: 16.0, createdBy: 'Jane Smith', notes: 'Correction after count' }, { date: 'Apr 3, 2025, 9:00 AM', type: TransactionType.PURCHASE, quantity: 15, unit: 'kg', stockAfter: 15.5, createdBy: 'Jane Smith', notes: 'Emergency order', reference: 'PO-2025-0401' }] as tx}
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {tx.date}
                          {#if tx.reference}
                            <div class="text-xs text-gray-400">Ref: {tx.reference}</div>
                          {/if}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" class={getTransactionTypeClass(tx.type)}>
                            {tx.type}
                          </Badge>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {#if tx.type === TransactionType.PURCHASE || tx.type === TransactionType.ADJUSTMENT || tx.type === TransactionType.TRANSFER_IN}
                            <span class="text-green-600">+{tx.quantity} {tx.unit}</span>
                          {:else}
                            <span class="text-red-600">-{tx.quantity} {tx.unit}</span>
                          {/if}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {tx.stockAfter}
                          {tx.unit}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {tx.createdBy}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {tx.notes}
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>

              <div class="flex justify-between items-center mt-4">
                <div class="text-sm text-gray-500">Showing 5 of 28 transactions</div>
                <div class="flex gap-2">
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card.Root>
  </div>
</div>

<script>
	import { onMount } from 'svelte';
	import { Plus, Search, Edit, Trash2, AlertTriangle } from 'lucide-svelte';

	let inventoryItems = $state([]);
	let categories = $state([]);
	let searchTerm = $state('');
	let selectedCategory = $state('All');

	onMount(async () => {
		// Fetch inventory items and categories from API
		await fetchInventoryItems();
		await fetchCategories();
	});

	async function fetchInventoryItems() {
		// This would be an API call in a real application
		inventoryItems = [
			{ id: 1, name: 'Tomatoes', category: 'Produce', quantity: 50, unit: 'kg', reorderPoint: 20 },
			{
				id: 2,
				name: 'Chicken Breast',
				category: 'Meat',
				quantity: 30,
				unit: 'kg',
				reorderPoint: 15
			},
			{ id: 3, name: 'Olive Oil', category: 'Pantry', quantity: 10, unit: 'L', reorderPoint: 5 },
			{ id: 4, name: 'Flour', category: 'Baking', quantity: 100, unit: 'kg', reorderPoint: 25 }
			// Add more sample inventory items...
		];
	}

	async function fetchCategories() {
		// This would be an API call in a real application
		categories = ['All', 'Produce', 'Meat', 'Pantry', 'Baking', 'Dairy'];
	}

	function addInventoryItem() {
		// Navigate to inventory item creation page or open modal
	}

	function editInventoryItem(id) {
		// Navigate to inventory item edit page or open modal
		console.log('Edit inventory item', id);
	}

	function deleteInventoryItem(id) {
		// Show confirmation dialog and delete if confirmed
		if (confirm('Are you sure you want to delete this inventory item?')) {
			console.log('Delete inventory item', id);
			inventoryItems = inventoryItems.filter((item) => item.id !== id);
		}
	}

	let filteredInventoryItems = $derived(inventoryItems.filter(
		(item) =>
			(selectedCategory === 'All' || item.category === selectedCategory) &&
			item.name.toLowerCase().includes(searchTerm.toLowerCase())
	));

	let lowStockItems = $derived(inventoryItems.filter((item) => item.quantity <= item.reorderPoint));
</script>

<div class="px-4 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8">
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
		<h1 class="mb-4 text-3xl font-bold text-gray-900 sm:mb-0">Inventory Management</h1>
		<button
			onclick={addInventoryItem}
			class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			<Plus class="w-5 h-5 mr-2" />
			Add Inventory Item
		</button>
	</div>

	{#if lowStockItems.length > 0}
		<div class="mt-6">
			<div class="p-4 rounded-md bg-yellow-50">
				<div class="flex">
					<div class="flex-shrink-0">
						<AlertTriangle class="w-5 h-5 text-yellow-400" />
					</div>
					<div class="ml-3">
						<h3 class="text-sm font-medium text-yellow-800">Low Stock Alert</h3>
						<div class="mt-2 text-sm text-yellow-700">
							There are {lowStockItems.length} items below the reorder point.
							<a
								href="#low-stock"
								class="font-medium text-yellow-800 underline hover:text-yellow-600"
							>
								View items
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<div class="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
		<div class="relative">
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<Search class="w-5 h-5 text-gray-400" />
			</div>
			<input
				type="text"
				bind:value={searchTerm}
				class="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				placeholder="Search inventory items..."
			/>
		</div>
		<div>
			<select
				bind:value={selectedCategory}
				class="block w-full py-2 pl-3 pr-10 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			>
				{#each categories as category}
					<option value={category}>{category}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="mt-8">
		<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
				<div class="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
					<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-gray-100">
							<tr>
								<th
									scope="col"
									class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
								>
									Name
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
								>
									Category
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
								>
									Quantity
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
								>
									Reorder Point
								</th>
								<th scope="col" class="relative px-6 py-3">
									<span class="sr-only">Actions</span>
								</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							{#each filteredInventoryItems as item (item.id)}
								<tr class={item.quantity <= item.reorderPoint ? 'bg-red-50' : 'hover:bg-gray-50'}>
									<td class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
										{item.name}
									</td>
									<td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
										{item.category}
									</td>
									<td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
										{item.quantity}
										{item.unit}
									</td>
									<td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
										{item.reorderPoint}
										{item.unit}
									</td>
									<td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
										<button
											onclick={() => editInventoryItem(item.id)}
											class="mr-4 text-indigo-600 hover:text-indigo-900 focus:outline-none"
											title="Edit"
										>
											<Edit class="w-5 h-5" />
										</button>
										<button
											onclick={() => deleteInventoryItem(item.id)}
											class="text-red-600 hover:text-red-900 focus:outline-none"
											title="Delete"
										>
											<Trash2 class="w-5 h-5" />
										</button>
									</td>
								</tr>
							{/each}
							{#if filteredInventoryItems.length === 0}
								<tr>
									<td
										colspan="5"
										class="px-6 py-4 text-sm text-center text-gray-500 whitespace-nowrap"
									>
										No inventory items found.
									</td>
								</tr>
							{/if}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

	{#if lowStockItems.length > 0}
		<div id="low-stock" class="mt-12">
			<h2 class="mb-4 text-2xl font-bold text-gray-900">Low Stock Items</h2>
			<div class="overflow-hidden bg-white shadow sm:rounded-md">
				<ul class="divide-y divide-gray-200">
					{#each lowStockItems as item (item.id)}
						<li class="hover:bg-gray-50">
							<div class="flex items-center px-4 py-4 sm:px-6">
								<div class="flex-1 min-w-0">
									<div class="flex items-center">
										<p class="text-sm font-medium text-indigo-600 truncate">{item.name}</p>
										<p class="ml-2 text-sm text-gray-500">in {item.category}</p>
									</div>
									<div class="flex mt-2">
										<p class="text-sm text-gray-500">
											Current: {item.quantity}
											{item.unit}
										</p>
										<p class="ml-4 text-sm text-gray-500">
											Reorder Point: {item.reorderPoint}
											{item.unit}
										</p>
									</div>
								</div>
								<div class="flex-shrink-0 ml-5">
									<button
										onclick={() => editInventoryItem(item.id)}
										class="text-sm font-medium text-indigo-600 hover:text-indigo-900 focus:outline-none"
									>
										Restock
									</button>
								</div>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</div>

<style>
	/* Add any custom styles here */
</style>

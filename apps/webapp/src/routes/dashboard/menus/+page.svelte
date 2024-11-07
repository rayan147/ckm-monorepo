<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import { onMount } from 'svelte';
	import { Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, Check } from 'lucide-svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import { createForm } from 'svelte-forms-lib';
	import { api } from '@ckm/lib-api';
	import type {
		Menu as BaseMenu,
		MenuItem,
		Recipe,
		Restaurant,
		CookBook
	} from '../../../../../server/prisma/generated/zod';
	import EditMenuItemModal from '$lib/components/EditMenuItemModal.svelte';

	interface Menu extends BaseMenu {
		menuItems: (MenuItem & { foodCostPercentage: number; suggestedPrice: number })[] | null;
		expanded: boolean;
	}

	let menus: Menu[] = $state([]);
	let searchTerm = $state('');
	let showMenuModal = $state(false);
	let showMenuItemModal = $state(false);
	let editingMenu: Menu | null = $state(null);
	let editingMenuItem: MenuItem | null = $state(null);
	let selectedMenu: Menu | null = $state({
		id: 0,
		name: '',
		restaurantId: 0,
		createdAt: new Date(),
		updatedAt: new Date(),
		menuItems: null,
		expanded: false
	});
	let recipes: Recipe[] = $state([]);
	let restaurants: Restaurant[] = $state([]);
	let cookBooks: CookBook[] = [];
	let errors: string[] = $state([]);

	const { form: menuForm, handleSubmit: handleMenuSubmit } = createForm({
		initialValues: {
			name: '',
			restaurantId: '',
			createdAt: new Date(),
			updatedAt: new Date()
		} as unknown as Omit<Menu, 'id'>,
		onSubmit: async (values) => {
			try {
				if (editingMenu) {
					await updateMenu(editingMenu.id, values);
				} else {
					await createMenu(values);
				}
				showMenuModal = false;
				editingMenu = null;
				await fetchMenus();
			} catch (error: any) {
				console.error('Failed to save menu:', error);
				errors = [error.message || 'Failed to save menu'];
			}
		}
	});

	onMount(async () => {
		await fetchRestaurants();
		await fetchCookBooks();
		await fetchRecipes();
		await fetchMenus();
	});

	// Fetch Functions
	async function fetchMenus() {
		try {
			const response = await api.menu.getMenus({});
			menus = (response.body as Menu[]).map((menu) => ({
				...menu,
				expanded: false,
				menuItems: null
			}));
		} catch (error) {
			console.error('Error fetching menus:', error);
			errors = ['Failed to fetch menus'];
		}
	}

	async function fetchRecipes() {
		try {
			const response = await api.recipe.getRecipes({});
			recipes = response.body as Recipe[];
		} catch (error) {
			console.error('Error fetching recipes:', error);
			errors = ['Failed to fetch recipes'];
		}
	}

	async function fetchRestaurants() {
		try {
			const response = await api.restaurant.getRestaurants({});
			restaurants = response.body as Restaurant[];
		} catch (error) {
			console.error('Error fetching restaurants:', error);
			errors = ['Failed to fetch restaurants'];
		}
	}

	async function fetchCookBooks() {
		try {
			const response = await api.cookbook.getCookBooks({});
			cookBooks = response.body as CookBook[];
		} catch (error) {
			console.error('Error fetching cookbooks:', error);
			errors = ['Failed to fetch cookbooks'];
		}
	}

	// CRUD Operations for Menus
	async function createMenu(data: Pick<Menu, 'name' | 'restaurantId'>) {
		try {
			await api.menu.createMenu({ body: data });
		} catch (error) {
			console.error('Error creating menu:', error);
			errors = ['Failed to create menu'];
			throw error;
		}
	}

	async function updateMenu(id: number, data: Pick<Menu, 'name' | 'restaurantId'>) {
		try {
			await api.menu.updateMenu({ params: { id }, body: data });
		} catch (error) {
			console.error('Error updating menu:', error);
			errors = ['Failed to update menu'];
			throw error;
		}
	}

	async function deleteMenu(id: number) {
		if (confirm('Are you sure you want to delete this menu?')) {
			try {
				await api.menu.deleteMenu({ params: { id } });
				await fetchMenus();
			} catch (error) {
				console.error('Error deleting menu:', error);
				errors = ['Failed to delete menu'];
			}
		}
	}

	// CRUD Operations for Menu Items
	async function fetchMenuItems(menuId: number) {
		try {
			const menuItemsResponse = await api.menuItem.getMenuItems({ query: { menuId } });
			const menuItems = menuItemsResponse.body as MenuItem[];
			const detailedMenuItems = await Promise.all(
				menuItems.map(async (item) => {
					try {
						const [foodCostRes, priceRes] = await Promise.all([
							api.menuItem.calculateMenuItemFoodCostPercentage({ params: { menuItemId: item.id } }),
							api.menuItem.calculateMenuItemPrice({ params: { menuItemId: item.id } })
						]);
						return {
							...item,
							foodCostPercentage: Number(foodCostRes.body || 0),
							suggestedPrice: Number(priceRes.body || 0)
						};
					} catch (error) {
						console.error(`Error fetching data for menu item ${item.id}:`, error);
						return {
							...item,
							foodCostPercentage: 0,
							suggestedPrice: 0
						};
					}
				})
			);

			const menu = menus.find((m) => m.id === menuId);
			if (menu) {
				menu.menuItems = detailedMenuItems;
				menus = [...menus];
			}
		} catch (error) {
			console.error('Error fetching menu items:', error);
			errors = ['Failed to fetch menu items'];
		}
	}

	async function createMenuItem(data: Omit<MenuItem, 'createdAt' | 'updatedAt'>) {
		try {
			await api.menuItem.createMenuItem({ body: data });
		} catch (error) {
			console.error('Error creating menu item:', error);
			errors = ['Failed to create menu item'];
			throw error;
		}
	}

	async function updateMenuItem(id: number, data: Omit<MenuItem, 'createdAt' | 'updatedAt'>) {
		try {
			await api.menuItem.updateMenuItem({ params: { id }, body: data });
		} catch (error) {
			console.error('Error updating menu item:', error);
			errors = ['Failed to update menu item'];
			throw error;
		}
	}

	async function deleteMenuItem(menuId: number, itemId: number) {
		if (confirm('Are you sure you want to delete this menu item?')) {
			try {
				await api.menuItem.deleteMenuItem({ params: { id: itemId } });
				await fetchMenuItems(menuId);
			} catch (error) {
				console.error('Error deleting menu item:', error);
				errors = ['Failed to delete menu item'];
			}
		}
	}

	// Modal Operations
	function openMenuModal(menu: Menu | null = null) {
		editingMenu = menu;
		if (menu) {
			menuForm.set({
				name: menu.name,
				restaurantId: menu.restaurantId,
				createdAt: menu.createdAt,
				updatedAt: menu.updatedAt,
				menuItems: menu.menuItems,
				expanded: menu.expanded
			});
		} else {
			menuForm.set({
				name: '',
				restaurantId: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
				menuItems: null,
				expanded: false
			});
		}
		showMenuModal = true;
	}

	function openMenuItemModal(menu: Menu, item: MenuItem | null = null) {
		selectedMenu = menu;
		editingMenuItem = item;
		showMenuItemModal = true;
	}

	async function toggleMenuItems(menu: Menu) {
		console.log(`Toggling menu ID: ${menu.id}`);
		if (!menu.menuItems) {
			await fetchMenuItems(menu.id);
		}
		menus = menus.map((m) => {
			if (m.id === menu.id) {
				console.log(`Menu ID ${m.id} expanded: ${!m.expanded}`);
				return { ...m, expanded: !m.expanded };
			}
			return m;
		});
	}

	// Handle Menu Item Submit from Modal
	async function handleMenuItemSubmit(event: CustomEvent) {
		const formData = event.detail;
		try {
			if (editingMenuItem && selectedMenu) {
				await updateMenuItem(editingMenuItem.id, {
					...formData,
					menuId: selectedMenu.id
				});
			} else if (selectedMenu) {
				await createMenuItem({
					...formData,
					menuId: selectedMenu.id
				});
			}
			showMenuItemModal = false;
			editingMenuItem = null;
			if (selectedMenu) {
				await fetchMenuItems(selectedMenu.id);
			}
		} catch (error) {
			// Errors are handled in CRUD functions
		}
	}

	// Go Back Function
	function goBack() {
		// Implement navigation logic if needed
		// For example, navigate to a different page or reset states
	}

	// Reactive Variable for Filtered Menus
	let filteredMenus = $derived(menus.filter((menu) =>
		menu.name.toLowerCase().includes(searchTerm.toLowerCase())
	));
</script>

<!-- Main Container -->
<!-- Main Container -->
<div class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
	<!-- Header Section -->
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
		<h1 class="text-3xl font-extrabold text-gray-900">Menu Management</h1>
		<button
			onclick={() => openMenuModal()}
			class="inline-flex items-center px-5 py-3 mt-4 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:mt-0"
		>
			<Plus class="w-5 h-5 mr-2" />
			Add Menu
		</button>
	</div>

	<!-- Search Bar -->
	<div class="mt-6">
		<div class="relative">
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<Search class="w-5 h-5 text-gray-400" />
			</div>
			<input
				type="text"
				bind:value={searchTerm}
				class="block w-full py-3 pl-10 pr-4 leading-5 text-gray-700 placeholder-gray-400 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				placeholder="Search menus by name..."
			/>
		</div>
	</div>

	<!-- Menu List -->
	<div class="grid items-start gap-8 mt-8 lg:grid-cols-2 xl:grid-cols-3">
		{#each filteredMenus as menu (menu.id)}
			<div
				class="flex flex-col transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
			>
				<!-- Menu Header -->
				<div class="flex items-center justify-between px-6 py-5">
					<!-- Toggle Button and Menu Name -->
					<div class="flex items-center">
						<button
							onclick={() => toggleMenuItems(menu)}
							class="text-gray-400 hover:text-gray-500 focus:outline-none"
						>
							{#if menu.expanded}
								<ChevronUp class="w-6 h-6" />
							{:else}
								<ChevronDown class="w-6 h-6" />
							{/if}
						</button>
						<h2 class="ml-4 text-xl font-semibold text-indigo-600 truncate">{menu.name}</h2>
					</div>
					<!-- Edit and Delete Buttons -->
					<div class="flex space-x-3">
						<button
							onclick={() => openMenuModal(menu)}
							class="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						>
							<Edit class="w-4 h-4 mr-2" />
							Edit
						</button>
						<button
							onclick={() => deleteMenu(menu.id)}
							class="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
						>
							<Trash2 class="w-4 h-4 mr-2" />
							Delete
						</button>
					</div>
				</div>
				<p class="px-6 pb-5 text-sm text-gray-500">Restaurant: {menu.name}</p>

				{#if menu.expanded}
					<div class="px-6 pb-6 bg-gray-50" transition:slide={{ duration: 300 }}>
						<!-- Expanded Content -->
						<div class="flex items-center justify-between mb-4">
							<h3 class="text-lg font-medium text-gray-900">Menu Items</h3>
							<button
								onclick={() => openMenuItemModal(menu)}
								class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							>
								<Plus class="w-4 h-4 mr-2" />
								Add Item
							</button>
						</div>

						{#if menu.menuItems && menu.menuItems.length > 0}
							<ul class="space-y-4">
								{#each menu.menuItems as item (item.id)}
									<li
										class="flex flex-col p-4 bg-white rounded-lg shadow-sm sm:flex-row sm:items-center sm:justify-between"
									>
										<!-- Menu Item Details -->
										<div class="flex-1">
											<h4 class="font-semibold text-gray-800 text-md">{item.name}</h4>
											<p class="mt-1 text-sm text-gray-600">
												Price: <span class="text-indigo-600">${item.price.toFixed(2)}</span> | Food
												Cost: <span class="text-red-600">${item.foodCost.toFixed(2)}</span>
											</p>
											<p class="mt-1 text-sm text-gray-600">
												{item.description || 'No description provided.'}
											</p>
										</div>
										<!-- Action Buttons -->
										<div class="flex mt-4 space-x-3 sm:mt-0">
											<button
												onclick={() => openMenuItemModal(menu, item)}
												class="inline-flex items-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
											>
												<Edit class="w-4 h-4 mr-1" />
												Edit
											</button>
											<button
												onclick={() => deleteMenuItem(menu.id, item.id)}
												class="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
											>
												<Trash2 class="w-4 h-4 mr-1" />
												Delete
											</button>
										</div>
									</li>
								{/each}
							</ul>
						{:else}
							<p class="mt-4 text-sm text-gray-500">No menu items found.</p>
						{/if}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<!-- Edit Menu Item Modal -->
<EditMenuItemModal
	bind:showModal={showMenuItemModal}
	bind:editingMenuItem
	bind:recipes
	bind:selectedMenu
	on:submit={handleMenuItemSubmit}
	on:close={() => {
		showMenuItemModal = false;
		editingMenuItem = null;
	}}
/>

<!-- Add/Edit Menu Modal -->
{#if showMenuModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
		role="dialog"
		aria-modal="true"
		transition:fade={{ duration: 200 }}
	>
		<div
			class="w-full max-w-lg p-8 bg-white rounded-lg shadow-xl sm:mx-auto"
			transition:fly={{ y: 20, duration: 300 }}
		>
			<!-- Modal Header -->
			<div class="flex items-center justify-between mb-6">
				<h3 class="text-xl font-semibold text-gray-900">
					{editingMenu ? 'Edit Menu' : 'Add New Menu'}
				</h3>
				<button
					onclick={() => {
						showMenuModal = false;
						editingMenu = null;
					}}
					class="p-2 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
					<Trash2 class="w-6 h-6" aria-hidden="true" />
				</button>
			</div>

			<!-- Display Errors -->
			{#if errors.length > 0}
				<div class="mb-6">
					{#each errors as error}
						<p class="text-sm text-red-600">{error}</p>
					{/each}
				</div>
			{/if}

			<!-- Form -->
			<form onsubmit={preventDefault(handleMenuSubmit)} class="space-y-6">
				<!-- Menu Name -->
				<div>
					<label for="name" class="block text-sm font-medium text-gray-700">Menu Name</label>
					<input
						type="text"
						id="name"
						bind:value={$menuForm.name}
						required
						class="block w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
						placeholder="Enter menu name"
					/>
				</div>

				<!-- Restaurant Selection -->
				<div>
					<label for="restaurantId" class="block text-sm font-medium text-gray-700"
						>Restaurant</label
					>
					<select
						id="restaurantId"
						bind:value={$menuForm.restaurantId}
						required
						class="block w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
					>
						<option value="">Select a restaurant</option>
						{#each restaurants as restaurant}
							<option value={restaurant.id}>{restaurant.name}</option>
						{/each}
					</select>
				</div>

				<!-- Action Buttons -->
				<div class="flex justify-end space-x-4">
					<button
						type="button"
						onclick={() => {
							showMenuModal = false;
							editingMenu = null;
						}}
						class="px-5 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
					>
						Cancel
					</button>
					<button
						type="submit"
						class="inline-flex items-center px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
					>
						{editingMenu ? 'Update Menu' : 'Create Menu'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Global Styles -->
<style>
	:global(body) {
		background-color: #f9fafb; /* Light gray background */
	}

	/* Customize scrollbar for better aesthetics */
	::-webkit-scrollbar {
		width: 8px;
	}

	::-webkit-scrollbar-track {
		background: #f1f5f9; /* Tailwind's gray-100 */
	}

	::-webkit-scrollbar-thumb {
		background-color: #cbd5e1; /* Tailwind's gray-300 */
		border-radius: 9999px;
		border: 2px solid #f1f5f9;
	}
</style>

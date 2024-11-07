<script lang="ts">
	import { run, preventDefault } from 'svelte/legacy';

	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { X } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';
	import { api } from '@ckm/lib-api';
	import type { MenuItem, Recipe } from '../../../../server/prisma/generated/zod';

	interface Props {
		showMenuItemModal: boolean;
		editingMenuItem?: MenuItem | null;
		recipes?: Recipe[];
		menuId?: string;
		errors?: string[];
	}

	let {
		showMenuItemModal = $bindable(),
		editingMenuItem = $bindable(null),
		recipes = [],
		menuId = '',
		errors = $bindable([])
	}: Props = $props();

	const dispatch = createEventDispatcher();

	// Initialize form data
	let menuItemForm = $state({
		name: '',
		description: '',
		price: '',
		foodCost: 0,
		recipes: [] as Array<{ id: string; portion: number }>
	});

	// Watch for changes in editingMenuItem or showMenuItemModal to populate form
	run(() => {
		if (editingMenuItem) {
			menuItemForm = {
				name: editingMenuItem.name,
				description: editingMenuItem.description ?? '',
				price: editingMenuItem.price.toString(),
				foodCost: editingMenuItem.foodCost,
				recipes: editingMenuItem.recipeIds.map((id, index) => ({
					id,
					portion: editingMenuItem.recipeServingsAmount[index]
				}))
			};
		} else if (showMenuItemModal) {
			menuItemForm = {
				name: '',
				description: '',
				price: '',
				foodCost: 0,
				recipes: []
			};
		}
	});

	async function calculateFoodCost() {
		try {
			const foodCosts = await Promise.all(
				menuItemForm.recipes.map(async (recipeItem) => {
					const recipe = recipes.find((r) => r.id === recipeItem.id);
					if (!recipe) return 0;

					const recipeFoodCost = await api.recipe.getFoodCost({
						pathParams: { id: recipeItem.id }
					});
					return (recipeItem.portion / recipe.servings) * recipeFoodCost;
				})
			);

			menuItemForm.foodCost = foodCosts.reduce((acc, cost) => acc + cost, 0);
		} catch (error) {
			console.error('Failed to calculate food cost:', error);
			errors = [...errors, 'Failed to calculate food cost. Please try again.'];
		}
	}

	function addRecipe() {
		menuItemForm.recipes = [...menuItemForm.recipes, { id: '', portion: 1 }];
	}

	function removeRecipe(index: number) {
		menuItemForm.recipes = menuItemForm.recipes.filter((_, i) => i !== index);
		calculateFoodCost();
	}

	// Handle form submission
	async function handleMenuItemSubmit() {
		// Clear previous errors
		errors = [];

		// Basic validation
		if (!menuItemForm.name.trim()) {
			errors = [...errors, 'Name is required.'];
			return;
		}
		if (!menuItemForm.price || parseFloat(menuItemForm.price) < 0) {
			errors = [...errors, 'Price must be a positive number.'];
			return;
		}
		if (menuItemForm.recipes.length === 0) {
			errors = [...errors, 'Please select at least one recipe.'];
			return;
		}

		try {
			const menuItemData = {
				name: menuItemForm.name,
				description: menuItemForm.description,
				price: parseFloat(menuItemForm.price),
				foodCost: menuItemForm.foodCost,
				recipeIds: menuItemForm.recipes.map((r) => r.id),
				recipeServingsAmount: menuItemForm.recipes.map((r) => r.portion),
				menuId: menuId
			};

			if (editingMenuItem) {
				// Update existing menu item
				await api.menuItem.updateMenuItem({
					pathParams: { id: editingMenuItem.id },
					body: menuItemData
				});
				console.log('Menu item updated successfully.');
			} else {
				// Create new menu item
				await api.menuItem.createMenuItem({
					body: menuItemData
				});
				console.log('Menu item created successfully.');
			}

			// Close modal and refresh menu items list
			dispatch('refresh');
			closeModal();
		} catch (error: any) {
			console.error('Failed to save menu item:', error);
			errors = [error.message || 'Failed to save menu item.'];
		}
	}

	// Handle menu item deletion
	async function handleMenuItemDelete() {
		if (!editingMenuItem) return;

		if (!confirm('Are you sure you want to delete this menu item?')) return;

		try {
			await api.menuItem.deleteMenuItem({
				pathParams: { id: editingMenuItem.id }
			});
			console.log('Menu item deleted successfully.');
			dispatch('refresh');
			closeModal();
		} catch (error: any) {
			console.error('Failed to delete menu item:', error);
			errors = [error.message || 'Failed to delete menu item.'];
		}
	}

	// Close modal function
	function closeModal() {
		showMenuItemModal = false;
		editingMenuItem = null;
		errors = []; // Clear errors when closing
		dispatch('close');
	}
</script>

{#if showMenuItemModal}
	<!-- Overlay -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
		transition:fade={{ duration: 200 }}
	>
		<!-- Modal Box -->
		<div
			class="w-full max-w-md mx-4 bg-white rounded-lg shadow-xl sm:mx-auto"
			transition:fly={{ y: 20, duration: 300 }}
		>
			<!-- Modal Header -->
			<div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
				<h3 class="text-xl font-semibold text-gray-900" id="modal-title">
					{#if editingMenuItem}
						Edit Menu Item
					{:else}
						Add New Menu Item
					{/if}
				</h3>
				<button
					onclick={closeModal}
					class="p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
					<span class="sr-only">Close</span>
					<X class="w-6 h-6" aria-hidden="true" />
				</button>
			</div>

			<!-- Modal Form -->
			<form onsubmit={preventDefault(handleMenuItemSubmit)} class="px-6 py-4 space-y-4">
				<!-- Display Errors -->
				{#if errors.length > 0}
					<div class="mb-4">
						{#each errors as error}
							<p class="text-sm text-red-600">{error}</p>
						{/each}
					</div>
				{/if}

				<!-- Name Field -->
				<div>
					<label for="name" class="block mb-1 text-sm font-medium text-gray-700">Name</label>
					<input
						type="text"
						id="name"
						bind:value={menuItemForm.name}
						class="block w-full h-12 px-4 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						required
						placeholder="Enter menu item name"
					/>
				</div>

				<!-- Description Field -->
				<div>
					<label for="description" class="block mb-1 text-sm font-medium text-gray-700"
						>Description</label
					>
					<textarea
						id="description"
						bind:value={menuItemForm.description}
						rows="3"
						class="block w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						placeholder="Enter description"
					></textarea>
				</div>

				<!-- Price Field -->
				<div>
					<label for="price" class="block mb-1 text-sm font-medium text-gray-700">Price</label>
					<div class="relative mt-1 rounded-md shadow-sm">
						<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<span class="text-gray-500 sm:text-sm">$</span>
						</div>
						<input
							type="number"
							id="price"
							bind:value={menuItemForm.price}
							step="0.01"
							min="0"
							class="block w-full h-12 pr-12 border border-gray-300 rounded-md pl-7 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							required
							placeholder="0.00"
						/>
					</div>
				</div>

				<!-- Recipes Selection Field -->
				<div>
					<label class="block mb-1 text-sm font-medium text-gray-700">Recipes</label>
					{#each menuItemForm.recipes as recipe, index}
						<div class="flex items-center mt-2 space-x-2">
							<select
								bind:value={recipe.id}
								onchange={calculateFoodCost}
								class="block w-full py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								required
							>
								<option value="">Select a recipe...</option>
								{#each recipes as r}
									<option value={r.id}>{r.name}</option>
								{/each}
							</select>
							<input
								type="number"
								bind:value={recipe.portion}
								oninput={calculateFoodCost}
								min="0.1"
								step="0.1"
								class="block w-24 h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								placeholder="Portion"
							/>
							<button
								type="button"
								onclick={() => removeRecipe(index)}
								class="p-2 text-red-600 hover:text-red-800"
							>
								<X class="w-5 h-5" />
							</button>
						</div>
					{/each}
					<button
						type="button"
						onclick={addRecipe}
						class="inline-flex items-center px-3 py-2 mt-2 text-sm font-medium leading-4 text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Add Recipe
					</button>
				</div>

				<!-- Food Cost Field (Read-only) -->
				<div>
					<label for="food-cost" class="block mb-1 text-sm font-medium text-gray-700"
						>Food Cost</label
					>
					<input
						id="food-cost"
						type="text"
						value={`$${menuItemForm.foodCost.toFixed(2)}`}
						readonly
						class="block w-full h-12 px-4 mt-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>

				<!-- Action Buttons -->
				<div class="flex justify-end space-x-3">
					<button
						type="button"
						onclick={closeModal}
						class="inline-flex justify-center h-10 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Cancel
					</button>
					<button
						type="submit"
						class="inline-flex justify-center h-10 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						{#if editingMenuItem}
							Update
						{:else}
							Create
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

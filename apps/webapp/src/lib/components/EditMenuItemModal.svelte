<script lang="ts">
	import { run, preventDefault } from 'svelte/legacy';

	import { createEventDispatcher, onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { createForm } from 'svelte-forms-lib';
	import { X, DollarSign, Percent, ArrowLeft, ArrowRight } from 'lucide-svelte';
	import type { MenuItem, Recipe } from '../../../../server/prisma/generated/zod';
	import { api } from '@ckm/lib-api';

	
	interface Props {
		// Props
		showModal: boolean;
		editingMenuItem: MenuItem | null;
		recipes?: Recipe[];
		selectedMenu: { id: number } | null;
	}

	let {
		showModal = $bindable(),
		editingMenuItem,
		recipes = [],
		selectedMenu
	}: Props = $props();

	const dispatch = createEventDispatcher();

	// Reactive variables
	let foodCostValue = $state(0);
	let priceValue = $state(0);

	async function calculateMenuItemPrice(menuItemId: number) {
		const res = await api.menuItem.calculateMenuItemPrice({ params: { menuItemId } });
		console.log(res);
		priceValue = res.body as number;
	}

	run(() => {
		console.log(editingMenuItem?.id);
	});

	const initialValues = {
		name: '',
		description: '',
		price: 0,
		foodCost: 0,
		menuId: selectedMenu?.id || 0,
		recipeIds: [] as number[], // Multiple recipe IDs
		quantity: 1,
		allergens: [],
		nutritionalInfo: {
			calories: 0,
			protein: 0,
			carbs: 0,
			fat: 0
		}
	};

	// Step management
	let currentStep = $state(1);
	const totalSteps = 4;

	// Form initialization
	const { form, handleSubmit } = createForm({
		initialValues: initialValues,
		onSubmit: async (values) => {
			// Prepare data for submission
			const submissionData = {
				...values,
				recipeIds: values.recipeIds.length ? values.recipeIds : [],
				nutritionalInfo: values.nutritionalInfo
			};

			// Dispatch the submit event with form data
			dispatch('submit', submissionData);

			// Close the modal
			closeModal();
		}
	});

	run(() => {
		if (editingMenuItem) {
			form.set({
				name: editingMenuItem.name || '',
				description: editingMenuItem.description || '',
				price: editingMenuItem.price || 0,
				foodCost: editingMenuItem.foodCost || 0,
				menuId: editingMenuItem.menuId || selectedMenu?.id || 0,
				recipeIds: editingMenuItem.menuItemRecipes?.map((r) => r.recipeId) || [],
				quantity: editingMenuItem.quantity || 1,
				allergens: editingMenuItem.allergens || [],
				nutritionalInfo: editingMenuItem.nutritionalInfo || {
					calories: 0,
					protein: 0,
					carbs: 0,
					fat: 0
				}
			});
		}
	});

	// Functions to handle modal visibility
	function closeModal() {
		showModal = false;
		dispatch('close');
		currentStep = 1; // Reset to first step
		form.set({
			name: '',
			description: '',
			price: 0,
			foodCost: 0,
			menuId: selectedMenu?.id || 0,
			recipeIds: [],
			quantity: 1,
			allergens: [],
			nutritionalInfo: {
				calories: 0,
				protein: 0,
				carbs: 0,
				fat: 0
			}
		});
	}

	// Navigation between steps
	function nextStep() {
		if (currentStep < totalSteps) currentStep++;
	}

	function prevStep() {
		if (currentStep > 1) currentStep--;
	}

	// Reactive calculations
	let foodCostPercentage =
		$derived($form.price > 0 && $form.foodCost > 0
			? (($form.foodCost / $form.price) * 100).toFixed(2)
			: '0.00');

	let suggestedPrice =
		$derived($form.foodCost > 0
			? ($form.foodCost / 0.28).toFixed(2) // Assuming target food cost percentage of 28%
			: '0.00');

	run(() => {
		foodCostValue = $form.foodCost === 0 ? 2 : $form.foodCost;
	});
	run(() => {
		priceValue = $form.price === 0 ? 2 : $form.price;
	});

	let breakEvenPrice =
		$derived($form.foodCost > 0
			? ($form.foodCost * 1.5).toFixed(2) // Assuming break-even multiplier of 1.5
			: '0.00');

	// Searchable Multi-Select State
	let searchQuery = $state('');
	let filteredRecipes = $state(recipes);
	let selectedRecipeIds = $state($form.recipeIds);

	// Update filtered recipes based on search query
	run(() => {
		filteredRecipes = recipes.filter((recipe) =>
			recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
	});

	// Handle recipe selection
	function toggleRecipeSelection(recipeId: number) {
		if (selectedRecipeIds.includes(recipeId)) {
			selectedRecipeIds = selectedRecipeIds.filter((id) => id !== recipeId);
		} else {
			selectedRecipeIds = [...selectedRecipeIds, recipeId];
		}
		form.set({ ...$form, recipeIds: selectedRecipeIds });
	}

	// Close modal on Escape key press
	onMount(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				closeModal();
			}
		}
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	});
</script>

{#if showModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
		transition:fade={{ duration: 200 }}
	>
		<div
			class="relative w-full max-w-2xl p-6 mx-4 bg-white rounded-lg shadow-xl sm:mx-auto"
			transition:fly={{ y: 20, duration: 300 }}
		>
			<!-- Modal Header -->
			<div class="flex items-center justify-between mb-4">
				<h3 class="text-xl font-semibold text-gray-900" id="modal-title">
					{editingMenuItem ? 'Edit Menu Item' : 'Add New Menu Item'}
				</h3>
				<button
					onclick={closeModal}
					class="p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
					<span class="sr-only">Close</span>
					<X class="w-6 h-6" aria-hidden="true" />
				</button>
			</div>

			<!-- Stepper Progress Indicator -->
			<div class="mb-6">
				<div class="flex items-center justify-between text-sm font-medium text-gray-700">
					<span>Step {currentStep} of {totalSteps}</span>
					<span>{['Basic Info', 'Pricing', 'Additional Details'][currentStep - 1]}</span>
				</div>
				<div class="w-full bg-gray-200 rounded-full h-2.5 mt-2">
					<div
						class="bg-indigo-600 h-2.5 rounded-full"
						style="width: {(currentStep / totalSteps) * 100}%; transition: width 0.3s ease-in-out;"
					></div>
				</div>
			</div>

			<!-- Modal Body (Multi-Step Form) -->
			<form onsubmit={preventDefault(handleSubmit)} class="space-y-6">
				{#if currentStep === 1}
					<!-- Step 1: Basic Info -->
					<div>
						<div>
							<label for="name" class="block text-sm font-medium text-gray-700"
								>Name <span class="text-red-500">*</span></label
							>
							<input
								type="text"
								id="name"
								bind:value={$form.name}
								class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								required
								placeholder="Enter menu item name"
							/>
						</div>
						<div class="mt-4">
							<label for="description" class="block text-sm font-medium text-gray-700"
								>Description</label
							>
							<textarea
								id="description"
								bind:value={$form.description}
								rows="3"
								class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								placeholder="Enter description"
							></textarea>
						</div>
						<div class="mt-4">
							<label for="recipe-search" class="block text-sm font-medium text-gray-700"
								>Select Recipes <span class="text-red-500">*</span></label
							>
							<div class="mt-2">
								<!-- Search Input -->
								<input
									type="text"
									bind:value={searchQuery}
									class="block w-full px-3 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									placeholder="Search recipes..."
								/>
								<!-- Recipes List -->
								<div class="overflow-y-auto border border-gray-300 rounded-md max-h-60">
									{#each filteredRecipes as recipe (recipe.id)}
										<label class="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100">
											<input
												type="checkbox"
												value={recipe.id}
												checked={selectedRecipeIds.includes(recipe.id)}
												onchange={() => toggleRecipeSelection(recipe.id)}
												class="w-4 h-4 text-indigo-600 border-gray-300 rounded form-checkbox"
											/>
											<span class="ml-2 text-sm text-gray-700">{recipe.name}</span>
										</label>
									{/each}
									{#if filteredRecipes.length === 0}
										<div class="px-3 py-2 text-sm text-gray-500">No recipes found.</div>
									{/if}
								</div>
							</div>
						</div>
					</div>
				{:else if currentStep === 2}
					<!-- Step 2: Pre-populate price and food fields and collect recipes serving -->
					<div>
						<div class="grid grid-cols-2 gap-6">
							<div>
								<label for="price" class="block text-sm font-medium text-gray-700"
									>Price ($) <span class="text-red-500">*</span></label
								>
								<div class="relative mt-1 rounded-md shadow-sm">
									<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<DollarSign class="w-5 h-5 text-gray-400" aria-hidden="true" />
									</div>
									<input
										type="number"
										id="price"
										bind:value={priceValue}
										step="0.01"
										min="0"
										class="block w-full pl-10 pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
										required
										placeholder="0.00"
									/>
								</div>
							</div>
							<div>
								<label for="foodCost" class="block text-sm font-medium text-gray-700"
									>Food Cost ($) <span class="text-red-500">*</span></label
								>
								<div class="relative mt-1 rounded-md shadow-sm">
									<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<DollarSign class="w-5 h-5 text-gray-400" aria-hidden="true" />
									</div>
									<input
										bind:value={foodCostValue}
										id="foodCost"
										step="0.01"
										min="0"
										class="block w-full pl-10 pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
										required
									/>
								</div>
							</div>
						</div>
					</div>
				{:else if currentStep === 3}
					<!-- Step 3: Pricing -->
					<div>
						<div class="grid grid-cols-2 gap-6">
							<div>
								<label for="price" class="block text-sm font-medium text-gray-700"
									>Price ($) <span class="text-red-500">*</span></label
								>
								<div class="relative mt-1 rounded-md shadow-sm">
									<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<DollarSign class="w-5 h-5 text-gray-400" aria-hidden="true" />
									</div>
									<input
										type="number"
										id="price"
										bind:value={$form.price}
										step="0.01"
										min="0"
										class="block w-full pl-10 pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
										required
										placeholder="0.00"
									/>
								</div>
							</div>
							<div>
								<label for="foodCost" class="block text-sm font-medium text-gray-700"
									>Food Cost ($) <span class="text-red-500">*</span></label
								>
								<div class="relative mt-1 rounded-md shadow-sm">
									<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<DollarSign class="w-5 h-5 text-gray-400" aria-hidden="true" />
									</div>
									<input
										type="number"
										id="foodCost"
										bind:value={$form.foodCost}
										step="0.01"
										min="0"
										class="block w-full pl-10 pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
										required
										placeholder="0.00"
									/>
								</div>
							</div>
						</div>
						<div class="p-4 mt-4 rounded-md bg-gray-50">
							<h4 class="mb-2 text-sm font-medium text-gray-700">Pricing Information</h4>
							<div class="flex items-center text-sm text-gray-600">
								<Percent class="w-5 h-5 mr-2 text-gray-400" />
								<span>Food Cost Percentage: {foodCostPercentage}%</span>
							</div>
							<div class="flex items-center mt-1 text-sm text-gray-600">
								<DollarSign class="w-5 h-5 mr-2 text-gray-400" />
								<span>Suggested Price: ${suggestedPrice}</span>
							</div>
							<div class="flex items-center mt-1 text-sm text-gray-600">
								<DollarSign class="w-5 h-5 mr-2 text-gray-400" />
								<span>Break-even Price: ${breakEvenPrice}</span>
							</div>
						</div>
						<div class="mt-4">
							<label for="quantity" class="block text-sm font-medium text-gray-700"
								>Quantity <span class="text-red-500">*</span></label
							>
							<input
								type="number"
								id="quantity"
								bind:value={$form.quantity}
								min="1"
								class="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								required
								placeholder="1"
							/>
						</div>
					</div>
				{:else if currentStep === 4}
					<!-- Step 3: Additional Details -->
					<div transition:fade>
						<div class="mb-4">
							<label for="allergens" class="block text-sm font-medium text-gray-700"
								>Allergens</label
							>
							<input
								type="text"
								id="allergens"
								bind:value={$form.allergens}
								class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								placeholder="e.g., Nuts, Dairy"
							/>
						</div>
						<div>
							<h4 class="block mb-2 text-sm font-medium text-gray-700">Nutritional Information</h4>
							<div class="grid grid-cols-2 gap-6">
								<div>
									<label for="calories" class="block text-sm font-medium text-gray-700"
										>Calories</label
									>
									<input
										type="number"
										id="calories"
										bind:value={$form.nutritionalInfo.calories}
										class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
										placeholder="0"
									/>
								</div>
								<div>
									<label for="protein" class="block text-sm font-medium text-gray-700"
										>Protein (g)</label
									>
									<input
										type="number"
										id="protein"
										bind:value={$form.nutritionalInfo.protein}
										class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
										placeholder="0"
									/>
								</div>
								<div>
									<label for="carbs" class="block text-sm font-medium text-gray-700"
										>Carbs (g)</label
									>
									<input
										type="number"
										id="carbs"
										bind:value={$form.nutritionalInfo.carbs}
										class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
										placeholder="0"
									/>
								</div>
								<div>
									<label for="fat" class="block text-sm font-medium text-gray-700">Fat (g)</label>
									<input
										type="number"
										id="fat"
										bind:value={$form.nutritionalInfo.fat}
										class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
										placeholder="0"
									/>
								</div>
							</div>
						</div>
					</div>
				{/if}

				<!-- Navigation Buttons -->
				<div class="flex justify-between mt-6">
					{#if currentStep > 1}
						<button
							type="button"
							onclick={prevStep}
							class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							<ArrowLeft class="w-5 h-5 mr-2" />
							Previous
						</button>
					{:else}
						<div></div>
					{/if}

					{#if currentStep < totalSteps}
						<button
							type="button"
							onclick={nextStep}
							class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Next
							<ArrowRight class="w-5 h-5 ml-2" />
						</button>
					{:else}
						<button
							type="submit"
							class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
						>
							{editingMenuItem ? 'Update Menu Item' : 'Create Menu Item'}
						</button>
					{/if}
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	/* Optional: Add any custom styles if needed */
</style>


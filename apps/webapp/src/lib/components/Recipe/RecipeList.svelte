<script lang="ts">
	import { run, createBubbler, stopPropagation } from 'svelte/legacy';

	const bubble = createBubbler();
	import { onMount } from 'svelte';
	import { api } from '@ckm/lib-api';
	import type { Recipe as BaseRecipe, Restaurant, CookBook, Ingredient } from '@ckm/zod-schemas';
	import RecipeDetailsView from '$lib/components/Recipe/RecipeDetailsView.svelte';
	import RecipeForm from './RecipeForm.svelte';
	import RecipeHeader from './RecipeHeader.svelte';
	import RecipeTable from './RecipeTable.svelte';
	import Pagination from './Pagination.svelte';
	import { recipeStore } from '$lib/stores/recipeStore';
	import convertUnitsHelper, { isWeightUnit } from '$lib/utils/unitConvertionVolumeToWeight';
	import { type Conversion, conversions } from '$lib/utils/ingredientsConversion';
	import type { RecipeFormData, Recipe } from '@ckm/types';

	let recipes: Recipe[] = $state([]);
	let searchTerm: string = $state('');
	let currentView: 'list' | 'create' | 'edit' | 'view' = $state('list');
	let currentRecipe: RecipeFormData | null = $state(null);
	let errors: string[] | null = $state([]);
	let loading: boolean = false;

	// New variables for additional data
	let restaurants: Restaurant[] = $state([]);
	let cookBooks: CookBook[] = $state([]);
	let ingredientsList: Ingredient[] = $state([]);

	// Step management
	let currentStep: number = $state(1);
	const totalSteps = 4;

	// Pagination state variables
	let totalCount = $state(0);
	let currentPage = $state(1);
	let itemsPerPage = $state(10);
	// State variables
	let isStandardizing = $state(false);
	let standardizingIngredientIndex: number | null = $state(null);
	let standardizingToUnit = $state('');
	let customConversions: Conversion[] = [];
	// List of all units
	const allUnits = [
		...new Set([
			...conversions.map((conv) => conv.fromUnit),
			...conversions.map((conv) => conv.toUnit)
		])
	].sort();

	function startStandardization(index: number) {
		standardizingIngredientIndex = index;
		standardizingToUnit = '';
		isStandardizing = true;
	}

	function closeStandardizationModal() {
		isStandardizing = false;
		standardizingIngredientIndex = null;
		standardizingToUnit = '';
	}

	function applyStandardization() {
		if (standardizingIngredientIndex === null || !currentRecipe) return;
		const ingredient = currentRecipe.ingredients[standardizingIngredientIndex];

		try {
			const convertedQuantity = convertUnitsHelper(
				ingredient.quantity,
				ingredient.unit,
				standardizingToUnit,
				undefined,
				customConversions
			);

			currentRecipe.ingredients[standardizingIngredientIndex] = {
				...ingredient,
				quantity: convertedQuantity,
				unit: standardizingToUnit
			};

			closeStandardizationModal();
		} catch (error) {
			console.error(
				`Failed to convert ${ingredient.quantity} ${ingredient.unit} of ingredient ID ${ingredient.ingredientId}`,
				error
			);
			alert('Conversion failed. Please check the units and try again.');
		}
	}

	// New state variables for unit conversion
	let isConvertingUnits = $state(false);
	let currentIngredientIndex: number | null = $state(null);
	let newUnit = $state('');
	let convertedQuantity: number | null = $state(null);

	// New state variables for scaling
	let isScaling = $state(false);
	let scaleFactor: number = $state(1);

	onMount(() => {
		const fetchData = async () => {
			await fetchRestaurants();
			await fetchCookBooks();
			await fetchIngredients();
			fetchRecipes();
		};

		fetchData();

		// Subscribe to the store and update local variables based on the store's state
		const unsubscribe = recipeStore.subscribe((state) => {
			recipes = state.recipes;
			loading = state.loading;
			errors = [state.error];
			totalCount = state.totalCount;
			currentPage = state.currentPage;
			itemsPerPage = state.itemsPerPage;
		});

		// Return the unsubscribe function to clean up the subscription when the component is destroyed
		return () => {
			unsubscribe();
		};
	});

	function handlePageChange(event: CustomEvent<number>) {
		recipeStore.setPage(event.detail);
		fetchRecipes();
	}

	function handleItemsPerPageChange(event: CustomEvent<number>) {
		recipeStore.setItemsPerPage(event.detail);
		fetchRecipes();
	}

	function fetchRecipes() {
		const skip = (currentPage - 1) * itemsPerPage;
		recipeStore.fetchRecipes({ skip, take: itemsPerPage, searchTerm });
	}

	async function fetchRestaurants() {
		try {
			const response = await api.restaurant.getRestaurants({});
			if (response.status === 200) {
				restaurants = response.body;
			} else {
				throw new Error(`Error fetching restaurants: ${response.status}`);
			}
		} catch (error: any) {
			console.error('Failed to fetch restaurants:', error);
			errors = [error.message || 'Failed to fetch restaurants'];
		}
	}

	async function fetchCookBooks() {
		try {
			const response = await api.cookbook.getCookBooks({});
			if (response.status === 200) {
				cookBooks = response.body;
			} else {
				throw new Error(`Error fetching cookBooks: ${response.status}`);
			}
		} catch (error: any) {
			console.error('Failed to fetch cookBooks:', error);
			errors = [error.message || 'Failed to fetch cookBooks'];
		}
	}

	async function fetchIngredients() {
		try {
			const response = await api.ingredient.getIngredients({});
			if (response.status === 200) {
				ingredientsList = response.body;
			} else {
				throw new Error(`Error fetching ingredients: ${response.status}`);
			}
		} catch (error: any) {
			console.error('Failed to fetch ingredients:', error);
			errors = [error.message || 'Failed to fetch ingredients'];
		}
	}

	function addRecipe() {
		currentRecipe = {
			name: '',
			imageUrl: '',
			description: '',
			servings: 0,
			cookTime: 0,
			prepTime: 0,
			frequency: null,
			foodCost: null,
			restaurantId: 0,
			cookBookId: 0,
			ingredients: [],
			instructions: []
		};
		currentView = 'create';
		errors = []; // Clear previous errors
	}

	function editRecipe(recipe: Recipe) {
		if (!recipe) return;
		currentRecipe = {
			id: recipe.id,
			name: recipe.name,
			imageUrl: recipe.imageUrl && recipe.imageUrl.length > 0 ? recipe.imageUrl[0] : '',
			description: recipe.description,
			servings: recipe.servings,
			cookTime: recipe.cookTime,
			prepTime: recipe.prepTime,
			frequency: recipe.frequency,
			foodCost: recipe.foodCost,
			restaurantId: recipe.restaurantId,
			cookBookId: recipe.cookBookId,
			ingredients: recipe.ingredients.map((ingredient) => ({
				id: ingredient.id, // RecipeIngredient ID
				quantity: ingredient.quantity,
				unit: ingredient.unit,
				ingredientId: ingredient.ingredientId
			})),
			instructions: recipe.instructions.map((instruction) => ({
				id: instruction.id, // RecipeInstruction ID
				stepNumber: instruction.stepNumber,
				instruction: instruction.instruction,
				imageUrl: instruction.imageUrl
			}))
		};
		currentView = 'edit';
		errors = []; // Clear previous errors
	}

	function viewRecipe(recipe: Recipe) {
		currentRecipe = {
			id: recipe.id,
			name: recipe.name,
			imageUrl: recipe.imageUrl && recipe.imageUrl.length > 0 ? recipe.imageUrl[0] : '',
			description: recipe.description,
			servings: recipe.servings,
			cookTime: recipe.cookTime,
			prepTime: recipe.prepTime,
			frequency: recipe.frequency,
			foodCost: recipe.foodCost,
			restaurantId: recipe.restaurantId,
			cookBookId: recipe.cookBookId,
			ingredients: recipe.ingredients.map((ingredient) => ({
				quantity: ingredient.quantity,
				unit: ingredient.unit,
				ingredientId: ingredient.ingredientId
			})),
			instructions: recipe.instructions.map((instruction) => ({
				stepNumber: instruction.stepNumber,
				instruction: instruction.instruction,
				imageUrl: instruction.imageUrl,
				id: instruction.id
			}))
		};
		currentView = 'view';
		errors = []; // Clear previous errors
	}

	async function deleteRecipe(id: number) {
		if (confirm('Are you sure you want to delete this recipe?')) {
			try {
				await api.recipe.deleteRecipe({ params: { id } });
				fetchRecipes();
			} catch (error: any) {
				console.error('Failed to delete recipe:', error);
				errors = [error.message || 'Failed to delete recipe'];
			}
		}
	}

	async function handleSubmit() {
		try {
			if (
				!currentRecipe ||
				currentRecipe.ingredients.length === 0 ||
				currentRecipe.instructions.length === 0
			) {
				throw new Error(`Recipe must have at least one ingredient and one instruction`);
			}

			let data: any;

			if (currentView === 'create') {
				// Construct data for creation
				data = {
					name: currentRecipe.name,
					imageUrl: currentRecipe.imageUrl ? [currentRecipe.imageUrl] : [],
					description: currentRecipe.description,
					servings: currentRecipe.servings,
					cookTime: currentRecipe.cookTime,
					prepTime: currentRecipe.prepTime,
					frequency: currentRecipe.frequency,
					foodCost: currentRecipe.foodCost,
					restaurant: {
						connect: { id: currentRecipe.restaurantId }
					},
					cookBook: {
						connect: { id: currentRecipe.cookBookId }
					},
					ingredients: {
						create: currentRecipe.ingredients.map((ingredient) => ({
							quantity: ingredient.quantity,
							unit: ingredient.unit,
							ingredient: {
								connect: { id: ingredient.ingredientId }
							}
						}))
					},
					instructions: {
						create: currentRecipe.instructions.map((instruction) => ({
							stepNumber: instruction.stepNumber,
							instruction: instruction.instruction,
							imageUrl: instruction.imageUrl
						}))
					}
				};

				// Call the create API endpoint
				// await api.recipe.createRecipe({ body: data });
				recipeStore.createRecipe(data);
			} else if (currentView === 'edit') {
				// Collect IDs for deletion
				const originalRecipe = recipes.find((r) => r.id === currentRecipe.id);
				if (!originalRecipe) throw new Error('Original recipe not found');

				const deleteIngredientIds = originalRecipe.ingredients
					.filter(
						(origIng) => !currentRecipe.ingredients.some((currIng) => currIng.id === origIng.id)
					)
					.map((ing) => ing.id);

				const deleteInstructionIds = originalRecipe.instructions
					.filter(
						(origInst) =>
							!currentRecipe.instructions.some((currInst) => currInst.id === origInst.id)
					)
					.map((inst) => inst.id);

				const deleteIds = {
					ingredientIds: deleteIngredientIds,
					instructionIds: deleteInstructionIds
				};

				// Construct data for updating
				data = {
					name: currentRecipe.name,
					imageUrl: currentRecipe.imageUrl ? [currentRecipe.imageUrl] : [],
					description: currentRecipe.description,
					servings: currentRecipe.servings,
					cookTime: currentRecipe.cookTime,
					prepTime: currentRecipe.prepTime,
					frequency: currentRecipe.frequency,
					foodCost: currentRecipe.foodCost,
					restaurant: {
						connect: { id: currentRecipe.restaurantId }
					},
					cookBook: {
						connect: { id: currentRecipe.cookBookId }
					},
					ingredients: {
						update: currentRecipe.ingredients
							.filter((ingredient) => ingredient.id)
							.map((ingredient) => ({
								where: { id: ingredient.id },
								data: {
									quantity: ingredient.quantity,
									unit: ingredient.unit,
									ingredient: {
										connect: { id: ingredient.ingredientId }
									}
								}
							})),
						create: currentRecipe.ingredients
							.filter((ingredient) => !ingredient.id)
							.map((ingredient) => ({
								quantity: ingredient.quantity,
								unit: ingredient.unit,
								ingredient: {
									connect: { id: ingredient.ingredientId }
								}
							}))
					},
					instructions: {
						update: currentRecipe.instructions
							.filter((instruction) => instruction.id)
							.map((instruction) => ({
								where: { id: instruction.id },
								data: {
									stepNumber: instruction.stepNumber,
									instruction: instruction.instruction,
									imageUrl: instruction.imageUrl
								}
							})),
						create: currentRecipe.instructions
							.filter((instruction) => !instruction.id)
							.map((instruction) => ({
								stepNumber: instruction.stepNumber,
								instruction: instruction.instruction,
								imageUrl: instruction.imageUrl
							}))
					}
				};

				if (!currentRecipe.id) {
					throw new Error('Recipe ID not found');
				}

				// Call the update API endpoint
				await api.recipe.updateRecipe({
					params: { id: +currentRecipe.id },
					body: { data, deleteIds }
				});
			}

			// Post-operation steps
			fetchRecipes();
			currentView = 'list';
			currentRecipe = null;
			errors = [];
		} catch (error: any) {
			console.error('Failed to save recipe:', error);
			errors = [error.message || 'Failed to save recipe'];
		}
	}

	function addIngredient() {
		if (!currentRecipe) return;
		currentRecipe.ingredients = [
			...currentRecipe.ingredients,
			{ ingredientId: 0, quantity: 0, unit: '' }
		];
	}

	function removeIngredient(index: number) {
		if (!currentRecipe) return;
		currentRecipe.ingredients = currentRecipe.ingredients.filter((_, i) => i !== index);
	}

	function addInstruction() {
		if (!currentRecipe) return;
		currentRecipe.instructions = [
			...currentRecipe.instructions,
			{
				stepNumber: currentRecipe.instructions.length + 1,
				instruction: '',
				id: 0
			}
		];
	}

	function removeInstruction(index: number) {
		if (!currentRecipe) return;
		currentRecipe.instructions = currentRecipe.instructions.filter((_, i) => i !== index);
		// Adjust step numbers
		currentRecipe.instructions = currentRecipe.instructions.map((instr, idx) => ({
			...instr,
			stepNumber: idx + 1
		}));
	}

	function goBack() {
		currentView = 'list';
		currentRecipe = null;
		errors = []; // Clear errors when navigating back
	}

	function nextStep() {
		if (currentStep < totalSteps) {
			currentStep += 1;
			if (currentStep === 4) {
				calculateIngredientTotalCost();
			}
		}
	}

	function prevStep() {
		if (currentStep > 1) {
			currentStep -= 1;
		}
	}

	function calculateIngredientTotalCost() {
		if (!currentRecipe) return;
		ingredientTotalCost = currentRecipe.ingredients.reduce((total, ingredient) => {
			const ing = ingredientsList.find((ing) => ing.id === ingredient.ingredientId);
			if (ing && ing.price) {
				return total + ing.price * ingredient.quantity;
			}
			return total;
		}, 0);
		// Update foodCost with ingredientTotalCost
		currentRecipe.foodCost = ingredientTotalCost;
	}

	// Computed filtered recipes based on search
	// Compute totalPages Based on totalCount:
	let totalPages = $derived(Math.ceil(totalCount / itemsPerPage));

	// Watch for changes in searchTerm to reset to page 1
	run(() => {
		if (currentPage > totalPages) {
			currentPage = totalPages || 1;
		}
	});

	// Watch for changes in searchTerm to reset to page 1
	run(() => {
		if (searchTerm !== '') {
			currentPage = 1;
			fetchRecipes();
		}
	});

	function openUnitConversion(index: number) {
		currentIngredientIndex = index;
		isConvertingUnits = true;
		newUnit = '';
		convertedQuantity = null;
	}

	function closeUnitConversion() {
		isConvertingUnits = false;
		currentIngredientIndex = null;
		newUnit = '';
		convertedQuantity = null;
	}

	function convertUnit() {
		if (currentIngredientIndex === null || !currentRecipe) return;
		const ingredient = currentRecipe.ingredients[currentIngredientIndex];
		try {
			const result = convertUnitsHelper(ingredient.quantity, ingredient.unit, newUnit);
			convertedQuantity = result;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			} else {
				alert('An unknown error occurred');
			}
		}
	}

	function applyUnitConversion() {
		if (currentIngredientIndex === null || convertedQuantity === null || !currentRecipe) return;
		currentRecipe.ingredients[currentIngredientIndex].quantity = convertedQuantity;
		currentRecipe.ingredients[currentIngredientIndex].unit = newUnit;
		closeUnitConversion();
	}

	function scaleRecipe() {
		if (!currentRecipe) return;

		if (isNaN(scaleFactor) || scaleFactor <= 0) {
			alert('Please enter a valid positive number for scaling.');
			return;
		}

		currentRecipe.servings = Math.round(currentRecipe.servings * scaleFactor);
		currentRecipe.ingredients = currentRecipe.ingredients.map((ingredient) => ({
			...ingredient,
			quantity: ingredient.quantity * scaleFactor
		}));

		isScaling = false;
	}

	function resetScaling() {
		if (!currentRecipe) return;
		fetchRecipes();
		isScaling = false;
		scaleFactor = 1;
	}

	// Add this function to handle clicking outside the modal
	function handleClickOutside(event: MouseEvent) {
		const modal = document.querySelector('.modal-content');
		if (modal && !modal.contains(event.target as Node)) {
			closeUnitConversion();
		}
	}

	// Add the function to standardize ingredients
	function standardizeIngredients() {
		if (!currentRecipe) return;

		// Optional: Define custom conversions if needed
		const customConversions = [
			// { fromUnit: 'cupFlour', toUnit: 'gram', factor: 125 }, // Example
		];

		currentRecipe.ingredients = currentRecipe.ingredients.map((ingredient) => {
			if (isWeightUnit(ingredient.unit)) {
				return ingredient;
			}

			try {
				const convertedQuantity = convertUnitsHelper(
					ingredient.quantity,
					ingredient.unit,
					'gram',
					undefined,
					customConversions
				);

				return {
					...ingredient,
					quantity: convertedQuantity,
					unit: 'gram'
				};
			} catch (error) {
				console.error(
					`Failed to convert ${ingredient.quantity} ${ingredient.unit} of ingredient ID ${ingredient.ingredientId}`,
					error
				);
				return ingredient;
			}
		});
	}

	run(() => {
		if (currentRecipe) {
			ingredientTotalCost = currentRecipe.ingredients.reduce((acc, ingredient) => {
				const ing = ingredientsList.find((i) => i.id === ingredient.ingredientId);
				return ing && ing.price ? acc + ing.price * ingredient.quantity : acc;
			}, 0);
		}
	});

	let ingredientTotalCost = $state(0);

	run(() => {
		if (currentView === 'view') {
			isScaling = false;
			isConvertingUnits = false;
		}
	});
</script>

<!-- Main Container -->
<div class="container p-4 mx-auto">
	<!-- Header Section -->
	{#if currentView === 'list'}
		<RecipeHeader bind:searchTerm {addRecipe} />

		<RecipeTable {recipes} {viewRecipe} {editRecipe} />

		<Pagination
			{currentPage}
			{totalPages}
			on:pageChange={handlePageChange}
			on:itemsPerPageChange={handleItemsPerPageChange}
		/>
	{/if}

	<!-- Create/Edit Recipe Form -->
	<div class="container p-4 mx-auto">
		<!-- Create/Edit Recipe Form -->
		{#if currentView === 'create' || currentView === 'edit'}
			<RecipeForm
				{currentView}
				bind:currentRecipe
				{restaurants}
				{cookBooks}
				{ingredientsList}
				{errors}
				{totalSteps}
				{goBack}
				{handleSubmit}
				{prevStep}
				{nextStep}
				{addIngredient}
				{removeIngredient}
				{addInstruction}
				{removeInstruction}
			/>
		{/if}
	</div>
	<!-- View Recipe Details -->
	{#if currentView === 'view' && currentRecipe}
		<RecipeDetailsView
			{currentRecipe}
			{restaurants}
			{cookBooks}
			{ingredientsList}
			bind:isScaling
			bind:scaleFactor
			bind:isConvertingUnits
			bind:currentIngredientIndex
			bind:newUnit
			bind:convertedQuantity
			{allUnits}
			{editRecipe}
			{scaleRecipe}
			{resetScaling}
			{openUnitConversion}
			{closeUnitConversion}
			{convertUnit}
			{applyUnitConversion}
			{handleClickOutside}
			{goBack}
			{standardizeIngredients}
			{startStandardization}
		/>
	{/if}
	<!-- Standardization Modal -->
	{#if isStandardizing && standardizingIngredientIndex !== null}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
			onclick={closeStandardizationModal}
		>
			<div
				class="p-6 bg-white rounded-lg shadow-xl modal-content"
				onclick={stopPropagation(bubble('click'))}
			>
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-medium text-gray-900">Standardize Ingredient</h3>
					<div
						onclick={closeStandardizationModal}
						class="text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer"
						aria-label="Close modal"
					>
						<!-- Close Icon -->
						<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</div>
				</div>
				{#if currentRecipe}
					<p class="mb-4">
						Current: {currentRecipe.ingredients[standardizingIngredientIndex].quantity.toFixed(2)}
						{currentRecipe.ingredients[standardizingIngredientIndex].unit}
					</p>
					<div class="flex flex-col mb-4 space-y-2">
						<select
							bind:value={standardizingToUnit}
							class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						>
							<option value="">Select unit to convert to</option>
							{#each allUnits as unit}
								<option value={unit}>{unit}</option>
							{/each}
						</select>
						<button
							onclick={applyStandardization}
							class="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						>
							Convert
						</button>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	/* Custom styles for step indicators */
</style>

<script lang="ts">
	import { createBubbler, stopPropagation } from 'svelte/legacy';

	const bubble = createBubbler();
	import { Scale, Edit, RefreshCw, ChevronLeft, Printer } from 'lucide-svelte';
	import { tick } from 'svelte';
	import type { Restaurant, CookBook, Ingredient } from '@ckm/zod-schemas'; // Adjust the import path as needed
	import { fade } from 'svelte/transition';
	import type { Recipe } from '@ckm/types';

	interface Props {
		currentRecipe: Recipe;
		restaurants: Restaurant[];
		cookBooks: CookBook[];
		ingredientsList: Ingredient[];
		isScaling: boolean;
		scaleFactor: number;
		isConvertingUnits: boolean;
		currentIngredientIndex: number | null;
		newUnit: string;
		convertedQuantity: number | null;
		allUnits: string[];
		// Export functions to be called from the parent component
		editRecipe: (recipe: Recipe) => void;
		openUnitConversion: (index: number) => void;
		closeUnitConversion: () => void;
		convertUnit: () => void;
		applyUnitConversion: () => void;
		handleClickOutside: (event: MouseEvent) => void;
		goBack: () => void;
		startStandardization: (index: number) => void;
		standardizeIngredients: () => void;
	}

	let {
		currentRecipe = $bindable(),
		restaurants,
		cookBooks,
		ingredientsList,
		isScaling = $bindable(),
		scaleFactor = $bindable(),
		isConvertingUnits = $bindable(),
		currentIngredientIndex = $bindable(),
		newUnit = $bindable(),
		convertedQuantity = $bindable(),
		allUnits,
		editRecipe,
		openUnitConversion,
		closeUnitConversion,
		convertUnit,
		applyUnitConversion,
		handleClickOutside,
		goBack,
		startStandardization,
		standardizeIngredients
	}: Props = $props();
	// local states
	// let scaleFactor: number = 1;
	let desiredScaleFactor: number = $state(1);
	let originalIngredients: Recipe['ingredients'] = [];
	let originalServings: number = currentRecipe.servings;

	function startScaling() {
		isScaling = true;
		originalIngredients = currentRecipe.ingredients.map((ingredient) => ({ ...ingredient }));
		originalServings = currentRecipe.servings;
	}

	function cancelScaling() {
		isScaling = false;
		originalIngredients = currentRecipe.ingredients.map((ingredient) => ({ ...ingredient }));
		originalServings = currentRecipe.servings;
		scaleFactor = 1;
		desiredScaleFactor = 1;
	}

	function resetScaling() {
		currentRecipe.ingredients = originalIngredients.map((ingredient) => ({ ...ingredient }));
		currentRecipe.servings = originalServings;
		scaleFactor = 1;
		desiredScaleFactor = 1;
	}

	function applyDesiredScale() {
		applyScaleFactor(desiredScaleFactor);
	}

	function applyScaleFactor(factor: number) {
		currentRecipe.ingredients = originalIngredients.map((ingredient) => ({
			...ingredient,
			quantity: ingredient.quantity * factor
		}));

		currentRecipe.servings = Math.round(originalServings * factor);
		scaleFactor = factor;
	}

	function updateIngredientQuantity(index: number, newQuantity: number) {
		if (newQuantity <= 0) return;

		const originalQuantity = originalIngredients[index].quantity;
		const newScaleFactor = newQuantity / originalQuantity;

		applyScaleFactor(newScaleFactor);
	}

	function printRecipe() {
		// reset Scaling
		isScaling = false;
		isConvertingUnits = false;
		currentIngredientIndex = null;
		newUnit = '';
		convertedQuantity = null;
		// allow the DOM to upate before printing
		tick().then(() => {
			window.print();
		});
	}
</script>

<div class="overflow-hidden bg-white rounded-lg shadow-xl">
	<div class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="px-6 py-4 border-b border-gray-200 bg-gray-50 print:hidden">
			<div class="flex items-center justify-between">
				<h2 class="text-3xl font-bold text-gray-800">{currentRecipe.name}</h2>
				<div class="flex space-x-2">
					<button
						onclick={isScaling ? cancelScaling : startScaling}
						class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						<Scale class="w-5 h-5 mr-2" />
						{isScaling ? 'Cancel Scaling' : 'Scale Recipe'}
					</button>
					<button
						onclick={() => editRecipe(currentRecipe)}
						class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
					>
						<Edit class="w-5 h-5 mr-2" />
						Edit
					</button>
					<!-- Print Button -->
					<button
						onclick={printRecipe}
						class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
					>
						<Printer class="w-5 h-5 mr-2" />
						Print
					</button>
					<button
						onclick={standardizeIngredients}
						class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
					>
						Standardize Ingredients
					</button>
				</div>
			</div>
		</div>

		<div class="px-6 py-6">
			<!-- Scaling Interface -->
			{#if isScaling}
				<div class="p-4 mb-6 rounded-md bg-blue-50">
					<h3 class="mb-2 text-lg font-medium text-blue-800">Scale Recipe</h3>
					<div class="flex items-center space-x-4">
						<input
							type="number"
							bind:value={desiredScaleFactor}
							min="0.1"
							step="0.1"
							class="w-24 px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<button
							onclick={applyDesiredScale}
							class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Apply Scaling
						</button>
						<button
							onclick={resetScaling}
							class="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Reset
						</button>
					</div>
					<p class="mt-2 text-sm text-blue-600">
						Enter a number to scale the recipe. For example, 2 will double the recipe, 0.5 will
						halve it. You also able to scale based on ingredient constrain, just edit the
						ingredient's amount to adjust the recipe
					</p>
				</div>
			{/if}

			<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
				<!-- Left Column: Image and Basic Info -->
				<div class="md:col-span-1">
					{#if currentRecipe.imageUrl}
						<img
							src={currentRecipe.imageUrl}
							alt={currentRecipe.name}
							class="object-cover w-full h-64 mb-4 rounded-lg shadow-md"
						/>
					{/if}
					<div class="p-4 rounded-lg shadow-md bg-gray-50">
						<h3 class="mb-2 text-lg font-semibold text-gray-700">Recipe Details</h3>
						<p><strong>Servings:</strong> {currentRecipe.servings}</p>
						<p><strong>Prep Time:</strong> {currentRecipe.prepTime} mins</p>
						<p><strong>Cook Time:</strong> {currentRecipe.cookTime} mins</p>
						{#if currentRecipe.frequency !== null}
							<p><strong>Frequency:</strong> {currentRecipe.frequency}</p>
						{/if}
						{#if currentRecipe.foodCost}
							<p><strong>Food Cost:</strong> ${currentRecipe.foodCost}</p>
						{/if}
						<p>
							<strong>Restaurant:</strong>
							{restaurants.find((r) => r.id === currentRecipe.restaurantId)?.name}
						</p>
						<p>
							<strong>Cookbook:</strong>
							{cookBooks.find((cb) => cb.id === currentRecipe.cookBookId)?.name}
						</p>
					</div>
				</div>
				<!-- Middle Column: Ingredients -->
				<div class="md:col-span-1">
					<h3 class="mb-4 text-xl font-semibold text-gray-800">Ingredients</h3>
					<ul class="space-y-2">
						{#each currentRecipe.ingredients as ingredient, index (ingredient.ingredientId)}
							<li class="flex items-center justify-between p-3 bg-white rounded-md shadow">
								<span>
									<span class="font-medium">
										{ingredientsList.find((ing) => ing.id === ingredient.ingredientId)?.name}
									</span>
									<br />
									{#if isScaling}
										<input
											type="text"
											bind:value={ingredient.quantity}
											oninput={(e) =>
												updateIngredientQuantity(index, parseFloat(e.currentTarget.value))}
											class="w-24 px-2 py-1 text-sm text-gray-700 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
									{:else}
										<span class="text-sm text-gray-600">
											{ingredient.quantity.toFixed(2)}
										</span>
									{/if}
									<span class="text-sm text-gray-600"> {ingredient.unit}</span>
								</span>
								<button
									onclick={() => openUnitConversion(index)}
									class="p-1 text-indigo-600 rounded-full hover:bg-indigo-100 print:hidden"
									title="Convert unit"
								>
									<RefreshCw class="w-5 h-5" />
								</button>
								<!-- Button to standardize ingredient -->
								<button
									onclick={() => startStandardization(index)}
									class="p-1 text-purple-600 rounded-full hover:bg-purple-100"
									title="Standardize ingredient"
								>
									Standardize
								</button>
							</li>
						{/each}
					</ul>
				</div>
				<!-- Right Column: Instructions and Description -->
				<div class="md:col-span-1">
					<h3 class="mb-4 text-xl font-semibold text-gray-800">Instructions</h3>
					<ol class="space-y-4 list-decimal list-inside">
						{#each currentRecipe.instructions as instruction (instruction.id)}
							<li
								class="relative p-4 bg-white rounded-md shadow-md transition-all duration-300 hover:shadow-lg group"
							>
								<span class="ml-2 cursor-pointer">{instruction.instruction}</span>

								<!-- Hover indicator -->
								<div
									class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
										/>
									</svg>
								</div>

								<!-- Hover image -->
								{#if instruction.imageUrl}
									{#key instruction.imageUrl}
										<div
											class="absolute left-0 mt-2 w-64 h-64 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
										>
											<img
												src={instruction.imageUrl}
												alt={instruction.instruction}
												class="object-cover w-full h-full rounded-md shadow-lg"
												transition:fade={{ duration: 300 }}
											/>
										</div>
									{/key}
								{/if}
							</li>
						{/each}
					</ol>
					{#if currentRecipe.description}
						<div class="mt-6">
							<h3 class="mb-2 text-xl font-semibold text-gray-800">Description</h3>
							<p class="text-gray-600">{currentRecipe.description}</p>
						</div>
					{/if}
				</div>
			</div>
			<!-- Unit Conversion Modal -->
			{#if isConvertingUnits && currentIngredientIndex !== null}
				<div
					class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
					role="dialog"
					aria-modal="true"
					onclick={handleClickOutside}
					onkeydown={(e) => {
						if (e.key === 'Escape') closeUnitConversion();
					}}
				>
					<div
						class="p-6 bg-white rounded-lg shadow-xl modal-content"
						onclick={stopPropagation(bubble('click'))}
					>
						<div class="flex items-center justify-between mb-4">
							<h3 class="text-lg font-medium text-gray-900">Convert Unit</h3>
							<div
								onclick={closeUnitConversion}
								class="text-gray-400 hover:text-gray-500 focus:outline-none"
								aria-label="Close modal"
							>
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
						<p class="mb-4">
							Current: {currentRecipe.ingredients[currentIngredientIndex].quantity.toFixed(2)}
							{currentRecipe.ingredients[currentIngredientIndex].unit}
						</p>
						<div class="flex mb-4 space-x-2">
							<select
								bind:value={newUnit}
								class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							>
								<option value="">Select new unit</option>
								{#each allUnits as unit, index (index)}
									<option value={unit}>{unit}</option>
								{/each}
							</select>
							<button
								onclick={convertUnit}
								class="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							>
								Convert
							</button>
						</div>
						{#if convertedQuantity !== null}
							<p class="mb-4">
								Converted: {convertedQuantity.toFixed(2)}
								{newUnit}
							</p>
							<div class="flex justify-end space-x-2">
								<button
									onclick={applyUnitConversion}
									class="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
								>
									Apply
								</button>
								<button
									onclick={closeUnitConversion}
									class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
								>
									Cancel
								</button>
							</div>
						{/if}
					</div>
				</div>
			{/if}

			<div class="mt-8 print:hidden">
				<button
					onclick={goBack}
					class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
				>
					<ChevronLeft class="w-5 h-5 mr-2" />
					Back to List
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	/* Print Styles */
	@media print {
		/* Hide elements not needed for printing */
		.print\:hidden {
			display: none !important;
		}

		/* Adjust layout for printing */
		body {
			margin: 0;
			padding: 0;
		}

		/* Set background to white */
		body,
		.bg-white {
			background-color: #ffffff !important;
		}

		/* Remove shadows and borders */
		.shadow-xl,
		.rounded-lg,
		.border {
			box-shadow: none !important;
			border: none !important;
		}

		/* Adjust font sizes if needed */
		h2 {
			font-size: 24px;
		}

		h3 {
			font-size: 18px;
		}

		/* Ensure full width */
		.max-w-7xl {
			max-width: 100% !important;
		}
	}
</style>

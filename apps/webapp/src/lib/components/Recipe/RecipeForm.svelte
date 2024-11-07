<script lang="ts">
	import { preventDefault } from 'svelte/legacy';
	import { ChevronLeft, Check, Plus, Trash2 } from 'lucide-svelte';
	import type { Restaurant, CookBook, Ingredient } from '@ckm/zod-schemas';
	import Dropzone from 'svelte-file-dropzone';
	import type { Recipe } from '@ckm/types';
	import { api } from '@ckm/lib-api';

	interface Props {
		currentView: 'create' | 'edit';
		currentRecipe: Recipe;
		restaurants: Restaurant[];
		cookBooks: CookBook[];
		ingredientsList: Ingredient[];
		goBack: () => void;
		handleSubmit: () => void;
	}

	let {
		currentView,
		currentRecipe = $bindable(),
		restaurants,
		cookBooks,
		ingredientsList,
		goBack,
		handleSubmit
	}: Props = $props();

	// Local state
	let errors: string[] = $state([]);
	let isReview: boolean = $state(false);
	let files = $state({
		accepted: [],
		rejected: []
	});

	// Computed values
	let totalTime = $derived(currentRecipe?.prepTime + currentRecipe?.cookTime || 0);
	let ingredientTotalCost = $derived(calculateTotalCost());
	let costPerServing = $derived(
		currentRecipe?.servings ? ingredientTotalCost / currentRecipe.servings : 0
	);

	// Auto-calculate prep and cook time based on ingredients and instructions
	function estimateTime() {
		let estimatedPrepTime = currentRecipe.ingredients?.length * 2 || 0; // 2 mins per ingredient
		let estimatedCookTime = 15; // base cooking time

		// Add time based on number of instructions
		if (currentRecipe.instructions?.length) {
			estimatedCookTime += currentRecipe.instructions.length * 5; // 5 mins per instruction
		}

		currentRecipe.prepTime = estimatedPrepTime;
		currentRecipe.cookTime = estimatedCookTime;
	}

	function calculateTotalCost() {
		if (!currentRecipe?.ingredients) return 0;
		return currentRecipe.ingredients.reduce((total, ingredient) => {
			const selectedIngredient = ingredientsList.find((ing) => ing.id === ingredient.ingredientId);
			return total + (selectedIngredient?.price || 0) * ingredient.quantity;
		}, 0);
	}

	function addIngredient() {
		currentRecipe.ingredients = [
			...currentRecipe.ingredients,
			{ ingredientId: '', quantity: 1, unit: 'unit' }
		];
		estimateTime(); // Recalculate times when ingredients change
	}

	function removeIngredient(index: number) {
		currentRecipe.ingredients = currentRecipe.ingredients.filter((_, i) => i !== index);
		estimateTime();
	}

	function addInstruction() {
		currentRecipe.instructions = [
			...currentRecipe.instructions,
			{ instruction: '', stepNumber: currentRecipe.instructions.length + 1 }
		];
		estimateTime(); // Recalculate times when instructions change
	}

	function removeInstruction(index: number) {
		currentRecipe.instructions = currentRecipe.instructions
			.filter((_, i) => i !== index)
			.map((inst, i) => ({ ...inst, stepNumber: i + 1 }));
		estimateTime();
	}

	async function handleFilesSelect(e: CustomEvent) {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];

		for (const file of acceptedFiles) {
			await uploadFile(file);
		}
	}

	async function uploadFile(file: File) {
		const formData = new FormData();
		formData.append('image', file);
		try {
			const res = await api.recipe.uploadFileS3({ body: formData });
			if (res.status === 200) {
				currentRecipe.imageUrl = [...(currentRecipe.imageUrl || []), res.body.url];
			}
		} catch (error) {
			console.error(`Error uploading file: ${error}`);
			errors = [...errors, `Failed to upload ${file.name}`];
		}
	}

	function validate(): boolean {
		const newErrors: string[] = [];

		if (!currentRecipe.name?.trim()) newErrors.push('Recipe name is required');
		if (!currentRecipe.servings || currentRecipe.servings < 1)
			newErrors.push('Please specify number of servings');
		if (!currentRecipe.ingredients?.length) newErrors.push('Add at least one ingredient');
		if (!currentRecipe.instructions?.length) newErrors.push('Add at least one instruction');

		errors = newErrors;
		return newErrors.length === 0;
	}

	function handleReview() {
		if (validate()) {
			isReview = true;
		}
	}
</script>

<div class="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
	<!-- Header -->
	<div class="flex items-center justify-between mb-6">
		<h2 class="text-2xl font-semibold text-gray-800">
			{#if isReview}
				Review Recipe
			{:else}
				{currentView === 'create' ? 'Create New Recipe' : 'Edit Recipe'}
			{/if}
		</h2>
		<button
			on:click={isReview ? () => (isReview = false) : goBack}
			class="inline-flex items-center px-3 py-2 text-gray-700 transition bg-gray-200 rounded-md hover:bg-gray-300"
		>
			<ChevronLeft class="w-4 h-4 mr-1" />
			{isReview ? 'Edit' : 'Back'}
		</button>
	</div>

	<!-- Error Display -->
	{#if errors.length > 0}
		<div class="p-4 mb-6 bg-red-50 rounded-md">
			{#each errors as error}
				<p class="text-sm text-red-600">{error}</p>
			{/each}
		</div>
	{/if}

	<form on:submit={preventDefault(handleSubmit)} class="space-y-6">
		{#if !isReview}
			<!-- Recipe Details -->
			<div class="space-y-6">
				<!-- Basic Info Section -->
				<div class="grid gap-6 p-6 bg-gray-50 rounded-lg md:grid-cols-2">
					<div class="space-y-4">
						<div>
							<label for="name" class="block text-sm font-medium text-gray-700"
								>Recipe Name <span class="text-red-500">*</span></label
							>
							<input
								type="text"
								id="name"
								bind:value={currentRecipe.name}
								class="w-full mt-1 border-gray-300 rounded-md"
								placeholder="Enter recipe name"
							/>
						</div>

						<div>
							<label for="servings" class="block text-sm font-medium text-gray-700"
								>Servings <span class="text-red-500">*</span></label
							>
							<input
								type="number"
								id="servings"
								bind:value={currentRecipe.servings}
								min="1"
								class="w-full mt-1 border-gray-300 rounded-md"
							/>
						</div>

						<div>
							<label for="description" class="block text-sm font-medium text-gray-700"
								>Description</label
							>
							<textarea
								id="description"
								bind:value={currentRecipe.description}
								rows="3"
								class="w-full mt-1 border-gray-300 rounded-md"
								placeholder="Describe your recipe"
							></textarea>
						</div>
					</div>

					<div class="space-y-4">
						<label class="block text-sm font-medium text-gray-700">Recipe Image</label>
						<Dropzone
							on:drop={handleFilesSelect}
							class="h-40 border-2 border-dashed border-gray-300 rounded-md"
						/>

						<div class="grid grid-cols-2 gap-4">
							<div>
								<label for="restaurantId" class="block text-sm font-medium text-gray-700"
									>Restaurant</label
								>
								<select
									id="restaurantId"
									bind:value={currentRecipe.restaurantId}
									class="w-full mt-1 border-gray-300 rounded-md"
								>
									<option value="">Select restaurant</option>
									{#each restaurants as restaurant}
										<option value={restaurant.id}>{restaurant.name}</option>
									{/each}
								</select>
							</div>
							<div>
								<label for="cookBookId" class="block text-sm font-medium text-gray-700"
									>Cookbook</label
								>
								<select
									id="cookBookId"
									bind:value={currentRecipe.cookBookId}
									class="w-full mt-1 border-gray-300 rounded-md"
								>
									<option value="">Select cookbook</option>
									{#each cookBooks as cookbook}
										<option value={cookbook.id}>{cookbook.name}</option>
									{/each}
								</select>
							</div>
						</div>
					</div>
				</div>

				<!-- Ingredients Section -->
				<div class="p-6 bg-gray-50 rounded-lg">
					<div class="flex items-center justify-between mb-4">
						<h3 class="text-lg font-medium text-gray-700">
							Ingredients <span class="text-red-500">*</span>
						</h3>
						<button
							type="button"
							on:click={addIngredient}
							class="inline-flex items-center px-3 py-2 text-sm text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200"
						>
							<Plus class="w-4 h-4 mr-1" />
							Add Ingredient
						</button>
					</div>

					<div class="space-y-3">
						{#each currentRecipe.ingredients as ingredient, index}
							<div class="flex items-center gap-4 p-3 bg-white rounded-md">
								<div class="flex-1">
									<select
										bind:value={ingredient.ingredientId}
										class="w-full border-gray-300 rounded-md"
									>
										<option value="">Select ingredient</option>
										{#each ingredientsList as ing}
											<option value={ing.id}>{ing.name}</option>
										{/each}
									</select>
								</div>
								<input
									type="number"
									bind:value={ingredient.quantity}
									min="0"
									step="0.01"
									class="w-24 border-gray-300 rounded-md"
									placeholder="Qty"
								/>
								<input
									type="text"
									bind:value={ingredient.unit}
									class="w-24 border-gray-300 rounded-md"
									placeholder="Unit"
								/>
								{#if ingredient.ingredientId}
									<span class="text-sm font-medium text-gray-900">
										{new Intl.NumberFormat('en-US', {
											style: 'currency',
											currency: 'USD'
										}).format(
											(ingredientsList.find((ing) => ing.id === ingredient.ingredientId)?.price ||
												0) * ingredient.quantity
										)}
									</span>
								{/if}
								<button
									type="button"
									on:click={() => removeIngredient(index)}
									class="p-1 text-red-600 hover:text-red-800"
								>
									<Trash2 class="w-4 h-4" />
								</button>
							</div>
						{/each}
					</div>

					{#if currentRecipe.ingredients?.length > 0}
						<div class="mt-4 text-sm text-gray-600">
							Total Cost: {new Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'USD'
							}).format(ingredientTotalCost)}
							| Per Serving: {new Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'USD'
							}).format(costPerServing)}
						</div>
					{/if}
				</div>

				<!-- Instructions Section -->
				<div class="p-6 bg-gray-50 rounded-lg">
					<div class="flex items-center justify-between mb-4">
						<h3 class="text-lg font-medium text-gray-700">
							Instructions <span class="text-red-500">*</span>
						</h3>
						<button
							type="button"
							on:click={addInstruction}
							class="inline-flex items-center px-3 py-2 text-sm text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200"
						>
							<Plus class="w-4 h-4 mr-1" />
							Add Step
						</button>
					</div>

					<div class="space-y-3">
						{#each currentRecipe.instructions as instruction, index}
							<div class="flex items-start gap-4 p-3 bg-white rounded-md">
								<div
									class="flex items-center justify-center w-8 h-8 text-white bg-indigo-600 rounded-full shrink-0"
								>
									{index + 1}
								</div>
								<div class="flex-1">
									<textarea
										rows="2"
										bind:value={instruction.instruction}
										class="w-full border-gray-300 rounded-md"
										placeholder="Describe this step..."
									></textarea>
								</div>
								<button
									type="button"
									on:click={() => removeInstruction(index)}
									class="p-1 mt-2 text-red-600 hover:text-red-800"
								>
									<Trash2 class="w-4 h-4" />
								</button>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{:else}
			<!-- Review Section -->
			<div class="space-y-6">
				<div class="grid gap-6 md:grid-cols-2">
					<!-- Recipe Details -->
					<div class="p-6 bg-gray-50 rounded-lg">
						<h3 class="mb-4 text-lg font-medium text-gray-700">Recipe Details</h3>
						<dl class="grid grid-cols-2 gap-2">
							<dt class="text-sm text-gray-600">Name:</dt>
							<dd class="text-sm font-medium text-gray-900">{currentRecipe.name}</dd>

							<dt class="text-sm text-gray-600">Servings:</dt>
							<dd class="text-sm font-medium text-gray-900">{currentRecipe.servings}</dd>

							<dt class="text-sm text-gray-600">Estimated Time:</dt>
							<dd class="text-sm font-medium text-gray-900">{totalTime} mins</dd>

							<dt class="text-sm text-gray-600">Restaurant:</dt>
							<dd class="text-sm font-medium text-gray-900">
								{restaurants.find((r) => r.id === currentRecipe.restaurantId)?.name || 'None'}
							</dd>

							<dt class="text-sm text-gray-600">Cookbook:</dt>
							<dd class="text-sm font-medium text-gray-900">
								{cookBooks.find((c) => c.id === currentRecipe.cookBookId)?.name || 'None'}
							</dd>
						</dl>

						{#if currentRecipe.description}
							<div class="mt-4">
								<dt class="text-sm text-gray-600">Description:</dt>
								<dd class="mt-1 text-sm text-gray-900">{currentRecipe.description}</dd>
							</div>
						{/if}
					</div>

					<!-- Cost Summary -->
					<div class="p-6 bg-gray-50 rounded-lg">
						<h3 class="mb-4 text-lg font-medium text-gray-700">Cost Summary</h3>
						<div class="space-y-4">
							<div class="p-4 bg-white rounded-lg">
								<p class="text-sm text-gray-600">Total Ingredient Cost</p>
								<p class="text-2xl font-bold text-indigo-600">
									{new Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: 'USD'
									}).format(ingredientTotalCost)}
								</p>
							</div>
							<div class="p-4 bg-white rounded-lg">
								<p class="text-sm text-gray-600">Cost per Serving</p>
								<p class="text-xl font-semibold text-indigo-600">
									{new Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: 'USD'
									}).format(costPerServing)}
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Ingredients Review -->
				<div class="p-6 bg-gray-50 rounded-lg">
					<h3 class="mb-4 text-lg font-medium text-gray-700">Ingredients</h3>
					<div class="grid gap-2 md:grid-cols-2">
						{#each currentRecipe.ingredients as ingredient}
							<div class="flex items-center justify-between p-3 bg-white rounded-md">
								<span class="text-sm text-gray-900">
									<span class="font-medium">
										{ingredient.quantity}
										{ingredient.unit}
									</span>
									{ingredientsList.find((ing) => ing.id === ingredient.ingredientId)?.name}
								</span>
								<span class="text-sm font-medium text-gray-600">
									{new Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: 'USD'
									}).format(
										(ingredientsList.find((ing) => ing.id === ingredient.ingredientId)?.price ||
											0) * ingredient.quantity
									)}
								</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Instructions Review -->
				<div class="p-6 bg-gray-50 rounded-lg">
					<h3 class="mb-4 text-lg font-medium text-gray-700">Instructions</h3>
					<ol class="space-y-3">
						{#each currentRecipe.instructions as instruction, index}
							<li class="flex gap-3 p-3 bg-white rounded-md">
								<span
									class="flex items-center justify-center w-6 h-6 text-sm text-white bg-indigo-600 rounded-full shrink-0"
								>
									{index + 1}
								</span>
								<span class="text-sm text-gray-900">{instruction.instruction}</span>
							</li>
						{/each}
					</ol>
				</div>
			</div>
		{/if}

		<!-- Action Buttons -->
		<div class="flex justify-end pt-6 mt-8 border-t">
			{#if !isReview}
				<button
					type="button"
					on:click={handleReview}
					class="inline-flex items-center px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Review Recipe
					<ChevronLeft class="w-4 h-4 ml-2 rotate-180" />
				</button>
			{:else}
				<div class="flex gap-3">
					<button
						type="button"
						on:click={() => (isReview = false)}
						class="inline-flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
					>
						<ChevronLeft class="w-4 h-4 mr-2" />
						Edit Recipe
					</button>
					<button
						type="submit"
						class="inline-flex items-center px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
					>
						<Check class="w-4 h-4 mr-2" />
						Save Recipe
					</button>
				</div>
			{/if}
		</div>
	</form>
</div>


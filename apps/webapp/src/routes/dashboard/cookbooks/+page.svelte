<script lang="ts">
	import { onMount } from 'svelte';
	import { Plus, Search, Edit, Trash2, Book, ChevronRight } from 'lucide-svelte';
	import { api } from '@ckm/lib-api';
	import type { CookBook, Recipe } from '../../../../../server/prisma/generated/zod';

	let cookbooks: CookBook[] = $state([]);
	let searchTerm = $state('');
	let selectedCookbook: CookBook | null = $state(null);
	let loading = $state(true);
	let error: string | null = $state(null);

	onMount(async () => {
		await fetchCookbooks();
	});

	async function fetchCookbooks() {
		try {
			loading = true;
			const response = await api.cookbook.getCookBooks({});
			if (response.status === 200) {
				cookbooks = response.body;
			} else {
				throw new Error('Failed to fetch cookbooks');
			}
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	async function addCookbook() {
		const newCookbook: Partial<CookBook> = {
			name: 'New Cookbook',
			category: 'General',
			restaurantId: 1 // Replace with actual restaurant ID
		};

		try {
			const response = await api.cookbook.createCookBook({ body: newCookbook });
			if (response.status === 201) {
				await fetchCookbooks();
			} else {
				throw new Error('Failed to create cookbook');
			}
		} catch (err) {
			error = err.message;
		}
	}

	async function editCookbook(cookbook: CookBook) {
		// This function would typically open a modal or navigate to an edit page
		console.log('Edit cookbook', cookbook.id);
	}

	async function deleteCookbook(id: number) {
		if (confirm('Are you sure you want to delete this cookbook?')) {
			try {
				const response = await api.cookbook.deleteCookBook({ params: { id } });
				if (response.status === 200) {
					await fetchCookbooks();
				} else {
					throw new Error('Failed to delete cookbook');
				}
			} catch (err) {
				error = err.message;
			}
		}
	}

	async function viewCookbook(cookbook: CookBook) {
		selectedCookbook = cookbook;
		// Fetch recipes for the selected cookbook
		try {
			const response = await api.recipe.getRecipes({ query: { cookBookId: cookbook.id } });
			if (response.status === 200) {
				selectedCookbook.recipes = response.body;
			} else {
				throw new Error('Failed to fetch recipes');
			}
		} catch (err) {
			error = err.message;
		}
	}

	async function addRecipe(cookbookId: number) {
		const newRecipe: Partial<Recipe> = {
			name: 'New Recipe',
			description: 'Recipe description',
			cookBookId: cookbookId,
			restaurantId: 1, // Replace with actual restaurant ID
			servings: 1,
			prepTime: 0,
			cookTime: 0
		};

		try {
			const response = await api.recipe.createRecipe({ body: newRecipe });
			if (response.status === 201) {
				await viewCookbook(selectedCookbook);
			} else {
				throw new Error('Failed to create recipe');
			}
		} catch (err) {
			error = err.message;
		}
	}

	async function editRecipe(recipe: Recipe) {
		// This function would typically open a modal or navigate to an edit page
		console.log('Edit recipe', recipe.id);
	}

	async function deleteRecipe(recipeId: number) {
		if (confirm('Are you sure you want to delete this recipe?')) {
			try {
				const response = await api.recipe.deleteRecipe({ params: { id: recipeId } });
				if (response.status === 200) {
					await viewCookbook(selectedCookbook);
				} else {
					throw new Error('Failed to delete recipe');
				}
			} catch (err) {
				error = err.message;
			}
		}
	}

	let filteredCookbooks = $derived(cookbooks.filter(
		(cookbook) =>
			cookbook.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			cookbook.category.toLowerCase().includes(searchTerm.toLowerCase())
	));
</script>

<div class="px-4 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8">
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
		<h1 class="mb-4 text-3xl font-bold text-gray-900 sm:mb-0">Cookbooks</h1>
		<button
			onclick={addCookbook}
			class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			<Plus class="w-5 h-5 mr-2" />
			Add Cookbook
		</button>
	</div>

	<div class="mt-6">
		<div class="relative">
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<Search class="w-5 h-5 text-gray-400" />
			</div>
			<input
				type="text"
				bind:value={searchTerm}
				class="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				placeholder="Search cookbooks..."
			/>
		</div>
	</div>

	{#if loading}
		<p class="mt-4 text-center text-gray-500">Loading cookbooks...</p>
	{:else if error}
		<p class="mt-4 text-center text-red-500">{error}</p>
	{:else}
		<div class="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each filteredCookbooks as cookbook (cookbook.id)}
				<div
					class="overflow-hidden transition-shadow duration-200 bg-white rounded-lg shadow hover:shadow-md"
				>
					<div class="px-4 py-5 sm:p-6">
						<div class="flex items-center">
							<div class="flex-shrink-0 p-3 bg-indigo-500 rounded-md">
								<Book class="w-6 h-6 text-white" />
							</div>
							<div class="ml-4">
								<h3 class="text-lg font-medium leading-6 text-gray-900">{cookbook.name}</h3>
								<p class="mt-1 text-sm text-gray-500">{cookbook.category}</p>
							</div>
						</div>
						<div class="mt-4">
							<p class="text-sm text-gray-500">{cookbook.recipes?.length || 0} recipes</p>
						</div>
					</div>
					<div class="flex items-center justify-between px-4 py-4 bg-gray-50 sm:px-6">
						<button
							onclick={() => viewCookbook(cookbook)}
							class="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-900 focus:outline-none"
						>
							View Recipes <ChevronRight class="w-5 h-5 ml-1" />
						</button>
						<div class="flex space-x-4">
							<button
								onclick={() => editCookbook(cookbook)}
								class="text-gray-500 hover:text-gray-700 focus:outline-none"
								title="Edit Cookbook"
							>
								<Edit class="w-5 h-5" />
							</button>
							<button
								onclick={() => deleteCookbook(cookbook.id)}
								class="text-red-500 hover:text-red-700 focus:outline-none"
								title="Delete Cookbook"
							>
								<Trash2 class="w-5 h-5" />
							</button>
						</div>
					</div>
				</div>
			{/each}
			{#if filteredCookbooks.length === 0}
				<div class="text-center text-gray-500 col-span-full">No cookbooks found.</div>
			{/if}
		</div>
	{/if}

	{#if selectedCookbook}
		<div class="mt-12">
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
				<h2 class="mb-4 text-2xl font-bold text-gray-900 sm:mb-0">
					{selectedCookbook.name} Recipes
				</h2>
				<button
					onclick={() => addRecipe(selectedCookbook.id)}
					class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					<Plus class="w-5 h-5 mr-2" />
					Add Recipe
				</button>
			</div>
			<div class="mt-6 overflow-hidden bg-white shadow sm:rounded-md">
				<ul class="divide-y divide-gray-200">
					{#each selectedCookbook.recipes as recipe (recipe.id)}
						<li class="hover:bg-gray-50">
							<div class="flex items-center px-4 py-4 sm:px-6">
								<div class="flex-1 min-w-0">
									<div class="flex items-center">
										<p class="text-sm font-medium text-indigo-600 truncate">{recipe.name}</p>
									</div>
									<div class="mt-2">
										<p class="text-sm text-gray-500">{recipe.description}</p>
									</div>
								</div>
								<div class="flex flex-shrink-0 ml-5 space-x-4">
									<button
										onclick={() => editRecipe(recipe)}
										class="text-gray-500 hover:text-gray-700 focus:outline-none"
										title="Edit Recipe"
									>
										<Edit class="w-5 h-5" />
									</button>
									<button
										onclick={() => deleteRecipe(recipe.id)}
										class="text-red-500 hover:text-red-700 focus:outline-none"
										title="Delete Recipe"
									>
										<Trash2 class="w-5 h-5" />
									</button>
								</div>
							</div>
						</li>
					{/each}
					{#if selectedCookbook.recipes.length === 0}
						<li class="py-4 text-center text-gray-500">No recipes found in this cookbook.</li>
					{/if}
				</ul>
			</div>
		</div>
	{/if}
</div>

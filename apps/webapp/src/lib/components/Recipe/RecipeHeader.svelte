<script lang="ts">
	import { Plus, Search } from 'lucide-svelte';

	interface Props {
		addRecipe: () => void;
		searchTerm: string;
	}

	let { addRecipe, searchTerm = $bindable() }: Props = $props();
</script>

<div class="flex flex-col items-center justify-between mb-6 md:flex-row">
	<h1 class="mb-4 text-3xl font-bold text-gray-800 md:mb-0">Recipes</h1>
	<button
		onclick={addRecipe}
		class="inline-flex items-center px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
	>
		<Plus class="w-5 h-5 mr-2" />
		Add Recipe
	</button>
</div>

<div class="mb-6">
	<div class="relative">
		<Search class="absolute w-5 h-5 text-gray-400 top-3 left-3" />
		<input
			type="text"
			bind:value={searchTerm}
			placeholder="Search by name or description..."
			class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
		/>
	</div>
</div>

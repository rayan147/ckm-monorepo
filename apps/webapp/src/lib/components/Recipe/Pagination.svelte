<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ChevronRight } from 'lucide-svelte';

	interface Props {
		currentPage?: number;
		totalPages?: number;
	}

	let { currentPage = 1, totalPages = 1 }: Props = $props();

	const dispatch = createEventDispatcher();

	function pageChange(page: number) {
		dispatch('pageChange', page);
	}
</script>

<div class="flex items-center justify-between mt-4">
	<button
		onclick={() => pageChange(Math.max(currentPage - 1, 1))}
		disabled={currentPage === 1}
		class="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
	>
		<ChevronRight class="inline-block w-4 h-4 mr-1 transform rotate-180" />
		Previous
	</button>

	<div class="flex items-center space-x-2">
		{#each Array(totalPages) as _, index}
			<button
				onclick={() => pageChange(index + 1)}
				class={`px-3 py-1 text-sm font-medium rounded-md focus:outline-none ${
					currentPage === index + 1
						? 'bg-indigo-600 text-white'
						: 'bg-white text-gray-700 hover:bg-gray-50'
				}`}
			>
				{index + 1}
			</button>
		{/each}
	</div>

	<button
		onclick={() => pageChange(Math.min(currentPage + 1, totalPages))}
		disabled={currentPage === totalPages}
		class="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
	>
		Next
		<ChevronRight class="inline-block w-4 h-4 ml-1" />
	</button>
</div>

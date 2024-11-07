<script>
	import '../../app.css';
	import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();

	onMount(() => {
		// Initialize authentication state
		auth.init();
	});

	const queryClient = new QueryClient();
</script>

<div class="flex h-screen bg-gray-100">
	<Sidebar />
	<div class="flex flex-col flex-1 overflow-hidden">
		<Header />
		<main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
			<div class="container px-6 py-8 mx-auto">
				<QueryClientProvider client={queryClient}>
					{@render children?.()}
				</QueryClientProvider>
			</div>
		</main>
	</div>
</div>

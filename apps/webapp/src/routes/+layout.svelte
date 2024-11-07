<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth';
	import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';
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

<QueryClientProvider client={queryClient}>
	{@render children?.()}
</QueryClientProvider>

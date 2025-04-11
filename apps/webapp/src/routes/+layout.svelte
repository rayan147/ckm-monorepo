<script>
  import { onMount } from 'svelte';
  import '../app.css';
  import { QueryClientProvider } from '@tanstack/svelte-query';
  import { getAuthConext } from '$lib/contexts/auth-context.svelte';

  const authState = getAuthConext();
  let { children, data } = $props();
  onMount(() => {
    console.log(authState);
    authState.initialize().catch((error) => {
      console.error('Failed to initialize auth store:', error);
    });
  });
</script>

<QueryClientProvider client={data.queryClient}>
  {@render children?.()}
</QueryClientProvider>

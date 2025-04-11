<script>
  import '../../app.css';
  import '$lib/styles/sidebar-theme.css';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import AppSidebar from '$lib/components/domain/nav/sidebar.svelte';
  import { Toaster } from '$lib/components/ui/sonner';
  import { ThemeProvider } from '@sejohnson/svelte-themes';

  let { children } = $props();
</script>

<ThemeProvider>
  <div class="flex h-screen">
    <Sidebar.Provider>
      <AppSidebar />
      <div class="flex flex-col flex-1 overflow-hidden">
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-white-200">
          <Sidebar.Trigger class="mb-4" />
          <div class="container px-6 py-8 mx-auto">
            <Toaster position="top-right" />
            {@render children?.()}
          </div>
        </main>
      </div>
    </Sidebar.Provider>
  </div>
</ThemeProvider>

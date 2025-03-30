<script>
  import '../../app.css';
  import Header from '$lib/components/Header.svelte';
  import Sidebar from '$lib/components/Navbar/Sidebar.svelte';
  import { Toaster } from '$lib/components/ui/sonner';

  let { children } = $props();
</script>

<div class="flex h-screen">
  <Sidebar />
  <div class="flex flex-col flex-1 overflow-hidden">
    <Header />
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-white-200 rounded-lg">
      <div class="container px-6 py-8 mx-auto rounded-lg">
        <Toaster />
        {@render children?.()}
      </div>
    </main>
  </div>
</div>

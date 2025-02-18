<script>
  import '../../app.css';
  import Header from '$lib/components/Header.svelte';
  import Sidebar from '$lib/components/Navbar/Sidebar.svelte';

  let { children } = $props();
</script>

<div class="flex h-screen bg-gray-100">
  <Sidebar />
  <div class="flex flex-col flex-1 overflow-hidden">
    <Header />
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div class="container px-6 py-8 mx-auto">
        {@render children?.()}
      </div>
    </main>
  </div>
</div>

<!-- lib/components/Navbar.svelte -->
<script lang="ts">
  import Chef from '$lib/images/chef.svelte';
  const auth = {
    user: {
      firstName: 'Rayan'
    },
    logout: async () => {
      console.log(`logging out`);
    }
  };
</script>

<nav class="bg-white shadow-sm">
  <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex">
        <div class="flex items-center flex-shrink-0">
          <div class="w-auto h-10"><Chef /></div>
        </div>
      </div>
      <div class="flex items-center">
        <a
          href="#email-form"
          class="px-3 py-2 text-sm font-medium text-gray-800 rounded-md hover:text-gray-600"
          >Product Demo</a
        >
        {#if auth}
          <p class="px-3 py-2 text-sm font-medium text-gray-800 rounded-md hover:text-gray-600">
            Welcome, {auth.user?.firstName}
          </p>
          <button
            class="px-3 py-2 text-sm font-medium text-gray-800 rounded-md hover:text-gray-600"
            onclick={() => auth.logout()}>Logout</button
          >
        {:else}
          <a
            href="/login"
            class="px-3 py-2 text-sm font-medium text-gray-800 rounded-md hover:text-gray-600"
            >Login</a
          >
        {/if}
        <a
          href="/register"
          class="px-3 py-2 text-sm font-medium text-gray-800 rounded-md hover:text-gray-600"
          >Sign up</a
        >
      </div>
    </div>
  </div>
</nav>

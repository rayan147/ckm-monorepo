<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import Chef from '$lib/images/chef.svelte';
  import LoginForm from './login-form.svelte';
  import RegistrationForm from './registration-form.svelte';
  import { ArrowLeft } from 'lucide-svelte';

  // Get form data from page props
  let { form } = $props();

  // Get auth type from route params
  const authType = $state(page.params.authType);

  // Check for registration success message for login page
  const registered = page.url.searchParams.get('registered') === 'true';

  // Helper to determine page title
  const getPageTitle = () => {
    switch (authType) {
      case 'login':
        return 'Welcome Back';
      case 'register':
        return 'Create Your Account';
      default:
        return 'Authentication';
    }
  };

  // Handle back button navigation
  function handleBackClick() {
    goto('/');
  }
</script>

<header class="bg-gray-50 h-16 flex items-center">
  <nav>
    <button
      class="ml-6 p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
      onclick={handleBackClick}
      aria-label="Go back to home page"
    >
      <ArrowLeft class="h-5 w-5 text-gray-700" />
    </button>
  </nav>
</header>

<main class="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50">
  <section
    class="{authType === 'register'
      ? 'w-full max-w-4xl'
      : 'w-full max-w-lg'} p-8 bg-white rounded-xl shadow-lg space-y-6 mx-4 my-8 transition-all"
  >
    <header class="flex flex-col items-center mb-8">
      <div class="mb-6">
        <Chef class="h-20 w-20" />
      </div>
      <h1 class="text-2xl font-bold text-center text-gray-900">{getPageTitle()}</h1>
    </header>

    {#if authType === 'login' && registered}
      <div class="p-4 mb-6 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
        <div class="flex items-center">
          <svg
            class="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>Registration successful! Please log in with your new account.</span>
        </div>
      </div>
    {/if}

    {#if authType === 'login'}
      <LoginForm {form} />
    {:else if authType === 'register'}
      <div class="p-2 w-full">
        <RegistrationForm />
      </div>
    {:else}
      <div class="text-center text-gray-700 space-y-4">
        <p>Invalid authentication type.</p>
        <nav class="mt-6 space-x-4">
          <a
            href="/login"
            class="inline-block px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
            >Login</a
          >
          <a
            href="/register"
            class="inline-block px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
            >Register</a
          >
        </nav>
      </div>
    {/if}
  </section>
</main>

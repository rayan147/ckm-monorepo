<script lang="ts">
  import { page } from '$app/state';
  import LoginForm from './login-form.svelte';
  import RegistrationForm from './registraction-form.svelte';
  import Chef from '$lib/images/chef.svelte';
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  // Get form data from page props
  let { form } = $props();

  // Get auth type from route params
  const authType = page.params.authType;

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

  let dialogOpen = $state(authType === 'register');
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-50">
  <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
    <div class="flex justify-center mb-6">
      <Chef />
    </div>

    <h2 class="mb-6 text-2xl font-bold text-center text-gray-900">{getPageTitle()}</h2>

    {#if authType === 'login' && registered}
      <div class="p-4 mb-6 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
        Registration successful! Please log in with your new account.
      </div>
    {/if}

    {#if authType === 'login'}
      <LoginForm {form} />
    {:else if authType === 'register'}
      <AlertDialog.Root open={dialogOpen} onOpenChange={(v) => (dialogOpen = v)}>
        <AlertDialog.Content class="max-w-3xl overflow-y-auto max-h-[90vh]">
          <AlertDialog.Header>
            <AlertDialog.Title>Create Your Account</AlertDialog.Title>
            <AlertDialog.Description>
              Please complete all steps to create your account.
            </AlertDialog.Description>
          </AlertDialog.Header>

          <div class="p-4">
            <RegistrationForm />
          </div>

          <AlertDialog.Footer>
            <AlertDialog.Cancel>Close</AlertDialog.Cancel>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <div class="text-center">
        <p class="mb-4">Start your registration process by clicking the button below.</p>
        <Button
          onclick={(v) => (dialogOpen = v)}
          class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
        >
          Start Registration
        </Button>
      </div>
    {:else}
      <div class="text-center text-gray-700">
        <p>Invalid authentication type.</p>
        <div class="mt-4 space-x-4">
          <a href="/login" class="text-indigo-600 hover:underline">Login</a>
          <a href="/register" class="text-indigo-600 hover:underline">Register</a>
        </div>
      </div>
    {/if}
  </div>
</div>

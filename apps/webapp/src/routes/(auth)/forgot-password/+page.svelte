<script lang="ts">
  import { enhance } from '$app/forms';
  import Chef from '$lib/images/chef.svelte';
  import type { SubmitFunction } from '@sveltejs/kit';

  let email = $state('');
  let submitting = $state(false);
  let success = $state(false);
  let error = $state('');

  const handleEnhance: SubmitFunction = () => {
    submitting = true;
    error = '';
    return async ({ result, update }) => {
      submitting = false;
      if (result.type === 'success') {
        success = true;
      } else if (result.type === 'failure') {
        error = result.data?.message || 'An error occurred. Please try again.';
      }
      await update();
    };
  };
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
    <div class="flex justify-center mb-6">
      <Chef />
    </div>
    <h2 class="mb-6 text-2xl font-bold text-center text-gray-900">Forgot Password</h2>

    {#if success}
      <div class="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
        Password reset instructions have been sent to your email.
      </div>
    {:else}
      {#if error}
        <div class="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
          {error}
        </div>
      {/if}

      <form method="POST" use:enhance={handleEnhance} action="?/forgotPassword" class="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            bind:value={email}
            placeholder="Enter your email address"
            required
            class="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          disabled={submitting}
        >
          {submitting ? 'Sending...' : 'Send Reset Instructions'}
        </button>
      </form>

      <p class="mt-4 text-sm text-center">
        Remember your password? <a href="/login" class="text-indigo-600 hover:underline">Sign in</a>
      </p>
    {/if}
  </div>
</div>

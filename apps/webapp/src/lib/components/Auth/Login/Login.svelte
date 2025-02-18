<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import type { SubmitFunction } from '@sveltejs/kit';

  interface Props {
    form: any;
  }

  interface ActionResult {
    type: 'success' | 'failure';
    data?: {
      actionType?: string;
      type?: string;
      message?: string;
      step?: number;
      email?: string;
      user?: any;
      location?: string;
    };
  }

  let { form }: Props = $props();

  let step = $state(form?.step || 1);
  let email = $state('');
  let password = $state('');
  let code = $state('');
  let submitting = $state(false);
  let error = $state('');

  const handleError = (result: ActionResult) => {
    error = result.data?.message || 'An error occurred. Please try again.';
  };

  const handleLoginSuccess = (result: ActionResult) => {
    if (result.data?.step) {
      step = result.data.step;
      email = result.data.email || '';
    }
  };

  const handleVerifySuccess = async (result: ActionResult) => {
    const { data } = result;
    if (data?.type === 'success' && data?.location && data?.user) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          isAuthenticated: true,
          username: `${data.user.firstName}${data.user.lastName}`
        })
      );
      email = data.email || '';
      await goto(data.location);
    }
  };

  const handleResendCodeSuccess = () => {
    error = 'Verification code has been resent to your email.';
  };

  const handleEnhance: SubmitFunction = (event) => {
    submitting = true;
    error = '';

    return async ({ result, update }) => {
      submitting = false;

      if (result.type === 'failure') {
        handleError(result);
        await update();
        return;
      }

      switch (result.data?.actionType) {
        case 'resendCode':
          handleResendCodeSuccess();
          break;
        case 'verify':
          await handleVerifySuccess(result);
          break;
        default:
          handleLoginSuccess(result);
      }

      await update();
    };
  };
</script>

<h2 class="mb-6 text-2xl font-bold text-center text-gray-900">
  {step === 1 ? 'Sign in to your account' : 'Enter Verification Code'}
</h2>

{#if error}
  <div class="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
    {error}
  </div>
{/if}

{#if step === 1}
  <!-- Login Form -->
  <form method="POST" action="?/login" use:enhance={handleEnhance} class="space-y-4">
    <div>
      <input
        type="email"
        name="email"
        bind:value={email}
        placeholder="Email address"
        required
        class="w-full px-3 py-2 border rounded-md"
      />
    </div>
    <div>
      <input
        type="password"
        name="password"
        bind:value={password}
        placeholder="Password"
        required
        class="w-full px-3 py-2 border rounded-md"
      />
    </div>
    <div class="flex items-center justify-between text-sm">
      <label class="flex items-center">
        <input type="checkbox" name="remember-me" class="mr-2" />
        Remember me
      </label>
      <a href="/forgot-password" class="text-indigo-600 hover:underline">Forgot password?</a>
    </div>
    <button
      type="submit"
      class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      disabled={submitting}
    >
      {submitting ? 'Processing...' : 'Sign in'}
    </button>
  </form>
  <p class="mt-4 text-sm text-center">
    Don't have an account?
    <a href="/register" class="text-indigo-600 hover:underline">Create one</a>
  </p>
{:else if step === 2}
  <!-- Verify Code Form -->
  <form method="POST" action="?/verify" use:enhance={handleEnhance} class="space-y-4">
    <input
      type="text"
      name="code"
      bind:value={code}
      placeholder="Enter verification code"
      class="w-full px-3 py-2 border rounded-md"
    />
    <input type="hidden" name="email" value={email} />

    <button
      type="submit"
      class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      disabled={submitting}
    >
      {submitting ? 'Processing...' : 'Verify Code'}
    </button>
  </form>

  <!-- Resend Code Form -->
  <form method="POST" action="?/resendCode" use:enhance={handleEnhance} class="mt-4">
    <input type="hidden" name="email" value={email} />
    <button
      type="submit"
      class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      disabled={submitting}
    >
      Resend Code
    </button>
  </form>
{/if}

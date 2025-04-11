<script lang="ts">
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Alert, AlertDescription } from '$lib/components/ui/alert';
  import { z } from 'zod';
  import * as InputOTP from '$lib/components/ui/input-otp';
  import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'bits-ui';
  import { page } from '$app/state';
  import { getAuthConext } from '$lib/contexts/auth-context.svelte';
  import { goto } from '$app/navigation';
  const authState = getAuthConext();
  console.log({ authState });
  let { form } = $props();

  let currentStep = $state(form?.step || 1);

  let email = $state('');
  let password = $state('');
  let verificationCode = $state('');
  const returnUrl = $derived(page.url.searchParams.get('returnUrl') || '');

  let submitting = $state(false);
  let error = $state('');
  let resendingCode = $state(false);

  let loggedOutMessage = $derived(
    page.url.searchParams.get('logged_out') === 'true'
      ? 'You have been successfully logged out.'
      : ''
  );

  const emailSchema = z.string().email('Please enter a valid email address');
  const passwordSchema = z.string().min(10, 'Password must be at least 10 characters');
  const verificationCodeSchema = z.string().length(6, 'Verification code must be exactly 6 digits');

  let errors = $state({
    email: '',
    password: '',
    verificationCode: ''
  });

  const _ = $derived.by(() => {
    if (form?.data) {
      currentStep = form.data.step || currentStep;
      error = form.message || '';
    }
    return null;
  });

  function validateEmail() {
    const result = emailSchema.safeParse(email);
    errors.email = result.success ? '' : result.error.format()._errors[0];
    return result.success;
  }

  function validatePassword() {
    const result = passwordSchema.safeParse(password);
    errors.password = result.success ? '' : result.error.format()._errors[0];
    return result.success;
  }

  function validateCode() {
    const result = verificationCodeSchema.safeParse(verificationCode);
    errors.verificationCode = result.success ? '' : result.error.format()._errors[0];
    return result.success;
  }

  // Form submission handlers
  const handleLoginSubmit: SubmitFunction = () => {
    if (!validateEmail() || !validatePassword()) {
      return;
    }

    submitting = true;
    error = '';

    return async ({ result, update }) => {
      submitting = false;

      if (result.type === 'redirect') {
        // Will be handled by SvelteKit
      } else if (result.type === 'success') {
        if (result.data?.step === 2) {
          currentStep = 2;
        }
      } else if (result.type === 'failure') {
        error = result.data?.message || 'Login failed. Please try again.';
      }

      await update();
    };
  };

  const handleVerifySubmit: SubmitFunction = () => {
    if (!validateCode()) {
      return;
    }

    submitting = true;
    error = '';

    return async ({ result, update }) => {
      submitting = false;

      if (result.type === 'success') {
        authState.initialize();

        if (result.data?.location) {
          goto(result.data.location, { replaceState: false });
        }
      } else if (result.type === 'failure') {
        error = result.data?.message || 'Verification failed. Please try again.';
      }

      await update();
    };
  };

  const handleResendCode: SubmitFunction = () => {
    resendingCode = true;
    error = '';

    return async ({ result, update }) => {
      resendingCode = false;

      if (result.type === 'success') {
        error = '';
      } else if (result.type === 'failure') {
        error = result.data?.message || 'Failed to resend code. Please try again.';
      }

      await update();
    };
  };

  let verifyFormElement: HTMLFormElement | null = $state(null);

  function handleOTPComplete(value: string) {
    verificationCode = value;

    if (validateCode()) {
      if (verifyFormElement) {
        submitting = true;
        verifyFormElement.submit();
      }
    }
  }
</script>

{#if loggedOutMessage}
  <Alert class="mb-4">
    <AlertDescription>{loggedOutMessage}</AlertDescription>
  </Alert>
{/if}

{#if currentStep === 1}
  <form method="POST" action="?/login" use:enhance={handleLoginSubmit} class="space-y-4">
    <div class="space-y-2">
      <Label for="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        bind:value={email}
        onblur={validateEmail}
        placeholder="Email Address"
        autocomplete="email"
        required
        aria-invalid={errors.email ? 'true' : undefined}
      />
      {#if errors.email}
        <p class="text-sm text-red-500">{errors.email}</p>
      {/if}
    </div>

    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <Label for="password">Password</Label>
        <a href="/forgot-password" class="text-sm text-indigo-600 hover:text-indigo-500">
          Forgot password?
        </a>
      </div>
      <Input
        id="password"
        name="password"
        type="password"
        bind:value={password}
        onblur={validatePassword}
        placeholder="Password"
        autocomplete="current-password"
        required
        aria-invalid={errors.password ? 'true' : undefined}
      />
      {#if errors.password}
        <p class="text-sm text-red-500">{errors.password}</p>
      {/if}
    </div>

    {#if error}
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    {/if}

    <!-- Include the return URL if it exists -->
    {#if returnUrl}
      <input type="hidden" name="returnUrl" value={returnUrl} />
    {/if}

    <Button type="submit" class="w-full" disabled={submitting}>
      {#if submitting}
        <span>Logging in...</span>
      {:else}
        <span>Log in</span>
      {/if}
    </Button>

    <p class="text-sm text-center text-gray-500">
      Don't have an account?

      <a
        href="/register"
        data-sveltekit-reload
        class="font-medium text-indigo-600 hover:text-indigo-500">Register</a
      >
    </p>
  </form>
{:else if currentStep === 2}
  <div class="space-y-6">
    <header class="text-center space-y-2 mb-6">
      <h3 class="text-lg font-medium">Verification Code</h3>
      <p class="text-sm text-gray-500">
        We've sent a verification code to your email. Please enter it below to continue.
      </p>
    </header>

    <!-- Bind the actual form element here -->
    <form
      method="POST"
      action="?/verify"
      use:enhance={handleVerifySubmit}
      class="space-y-4"
      bind:this={verifyFormElement}
    >
      <div class="flex justify-center space-y-2">
        <Label for="code" class="sr-only">6-Digit Code</Label>

        <!-- Hidden input to actually submit the form value -->
        <input type="hidden" name="code" value={verificationCode} />

        <!-- Pass the returnUrl to the verification endpoint as well -->
        {#if returnUrl}
          <input type="hidden" name="returnUrl" value={returnUrl} />
        {/if}

        <!-- OTP Input Component -->
        <InputOTP.Root
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          maxlength={6}
          value={verificationCode}
          onComplete={handleOTPComplete}
          onValueChange={(value) => {
            verificationCode = value;
            // Clear validation errors as user types
            if (errors.verificationCode) errors.verificationCode = '';
          }}
        >
          {#snippet children({ cells })}
            <InputOTP.Group>
              {#each cells.slice(0, 2) as cell (cell)}
                <InputOTP.Slot {cell} />
              {/each}
            </InputOTP.Group>
            <InputOTP.Separator />
            <InputOTP.Group>
              {#each cells.slice(2, 4) as cell (cell)}
                <InputOTP.Slot {cell} />
              {/each}
            </InputOTP.Group>
            <InputOTP.Separator />
            <InputOTP.Group>
              {#each cells.slice(4, 6) as cell (cell)}
                <InputOTP.Slot {cell} />
              {/each}
            </InputOTP.Group>
          {/snippet}
        </InputOTP.Root>

        {#if errors.verificationCode}
          <p class="text-sm text-red-500">{errors.verificationCode}</p>
        {/if}
      </div>

      {#if error}
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      {/if}
    </form>

    <div class="text-center">
      <form method="POST" action="?/resendCode" use:enhance={handleResendCode}>
        <Button
          type="submit"
          variant="link"
          disabled={resendingCode}
          class="text-sm text-indigo-600 hover:text-indigo-500"
        >
          {#if resendingCode}
            <span>Sending...</span>
          {:else}
            <span>Didn't receive a code? Resend</span>
          {/if}
        </Button>
      </form>
    </div>
  </div>
{/if}

<script lang="ts">
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Card } from '$lib/components/ui/card';
  import { Alert, AlertDescription } from '$lib/components/ui/alert';
  import { z } from 'zod';

  let { form } = $props();

  // Login steps
  let currentStep = $state(form?.step || 1);

  // Form data
  let email = $state('');
  let password = $state('');
  let verificationCode = $state('');

  // Form state
  let submitting = $state(false);
  let error = $state('');
  let resendingCode = $state(false);

  // Validation schemas
  const emailSchema = z.string().email('Please enter a valid email address');
  const passwordSchema = z.string().min(10, 'Password must be at least 10 characters');
  const verificationCodeSchema = z.string().length(6, 'Verification code must be exactly 6 digits');

  // Validation state
  let errors = $state({
    email: '',
    password: '',
    verificationCode: ''
  });

  // Update form data when server responds
  $effect(() => {
    if (form?.data) {
      // Update step based on server response
      currentStep = form.data.step || currentStep;
      error = form.message || '';
    }
  });

  // Validate fields on blur
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
      return { cancel: true };
    }

    submitting = true;
    error = '';

    return async ({ result, update }) => {
      submitting = false;

      if (result.type === 'redirect') {
        // Will be handled by SvelteKit
      } else if (result.type === 'success') {
        if (result.data.step === 2) {
          currentStep = 2;
        }
      } else if (result.type === 'failure') {
        error = result.data.message || 'Login failed. Please try again.';
      }

      await update();
    };
  };

  const handleVerifySubmit: SubmitFunction = () => {
    if (!validateCode()) {
      return { cancel: true };
    }

    submitting = true;
    error = '';

    return async ({ result, update }) => {
      submitting = false;

      if (result.type === 'redirect') {
        // Will be handled by SvelteKit
      } else if (result.type === 'success') {
        if (result.data.location) {
          window.location.href = result.data.location;
        }
      } else if (result.type === 'failure') {
        error = result.data.message || 'Verification failed. Please try again.';
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
        error = result.data.message || 'Failed to resend code. Please try again.';
      }

      await update();
    };
  };
</script>

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

    <Button type="submit" class="w-full" disabled={submitting}>
      {submitting ? 'Logging in...' : 'Log in'}
    </Button>

    <p class="text-sm text-center text-gray-500">
      Don't have an account?
      <a href="/register" class="font-medium text-indigo-600 hover:text-indigo-500"> Register </a>
    </p>
  </form>
{:else if currentStep === 2}
  <div class="space-y-6">
    <div class="text-center space-y-2 mb-6">
      <h3 class="text-lg font-medium">Verification Code</h3>
      <p class="text-sm text-gray-500">
        We've sent a verification code to your email. Please enter it below to continue.
      </p>
    </div>

    <form method="POST" action="?/verify" use:enhance={handleVerifySubmit} class="space-y-4">
      <div class="space-y-2">
        <Label for="code">6-Digit Code</Label>
        <Input
          id="code"
          name="code"
          type="text"
          inputmode="numeric"
          pattern="[0-9]{6}"
          bind:value={verificationCode}
          onblur={validateCode}
          placeholder="Enter 6-digit code"
          maxlength="6"
          required
          aria-invalid={errors.verificationCode ? 'true' : undefined}
        />
        {#if errors.verificationCode}
          <p class="text-sm text-red-500">{errors.verificationCode}</p>
        {/if}
      </div>

      {#if error}
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      {/if}

      <Button type="submit" class="w-full" disabled={submitting}>
        {submitting ? 'Verifying...' : 'Verify Code'}
      </Button>
    </form>

    <div class="text-center">
      <form method="POST" action="?/resendCode" use:enhance={handleResendCode}>
        <Button
          type="submit"
          variant="link"
          disabled={resendingCode}
          class="text-sm text-indigo-600 hover:text-indigo-500"
        >
          {resendingCode ? 'Sending...' : "Didn't receive a code? Resend"}
        </Button>
      </form>
    </div>
  </div>
{/if}

<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { z } from 'zod';
  import { Mail, Lock, Eye, EyeOff } from 'lucide-svelte';

  let { formData = $bindable() } = $props();

  // Validation schema
  const schema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z.string().min(10, { message: 'Password must be at least 10 characters' })
  });

  // Validation state
  let errors = $state({
    email: '',
    password: ''
  });

  // Password visibility toggle
  let showPassword = $state(false);
  const togglePasswordVisibility = () => {
    showPassword = !showPassword;
  };

  // Validate on blur
  function validateEmail() {
    const result = schema.shape.email.safeParse(formData.email);
    errors.email = result.success ? '' : result.error.format()._errors[0];
  }

  function validatePassword() {
    const result = schema.shape.password.safeParse(formData.password);
    errors.password = result.success ? '' : result.error.format()._errors[0];

    // Also update auth
    if (result.success) {
      formData.auth.passwordHash = formData.password;
    }
  }

  // Perform validation on enter key press
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      validateEmail();
      validatePassword();
    }
  }
</script>

<section class="space-y-5">
  <div class="space-y-2">
    <Label for="email" class="font-medium text-gray-700">Email Address</Label>
    <div class="relative">
      <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Mail class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </span>
      <Input
        id="email"
        type="email"
        placeholder="Your email address"
        bind:value={formData.email}
        onblur={validateEmail}
        onkeydown={handleKeyDown}
        class={errors.email
          ? 'border-red-500'
          : 'pl-10 focus:ring-indigo-500 focus:border-indigo-500'}
        aria-invalid={errors.email ? 'true' : undefined}
      />
    </div>
    {#if errors.email}
      <p class="text-sm text-red-600 mt-1 flex items-center" role="alert">
        <svg
          class="w-4 h-4 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        {errors.email}
      </p>
    {/if}
  </div>

  <div class="space-y-2">
    <Label for="password" class="font-medium text-gray-700">Password</Label>
    <div class="relative">
      <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Lock class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </span>
      <Input
        id="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Minimum 10 characters"
        bind:value={formData.password}
        onblur={validatePassword}
        onkeydown={handleKeyDown}
        class={errors.email
          ? 'border-red-500'
          : 'pl-10 focus:ring-indigo-500 focus:border-indigo-500'}
        aria-invalid={errors.password ? 'true' : undefined}
      />
      <button
        type="button"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
        onclick={togglePasswordVisibility}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {#if showPassword}
          <EyeOff class="h-5 w-5" aria-hidden="true" />
        {:else}
          <Eye class="h-5 w-5" aria-hidden="true" />
        {/if}
      </button>
    </div>
    {#if errors.password}
      <p class="text-sm text-red-600 mt-1 flex items-center" role="alert">
        <svg
          class="w-4 h-4 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        {errors.password}
      </p>
    {:else}
      <p class="text-xs text-gray-500 mt-1" id="password-hint">
        Your password must be at least 10 characters long.
      </p>
    {/if}
  </div>

  <div class="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
    <h2 class="text-sm font-medium text-gray-700 mb-2">Password strength:</h2>
    <div
      class="w-full bg-gray-200 rounded-full h-2"
      role="progressbar"
      aria-valuenow={Math.min(100, (formData.password.length / 12) * 100)}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class={`h-2 rounded-full ${formData.password.length >= 10 ? 'bg-green-500' : formData.password.length >= 6 ? 'bg-yellow-500' : 'bg-red-500'}`}
        style={`width: ${Math.min(100, (formData.password.length / 12) * 100)}%`}
      ></div>
    </div>
    <ul class="mt-2 text-xs space-y-1" aria-labelledby="password-requirements">
      <li
        class={`flex items-center ${formData.password.length >= 10 ? 'text-green-600' : 'text-gray-500'}`}
      >
        <svg
          class={`w-3.5 h-3.5 mr-2 ${formData.password.length >= 10 ? 'text-green-600' : 'text-gray-400'}`}
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
        <span>At least 10 characters</span>
      </li>
      <li
        class={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}
      >
        <svg
          class={`w-3.5 h-3.5 mr-2 ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}
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
        <span>Contains uppercase letter</span>
      </li>
      <li
        class={`flex items-center ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}
      >
        <svg
          class={`w-3.5 h-3.5 mr-2 ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}
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
        <span>Contains number</span>
      </li>
    </ul>
  </div>
</section>

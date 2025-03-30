<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { z } from 'zod';

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

  // Validate on blur
  function validateEmail() {
    const result = schema.shape.email.safeParse(formData.email);
    errors.email = result.success ? '' : result.error.format()._errors[0];
  }

  function validatePassword() {
    const result = schema.shape.password.safeParse(formData.password);
    errors.password = result.success ? '' : result.error.format()._errors[0];
  }
</script>

<div class="space-y-4">
  <div class="space-y-2">
    <Label for="email">Email</Label>
    <Input
      id="email"
      type="email"
      placeholder="Email address"
      bind:value={formData.email}
      onblur={validateEmail}
      aria-invalid={errors.email ? 'true' : undefined}
    />
    {#if errors.email}
      <p class="text-sm text-red-500">{errors.email}</p>
    {/if}
  </div>

  <div class="space-y-2">
    <Label for="password">Password</Label>
    <Input
      id="password"
      type="password"
      placeholder="Password (min. 10 characters)"
      bind:value={formData.password}
      onblur={validatePassword}
      aria-invalid={errors.password ? 'true' : undefined}
    />
    {#if errors.password}
      <p class="text-sm text-red-500">{errors.password}</p>
    {/if}
  </div>
</div>

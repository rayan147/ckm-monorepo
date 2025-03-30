<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { z } from 'zod';

  let { formData = $bindable() } = $props();

  // Validation schema
  const schema = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' })
  });

  // Validation state
  let errors = $state({
    firstName: '',
    lastName: ''
  });

  // Validate on blur
  function validateFirstName() {
    const result = schema.shape.firstName.safeParse(formData.firstName);
    errors.firstName = result.success ? '' : result.error.format()._errors[0];
  }

  function validateLastName() {
    const result = schema.shape.lastName.safeParse(formData.lastName);
    errors.lastName = result.success ? '' : result.error.format()._errors[0];
  }
</script>

<div class="space-y-4">
  <div class="space-y-2">
    <Label for="firstName">First Name</Label>
    <Input
      id="firstName"
      type="text"
      placeholder="First Name"
      bind:value={formData.firstName}
      onblur={validateFirstName}
      aria-invalid={errors.firstName ? 'true' : undefined}
    />
    {#if errors.firstName}
      <p class="text-sm text-red-500">{errors.firstName}</p>
    {/if}
  </div>

  <div class="space-y-2">
    <Label for="lastName">Last Name</Label>
    <Input
      id="lastName"
      type="text"
      placeholder="Last Name"
      bind:value={formData.lastName}
      onblur={validateLastName}
      aria-invalid={errors.lastName ? 'true' : undefined}
    />
    {#if errors.lastName}
      <p class="text-sm text-red-500">{errors.lastName}</p>
    {/if}
  </div>

  <div class="flex items-center space-x-2 pt-4">
    <Checkbox id="isOrganization" bind:checked={formData.isOrganization} />
    <Label
      for="isOrganization"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      I represent an organization with multiple restaurants
    </Label>
  </div>
</div>

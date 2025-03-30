<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { z } from 'zod';

  let { formData = $bindable() } = $props();

  // Ensure there's at least one restaurant
  if (!formData.restaurantsInput || !formData.restaurantsInput[0]) {
    formData.restaurantsInput = [
      {
        name: '',
        imageUrl: '',
        address: '',
        city: '',
        zipCode: '',
        state: '',
        owner: ''
      }
    ];
  }

  // Validation schema
  const restaurantSchema = z.object({
    name: z.string().min(1, { message: 'Restaurant name is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    zipCode: z.string().min(1, { message: 'Zip code is required' }),
    owner: z.string().min(1, { message: 'Owner name is required' })
  });

  // Validation state
  let errors = $state({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    owner: ''
  });

  // Validate fields on blur
  function validateField(field: keyof typeof errors) {
    const value = formData.restaurantsInput[0][field];
    const fieldSchema = restaurantSchema.shape[field];
    const result = fieldSchema.safeParse(value);
    errors[field] = result.success ? '' : result.error.format()._errors[0];
  }
</script>

<div class="space-y-4">
  <div class="space-y-2">
    <Label for="restaurantName">Restaurant Name</Label>
    <Input
      id="restaurantName"
      type="text"
      placeholder="Restaurant Name"
      bind:value={formData.restaurantsInput[0].name}
      onblur={() => validateField('name')}
      aria-invalid={errors.name ? 'true' : undefined}
    />
    {#if errors.name}
      <p class="text-sm text-red-500">{errors.name}</p>
    {/if}
  </div>

  <div class="space-y-2">
    <Label for="address">Street Address</Label>
    <Input
      id="address"
      type="text"
      placeholder="Street Address"
      bind:value={formData.restaurantsInput[0].address}
      onblur={() => validateField('address')}
      aria-invalid={errors.address ? 'true' : undefined}
    />
    {#if errors.address}
      <p class="text-sm text-red-500">{errors.address}</p>
    {/if}
  </div>

  <div class="grid grid-cols-2 gap-4">
    <div class="space-y-2">
      <Label for="city">City</Label>
      <Input
        id="city"
        type="text"
        placeholder="City"
        bind:value={formData.restaurantsInput[0].city}
        onblur={() => validateField('city')}
        aria-invalid={errors.city ? 'true' : undefined}
      />
      {#if errors.city}
        <p class="text-sm text-red-500">{errors.city}</p>
      {/if}
    </div>

    <div class="space-y-2">
      <Label for="state">State</Label>
      <Input
        id="state"
        type="text"
        placeholder="State"
        bind:value={formData.restaurantsInput[0].state}
        onblur={() => validateField('state')}
        aria-invalid={errors.state ? 'true' : undefined}
      />
      {#if errors.state}
        <p class="text-sm text-red-500">{errors.state}</p>
      {/if}
    </div>
  </div>

  <div class="grid grid-cols-2 gap-4">
    <div class="space-y-2">
      <Label for="zipCode">Zip Code</Label>
      <Input
        id="zipCode"
        type="text"
        placeholder="Zip Code"
        bind:value={formData.restaurantsInput[0].zipCode}
        onblur={() => validateField('zipCode')}
        aria-invalid={errors.zipCode ? 'true' : undefined}
      />
      {#if errors.zipCode}
        <p class="text-sm text-red-500">{errors.zipCode}</p>
      {/if}
    </div>

    <div class="space-y-2">
      <Label for="owner">Owner</Label>
      <Input
        id="owner"
        type="text"
        placeholder="Owner"
        bind:value={formData.restaurantsInput[0].owner}
        onblur={() => validateField('owner')}
        aria-invalid={errors.owner ? 'true' : undefined}
      />
      {#if errors.owner}
        <p class="text-sm text-red-500">{errors.owner}</p>
      {/if}
    </div>
  </div>
</div>

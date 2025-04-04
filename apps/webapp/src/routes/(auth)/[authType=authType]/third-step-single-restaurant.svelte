<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { z } from 'zod';
  import { Coffee, MapPin, Building, User } from 'lucide-svelte';

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

<section class="space-y-5">
  <header class="sr-only">
    <h2>Restaurant Information</h2>
  </header>

  <fieldset class="space-y-4">
    <legend class="sr-only">Restaurant Details</legend>

    <div class="space-y-2">
      <Label for="restaurantName" class="font-medium text-gray-700">Restaurant Name</Label>
      <div class="relative">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Coffee class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
        <Input
          id="restaurantName"
          type="text"
          placeholder="Restaurant Name"
          bind:value={formData.restaurantsInput[0].name}
          onblur={() => validateField('name')}
          class={errors.name
            ? 'border-red-500'
            : 'pl-10 focus:ring-indigo-500 focus:border-indigo-500'}
          aria-invalid={errors.name ? 'true' : undefined}
          aria-required="true"
        />
      </div>
      {#if errors.name}
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
          {errors.name}
        </p>
      {/if}
    </div>

    <div class="space-y-2">
      <Label for="address" class="font-medium text-gray-700">Street Address</Label>
      <div class="relative">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
        <Input
          id="address"
          type="text"
          placeholder="Street Address"
          bind:value={formData.restaurantsInput[0].address}
          onblur={() => validateField('address')}
          class={errors.address
            ? 'border-red-500'
            : 'pl-10 focus:ring-indigo-500 focus:border-indigo-500'}
          aria-invalid={errors.address ? 'true' : undefined}
          aria-required="true"
        />
      </div>
      {#if errors.address}
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
          {errors.address}
        </p>
      {/if}
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <Label for="city" class="font-medium text-gray-700">City</Label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Building class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
          <Input
            id="city"
            type="text"
            placeholder="City"
            bind:value={formData.restaurantsInput[0].city}
            onblur={() => validateField('city')}
            class={errors.city
              ? 'border-red-500'
              : 'pl-10 focus:ring-indigo-500 focus:border-indigo-500'}
            aria-invalid={errors.city ? 'true' : undefined}
            aria-required="true"
          />
        </div>
        {#if errors.city}
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
            {errors.city}
          </p>
        {/if}
      </div>

      <div class="space-y-2">
        <Label for="state" class="font-medium text-gray-700">State</Label>
        <Input
          id="state"
          type="text"
          placeholder="State"
          bind:value={formData.restaurantsInput[0].state}
          onblur={() => validateField('state')}
          class={errors.state ? 'border-red-500' : 'focus:ring-indigo-500 focus:border-indigo-500'}
          aria-invalid={errors.state ? 'true' : undefined}
          aria-required="true"
        />
        {#if errors.state}
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
            {errors.state}
          </p>
        {/if}
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <Label for="zipCode" class="font-medium text-gray-700">Zip Code</Label>
        <Input
          id="zipCode"
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          placeholder="Zip Code"
          bind:value={formData.restaurantsInput[0].zipCode}
          onblur={() => validateField('zipCode')}
          class={errors.zipCode
            ? 'border-red-500'
            : 'focus:ring-indigo-500 focus:border-indigo-500'}
          aria-invalid={errors.zipCode ? 'true' : undefined}
          aria-required="true"
        />
        {#if errors.zipCode}
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
            {errors.zipCode}
          </p>
        {/if}
      </div>

      <div class="space-y-2">
        <Label for="owner" class="font-medium text-gray-700">Owner</Label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
          <Input
            id="owner"
            type="text"
            placeholder="Owner"
            bind:value={formData.restaurantsInput[0].owner}
            onblur={() => validateField('owner')}
            class={errors.owner
              ? 'border-red-500'
              : 'focus:ring-indigo-500 focus:border-indigo-500'}
            aria-invalid={errors.owner ? 'true' : undefined}
            aria-required="true"
          />
        </div>
        {#if errors.owner}
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
            {errors.owner}
          </p>
        {/if}
      </div>
    </div>
  </fieldset>

  <div class="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
    <h3 class="text-sm font-medium text-gray-700 mb-2">Restaurant Info Tips:</h3>
    <ul class="text-xs text-gray-600 space-y-1 list-disc pl-5">
      <li>Make sure the restaurant name matches your official business name</li>
      <li>Use the complete street address including any suite or unit numbers</li>
      <li>If you are the owner, include your full name</li>
      <li>All fields are required for restaurant registration</li>
    </ul>
  </div>
</section>

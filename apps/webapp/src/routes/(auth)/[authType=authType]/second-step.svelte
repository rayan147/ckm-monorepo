<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { z } from 'zod';
  import { User, Users } from 'lucide-svelte';

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

<section class="space-y-5">
  <fieldset class="space-y-4">
    <legend class="sr-only">Personal Information</legend>

    <div class="space-y-2">
      <Label for="firstName" class="font-medium text-gray-700">First Name</Label>
      <div class="relative">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <User class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
        <Input
          id="firstName"
          type="text"
          placeholder="First Name"
          bind:value={formData.firstName}
          onblur={validateFirstName}
          class={errors.lastName
            ? 'border-red-500'
            : 'pl-10 focus:ring-indigo-500 focus:border-indigo-500'}
          aria-invalid={errors.firstName ? 'true' : undefined}
          aria-required="true"
        />
      </div>
      {#if errors.firstName}
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
          {errors.firstName}
        </p>
      {/if}
    </div>

    <div class="space-y-2">
      <Label for="lastName" class="font-medium text-gray-700">Last Name</Label>
      <div class="relative">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <User class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
        <Input
          id="lastName"
          type="text"
          placeholder="Last Name"
          bind:value={formData.lastName}
          onblur={validateLastName}
          class={errors.lastName
            ? 'border-red-500'
            : 'pl-10 focus:ring-indigo-500 focus:border-indigo-500'}
          aria-invalid={errors.lastName ? 'true' : undefined}
          aria-required="true"
        />
      </div>
      {#if errors.lastName}
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
          {errors.lastName}
        </p>
      {/if}
    </div>
  </fieldset>

  <div class="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
    <div class="flex items-center space-x-3">
      <div class="flex-shrink-0">
        <Users class="h-5 w-5 text-indigo-600" aria-hidden="true" />
      </div>
      <div class="flex items-center space-x-2">
        <Checkbox
          id="isOrganization"
          bind:checked={formData.isOrganization}
          aria-describedby="org-description"
        />
        <Label
          for="isOrganization"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I represent an organization with multiple restaurants
        </Label>
      </div>
    </div>
    <p id="org-description" class="text-xs text-gray-500 mt-2 ml-8">
      Select this option if you are registering on behalf of an organization that manages multiple
      restaurant locations.
    </p>
  </div>
</section>

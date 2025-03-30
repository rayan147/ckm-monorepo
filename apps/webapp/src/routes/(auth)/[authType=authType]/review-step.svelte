<script lang="ts">
  import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
  import { Button } from '$lib/components/ui/button';
  import { Separator } from '$lib/components/ui/separator';
  import { CheckCircle } from 'lucide-svelte';

  let { formData = $bindable(), submitting = $bindable(false) } = $props();
</script>

<div class="space-y-6" id="registration-form">
  <Alert>
    <CheckCircle class="h-4 w-4" />
    <AlertTitle>Please review your information</AlertTitle>
    <AlertDescription>
      Check the details below before completing your registration.
    </AlertDescription>
  </Alert>

  <div class="space-y-4">
    <div>
      <h3 class="font-medium">Account Information</h3>
      <p class="text-sm text-gray-600">Email: {formData.email}</p>
    </div>

    <div>
      <h3 class="font-medium">Personal Information</h3>
      <p class="text-sm text-gray-600">Name: {formData.firstName} {formData.lastName}</p>
    </div>

    <Separator />

    {#if formData.isOrganization}
      <div>
        <h3 class="font-medium">Organization Information</h3>
        <p class="text-sm text-gray-600">Name: {formData.organizationInput.name}</p>
      </div>

      <div>
        <h3 class="font-medium">Restaurants</h3>
        <ul class="space-y-2 mt-2">
          {#each formData.restaurantsInput as restaurant, index}
            <li class="text-sm text-gray-600">
              <strong>{restaurant.name}</strong>
              <p class="text-xs">
                {restaurant.address}, {restaurant.city}, {restaurant.state}
                {restaurant.zipCode}
              </p>
              <p class="text-xs">Owner: {restaurant.owner}</p>
            </li>
          {/each}
        </ul>
      </div>
    {:else}
      <div>
        <h3 class="font-medium">Restaurant Information</h3>
        <p class="text-sm text-gray-600">Name: {formData.restaurantsInput[0].name}</p>
        <p class="text-sm text-gray-600">
          Address: {formData.restaurantsInput[0].address},
          {formData.restaurantsInput[0].city},
          {formData.restaurantsInput[0].state}
          {formData.restaurantsInput[0].zipCode}
        </p>
        <p class="text-sm text-gray-600">Owner: {formData.restaurantsInput[0].owner}</p>
      </div>
    {/if}
  </div>

  <p class="text-xs text-center text-gray-500">
    By completing registration, you agree to our Terms of Service and Privacy Policy.
  </p>
</div>

<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
  import { Separator } from '$lib/components/ui/separator';
  import { Plus } from 'lucide-svelte';
  import { z } from 'zod';

  let { formData = $bindable() } = $props();
  type Restaurant = {
    name: string;
    imageUrl: string;
    address: string;
    city: string;
    zipCode: string;
    state: string;
    owner: string;
  };

  // Ensure restaurants array is initialized
  if (!formData.restaurantsInput || !Array.isArray(formData.restaurantsInput)) {
    formData.restaurantsInput = [];
  }
  let organizationName = $state(formData.organizationInput ? formData.organizationInput.name : '');
  // Restaurant template for new entries
  const emptyRestaurant = {
    name: '',
    imageUrl: '',
    address: '',
    city: '',
    zipCode: '',
    state: '',
    owner: ''
  } satisfies Restaurant;

  // Current restaurant being edited
  let newRestaurant = $state({ ...emptyRestaurant });

  // Validation schema
  const organizationSchema = z.object({
    name: z.string().min(1, { message: 'Organization name is required' })
  });

  const restaurantSchema = z.object({
    name: z.string().min(1, { message: 'Restaurant name is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    zipCode: z.string().min(1, { message: 'Zip code is required' }),
    owner: z.string().min(1, { message: 'Owner name is required' })
  });

  // Validation state
  let orgErrors = $state({ name: '' });
  let restaurantErrors = $state({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    owner: ''
  });

  // Validate organization name
  function validateOrgName() {
    // Initialize organization input if it doesn't exist
    if (!formData.organizationInput) {
      formData.organizationInput = { name: '' };
    }

    const result = organizationSchema.shape.name.safeParse(formData.organizationInput.name);
    orgErrors.name = result.success ? '' : result.error.format()._errors[0];
  }

  // Add restaurant to the list
  function addRestaurant() {
    // Validate all fields
    const result = restaurantSchema.safeParse(newRestaurant);

    if (!result.success) {
      const formattedErrors = result.error.format();
      restaurantErrors = {
        name: formattedErrors.name?._errors[0] || '',
        address: formattedErrors.address?._errors[0] || '',
        city: formattedErrors.city?._errors[0] || '',
        state: formattedErrors.state?._errors[0] || '',
        zipCode: formattedErrors.zipCode?._errors[0] || '',
        owner: formattedErrors.owner?._errors[0] || ''
      };
      return;
    }

    // Clear all errors if validation passed
    restaurantErrors = {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      owner: ''
    };

    // Add the new restaurant
    formData.restaurantsInput = [...formData.restaurantsInput, { ...newRestaurant }];

    // Reset the form
    newRestaurant = { ...emptyRestaurant };
  }

  // Remove restaurant from the list
  function removeRestaurant(index: number) {
    formData.restaurantsInput = formData.restaurantsInput.filter(
      (_: any, i: number) => i !== index
    );
  }
</script>

<section class="space-y-6">
  <div class="space-y-2">
    <Label for="orgName">Organization Name</Label>
    <Input
      id="orgName"
      type="text"
      placeholder="Organization Name"
      bind:value={organizationName}
      onblur={validateOrgName}
      aria-invalid={orgErrors.name ? 'true' : undefined}
    />
    {#if orgErrors.name}
      <p class="text-sm text-red-500" role="alert">{orgErrors.name}</p>
    {/if}
  </div>

  <Separator />

  <div>
    <h3 class="text-lg font-medium mb-4">Restaurants</h3>

    {#if formData.restaurantsInput && formData.restaurantsInput.length > 0}
      <ul class="space-y-3 mb-6" aria-label="Restaurant list">
        {#each formData.restaurantsInput as restaurant, index}
          <li>
            <Card class="relative">
              <Button
                variant="destructive"
                size="icon"
                class="absolute top-2 right-2 h-6 w-6"
                on:click={() => removeRestaurant(index)}
                aria-label={`Remove ${restaurant.name}`}
              >
                <span aria-hidden="true">×</span>
              </Button>
              <CardHeader class="pb-2">
                <CardTitle class="text-sm">{restaurant.name}</CardTitle>
              </CardHeader>
              <CardContent class="text-xs text-gray-600">
                <address>
                  {restaurant.address}, {restaurant.city}, {restaurant.state}
                  {restaurant.zipCode}
                </address>
                <p>Owner: {restaurant.owner}</p>
              </CardContent>
            </Card>
          </li>
        {/each}
      </ul>
    {/if}

    <Card>
      <CardHeader>
        <CardTitle class="text-base">Add New Restaurant</CardTitle>
      </CardHeader>
      <CardContent>
        <fieldset class="grid gap-3">
          <legend class="sr-only">New Restaurant Details</legend>

          <div>
            <Label for="restaurantName">Restaurant Name</Label>
            <Input
              id="restaurantName"
              placeholder="Restaurant Name"
              bind:value={newRestaurant.name}
              aria-invalid={restaurantErrors.name ? 'true' : undefined}
            />
            {#if restaurantErrors.name}
              <p class="text-xs text-red-500" role="alert">{restaurantErrors.name}</p>
            {/if}
          </div>

          <div>
            <Label for="address">Address</Label>
            <Input
              id="address"
              placeholder="Street Address"
              bind:value={newRestaurant.address}
              aria-invalid={restaurantErrors.address ? 'true' : undefined}
            />
            {#if restaurantErrors.address}
              <p class="text-xs text-red-500" role="alert">{restaurantErrors.address}</p>
            {/if}
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <Label for="city">City</Label>
              <Input
                id="city"
                placeholder="City"
                bind:value={newRestaurant.city}
                aria-invalid={restaurantErrors.city ? 'true' : undefined}
              />
              {#if restaurantErrors.city}
                <p class="text-xs text-red-500" role="alert">{restaurantErrors.city}</p>
              {/if}
            </div>

            <div>
              <Label for="state">State</Label>
              <Input
                id="state"
                placeholder="State"
                bind:value={newRestaurant.state}
                aria-invalid={restaurantErrors.state ? 'true' : undefined}
              />
              {#if restaurantErrors.state}
                <p class="text-xs text-red-500" role="alert">{restaurantErrors.state}</p>
              {/if}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <Label for="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                placeholder="Zip Code"
                bind:value={newRestaurant.zipCode}
                aria-invalid={restaurantErrors.zipCode ? 'true' : undefined}
              />
              {#if restaurantErrors.zipCode}
                <p class="text-xs text-red-500" role="alert">{restaurantErrors.zipCode}</p>
              {/if}
            </div>

            <div>
              <Label for="owner">Owner</Label>
              <Input
                id="owner"
                placeholder="Owner"
                bind:value={newRestaurant.owner}
                aria-invalid={restaurantErrors.owner ? 'true' : undefined}
              />
              {#if restaurantErrors.owner}
                <p class="text-xs text-red-500" role="alert">{restaurantErrors.owner}</p>
              {/if}
            </div>
          </div>

          <Button type="button" variant="outline" class="mt-3" onclick={addRestaurant}>
            <Plus class="h-4 w-4 mr-2" />
            <span>Add Restaurant</span>
          </Button>
        </fieldset>
      </CardContent>
    </Card>
  </div>
</section>

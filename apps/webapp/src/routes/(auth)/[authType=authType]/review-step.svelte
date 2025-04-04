<script lang="ts">
  import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
  import { Button } from '$lib/components/ui/button';
  import { Separator } from '$lib/components/ui/separator';
  import { CheckCircle, User, Building, MapPin, Coffee } from 'lucide-svelte';

  let { formData = $bindable(), submitting = $bindable(false) } = $props();
</script>

<section class="space-y-6" id="registration-form">
  <Alert class="bg-blue-50 border-blue-200">
    <span class="sr-only">Information</span>
    <CheckCircle class="h-5 w-5 text-blue-500" aria-hidden="true" />
    <AlertTitle class="text-blue-800 font-semibold text-lg"
      >Please review your information</AlertTitle
    >
    <AlertDescription class="text-blue-700">
      Check the details below before completing your registration.
    </AlertDescription>
  </Alert>

  <article class="space-y-5 bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
    <!-- Account Information -->
    <section class="p-3 bg-gray-50 rounded-md">
      <header class="flex items-center gap-2 mb-2">
        <User class="h-5 w-5 text-indigo-600" aria-hidden="true" />
        <h2 class="font-semibold text-gray-900 text-lg">Account Information</h2>
      </header>
      <p class="text-base text-gray-800 pl-7">
        Email: <span class="font-medium">{formData.email}</span>
      </p>
    </section>

    <!-- Personal Information -->
    <section class="p-3 bg-gray-50 rounded-md">
      <header class="flex items-center gap-2 mb-2">
        <User class="h-5 w-5 text-indigo-600" aria-hidden="true" />
        <h2 class="font-semibold text-gray-900 text-lg">Personal Information</h2>
      </header>
      <p class="text-base text-gray-800 pl-7">
        Name: <span class="font-medium">{formData.firstName} {formData.lastName}</span>
      </p>
    </section>

    <Separator class="my-2" />

    {#if formData.isOrganization}
      <!-- Organization Information -->
      <section class="p-3 bg-gray-50 rounded-md">
        <header class="flex items-center gap-2 mb-2">
          <Building class="h-5 w-5 text-indigo-600" aria-hidden="true" />
          <h2 class="font-semibold text-gray-900 text-lg">Organization Information</h2>
        </header>
        <p class="text-base text-gray-800 pl-7">
          Name: <span class="font-medium">{formData.organizationInput.name}</span>
        </p>
      </section>

      <!-- Restaurants Information -->
      <section class="p-3 bg-gray-50 rounded-md">
        <header class="flex items-center gap-2 mb-3">
          <Coffee class="h-5 w-5 text-indigo-600" aria-hidden="true" />
          <h2 class="font-semibold text-gray-900 text-lg">Restaurants</h2>
        </header>

        <ul class="space-y-3 pl-7" aria-label="Restaurant list">
          {#each formData.restaurantsInput as restaurant, index}
            <li class="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
              <article>
                <header class="flex justify-between items-start">
                  <h3 class="font-semibold text-indigo-700">{restaurant.name}</h3>
                  <span class="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 font-medium">
                    Restaurant #{index + 1}
                  </span>
                </header>
                <div class="mt-2">
                  <div class="flex items-start gap-1 mt-1 text-gray-700">
                    <MapPin class="h-4 w-4 mt-0.5 text-gray-500 flex-shrink-0" aria-hidden="true" />
                    <address class="text-sm not-italic">
                      {restaurant.address}, {restaurant.city}, {restaurant.state}
                      {restaurant.zipCode}
                    </address>
                  </div>
                  <p class="text-sm mt-1 text-gray-700">
                    Owner: <span class="font-medium">{restaurant.owner}</span>
                  </p>
                </div>
              </article>
            </li>
          {/each}
        </ul>
      </section>
    {:else}
      <!-- Single Restaurant Information -->
      <section class="p-3 bg-gray-50 rounded-md">
        <header class="flex items-center gap-2 mb-2">
          <Coffee class="h-5 w-5 text-indigo-600" aria-hidden="true" />
          <h2 class="font-semibold text-gray-900 text-lg">Restaurant Information</h2>
        </header>

        <article class="bg-white p-3 rounded-md border border-gray-200 shadow-sm ml-7">
          <header>
            <h3 class="font-semibold text-indigo-700">{formData.restaurantsInput[0].name}</h3>
          </header>
          <div class="mt-2">
            <div class="flex items-start gap-1 mt-1 text-gray-700">
              <MapPin class="h-4 w-4 mt-0.5 text-gray-500 flex-shrink-0" aria-hidden="true" />
              <address class="text-sm not-italic">
                {formData.restaurantsInput[0].address}, {formData.restaurantsInput[0].city},
                {formData.restaurantsInput[0].state}
                {formData.restaurantsInput[0].zipCode}
              </address>
            </div>
            <p class="text-sm mt-1 text-gray-700">
              Owner: <span class="font-medium">{formData.restaurantsInput[0].owner}</span>
            </p>
          </div>
        </article>
      </section>
    {/if}
  </article>

  <footer
    class="text-center text-gray-500 text-sm p-3 bg-gray-50 rounded-md border border-gray-200"
  >
    By completing registration, you agree to our <a
      href="/terms"
      class="text-indigo-600 hover:underline">Terms of Service</a
    >
    and
    <a href="/privacy" class="text-indigo-600 hover:underline">Privacy Policy</a>.
  </footer>
</section>

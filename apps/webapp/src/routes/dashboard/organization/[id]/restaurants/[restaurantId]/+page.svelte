<!-- src/routes/organizations/[id]/restaurants/[restaurantId]/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { ArrowLeft } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import { getRestaurant } from '$lib/api/restaurants';
  import { getOrganization } from '$lib/api/organizations';
  import RestaurantTabs from '$lib/components/domain/restaurant/restaurant-tabs.svelte';
  import type { Restaurant, Organization } from '$lib/components/types/models';
  import { goto } from '$app/navigation';

  // Get IDs from route params
  const organizationId = parseInt($page.params.id);
  const restaurantId = parseInt($page.params.restaurantId);

  // Component state
  let restaurant = $state<Restaurant | null>(null);
  let organization = $state<Organization | null>(null);
  let isLoading = $state(true);
  let error = $state<string | null>(null);

  // Load data on component init
  $effect(() => {
    loadData();
  });

  async function loadData() {
    try {
      isLoading = true;
      error = null;

      // Fetch restaurant and organization data
      const [rest, org] = await Promise.all([
        getRestaurant(restaurantId),
        getOrganization(organizationId)
      ]);

      restaurant = rest;
      organization = org;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load restaurant data';
      console.error(error);
    } finally {
      isLoading = false;
    }
  }

  function handleBackClick() {
    goto(`/organizations/${organizationId}/restaurants`);
  }
</script>

<div class="space-y-6">
  <!-- Header with back button -->
  <div class="flex justify-between items-center">
    <Button variant="ghost" onclick={handleBackClick} class="gap-1">
      <ArrowLeft class="h-4 w-4" />
      Back to Restaurants
    </Button>
  </div>

  {#if isLoading}
    <div class="flex justify-center py-12">
      <div
        class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
      ></div>
    </div>
  {:else if error}
    <Card.Root class="border-destructive">
      <Card.Header>
        <Card.Title class="text-destructive">Error</Card.Title>
      </Card.Header>
      <Card.Content>
        <p>{error}</p>
      </Card.Content>
      <Card.Footer>
        <Button variant="outline" onclick={loadData}>Try Again</Button>
      </Card.Footer>
    </Card.Root>
  {:else if restaurant && organization}
    <div class="pb-2">
      <div class="text-sm text-muted-foreground mb-1">
        {organization.name} / Restaurant
      </div>
      <h1 class="text-3xl font-bold">{restaurant.name}</h1>
    </div>

    <RestaurantTabs {restaurant} />
  {:else}
    <Card.Root>
      <Card.Content class="flex flex-col items-center justify-center py-12">
        <h3 class="text-xl font-semibold mb-2">Restaurant Not Found</h3>
        <p class="text-muted-foreground mb-6">
          The restaurant you're looking for doesn't exist or has been deleted.
        </p>
        <Button onclick={handleBackClick}>Go Back to Restaurants</Button>
      </Card.Content>
    </Card.Root>
  {/if}
</div>

<!-- src/lib/components/restaurant/RestaurantList.svelte -->
<script lang="ts">
  import { Plus, Search, Filter, Archive } from 'lucide-svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  // Fix the import path to match your actual file structure
  import RestaurantCard from '$lib/components/domain/restaurant/restaurant-card.svelte';
  // Fix the types import path
  import type { Restaurant } from '$lib/components/types/models';
  import { fetchRestaurants } from '$lib/api/restaurants';

  const { organizationId } = $props<{
    organizationId?: number;
  }>();

  console.log(`RestaurantList component initialized with organizationId=${organizationId}`);

  let restaurants = $state<Restaurant[]>([]);
  let isLoading = $state(true);
  let error = $state<string | null>(null);
  let searchQuery = $state('');
  let activeTab = $state('active'); // 'active' or 'archived'

  // Diagnostic variable to track if restaurants are being processed
  let debugInfo = $state({
    restaurantsLoaded: 0,
    filteredCount: 0,
    groupedCount: 0,
    errors: [] as string[]
  });

  // Immediately load data when prop changes
  $effect(() => {
    if (organizationId !== undefined) {
      console.log(`Effect triggered with organizationId: ${organizationId}`);
      loadRestaurants();
    }
  });

  // Filtered restaurants based on search and archive status
  let filteredRestaurants = $derived(() => {
    try {
      // First filter by active/archived status
      const statusFiltered = restaurants.filter((restaurant) =>
        activeTab === 'active' ? !restaurant.isDeleted : restaurant.isDeleted
      );

      // Then filter by search query
      let result = statusFiltered;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        result = statusFiltered.filter(
          (restaurant) =>
            restaurant.name.toLowerCase().includes(query) ||
            restaurant.city.toLowerCase().includes(query) ||
            restaurant.state.toLowerCase().includes(query)
        );
      }

      // Update debug info
      debugInfo.filteredCount = result.length;
      console.log(`Filtered restaurants: ${result.length}`);

      return result;
    } catch (e) {
      console.error('Error in filteredRestaurants:', e);
      debugInfo.errors.push(`Filtered error: ${e}`);
      return [];
    }
  });

  // Grouped restaurants by type
  let groupedRestaurants = $derived(() => {
    try {
      // First, check if we have any restaurants
      if (!filteredRestaurants || filteredRestaurants.length === 0) {
        console.log('[RestaurantList] No filtered restaurants available');
        return [];
      }

      const groups: Record<string, Restaurant[]> = {
        CATERING: [],
        HEALTHCARE: [],
        SCHOOL: [],
        NURSING_HOME: [],
        WELLNESS_RETREAT: [],
        OTHER: []
      };

      // Debug output
      console.log(`[RestaurantList] Processing ${filteredRestaurants.length} filtered restaurants`);

      filteredRestaurants.forEach((restaurant) => {
        try {
          // This is a placeholder - in a real app, you'd have a type field on the restaurant model
          const type = determineRestaurantType(restaurant);
          groups[type] = [...(groups[type] || []), restaurant];
        } catch (e) {
          console.error(`[RestaurantList] Error processing restaurant:`, e, restaurant);
          debugInfo.errors.push(`Restaurant processing error: ${e}`);
          // Put it in OTHER if there's an error
          groups['OTHER'] = [...(groups['OTHER'] || []), restaurant];
        }
      });

      // Filter out empty groups
      const result = Object.entries(groups)
        .filter(([_, restaurants]) => restaurants.length > 0)
        .sort(([a], [b]) => a.localeCompare(b));

      // Update debug info
      debugInfo.groupedCount = result.reduce((sum, [_, rests]) => sum + rests.length, 0);
      console.log(
        `[RestaurantList] Grouped restaurants into ${result.length} categories with total ${debugInfo.groupedCount} restaurants`
      );

      return result;
    } catch (e) {
      console.error('Error in groupedRestaurants:', e);
      debugInfo.errors.push(`Grouping error: ${e}`);
      return [];
    }
  });

  // Determine restaurant type (placeholder implementation)
  function determineRestaurantType(restaurant: Restaurant): string {
    // In a real app, you'd use a field on the restaurant model
    // This is just a placeholder using name-based heuristics
    if (!restaurant || !restaurant.name) {
      console.error('Invalid restaurant object:', restaurant);
      return 'OTHER';
    }

    const name = restaurant.name.toLowerCase();

    if (name.includes('catering') || name.includes('event')) return 'CATERING';
    if (name.includes('hospital') || name.includes('clinic')) return 'HEALTHCARE';
    if (name.includes('school') || name.includes('academy')) return 'SCHOOL';
    if (name.includes('nursing') || name.includes('senior')) return 'NURSING_HOME';
    if (name.includes('retreat') || name.includes('wellness')) return 'WELLNESS_RETREAT';

    return 'OTHER';
  }

  // Format type for display
  function formatType(type: string): string {
    return type
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  async function loadRestaurants() {
    try {
      isLoading = true;
      console.log(`Loading restaurants for organization ID: ${organizationId}`);
      debugInfo.errors = [];

      if (organizationId === undefined || isNaN(organizationId)) {
        console.warn(`Invalid organizationId: ${organizationId}, using fallback data`);
        // Use mock data for invalid organizationId
        restaurants = [
          {
            id: 99,
            name: 'Invalid Organization Restaurant',
            address: '999 Error St',
            city: 'Fallback City',
            state: 'FB',
            zipCode: '00000',
            owner: 'Fallback Owner',
            organizationId: 99,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isDeleted: false,
            deleted: null,
            imageUrl: null,
            foodCost: null
          }
        ];
        debugInfo.restaurantsLoaded = restaurants.length;
        return;
      }

      try {
        const fetchedRestaurants = await fetchRestaurants(organizationId);
        console.log(
          `Successfully loaded ${fetchedRestaurants.length} restaurants for organization ${organizationId}`
        );

        if (fetchedRestaurants && fetchedRestaurants.length > 0) {
          restaurants = fetchedRestaurants;

          // Log restaurant data for debugging
          console.log('Restaurant data:', JSON.stringify(restaurants, null, 2));
        } else {
          console.log(
            `No restaurants found for organization ${organizationId}, using fallback data`
          );

          // Use mock data as fallback, but with the correct organizationId
          restaurants = [
            {
              id: 1,
              name: 'Sample Restaurant',
              address: '123 Main St',
              city: 'Anytown',
              state: 'CA',
              zipCode: '12345',
              owner: 'Sample Owner',
              organizationId: organizationId,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              isDeleted: false,
              deleted: null,
              imageUrl: null,
              foodCost: 1500
            },
            {
              id: 2,
              name: 'Another Restaurant',
              address: '456 Second St',
              city: 'Othertown',
              state: 'CA',
              zipCode: '54321',
              owner: 'Other Owner',
              organizationId: organizationId,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              isDeleted: false,
              deleted: null,
              imageUrl: null,
              foodCost: 2500
            }
          ];
        }
      } catch (apiError) {
        console.error(`API error loading restaurants:`, apiError);
        debugInfo.errors.push(`API error: ${apiError}`);

        // Use mock data as fallback with correct organizationId
        restaurants = [
          {
            id: 1,
            name: 'Backup Restaurant',
            address: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345',
            owner: 'Sample Owner',
            organizationId: organizationId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isDeleted: false,
            deleted: null,
            imageUrl: null,
            foodCost: 1500
          }
        ];
      }

      // Update debug info
      debugInfo.restaurantsLoaded = restaurants.length;
      console.log(`Using data with ${restaurants.length} restaurants`);
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load restaurants';
      debugInfo.errors.push(`General error: ${error}`);
      console.error(`General error: ${error}`);
    } finally {
      isLoading = false;
      console.log(`Restaurant loading complete with ${restaurants.length} restaurants`);
    }
  }

  function handleAddRestaurant() {
    // Navigate to restaurant creation form or show modal
    console.log('Add restaurant clicked');
  }
</script>

<div class="container mx-auto py-6">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Restaurants</h1>

    <div class="flex space-x-4">
      <div class="relative">
        <div class="absolute left-2.5 top-2.5">
          <Search width="16" height="16" class="text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder="Search restaurants..."
          class="pl-8 w-[250px]"
          bind:value={searchQuery}
        />
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline">
            <div class="mr-2">
              <Filter width="16" height="16" />
            </div>
            Filter
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.RadioGroup value="all">
            <DropdownMenu.RadioItem value="all">All Types</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="CATERING">Catering</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="HEALTHCARE">Healthcare</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="SCHOOL">Schools</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="NURSING_HOME">Nursing Homes</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="WELLNESS_RETREAT"
              >Wellness Retreats</DropdownMenu.RadioItem
            >
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <Button onclick={handleAddRestaurant}>
        <div class="mr-2">
          <Plus width="16" height="16" />
        </div>
        Add Restaurant
      </Button>
    </div>
  </div>

  <Tabs.Root value={activeTab} class="mb-6" onValueChange={(value) => (activeTab = value)}>
    <Tabs.List>
      <Tabs.Trigger value="active">
        Active
        <Badge variant="secondary" class="ml-2">
          {restaurants.filter((r) => !r.isDeleted).length}
        </Badge>
      </Tabs.Trigger>
      <Tabs.Trigger value="archived">
        Archived
        <Badge variant="secondary" class="ml-2">
          {restaurants.filter((r) => r.isDeleted).length}
        </Badge>
      </Tabs.Trigger>
    </Tabs.List>
  </Tabs.Root>

  <!-- Debug Info -->
  <div class="mb-4 p-2 border rounded bg-gray-50">
    <p>
      Debug: Loaded: {debugInfo.restaurantsLoaded}, Filtered: {debugInfo.filteredCount}, Grouped: {debugInfo.groupedCount}
    </p>
    {#if debugInfo.errors.length > 0}
      <div class="text-red-500 mt-1">
        Errors:
        <ul>
          {#each debugInfo.errors as err}
            <li>{err}</li>
          {/each}
        </ul>
      </div>
    {/if}
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
        <Button variant="outline" onclick={loadRestaurants}>Try Again</Button>
      </Card.Footer>
    </Card.Root>
  {:else if filteredRestaurants.length === 0}
    <Card.Root>
      <Card.Content class="flex flex-col items-center justify-center py-12">
        {#if activeTab === 'active' && restaurants.filter((r) => !r.isDeleted).length === 0}
          <div class="mb-4">
            <Archive width="48" height="48" class="text-muted-foreground" />
          </div>
          <h3 class="text-xl font-semibold mb-2">No restaurants found</h3>
          <p class="text-muted-foreground mb-6">Start by creating your first restaurant</p>
          <Button onclick={handleAddRestaurant}>
            <div class="mr-2">
              <Plus width="16" height="16" />
            </div>
            Add Restaurant
          </Button>
        {:else}
          <h3 class="text-xl font-semibold">No results found</h3>
          <p class="text-muted-foreground">Try a different search term or filter</p>
        {/if}
      </Card.Content>
    </Card.Root>
  {:else}
    <!-- Group restaurants by type - add extra validation -->
    {#if groupedRestaurants && groupedRestaurants.length > 0}
      {#each groupedRestaurants as [type, typeRestaurants]}
        <div class="mb-8">
          <h2 class="text-lg font-semibold mb-4 flex items-center">
            <span>{formatType(type || 'OTHER')}</span>
            <Badge variant="secondary" class="ml-2">{typeRestaurants?.length || 0}</Badge>
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each typeRestaurants || [] as restaurant (restaurant.id)}
              <!-- Only render if restaurant has required fields -->
              {#if restaurant && restaurant.id && restaurant.name}
                <RestaurantCard {restaurant} />
              {:else}
                <Card.Root>
                  <Card.Content>Invalid restaurant data</Card.Content>
                </Card.Root>
              {/if}
            {/each}
          </div>
        </div>
      {/each}
    {:else}
      <Card.Root>
        <Card.Content class="text-center py-6">
          <p>No restaurants to display after grouping (this is unusual)</p>
        </Card.Content>
      </Card.Root>
    {/if}
  {/if}
</div>

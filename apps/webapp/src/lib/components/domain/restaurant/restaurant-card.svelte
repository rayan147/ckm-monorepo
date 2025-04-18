<!-- src/lib/components/restaurant/RestaurantCard.svelte -->
<script lang="ts">
  import {
    Utensils,
    MoreVertical,
    MapPin,
    Users,
    ArrowUpDown,
    Pencil,
    Trash2,
    ArchiveRestore
  } from 'lucide-svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  // Fix the types import path
  import type { Restaurant } from '$lib/components/types/models';
  import { fetchUsers } from '$lib/api/users';
  import { archiveRestaurant, deleteRestaurant, updateRestaurant } from '$lib/api/restaurants';
  import { goto } from '$app/navigation';
  const { restaurant } = $props<{
    restaurant: Restaurant;
  }>();

  // Add validation for the restaurant prop
  $effect(() => {
    console.log('Restaurant Card received restaurant:', restaurant);
    if (!restaurant) {
      console.error('RestaurantCard received null/undefined restaurant');
    } else if (!restaurant.id || !restaurant.name) {
      console.error('RestaurantCard received invalid restaurant data:', JSON.stringify(restaurant));
    }
  });

  let usersCount = $state(0);
  let isLoading = $state(true);
  let actionInProgress = $state(false);
  let imageError = $state(false);

  $effect(() => {
    if (restaurant && restaurant.id) {
      loadRelatedData();
    }
  });

  async function loadRelatedData() {
    try {
      isLoading = true;

      // Set default value for testing
      usersCount = 3;

      try {
        const users = await fetchUsers({ restaurantId: restaurant.id });
        usersCount = users.length;
        console.log(`[Restaurant ${restaurant.id}] Loaded ${users.length} users`);
      } catch (fetchError) {
        console.error(`Error loading users for restaurant ${restaurant.id}:`, fetchError);
      }
    } catch (error) {
      console.error('Error in loadRelatedData:', error);
    } finally {
      isLoading = false;
    }
  }

  function navigateToRestaurant() {
    goto(`/dashboard/restaurant/${restaurant.id}`);
  }

  function handleEdit() {
    goto(`/dashboard/restaurant/${restaurant.id}/edit`);
  }

  async function handleArchiveToggle() {
    try {
      actionInProgress = true;
      await archiveRestaurant(restaurant.id);
      // Refresh the component - in a real app this would update the store/trigger a reload
    } catch (error) {
      console.error('Error archiving restaurant:', error);
    } finally {
      actionInProgress = false;
    }
  }

  async function handleDelete() {
    // In a real app, show a confirmation dialog before deleting
    try {
      actionInProgress = true;
      await deleteRestaurant(restaurant.id);
      // Remove the card from the list - in a real app this would update the store
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    } finally {
      actionInProgress = false;
    }
  }

  // Get a description of the restaurant type
  function getRestaurantTypeBadge() {
    const name = restaurant?.name?.toLowerCase() || '';

    if (name.includes('catering') || name.includes('event'))
      return { label: 'Catering', color: 'bg-yellow-100 text-yellow-800' };
    if (name.includes('hospital') || name.includes('clinic'))
      return { label: 'Healthcare', color: 'bg-blue-100 text-blue-800' };
    if (name.includes('school') || name.includes('academy'))
      return { label: 'School', color: 'bg-green-100 text-green-800' };
    if (name.includes('nursing') || name.includes('senior'))
      return { label: 'Nursing Home', color: 'bg-purple-100 text-purple-800' };
    if (name.includes('retreat') || name.includes('wellness'))
      return { label: 'Wellness', color: 'bg-pink-100 text-pink-800' };

    return { label: 'Restaurant', color: 'bg-slate-100 text-slate-800' };
  }

  function handleImageError() {
    imageError = true;
  }

  const typeBadge = getRestaurantTypeBadge();
</script>

<!-- Conditional rendering to prevent errors if restaurant is undefined -->
{#if restaurant && restaurant.id && restaurant.name}
  <Card.Root
    class={`overflow-hidden ${restaurant.isDeleted ? 'opacity-75' : ''} hover:shadow-md transition-shadow`}
  >
    <div
      class="h-32 bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center relative"
    >
      {#if restaurant.imageUrl && !imageError}
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          class="h-full w-full object-cover"
          onerror={handleImageError}
        />
      {:else}
        <div class="flex items-center justify-center">
          <Utensils width="64" height="64" class="text-primary/40" />
        </div>
      {/if}

      {#if restaurant.isDeleted}
        <div class="absolute inset-0 bg-black/10 flex items-center justify-center">
          <Badge variant="destructive">Archived</Badge>
        </div>
      {/if}
    </div>

    <Card.Header class="relative">
      <div class="absolute right-4 top-4">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="ghost" size="icon" class="h-8 w-8">
              <MoreVertical width="16" height="16" />
              <span class="sr-only">Open menu</span>
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Item onclick={handleEdit}>
              <div class="mr-2">
                <Pencil width="16" height="16" />
              </div>
              <span>Edit</span>
            </DropdownMenu.Item>

            <DropdownMenu.Item onclick={handleArchiveToggle}>
              {#if restaurant.isDeleted}
                <div class="mr-2">
                  <ArchiveRestore width="16" height="16" />
                </div>
                <span>Restore</span>
              {:else}
                <div class="mr-2">
                  <ArrowUpDown width="16" height="16" />
                </div>
                <span>Archive</span>
              {/if}
            </DropdownMenu.Item>

            <DropdownMenu.Separator />

            <DropdownMenu.Item
              class="text-destructive focus:text-destructive"
              onclick={handleDelete}
            >
              <div class="mr-2">
                <Trash2 width="16" height="16" />
              </div>
              <span>Delete</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>

      <div class="flex gap-2 items-center">
        <Card.Title>{restaurant.name}</Card.Title>
        <Badge class={typeBadge.color}>{typeBadge.label}</Badge>
      </div>

      <Card.Description>
        <div class="flex items-center text-muted-foreground">
          <div class="mr-1">
            <MapPin width="12" height="12" />
          </div>
          {restaurant.city}, {restaurant.state}
        </div>
      </Card.Description>
    </Card.Header>

    <Card.Content>
      <div class="flex space-x-4">
        <div class="flex items-center">
          <div class="mr-2">
            <Users width="16" height="16" class="text-muted-foreground" />
          </div>
          <span>{usersCount} {usersCount === 1 ? 'User' : 'Users'}</span>
        </div>

        {#if restaurant.foodCost !== undefined && restaurant.foodCost !== null}
          <div>
            <Badge variant="outline">
              Food Cost: ${restaurant.foodCost.toFixed(2)}
            </Badge>
          </div>
        {/if}
      </div>
    </Card.Content>

    <Card.Footer>
      <Button
        class="w-full"
        variant={restaurant.isDeleted ? 'outline' : 'default'}
        onclick={navigateToRestaurant}
      >
        View Details
      </Button>
    </Card.Footer>
  </Card.Root>
{:else}
  <Card.Root class="border-dashed border-red-200">
    <Card.Content class="p-4">
      <p class="text-red-500">Invalid restaurant data</p>
      <pre class="mt-2 text-xs overflow-hidden">{JSON.stringify(restaurant, null, 2)}</pre>
    </Card.Content>
  </Card.Root>
{/if}

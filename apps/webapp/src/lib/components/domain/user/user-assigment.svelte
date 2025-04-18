<!-- src/lib/components/user/UserAssignment.svelte -->
<script lang="ts">
  import { Users, Building2, Utensils } from 'lucide-svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import type { User, Organization, Restaurant } from '$lib/components/types/models';
  import { fetchUsers, assignUserToOrganization, assignUserToRestaurant } from '$lib/api/users';
  import { fetchOrganizations } from '$lib/api/organizations';
  import { fetchRestaurants } from '$lib/api/restaurants';

  // State
  let users = $state<User[]>([]);
  let organizations = $state<Organization[]>([]);
  let restaurants = $state<Restaurant[]>([]);
  let isLoading = $state(true);
  let error = $state<string | null>(null);
  let searchQuery = $state('');

  // Filtered unassigned users
  let unassignedUsers = $derived(() => {
    let filtered = users.filter((user) => !user.organizationId && !user.restaurantId);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.firstName.toLowerCase().includes(query) ||
          user.lastName.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    return filtered;
  });

  // Drag and Drop State
  let draggedUser = $state<User | null>(null);
  let dragTarget = $state<{ type: 'organization' | 'restaurant'; id: number } | null>(null);

  // Load data on component init
  $effect(() => {
    loadData();
  });

  async function loadData() {
    try {
      isLoading = true;
      error = null;

      const [fetchedUsers, fetchedOrgs, fetchedRestaurants] = await Promise.all([
        fetchUsers({ unassigned: true }),
        fetchOrganizations(),
        fetchRestaurants()
      ]);

      users = fetchedUsers;
      organizations = fetchedOrgs;
      restaurants = fetchedRestaurants;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load data';
      console.error(error);
    } finally {
      isLoading = false;
    }
  }

  // Drag event handlers
  function handleDragStart(user: User) {
    draggedUser = user;
  }

  function handleDragOver(e: DragEvent, type: 'organization' | 'restaurant', id: number) {
    e.preventDefault();
    dragTarget = { type, id };
  }

  function handleDragLeave() {
    dragTarget = null;
  }

  async function handleDrop(e: DragEvent) {
    e.preventDefault();

    if (!draggedUser || !dragTarget) return;

    try {
      if (dragTarget.type === 'organization') {
        await assignToOrganization(draggedUser.id, dragTarget.id);
      } else {
        await assignToRestaurant(draggedUser.id, dragTarget.id);
      }

      // Remove the assigned user from the list
      users = users.filter((user) => user.id !== draggedUser.id);

      // Reset drag state
      draggedUser = null;
      dragTarget = null;
    } catch (error) {
      console.error('Error during assignment:', error);
    }
  }

  // Assignment handlers
  async function assignToOrganization(userId: number, orgId: number) {
    await assignUserToOrganization(userId, orgId);
  }

  async function assignToRestaurant(userId: number, restId: number) {
    await assignUserToRestaurant(userId, restId);
  }
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <!-- Unassigned Users Column -->
  <Card.Root>
    <Card.Header>
      <Card.Title class="flex items-center">
        <Users class="mr-2 h-5 w-5" />
        Unassigned Users
      </Card.Title>
      <Card.Description>
        Drag users to assign them to an organization or restaurant
      </Card.Description>

      <div class="mt-2">
        <Input type="text" placeholder="Search users..." bind:value={searchQuery} />
      </div>
    </Card.Header>

    <Card.Content>
      {#if isLoading}
        <div class="flex justify-center py-6">
          <div
            class="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full"
          ></div>
        </div>
      {:else if error}
        <div class="bg-destructive/10 text-destructive px-4 py-3 rounded-md mb-4">
          {error}
          <Button variant="outline" size="sm" class="ml-2" on:click={loadData}>Retry</Button>
        </div>
      {:else if unassignedUsers.length === 0}
        <div class="flex flex-col items-center justify-center text-center py-6">
          <Users class="h-10 w-10 text-muted-foreground mb-2" />
          <p class="text-muted-foreground">
            {searchQuery ? 'No unassigned users match your search' : 'No unassigned users found'}
          </p>
        </div>
      {:else}
        <div class="space-y-2">
          {#each unassignedUsers as user}
            <div
              class="p-3 border rounded-md flex items-center justify-between cursor-move bg-white hover:bg-slate-50"
              draggable="true"
              ondragstart={() => handleDragStart(user)}
            >
              <div>
                <div class="font-medium">{user.firstName} {user.lastName}</div>
                <div class="text-sm text-muted-foreground">{user.email}</div>
              </div>
              <div>
                <Badge variant="outline">Unassigned</Badge>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </Card.Content>
  </Card.Root>

  <!-- Organizations Column -->
  <Card.Root>
    <Card.Header>
      <Card.Title class="flex items-center">
        <Building2 class="mr-2 h-5 w-5" />
        Organizations
      </Card.Title>
      <Card.Description>Drop users here to assign them to an organization</Card.Description>
    </Card.Header>

    <Card.Content>
      {#if isLoading}
        <div class="flex justify-center py-6">
          <div
            class="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full"
          ></div>
        </div>
      {:else if organizations.length === 0}
        <div class="flex flex-col items-center justify-center text-center py-6">
          <Building2 class="h-10 w-10 text-muted-foreground mb-2" />
          <p class="text-muted-foreground">No organizations found</p>
        </div>
      {:else}
        <div class="space-y-3">
          {#each organizations as organization}
            <div
              class={`p-4 border rounded-md transition-colors ${dragTarget?.type === 'organization' && dragTarget.id === organization.id ? 'bg-primary/10 border-primary' : 'bg-card'}`}
              on:dragover={(e) => handleDragOver(e, 'organization', organization.id)}
              on:dragleave={handleDragLeave}
              on:drop={handleDrop}
            >
              <div class="font-medium text-lg">{organization.name}</div>
              {#if dragTarget?.type === 'organization' && dragTarget.id === organization.id && draggedUser}
                <div class="mt-2 p-2 border border-dashed rounded bg-primary/5 text-sm">
                  Drop to assign <span class="font-medium"
                    >{draggedUser.firstName} {draggedUser.lastName}</span
                  >
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </Card.Content>
  </Card.Root>

  <!-- Restaurants Column -->
  <Card.Root>
    <Card.Header>
      <Card.Title class="flex items-center">
        <Utensils class="mr-2 h-5 w-5" />
        Restaurants
      </Card.Title>
      <Card.Description>Drop users here to assign them to a restaurant</Card.Description>
    </Card.Header>

    <Card.Content>
      {#if isLoading}
        <div class="flex justify-center py-6">
          <div
            class="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full"
          ></div>
        </div>
      {:else if restaurants.length === 0}
        <div class="flex flex-col items-center justify-center text-center py-6">
          <Utensils class="h-10 w-10 text-muted-foreground mb-2" />
          <p class="text-muted-foreground">No restaurants found</p>
        </div>
      {:else}
        <div class="space-y-3">
          {#each restaurants as restaurant}
            <div
              class={`p-4 border rounded-md transition-colors ${dragTarget?.type === 'restaurant' && dragTarget.id === restaurant.id ? 'bg-primary/10 border-primary' : 'bg-card'}`}
              ondragover={(e) => handleDragOver(e, 'restaurant', restaurant.id)}
              ondragleave={handleDragLeave}
              ondrop={handleDrop}
            >
              <div class="font-medium text-lg">{restaurant.name}</div>
              <div class="text-sm text-muted-foreground">{restaurant.city}, {restaurant.state}</div>

              {#if dragTarget?.type === 'restaurant' && dragTarget.id === restaurant.id && draggedUser}
                <div class="mt-2 p-2 border border-dashed rounded bg-primary/5 text-sm">
                  Drop to assign <span class="font-medium"
                    >{draggedUser.firstName} {draggedUser.lastName}</span
                  >
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </Card.Content>
  </Card.Root>
</div>

<style>
  /* Prevent default drag behaviors */
  [draggable] {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>

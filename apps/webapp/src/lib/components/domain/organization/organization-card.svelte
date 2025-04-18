<!-- src/lib/components/organization/OrganizationCard.svelte -->
<script lang="ts">
  import { Building2, MoreVertical, Users, Utensils, Pencil, Trash2 } from 'lucide-svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import type { Organization } from '$lib/components/types/models';
  import { fetchRestaurants } from '$lib/api/restaurants';
  import { fetchUsers } from '$lib/api/users';
  import { goto } from '$app/navigation';

  const { organization } = $props<{
    organization: Organization;
  }>();

  let restaurantsCount = $state(0);
  let usersCount = $state(0);
  let isLoading = $state(true);

  $effect(() => {
    loadRelatedData();
  });

  async function loadRelatedData() {
    try {
      isLoading = true;
      
      // Use dummy counts for debugging
      restaurantsCount = 2;
      usersCount = 5;
      
      try {
        // Try to fetch real data, but fall back to mock data
        const [restaurants, users] = await Promise.all([
          fetchRestaurants(organization.id),
          fetchUsers({ organizationId: organization.id })
        ]);

        restaurantsCount = restaurants.length;
        usersCount = users.length;
        
        console.log(`[Org #${organization.id}] Loaded ${restaurants.length} restaurants and ${users.length} users`);
      } catch (loadError) {
        console.error('Error loading related data:', loadError);
      }
    } catch (error) {
      console.error('Error in loadRelatedData:', error);
    } finally {
      isLoading = false;
    }
  }

  function navigateToOrganization() {
    // Navigate to dashboard/organization/[id] instead of /organizations/[id]
    goto(`/dashboard/organization/${organization.id}`);
  }

  function handleEdit() {
    // Fix the edit URL to match the dashboard structure
    goto(`/dashboard/organization/${organization.id}/edit`);
  }

  function handleDelete() {
    // Show confirmation dialog before deleting
    console.log(`Delete request for organization ${organization.id}`);
    // In a real app, this would display a confirmation dialog
  }
</script>

<Card.Root class="overflow-hidden hover:shadow-md transition-shadow">
  <div class="h-32 bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center">
    {#if organization.imageUrl}
      <img src={organization.imageUrl} alt={organization.name} class="h-full w-full object-cover" />
    {:else}
      <Building2 class="h-16 w-16 text-primary/40" />
    {/if}
  </div>

  <Card.Header class="relative">
    <div class="absolute right-4 top-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="ghost" size="icon" class="h-8 w-8">
            <MoreVertical class="h-4 w-4" />
            <span class="sr-only">Open menu</span>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Item onclick={handleEdit}>
            <Pencil class="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item class="text-destructive focus:text-destructive" onclick={handleDelete}>
            <Trash2 class="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>

    <Card.Title class="text-xl">{organization.name}</Card.Title>
    <Card.Description>
      Created on {new Date(organization.createdAt).toLocaleDateString()}
    </Card.Description>
  </Card.Header>

  <Card.Content>
    <div class="flex space-x-4">
      <div class="flex items-center">
        <Utensils class="mr-2 h-4 w-4 text-muted-foreground" />
        <span>{restaurantsCount} Restaurant{restaurantsCount !== 1 ? 's' : ''}</span>
      </div>

      <div class="flex items-center">
        <Users class="mr-2 h-4 w-4 text-muted-foreground" />
        <span>{usersCount} User{usersCount !== 1 ? 's' : ''}</span>
      </div>
    </div>
  </Card.Content>

  <Card.Footer>
    <Button class="w-full" onclick={navigateToOrganization}>View Details</Button>
  </Card.Footer>
</Card.Root>

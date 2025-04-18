<!-- src/routes/organizations/[id]/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { Building2, ArrowLeft, Users, Utensils, Download, Printer } from 'lucide-svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { getOrganization } from '$lib/api/organizations';
  import { fetchRestaurants } from '$lib/api/restaurants';
  import { fetchUsers } from '$lib/api/users';
  import RestaurantList from '$lib/components/domain/restaurant/restaurant-list.svelte';
  import UserTable from '$lib/components/domain/user/user-table.svelte';
  import type { Organization, Restaurant, User } from '$lib/components/types/models';
  import { goto } from '$app/navigation';

  // Get organization ID from route params
  const organizationId = parseInt($page.params.id);

  // Component state
  let organization = $state<Organization | null>(null);
  let restaurants = $state<Restaurant[]>([]);
  let users = $state<User[]>([]);
  let isLoading = $state(true);
  let error = $state<string | null>(null);
  let activeTab = $state('overview');

  // Load data on component init
  $effect(() => {
    loadOrganizationData();
  });

  async function loadOrganizationData() {
    try {
      isLoading = true;
      error = null;

      // Fetch organization and related data
      const [org, orgRestaurants, orgUsers] = await Promise.all([
        getOrganization(organizationId),
        fetchRestaurants(organizationId),
        fetchUsers({ organizationId })
      ]);

      organization = org;
      restaurants = orgRestaurants;
      users = orgUsers;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load organization data';
      console.error(error);
    } finally {
      isLoading = false;
    }
  }

  function handleBackClick() {
    goto('/organizations');
  }

  function handleEditClick() {
    goto(`/organizations/${organizationId}/edit`);
  }
</script>

<div class="space-y-6">
  <!-- Header with back button and actions -->
  <div class="flex justify-between items-center">
    <Button variant="ghost" onclick={handleBackClick} class="gap-1">
      <ArrowLeft class="h-4 w-4" />
      Back to Organizations
    </Button>

    <div class="flex items-center gap-2">
      <Button variant="outline" size="sm" class="gap-1">
        <Printer class="h-4 w-4" />
        Print
      </Button>
      <Button variant="outline" size="sm" class="gap-1">
        <Download class="h-4 w-4" />
        Export
      </Button>
      <Button size="sm" onclick={handleEditClick}>Edit Organization</Button>
    </div>
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
        <Button variant="outline" onclick={loadOrganizationData}>Try Again</Button>
      </Card.Footer>
    </Card.Root>
  {:else if !organization}
    <Card.Root>
      <Card.Content class="flex flex-col items-center justify-center py-12">
        <Building2 class="h-16 w-16 text-muted-foreground mb-4" />
        <h3 class="text-xl font-semibold mb-2">Organization Not Found</h3>
        <p class="text-muted-foreground mb-6">
          The organization you're looking for doesn't exist or has been deleted.
        </p>
        <Button onclick={handleBackClick}>Go Back to Organizations</Button>
      </Card.Content>
    </Card.Root>
  {:else}
    <!-- Organization header -->
    <div class="flex items-center gap-4 pb-6 border-b">
      <div class="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
        {#if organization.imageUrl}
          <img
            src={organization.imageUrl}
            alt={organization.name}
            class="h-full w-full object-cover rounded-full"
          />
        {:else}
          <Building2 class="h-8 w-8 text-primary" />
        {/if}
      </div>

      <div>
        <h1 class="text-3xl font-bold">{organization.name}</h1>
        <div class="flex items-center gap-4 text-muted-foreground mt-1">
          <div class="flex items-center gap-1">
            <Utensils class="h-4 w-4" />
            <span>{restaurants.length} Restaurants</span>
          </div>
          <div class="flex items-center gap-1">
            <Users class="h-4 w-4" />
            <span>{users.length} Users</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Content tabs -->
    <Tabs.Root value={activeTab} onValueChange={(value) => (activeTab = value)}>
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="restaurants">
          Restaurants
          <Badge variant="secondary" class="ml-1">{restaurants.length}</Badge>
        </Tabs.Trigger>
        <Tabs.Trigger value="users">
          Users
          <Badge variant="secondary" class="ml-1">{users.length}</Badge>
        </Tabs.Trigger>
      </Tabs.List>

      <div class="p-4 pt-6">
        <!-- Overview Tab -->
        <Tabs.Content value="overview">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Organization Details -->
            <Card.Root>
              <Card.Header>
                <Card.Title>Organization Details</Card.Title>
                <Card.Description>Basic information about the organization</Card.Description>
              </Card.Header>
              <Card.Content>
                <div class="space-y-4">
                  <div>
                    <h4 class="text-sm font-medium text-muted-foreground mb-1">Name</h4>
                    <p>{organization.name}</p>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-muted-foreground mb-1">Created</h4>
                    <p>{new Date(organization.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-muted-foreground mb-1">Last Updated</h4>
                    <p>{new Date(organization.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </Card.Content>
            </Card.Root>

            <!-- Stats Card -->
            <Card.Root>
              <Card.Header>
                <Card.Title>Quick Stats</Card.Title>
                <Card.Description>Key metrics for this organization</Card.Description>
              </Card.Header>
              <Card.Content>
                <div class="grid grid-cols-2 gap-4">
                  <div class="p-4 border rounded-md">
                    <h4 class="text-sm font-medium text-muted-foreground mb-1">Total Users</h4>
                    <p class="text-2xl font-bold">{users.length}</p>
                  </div>
                  <div class="p-4 border rounded-md">
                    <h4 class="text-sm font-medium text-muted-foreground mb-1">
                      Total Restaurants
                    </h4>
                    <p class="text-2xl font-bold">{restaurants.length}</p>
                  </div>
                  <div class="p-4 border rounded-md">
                    <h4 class="text-sm font-medium text-muted-foreground mb-1">
                      Active Restaurants
                    </h4>
                    <p class="text-2xl font-bold">
                      {restaurants.filter((r) => !r.isDeleted).length}
                    </p>
                  </div>
                  <div class="p-4 border rounded-md">
                    <h4 class="text-sm font-medium text-muted-foreground mb-1">
                      Archived Restaurants
                    </h4>
                    <p class="text-2xl font-bold">
                      {restaurants.filter((r) => r.isDeleted).length}
                    </p>
                  </div>
                </div>
              </Card.Content>
            </Card.Root>
          </div>
        </Tabs.Content>

        <!-- Restaurants Tab -->
        <Tabs.Content value="restaurants">
          <RestaurantList {organizationId} />
        </Tabs.Content>

        <!-- Users Tab -->
        <Tabs.Content value="users">
          <UserTable {organizationId} />
        </Tabs.Content>
      </div>
    </Tabs.Root>
  {/if}
</div>

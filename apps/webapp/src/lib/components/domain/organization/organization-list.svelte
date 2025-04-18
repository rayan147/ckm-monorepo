<!-- src/lib/components/organization/OrganizationList.svelte -->
<script lang="ts">
  import { Plus, Search } from 'lucide-svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import OrganizationCard from '$lib/components/domain/organization/organization-card.svelte';
  import type { Organization } from '$lib/components/types/models';
  import { fetchOrganizations } from '$lib/api/organizations';

  let organizations = $state<Organization[]>([]);
  let isLoading = $state(true);
  let error = $state<string | null>(null);
  let searchQuery = $state('');
  let debugInfo = $state('');

  // Filtered organizations based on search query
  let filteredOrganizations = $derived.by(() => {
    if (!searchQuery.trim()) return organizations;

    const query = searchQuery.toLowerCase();
    return organizations.filter((org) => org.name.toLowerCase().includes(query));
  });

  // Load organizations on component init
  $effect(() => {
    loadOrganizations();
  });

  async function loadOrganizations() {
    try {
      isLoading = true;
      debugInfo = 'Fetching organizations...';

      // Use mock data directly for testing
      const mockOrgs = [
        {
          id: 1,
          name: 'Acme Catering',
          imageUrl: null,
          createdAt: '2023-10-01T14:00:00Z',
          updatedAt: '2023-10-01T14:00:00Z'
        },
        {
          id: 2,
          name: 'Healthcare Services Inc.',
          imageUrl: null,
          createdAt: '2023-11-15T09:30:00Z',
          updatedAt: '2023-11-15T09:30:00Z'
        },
        {
          id: 3,
          name: 'School District 12',
          imageUrl: null,
          createdAt: '2024-01-05T10:15:00Z',
          updatedAt: '2024-01-05T10:15:00Z'
        },
        {
          id: 4,
          name: 'Golden Years Homes',
          imageUrl: null,
          createdAt: '2024-02-20T16:45:00Z',
          updatedAt: '2024-02-20T16:45:00Z'
        }
      ];

      // First try the API function
      try {
        const apiOrgs = await fetchOrganizations();
        debugInfo += `\nFetched ${apiOrgs.length} organizations from API`;
        organizations = apiOrgs;
      } catch (apiErr) {
        debugInfo += `\nAPI fetch failed: ${apiErr}. Using mock data.`;
        organizations = mockOrgs;
      }

      debugInfo += `\nOrganizations loaded: ${organizations.length}`;
      console.log('Organizations loaded:', organizations);
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load organizations';
      debugInfo += `\nError: ${error}`;
      console.error(error);
    } finally {
      isLoading = false;
      debugInfo += '\nLoading completed';
    }
  }

  function handleAddOrganization() {
    // Navigate to organization creation form or show modal
  }
</script>

<div class="container mx-auto py-6">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Organizations</h1>

    <div class="flex space-x-4">
      <div class="relative">
        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search organizations..."
          class="pl-8 w-[250px]"
          bind:value={searchQuery}
        />
      </div>

      <Button onclick={loadOrganizations}>
        <span>Refresh</span>
      </Button>
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
        <Button variant="outline" onclick={loadOrganizations}>Try Again</Button>
      </Card.Footer>
    </Card.Root>
  {:else if filteredOrganizations.length === 0}
    <Card.Root>
      <Card.Content class="flex flex-col items-center justify-center py-12">
        {#if organizations.length === 0}
          <h3 class="text-xl font-semibold mb-2">No organizations found</h3>
          <p class="text-muted-foreground mb-6">Start by creating your first organization</p>
          <Button onclick={handleAddOrganization}>
            <Plus class="mr-2 h-4 w-4" />
            Add Organization
          </Button>
        {:else}
          <h3 class="text-xl font-semibold">No results found</h3>
          <p class="text-muted-foreground">Try a different search term</p>
        {/if}
      </Card.Content>
    </Card.Root>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredOrganizations as organization}
        <OrganizationCard {organization} />
      {/each}
    </div>
  {/if}
</div>

<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
  import MenuList from '$lib/components/domain/menu/menu-list.svelte';
  import MenuEditor from '$lib/components/domain/menu/menu-editor.svelte';
  import MenuPerformance from '$lib/components/domain/menu/menu-performance.svelte';
  import MenuDietaryCompliance from '$lib/components/domain/menu/menu-dietary-compliance.svelte';
  import { PlusCircle, List, ChefHat, TrendingUp, AlertCircle } from 'lucide-svelte';
  import { api } from '@ckm/lib-api';
  import LoadingSpinner from '$lib/components/domain/commons/loading-spinner.svelte';
  import * as Select from '$lib/components/ui/select/index.js';

  // State management
  let activeMenuId = $state<number | null>(null);
  let activeTab = $state<string>('menus');
  let restaurants = $state<any[]>([]);
  let value = $state('');
  let loading = $state(true);
  let error = $state<string | null>(null);

  // Define a constant for new menu mode
  const NEW_MENU_MODE = -1;

  // Derived states using the new Svelte 5 runes
  let selectedRestaurantId = $derived.by(() => {
    return value ? parseInt(value) : null;
  });

  // When restaurant changes, reset menu and tab state
  $effect(() => {
    if (selectedRestaurantId) {
      // Only reset if the restaurant actually changed
      activeMenuId = null;
      activeTab = 'menus';
    }
  });

  // Derived value for the restaurant dropdown
  let triggerContent = $derived(
    restaurants.find((restaurant) => restaurant.id.toString() === value)?.name ??
      'Select Restaurant'
  );

  // Derived state to determine if editor tab should be enabled
  let canAccessEditor = $derived.by(() => {
    // Always enable the editor tab if we're in "create new menu" mode
    // OR if there's an active menu selected
    return activeMenuId === NEW_MENU_MODE || (activeMenuId !== null && activeMenuId > 0);
  });

  // Derived state to determine if performance/dietary tabs should be enabled
  let canAccessMenuDetails = $derived.by(() => {
    // Only enable these tabs for existing menus (not for new menus)
    // Make sure we have a valid positive menu ID
    return activeMenuId !== null && activeMenuId !== NEW_MENU_MODE && activeMenuId > 0;
  });

  // Fetch restaurants on component mount
  onMount(async () => {
    try {
      const { status, body } = await api.restaurant.getRestaurants();
      if (status !== 200) throw new Error('Failed to fetch restaurants');
      if (status === 200) {
        restaurants = body;
      }
      loading = false;
    } catch (err) {
      error = err instanceof Error ? err.message : 'An unknown error occurred';
      loading = false;
    }
  });

  function handleMenuSelect(menuId: number) {
    if (menuId && menuId > 0) {
      console.log('Menu selected with ID:', menuId);
      activeMenuId = menuId; // Make sure this is set to the actual menu ID

      // Explicitly log to verify the ID is being set correctly
      console.log('activeMenuId after setting:', activeMenuId);

      // Auto-switch to editor tab when menu is selected
      activeTab = 'editor';
    }
  } // Create new menu
  function handleCreateMenu() {
    activeMenuId = NEW_MENU_MODE; // Use special ID to indicate new menu mode
    activeTab = 'editor'; // Switch to editor tab
  }

  // Handle save completion
  function handleSaveComplete(savedMenuId: number) {
    // Update to the real menu ID after saving
    activeMenuId = savedMenuId;
  }

  // Handle cancel
  function handleCancel() {
    // If we were creating a new menu, reset the menu ID
    if (activeMenuId === NEW_MENU_MODE) {
      activeMenuId = null;
    }
    // Return to menu list
    activeTab = 'menus';
  }
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Menu Management</h1>

  {#if loading}
    <LoadingSpinner />
  {:else if error}
    <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
      <div class="flex">
        <AlertCircle class="h-6 w-6 text-red-500 mr-3" />
        <p class="text-red-700">{error}</p>
      </div>
    </div>
  {:else}
    <div class="mb-6">
      <label for="restaurant-select" class="block text-sm font-medium text-gray-700 mb-2">
        Select Restaurant
      </label>
      <div class="flex gap-4">
        <Select.Root type="single" bind:value>
          <Select.Trigger class="w-[220px]">
            {triggerContent}
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.GroupHeading>Restaurants</Select.GroupHeading>
              {#each restaurants as restaurant (restaurant.id)}
                <Select.Item value={restaurant.id.toString()}>{restaurant.name}</Select.Item>
              {/each}
            </Select.Group>
          </Select.Content>
        </Select.Root>

        {#if selectedRestaurantId}
          <Button
            variant="outline"
            class="flex items-center gap-2"
            onclick={() => handleCreateMenu()}
          >
            <PlusCircle class="h-4 w-4" />
            <span>Create New Menu</span>
          </Button>
        {/if}
      </div>
    </div>

    {#if selectedRestaurantId}
      <Tabs bind:value={activeTab} class="space-y-4">
        <TabsList class="grid grid-cols-4">
          <TabsTrigger value="menus" class="flex items-center gap-2">
            <List class="h-4 w-4" />
            <span>Menus</span>
          </TabsTrigger>
          <TabsTrigger
            value="editor"
            class="flex items-center gap-2"
            onclick={() => {
              // Force enable this tab when clicked directly
              if (!canAccessEditor && activeMenuId === null) {
                // If we have no menu, enter create mode
                handleCreateMenu();
              }
            }}
          >
            <ChefHat class="h-4 w-4" />
            <span>Menu Editor</span>
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            class="flex items-center gap-2"
            disabled={!canAccessMenuDetails}
            onclick={() => {
              if (!canAccessMenuDetails) {
                // Alert the user why this tab is disabled
                alert('Please select an existing menu first to view performance data.');
                // Keep user on current tab by preventing the tab change
                return false;
              }
            }}
          >
            <TrendingUp class="h-4 w-4" />
            <span>Performance</span>
          </TabsTrigger>
          <TabsTrigger
            value="dietary"
            class="flex items-center gap-2"
            disabled={!canAccessMenuDetails}
            onclick={() => {
              if (!canAccessMenuDetails) {
                // Alert the user why this tab is disabled
                alert('Please select an existing menu first to view dietary compliance.');
                // Keep user on current tab by preventing the tab change
                return false;
              }
            }}
          >
            <AlertCircle class="h-4 w-4" />
            <span>Dietary Compliance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="menus" class="space-y-4">
          <MenuList
            restaurantId={selectedRestaurantId}
            activeMenuId={activeMenuId === NEW_MENU_MODE ? null : activeMenuId}
            onSelectMenu={handleMenuSelect}
            onCreateMenu={handleCreateMenu}
          />
          <!-- Debug display to see current state -->
          <div class="text-xs text-gray-500 mt-2">
            Debug: activeMenuId: {activeMenuId}, canAccessEditor: {canAccessEditor
              ? 'true'
              : 'false'}, canAccessMenuDetails: {canAccessMenuDetails ? 'true' : 'false'}
          </div>
        </TabsContent>

        <TabsContent value="editor" class="space-y-4">
          {#if activeMenuId === NEW_MENU_MODE}
            <!-- Creating a new menu -->
            <MenuEditor
              menuId={null}
              restaurantId={selectedRestaurantId}
              onSave={handleSaveComplete}
              onCancel={handleCancel}
            />
          {:else if activeMenuId !== null}
            <!-- Editing existing menu -->
            <MenuEditor
              menuId={activeMenuId}
              restaurantId={selectedRestaurantId}
              onSave={handleSaveComplete}
              onCancel={handleCancel}
            />
          {:else}
            <div class="bg-amber-50 border-l-4 border-amber-500 p-4">
              <p class="text-amber-700">Please select a menu to edit or create a new one.</p>
            </div>
          {/if}
        </TabsContent>

        <TabsContent value="performance" class="space-y-4">
          {#if activeMenuId !== null && activeMenuId !== NEW_MENU_MODE}
            <MenuPerformance menuId={activeMenuId} />
          {:else}
            <div class="bg-amber-50 border-l-4 border-amber-500 p-4">
              <p class="text-amber-700">Please select an existing menu to view performance data.</p>
            </div>
          {/if}
        </TabsContent>

        <TabsContent value="dietary" class="space-y-4">
          {#if activeMenuId !== null && activeMenuId !== NEW_MENU_MODE}
            <MenuDietaryCompliance menuId={activeMenuId} />
          {:else}
            <div class="bg-amber-50 border-l-4 border-amber-500 p-4">
              <p class="text-amber-700">
                Please select an existing menu to view dietary compliance data.
              </p>
            </div>
          {/if}
        </TabsContent>
      </Tabs>
    {/if}
  {/if}
</div>

<!-- src/lib/components/restaurant/RestaurantTabs.svelte -->
<script lang="ts">
  import {
    Utensils,
    Users,
    ShoppingCart,
    Book,
    BarChart3,
    Clock,
    Trash2,
    Clipboard,
    Pizza,
    ScrollText
  } from 'lucide-svelte';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import type { Restaurant } from '$lib/components/types/models';
  import UserTable from '$lib/components/domain/user/user-table.svelte';

  const { restaurant } = $props<{
    restaurant: Restaurant;
  }>();

  let activeTab = $state('overview');

  // Tab definitions with icons, labels and counter data
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Utensils },
    { id: 'users', label: 'Users', icon: Users, count: 0 },
    { id: 'menus', label: 'Menus', icon: Book, count: 0 },
    { id: 'inventory', label: 'Inventory', icon: ShoppingCart, count: 0 },
    { id: 'orders', label: 'Orders', icon: ScrollText, count: 0 },
    { id: 'recipes', label: 'Recipes', icon: Pizza, count: 0 },
    { id: 'production', label: 'Production', icon: Clock, count: 0 },
    { id: 'checklists', label: 'Checklists', icon: Clipboard, count: 0 },
    { id: 'waste', label: 'Waste', icon: Trash2, count: 0 },
    { id: 'reports', label: 'Reports', icon: BarChart3 }
  ];
</script>

<div class="space-y-6">
  <Tabs.Root value={activeTab} onValueChange={(value) => (activeTab = value)}>
    <Tabs.List class="grid grid-cols-5 lg:grid-cols-10">
      {#each tabs as tab}
        <Tabs.Trigger value={tab.id} class="flex-col py-3 px-1 h-auto">
          <span>{tab.label}</span>
          {#if tab.count !== undefined}
            <Badge variant="secondary" class="ml-1 text-xs">{tab.count}</Badge>
          {/if}
        </Tabs.Trigger>
      {/each}
    </Tabs.List>

    <div class="p-4 pt-6">
      <!-- Overview Tab -->
      <Tabs.Content value="overview">
        <div>
          <h3 class="text-xl font-semibold mb-4">Restaurant Overview</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="border rounded-md p-4">
              <h4 class="text-sm font-medium text-muted-foreground mb-2">Location</h4>
              <p class="text-lg">
                {restaurant.address}<br />
                {restaurant.city}, {restaurant.state}
                {restaurant.zipCode}
              </p>
            </div>

            <div class="border rounded-md p-4">
              <h4 class="text-sm font-medium text-muted-foreground mb-2">Owner</h4>
              <p class="text-lg">{restaurant.owner}</p>
            </div>

            <div class="border rounded-md p-4">
              <h4 class="text-sm font-medium text-muted-foreground mb-2">Food Cost</h4>
              <p class="text-lg">
                {restaurant.foodCost !== null && restaurant.foodCost !== undefined
                  ? `$${restaurant.foodCost.toFixed(2)}`
                  : 'Not set'}
              </p>
            </div>
          </div>
        </div>
      </Tabs.Content>

      <!-- Users Tab -->
      <Tabs.Content value="users">
        <UserTable restaurantId={restaurant.id} />
      </Tabs.Content>

      <!-- Menus Tab -->
      <Tabs.Content value="menus">
        <div class="flex flex-col items-center justify-center text-center py-12">
          <Book class="h-16 w-16 text-muted-foreground mb-4" />
          <h3 class="text-xl font-semibold mb-2">Menus Coming Soon</h3>
          <p class="text-muted-foreground max-w-md">
            The menu management feature is currently under development.
          </p>
        </div>
      </Tabs.Content>

      <!-- Inventory Tab -->
      <Tabs.Content value="inventory">
        <div class="flex flex-col items-center justify-center text-center py-12">
          <ShoppingCart class="h-16 w-16 text-muted-foreground mb-4" />
          <h3 class="text-xl font-semibold mb-2">Inventory Coming Soon</h3>
          <p class="text-muted-foreground max-w-md">
            The inventory management feature is currently under development.
          </p>
        </div>
      </Tabs.Content>

      <!-- Orders Tab -->
      <Tabs.Content value="orders">
        <div class="flex flex-col items-center justify-center text-center py-12">
          <ScrollText class="h-16 w-16 text-muted-foreground mb-4" />
          <h3 class="text-xl font-semibold mb-2">Orders Coming Soon</h3>
          <p class="text-muted-foreground max-w-md">
            The order management feature is currently under development.
          </p>
        </div>
      </Tabs.Content>

      <!-- Recipes Tab -->
      <Tabs.Content value="recipes">
        <div class="flex flex-col items-center justify-center text-center py-12">
          <Pizza class="h-16 w-16 text-muted-foreground mb-4" />
          <h3 class="text-xl font-semibold mb-2">Recipes Coming Soon</h3>
          <p class="text-muted-foreground max-w-md">
            The recipe management feature is currently under development.
          </p>
        </div>
      </Tabs.Content>

      <!-- Production Tab -->
      <Tabs.Content value="production">
        <div class="flex flex-col items-center justify-center text-center py-12">
          <Clock class="h-16 w-16 text-muted-foreground mb-4" />
          <h3 class="text-xl font-semibold mb-2">Production Planning Coming Soon</h3>
          <p class="text-muted-foreground max-w-md">
            The production planning feature is currently under development.
          </p>
        </div>
      </Tabs.Content>

      <!-- Checklists Tab -->
      <Tabs.Content value="checklists">
        <div class="flex flex-col items-center justify-center text-center py-12">
          <Clipboard class="h-16 w-16 text-muted-foreground mb-4" />
          <h3 class="text-xl font-semibold mb-2">Checklists Coming Soon</h3>
          <p class="text-muted-foreground max-w-md">
            The quality checklist feature is currently under development.
          </p>
        </div>
      </Tabs.Content>

      <!-- Waste Tab -->
      <Tabs.Content value="waste">
        <div class="flex flex-col items-center justify-center text-center py-12">
          <Trash2 class="h-16 w-16 text-muted-foreground mb-4" />
          <h3 class="text-xl font-semibold mb-2">Waste Management Coming Soon</h3>
          <p class="text-muted-foreground max-w-md">
            The waste tracking feature is currently under development.
          </p>
        </div>
      </Tabs.Content>

      <!-- Reports Tab -->
      <Tabs.Content value="reports">
        <div class="flex flex-col items-center justify-center text-center py-12">
          <BarChart3 class="h-16 w-16 text-muted-foreground mb-4" />
          <h3 class="text-xl font-semibold mb-2">Reports Coming Soon</h3>
          <p class="text-muted-foreground max-w-md">
            The reporting and analytics feature is currently under development.
          </p>
        </div>
      </Tabs.Content>
    </div>
  </Tabs.Root>
</div>

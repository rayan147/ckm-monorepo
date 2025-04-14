<script lang="ts">
  import { onMount } from 'svelte';
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import { AlertCircle, Edit, Trash2, Copy, Calendar } from 'lucide-svelte';
  import { format } from 'date-fns';
  import { api } from '@ckm/lib-api';

  interface Menu {
    id: number;
    name: string;
    itemCount: number;
    categories: { name: string; count: number }[];
    createdAt: string;
    updatedAt: string;
  }

  interface Props {
    restaurantId: number;
    activeMenuId: number | null;
    onSelectMenu: (menuId: number) => void;
    onCreateMenu: (menuId: number) => void;
  }

  let { restaurantId, activeMenuId, onSelectMenu, onCreateMenu }: Props = $props();

  // Initialize with empty array to prevent undefined errors
  let menus = $state<Menu[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);

  // Watch for restaurantId changes
  $effect(() => {
    if (restaurantId) {
      fetchMenus();
    } else {
      menus = [];
      loading = false;
    }
  });

  async function fetchMenus() {
    if (!restaurantId) return;

    loading = true;
    error = null;

    try {
      const response = await api.restaurant.getRestaurant({
        params: {
          id: restaurantId
        }
      });
      console.log({ response });
      if (response.status !== 200) throw new Error('Failed to fetch menus');
      if (response.status === 200) {
        // Ensure menus is always an array
        menus = Array.isArray(response.body.menus) ? response.body.menus : [];
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'An unknown error occurred';
      menus = []; // Reset menus on error
    } finally {
      loading = false;
    }
  }

  function selectMenu(menuId: number) {
    if (typeof onSelectMenu === 'function') {
      onSelectMenu(menuId);
    }
  }

  async function deleteMenu(menuId: number) {
    if (!confirm('Are you sure you want to delete this menu? This action cannot be undone.'))
      return;

    try {
      const response = await api.menu.deleteMenu({
        params: {
          id: menuId
        }
      });

      if (response.status !== 200) throw new Error('Failed to delete menu');

      if (response.status === 200) {
        menus = menus.filter((menu) => menu.id !== menuId);
      }

      if (activeMenuId === menuId && typeof onSelectMenu === 'function') {
        onSelectMenu(0);
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'An unknown error occurred';
    }
  }

  async function duplicateMenu(menuId: number) {
    try {
      const response = await fetch(`/api/menus/${menuId}/duplicate`, {
        method: 'POST'
      });

      if (!response.ok) throw new Error('Failed to duplicate menu');

      await fetchMenus();
    } catch (err) {
      error = err instanceof Error ? err.message : 'An unknown error occurred';
    }
  }
</script>

<div>
  <h2 class="text-2xl font-semibold mb-4">Menus</h2>

  {#if loading}
    <div class="flex items-center justify-center h-32">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  {:else if error}
    <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
      <div class="flex">
        <AlertCircle class="h-5 w-5 text-red-500 mr-2" />
        <p class="text-red-700">{error}</p>
      </div>
    </div>
  {:else if !menus || menus.length === 0}
    <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
      <p class="text-gray-600 mb-4">No menus found for this restaurant.</p>
      <Button variant="default">Create Your First Menu</Button>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each menus as menu}
        <Card class={activeMenuId === menu.id ? 'border-indigo-500 shadow-md' : ''}>
          <CardHeader class="pb-2">
            <div class="flex justify-between items-start">
              <CardTitle class="text-lg">{menu.name}</CardTitle>
              <Badge variant="outline">{menu.itemCount} items</Badge>
            </div>
            <CardDescription class="flex items-center mt-1">
              <Calendar class="h-3 w-3 mr-1" />
              <span>Updated {format(new Date(menu.updatedAt), 'MMM d, yyyy')}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <p class="text-sm text-gray-600">Categories:</p>
              <div class="flex flex-wrap gap-2">
                {#each menu.categories || [] as category}
                  <Badge variant="secondary" class="text-xs">
                    {category.name} ({category.count})
                  </Badge>
                {/each}
              </div>
            </div>
          </CardContent>
          <CardFooter class="flex justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              onclick={() => selectMenu(menu.id)}
              class="flex items-center gap-1"
            >
              <Edit class="h-3 w-3" />
              <span>Edit</span>
            </Button>
            <div class="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onclick={() => duplicateMenu(menu.id)}
                class="flex items-center gap-1"
              >
                <Copy class="h-3 w-3" />
                <span>Duplicate</span>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onclick={() => deleteMenu(menu.id)}
                class="flex items-center gap-1"
              >
                <Trash2 class="h-3 w-3" />
                <span>Delete</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      {/each}
    </div>
  {/if}
</div>

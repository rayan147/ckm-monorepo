<script lang="ts">
  import { Input } from '$lib/components/ui/input/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Search, Plus, X, Edit, ChevronRight, Clock, DollarSign } from 'lucide-svelte';
  import * as Table from '$lib/components/ui/table';
  import * as Card from '$lib/components/ui/card';
  import * as Avatar from '$lib/components/ui/avatar';
  import * as Pagination from '$lib/components/ui/pagination';
  import * as Dialog from '$lib/components/ui/dialog/index';
  import * as Tabs from '$lib/components/ui/tabs';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';
  import { toast } from 'svelte-sonner';
  import { goto } from '$app/navigation';
  import { navigating, page } from '$app/state';
  import { fade, fly, slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { enhance } from '$app/forms';
  import type { PageProps } from './$types';
  import Chef from '$lib/images/chef.svelte';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  // Initialize props with runes syntax
  let { data, form }: PageProps = $props();

  // State management with runes
  let searchTerm = $state(page.url.searchParams.get('search') || '');
  let recipeToDelete = $state(null);
  let isDialogOpen = $state(false);
  let viewMode = $state('recipeViewMode');

  // Check if we're in the browser environment before using localStorage
  $effect(() => {
    if (browser && viewMode) {
      viewMode = localStorage.getItem('recipeViewMode') || 'grid';
    }
  });

  onMount(() => {
    try {
      if (browser) {
        const savedViewMode = localStorage.getItem('recipeViewMode');
        if (savedViewMode) {
          viewMode = savedViewMode;
        }
      }
    } catch (error) {}
  });

  // Derived state
  let filteredRecipes = $derived(data?.recipes || []);

  // Loading state for skeletons
  const skeletonRows = Array(10).fill(null);

  // Handle form submission feedback
  $effect(() => {
    if (form) {
      if (form.success) {
        toast.success(form.message);
      } else {
        toast.error(form.message);
      }
    }
  });

  // Update dialog state when recipe to delete changes
  $effect(() => {
    isDialogOpen = !!recipeToDelete;
  });

  // Handle dialog close
  function handleDialogClose() {
    recipeToDelete = null;
    isDialogOpen = false;
  }

  // Handle search with debounce
  let searchTimeout: NodeJS.Timeout;
  function handleSearchInput() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      handleSearch();
    }, 300);
  }

  function handleSearch() {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    params.set('page', '1');
    goto(`?${params.toString()}`);
  }

  // Page navigation
  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(page.url.searchParams);
    params.set('page', newPage.toString());
    goto(`?${params.toString()}`);
  }
  // View mode toggle (grid/list)
  function toggleViewMode(mode: string) {
    viewMode = mode;
    if (typeof window !== 'undefined') {
      localStorage.setItem('recipeViewMode', mode);
    }
  }

  // Delete confirmation
  function confirmDelete(recipe: any) {
    recipeToDelete = recipe;
  }

  // Navigation to recipe details
  function navigateToRecipeDetails(id: number) {
    goto(`/dashboard/kitchen/recipe/${id}`);
  }

  // Create a new recipe
  function createNewRecipe() {
    goto(`/dashboard/kitchen/recipe/new`);
  }

  // Format cook time
  function formatCookTime(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
  }

  // Get skill level badge color
  function getSkillLevelColor(level: string): string {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-emerald-100 text-emerald-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-amber-100 text-amber-800';
      case 'expert':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
</script>

<main class="container mx-auto p-6 max-w-7xl">
  <!-- Header -->
  <header class="mb-8">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Recipe Manager</h1>
        <p class="text-muted-foreground mt-1">Manage and organize your culinary creations</p>
      </div>
      <Button onclick={createNewRecipe} class="w-full sm:w-auto">
        <Plus class="h-4 w-4 mr-2" />
        <span>New Recipe</span>
      </Button>
    </div>
  </header>

  <!-- Search and filter section -->
  <section class="mb-6" aria-labelledby="search-heading">
    <h2 id="search-heading" class="sr-only">Search and filter recipes</h2>
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="relative flex items-center flex-1">
        <Search class="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search recipes by name, ingredients or tags..."
          class="pl-10 w-full"
          bind:value={searchTerm}
          oninput={handleSearchInput}
          onkeydown={(e) => e.key === 'Enter' && handleSearch()}
          aria-label="Search recipes"
        />
      </div>

      <div class="flex items-center space-x-2" role="group" aria-label="View options">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'outline'}
          size="icon"
          class="h-10 w-10"
          onclick={() => toggleViewMode('grid')}
          aria-label="Grid view"
          aria-pressed={viewMode === 'grid'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-grid"
            aria-hidden="true"
            ><rect width="7" height="7" x="3" y="3" rx="1" /><rect
              width="7"
              height="7"
              x="14"
              y="3"
              rx="1"
            /><rect width="7" height="7" x="14" y="14" rx="1" /><rect
              width="7"
              height="7"
              x="3"
              y="14"
              rx="1"
            /></svg
          >
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          size="icon"
          class="h-10 w-10"
          onclick={() => toggleViewMode('list')}
          aria-label="List view"
          aria-pressed={viewMode === 'list'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-list"
            aria-hidden="true"
            ><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line
              x1="8"
              x2="21"
              y1="18"
              y2="18"
            /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line
              x1="3"
              x2="3.01"
              y1="18"
              y2="18"
            /></svg
          >
        </Button>
      </div>
    </div>
  </section>

  <!-- Main content -->
  <section class="mb-8" aria-labelledby="recipes-heading">
    <h2 id="recipes-heading" class="sr-only">Recipes</h2>
    {#key data?.pagination?.currentPage}
      {#if viewMode === 'grid'}
        <!-- Grid View -->
        <ul
          in:fade={{ duration: 300, easing: quintOut }}
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          role="list"
        >
          {#if navigating.to}
            {#each skeletonRows.slice(0, 8) as _}
              <li>
                <Card.Root>
                  <Card.Header class="p-0">
                    <Skeleton class="h-48 w-full rounded-t-lg" />
                  </Card.Header>
                  <Card.Content class="p-4">
                    <Skeleton class="h-6 w-3/4 mb-2" />
                    <Skeleton class="h-4 w-1/2 mb-4" />
                    <div class="flex justify-between">
                      <Skeleton class="h-4 w-16" />
                      <Skeleton class="h-4 w-16" />
                    </div>
                  </Card.Content>
                </Card.Root>
              </li>
            {/each}
          {:else}
            {#each data.recipes as recipe, i (recipe.id)}
              <li>
                <Card.Root>
                  <article
                    in:fly={{ y: 20, duration: 300, delay: i * 50, easing: quintOut }}
                    out:fly={{ y: -20, duration: 200, easing: quintOut }}
                    class="overflow-hidden group border hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <Card.Header class="p-0 relative">
                      <div class="relative h-48 overflow-hidden">
                        {#if recipe.imageUrls && recipe.imageUrls.length > 0}
                          <img
                            src={recipe.imageUrls[0]}
                            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                            alt={recipe.name}
                            loading="lazy"
                          />
                        {:else}
                          <div
                            class="bg-muted w-full h-full flex items-center justify-center text-muted-foreground"
                          >
                            <Chef class="h-12 w-12" />
                          </div>
                        {/if}

                        {#if recipe.dietaryRestrictions && recipe.dietaryRestrictions.length > 0}
                          <div class="absolute top-2 left-2 flex flex-wrap gap-1">
                            {#each recipe.dietaryRestrictions.slice(0, 2) as restriction}
                              <Badge variant="secondary" class="bg-background/80 backdrop-blur-sm">
                                {restriction.name}
                              </Badge>
                            {/each}
                            {#if recipe.dietaryRestrictions.length > 2}
                              <Badge variant="secondary" class="bg-background/80 backdrop-blur-sm">
                                +{recipe.dietaryRestrictions.length - 2}
                              </Badge>
                            {/if}
                          </div>
                        {/if}
                      </div>
                    </Card.Header>
                    <Card.Content class="p-4">
                      <h3 class="font-medium text-lg line-clamp-1 mb-1">{recipe.name}</h3>

                      <dl class="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <div class="flex items-center">
                          <dt class="sr-only">Cook Time</dt>
                          <Clock class="h-3 w-3 mr-1" aria-hidden="true" />
                          {formatCookTime(recipe.cookTime)}
                        </div>
                        <div class="flex items-center">
                          <dt class="sr-only">Food Cost</dt>
                          <DollarSign class="h-3 w-3 mr-1" aria-hidden="true" />
                          ${recipe.foodCost?.toFixed(2) || '0.00'}
                        </div>
                      </dl>

                      <div class="flex justify-between items-center">
                        {#if recipe.skillLevel}
                          <Badge variant="outline" class={getSkillLevelColor(recipe.skillLevel)}>
                            {recipe.skillLevel}
                          </Badge>
                        {:else}
                          <span></span>
                        {/if}

                        <div class="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            class="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onclick={(e) => {
                              e.stopPropagation();
                              confirmDelete(recipe);
                            }}
                            aria-label={`Delete ${recipe.name}`}
                          >
                            <X class="h-4 w-4" aria-hidden="true" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            class="h-8 w-8"
                            onclick={() => navigateToRecipeDetails(recipe.id)}
                            aria-label={`View ${recipe.name} details`}
                          >
                            <ChevronRight class="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                    </Card.Content>
                  </article>
                </Card.Root>
              </li>
            {/each}
          {/if}
        </ul>
      {:else}
        <!-- List View -->
        <section in:fade={{ duration: 300, easing: quintOut }} aria-label="Recipes List">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Recipe</Table.Head>
                <Table.Head>Cook Time</Table.Head>
                <Table.Head>Skill Level</Table.Head>
                <Table.Head>Cost</Table.Head>
                <Table.Head class="w-[100px]">Actions</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {#if navigating.to}
                {#each skeletonRows as _}
                  <Table.Row>
                    <Table.Cell>
                      <div class="flex items-center gap-3">
                        <Skeleton class="h-10 w-10 rounded-md" />
                        <div>
                          <Skeleton class="h-5 w-32 mb-1" />
                          <Skeleton class="h-4 w-24" />
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell class="hidden md:table-cell">
                      <Skeleton class="h-4 w-16" />
                    </Table.Cell>
                    <Table.Cell class="hidden md:table-cell">
                      <Skeleton class="h-5 w-24" />
                    </Table.Cell>
                    <Table.Cell class="text-right">
                      <Skeleton class="h-4 w-16 ml-auto" />
                    </Table.Cell>
                    <Table.Cell>
                      <div class="flex gap-2 justify-end">
                        <Skeleton class="h-8 w-8 rounded-md" />
                        <Skeleton class="h-8 w-8 rounded-md" />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                {/each}
              {:else}
                {#each data.recipes as recipe, i (recipe.id)}
                  <Table.Row
                    class="cursor-pointer hover:bg-muted/50 transition-colors"
                    onclick={() => navigateToRecipeDetails(recipe.id)}
                    onkeydown={(e) => e.key === 'Enter' && navigateToRecipeDetails(recipe.id)}
                    role="button"
                    aria-label={`View details for ${recipe.name}`}
                  >
                    <Table.Cell>
                      <div class="flex items-center gap-3">
                        <Avatar.Root class="h-10 w-10 rounded-md overflow-hidden">
                          {#if recipe.imageUrls && recipe.imageUrls.length > 0}
                            <Avatar.Image src={recipe.imageUrls[0]} alt={recipe.name} />
                          {/if}
                          <Avatar.Fallback class="bg-muted">
                            <Chef class="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                          </Avatar.Fallback>
                        </Avatar.Root>
                        <div>
                          <div class="font-medium">{recipe.name}</div>
                          <div class="text-sm text-muted-foreground">
                            {#if recipe.cookBook}
                              {recipe.cookBook.name}
                            {:else}
                              Uncategorized
                            {/if}
                          </div>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell class="hidden md:table-cell">
                      {formatCookTime(recipe.cookTime)}
                    </Table.Cell>
                    <Table.Cell class="hidden md:table-cell">
                      {#if recipe.skillLevel}
                        <Badge variant="outline" class={getSkillLevelColor(recipe.skillLevel)}>
                          {recipe.skillLevel}
                        </Badge>
                      {/if}
                    </Table.Cell>
                    <Table.Cell class="text-right font-medium">
                      ${recipe.foodCost?.toFixed(2) || '0.00'}
                    </Table.Cell>
                    <Table.Cell class="w-[100px]">
                      <div class="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          class="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onclick={(e) => {
                            e.stopPropagation();
                            confirmDelete(recipe);
                          }}
                          aria-label={`Delete ${recipe.name}`}
                        >
                          <X class="h-4 w-4" aria-hidden="true" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          class="h-8 w-8"
                          onclick={(e) => {
                            e.stopPropagation();
                            navigateToRecipeDetails(recipe.id);
                          }}
                        >
                          <Edit class="h-4 w-4" />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                {/each}
              {/if}
            </Table.Body>
          </Table.Root>
        </section>
      {/if}
    {/key}
  </section>

  <!-- Pagination -->
  <nav class="flex justify-center" aria-label="Pagination">
    {#if data && data.pagination}
      <Pagination.Root
        count={data.totalCount}
        perPage={data.pagination.perPage}
        page={data.pagination.currentPage}
      >
        {#snippet children({ pages, currentPage })}
          <Pagination.Content>
            <Pagination.Item>
              {#if currentPage}
                <div in:fade={{ duration: 100 }}>
                  <Pagination.PrevButton
                    onclick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Go to previous page"
                  />
                </div>
              {/if}
            </Pagination.Item>

            {#each pages as page (page.key)}
              {#if page.type === 'ellipsis'}
                <Pagination.Item>
                  <div in:fade>
                    <Pagination.Ellipsis />
                  </div>
                </Pagination.Item>
              {:else}
                <Pagination.Item>
                  <div in:fade={{ duration: 100 }}>
                    <Pagination.Link
                      {page}
                      isActive={currentPage === page.value}
                      onclick={() => handlePageChange(page.value)}
                      aria-label={`Go to page ${page.value}`}
                      aria-current={currentPage === page.value ? 'page' : undefined}
                    >
                      {page.value}
                    </Pagination.Link>
                  </div>
                </Pagination.Item>
              {/if}
            {/each}

            <Pagination.Item>
              {#if currentPage}
                <div in:fade={{ duration: 100 }}>
                  <Pagination.NextButton
                    onclick={() => handlePageChange(currentPage + 1)}
                    aria-label="Go to next page"
                    disabled={currentPage === Math.ceil(data.totalCount / data.pagination.perPage)}
                  />
                </div>
              {/if}
            </Pagination.Item>
          </Pagination.Content>
        {/snippet}
      </Pagination.Root>
    {/if}
  </nav>

  <!-- Delete Confirmation Dialog -->
  {#if recipeToDelete}
    <Dialog.Root
      bind:open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) handleDialogClose();
      }}
    >
      <Dialog.Content class="sm:max-w-md">
        <Dialog.Header>
          <Dialog.Title>Confirm Deletion</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete "{recipeToDelete?.name}"? This action cannot be undone.
          </Dialog.Description>
        </Dialog.Header>

        <form
          method="POST"
          action="?/deleteRecipe"
          use:enhance={({ formData }) => {
            console.log({ formData });
            return async ({ result, update }) => {
              if (result.type === 'success') {
                handleDialogClose();
                await update();
              }
            };
          }}
        >
          <input type="hidden" name="id" value={recipeToDelete?.id || ''} />

          <div class="flex justify-end space-x-2 mt-6">
            <Button type="button" variant="outline" onclick={handleDialogClose}>Cancel</Button>
            <Button type="submit" variant="destructive">Delete</Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  {/if}
</main>

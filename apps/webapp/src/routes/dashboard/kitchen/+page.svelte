<script lang="ts">
  import { Input } from '$lib/components/ui/input/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Search, Plus, Trash2, Edit, Clock, DollarSign, Grid, List } from 'lucide-svelte';
  import * as Table from '$lib/components/ui/table';
  import * as Card from '$lib/components/ui/card';
  import * as Avatar from '$lib/components/ui/avatar';
  import * as Pagination from '$lib/components/ui/pagination';
  import * as Dialog from '$lib/components/ui/dialog/index';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';
  import { toast } from 'svelte-sonner';
  import { goto } from '$app/navigation';
  import { navigating, page } from '$app/state';
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { enhance } from '$app/forms';
  import type { ActionData, PageProps } from './$types';
  import Chef from '$lib/images/chef.svelte';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import type { Recipe } from '@ckm/db';

  interface RecipeData {
    recipes: Recipe[];
    pagination: {
      currentPage: number;
      perPage: number;
    };
    totalCount: number;
  } // Initialize props with runes syntax
  let { data, form }: { data: RecipeData; form: ActionData } = $props();
  //

  // State management with runes
  let searchTerm = $state(page.url.searchParams.get('search') || '');
  let recipeToDelete = $state(null);
  let viewMode = $state('grid'); // Default to grid view

  onMount(() => {
    try {
      if (browser) {
        const savedViewMode = localStorage.getItem('recipeViewMode');
        if (savedViewMode) {
          viewMode = savedViewMode;
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  });

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

  // Handle dialog close
  function handleDialogClose() {
    recipeToDelete = null;
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
    if (browser) {
      localStorage.setItem('recipeViewMode', mode);
    }
  }

  // Delete confirmation
  function confirmDelete(recipe: any, event: Event) {
    event.stopPropagation();
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
    if (!minutes || isNaN(minutes)) return 'N/A';

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

  // Get formatted price
  function formatPrice(price: number): string {
    if (!price || isNaN(price)) return '$0.00';
    return `$${price.toFixed(2)}`;
  }
</script>

<svelte:head>
  <title>Recipe Manager | Kitchen Dashboard</title>
  <meta
    name="description"
    content="Manage and organize your culinary creations with our Recipe Manager"
  />
</svelte:head>

<main class="container mx-auto p-4 md:p-6 max-w-7xl">
  <!-- Page Header -->
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

  <!-- Search and filter toolbar -->
  <div class="mb-6 bg-card rounded-lg p-4 shadow-sm border">
    <form onsubmit={handleSearch} class="flex flex-col sm:flex-row gap-4" role="search">
      <div class="relative flex items-center flex-1">
        <label for="recipe-search" class="sr-only">Search recipes</label>
        <Search class="absolute left-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <Input
          id="recipe-search"
          type="search"
          placeholder="Search recipes by name, ingredients or tags..."
          class="pl-10 w-full"
          bind:value={searchTerm}
          oninput={handleSearchInput}
          autocomplete="off"
        />
      </div>

      <div class="flex items-center space-x-2" role="group" aria-label="View options">
        <Button
          type="button"
          variant={viewMode === 'grid' ? 'default' : 'outline'}
          size="icon"
          class="h-10 w-10"
          onclick={() => toggleViewMode('grid')}
          aria-label="Grid view"
          aria-pressed={viewMode === 'grid'}
        >
          <Grid class="h-4 w-4" aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant={viewMode === 'list' ? 'default' : 'outline'}
          size="icon"
          class="h-10 w-10"
          onclick={() => toggleViewMode('list')}
          aria-label="List view"
          aria-pressed={viewMode === 'list'}
        >
          <List class="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </form>
  </div>

  <!-- Status message for screen readers -->
  {#if data?.recipes?.length === 0}
    <div class="sr-only" role="status" aria-live="polite">No recipes found.</div>
  {/if}

  <!-- Main content -->
  <section aria-labelledby="recipes-heading" class="mb-8">
    <h2 id="recipes-heading" class="sr-only">Recipes</h2>

    {#if data?.recipes?.length === 0}
      <div
        class="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg border border-dashed"
      >
        <Chef class="h-16 w-16 text-muted-foreground mb-4" />
        <h3 class="text-lg font-medium">No recipes found</h3>
        <p class="text-muted-foreground mb-4">
          {searchTerm
            ? 'No recipes match your search criteria.'
            : 'Get started by adding your first recipe.'}
        </p>
        <Button onclick={createNewRecipe}>
          <Plus class="h-4 w-4 mr-2" />
          Create Recipe
        </Button>
      </div>
    {:else}
      {#key data?.pagination?.currentPage}
        {#if viewMode === 'grid'}
          <!-- Grid View -->
          <ul
            in:fade={{ duration: 300, easing: quintOut }}
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            role="list"
          >
            {#if navigating.to}
              {#each skeletonRows.slice(0, 8) as _, i}
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
                  <article
                    in:fly={{ y: 20, duration: 300, delay: i * 50, easing: quintOut }}
                    out:fly={{ y: -20, duration: 200, easing: quintOut }}
                    class="h-full"
                  >
                    <Card.Root
                      class="h-full overflow-hidden group border hover:border-primary/50 hover:shadow-md transition-all"
                    >
                      <button
                        class="text-left w-full h-full flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        onclick={() => navigateToRecipeDetails(recipe.id)}
                        aria-label={`View details for ${recipe.name}`}
                      >
                        <Card.Header class="p-0 relative flex-shrink-0">
                          <div class="relative h-48 overflow-hidden">
                            {#if recipe.imageUrls && recipe.imageUrls.length > 0}
                              <img
                                src={recipe.imageUrls[0]}
                                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                alt=""
                                loading="lazy"
                              />
                            {:else}
                              <div
                                class="bg-muted w-full h-full flex items-center justify-center text-muted-foreground"
                              >
                                <Chef class="h-12 w-12" aria-hidden="true" />
                              </div>
                            {/if}

                            {#if recipe.dietaryRestrictions && recipe.dietaryRestrictions.length > 0}
                              <div
                                class="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[calc(100%-1rem)]"
                              >
                                {#each recipe.dietaryRestrictions.slice(0, 2) as restriction}
                                  <Badge
                                    variant="secondary"
                                    class="bg-background/90 backdrop-blur-sm"
                                  >
                                    {restriction.name}
                                  </Badge>
                                {/each}
                                {#if recipe.dietaryRestrictions.length > 2}
                                  <Badge
                                    variant="secondary"
                                    class="bg-background/90 backdrop-blur-sm"
                                  >
                                    +{recipe.dietaryRestrictions.length - 2}
                                  </Badge>
                                {/if}
                              </div>
                            {/if}
                          </div>
                        </Card.Header>

                        <Card.Content class="p-4 flex-grow flex flex-col">
                          <h3 class="font-medium text-lg line-clamp-1 mb-1">{recipe.name}</h3>

                          {#if recipe.cookBook}
                            <p class="text-sm text-muted-foreground mb-2 line-clamp-1">
                              {recipe.cookBook.name}
                            </p>
                          {/if}

                          <dl
                            class="flex items-center gap-3 text-sm text-muted-foreground mb-3 mt-auto"
                          >
                            <div class="flex items-center">
                              <dt class="sr-only">Cook Time</dt>
                              <Clock class="h-3 w-3 mr-1" aria-hidden="true" />
                              <dd>{formatCookTime(recipe.cookTime)}</dd>
                            </div>
                            <div class="flex items-center">
                              <dt class="sr-only">Food Cost</dt>
                              <DollarSign class="h-3 w-3 mr-1" aria-hidden="true" />
                              <dd>{formatPrice(recipe.foodCost)}</dd>
                            </div>
                          </dl>

                          <div class="flex justify-between items-center mt-auto">
                            {#if recipe.skillLevel}
                              <Badge
                                variant="outline"
                                class={getSkillLevelColor(recipe.skillLevel)}
                              >
                                {recipe.skillLevel}
                              </Badge>
                            {:else}
                              <span></span>
                            {/if}

                            <div class="flex space-x-1 ml-auto">
                              <!-- Delete button -->
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                class="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onclick={(e) => confirmDelete(recipe, e)}
                                aria-label={`Delete ${recipe.name}`}
                              >
                                <Trash2 class="h-4 w-4" aria-hidden="true" />
                              </Button>

                              <!-- Edit button -->
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                class="h-8 w-8 hover:bg-primary/10"
                                onclick={(e) => {
                                  e.stopPropagation();
                                  navigateToRecipeDetails(recipe.id);
                                }}
                                aria-label={`Edit ${recipe.name}`}
                              >
                                <Edit class="h-4 w-4" aria-hidden="true" />
                              </Button>
                            </div>
                          </div>
                        </Card.Content>
                      </button>
                    </Card.Root>
                  </article>
                </li>
              {/each}
            {/if}
          </ul>
        {:else}
          <!-- List View -->
          <div
            in:fade={{ duration: 300, easing: quintOut }}
            class="rounded-lg border overflow-hidden"
          >
            <Table.Root>
              <caption class="sr-only">List of recipes</caption>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Recipe</Table.Head>
                  <Table.Head class="hidden md:table-cell">Cook Time</Table.Head>
                  <Table.Head class="hidden md:table-cell">Skill Level</Table.Head>
                  <Table.Head class="hidden sm:table-cell">Cost</Table.Head>
                  <Table.Head class="w-[100px] text-right">Actions</Table.Head>
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
                      <Table.Cell class="hidden sm:table-cell">
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
                    <Table.Row>
                      <Table.Cell>
                        <button
                          class="flex items-center gap-3 w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                          onclick={() => navigateToRecipeDetails(recipe.id)}
                          aria-label={`View details for ${recipe.name}`}
                        >
                          <Avatar.Root class="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                            {#if recipe.imageUrls && recipe.imageUrls.length > 0}
                              <Avatar.Image src={recipe.imageUrls[0]} alt="" />
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
                        </button>
                      </Table.Cell>
                      <Table.Cell class="hidden md:table-cell">
                        <span class="inline-flex items-center">
                          <Clock class="h-3 w-3 mr-1 text-muted-foreground" aria-hidden="true" />
                          {formatCookTime(recipe.cookTime)}
                        </span>
                      </Table.Cell>
                      <Table.Cell class="hidden md:table-cell">
                        {#if recipe.skillLevel}
                          <Badge variant="outline" class={getSkillLevelColor(recipe.skillLevel)}>
                            {recipe.skillLevel}
                          </Badge>
                        {/if}
                      </Table.Cell>
                      <Table.Cell class="hidden sm:table-cell font-medium">
                        <span class="inline-flex items-center">
                          <DollarSign
                            class="h-3 w-3 mr-0.5 text-muted-foreground"
                            aria-hidden="true"
                          />
                          {formatPrice(recipe?.foodCost ?? 0)}
                        </span>
                      </Table.Cell>
                      <Table.Cell class="w-[100px]">
                        <div class="flex items-center justify-end gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            class="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onclick={(e) => confirmDelete(recipe, e)}
                            aria-label={`Delete ${recipe.name}`}
                          >
                            <Trash2 class="h-4 w-4" aria-hidden="true" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            class="h-8 w-8"
                            onclick={(e) => {
                              e.stopPropagation();
                              navigateToRecipeDetails(recipe.id);
                            }}
                            aria-label={`Edit ${recipe.name}`}
                          >
                            <Edit class="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  {/each}
                {/if}
              </Table.Body>
            </Table.Root>
          </div>
        {/if}
      {/key}
    {/if}
  </section>

  <!-- Pagination -->
  {#if data?.pagination && data.totalCount > data.pagination.perPage}
    <nav class="flex justify-center mt-8" aria-label="Pagination">
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
    </nav>
  {/if}

  <!-- Delete Confirmation Dialog -->
  {#if recipeToDelete}
    <Dialog.Root
      open={!!recipeToDelete}
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
            return async ({ result, update }) => {
              if (result.type === 'success') {
                handleDialogClose();
                await update();
              }
            };
          }}
        >
          <Input type="hidden" name="id" value={recipeToDelete?.id || ''} />

          <div class="flex justify-end space-x-2 mt-6">
            <Button type="button" variant="outline" onclick={handleDialogClose}>Cancel</Button>
            <Button type="submit" variant="destructive">Delete</Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  {/if}
</main>

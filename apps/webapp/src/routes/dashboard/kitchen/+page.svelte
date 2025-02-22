<script lang="ts">
  import { Input } from '$lib/components/ui/input/index.js';
  import { Search, X, SquareArrowUpRight } from 'lucide-svelte';
  import * as Table from '$lib/components/ui/table';
  import type { PageProps } from './$types';
  import * as Pagination from '$lib/components/ui/pagination';
  import { goto } from '$app/navigation';
  import { navigating, page } from '$app/state';
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { enhance } from '$app/forms';
  import * as Dialog from '$lib/components/ui/dialog/index';
  import { toast } from 'svelte-sonner';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';
  import Button from '$lib/components/ui/button/button.svelte';

  let { data, form }: PageProps = $props();
  let searchTerm = $state(page.url.searchParams.get('search') || '');

  let recipeToDelete = $state(null);

  const skeletonRows = Array(10).fill(null);

  $effect(() => {
    if (form) {
      if (form.success) {
        toast.success(form.message);
      } else {
        toast.error(form.message);
      }
    }
  });
  let isDialogOpen = $state(false);

  $effect(() => {
    // When recipeToDelete changes, update dialog state
    isDialogOpen = !!recipeToDelete;
  });

  function handleDialogClose() {
    recipeToDelete = null;
    isDialogOpen = false;
  }
  function handleSearch() {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    params.set('page', '1');
    goto(`?${params.toString()}`);
  }

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(page.url.searchParams);
    params.set('page', newPage.toString());
    goto(`?${params.toString()}`);
  }

  function confirmDelete(recipe: any) {
    recipeToDelete = recipe;
  }

  function navigateToRecipeDetails(id: number) {
    goto(`/dashboard/kitchen/recipe/${id}`);
  }
</script>

<!-- Search section remains the same -->
<section class="w-full flex justify-center mt-10">
  <div class="relative flex items-center w-full max-w-3xl">
    <Search class="absolute left-3 h-4 w-4 text-muted-foreground" />
    <Input
      type="search"
      placeholder="Search for recipes"
      class="pl-10 w-full"
      bind:value={searchTerm}
      onkeydown={(e) => e.key === 'Enter' && handleSearch()}
    />
  </div>
</section>

<!-- Table with transitions -->
<section class="mt-6">
  {#key data.pagination?.currentPage}
    <div in:fade={{ duration: 300, easing: quintOut }}>
      <Table.Root>
        <Table.Caption>A list of your top recent recipes.</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head class="w-[100px]">Name</Table.Head>
            <Table.Head>Cook Time</Table.Head>
            <Table.Head>Image</Table.Head>
            <Table.Head class="text-right">Cost</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#if navigating.to}
            {#each skeletonRows as _, i}
              <Table.Row>
                <Table.Cell>
                  <Skeleton class="h-4 w-[120px]" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton class="h-4 w-[80px]" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton class="h-10 w-10 rounded-md" />
                </Table.Cell>
                <Table.Cell class="text-right">
                  <Skeleton class="h-4 w-[60px] ml-auto" />
                </Table.Cell>
                <Table.Cell>
                  <div class="flex gap-2">
                    <Skeleton class="h-6 w-6 rounded-full" />
                    <Skeleton class="h-6 w-6 rounded-full" />
                  </div>
                </Table.Cell>
              </Table.Row>
            {/each}
          {:else}
            {#each data.recipes as recipe, i (recipe.id)}
              <Table.Row>
                <Table.Cell class="font-medium">
                  <div
                    in:fly={{ y: 20, duration: 300, delay: i * 50, easing: quintOut }}
                    out:fade={{ duration: 200 }}
                  >
                    {recipe.name}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div
                    in:fly={{ y: 20, duration: 300, delay: i * 50, easing: quintOut }}
                    out:fade={{ duration: 200 }}
                  >
                    {recipe.cookTime} mins
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div
                    in:fly={{ y: 20, duration: 300, delay: i * 50, easing: quintOut }}
                    out:fade={{ duration: 200 }}
                  >
                    <img
                      src={recipe.imageUrl}
                      class="rounded-md object-cover h-10"
                      alt={recipe.description}
                      loading="lazy"
                    />
                  </div>
                </Table.Cell>
                <Table.Cell class="text-right">
                  <div
                    in:fly={{ y: 20, duration: 300, delay: i * 50, easing: quintOut }}
                    out:fade={{ duration: 200 }}
                  >
                    ${recipe.foodCost}
                  </div>
                </Table.Cell>
                <Table.Cell class="flex ">
                  <div
                    in:fly={{ y: 20, duration: 300, delay: i * 50, easing: quintOut }}
                    out:fade={{ duration: 200 }}
                    class="m-1 cursor-pointer hover:text-destructive"
                  >
                    <X role="button" onclick={() => confirmDelete(recipe)} />
                  </div>
                  <div
                    in:fly={{ y: 20, duration: 300, delay: i * 50, easing: quintOut }}
                    out:fade={{ duration: 200 }}
                    class="m-1 cursor-pointer hover:text-primary"
                  >
                    <SquareArrowUpRight
                      role="button"
                      onclick={(e) => navigateToRecipeDetails(recipe.id)}
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
            {/each}
          {/if}
        </Table.Body>
      </Table.Root>
    </div>
  {/key}
</section>

<!-- Pagination with transitions -->
<section class="mt-6 flex justify-center">
  {#if data && data.pagination}
    <Pagination.Root
      count={data.totalCount}
      perPage={data.pagination.perPage}
      page={data.pagination.currentPage}
      let:pages
      let:currentPage
    >
      <Pagination.Content>
        <Pagination.Item>
          {#if currentPage}
            <div in:fade={{ duration: 100 }}>
              <Pagination.PrevButton
                onclick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
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
                disabled={currentPage === Math.ceil(data.totalCount / data.pagination.perPage)}
              />
            </div>
          {/if}
        </Pagination.Item>
      </Pagination.Content>
    </Pagination.Root>
  {/if}
</section>

<!-- Delete Confirmation Dialog -->
<section>
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
            Are you sure you want to delete "{recipeToDelete?.name}"?
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
          <input type="hidden" name="id" value={recipeToDelete?.id || ''} />

          <div class="flex justify-end space-x-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onclick={handleDialogClose}
              class="px-4 py-2 border rounded-md hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              class="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90"
            >
              Delete
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  {/if}
</section>

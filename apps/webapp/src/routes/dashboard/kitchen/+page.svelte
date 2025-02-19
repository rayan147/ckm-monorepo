<script lang="ts">
  import { Input } from '$lib/components/ui/input/index.js';
  import { Search } from 'lucide-svelte';
  import * as Table from '$lib/components/ui/table';
  import type { PageProps } from './$types';
  import * as Pagination from '$lib/components/ui/pagination';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';

  let { data }: PageProps = $props();
  let searchTerm = $state(page.url.searchParams.get('search') || '');

  // Handle search input
  function handleSearch() {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    params.set('page', '1'); // Reset to first page on new search
    goto(`?${params.toString()}`);
  }

  // Handle page change
  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(page.url.searchParams);
    params.set('page', newPage.toString());
    goto(`?${params.toString()}`);
  }
</script>

<section class="w-full flex justify-center mt-10">
  <div class="relative flex items-center w-full max-w-3xl">
    <Search class="absolute left-3 h-4 w-4 text-muted-foreground" />
    <Input
      type="search"
      placeholder="Search for recipes"
      class="pl-10 w-full"
      bind:value={searchTerm}
      on:keydown={(e) => e.key === 'Enter' && handleSearch()}
    />
  </div>
</section>

<!-- Table components -->
<section class="mt-6">
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
      {#each data.recipes as { id, name, cookTime, imageUrl, description }, i (id)}
        <Table.Row>
          <Table.Cell class="font-medium">{name}</Table.Cell>
          <Table.Cell>{cookTime} mins</Table.Cell>
          <Table.Cell>
            <img src={imageUrl} class="rounded-md object-cover h-10" alt={description} />
          </Table.Cell>
          <Table.Cell class="text-right">$250.00</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</section>

<!-- Pagination -->
<section class="mt-6 flex justify-center">
  {#if data && data.pagination}
    <Pagination.Root
      count={data.totalCount}
      perPage={data.pagination.perPage}
      currentPage={data.pagination.currentPage}
      let:pages
      let:currentPage
    >
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.PrevButton
            on:click={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
        </Pagination.Item>
        {#each pages as page (page.key)}
          {#if page.type === 'ellipsis'}
            <Pagination.Item>
              <Pagination.Ellipsis />
            </Pagination.Item>
          {:else}
            <Pagination.Item isVisible={true}>
              <Pagination.Link
                {page}
                isActive={currentPage === page.value}
                onclick={() => handlePageChange(page.value)}
              >
                {page.value}
              </Pagination.Link>
            </Pagination.Item>
          {/if}
        {/each}
        <Pagination.Item>
          <Pagination.NextButton
            onclick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(data.totalCount / data.pagination.perPage)}
          />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination.Root>
  {/if}
</section>

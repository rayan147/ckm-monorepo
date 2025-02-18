<script lang="ts">
  import { Input } from '$lib/components/ui/input/index.js';
  import { Search } from 'lucide-svelte';
  import * as Table from '$lib/components/ui/table';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  console.log(data);
</script>

<section class="w-full flex justify-center mt-10">
  <div class="relative flex items-center w-full max-w-3xl">
    <Search class="absolute left-3 h-4 w-4 text-muted-foreground" />
    <Input type="search" placeholder="Search for recipes" class="pl-10 w-full" />
  </div>
</section>

<!-- Table components -->
<section class="mt-6">
  <Table.Root>
    <Table.Caption>A list of your recent recipes.</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[100px]">Name</Table.Head>
        <Table.Head>Category</Table.Head>
        <Table.Head>Menu</Table.Head>
        <Table.Head class="text-right">Image</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each data.recipes as { id, name }, i (id)}
        <Table.Row>
          <Table.Cell class="font-medium">{name}</Table.Cell>
          <Table.Cell>Paid</Table.Cell>
          <Table.Cell>Credit Card</Table.Cell>
          <Table.Cell class="text-right">$250.00</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</section>

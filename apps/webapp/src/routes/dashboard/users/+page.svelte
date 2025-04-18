<!-- src/routes/users/+page.svelte -->
<script lang="ts">
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import UserTable from '$lib/components/domain/user/user-table.svelte';
  import UserAssignment from '$lib/components/domain/user/user-assigment.svelte';

  let activeTab = $state('table');
</script>

<div class="space-y-6">
  <h1 class="text-3xl font-bold">Users</h1>

  <Tabs.Root value={activeTab} onValueChange={(value) => (activeTab = value)}>
    <Tabs.List>
      <Tabs.Trigger value="table">User List</Tabs.Trigger>
      <Tabs.Trigger value="assignment">User Assignment</Tabs.Trigger>
    </Tabs.List>

    <div class="pt-6">
      <Tabs.Content value="table">
        <UserTable />
      </Tabs.Content>

      <Tabs.Content value="assignment">
        <UserAssignment />
      </Tabs.Content>
    </div>
  </Tabs.Root>
</div>

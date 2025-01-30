<!-- src/routes/kitchen/+page.svelte -->
<script lang="ts">
  import RecipeList from '$lib/components/Recipe/RecipeList.svelte';
  import PrepBoardList from '$lib/components/PrepBoard/PrepBoardList.svelte';
  import UnitConversion from '$lib/components/Dashboard/UnitConversion.svelte';

  let activeTab = $state('recipes');
</script>

<div class="px-4 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8">
  <h1 class="mb-6 text-3xl font-bold text-gray-900">Kitchen Management</h1>

  <!-- Tabs -->
  <div class="mb-6 border-b border-gray-200">
    <nav class="flex -mb-px space-x-8" aria-label="Tabs">
      <button
        class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none
          {activeTab === 'recipes'
          ? 'border-indigo-500 text-indigo-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
        onclick={() => (activeTab = 'recipes')}
      >
        Recipes
      </button>
      <button
        class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none
          {activeTab === 'prepBoards'
          ? 'border-indigo-500 text-indigo-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
        onclick={() => (activeTab = 'prepBoards')}
      >
        Prep Boards
      </button>
      <button
        class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none
          {activeTab === 'Kitchen Unit Conversion'
          ? 'border-indigo-500 text-indigo-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
        onclick={() => (activeTab = 'Kitchen Unit Conversion')}
      >
        Kitchen Unit Conversion
      </button>
    </nav>
  </div>

  {#if activeTab === 'recipes'}
    <!-- Recipes Tab -->
    <RecipeList />
  {:else if activeTab === 'prepBoards'}
    <!-- Prep Boards Tab -->
    <PrepBoardList />
  {:else if activeTab === 'Kitchen Unit Conversion'}
    <div class="mt-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Kitchen Unit Conversion</h2>
      <UnitConversion />
    </div>
  {/if}
</div>

<style>
  /* Add any custom styles here */
</style>

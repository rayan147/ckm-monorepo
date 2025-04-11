<!-- src/lib/recipe/RecipeTabs.svelte -->
<script lang="ts">
  import * as Menubar from '$lib/components/ui/menubar/index.js';
  import { BookOpen, ChefHat, List, Settings, Shield } from 'lucide-svelte';
  import OverviewTab from './tabs/overview-tab.svelte';
  import IngredientsTab from './tabs/ingredients-tab.svelte';
  import InstructionsTab from './tabs/instructions-tab.svelte';
  import EquipmentTab from './tabs/equipment-tab.svelte';
  import SafetyTab from './tabs/safety-tab.svelte';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';

  const recipeState = getRecipeContext();

  // Define the available tabs
  const TAB_VALUES = {
    OVERVIEW: 'overview',
    INGREDIENTS: 'ingredients',
    INSTRUCTIONS: 'instructions',
    EQUIPMENT: 'equipment',
    SAFETY: 'safety'
  };

  // Function to change active tab
  function setActiveTab(tabValue: string) {
    recipeState.activeTab = tabValue;
  }

  // Icons for each section (we'll use these in the content area)
  const SECTION_ICONS = {
    [TAB_VALUES.OVERVIEW]: BookOpen,
    [TAB_VALUES.INGREDIENTS]: List,
    [TAB_VALUES.INSTRUCTIONS]: ChefHat,
    [TAB_VALUES.EQUIPMENT]: Settings,
    [TAB_VALUES.SAFETY]: Shield
  };
</script>

<div class="recipe-container max-w-4xl mx-auto">
  <!-- Modern, attractive menu bar for navigation -->
  <div class="mb-6 rounded-lg overflow-hidden shadow-md border border-gray-100">
    <Menubar.Root class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-none">
      <!-- Overview section -->
      <Menubar.Menu>
        <Menubar.Trigger
          class="px-4 py-3 hover:bg-white/10 transition-colors font-medium {recipeState.activeTab ===
          TAB_VALUES.OVERVIEW
            ? 'bg-white/20'
            : ''}"
          aria-label="View recipe overview"
          onclick={() => setActiveTab(TAB_VALUES.OVERVIEW)}
        >
          Overview
        </Menubar.Trigger>
      </Menubar.Menu>

      <!-- Ingredients section -->
      <Menubar.Menu>
        <Menubar.Trigger
          class="px-4 py-3 hover:bg-white/10 transition-colors font-medium {recipeState.activeTab ===
          TAB_VALUES.INGREDIENTS
            ? 'bg-white/20'
            : ''}"
          aria-label="View recipe ingredients"
          onclick={() => setActiveTab(TAB_VALUES.INGREDIENTS)}
        >
          Ingredients
        </Menubar.Trigger>
      </Menubar.Menu>

      <!-- Instructions section -->
      <Menubar.Menu>
        <Menubar.Trigger
          class="px-4 py-3 hover:bg-white/10 transition-colors font-medium {recipeState.activeTab ===
          TAB_VALUES.INSTRUCTIONS
            ? 'bg-white/20'
            : ''}"
          aria-label="View cooking instructions"
          onclick={() => setActiveTab(TAB_VALUES.INSTRUCTIONS)}
        >
          Instructions
        </Menubar.Trigger>
      </Menubar.Menu>

      <!-- Equipment section -->
      <Menubar.Menu>
        <Menubar.Trigger
          class="px-4 py-3 hover:bg-white/10 transition-colors font-medium {recipeState.activeTab ===
          TAB_VALUES.EQUIPMENT
            ? 'bg-white/20'
            : ''}"
          aria-label="View required equipment"
          onclick={() => setActiveTab(TAB_VALUES.EQUIPMENT)}
        >
          Equipment
        </Menubar.Trigger>
      </Menubar.Menu>

      <!-- Safety & Storage section -->
      <Menubar.Menu>
        <Menubar.Trigger
          class="px-4 py-3 hover:bg-white/10 transition-colors font-medium {recipeState.activeTab ===
          TAB_VALUES.SAFETY
            ? 'bg-white/20'
            : ''}"
          aria-label="View safety and storage information"
          onclick={() => setActiveTab(TAB_VALUES.SAFETY)}
        >
          Safety &amp; Storage
        </Menubar.Trigger>
      </Menubar.Menu>
    </Menubar.Root>
  </div>

  <!-- Content area with header -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <!-- Section header with icon -->
    <header class="flex items-center gap-3 pb-6 mb-6 border-b border-gray-100">
      <div class="bg-indigo-100 p-2 rounded-full">
        <svelte:component
          this={SECTION_ICONS[recipeState.activeTab]}
          size={24}
          class="text-indigo-600"
          aria-hidden="true"
        />
      </div>
      <h2 class="text-2xl font-bold text-gray-800">
        {#if recipeState.activeTab === TAB_VALUES.OVERVIEW}
          Recipe Overview
        {:else if recipeState.activeTab === TAB_VALUES.INGREDIENTS}
          Ingredients
        {:else if recipeState.activeTab === TAB_VALUES.INSTRUCTIONS}
          Cooking Instructions
        {:else if recipeState.activeTab === TAB_VALUES.EQUIPMENT}
          Required Equipment
        {:else if recipeState.activeTab === TAB_VALUES.SAFETY}
          Safety & Storage
        {/if}
      </h2>
    </header>

    <!-- Content based on active tab -->
    <div class="tab-content" role="region" aria-live="polite">
      {#if recipeState.activeTab === TAB_VALUES.OVERVIEW}
        <OverviewTab />
      {:else if recipeState.activeTab === TAB_VALUES.INGREDIENTS}
        <IngredientsTab />
      {:else if recipeState.activeTab === TAB_VALUES.INSTRUCTIONS}
        <InstructionsTab />
      {:else if recipeState.activeTab === TAB_VALUES.EQUIPMENT}
        <EquipmentTab />
      {:else if recipeState.activeTab === TAB_VALUES.SAFETY}
        <SafetyTab />
      {/if}
    </div>
  </div>

  <!-- Mobile navigation (visible on small screens only) -->
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 md:hidden z-10">
    <nav class="flex justify-between items-center">
      <button
        class="flex flex-col items-center p-2 {recipeState.activeTab === TAB_VALUES.OVERVIEW
          ? 'text-indigo-600'
          : 'text-gray-500'}"
        aria-label="View recipe overview"
        onclick={() => setActiveTab(TAB_VALUES.OVERVIEW)}
      >
        <BookOpen size={20} />
        <span class="text-xs mt-1">Overview</span>
      </button>

      <button
        class="flex flex-col items-center p-2 {recipeState.activeTab === TAB_VALUES.INGREDIENTS
          ? 'text-indigo-600'
          : 'text-gray-500'}"
        aria-label="View recipe ingredients"
        onclick={() => setActiveTab(TAB_VALUES.INGREDIENTS)}
      >
        <List size={20} />
        <span class="text-xs mt-1">Ingredients</span>
      </button>

      <button
        class="flex flex-col items-center p-2 {recipeState.activeTab === TAB_VALUES.INSTRUCTIONS
          ? 'text-indigo-600'
          : 'text-gray-500'}"
        aria-label="View cooking instructions"
        onclick={() => setActiveTab(TAB_VALUES.INSTRUCTIONS)}
      >
        <ChefHat size={20} />
        <span class="text-xs mt-1">Instructions</span>
      </button>

      <button
        class="flex flex-col items-center p-2 {recipeState.activeTab === TAB_VALUES.EQUIPMENT
          ? 'text-indigo-600'
          : 'text-gray-500'}"
        aria-label="View required equipment"
        onclick={() => setActiveTab(TAB_VALUES.EQUIPMENT)}
      >
        <Settings size={20} />
        <span class="text-xs mt-1">Equipment</span>
      </button>

      <button
        class="flex flex-col items-center p-2 {recipeState.activeTab === TAB_VALUES.SAFETY
          ? 'text-indigo-600'
          : 'text-gray-500'}"
        aria-label="View safety and storage information"
        onclick={() => setActiveTab(TAB_VALUES.SAFETY)}
      >
        <Shield size={20} />
        <span class="text-xs mt-1">Safety</span>
      </button>
    </nav>
  </div>
</div>

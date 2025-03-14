<!-- src/lib/recipe/RecipeTabs.svelte -->
<script lang="ts">
  import * as Tabs from '$lib/components/ui/tabs';
  import OverviewTab from './tabs/overview-tab.svelte';
  import IngredientsTab from './tabs/ingredients-tab.svelte';
  import InstructionsTab from './tabs/instructions-tab.svelte';
  import EquipmentTab from './tabs/equipment-tab.svelte';
  import SafetyTab from './tabs/safety-tab.svelte';

  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';

  const recipeState = getRecipeContext();
</script>

<Tabs.Root bind:value={recipeState.activeTab}>
  <Tabs.List
    class="flex border-b space-6 overflow-x-auto py-6 
    [scrollbar-width:none] [&::-webkit-scrollbar:none]:hidden"
    role="tablist"
    aria-label="Recipe details"
  >
    <Tabs.Trigger
      value="overview"
      class="py-2 px-4 font-medium transition-colors relative"
      role="tab"
      id="tab-overview"
      aria-controls="panel-overview"
    >
      Overview
    </Tabs.Trigger>
    <Tabs.Trigger
      value="ingredients"
      role="tab"
      id="tab-ingredients"
      aria-controls="panel-ingredients"
      class="py-2 px-4 font-medium transition-colors relative"
    >
      Ingredients
    </Tabs.Trigger>
    <Tabs.Trigger
      value="instructions"
      class="py-2 px-4 font-medium transition-colors relative"
      role="tab"
      id="tab-instructions"
      aria-controls="panel-instructions"
    >
      Instructions
    </Tabs.Trigger>
    <Tabs.Trigger
      value="equipment"
      class="py-2 px-4 font-medium transition-colors relative"
      role="tab"
      id="tab-equipment"
      aria-controls="panel-equipment"
    >
      Equipment
    </Tabs.Trigger>
    <Tabs.Trigger
      value="safety"
      class="py-2 px-4 font-medium transition-colors relative"
      role="tab"
      id="tab-safety"
      aria-controls="panel-safety"
    >
      Safety &amp; Storage
    </Tabs.Trigger>
  </Tabs.List>

  <!-- Tab contents -->
  <Tabs.Content
    value="overview"
    class="pt-6"
    role="tabpanel"
    id="panel-overview"
    aria-labelledby="tab-overview"
  >
    <OverviewTab />
  </Tabs.Content>

  <Tabs.Content
    value="ingredients"
    class="pt-6"
    role="tabpanel"
    id="panel-ingredients"
    aria-labelledby="tab-ingredients"
  >
    <IngredientsTab />
  </Tabs.Content>

  <Tabs.Content
    value="instructions"
    class="pt-6"
    role="tabpanel"
    id="panel-instructions"
    aria-labelledby="tab-instructions"
  >
    <InstructionsTab />
  </Tabs.Content>

  <Tabs.Content
    value="equipment"
    class="pt-6"
    role="tabpanel"
    id="panel-equipment"
    aria-labelledby="tab-equipment"
  >
    <EquipmentTab />
  </Tabs.Content>

  <Tabs.Content
    value="safety"
    class="pt-6"
    role="tabpanel"
    id="panel-safety"
    aria-labelledby="tab-safety"
  >
    <SafetyTab />
  </Tabs.Content>
</Tabs.Root>

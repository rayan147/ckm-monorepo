<!-- src/lib/recipe/components/IngredientMatchDialog.svelte -->
<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { buttonVariants } from '$lib/components/ui/button/index.js';
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import { Search, X, RotateCw, CheckCircle2, Edit } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  // Props using Svelte 5 syntax - all in one $props() call
  const {
    open = false,
    onOpenChange,
    ingredientName = '',
    matches = [],
    onSelect,
    onCancel,
    onSearch,
    onEnterManually
  } = $props<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    ingredientName: string;
    matches: any[];
    onSelect: (match: any) => void;
    onCancel: () => void;
    onSearch: (query: string) => Promise<void>;
    onEnterManually?: () => void; // New callback for manual entry
  }>();

  let selectedMatchId = $state<string | null>(null);
  let searchQuery = $state(ingredientName);
  let searching = $state(false);

  const selectedMatch = $derived(matches.find((m) => m.fdcId?.toString() === selectedMatchId));

  // Reset selection and update search query when dialog opens or ingredient changes
  $effect(() => {
    if (open && ingredientName) {
      searchQuery = ingredientName;
      // Auto-select first match if available
      if (matches.length > 0) {
        selectedMatchId = matches[0].fdcId?.toString() || null;
      } else {
        selectedMatchId = null;
      }
    }
  });

  function handleSelect() {
    if (selectedMatch) {
      onSelect(selectedMatch);
      toast.success('Ingredient match selected', {
        description: `Nutrition data will be imported from "${selectedMatch.description}"`
      });
    } else {
      toast.warning('No match selected', {
        description: 'Please select a nutrition match or click "Skip" to proceed'
      });
    }
  }

  function handleCancel() {
    onCancel();
  }

  async function handleSearch() {
    if (!searchQuery.trim()) return;

    searching = true;
    try {
      await onSearch(searchQuery);

      // Auto-select first result if available
      if (matches.length > 0) {
        selectedMatchId = matches[0].fdcId?.toString() || null;
      } else {
        selectedMatchId = null;
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed', {
        description: 'Could not search the USDA database'
      });
    } finally {
      searching = false;
    }
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  // Format nutrient value for display
  function formatNutrient(nutrients: any[], name: string): string {
    // Handle different USDA API response formats
    const nutrient = nutrients?.find(
      (n) =>
        n.nutrient?.name === name ||
        n.nutrientName === name ||
        (n.nutrient && n.nutrient.name === name)
    );

    if (!nutrient) return '—';

    // Extract value depending on response structure
    const value = nutrient.amount || nutrient.value || (nutrient.nutrient ? nutrient.amount : 0);
    const unit = nutrient.unitName || (nutrient.nutrient ? nutrient.nutrient.unitName : '') || '';

    return `${value.toFixed(1)} ${unit}`;
  }
</script>

<AlertDialog.Root {open} {onOpenChange}>
  <AlertDialog.Content class="max-w-xl">
    <AlertDialog.Header>
      <AlertDialog.Title>Match Ingredient: {ingredientName}</AlertDialog.Title>
      <AlertDialog.Description>
        Select the best match from the USDA database to import accurate nutrition data.
      </AlertDialog.Description>

      <div class="bg-blue-50 border border-blue-200 rounded-md p-3 mt-3">
        <p class="text-sm text-blue-800">
          <strong>Step {matches.length === 0 ? '1/2' : '2/2'}:</strong>
          {#if matches.length === 0}
            Search for a matching food item in the USDA database
          {:else}
            Select the best match for nutrition data
          {/if}
        </p>
      </div>

      <div class="flex items-center space-x-2 mt-4">
        <div class="relative flex-1">
          <Input
            type="text"
            placeholder="Search for a match..."
            value={searchQuery}
            oninput={(e) => (searchQuery = e.currentTarget.value)}
            onkeydown={handleKeyPress}
          />
          {#if searchQuery}
            <button
              type="button"
              class="absolute right-10 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onclick={() => (searchQuery = '')}
            >
              <X class="h-4 w-4" />
            </button>
          {/if}
        </div>
        <button
          type="button"
          class={buttonVariants({ variant: 'default' })}
          onclick={handleSearch}
          disabled={searching || !searchQuery.trim()}
        >
          {#if searching}
            <RotateCw class="h-4 w-4 mr-2 animate-spin" />
            Searching...
          {:else}
            <Search class="h-4 w-4 mr-2" />
            Search
          {/if}
        </button>
      </div>
    </AlertDialog.Header>

    <div class="my-4">
      <Separator />
    </div>

    {#if matches.length === 0}
      <div class="py-8 text-center">
        {#if searching}
          <div class="flex flex-col items-center justify-center">
            <RotateCw class="h-6 w-6 animate-spin text-primary mb-2" />
            <p class="text-muted-foreground">Searching for matches...</p>
          </div>
        {:else}
          <div class="flex flex-col items-center justify-center">
            <Search class="h-8 w-8 text-muted-foreground mb-2" />
            <p class="text-muted-foreground mb-1">No matches found for "{searchQuery}"</p>
            <p class="text-sm text-muted-foreground mb-4">
              Try a different search term or use more general keywords
            </p>

            <div class="bg-blue-50 border border-blue-200 rounded-md p-3 mt-3 max-w-md">
              <p class="text-sm text-blue-800 mb-2">
                <strong>No matches found?</strong>
              </p>
              <p class="text-xs text-blue-700">
                You can enter nutrition values manually by clicking "Enter Manually" below. This is
                useful for specialty ingredients not found in the USDA database.
              </p>
            </div>
          </div>
        {/if}
      </div>
    {:else}
      <ScrollArea class="h-[320px] pr-4">
        <RadioGroup value={selectedMatchId} onValueChange={(value) => (selectedMatchId = value)}>
          <div class="space-y-4">
            {#each matches as match}
              <div class="flex">
                <RadioGroupItem
                  value={match.fdcId?.toString() || ''}
                  id={`match-${match.fdcId}`}
                  class="mt-1"
                />
                <div class="ml-3 w-full">
                  <Label for={`match-${match.fdcId}`} class="text-base font-medium cursor-pointer">
                    {match.description || match.name}
                    {#if match.brandOwner}
                      <span class="text-muted-foreground text-sm ml-2">({match.brandOwner})</span>
                    {/if}
                  </Label>

                  <div class="mt-1 text-sm text-muted-foreground">
                    {match.foodCategory || match.category || 'Uncategorized'} •
                    {match.dataType || 'Standard'}
                  </div>

                  <!-- Nutrition preview with improved layout -->
                  {#if match.foodNutrients}
                    <div class="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 text-sm">
                      <div>
                        <span class="text-muted-foreground">Calories:</span>
                        <span class="ml-1 font-medium">
                          {formatNutrient(match.foodNutrients, 'Energy')}
                        </span>
                      </div>
                      <div>
                        <span class="text-muted-foreground">Protein:</span>
                        <span class="ml-1 font-medium">
                          {formatNutrient(match.foodNutrients, 'Protein')}
                        </span>
                      </div>
                      <div>
                        <span class="text-muted-foreground">Carbs:</span>
                        <span class="ml-1 font-medium">
                          {formatNutrient(match.foodNutrients, 'Carbohydrate, by difference')}
                        </span>
                      </div>
                      <div>
                        <span class="text-muted-foreground">Fat:</span>
                        <span class="ml-1 font-medium">
                          {formatNutrient(match.foodNutrients, 'Total lipid (fat)')}
                        </span>
                      </div>
                    </div>
                  {/if}
                </div>
              </div>
              <Separator class="mt-4" />
            {/each}
          </div>
        </RadioGroup>
      </ScrollArea>
    {/if}

    <AlertDialog.Footer class="flex justify-between items-center">
      <div>
        <!-- Left side: Action buttons -->
        {#if matches.length === 0 && !searching}
          <button
            type="button"
            class={buttonVariants({ variant: 'default' })}
            onclick={() => {
              handleCancel(); // Close this dialog
              // Signal parent component to open manual entry
              onEnterManually ? onEnterManually() : null;
            }}
          >
            <Edit class="h-4 w-4 mr-2" />
            Enter Manually
          </button>
        {:else}
          <button
            type="button"
            class={buttonVariants({ variant: 'outline' })}
            onclick={handleCancel}
          >
            {matches.length > 0 ? 'Cancel' : 'Skip This Ingredient'}
          </button>
        {/if}
      </div>

      <div>
        <!-- Right side: Action buttons -->
        {#if matches.length > 0}
          <button
            type="button"
            class={buttonVariants({ variant: 'default' })}
            onclick={handleSelect}
            disabled={!selectedMatchId}
          >
            <CheckCircle2 class="h-4 w-4 mr-2" />
            Apply Selected Match
          </button>
        {:else if !searching}
          <!-- Manual entry is now on the left side for better visibility -->
        {:else}
          <!-- When searching, don't show additional buttons -->
        {/if}
      </div>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>

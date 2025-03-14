<!-- src/lib/recipe/components/CompletionModal.svelte -->
<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import { Button } from '$lib/components/ui/button';
  import { Check } from 'lucide-svelte';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';

  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;
</script>

<AlertDialog.Root open={recipeState.showCompletionModal}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <div class="flex justify-center mb-4">
        <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <Check class="h-8 w-8 text-green-600" />
        </div>
      </div>
      <AlertDialog.Title class="text-center">Recipe Completed!</AlertDialog.Title>
      <AlertDialog.Description class="text-center">
        Congratulations on preparing {recipe.name}.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer class="flex-col space-y-2">
      <Button class="w-full">Save to My Collection</Button>
      <Button variant="outline" class="w-full">Share Your Creation</Button>
      <AlertDialog.Cancel class="w-full mt-2" onclick={() => recipeState.closeCompletionModal()}>
        Close
      </AlertDialog.Cancel>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>

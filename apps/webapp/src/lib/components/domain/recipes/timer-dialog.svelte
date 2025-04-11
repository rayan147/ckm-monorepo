<!-- src/lib/recipe/components/TimerDialog.svelte -->
<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import { Button } from '$lib/components/ui/button';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';

  const recipeState = getRecipeContext();
</script>

{#if recipeState.showTimer}
  <AlertDialog.Root open={recipeState.showTimer}>
    <AlertDialog.Content class="max-w-xs">
      <AlertDialog.Header>
        <AlertDialog.Title>Cooking Timer</AlertDialog.Title>
        <AlertDialog.Description>
          {#if recipeState.timerMinutes === 0 && recipeState.timerSeconds === 0}
            Time's up!
          {:else}
            <div class="text-center py-4">
              <span class="text-3xl font-bold text-primary">
                {recipeState.timerMinutes.toString().padStart(2, '0')}:{recipeState.timerSeconds
                  .toString()
                  .padStart(2, '0')}
              </span>
            </div>
          {/if}
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel on:click={() => recipeState.resetTimer()}>Close</AlertDialog.Cancel>
        {#if recipeState.timerMinutes > 0 || recipeState.timerSeconds > 0}
          <Button
            variant={recipeState.timerRunning ? 'outline' : 'default'}
            onclick={() => recipeState.toggleTimer()}
          >
            {recipeState.timerRunning ? 'Pause' : 'Start'}
          </Button>
        {/if}
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
{/if}

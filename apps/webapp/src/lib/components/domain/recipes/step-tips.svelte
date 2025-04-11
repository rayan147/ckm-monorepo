<!-- src/lib/recipe/components/StepTips.svelte -->
<script lang="ts">
  import { Lightbulb, AlertTriangle } from 'lucide-svelte';

  let { instruction } = $props();
</script>

{#if instruction.techniqueTips || instruction.warningNotes || instruction.isCritical}
  <div class="space-y-3 mb-4">
    {#if instruction.techniqueTips}
      <div class="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <Lightbulb class="h-5 w-5 text-blue-500 flex-shrink-0" />
        <div>
          <h5 class="text-sm font-medium text-blue-800">Chef's Tip</h5>
          <p class="text-sm text-blue-700">{instruction.techniqueTips}</p>
        </div>
      </div>
    {/if}

    {#if instruction.warningNotes}
      <div
        class="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg"
        role="alert"
      >
        <AlertTriangle class="h-5 w-5 text-red-500 flex-shrink-0" />
        <div>
          <h5 class="text-sm font-medium text-red-800">Important Warning</h5>
          <p class="text-sm text-red-700">{instruction.warningNotes}</p>
        </div>
      </div>
    {/if}
  </div>
{/if}

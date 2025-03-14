<!-- src/lib/recipe/components/StepDetails.svelte -->
<script lang="ts">
  import { Clock, Thermometer } from 'lucide-svelte';

  let { instruction } = $props();
</script>

{#if instruction.timeInMinutes || instruction.temperature}
  <div class="flex flex-wrap gap-3 mb-4">
    {#if instruction.timeInMinutes}
      <div class="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
        <Clock class="h-4 w-4 text-primary" />
        <div>
          <dt class="text-xs text-gray-500">Time</dt>
          <dd class="text-sm font-medium">
            {instruction.timeInMinutes} minutes
          </dd>
        </div>
      </div>
    {/if}

    {#if instruction.temperature}
      <div class="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
        <Thermometer class="h-4 w-4 text-primary" />
        <div>
          <dt class="text-xs text-gray-500">Temperature</dt>
          <dd class="text-sm font-medium">
            {instruction.temperature}°{instruction.temperatureUnit || 'C'}
          </dd>
        </div>
      </div>
    {/if}
  </div>
{/if}

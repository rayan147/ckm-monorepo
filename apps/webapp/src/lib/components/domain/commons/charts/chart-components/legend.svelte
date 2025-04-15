<script>
  import { getContext } from 'svelte';

  const { data, custom } = getContext('LayerCake');

  // Props
  let {
    colors = ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#8b5cf6'],
    nameKey = '',
    valueKey = ''
  } = $props();

  // Extract custom values
  const total = $state($custom.total || 0);

  // Calculate percentages
  const getPercentage = $derived((value) => ((value / total) * 100).toFixed(1) + '%');
</script>

<div
  class="legend absolute top-0 right-0 p-4 bg-background/80 backdrop-blur-sm rounded-lg shadow-sm text-sm max-w-[40%] max-h-full overflow-y-auto"
>
  <h3 class="font-medium mb-2">Legend</h3>
  <div class="space-y-2">
    {#each $data as item, i}
      <div class="flex items-center">
        <div
          class="w-3 h-3 rounded-sm mr-2 flex-shrink-0"
          style="background-color: {colors[i % colors.length]};"
        ></div>
        <div class="flex-1 truncate">{item[nameKey]}</div>
        <div class="ml-2 flex-shrink-0 font-medium">
          {getPercentage(item[valueKey])}
        </div>
      </div>
    {/each}
  </div>
</div>

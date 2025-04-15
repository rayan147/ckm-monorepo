<script>
  import { getContext } from 'svelte';

  // Access the LayerCake context
  const { data, xGet, yGet, xScale, yScale } = getContext('LayerCake');

  let { colors = ['#b82f6'], horizontal = false, stacked = false } = $props();

  // Generate a unique ID for bars
  const id = Math.random().toString(36).substring(2, 15);
</script>

<g class="bar-group">
  {#if !stacked}
    {#each $data as d, i}
      <rect
        class="bar"
        data-id={i}
        x={horizontal ? 0 : $xScale.range()[0] + (horizontal ? 0 : $yGet(d))}
        y={horizontal
          ? $yGet(d)
          : $xGet(d) > 0
            ? $xScale.range()[1] - $xGet(d)
            : $xScale.range()[1]}
        width={horizontal ? $xGet(d) : $yScale.bandwidth()}
        height={horizontal ? $yScale.bandwidth() : Math.abs($xGet(d))}
        fill={colors[i % colors.length]}
        data-value={$xGet(d)}
      />
    {/each}
  {:else}
    <!-- For stacked bars would go here, it's more complex so omitting for clarity -->
    <text class="text-sm fill-muted-foreground" x="50%" y="50%" text-anchor="middle">
      Stacked bars functionality not implemented
    </text>
  {/if}
</g>

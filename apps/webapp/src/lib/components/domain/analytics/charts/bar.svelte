<!-- charts/Bar.svelte -->
<script>
  import { getContext } from 'svelte';

  // Get the LayerCake context
  const { data, xGet, yGet, xScale, yScale, width } = getContext('LayerCake');

  // Props for customization
  let { fill, cornerRadius = 2, padding = 0.1 } = $props();

  // Calculate bar width based on x scale
  const barWidth = $derived(
    typeof fill === 'function' ? (d) => calculateBarWidth() : calculateBarWidth()
  );

  function calculateBarWidth() {
    if (!$data || $data.length === 0) return 0;

    // For ordinal scales
    if ($xScale.bandwidth) {
      return $xScale.bandwidth();
    }

    // For continuous scales - estimate based on number of data points
    const domain = $xScale.domain();
    const range = $xScale.range();
    const rangeWidth = Math.abs(range[1] - range[0]);
    const step = rangeWidth / $data.length;

    return step * (1 - padding);
  }
</script>

<!-- Base Layer: Grid Lines -->
<g class="grid-lines">
  {#each $yScale.ticks(5) as tick}
    <line
      class="grid-line"
      x1="0"
      x2="100%"
      y1={$yScale(tick)}
      y2={$yScale(tick)}
      stroke="#e5e7eb"
      stroke-dasharray="2,2"
    />
  {/each}
</g>

<!-- Bars -->
{#each $data as d, i}
  <rect
    class="bar"
    x={typeof $xScale.bandwidth === 'function'
      ? $xScale($xGet(d))
      : $xScale($xGet(d)) - barWidth / 2}
    y={$yGet(d)}
    width={barWidth}
    height={$yScale(0) - $yGet(d)}
    fill={typeof fill === 'function' ? fill(d) : fill}
    rx={cornerRadius}
    ry={cornerRadius}
  />
{/each}

<style>
  .bar {
    transition: opacity 0.2s;
  }

  .bar:hover {
    opacity: 0.8;
  }
</style>

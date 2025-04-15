<!-- charts/Line.svelte -->
<script>
  import { getContext } from 'svelte';
  import * as d3 from 'd3';

  // Get the LayerCake context
  const { data, xGet, yGet, yScale } = getContext('LayerCake');

  // For colors and styling
  let { color = '#4f46e5', strokeWidth = 2, dotRadius = 3 } = $props();

  // Create a D3 line generator instead of using LayerCake's path
  const lineGenerator = $derived(
    d3
      .line()
      .x((d) => $xGet(d))
      .y((d) => $yGet(d))
      .curve(d3.curveMonotoneX) // Optional: adds smooth curves instead of straight lines
  );
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

<!-- Line -->
<path
  class="path-line"
  d={lineGenerator($data)}
  fill="none"
  stroke={color}
  stroke-width={strokeWidth}
  stroke-linejoin="round"
  stroke-linecap="round"
/>

<!-- Data Points -->
{#each $data as d, i}
  <circle
    class="data-point"
    cx={$xGet(d)}
    cy={$yGet(d)}
    r={dotRadius}
    fill="white"
    stroke={color}
    stroke-width="1.5"
  />
{/each}

<style>
  .path-line {
    transition: opacity 0.2s;
  }
  .path-line:hover {
    opacity: 0.8;
  }
  .data-point {
    transition: r 0.2s;
  }
  .data-point:hover {
    r: 5;
  }
</style>

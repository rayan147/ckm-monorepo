<script>
  import { getContext } from 'svelte';
  import * as d3 from 'd3';

  const { width, height, yScale, padding } = getContext('LayerCake');

  let {
    gridlines = true,
    formatTick = (d) => d,
    yLabel = '',
    tickCount = 5,
    tickMarks = false,
    tickMarkLength = 6
  } = $props();

  // Function to determine if it's a band scale
  const isBandScale = $derived(typeof $yScale.bandwidth === 'function');

  // Generate appropriate ticks based on scale type
  const ticks = $derived.by(() => {
    if (isBandScale) {
      // For band scales, use the domain directly
      return $yScale.domain();
    } else {
      // For continuous scales (linear, time, etc.) use d3's ticks
      // First check if the scale has its own ticks method
      if (typeof $yScale.ticks === 'function') {
        return $yScale.ticks(tickCount);
      } else {
        // Fallback: generate evenly spaced ticks from the domain
        const [min, max] = $yScale.domain();
        return d3.ticks(min, max, tickCount);
      }
    }
  });

  // Calculate spacing for Y-axis based on scale type
  const getTickPosition = (tick) => {
    if (isBandScale) {
      const bandwidth = $yScale.bandwidth();
      return $yScale(tick) + bandwidth / 2;
    }
    return $yScale(tick);
  };
</script>

<g class="axis y-axis">
  {#if gridlines}
    <g class="gridlines">
      {#each ticks as tick}
        <line
          class="gridline"
          x1="0"
          x2={$width}
          y1={getTickPosition(tick)}
          y2={getTickPosition(tick)}
          stroke-dasharray="3,3"
          stroke="currentColor"
          stroke-opacity="0.2"
        ></line>
      {/each}
    </g>
  {/if}

  <g class="ticks">
    {#each ticks as tick}
      <g class="tick" transform="translate(0, {getTickPosition(tick)})">
        {#if tickMarks}
          <line x1={-tickMarkLength} x2="0" y1="0" y2="0" stroke="currentColor"></line>
        {/if}
        <text
          x={tickMarks ? -tickMarkLength - 8 : -8}
          y="0"
          dy="0.32em"
          text-anchor="end"
          class="text-xs fill-muted-foreground">{formatTick(tick)}</text
        >
      </g>
    {/each}
  </g>

  {#if yLabel}
    <text
      class="axis-label fill-muted-foreground font-medium"
      transform="rotate(-90)"
      x={-$height / 2}
      y={-$padding.left + 15}
      text-anchor="middle">{yLabel}</text
    >
  {/if}
</g>

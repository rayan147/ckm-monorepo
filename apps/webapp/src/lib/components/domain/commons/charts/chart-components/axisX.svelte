<script>
  import { getContext } from 'svelte';
  import * as d3 from 'd3';

  const { width, height, xScale, yScale, padding } = getContext('LayerCake');

  let {
    gridlines = true,
    baseline = false,
    snapLabels = false,
    formatTick = (d) => d,
    xLabel = '',
    tickCount = undefined
  } = $props();

  // Derived properties
  const ticks = $derived.by(() => {
    try {
      // Handle case when xScale doesn't have ticks method
      if (!$xScale) return [];

      if (typeof $xScale.ticks !== 'function') {
        // For band scales or other non-continuous scales
        return $xScale.domain ? $xScale.domain() : [];
      }
      return tickCount ? $xScale.ticks(tickCount) : $xScale.ticks();
    } catch (e) {
      console.error('Error getting ticks:', e);
      return [];
    }
  });

  const isBandwidth = $derived.by(() => {
    try {
      return $xScale && typeof $xScale.bandwidth === 'function';
    } catch (e) {
      console.error('Error checking bandwidth:', e);
      return false;
    }
  });

  // Safe function to calculate tick positions
  const tickSpacing = $derived.by((i) => {
    if (!ticks || !Array.isArray(ticks) || ticks.length === 0 || i >= ticks.length) {
      return 0;
    }

    try {
      if (!$xScale || typeof $xScale !== 'function') {
        return 0;
      }

      if (isBandwidth()) {
        const bandwidth = $xScale.bandwidth();
        if (snapLabels && i === 0) {
          return 0;
        }
        if (snapLabels && i === ticks.length - 1) {
          return $width;
        }
        return $xScale(ticks[i]) + bandwidth / 2;
      }

      // Safely get the position
      const tickValue = ticks[i];
      const position = $xScale(tickValue);

      // Return 0 if position is NaN or undefined
      return isNaN(position) ? 0 : position;
    } catch (e) {
      console.error('Error calculating tick position:', e);
      return 0;
    }
  });
</script>

<g class="axis x-axis">
  {#if gridlines && ticks && Array.isArray(ticks) && ticks.length > 0 && $xScale && typeof $xScale === 'function'}
    <g class="gridlines">
      {#each ticks as tick, i}
        {@const tickX = (() => {
          try {
            const pos = $xScale(tick);
            return isNaN(pos) ? 0 : pos;
          } catch (e) {
            console.error('Error calculating tick X position:', e);
            return 0;
          }
        })()}
        <line
          class="gridline"
          x1={tickX}
          x2={tickX}
          y1="0"
          y2={$height}
          stroke-dasharray="3,3"
          stroke="currentColor"
          stroke-opacity="0.2"
        ></line>
      {/each}
    </g>
  {/if}

  {#if baseline}
    <line
      class="baseline"
      x1="0"
      x2={$width}
      y1={$height}
      y2={$height}
      stroke="currentColor"
      stroke-opacity="0.5"
    ></line>
  {/if}

  <g class="ticks" transform="translate(0, {$height + 6})">
    {#if ticks && ticks.length > 0}
      {#each ticks as tick, i}
        {@const spacing = tickSpacing(i)}
        <g class="tick" transform="translate({spacing}, 0)">
          <text x="0" y="16" text-anchor="middle" class="text-xs fill-muted-foreground"
            >{formatTick(tick)}</text
          >
        </g>
      {/each}
    {/if}
  </g>

  {#if xLabel}
    <text
      class="axis-label fill-muted-foreground font-medium"
      x={$width / 2}
      y={$height + $padding.bottom - 5}
      text-anchor="middle">{xLabel}</text
    >
  {/if}
</g>

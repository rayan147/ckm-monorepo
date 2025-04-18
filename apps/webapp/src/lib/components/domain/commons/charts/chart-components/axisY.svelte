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
  const isBandScale = $derived.by(() => {
    try {
      return $yScale && typeof $yScale.bandwidth === 'function';
    } catch (e) {
      console.error('Error checking bandwidth:', e);
      return false;
    }
  });

  // Generate appropriate ticks based on scale type
  const ticks = $derived.by(() => {
    try {
      if (!$yScale) {
        return [];
      }

      if (isBandScale()) {
        // For band scales, use the domain directly
        return $yScale.domain ? $yScale.domain() : [];
      } else {
        // For continuous scales (linear, time, etc.) use d3's ticks
        // First check if the scale has its own ticks method
        if (typeof $yScale.ticks === 'function') {
          return $yScale.ticks(tickCount);
        } else if ($yScale.domain && typeof $yScale.domain === 'function') {
          // Fallback: generate evenly spaced ticks from the domain
          try {
            const domain = $yScale.domain();
            if (Array.isArray(domain) && domain.length >= 2) {
              const [min, max] = domain;
              return d3.ticks(min, max, tickCount);
            }
          } catch (e) {
            console.error('Error getting domain:', e);
          }
        }
        return [];
      }
    } catch (e) {
      console.error('Error generating ticks:', e);
      return [];
    }
  });

  // Calculate spacing for Y-axis based on scale type with error handling
  const getTickPosition = (tick) => {
    try {
      if (!$yScale || typeof $yScale !== 'function') {
        console.error('yScale is not a function');
        return 0;
      }

      if (isBandScale()) {
        const bandwidth = $yScale.bandwidth();
        const position = $yScale(tick) + bandwidth / 2;
        return isNaN(position) ? 0 : position;
      }

      const position = $yScale(tick);
      return isNaN(position) ? 0 : position;
    } catch (e) {
      console.error('Error calculating Y tick position:', e);
      return 0;
    }
  };
</script>

<g class="axis y-axis">
  {#if gridlines && ticks && Array.isArray(ticks) && ticks.length > 0 && $yScale && typeof $yScale === 'function'}
    <g class="gridlines">
      {#each ticks as tick}
        {@const position = getTickPosition(tick)}
        <line
          class="gridline"
          x1="0"
          x2={$width}
          y1={position}
          y2={position}
          stroke-dasharray="3,3"
          stroke="currentColor"
          stroke-opacity="0.2"
        ></line>
      {/each}
    </g>
  {/if}

  {#if ticks && Array.isArray(ticks) && ticks.length > 0 && $yScale && typeof $yScale === 'function'}
    <g class="ticks">
      {#each ticks as tick}
        {@const position = getTickPosition(tick)}
        <g class="tick" transform="translate(0, {position})">
          {#if tickMarks}
            <line x1={-tickMarkLength} x2="0" y1="0" y2="0" stroke="currentColor"></line>
          {/if}
          <text
            x={tickMarks ? -tickMarkLength - 8 : -8}
            y="0"
            dy="0.32em"
            text-anchor="end"
            class="text-xs fill-muted-foreground"
            >{typeof formatTick === 'function' ? formatTick(tick) : tick}</text
          >
        </g>
      {/each}
    </g>
  {/if}

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

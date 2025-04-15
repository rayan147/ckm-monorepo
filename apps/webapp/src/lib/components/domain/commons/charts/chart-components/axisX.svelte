<script>
  import { getContext } from 'svelte';

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
  const ticks = $derived(tickCount ? $xScale.ticks(tickCount) : $xScale.ticks());
  const isBandwidth = $derived(typeof $xScale.bandwidth === 'function');

  // Calculate spacing for X-axis
  const tickSpacing = $derived.by((i) => {
    if (isBandwidth) {
      const bandwidth = $xScale.bandwidth();
      if (snapLabels && i === 0) {
        return 0;
      }
      if (snapLabels && i === ticks.length - 1) {
        return $width;
      }
      return $xScale(ticks[i]) + bandwidth / 2;
    }
    return $xScale(ticks[i]);
  });
</script>

<g class="axis x-axis">
  {#if gridlines}
    <g class="gridlines">
      {#each ticks as tick, i}
        <line
          class="gridline"
          x1={$xScale(tick)}
          x2={$xScale(tick)}
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
    {#each ticks as tick, i}
      <g class="tick" transform="translate({tickSpacing(i)}, 0)">
        <text x="0" y="16" text-anchor="middle" class="text-xs fill-muted-foreground"
          >{formatTick(tick)}</text
        >
      </g>
    {/each}
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

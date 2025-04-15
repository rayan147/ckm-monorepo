<script>
  import { LayerCake, Svg, Html } from 'layercake';
  import Pie from './pie.svelte';
  import Legend from './legend.svelte';

  // Props
  let {
    data = [],
    nameKey = '',
    valueKey = '',
    colors = ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#8b5cf6'],
    donut = false,
    innerRadius = 0.5,
    showLegend = true,
    padding = { top: 20, right: 20, bottom: 20, left: 20 }
  } = $props();

  // Calculate total for percentages
  let total = data.reduce((sum, d) => sum + d[valueKey], 0);
</script>

<div class="h-full w-full">
  <LayerCake {data} r={valueKey} {padding} custom={{ nameKey, total, donut, innerRadius }}>
    <Svg>
      <Pie {colors} />
    </Svg>
    {#if showLegend}
      <Html>
        <Legend {colors} {nameKey} {valueKey} />
      </Html>
    {/if}
  </LayerCake>
</div>

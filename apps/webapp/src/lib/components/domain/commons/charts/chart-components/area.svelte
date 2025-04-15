<script>
  import { getContext } from 'svelte';
  import { area } from 'd3-shape';

  const { data, xGet, yGet, yScale } = getContext('LayerCake');
  let { color = '#b82f6', opacity = 0.2 } = $props();
  // Create the area generator
  const path = $derived(
    area()
      .x((d) => $xGet(d))
      .y0($yScale.range()[0]) // Bottom of the chart
      .y1((d) => $yGet(d))
  );
</script>

<path class="area" d={path($data)} fill={color} {opacity}></path>

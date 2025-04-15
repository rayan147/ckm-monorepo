<script>
  import * as d3 from 'd3';
  import { LayerCake, Svg, Html } from 'layercake';
  import Bar from './chart-components/bar.svelte';
  import AxisX from './chart-components/axisX.svelte';
  import AxisY from './chart-components/axisY.svelte';

  // Props
  let {
    data = [],
    xKey = '',
    yKey = [],
    colors = ['#3b82f6'],
    xLabel = '',
    yLabel = '',
    stacked = false,
    horizontal = false,
    padding = { top: 20, right: 20, bottom: 40, left: 60 }
  } = $props();

  // Handle horizontal bar charts
  let yScale = !horizontal ? d3.scaleBand().paddingInner(0.1).round(true) : undefined;

  // Props for LayerCake
  let lProps = horizontal
    ? { y: xKey, x: yKey, yScale, xDomain: [0, null] }
    : { x: xKey, y: yKey, yScale, xDomain: [0, null] };
</script>

<div class="h-full w-full">
  <LayerCake {data} {padding} {...lProps}>
    <Svg>
      <Bar {colors} {horizontal} {stacked} />
    </Svg>
    <Html>
      <AxisX gridlines baseline {xLabel} />
      <AxisY gridlines {yLabel} />
    </Html>
  </LayerCake>
</div>

<script>
  import { LayerCake, Svg, Html } from 'layercake';
  import Line from './chart-components/line.svelte';
  import Area from './chart-components/area.svelte';
  import AxisX from './chart-components/axisX.svelte';
  import AxisY from './chart-components/axisY.svelte';
  import Points from './chart-components/points.svelte';

  // Props
  let {
    data = [],
    xKey = '',
    yKey = '',
    color = '#3b82f6',
    xLabel = '',
    yLabel = '',
    showArea = false,
    showPoints = true,
    padding = { top: 20, right: 20, bottom: 40, left: 60 }
  } = $props();
</script>

<div class="h-full w-full">
  <LayerCake {data} x={xKey} y={yKey} {padding} xDomain={[null, null]} yDomain={[0, null]}>
    <Svg>
      {#if showArea}
        <Area {color} />
      {/if}
      <Line colors={[color]} />
      {#if showPoints}
        <Points {color} />
      {/if}
    </Svg>
    <Html>
      <AxisX gridlines baseline {xLabel} />
      <AxisY gridlines {yLabel} />
    </Html>
  </LayerCake>
</div>

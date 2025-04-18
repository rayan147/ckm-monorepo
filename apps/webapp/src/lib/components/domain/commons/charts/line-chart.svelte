<script>
  import { LayerCake, Svg, Html } from 'layercake';
  import Line from './chart-components/line.svelte';
  import Area from './chart-components/area.svelte';
  import AxisX from './chart-components/axisX.svelte';
  import AxisY from './chart-components/axisY.svelte';
  import Points from './chart-components/points.svelte';
  import * as d3 from 'd3';

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

  // Create a simple example data for testing
  const exampleData = [
    { x: 'A', y: 10 },
    { x: 'B', y: 20 },
    { x: 'C', y: 15 },
    { x: 'D', y: 25 },
    { x: 'E', y: 30 }
  ];

  // Create mapping function to access data properly
  function getProcessedData() {
    // Validate inputs
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log("[LineChart] Empty or invalid data, using sample data");
      // Return example data for testing
      return xKey && yKey ? exampleData.map(d => ({ [xKey]: d.x, [yKey]: d.y })) : exampleData;
    }

    if (!xKey || !yKey) {
      console.warn("[LineChart] Missing xKey or yKey");
      return [];
    }

    // Filter out invalid data points
    return data.filter(d => 
      d !== null && 
      typeof d === 'object' &&
      d[xKey] !== undefined && 
      d[yKey] !== undefined && 
      !isNaN(d[yKey])
    );
  }

  $effect(() => {
    // Log info about the chart when data or keys change
    console.log(`[LineChart] Rendering with ${data?.length || 0} data points, xKey=${xKey}, yKey=${yKey}`);
  });

  // Get processed data that's valid for the chart
  const processedData = getProcessedData();
</script>

<div class="h-full w-full">
  {#if processedData.length > 0}
    <LayerCake
      data={processedData}
      x={xKey}
      y={yKey}
      {padding}
      xDomain={[null, null]}
      yDomain={[0, null]}
    >
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
  {:else}
    <div class="h-full w-full flex items-center justify-center">
      <p class="text-muted-foreground">No data available</p>
    </div>
  {/if}
</div>

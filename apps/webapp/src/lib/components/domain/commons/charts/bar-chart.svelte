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

  // Create example data for testing
  const exampleData = [
    { category: 'A', value: 10 },
    { category: 'B', value: 20 },
    { category: 'C', value: 15 },
    { category: 'D', value: 25 },
    { category: 'E', value: 30 }
  ];

  // Process data for rendering
  function getProcessedData() {
    // Validate inputs
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log("[BarChart] Empty or invalid data, using sample data");
      // Return example data for testing
      if (xKey && (typeof yKey === 'string' || Array.isArray(yKey))) {
        return exampleData.map(d => {
          const result = { [xKey]: d.category };
          if (Array.isArray(yKey)) {
            yKey.forEach((key, i) => { result[key] = d.value * (i + 1); });
          } else {
            result[yKey] = d.value;
          }
          return result;
        });
      }
      return exampleData;
    }

    if (!xKey || (!yKey && !Array.isArray(yKey))) {
      console.warn("[BarChart] Missing xKey or yKey");
      return [];
    }

    // Filter out invalid data points
    return data.filter(d => 
      d && 
      typeof d === 'object' && 
      d[xKey] !== undefined && 
      (
        (Array.isArray(yKey) && yKey.every(key => d[key] !== undefined && !isNaN(d[key]))) ||
        (!Array.isArray(yKey) && d[yKey] !== undefined && !isNaN(d[yKey]))
      )
    );
  }

  // Handle horizontal bar charts
  function getYScale() {
    return !horizontal ? d3.scaleBand().paddingInner(0.1).round(true) : undefined;
  }

  // Props for LayerCake
  function getLayerCakeProps() {
    return horizontal
      ? { y: xKey, x: yKey, yScale: getYScale(), xDomain: [0, null] }
      : { x: xKey, y: yKey, yScale: getYScale(), yDomain: [0, null] };
  }

  $effect(() => {
    // Log info about the chart when data or keys change
    console.log(`[BarChart] Rendering with ${data?.length || 0} data points, xKey=${xKey}, yKey=${Array.isArray(yKey) ? yKey.join(',') : yKey}`);
  });

  // Get processed data that's valid for the chart
  const processedData = getProcessedData();
  const layerCakeProps = getLayerCakeProps();
</script>

<div class="h-full w-full">
  {#if processedData.length > 0}
    <LayerCake data={processedData} {padding} {...layerCakeProps}>
      <Svg>
        <Bar {colors} {horizontal} {stacked} />
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

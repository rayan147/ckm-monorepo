<script>
  import { LayerCake, Svg, Html } from 'layercake';
  import Pie from './chart-components/pie.svelte';
  import Legend from './chart-components/legend.svelte';

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

  // Create example data for testing
  const exampleData = [
    { name: 'Category A', value: 30 },
    { name: 'Category B', value: 25 },
    { name: 'Category C', value: 20 },
    { name: 'Category D', value: 15 },
    { name: 'Category E', value: 10 }
  ];

  // Process data for rendering
  function getProcessedData() {
    // Validate inputs
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log("[PieChart] Empty or invalid data, using sample data");
      // Return example data for testing
      if (nameKey && valueKey) {
        return exampleData.map(d => ({
          [nameKey]: d.name,
          [valueKey]: d.value
        }));
      }
      return exampleData;
    }

    if (!nameKey || !valueKey) {
      console.warn("[PieChart] Missing nameKey or valueKey");
      return exampleData;
    }

    // Filter out invalid data points
    return data.filter(d => 
      d && 
      typeof d === 'object' && 
      d[nameKey] !== undefined && 
      d[valueKey] !== undefined && 
      !isNaN(d[valueKey])
    );
  }

  $effect(() => {
    // Log info about the chart when data or keys change
    console.log(`[PieChart] Rendering with ${data?.length || 0} data points, nameKey=${nameKey}, valueKey=${valueKey}`);
  });

  // Get processed data that's valid for the chart
  const processedData = getProcessedData();
  
  // Calculate total for percentages
  const total = processedData.reduce((sum, d) => sum + d[valueKey], 0);
</script>

<div class="h-full w-full">
  {#if processedData && processedData.length > 0}
    <LayerCake data={processedData} r={valueKey} {padding} custom={{ nameKey, total, donut, innerRadius }}>
    <Svg>
      <Pie {colors} />
    </Svg>
    {#if showLegend}
      <Html>
        <Legend {colors} {nameKey} {valueKey} />
      </Html>
    {/if}
  </LayerCake>
  {:else}
    <div class="h-full w-full flex items-center justify-center">
      <p class="text-muted-foreground">Loading chart data...</p>
    </div>
  {/if}
</div>

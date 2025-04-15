<!-- charts/Pie.svelte -->
<script>
  import { getContext } from 'svelte';
  import * as d3 from 'd3';

  // Get the LayerCake context
  const { data, width, height } = getContext('LayerCake');

  // Props
  let {
    dataKey = 'value',
    nameKey = 'name',
    colors = [
      '#4f46e5',
      '#3b82f6',
      '#f59e0b',
      '#ef4444',
      '#22c55e',
      '#ec4899',
      '#9333ea',
      '#64748b'
    ],

    innerRadius = 0,
    padAngle = 0.03,
    cornerRadius = 3,
    showLabels = true
  } = $props();

  // Calculate dimensions
  const radius = $derived(Math.min($width, $height) / 2);
  const outerRadius = $derived(radius * 0.8);

  // Create the pie layout
  const pieGenerator = $derived(
    d3
      .pie()
      .sort(null)
      .value((d) => d[dataKey])
      .padAngle(padAngle)
  );

  // Create the arc generator
  const arcGenerator = $derived(
    d3.arc().innerRadius(innerRadius).outerRadius(outerRadius).cornerRadius(cornerRadius)
  );

  // Create the label arc generator (positioned outside the pie)
  const labelArcGenerator = $derived(
    d3
      .arc()
      .innerRadius(outerRadius * 0.9)
      .outerRadius(outerRadius * 1.1)
  );

  // Generate the pie data
  const pieData = $derived(pieGenerator($data));

  // Function to determine if a slice is large enough for a label
  function isLargeEnoughForLabel(d) {
    // Only show label if the slice is at least 5% of the pie
    return d.endAngle - d.startAngle > 0.1;
  }
</script>

<g transform="translate({$width / 2}, {$height / 2})">
  {#each pieData as slice, i}
    <path class="slice" d={arcGenerator(slice)} fill={colors[i % colors.length]} />

    {#if showLabels && isLargeEnoughForLabel(slice)}
      <!-- Calculate the position for the text -->
      {@const centroid = labelArcGenerator.centroid(slice)}
      {@const [x, y] = centroid}
      {@const textAnchor = x > 0 ? 'start' : 'end'}

      <text
        {x}
        {y}
        dy="0.35em"
        class="slice-label"
        text-anchor={textAnchor}
        font-size="12"
        fill="#374151"
      >
        {$data[i][nameKey]}
      </text>
    {/if}
  {/each}
</g>

<style>
  .slice {
    transition: opacity 0.2s;
  }

  .slice:hover {
    opacity: 0.8;
  }

  .slice-label {
    font-weight: 500;
    pointer-events: none;
  }
</style>

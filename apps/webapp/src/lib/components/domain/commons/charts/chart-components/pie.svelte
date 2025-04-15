<script>
  import { getContext } from 'svelte';
  import { pie, arc } from 'd3-shape';

  const { data, width, height, rGet, custom } = getContext('LayerCake');

  // Props
  let { colors = ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#8b5cf6'] } = $props();

  // Extract custom values
  let nameKey = $state($custom.nameKey);
  let total = $state($custom.total);
  let donut = $state($custom.donut);
  let innerRadius = $state($custom.innerRadius || 0.5);

  // Calculate radius and center
  const radius = $derived(Math.min($width, $height) / 2);
  const center = $derived({ x: $width / 2, y: $height / 2 });

  // Create the pie layout
  const pieGenerator = $derived(
    pie()
      .sort(null)
      .value((d) => $rGet(d))
  );

  // Create the arc generator
  const arcGenerator = $derived(
    arc()
      .innerRadius(donut ? radius * innerRadius : 0)
      .outerRadius(radius * 0.95)
  );

  // Generate pie slices
  const arcs = $derived(pieGenerator($data));

  // Calculate percentages
  const getPercentage = $derived((d) => ((d.data[$rGet.field] / total) * 100).toFixed(1) + '%');

  // Generate label positions
  const getLabelPosition = $derived((d) => {
    const centroid = arcGenerator.centroid(d);
    return {
      x: center.x + centroid[0],
      y: center.y + centroid[1]
    };
  });
</script>

<g transform="translate({center.x}, {center.y})">
  {#each arcs as arc, i}
    <path
      class="arc"
      d={arcGenerator(arc)}
      fill={colors[i % colors.length]}
      stroke="white"
      stroke-width="1"
      data-name={arc.data[nameKey]}
      data-value={arc.data[$rGet.field]}
    ></path>
  {/each}

  {#if $width > 200}
    {#each arcs as arc, i}
      {#if arc.endAngle - arc.startAngle > 0.25}
        {@const pos = getLabelPosition(arc)}
        <text
          class="arc-label"
          x={pos.x - center.x}
          y={pos.y - center.y}
          dy="0.35em"
          fill="white"
          text-anchor="middle"
          font-size="12px"
          pointer-events="none"
        >
          {getPercentage(arc)}
        </text>
      {/if}
    {/each}
  {/if}
</g>

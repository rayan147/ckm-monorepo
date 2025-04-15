<script>
  import { getContext } from 'svelte';

  const { data, xGet, yGet } = getContext('LayerCake');

  // Props
  let { color = '#3b82f6', radius = 4 } = $props();
</script>

<g class="points">
  {#each $data as d, i}
    <circle
      class="point"
      cx={$xGet(d)}
      cy={$yGet(d)}
      r={radius}
      fill="white"
      stroke={color}
      stroke-width="2"
      data-id={i}
    ></circle>
  {/each}
</g>

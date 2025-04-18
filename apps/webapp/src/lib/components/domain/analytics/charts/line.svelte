<!-- charts/Line.svelte -->
<script>
  import { getContext } from 'svelte';
  import * as d3 from 'd3';

  // Get the LayerCake context
  const { data, xGet, yGet, yScale } = getContext('LayerCake');

  // For colors and styling
  let { color = '#4f46e5', strokeWidth = 2, dotRadius = 3 } = $props();

  // Create a D3 line generator instead of using LayerCake's path
  const lineGenerator = $derived(() => {
    try {
      if (!$xGet || !$yGet || typeof $xGet !== 'function' || typeof $yGet !== 'function') {
        console.error('Invalid xGet or yGet functions');
        return d3.line()();
      }
      
      return d3
        .line()
        .defined(d => {
          try {
            const x = $xGet(d);
            const y = $yGet(d);
            return d !== null && 
                   d !== undefined && 
                   x !== null && 
                   x !== undefined && 
                   !isNaN(x) && 
                   y !== null && 
                   y !== undefined && 
                   !isNaN(y);
          } catch (e) {
            console.error('Error in defined check:', e);
            return false;
          }
        })
        .x(d => {
          try {
            return $xGet(d);
          } catch (e) {
            console.error('Error getting x value:', e);
            return 0;
          }
        })
        .y(d => {
          try {
            return $yGet(d);
          } catch (e) {
            console.error('Error getting y value:', e);
            return 0;
          }
        })
        .curve(d3.curveMonotoneX); // Optional: adds smooth curves instead of straight lines
    } catch (e) {
      console.error('Error creating line generator:', e);
      return d3.line()();
    }
  });
</script>

<!-- Base Layer: Grid Lines -->
{#if $yScale && typeof $yScale.ticks === 'function'}
  <g class="grid-lines">
    {#each (() => {
      try {
        return $yScale.ticks(5);
      } catch (e) {
        console.error('Error getting ticks:', e);
        return [];
      }
    })() as tick}
      {@const yPos = (() => {
        try {
          const pos = $yScale(tick);
          return isNaN(pos) ? 0 : pos;
        } catch (e) {
          console.error('Error calculating y position:', e);
          return 0;
        }
      })()}
      <line
        class="grid-line"
        x1="0"
        x2="100%"
        y1={yPos}
        y2={yPos}
        stroke="#e5e7eb"
        stroke-dasharray="2,2"
      />
    {/each}
  </g>
{/if}

<!-- Line -->
{#if $data && Array.isArray($data) && $data.length > 0}
  <path
    class="path-line"
    d={(() => {
      try {
        return lineGenerator($data) || '';
      } catch (e) {
        console.error('Error generating line path:', e);
        return '';
      }
    })()}
    fill="none"
    stroke={color}
    stroke-width={strokeWidth}
    stroke-linejoin="round"
    stroke-linecap="round"
  />

  <!-- Data Points -->
  {#each $data.filter(d => {
    try {
      return d !== null && 
             d !== undefined && 
             $xGet && typeof $xGet === 'function' && !isNaN($xGet(d)) &&
             $yGet && typeof $yGet === 'function' && !isNaN($yGet(d));
    } catch (e) {
      console.error('Error filtering data point:', e);
      return false;
    }
  }) as d, i}
    {@const cx = (() => {
      try {
        return $xGet(d);
      } catch (e) {
        console.error('Error getting x coordinate:', e);
        return 0;
      }
    })()}
    {@const cy = (() => {
      try {
        return $yGet(d);
      } catch (e) {
        console.error('Error getting y coordinate:', e);
        return 0;
      }
    })()}
    <circle
      class="data-point"
      cx={cx}
      cy={cy}
      r={dotRadius}
      fill="white"
      stroke={color}
      stroke-width="1.5"
    />
  {/each}
{/if}

<style>
  .path-line {
    transition: opacity 0.2s;
  }
  .path-line:hover {
    opacity: 0.8;
  }
  .data-point {
    transition: r 0.2s;
  }
  .data-point:hover {
    r: 5;
  }
</style>

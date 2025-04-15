<script>
  import * as Card from '$lib/components/ui/card';
  import BarChart from '../commons/charts/bar-chart.svelte';
  import LineChart from '../commons/charts/line-chart.svelte';
  import PieChart from '../commons/charts/pie-chart.svelte';

  import MetricCard from '$lib/components/domain/commons/metric-card.svelte';
  import InfoCard from '$lib/components/domain/commons/info-card.svelte';
  import { Clock, TrendingUp, Trash2, Zap, AlertTriangle, AlertCircle, Info } from 'lucide-svelte';
  import { Skeleton } from '$lib/components/ui/skeleton';

  // Props using Svelte 5 runes
  let { dateRange = '', selectedFacility = '', isLoading = false } = $props();

  // Sample data - replace with actual data from your API
  let hourlyProduction = $state([
    { hour: '9 AM', orders: 12 },
    { hour: '10 AM', orders: 18 },
    { hour: '11 AM', orders: 24 },
    { hour: '12 PM', orders: 42 },
    { hour: '1 PM', orders: 38 },
    { hour: '2 PM', orders: 22 },
    { hour: '3 PM', orders: 16 },
    { hour: '4 PM', orders: 20 },
    { hour: '5 PM', orders: 32 },
    { hour: '6 PM', orders: 48 },
    { hour: '7 PM', orders: 52 },
    { hour: '8 PM', orders: 41 },
    { hour: '9 PM', orders: 28 }
  ]);

  let orderPrepTimes = $state([
    { category: 'Appetizers', time: 7 },
    { category: 'Main Courses', time: 14 },
    { category: 'Desserts', time: 6 },
    { category: 'Beverages', time: 3 },
    { category: 'Specials', time: 16 }
  ]);

  let resourceUtilization = $state([
    { category: 'Kitchen Staff', value: 86, color: '#3b82f6' },
    { category: 'Equipment', value: 72, color: '#22c55e' },
    { category: 'Ingredients', value: 94, color: '#eab308' }
  ]);

  let wastageData = $state([
    { date: 'Jun 1', percentage: 4.2 },
    { date: 'Jun 2', percentage: 3.8 },
    { date: 'Jun 3', percentage: 2.9 },
    { date: 'Jun 4', percentage: 3.1 },
    { date: 'Jun 5', percentage: 2.7 },
    { date: 'Jun 6', percentage: 2.5 },
    { date: 'Jun 7', percentage: 2.3 }
  ]);

  let bottlenecks = $state([
    {
      area: 'Grill Station',
      impact: 'High',
      description: 'Operating at 92% capacity during peak hours'
    },
    {
      area: 'Dishwashing',
      impact: 'Medium',
      description: 'Backup during dinner rush (6-8 PM)'
    },
    {
      area: 'Prep Station',
      impact: 'Low',
      description: 'Occasional delays with specialty orders'
    }
  ]);

  function getIconForImpact(impact) {
    if (impact === 'High') return AlertTriangle;
    if (impact === 'Medium') return AlertCircle;
    return Info;
  }

  // Use effect to refetch data when props change
  $effect(() => {
    if (dateRange || selectedFacility) {
      // In a real application, you would fetch data based on these filters
      console.log(`Fetching production data for ${selectedFacility} over ${dateRange}`);
    }
  });
</script>

{#if isLoading}
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {#each Array(4) as _}
      <Skeleton class="h-32 w-full" />
    {/each}
  </div>
  <div class="grid gap-4 md:grid-cols-2 mt-4">
    {#each Array(2) as _}
      <Skeleton class="h-80 w-full" />
    {/each}
  </div>
  <div class="grid gap-4 md:grid-cols-3 mt-4">
    {#each Array(3) as _}
      <Skeleton class="h-80 w-full" />
    {/each}
  </div>
{:else}
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <MetricCard
      title="Avg Prep Time"
      value="12.4 min"
      trend="down"
      change="1.8 min"
      period="vs. last month"
      icon={Clock}
    />
    <MetricCard
      title="Orders Per Hour"
      value="28.5"
      trend="up"
      change="3.2"
      period="vs. target"
      icon={TrendingUp}
    />
    <MetricCard
      title="Food Wastage"
      value="2.8%"
      trend="down"
      change="1.4%"
      period="vs. last quarter"
      icon={Trash2}
    />
    <MetricCard
      title="Kitchen Efficiency"
      value="88%"
      trend="up"
      change="5%"
      period="vs. last month"
      icon={Zap}
    />
  </div>

  <div class="grid gap-4 md:grid-cols-2 mt-4">
    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Hourly Production</h3>
        <div class="h-80">
          <LineChart
            data={hourlyProduction}
            xKey="hour"
            yKey="orders"
            color="#3b82f6"
            xLabel="Hour"
            yLabel="Orders Completed"
          />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Average Prep Time by Category</h3>
        <div class="h-80">
          <BarChart
            data={orderPrepTimes}
            xKey="category"
            yKey={['time']}
            colors={['#22c55e']}
            xLabel="Category"
            yLabel="Minutes"
          />
        </div>
      </Card.Content>
    </Card.Root>
  </div>

  <div class="grid gap-4 md:grid-cols-3 mt-4">
    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Resource Utilization</h3>
        <div class="h-80">
          <PieChart
            data={resourceUtilization}
            nameKey="category"
            valueKey="value"
            colors={resourceUtilization.map((item) => item.color)}
          />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Food Wastage Trend</h3>
        <div class="h-80">
          <LineChart
            data={wastageData}
            xKey="date"
            yKey="percentage"
            color="#ef4444"
            xLabel="Date"
            yLabel="Wastage %"
          />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Production Bottlenecks</h3>
        <div class="space-y-4 max-h-80 overflow-y-auto pr-2">
          {#each bottlenecks as item}
            <InfoCard
              title={item.area}
              value={item.impact}
              description={item.description}
              icon={getIconForImpact(item.impact)}
            />
          {/each}
        </div>
      </Card.Content>
    </Card.Root>
  </div>
{/if}

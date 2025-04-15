<script>
  import * as Card from '$lib/components/ui/card';
  import BarChart from '../commons/charts/bar-chart.svelte';
  import LineChart from '../commons/charts/line-chart.svelte';
  import PieChart from '../commons/charts/pie-chart.svelte';
  import MetricCard from '$lib/components/domain/commons/metric-card.svelte';
  import StaffCard from '$lib/components/domain/commons/staff-card.svelte';
  import { Users, Activity, RefreshCw, Award } from 'lucide-svelte';
  import { Skeleton } from '$lib/components/ui/skeleton';

  // Props using Svelte 5 runes
  let { dateRange = '', selectedFacility = '', isLoading = false } = $props();

  // Sample data - replace with actual data from your API
  let staffEfficiency = $state([
    { name: 'Sarah', efficiency: 94 },
    { name: 'Michael', efficiency: 88 },
    { name: 'Emily', efficiency: 96 },
    { name: 'David', efficiency: 92 },
    { name: 'Jessica', efficiency: 90 }
  ]);

  let departmentPerformance = $state([
    { department: 'Kitchen', score: 92 },
    { department: 'Servers', score: 89 },
    { department: 'Bar', score: 94 },
    { department: 'Hosts', score: 87 }
  ]);

  let staffTurnoverRate = $state([
    { month: 'Jan', rate: 2.1 },
    { month: 'Feb', rate: 1.8 },
    { month: 'Mar', rate: 1.5 },
    { month: 'Apr', rate: 1.2 },
    { month: 'May', rate: 0.9 },
    { month: 'Jun', rate: 0.7 }
  ]);

  let trainingDistribution = $state([
    { category: 'Completed', value: 82, color: '#22c55e' },
    { category: 'In Progress', value: 12, color: '#eab308' },
    { category: 'Not Started', value: 6, color: '#ef4444' }
  ]);

  let topPerformers = $state([
    {
      name: 'Emily Johnson',
      position: 'Head Chef',
      metrics: '96% efficiency, 4.9/5 customer rating',
      avatar: '/avatars/emily.jpg'
    },
    {
      name: 'Jason Martinez',
      position: 'Senior Server',
      metrics: '94% efficiency, 4.8/5 customer rating',
      avatar: '/avatars/jason.jpg'
    },
    {
      name: 'Olivia Chen',
      position: 'Bar Manager',
      metrics: '95% efficiency, 4.8/5 customer rating',
      avatar: '/avatars/olivia.jpg'
    }
  ]);

  // Use effect to refetch data when props change
  $effect(() => {
    if (dateRange || selectedFacility) {
      // In a real application, you would fetch data based on these filters
      console.log(`Fetching staff data for ${selectedFacility} over ${dateRange}`);
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
      title="Staff Count"
      value="24"
      trend="up"
      change="2"
      period="vs. last quarter"
      icon={Users}
    />
    <MetricCard
      title="Avg Efficiency"
      value="91%"
      trend="up"
      change="3%"
      period="vs. target"
      icon={Activity}
    />
    <MetricCard
      title="Turnover Rate"
      value="0.7%"
      trend="down"
      change="1.4%"
      period="vs. industry avg"
      icon={RefreshCw}
    />
    <MetricCard
      title="Training Completion"
      value="82%"
      trend="up"
      change="7%"
      period="this quarter"
      icon={Award}
    />
  </div>

  <div class="grid gap-4 md:grid-cols-2 mt-4">
    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Staff Efficiency Ratings</h3>
        <div class="h-80">
          <BarChart
            data={staffEfficiency}
            xKey="name"
            yKey="efficiency"
            colors={['#3b82f6']}
            xLabel="Staff Member"
            yLabel="Efficiency Score"
          />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Department Performance</h3>
        <div class="h-80">
          <BarChart
            data={departmentPerformance}
            xKey="department"
            yKey="score"
            colors={['#8b5cf6']}
            xLabel="Department"
            yLabel="Performance Score"
          />
        </div>
      </Card.Content>
    </Card.Root>
  </div>

  <div class="grid gap-4 md:grid-cols-3 mt-4">
    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Staff Turnover Trend</h3>
        <div class="h-80">
          <LineChart
            data={staffTurnoverRate}
            xKey="month"
            yKey="rate"
            color="#ef4444"
            xLabel="Month"
            yLabel="Turnover Rate (%)"
          />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Training Status</h3>
        <div class="h-80">
          <PieChart
            data={trainingDistribution}
            nameKey="category"
            valueKey="value"
            colors={trainingDistribution.map((item) => item.color)}
          />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Top Performers</h3>
        <div class="space-y-4 max-h-80 overflow-y-auto pr-2">
          {#each topPerformers as staff}
            <StaffCard
              name={staff.name}
              position={staff.position}
              metrics={staff.metrics}
              avatar={staff.avatar}
            />
          {/each}
        </div>
      </Card.Content>
    </Card.Root>
  </div>
{/if}

<script>
  import * as Card from '$lib/components/ui/card';
  import MetricCard from '$lib/components/domain/commons/metric-card.svelte';
  import InfoCard from '$lib/components/domain/commons/info-card.svelte';
  import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
  import {
    CheckCircle,
    ClipboardCheck,
    AlertTriangle,
    Shield,
    Calendar,
    FileText,
    Users
  } from 'lucide-svelte';
  import BarChart from '../commons/charts/bar-chart.svelte';
  import LineChart from '../commons/charts/line-chart.svelte';
  import PieChart from '../commons/charts/pie-chart.svelte';

  // Props using Svelte 5 runes
  let { dateRange = '', selectedFacility = '', isLoading = false } = $props();

  // Sample data - replace with actual data from your API
  let complianceRates = $state([
    { category: 'Food Safety', rate: 94 },
    { category: 'Health & Safety', rate: 88 },
    { category: 'Environmental', rate: 92 },
    { category: 'Labor Laws', rate: 96 },
    { category: 'Licensing', rate: 100 }
  ]);

  let complianceIssues = $state([
    { category: 'Minor', value: 12, color: '#22c55e' },
    { category: 'Moderate', value: 5, color: '#eab308' },
    { category: 'Critical', value: 1, color: '#ef4444' }
  ]);

  let inspectionHistory = $state([
    { month: 'Jan', passed: 2, failed: 0 },
    { month: 'Feb', passed: 1, failed: 0 },
    { month: 'Mar', passed: 2, failed: 1 },
    { month: 'Apr', passed: 1, failed: 0 },
    { month: 'May', passed: 2, failed: 0 },
    { month: 'Jun', passed: 1, failed: 0 }
  ]);

  let barColors = $state(['#22c55e', '#ef4444']);

  // Use effect to refetch data when props change
  $effect(() => {
    if (dateRange || selectedFacility) {
      // In a real application, you would fetch data based on these filters
      console.log(`Fetching compliance data for ${selectedFacility} over ${dateRange}`);
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
      title="Overall Compliance"
      value="93%"
      trend="up"
      change="2%"
      period="vs. last quarter"
      icon={CheckCircle}
    />
    <MetricCard
      title="Audit Score"
      value="4.7/5"
      trend="up"
      change="0.2"
      period="vs. last audit"
      icon={ClipboardCheck}
    />
    <MetricCard
      title="Open Violations"
      value="3"
      trend="down"
      change="5"
      period="from last month"
      icon={AlertTriangle}
    />
    <MetricCard
      title="Days Since Incident"
      value="124"
      trend="up"
      change="124"
      period="continuous"
      icon={Shield}
    />
  </div>

  <div class="grid gap-4 md:grid-cols-2 mt-4">
    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Compliance Rates by Category</h3>
        <div class="h-80">
          <BarChart
            data={complianceRates}
            xKey="category"
            yKey="rate"
            colors={['#3b82f6']}
            xLabel="Category"
            yLabel="Compliance Rate (%)"
          />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Compliance Issues by Severity</h3>
        <div class="h-80">
          <PieChart
            data={complianceIssues}
            nameKey="category"
            valueKey="value"
            colors={complianceIssues.map((item) => item.color)}
          />
        </div>
      </Card.Content>
    </Card.Root>
  </div>

  <div class="grid gap-4 md:grid-cols-3 mt-4">
    <Card.Root class="md:col-span-2">
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Inspection History</h3>
        <div class="h-80">
          <BarChart
            data={inspectionHistory}
            xKey="month"
            yKey={['passed', 'failed']}
            colors={barColors}
            xLabel="Month"
            yLabel="Count"
            stacked={false}
          />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Upcoming Obligations</h3>
        <div class="space-y-4">
          <InfoCard
            title="Health Inspection"
            value="Jun 15, 2023"
            description="Scheduled quarterly inspection"
            icon={Calendar}
          />
          <InfoCard
            title="License Renewal"
            value="Jul 1, 2023"
            description="Annual business license"
            icon={FileText}
          />
          <InfoCard
            title="Safety Training"
            value="Jun 22, 2023"
            description="Mandatory for all staff"
            icon={Users}
          />
        </div>
      </Card.Content>
    </Card.Root>
  </div>
{/if}

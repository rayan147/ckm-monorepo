<script>
  import * as Card from '$lib/components/ui/card';
  import BarChart from '../commons/charts/bar-chart.svelte';
  import LineChart from '../commons/charts/line-chart.svelte';
  import PieChart from '../commons/charts/pie-chart.svelte';

  import MetricCard from '$lib/components/domain/commons/metric-card.svelte';
  import SupplierCard from '$lib/components/domain/commons/supplier-card.svelte';
  import { Truck, Star, CheckCircle, Clock } from 'lucide-svelte';
  import { Skeleton } from '$lib/components/ui/skeleton';

  // Props using Svelte 5 runes
  let { dateRange = '', selectedFacility = '', isLoading = false } = $props();

  // Sample data - replace with actual data from your API
  let supplierRatings = $state([
    { name: 'Fresh Farms', rating: 4.8 },
    { name: 'Premier Proteins', rating: 4.6 },
    { name: 'Coastal Seafood', rating: 4.9 },
    { name: 'Artisan Bakery', rating: 4.7 },
    { name: 'Organic Produce', rating: 4.5 }
  ]);

  let orderAccuracy = $state([
    { month: 'Jan', accuracy: 97.2 },
    { month: 'Feb', accuracy: 96.8 },
    { month: 'Mar', accuracy: 98.1 },
    { month: 'Apr', accuracy: 98.5 },
    { month: 'May', accuracy: 99.2 },
    { month: 'Jun', accuracy: 99.4 }
  ]);

  let supplierSpendDistribution = $state([
    { supplier: 'Fresh Farms', value: 32, color: '#22c55e' },
    { supplier: 'Premier Proteins', value: 28, color: '#ef4444' },
    { supplier: 'Coastal Seafood', value: 18, color: '#3b82f6' },
    { supplier: 'Artisan Bakery', value: 12, color: '#eab308' },
    { supplier: 'Organic Produce', value: 10, color: '#8b5cf6' }
  ]);

  let deliveryPerformance = $state([
    { supplier: 'Fresh Farms', onTime: 94 },
    { supplier: 'Premier Proteins', onTime: 91 },
    { supplier: 'Coastal Seafood', onTime: 97 },
    { supplier: 'Artisan Bakery', onTime: 96 },
    { supplier: 'Organic Produce', onTime: 92 }
  ]);

  let keySuppliers = $state([
    {
      name: 'Fresh Farms',
      category: 'Produce',
      metrics: '98% quality, 94% on-time delivery',
      contact: 'John Smith, (555) 123-4567'
    },
    {
      name: 'Coastal Seafood',
      category: 'Seafood',
      metrics: '99% quality, 97% on-time delivery',
      contact: 'Maria Garcia, (555) 987-6543'
    },
    {
      name: 'Premier Proteins',
      category: 'Meats',
      metrics: '96% quality, 91% on-time delivery',
      contact: 'Robert Johnson, (555) 456-7890'
    }
  ]);

  // Use effect to refetch data when props change
  $effect(() => {
    if (dateRange || selectedFacility) {
      // In a real application, you would fetch data based on these filters
      console.log(`Fetching supplier data for ${selectedFacility} over ${dateRange}`);
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
      title="Active Suppliers"
      value="18"
      trend="up"
      change="2"
      period="vs. last year"
      icon={Truck}
    />
    <MetricCard
      title="Avg Supplier Rating"
      value="4.7/5"
      trend="up"
      change="0.3"
      period="vs. last quarter"
      icon={Star}
    />
    <MetricCard
      title="Order Accuracy"
      value="99.4%"
      trend="up"
      change="1.2%"
      period="vs. target"
      icon={CheckCircle}
    />
    <MetricCard
      title="On-time Delivery"
      value="94%"
      trend="up"
      change="3%"
      period="this quarter"
      icon={Clock}
    />
  </div>

  <div class="grid gap-4 md:grid-cols-2 mt-4">
    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Supplier Quality Ratings</h3>
        <div class="h-80">
          <BarChart
            data={supplierRatings}
            xKey="name"
            yKey="rating"
            colors={['#3b82f6']}
            xLabel="Supplier"
            yLabel="Quality Rating"
          />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Order Accuracy Trend</h3>
        <div class="h-80">
          <LineChart
            data={orderAccuracy}
            xKey="month"
            yKey="accuracy"
            color="#22c55e"
            xLabel="Month"
            yLabel="Accuracy (%)"
          />
        </div>
      </Card.Content>
    </Card.Root>
  </div>

  <div class="grid gap-4 md:grid-cols-3 mt-4">
    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Spend Distribution</h3>
        <div class="h-80">
          <PieChart
            data={supplierSpendDistribution}
            nameKey="supplier"
            valueKey="value"
            colors={supplierSpendDistribution.map((item) => item.color)}
          />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">On-time Delivery Performance</h3>
        <div class="h-80">
          <BarChart
            data={deliveryPerformance}
            xKey="supplier"
            yKey="onTime"
            colors={['#8b5cf6']}
            xLabel="Supplier"
            yLabel="On-time Rate (%)"
          />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Key Supplier Contacts</h3>
        <div class="space-y-4 max-h-80 overflow-y-auto pr-2">
          {#each keySuppliers as supplier}
            <SupplierCard
              name={supplier.name}
              category={supplier.category}
              metrics={supplier.metrics}
              contact={supplier.contact}
            />
          {/each}
        </div>
      </Card.Content>
    </Card.Root>
  </div>
{/if}

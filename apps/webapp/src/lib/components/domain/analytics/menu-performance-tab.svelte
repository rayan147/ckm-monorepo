<script>
  import * as Card from '$lib/components/ui/card';
  import BarChart from '../commons/charts/bar-chart.svelte';
  import LineChart from '../commons/charts/line-chart.svelte';
  import PieChart from '../commons/charts/pie-chart.svelte';

  import MetricCard from '$lib/components/domain/commons/metric-card.svelte';
  import ItemCard from '$lib/components/domain/commons/item-card.svelte';
  import { BookOpen, DollarSign, Percent, ShoppingCart } from 'lucide-svelte';
  import { Skeleton } from '$lib/components/ui/skeleton';

  // Props using Svelte 5 runes
  let { dateRange = '', selectedFacility = '', isLoading = false } = $props();

  // Sample data - replace with actual data from your API
  let topSellingItems = $state([
    { name: 'Signature Burger', sales: 427, profit: 2135 },
    { name: 'Truffle Pasta', sales: 349, profit: 2443 },
    { name: 'Seafood Platter', sales: 287, profit: 3444 },
    { name: 'NY Strip Steak', sales: 243, profit: 3645 },
    { name: 'Chocolate Lava Cake', sales: 218, profit: 1308 }
  ]);

  let categoryPerformance = $state([
    { category: 'Main Courses', sales: 1245, profit: 12450 },
    { category: 'Appetizers', sales: 876, profit: 6132 },
    { category: 'Desserts', sales: 543, profit: 3801 },
    { category: 'Beverages', sales: 987, profit: 5922 },
    { category: 'Specials', sales: 432, profit: 4752 }
  ]);

  let menuProfitDistribution = $state([
    { category: 'Main Courses', value: 42, color: '#3b82f6' },
    { category: 'Appetizers', value: 21, color: '#22c55e' },
    { category: 'Desserts', value: 13, color: '#eab308' },
    { category: 'Beverages', value: 20, color: '#ec4899' },
    { category: 'Specials', value: 4, color: '#8b5cf6' }
  ]);

  let salesTrend = $state([
    { day: 'Mon', sales: 2450 },
    { day: 'Tue', sales: 2100 },
    { day: 'Wed', sales: 2820 },
    { day: 'Thu', sales: 3240 },
    { day: 'Fri', sales: 4150 },
    { day: 'Sat', sales: 4680 },
    { day: 'Sun', sales: 3720 }
  ]);

  // Calculate low-performing items
  let lowPerformingItems = $state([
    { name: 'Quinoa Salad', sales: 87, profit: 348 },
    { name: 'Vegetable Soup', sales: 92, profit: 368 },
    { name: 'Fruit Tart', sales: 64, profit: 256 }
  ]);

  // Use effect to refetch data when props change
  $effect(() => {
    if (dateRange || selectedFacility) {
      // In a real application, you would fetch data based on these filters
      console.log(`Fetching menu data for ${selectedFacility} over ${dateRange}`);
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
      title="Total Menu Items"
      value="42"
      trend="up"
      change="3"
      period="vs. last menu"
      icon={BookOpen}
    />
    <MetricCard
      title="Avg Item Profit"
      value="$18.40"
      trend="up"
      change="$1.20"
      period="vs. last quarter"
      icon={DollarSign}
    />
    <MetricCard
      title="Menu Utilization"
      value="87%"
      trend="up"
      change="4%"
      period="vs. target"
      icon={Percent}
    />
    <MetricCard
      title="Food Cost %"
      value="32%"
      trend="down"
      change="2%"
      period="vs. last quarter"
      icon={ShoppingCart}
    />
  </div>

  <div class="grid gap-4 md:grid-cols-2 mt-4">
    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Top Selling Items</h3>
        <div class="h-80">
          <BarChart
            data={topSellingItems}
            xKey="name"
            yKey={['sales']}
            colors={['#3b82f6']}
            xLabel="Item"
            yLabel="Units Sold"
          />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Weekly Sales Trend</h3>
        <div class="h-80">
          <LineChart
            data={salesTrend}
            xKey="day"
            yKey="sales"
            color="#22c55e"
            xLabel="Day"
            yLabel="Sales ($)"
          />
        </div>
      </Card.Content>
    </Card.Root>
  </div>

  <div class="grid gap-4 md:grid-cols-3 mt-4">
    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Profit Distribution</h3>
        <div class="h-80">
          <PieChart
            data={menuProfitDistribution}
            nameKey="category"
            valueKey="value"
            colors={menuProfitDistribution.map((item) => item.color)}
          />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Category Performance</h3>
        <div class="h-80">
          <BarChart
            data={categoryPerformance}
            xKey="category"
            yKey={['sales']}
            colors={['#8b5cf6']}
            xLabel="Category"
            yLabel="Total Sales"
          />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Low Performing Items</h3>
        <div class="space-y-4 max-h-80 overflow-y-auto pr-2">
          {#each lowPerformingItems as item}
            <ItemCard
              name={item.name}
              value={item.sales}
              subValue={`$${item.profit}`}
              label="units sold"
              subLabel="profit"
              trend="down"
            />
          {/each}
        </div>
      </Card.Content>
    </Card.Root>
  </div>
{/if}

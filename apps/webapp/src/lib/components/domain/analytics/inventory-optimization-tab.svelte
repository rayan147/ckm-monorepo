<!-- analytics/InventoryOptimizationTab.svelte -->
<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Table from '$lib/components/ui/table/index.js';
  import { Progress } from '$lib/components/ui/progress/index.js';
  import * as Button from '$lib/components/ui/button/index.js';
  import * as Alert from '$lib/components/ui/alert/index.js';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { AlertTriangle, Circle, Clock, TrendingDown, TrendingUp } from 'lucide-svelte';
  import { LayerCake, Svg } from 'layercake';
  import * as d3 from 'd3';
  import { default as Line } from './charts/line.svelte';
  import { default as Bar } from './charts/bar.svelte';

  // Props
  let { dateRange, selectedFacility, isLoading } = $props();

  // Local tab state
  let inventoryTab = $state('turnover');

  // Mock data for inventory turnover
  let turnoverRates = $state([
    { category: 'Proteins', turnover: 8.4, target: 7.5, stockValue: 12450 },
    { category: 'Dairy', turnover: 12.3, target: 12.0, stockValue: 4825 },
    { category: 'Produce', turnover: 18.9, target: 15.0, stockValue: 3650 },
    { category: 'Dry Goods', turnover: 5.2, target: 6.0, stockValue: 8750 },
    { category: 'Frozen', turnover: 4.8, target: 5.5, stockValue: 6280 }
  ]);

  // Mock data for inventory trends
  let inventoryTrends = $state([
    { date: new Date('2025-03-15'), value: 32150 },
    { date: new Date('2025-03-22'), value: 33420 },
    { date: new Date('2025-03-29'), value: 34180 },
    { date: new Date('2025-04-05'), value: 34850 },
    { date: new Date('2025-04-12'), value: 35955 }
  ]);

  // Mock data for stockouts
  let stockoutData = $state([
    { date: new Date('2025-03-15'), count: 3 },
    { date: new Date('2025-03-22'), count: 2 },
    { date: new Date('2025-03-29'), count: 4 },
    { date: new Date('2025-04-05'), count: 1 },
    { date: new Date('2025-04-12'), count: 2 }
  ]);

  // PAR level compliance
  let parLevelItems = $state([
    { name: 'Chicken Breast', parLevel: 25, currentStock: 18, unitType: 'kg', status: 'below' },
    { name: 'Whole Milk', parLevel: 45, currentStock: 42, unitType: 'L', status: 'near' },
    { name: 'Romaine Lettuce', parLevel: 18, currentStock: 4, unitType: 'kg', status: 'critical' },
    { name: 'Tomatoes', parLevel: 15, currentStock: 8, unitType: 'kg', status: 'below' },
    { name: 'Flour', parLevel: 50, currentStock: 58, unitType: 'kg', status: 'above' },
    { name: 'Olive Oil', parLevel: 20, currentStock: 12, unitType: 'L', status: 'below' },
    { name: 'Heavy Cream', parLevel: 12, currentStock: 14, unitType: 'L', status: 'above' }
  ]);

  // Expiry tracking
  let expiryTrackingItems = $state([
    {
      name: 'Fresh Salmon Fillets',
      quantity: 8.5,
      unit: 'kg',
      expiryDate: new Date('2025-04-18'),
      daysRemaining: 3,
      value: 212.5
    },
    {
      name: 'Ground Beef',
      quantity: 15,
      unit: 'kg',
      expiryDate: new Date('2025-04-20'),
      daysRemaining: 5,
      value: 187.5
    },
    {
      name: 'Plain Yogurt',
      quantity: 20,
      unit: 'kg',
      expiryDate: new Date('2025-04-21'),
      daysRemaining: 6,
      value: 120.0
    },
    {
      name: 'Fresh Berries',
      quantity: 5,
      unit: 'kg',
      expiryDate: new Date('2025-04-17'),
      daysRemaining: 2,
      value: 85.0
    }
  ]);

  // Waste-to-usage ratios
  let wasteRatios = $state([
    { category: 'Proteins', usage: 245, waste: 12.3, ratio: 5.0 },
    { category: 'Dairy', usage: 185, waste: 9.3, ratio: 5.0 },
    { category: 'Produce', usage: 210, waste: 21.0, ratio: 10.0 },
    { category: 'Dry Goods', usage: 320, waste: 6.4, ratio: 2.0 },
    { category: 'Frozen', usage: 175, waste: 5.3, ratio: 3.0 }
  ]);

  // Critical alerts
  let inventoryAlerts = $state([
    {
      title: 'Critical Stock Alert',
      description: 'Romaine Lettuce at 22% of PAR level (4kg vs 18kg)',
      severity: 'critical'
    },
    {
      title: 'Expiring Inventory Alert',
      description: 'Fresh Berries expiring in 2 days, valued at $85.00',
      severity: 'warning'
    },
    {
      title: 'Low Turnover Alert',
      description: 'Dry Goods turnover rate (5.2) below target (6.0)',
      severity: 'warning'
    }
  ]);

  // Sort PAR level items by status severity
  let sortedParItems = $derived(
    [...parLevelItems].sort((a, b) => {
      const statusOrder = { critical: 0, below: 1, near: 2, above: 3 };
      return statusOrder[a.status] - statusOrder[b.status];
    })
  );

  // Sort expiry tracking items by days remaining
  let sortedExpiryItems = $derived(
    [...expiryTrackingItems].sort((a, b) => a.daysRemaining - b.daysRemaining)
  );

  // Calculate PAR level compliance percentage
  let parComplianceRate = $derived(
    Math.round(
      (parLevelItems.filter((item) => item.status !== 'below' && item.status !== 'critical')
        .length /
        parLevelItems.length) *
        100
    )
  );

  // Current inventory value
  let inventoryValue = $derived(
    turnoverRates.reduce((sum, category) => sum + category.stockValue, 0)
  );
</script>

<div class="space-y-6">
  <!-- Inventory Optimization Header -->
  <div>
    <h2 class="text-3xl font-bold">Inventory Optimization</h2>
    <p class="text-muted-foreground">Track, analyze and optimize inventory levels and turnover</p>
  </div>

  <!-- Alerts Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each inventoryAlerts as alert}
      <Alert.Root variant={alert.severity === 'critical' ? 'destructive' : 'default'}>
        {#if alert.severity === 'critical'}
          <AlertTriangle class="h-4 w-4" />
        {:else}
          <Circle class="h-4 w-4" />
        {/if}
        <Alert.Title>{alert.title}</Alert.Title>
        <Alert.Description>{alert.description}</Alert.Description>
      </Alert.Root>
    {/each}
  </div>

  <!-- KPI Summary Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <Card.Root>
      <Card.Header class="pb-2">
        <Card.Title class="text-sm font-medium">Current Inventory Value</Card.Title>
      </Card.Header>
      <Card.Content>
        <div class="text-2xl font-bold">${inventoryValue.toLocaleString()}</div>
        <p class="text-xs text-green-500">
          +5.2% from previous {dateRange}
        </p>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Header class="pb-2">
        <Card.Title class="text-sm font-medium">Average Turnover Rate</Card.Title>
      </Card.Header>
      <Card.Content>
        <div class="text-2xl font-bold">
          {(
            turnoverRates.reduce((sum, item) => sum + item.turnover, 0) / turnoverRates.length
          ).toFixed(1)}x
        </div>
        <p class="text-xs text-green-500">
          +0.8x from previous {dateRange}
        </p>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Header class="pb-2">
        <Card.Title class="text-sm font-medium">PAR Level Compliance</Card.Title>
      </Card.Header>
      <Card.Content>
        <div class="text-2xl font-bold">{parComplianceRate}%</div>
        <p class="text-xs text-red-500">
          -5% from previous {dateRange}
        </p>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Header class="pb-2">
        <Card.Title class="text-sm font-medium">Stockout Events</Card.Title>
      </Card.Header>
      <Card.Content>
        <div class="text-2xl font-bold">
          {stockoutData.reduce((sum, item) => sum + item.count, 0)}
        </div>
        <p class="text-xs text-yellow-500">
          No change from previous {dateRange}
        </p>
      </Card.Content>
    </Card.Root>
  </div>

  <!-- Inventory Tabs -->
  <Tabs.Root value={inventoryTab} onValueChange={(value) => (inventoryTab = value)} class="w-full">
    <Tabs.List>
      <Tabs.Trigger value="turnover">Turnover Rates</Tabs.Trigger>
      <Tabs.Trigger value="par-levels">PAR Levels</Tabs.Trigger>
      <Tabs.Trigger value="expiry">Expiry Tracking</Tabs.Trigger>
      <Tabs.Trigger value="waste-ratio">Waste Ratios</Tabs.Trigger>
    </Tabs.List>

    <!-- Turnover Rates Tab -->
    <Tabs.Content value="turnover" class="pt-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Turnover by Category Chart -->
        <Card.Root class="lg:col-span-2">
          <Card.Header>
            <Card.Title>Inventory Turnover by Category</Card.Title>
            <Card.Description>Actual vs. target turnover rates</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="h-80">
              <LayerCake
                data={turnoverRates}
                x={(d) => d.category}
                y={(d) => d.turnover}
                yDomain={[
                  0,
                  Math.max(...turnoverRates.map((d) => Math.max(d.turnover, d.target))) * 1.2
                ]}
                padding={{ top: 20, right: 10, bottom: 40, left: 40 }}
              >
                <Svg>
                  <Bar
                    fill={(d) => {
                      return d.turnover >= d.target ? '#22c55e' : '#f59e0b';
                    }}
                  />
                </Svg>
              </LayerCake>
            </div>
          </Card.Content>
        </Card.Root>

        <!-- Stockout Trend -->
        <Card.Root>
          <Card.Header>
            <Card.Title>Stockout Events</Card.Title>
            <Card.Description>Weekly count of stockout incidents</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="h-72">
              <LayerCake
                x={(d) => d.date}
                y={(d) => d.count}
                yDomain={[0, 5]}
                xScale={d3.scaleTime()}
                padding={{ top: 20, right: 10, bottom: 20, left: 30 }}
                data={stockoutData}
              >
                <Svg>
                  <Line color="#ef4444" />
                </Svg>
              </LayerCake>
            </div>

            <div class="mt-4 space-y-2">
              <div class="flex justify-between items-center text-sm">
                <span>Total Stockouts:</span>
                <span class="font-medium"
                  >{stockoutData.reduce((sum, item) => sum + item.count, 0)}</span
                >
              </div>
              <div class="flex justify-between items-center text-sm">
                <span>Average per Week:</span>
                <span class="font-medium"
                  >{(
                    stockoutData.reduce((sum, item) => sum + item.count, 0) / stockoutData.length
                  ).toFixed(1)}</span
                >
              </div>
              <div class="flex justify-between items-center text-sm">
                <span>Target:</span>
                <span class="font-medium">≤ 2 per week</span>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      </div>

      <!-- Turnover Analysis Table -->
      <Card.Root class="mt-6">
        <Card.Header>
          <Card.Title>Inventory Turnover Analysis</Card.Title>
          <Card.Description>Detailed breakdown by category with recommendations</Card.Description>
        </Card.Header>
        <Card.Content>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Category</Table.Head>
                <Table.Head class="text-right">Stock Value</Table.Head>
                <Table.Head class="text-right">Current Turnover</Table.Head>
                <Table.Head class="text-right">Target Turnover</Table.Head>
                <Table.Head class="text-right">Variance</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Recommendation</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {#each turnoverRates as item}
                <Table.Row>
                  <Table.Cell class="font-medium">{item.category}</Table.Cell>
                  <Table.Cell class="text-right">${item.stockValue.toLocaleString()}</Table.Cell>
                  <Table.Cell class="text-right">{item.turnover.toFixed(1)}x</Table.Cell>
                  <Table.Cell class="text-right">{item.target.toFixed(1)}x</Table.Cell>
                  <Table.Cell
                    class="text-right {item.turnover > item.target
                      ? 'text-green-500'
                      : 'text-red-500'}"
                  >
                    {(item.turnover - item.target).toFixed(1)}x
                  </Table.Cell>
                  <Table.Cell>
                    {#if item.turnover >= item.target * 1.1}
                      <Badge variant="default">Excellent</Badge>
                    {:else if item.turnover >= item.target}
                      <Badge variant="outline">On Target</Badge>
                    {:else if item.turnover >= item.target * 0.8}
                      <Badge variant="secondary">Review</Badge>
                    {:else}
                      <Badge variant="destructive">Action Needed</Badge>
                    {/if}
                  </Table.Cell>
                  <Table.Cell>
                    {#if item.turnover < item.target * 0.8}
                      Reduce order quantities
                    {:else if item.turnover < item.target}
                      Adjust PAR levels
                    {:else if item.turnover > item.target * 1.5}
                      Evaluate stockout risk
                    {:else}
                      Maintain current levels
                    {/if}
                  </Table.Cell>
                </Table.Row>
              {/each}
            </Table.Body>
          </Table.Root>
        </Card.Content>
        <Card.Footer>
          <Button.Root>Generate Inventory Optimization Plan</Button.Root>
        </Card.Footer>
      </Card.Root>
    </Tabs.Content>

    <!-- PAR Levels Tab -->
    <Tabs.Content value="par-levels" class="pt-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- PAR Level Compliance Chart -->
        <Card.Root class="lg:col-span-2">
          <Card.Header>
            <Card.Title>PAR Level Compliance</Card.Title>
            <Card.Description>Current stock vs. established PAR levels</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="h-80 space-y-5 overflow-y-auto pr-2">
              {#each sortedParItems as item}
                <div>
                  <div class="flex justify-between items-center mb-1">
                    <div class="font-medium">{item.name}</div>
                    <div class="text-sm">
                      {item.currentStock}
                      {item.unitType} / PAR: {item.parLevel}
                      {item.unitType}
                    </div>
                  </div>
                  <div class="relative pt-1">
                    <Progress
                      value={item.currentStock}
                      max={item.parLevel * 1.5}
                      class={item.status === 'critical'
                        ? 'bg-red-200'
                        : item.status === 'below'
                          ? 'bg-yellow-200'
                          : 'bg-gray-200'}
                    >
                      <Progress
                        style={`transform: translateX(-${100 - (item.currentStock / (item.parLevel * 1.5)) * 100}%)`}
                        class={item.status === 'critical'
                          ? 'bg-red-500'
                          : item.status === 'below'
                            ? 'bg-yellow-500'
                            : item.status === 'above'
                              ? 'bg-blue-500'
                              : 'bg-green-500'}
                      />
                    </Progress>
                    <!-- PAR level marker -->
                    <div
                      class="absolute h-4 w-0.5 bg-gray-800 top-0"
                      style={`left: ${(item.parLevel / (item.parLevel * 1.5)) * 100}%`}
                    ></div>

                    <div class="flex justify-between text-xs mt-1">
                      <div>
                        {Math.round((item.currentStock / item.parLevel) * 100)}% of PAR
                      </div>
                      <div>
                        {#if item.status === 'critical'}
                          <span class="text-red-500">Critical</span>
                        {:else if item.status === 'below'}
                          <span class="text-yellow-500">Below PAR</span>
                        {:else if item.status === 'near'}
                          <span class="text-green-500">Near PAR</span>
                        {:else}
                          <span class="text-blue-500">Above PAR</span>
                        {/if}
                      </div>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </Card.Content>
        </Card.Root>

        <!-- PAR Level Summary -->
        <Card.Root>
          <Card.Header>
            <Card.Title>PAR Level Summary</Card.Title>
            <Card.Description>Status of inventory against PAR levels</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="space-y-6">
              <div>
                <div class="flex justify-between items-center text-sm">
                  <div class="flex items-center">
                    <div class="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span>Critical (Below 50%)</span>
                  </div>
                  <span class="font-medium"
                    >{parLevelItems.filter((i) => i.status === 'critical').length}</span
                  >
                </div>
                <div class="flex justify-between items-center text-sm mt-2">
                  <div class="flex items-center">
                    <div class="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span>Below PAR (50-90%)</span>
                  </div>
                  <span class="font-medium"
                    >{parLevelItems.filter((i) => i.status === 'below').length}</span
                  >
                </div>
                <div class="flex justify-between items-center text-sm mt-2">
                  <div class="flex items-center">
                    <div class="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Near PAR (90-110%)</span>
                  </div>
                  <span class="font-medium"
                    >{parLevelItems.filter((i) => i.status === 'near').length}</span
                  >
                </div>
                <div class="flex justify-between items-center text-sm mt-2">
                  <div class="flex items-center">
                    <div class="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>Above PAR (>110%)</span>
                  </div>
                  <span class="font-medium"
                    >{parLevelItems.filter((i) => i.status === 'above').length}</span
                  >
                </div>
              </div>

              <div class="border-t pt-4">
                <div class="text-sm font-medium">Overall PAR Compliance</div>
                <div class="text-3xl font-bold mt-1">{parComplianceRate}%</div>
                <div class="text-xs text-red-500 flex items-center mt-1">
                  -5% from previous {dateRange}
                </div>
              </div>

              <div class="border-t pt-4">
                <div class="text-sm font-medium">Required Ordering</div>
                <div class="text-3xl font-bold mt-1">
                  ${parLevelItems
                    .filter((i) => i.status === 'critical' || i.status === 'below')
                    .reduce((sum, i) => sum + (i.parLevel - i.currentStock) * 10, 0) // Mock price calculation
                    .toFixed(0)}
                </div>
                <div class="text-xs text-muted-foreground mt-1">
                  Estimated cost to reach PAR levels
                </div>
              </div>
            </div>
          </Card.Content>
          <Card.Footer>
            <Button.Root class="w-full">Generate Purchase Order</Button.Root>
          </Card.Footer>
        </Card.Root>
      </div>

      <!-- PAR Level Recommendations -->
      <Card.Root class="mt-6">
        <Card.Header>
          <Card.Title>PAR Level Recommendations</Card.Title>
          <Card.Description>Optimization suggestions based on historical usage</Card.Description>
        </Card.Header>
        <Card.Content>
          <div class="space-y-4">
            <div class="p-4 bg-red-50 border border-red-100 rounded-md">
              <div class="flex">
                <AlertTriangle class="h-5 w-5 text-red-500 flex-shrink-0 mr-3 mt-0.5" />
                <div>
                  <h3 class="font-medium">Critical Restocking Required</h3>
                  <p class="mt-1 text-sm">
                    Romaine Lettuce is at critical level (22% of PAR). Place order immediately to
                    prevent stockout.
                  </p>
                </div>
              </div>
            </div>

            <div class="p-4 bg-yellow-50 border border-yellow-100 rounded-md">
              <div class="flex">
                <AlertTriangle class="h-5 w-5 text-yellow-500 flex-shrink-0 mr-3 mt-0.5" />
                <div>
                  <h3 class="font-medium">Suggested PAR Level Adjustments</h3>
                  <p class="mt-1 text-sm">
                    Based on usage patterns over the past 90 days, consider these PAR level
                    adjustments:
                  </p>
                  <ul class="list-disc pl-5 mt-2 text-sm">
                    <li>
                      <strong>Increase</strong>: Chicken Breast from 25kg to 30kg (20% increase in
                      usage)
                    </li>
                    <li><strong>Decrease</strong>: Flour from 50kg to 40kg (consistent surplus)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="p-4 bg-blue-50 border border-blue-100 rounded-md">
              <div class="flex">
                <TrendingUp class="h-5 w-5 text-blue-500 flex-shrink-0 mr-3 mt-0.5" />
                <div>
                  <h3 class="font-medium">Seasonal Adjustment Alert</h3>
                  <p class="mt-1 text-sm">
                    Historical data indicates increased produce usage in upcoming season. Consider
                    temporary PAR level increases for:
                  </p>
                  <ul class="list-disc pl-5 mt-2 text-sm">
                    <li>Fresh Berries: +20%</li>
                    <li>Fresh Greens: +15%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card.Root>
    </Tabs.Content>

    <!-- Expiry Tracking Tab -->
    <Tabs.Content value="expiry" class="pt-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Expiring Items -->
        <Card.Root class="lg:col-span-2">
          <Card.Header>
            <Card.Title>Expiring Inventory</Card.Title>
            <Card.Description>Items approaching expiry date</Card.Description>
          </Card.Header>
          <Card.Content>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Item</Table.Head>
                  <Table.Head class="text-right">Quantity</Table.Head>
                  <Table.Head>Expiry Date</Table.Head>
                  <Table.Head class="text-right">Days Left</Table.Head>
                  <Table.Head class="text-right">Value</Table.Head>
                  <Table.Head>Status</Table.Head>
                  <Table.Head>Action</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {#each sortedExpiryItems as item}
                  <Table.Row>
                    <Table.Cell class="font-medium">{item.name}</Table.Cell>
                    <Table.Cell class="text-right">{item.quantity} {item.unit}</Table.Cell>
                    <Table.Cell>{item.expiryDate.toLocaleDateString()}</Table.Cell>
                    <Table.Cell class="text-right">{item.daysRemaining}</Table.Cell>
                    <Table.Cell class="text-right">${item.value.toFixed(2)}</Table.Cell>
                    <Table.Cell>
                      {#if item.daysRemaining <= 2}
                        <Badge variant="destructive">Critical</Badge>
                      {:else if item.daysRemaining <= 5}
                        <Badge variant="secondary">Use Soon</Badge>
                      {:else}
                        <Badge variant="outline">Monitor</Badge>
                      {/if}
                    </Table.Cell>
                    <Table.Cell>
                      <Button.Root variant="ghost" size="sm">Options</Button.Root>
                    </Table.Cell>
                  </Table.Row>
                {/each}
              </Table.Body>
            </Table.Root>
          </Card.Content>
        </Card.Root>

        <!-- Expiry Summary -->
        <Card.Root>
          <Card.Header>
            <Card.Title>Expiry Risk Summary</Card.Title>
            <Card.Description>Value of inventory at risk of expiry</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="space-y-6">
              <div>
                <div class="text-sm font-medium">Total At-Risk Value</div>
                <div class="text-3xl font-bold mt-1">
                  ${expiryTrackingItems.reduce((sum, item) => sum + item.value, 0).toFixed(2)}
                </div>
                <div class="text-xs text-yellow-500 flex items-center mt-1">
                  +$125.50 from previous {dateRange}
                </div>
              </div>

              <div>
                <div class="text-sm font-medium">Expiring Within 48 Hours</div>
                <div class="text-3xl font-bold mt-1">
                  ${expiryTrackingItems
                    .filter((i) => i.daysRemaining <= 2)
                    .reduce((sum, i) => sum + i.value, 0)
                    .toFixed(2)}
                </div>
                <div class="text-xs text-muted-foreground mt-1">Critical action required</div>
              </div>

              <div>
                <div class="text-sm font-medium">Expiring Within Week</div>
                <div class="text-3xl font-bold mt-1">
                  ${expiryTrackingItems
                    .filter((i) => i.daysRemaining <= 7)
                    .reduce((sum, i) => sum + i.value, 0)
                    .toFixed(2)}
                </div>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      </div>

      <!-- Expiry Action Plan -->
      <Card.Root class="mt-6">
        <Card.Header>
          <Card.Title>Expiry Risk Mitigation</Card.Title>
          <Card.Description>Recommendations to reduce waste from expired inventory</Card.Description
          >
        </Card.Header>
        <Card.Content>
          <div class="space-y-4">
            <div class="p-4 border rounded-md">
              <div class="flex">
                <Clock class="h-5 w-5 text-red-500 flex-shrink-0 mr-3 mt-0.5" />
                <div>
                  <h3 class="font-medium">Critical Action Plan (Next 48 Hours)</h3>
                  <div class="mt-2 space-y-4">
                    <div class="bg-gray-50 p-3 rounded-md">
                      <p class="text-sm font-medium">Fresh Berries (expires in 2 days)</p>
                      <ul class="list-disc pl-5 mt-1 text-sm">
                        <li>Feature in tomorrow's fruit dessert special</li>
                        <li>Incorporate into smoothie option for patients</li>
                        <li>Process remainder for freezing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4 border rounded-md">
              <div class="flex">
                <TrendingDown class="h-5 w-5 text-yellow-500 flex-shrink-0 mr-3 mt-0.5" />
                <div>
                  <h3 class="font-medium">Action Plan (3-7 Days)</h3>
                  <div class="mt-2 space-y-4">
                    <div class="bg-gray-50 p-3 rounded-md">
                      <p class="text-sm font-medium">Fresh Salmon Fillets (expires in 3 days)</p>
                      <ul class="list-disc pl-5 mt-1 text-sm">
                        <li>Feature as special for next 2 days</li>
                        <li>Process portion for freezing if not used</li>
                      </ul>
                    </div>

                    <div class="bg-gray-50 p-3 rounded-md">
                      <p class="text-sm font-medium">Ground Beef (expires in 5 days)</p>
                      <ul class="list-disc pl-5 mt-1 text-sm">
                        <li>Include in next 3 daily menus</li>
                        <li>Pre-cook portion for later use if needed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4 border rounded-md">
              <div class="flex">
                <TrendingDown class="h-5 w-5 text-green-500 flex-shrink-0 mr-3 mt-0.5" />
                <div>
                  <h3 class="font-medium">Purchasing Recommendations</h3>
                  <p class="mt-1 text-sm">To reduce future expiry risks:</p>
                  <ul class="list-disc pl-5 mt-2 text-sm">
                    <li>Reduce berry order quantity by 20% for next order</li>
                    <li>Adjust salmon delivery schedule to twice weekly (smaller quantities)</li>
                    <li>Review yogurt usage patterns - consistently approaching expiry</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card.Content>
        <Card.Footer class="flex justify-between">
          <Button.Root variant="secondary">Generate Full Report</Button.Root>
          <Button.Root>Implement Action Plan</Button.Root>
        </Card.Footer>
      </Card.Root>
    </Tabs.Content>

    <!-- Waste Ratios Tab -->
    <Tabs.Content value="waste-ratio" class="pt-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Waste Ratio Chart -->
        <Card.Root class="lg:col-span-2">
          <Card.Header>
            <Card.Title>Waste-to-Usage Ratios</Card.Title>
            <Card.Description>Comparing waste to usage across categories</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="h-80">
              <LayerCake
                data={wasteRatios}
                x={(d) => d.category}
                y={(d) => d.ratio}
                yDomain={[0, 12]}
                padding={{ top: 20, right: 10, bottom: 40, left: 40 }}
              >
                <Svg>
                  <Bar
                    fill={(d) => {
                      return d.ratio <= 3 ? '#22c55e' : d.ratio <= 5 ? '#f59e0b' : '#ef4444';
                    }}
                  />
                </Svg>
              </LayerCake>
            </div>
          </Card.Content>
        </Card.Root>

        <!-- Waste Summary -->
        <Card.Root>
          <Card.Header>
            <Card.Title>Waste Analysis</Card.Title>
            <Card.Description>Waste metrics by category</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="space-y-6">
              <div>
                <div class="text-sm font-medium">Total Waste Value</div>
                <div class="text-3xl font-bold mt-1">
                  ${wasteRatios.reduce((sum, item) => sum + item.waste, 0).toFixed(2)}
                </div>
                <div class="text-xs text-green-500 flex items-center mt-1">
                  -$18.50 from previous {dateRange}
                </div>
              </div>

              <div>
                <div class="text-sm font-medium">Average Waste Ratio</div>
                <div class="text-3xl font-bold mt-1">
                  {(
                    wasteRatios.reduce((sum, item) => sum + item.ratio, 0) / wasteRatios.length
                  ).toFixed(1)}%
                </div>
                <div class="text-xs text-muted-foreground mt-1">Target: ≤ 5%</div>
              </div>

              <div>
                <div class="text-sm font-medium">Highest Waste Category</div>
                <div class="text-3xl font-bold mt-1">Produce</div>
                <div class="text-xs text-red-500 flex items-center mt-1">
                  10% waste ratio (Target: ≤ 5%)
                </div>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      </div>

      <!-- Waste Ratio Table -->
      <Card.Root class="mt-6">
        <Card.Header>
          <Card.Title>Waste-to-Usage Detail</Card.Title>
          <Card.Description>Analysis and recommendations by category</Card.Description>
        </Card.Header>
        <Card.Content>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Category</Table.Head>
                <Table.Head class="text-right">Usage ($)</Table.Head>
                <Table.Head class="text-right">Waste ($)</Table.Head>
                <Table.Head class="text-right">Waste Ratio</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Recommendation</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {#each wasteRatios as item}
                <Table.Row>
                  <Table.Cell class="font-medium">{item.category}</Table.Cell>
                  <Table.Cell class="text-right">${item.usage.toFixed(2)}</Table.Cell>
                  <Table.Cell class="text-right">${item.waste.toFixed(2)}</Table.Cell>
                  <Table.Cell class="text-right">{item.ratio.toFixed(1)}%</Table.Cell>
                  <Table.Cell>
                    {#if item.ratio <= 3}
                      <Badge variant="default">Good</Badge>
                    {:else if item.ratio <= 5}
                      <Badge variant="outline">Acceptable</Badge>
                    {:else if item.ratio <= 8}
                      <Badge variant="secondary">Review</Badge>
                    {:else}
                      <Badge variant="destructive">Action Needed</Badge>
                    {/if}
                  </Table.Cell>
                  <Table.Cell>
                    {#if item.category === 'Produce'}
                      Adjust order frequency
                    {:else if item.category === 'Dairy'}
                      Review storage methods
                    {:else if item.ratio > 5}
                      Evaluate portion sizes
                    {:else}
                      Maintain current systems
                    {/if}
                  </Table.Cell>
                </Table.Row>
              {/each}
            </Table.Body>
          </Table.Root>
        </Card.Content>
      </Card.Root>

      <!-- Waste Reduction Plan -->
      <Card.Root class="mt-6">
        <Card.Header>
          <Card.Title>Waste Reduction Plan</Card.Title>
          <Card.Description>Strategies to minimize waste across categories</Card.Description>
        </Card.Header>
        <Card.Content>
          <div class="space-y-4">
            <div class="p-4 bg-red-50 border border-red-100 rounded-md">
              <div class="flex">
                <AlertTriangle class="h-5 w-5 text-red-500 flex-shrink-0 mr-3 mt-0.5" />
                <div>
                  <h3 class="font-medium">Produce Waste Reduction (High Priority)</h3>
                  <p class="mt-1 text-sm">
                    Produce waste ratio (10%) is double the target threshold.
                  </p>
                  <ul class="list-disc pl-5 mt-2 text-sm">
                    <li>Implement tiered ordering: 75% base order + 25% mid-week supplemental</li>
                    <li>Review storage conditions - current temp averaging 2°C above ideal</li>
                    <li>Implement "first in, first out" training refresher for staff</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="p-4 bg-yellow-50 border border-yellow-100 rounded-md">
              <div class="flex">
                <Circle class="h-5 w-5 text-yellow-500 flex-shrink-0 mr-3 mt-0.5" />
                <div>
                  <h3 class="font-medium">Dairy & Proteins Management (Medium Priority)</h3>
                  <p class="mt-1 text-sm">
                    Both categories are at target threshold (5%) but could be improved.
                  </p>
                  <ul class="list-disc pl-5 mt-2 text-sm">
                    <li>Review portion control standards against actual usage</li>
                    <li>Evaluate freezing protocols for proteins approaching expiry</li>
                    <li>Implement standard recipes for dairy-heavy items to reduce variability</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="p-4 bg-green-50 border border-green-100 rounded-md">
              <div class="flex">
                <Circle class="h-5 w-5 text-green-500 flex-shrink-0 mr-3 mt-0.5" />
                <div>
                  <h3 class="font-medium">Dry Goods & Frozen (Maintain)</h3>
                  <p class="mt-1 text-sm">Both categories performing well with waste ratios ≤ 3%</p>
                  <ul class="list-disc pl-5 mt-2 text-sm">
                    <li>Continue current inventory management practices</li>
                    <li>Consider as model for other categories</li>
                    <li>Document processes for training new staff</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card.Content>
        <Card.Footer class="flex justify-between">
          <Button.Root variant="secondary">View Historical Waste Data</Button.Root>
          <Button.Root>Implement Waste Reduction Plan</Button.Root>
        </Card.Footer>
      </Card.Root>
    </Tabs.Content>
  </Tabs.Root>
</div>

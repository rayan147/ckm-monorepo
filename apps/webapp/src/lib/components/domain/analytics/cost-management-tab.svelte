<!-- analytics/CostManagementTab.svelte -->
<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import * as Table from '$lib/components/ui/table/index.js';
  import { Progress } from '$lib/components/ui/progress/index.js';
  import * as Button from '$lib/components/ui/button/index.js';
  import * as Alert from '$lib/components/ui/alert/index.js';
  import { Circle, AlertTriangle } from 'lucide-svelte';
  import { LayerCake, Svg } from 'layercake';
  import * as d3 from 'd3';
  import { default as Line } from './charts/line.svelte';
  import { default as Bar } from './charts/bar.svelte';
  import { default as Pie } from './charts/pie.svelte';

  // Props
  let { dateRange, selectedFacility, isLoading } = $props();

  // Cost tracking subtab state
  let costTab = $state('food-cost');

  // Mock data for food cost tracking
  let recipeCostHistory = $state([
    { date: new Date('2025-03-15'), cost: 238.5 },
    { date: new Date('2025-03-22'), cost: 245.75 },
    { date: new Date('2025-03-29'), cost: 251.2 },
    { date: new Date('2025-04-05'), cost: 259.8 },
    { date: new Date('2025-04-12'), cost: 256.4 }
  ]);

  let foodCostPercentages = $state([
    { name: 'Grilled Salmon', costPercentage: 35.2, target: 32, salesPrice: 22.95, foodCost: 8.08 },
    {
      name: 'Chicken Parmesan',
      costPercentage: 28.7,
      target: 30,
      salesPrice: 18.95,
      foodCost: 5.44
    },
    { name: 'Ribeye Steak', costPercentage: 42.1, target: 35, salesPrice: 32.95, foodCost: 13.87 },
    {
      name: 'Mushroom Risotto',
      costPercentage: 24.3,
      target: 28,
      salesPrice: 16.95,
      foodCost: 4.12
    },
    { name: 'Caesar Salad', costPercentage: 18.5, target: 25, salesPrice: 10.95, foodCost: 2.03 }
  ]);

  // Sort by variance from target
  let sortedFoodCost = $derived(
    [...foodCostPercentages].sort(
      (a, b) => Math.abs(b.costPercentage - b.target) - Math.abs(a.costPercentage - a.target)
    )
  );

  // Mock ingredient price trends
  let ingredientPriceTrends = $state([
    {
      name: 'Salmon Fillet',
      prices: [
        { date: new Date('2024-12-15'), price: 12.5 },
        { date: new Date('2025-01-15'), price: 13.25 },
        { date: new Date('2025-02-15'), price: 13.75 },
        { date: new Date('2025-03-15'), price: 14.5 },
        { date: new Date('2025-04-15'), price: 15.25 }
      ],
      currentPrice: 15.25,
      previousPrice: 14.5,
      percentChange: 5.2
    },
    {
      name: 'Chicken Breast',
      prices: [
        { date: new Date('2024-12-15'), price: 5.25 },
        { date: new Date('2025-01-15'), price: 5.15 },
        { date: new Date('2025-02-15'), price: 5.4 },
        { date: new Date('2025-03-15'), price: 5.35 },
        { date: new Date('2025-04-15'), price: 5.75 }
      ],
      currentPrice: 5.75,
      previousPrice: 5.35,
      percentChange: 7.5
    },
    {
      name: 'Heavy Cream',
      prices: [
        { date: new Date('2024-12-15'), price: 3.75 },
        { date: new Date('2025-01-15'), price: 3.8 },
        { date: new Date('2025-02-15'), price: 3.95 },
        { date: new Date('2025-03-15'), price: 4.1 },
        { date: new Date('2025-04-15'), price: 4.25 }
      ],
      currentPrice: 4.25,
      previousPrice: 4.1,
      percentChange: 3.7
    }
  ]);

  // Mock waste analysis data
  let wasteByCategory = $state([
    { category: 'Spoilage', value: 1245, percentage: 42 },
    { category: 'Overproduction', value: 830, percentage: 28 },
    { category: 'Cooking Errors', value: 530, percentage: 18 },
    { category: 'Storage Issues', value: 355, percentage: 12 }
  ]);

  let wasteByIngredient = $state([
    { name: 'Fresh Produce', value: 760, percentage: 25.7 },
    { name: 'Dairy', value: 620, percentage: 21 },
    { name: 'Protein', value: 925, percentage: 31.3 },
    { name: 'Grains & Starches', value: 390, percentage: 13.2 },
    { name: 'Other', value: 260, percentage: 8.8 }
  ]);

  let leftoverTrends = $state([
    { date: new Date('2025-04-09'), value: 23 },
    { date: new Date('2025-04-10'), value: 19 },
    { date: new Date('2025-04-11'), value: 25 },
    { date: new Date('2025-04-12'), value: 17 },
    { date: new Date('2025-04-13'), value: 24 },
    { date: new Date('2025-04-14'), value: 20 },
    { date: new Date('2025-04-15'), value: 18 }
  ]);

  let topWastedItems = $state([
    { name: 'Mixed Salad Greens', value: 215, reason: 'Spoilage' },
    { name: 'Grilled Chicken', value: 185, reason: 'Overproduction' },
    { name: 'Fresh Bread', value: 165, reason: 'Overproduction' },
    { name: 'Sliced Tomatoes', value: 120, reason: 'Spoilage' },
    { name: 'Rice Pilaf', value: 110, reason: 'Overproduction' }
  ]);

  // Insights based on data
  let costInsights = $state([
    {
      title: 'Food Cost Alert',
      description: 'Ribeye Steak exceeds target food cost percentage by 7.1%',
      severity: 'warning'
    },
    {
      title: 'Price Increase Alert',
      description: 'Chicken Breast prices increased 7.5% over the past month',
      severity: 'warning'
    },
    {
      title: 'Waste Reduction Opportunity',
      description: 'Overproduction accounts for 28% of waste - review production schedules',
      severity: 'info'
    }
  ]);
</script>

<div class="space-y-6">
  <!-- Cost Management Header -->
  <div>
    <h2 class="text-3xl font-bold">Cost Management Analytics</h2>
    <p class="text-muted-foreground">Track, analyze and optimize your food costs and waste</p>
  </div>

  <!-- Insights Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each costInsights as insight}
      <Alert.Root variant={insight.severity === 'warning' ? 'destructive' : 'default'}>
        {#if insight.severity === 'warning'}
          <AlertTriangle class="h-4 w-4" />
        {:else}
          <Circle class="h-4 w-4" />
        {/if}
        <Alert.Title>{insight.title}</Alert.Title>
        <Alert.Description>{insight.description}</Alert.Description>
      </Alert.Root>
    {/each}
  </div>

  <!-- Cost Tracking Tabs -->
  <Tabs.Root value={costTab} onValueChange={(value) => (costTab = value)} class="w-full">
    <Tabs.List>
      <Tabs.Trigger value="food-cost">Food Cost Tracking</Tabs.Trigger>
      <Tabs.Trigger value="price-trends">Ingredient Price Trends</Tabs.Trigger>
      <Tabs.Trigger value="waste-analysis">Waste Analysis</Tabs.Trigger>
    </Tabs.List>

    <!-- Food Cost Tracking Tab -->
    <Tabs.Content value="food-cost" class="pt-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recipe Cost History -->
        <Card.Root class="lg:col-span-2">
          <Card.Header>
            <Card.Title>Recipe Version Cost History</Card.Title>
            <Card.Description>Track costs across recipe versions over time</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="h-72">
              <LayerCake
                x={(d) => d.date}
                y={(d) => d.cost}
                yDomain={[0, null]}
                xScale={d3.scaleTime()}
                padding={{ top: 20, right: 10, bottom: 20, left: 50 }}
                data={recipeCostHistory}
              >
                <Svg>
                  <Line />
                </Svg>
              </LayerCake>
            </div>
          </Card.Content>
        </Card.Root>

        <!-- Cost Percentage vs Target -->
        <Card.Root>
          <Card.Header>
            <Card.Title>Food Cost Percentage</Card.Title>
            <Card.Description>Current vs target percentage</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="space-y-5">
              {#each sortedFoodCost.slice(0, 4) as item}
                <div>
                  <div class="flex justify-between items-center mb-1">
                    <div class="font-medium text-sm">{item.name}</div>
                    <div class="text-sm">
                      {item.costPercentage}% / {item.target}%
                    </div>
                  </div>
                  <div class="relative pt-1">
                    <Progress
                      value={item.costPercentage}
                      max={Math.max(item.target * 1.5, item.costPercentage)}
                      class={item.costPercentage > item.target ? 'bg-red-200' : 'bg-gray-200'}
                    >
                      <Progress
                        style={`transform: translateX(-${100 - (item.costPercentage / Math.max(item.target * 1.5, item.costPercentage)) * 100}%)`}
                        class={item.costPercentage > item.target ? 'bg-red-500' : 'bg-green-500'}
                      />
                    </Progress>
                    <!-- Target marker -->
                    <div
                      class="absolute h-4 w-0.5 bg-gray-800 top-0"
                      style={`left: ${(item.target / Math.max(item.target * 1.5, item.costPercentage)) * 100}%`}
                    ></div>
                  </div>
                </div>
              {/each}
            </div>
          </Card.Content>
          <Card.Footer>
            <Button.Root variant="outline" class="w-full">View All</Button.Root>
          </Card.Footer>
        </Card.Root>
      </div>

      <!-- Food Cost Table -->
      <Card.Root class="mt-6">
        <Card.Header>
          <Card.Title>Menu Item Cost Analysis</Card.Title>
          <Card.Description>Detailed breakdown of food costs by menu item</Card.Description>
        </Card.Header>
        <Card.Content>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Menu Item</Table.Head>
                <Table.Head class="text-right">Sales Price</Table.Head>
                <Table.Head class="text-right">Food Cost</Table.Head>
                <Table.Head class="text-right">Cost %</Table.Head>
                <Table.Head class="text-right">Target %</Table.Head>
                <Table.Head class="text-right">Variance</Table.Head>
                <Table.Head>Status</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {#each foodCostPercentages as item}
                <Table.Row>
                  <Table.Cell class="font-medium">{item.name}</Table.Cell>
                  <Table.Cell class="text-right">${item.salesPrice.toFixed(2)}</Table.Cell>
                  <Table.Cell class="text-right">${item.foodCost.toFixed(2)}</Table.Cell>
                  <Table.Cell class="text-right">{item.costPercentage.toFixed(1)}%</Table.Cell>
                  <Table.Cell class="text-right">{item.target}%</Table.Cell>
                  <Table.Cell
                    class="text-right {item.costPercentage > item.target
                      ? 'text-green-500'
                      : 'text-red-500'}"
                  >
                    {(item.costPercentage - item.target).toFixed(1)}%
                  </Table.Cell>
                  <Table.Cell>
                    {#if item.costPercentage > item.target + 5}
                      <span
                        class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"
                      >
                        Critical
                      </span>
                    {:else if item.costPercentage > item.target}
                      <span
                        class="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"
                      >
                        Warning
                      </span>
                    {:else}
                      <span
                        class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
                      >
                        On Target
                      </span>
                    {/if}
                  </Table.Cell>
                </Table.Row>
              {/each}
            </Table.Body>
          </Table.Root>
        </Card.Content>
        <Card.Footer class="flex justify-between">
          <Button.Root variant="secondary">Export Data</Button.Root>
          <Button.Root>Generate Cost Report</Button.Root>
        </Card.Footer>
      </Card.Root>
    </Tabs.Content>

    <!-- Ingredient Price Trends Tab -->
    <Tabs.Content value="price-trends" class="pt-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Price Trend Chart -->
        <Card.Root class="lg:col-span-2">
          <Card.Header>
            <Card.Title>Ingredient Price Trends</Card.Title>
            <Card.Description>Track price changes over time for key ingredients</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="h-80">
              {#each ingredientPriceTrends as ingredient, i}
                {#if i === 0}
                  <LayerCake
                    x={(d) => d.date}
                    y={(d) => d.price}
                    yDomain={[0, null]}
                    xScale={d3.scaleTime()}
                    padding={{ top: 20, right: 10, bottom: 20, left: 50 }}
                    data={ingredient.prices}
                  >
                    <Svg>
                      <Line color="#4f46e5" />
                    </Svg>
                  </LayerCake>
                {/if}
              {/each}
            </div>
          </Card.Content>
        </Card.Root>

        <!-- Price Change Summary -->
        <Card.Root>
          <Card.Header>
            <Card.Title>Top Price Changes</Card.Title>
            <Card.Description>Ingredients with highest price fluctuations</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="space-y-4">
              {#each ingredientPriceTrends as ingredient}
                <div class="border-b pb-3">
                  <div class="flex justify-between items-center">
                    <span class="font-medium">{ingredient.name}</span>
                    <span class={ingredient.percentChange > 0 ? 'text-red-500' : 'text-green-500'}>
                      {ingredient.percentChange > 0 ? '+' : ''}{ingredient.percentChange}%
                    </span>
                  </div>
                  <div class="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>Current: ${ingredient.currentPrice.toFixed(2)}/unit</span>
                    <span>Previous: ${ingredient.previousPrice.toFixed(2)}/unit</span>
                  </div>
                </div>
              {/each}
            </div>
          </Card.Content>
          <Card.Footer>
            <Button.Root variant="outline" class="w-full">View Price History</Button.Root>
          </Card.Footer>
        </Card.Root>
      </div>

      <!-- Price Alert Recommendations -->
      <Card.Root class="mt-6">
        <Card.Header>
          <Card.Title>Price Alert Recommendations</Card.Title>
          <Card.Description>Actions to mitigate price increases</Card.Description>
        </Card.Header>
        <Card.Content>
          <div class="space-y-4">
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <AlertTriangle class="h-5 w-5 text-yellow-400" />
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-yellow-800">Chicken Breast Price Alert</h3>
                  <div class="mt-2 text-sm text-yellow-700">
                    <p>Price increased by 7.5% this month. Consider these actions:</p>
                    <ul class="list-disc pl-5 mt-1">
                      <li>Lock in contract pricing with preferred vendor</li>
                      <li>Adjust portion sizes on affected menu items</li>
                      <li>Explore alternative protein options for certain dishes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <AlertTriangle class="h-5 w-5 text-yellow-400" />
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-yellow-800">Salmon Fillet Price Trend</h3>
                  <div class="mt-2 text-sm text-yellow-700">
                    <p>
                      Price increased by 5.2% this month, continuing a 5-month upward trend.
                      Consider these actions:
                    </p>
                    <ul class="list-disc pl-5 mt-1">
                      <li>Evaluate menu price adjustment for salmon dishes</li>
                      <li>Consider frozen product or alternative sourcing</li>
                      <li>Review portion sizes to maintain target food cost %</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card.Root>
    </Tabs.Content>

    <!-- Waste Analysis Tab -->
    <Tabs.Content value="waste-analysis" class="pt-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Waste by Category -->
        <Card.Root>
          <Card.Header>
            <Card.Title>Waste by Cause</Card.Title>
            <Card.Description>Breakdown of waste sources</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="h-72">
              <LayerCake
                data={wasteByCategory}
                x={(d) => d.category}
                y={(d) => d.value}
                padding={{ top: 20, right: 10, bottom: 40, left: 40 }}
              >
                <Svg>
                  <Bar
                    fill={(d) => {
                      const colors = ['#ef4444', '#f59e0b', '#3b82f6', '#6366f1'];
                      const index = wasteByCategory.findIndex(
                        (item) => item.category === d.category
                      );
                      return colors[index % colors.length];
                    }}
                  />
                </Svg>
              </LayerCake>
            </div>
          </Card.Content>
        </Card.Root>

        <!-- Waste by Ingredient Category -->
        <Card.Root>
          <Card.Header>
            <Card.Title>Waste by Food Category</Card.Title>
            <Card.Description>Food waste by ingredient type</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="h-72">
              <LayerCake
                data={wasteByIngredient}
                r={(d) => d.value}
                padding={{ top: 20, right: 10, bottom: 20, left: 10 }}
              >
                <Svg>
                  <Pie dataKey="name" />
                </Svg>
              </LayerCake>
            </div>
          </Card.Content>
        </Card.Root>

        <!-- Leftover Trends -->
        <Card.Root>
          <Card.Header>
            <Card.Title>Daily Leftover Trends</Card.Title>
            <Card.Description>Past 7 days of recorded leftovers</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="h-72">
              <LayerCake
                x={(d) => d.date}
                y={(d) => d.value}
                yDomain={[0, null]}
                xScale={d3.scaleTime()}
                padding={{ top: 20, right: 10, bottom: 20, left: 40 }}
                data={leftoverTrends}
              >
                <Svg>
                  <Line color="#22c55e" />
                </Svg>
              </LayerCake>
            </div>
          </Card.Content>
        </Card.Root>
      </div>

      <!-- Top Wasted Items -->
      <Card.Root class="mt-6">
        <Card.Header>
          <Card.Title>Top Wasted Items</Card.Title>
          <Card.Description>Items with highest waste value</Card.Description>
        </Card.Header>
        <Card.Content>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Item</Table.Head>
                <Table.Head>Primary Waste Reason</Table.Head>
                <Table.Head class="text-right">Waste Value</Table.Head>
                <Table.Head>Recommended Action</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {#each topWastedItems as item}
                <Table.Row>
                  <Table.Cell class="font-medium">{item.name}</Table.Cell>
                  <Table.Cell>{item.reason}</Table.Cell>
                  <Table.Cell class="text-right">${item.value.toFixed(2)}</Table.Cell>
                  <Table.Cell>
                    {#if item.reason === 'Spoilage'}
                      Adjust order frequency and storage
                    {:else if item.reason === 'Overproduction'}
                      Review batch sizing and forecasting
                    {:else}
                      Investigate process improvements
                    {/if}
                  </Table.Cell>
                </Table.Row>
              {/each}
            </Table.Body>
          </Table.Root>
        </Card.Content>
        <Card.Footer class="flex justify-between">
          <Button.Root variant="secondary">View Complete Waste Report</Button.Root>
          <Button.Root>Generate Waste Reduction Plan</Button.Root>
        </Card.Footer>
      </Card.Root>
    </Tabs.Content>
  </Tabs.Root>
</div>

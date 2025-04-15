<!-- analytics/DietaryComplianceTab.svelte -->
<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Table from '$lib/components/ui/table/index.js';
  import { Progress } from '$lib/components/ui/progress/index.js';
  import * as Button from '$lib/components/ui/button/index.js';
  import * as Alert from '$lib/components/ui/alert/index.js';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Circle, AlertTriangle, CheckCircle } from 'lucide-svelte';
  import { LayerCake, Svg } from 'layercake';
  import * as d3 from 'd3';
  import { default as Line } from './charts/line.svelte';
  import { default as Bar } from './charts/bar.svelte';
  import { default as Pie } from './charts/pie.svelte';

  // Props
  let { dateRange, selectedFacility, isLoading } = $props();

  // Local tab state
  let dietaryTab = $state('compliance-rates');

  // Mock data for dietary compliance
  let complianceRates = $state([
    { name: 'Gluten-Free', compliance: 96.5, incidents: 2, mealsServed: 58 },
    { name: 'Diabetic', compliance: 98.2, incidents: 1, mealsServed: 62 },
    { name: 'Low Sodium', compliance: 93.8, incidents: 4, mealsServed: 65 },
    { name: 'Cardiac', compliance: 97.4, incidents: 2, mealsServed: 78 },
    { name: 'Renal', compliance: 95.2, incidents: 3, mealsServed: 63 },
    { name: 'Texture Modified', compliance: 99.1, incidents: 1, mealsServed: 112 },
    { name: 'Allergen-Free', compliance: 99.8, incidents: 0, mealsServed: 43 },
    { name: 'Vegetarian', compliance: 98.9, incidents: 1, mealsServed: 92 },
    { name: 'Kosher', compliance: 100, incidents: 0, mealsServed: 18 }
  ]);

  // Sort by compliance rates (ascending)
  let sortedCompliance = $derived([...complianceRates].sort((a, b) => a.compliance - b.compliance));

  // Track compliance over time
  let complianceTimeline = $state([
    { date: new Date('2025-03-15'), compliance: 94.2 },
    { date: new Date('2025-03-22'), compliance: 95.8 },
    { date: new Date('2025-03-29'), compliance: 96.3 },
    { date: new Date('2025-04-05'), compliance: 97.1 },
    { date: new Date('2025-04-12'), compliance: 97.9 }
  ]);

  // Nutritional compliance
  let nutritionalMetrics = $state([
    { nutrient: 'Calories', target: 2000, actual: 1920, compliance: 96.0 },
    { nutrient: 'Protein', target: 75, actual: 72, compliance: 96.0 },
    { nutrient: 'Sodium', target: 2300, actual: 2450, compliance: 93.5 },
    { nutrient: 'Fiber', target: 25, actual: 21, compliance: 84.0 },
    { nutrient: 'Potassium', target: 3500, actual: 3250, compliance: 92.9 }
  ]);

  // Recent meal fulfillment stats
  let mealFulfillment = $state([
    { unit: 'Floor 3', total: 48, onTime: 45, latePercent: 6.3, avgDelay: 5 },
    { unit: 'Floor 2', total: 35, onTime: 33, latePercent: 5.7, avgDelay: 4 },
    { unit: 'Floor 4', total: 55, onTime: 49, latePercent: 10.9, avgDelay: 7 },
    { unit: 'Floor 1', total: 42, onTime: 40, latePercent: 4.8, avgDelay: 3 }
  ]);

  // Recent dietary compliance incidents
  let recentIncidents = $state([
    {
      id: 'INC-2345',
      date: 'Apr 15, 2025',
      patientId: 'P-4872',
      diet: 'Gluten-Free',
      issue: 'Meal contained bread with wheat flour',
      outcome: 'Meal replaced, no adverse reaction',
      severity: 'Medium'
    },
    {
      id: 'INC-2344',
      date: 'Apr 14, 2025',
      patientId: 'P-5136',
      diet: 'Low Sodium',
      issue: 'Soup exceeded sodium limits (2800mg vs 2300mg limit)',
      outcome: 'Meal replaced, no adverse reaction',
      severity: 'Low'
    },
    {
      id: 'INC-2342',
      date: 'Apr 13, 2025',
      patientId: 'P-4991',
      diet: 'Renal',
      issue: 'Potassium levels in meal exceeded limits',
      outcome: 'Meal replaced, no adverse reaction',
      severity: 'Medium'
    }
  ]);

  // HACCP checks related to dietary compliance
  let haccpCompliance = $state({
    totalChecks: 458,
    completed: 451,
    complianceRate: 98.5,
    criticalIssues: 2,
    topIssues: [
      'Temperature control for allergen-free meals',
      'Cross-contamination prevention protocols',
      'Modified texture verification steps'
    ]
  });

  // Nutritional alerts
  let nutritionalAlerts = $state([
    {
      title: 'Sodium Target Alert',
      description: 'Average sodium content exceeds target by 6.5% in Low Sodium diets',
      severity: 'warning'
    },
    {
      title: 'Fiber Content Alert',
      description: 'Fiber content is 16% below target across all meal plans',
      severity: 'warning'
    },
    {
      title: 'Delivery Time Alert',
      description: 'Floor 4 has 10.9% late meal deliveries, exceeding 10% threshold',
      severity: 'warning'
    }
  ]);
</script>

<div class="space-y-6">
  <!-- Dietary Compliance Header -->
  <div>
    <h2 class="text-3xl font-bold">Dietary Compliance Reporting</h2>
    <p class="text-muted-foreground">
      Monitor compliance with dietary restrictions and nutritional guidelines
    </p>
  </div>

  <!-- Alerts Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each nutritionalAlerts as alert}
      <Alert.Root variant={alert.severity === 'warning' ? 'destructive' : 'default'}>
        {#if alert.severity === 'warning'}
          <AlertTriangle class="h-4 w-4" />
        {:else}
          <Circle class="h-4 w-4" />
        {/if}
        <Alert.Title>{alert.title}</Alert.Title>
        <Alert.Description>{alert.description}</Alert.Description>
      </Alert.Root>
    {/each}
  </div>

  <!-- Dietary Compliance Tabs -->
  <Tabs.Root value={dietaryTab} onValueChange={(value) => (dietaryTab = value)} class="w-full">
    <Tabs.List>
      <Tabs.Trigger value="compliance-rates">Compliance Rates</Tabs.Trigger>
      <Tabs.Trigger value="nutritional-analysis">Nutritional Analysis</Tabs.Trigger>
      <Tabs.Trigger value="meal-delivery">Meal Delivery</Tabs.Trigger>
      <Tabs.Trigger value="haccp-checks">HACCP Compliance</Tabs.Trigger>
    </Tabs.List>

    <!-- Compliance Rates Tab -->
    <Tabs.Content value="compliance-rates" class="pt-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Compliance Timeline -->
        <Card.Root class="lg:col-span-2">
          <Card.Header>
            <Card.Title>Dietary Compliance Trend</Card.Title>
            <Card.Description>Overall compliance rate over time</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="h-72">
              <LayerCake
                x={(d) => d.date}
                y={(d) => d.compliance}
                yDomain={[90, 100]}
                xScale={d3.scaleTime()}
                padding={{ top: 20, right: 10, bottom: 20, left: 50 }}
                data={complianceTimeline}
              >
                <Svg>
                  <Line color="#4f46e5" />
                </Svg>
              </LayerCake>
            </div>
          </Card.Content>
        </Card.Root>

        <!-- Compliance Overview Summary -->
        <Card.Root>
          <Card.Header>
            <Card.Title>Compliance Overview</Card.Title>
            <Card.Description>Key compliance metrics</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="space-y-6">
              <div>
                <div class="text-sm font-medium">Overall Compliance Rate</div>
                <div class="text-3xl font-bold mt-1">97.9%</div>
                <div class="text-sm text-green-500 flex items-center mt-1">
                  +0.8% from previous {dateRange}
                </div>
              </div>

              <div>
                <div class="text-sm font-medium">Total Meals Served</div>
                <div class="text-3xl font-bold mt-1">591</div>
              </div>

              <div>
                <div class="text-sm font-medium">Non-Compliance Incidents</div>
                <div class="text-3xl font-bold mt-1">14</div>
                <div class="text-sm text-green-500 flex items-center mt-1">
                  -3 from previous {dateRange}
                </div>
              </div>

              <div>
                <div class="text-sm font-medium">Incident Resolution Time</div>
                <div class="text-3xl font-bold mt-1">12.4 min</div>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      </div>

      <!-- Compliance by Diet Type -->
      <Card.Root class="mt-6">
        <Card.Header>
          <Card.Title>Compliance by Diet Type</Card.Title>
          <Card.Description>Detailed compliance rates for each dietary restriction</Card.Description
          >
        </Card.Header>
        <Card.Content>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Diet Type</Table.Head>
                <Table.Head class="text-right">Meals Served</Table.Head>
                <Table.Head class="text-right">Compliance Rate</Table.Head>
                <Table.Head class="text-right">Incidents</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Action</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {#each complianceRates as diet}
                <Table.Row>
                  <Table.Cell class="font-medium">{diet.name}</Table.Cell>
                  <Table.Cell class="text-right">{diet.mealsServed}</Table.Cell>
                  <Table.Cell class="text-right">{diet.compliance.toFixed(1)}%</Table.Cell>
                  <Table.Cell class="text-right">{diet.incidents}</Table.Cell>
                  <Table.Cell>
                    {#if diet.compliance < 95}
                      <Badge variant="destructive">At Risk</Badge>
                    {:else if diet.compliance < 98}
                      <Badge variant="outline">Monitor</Badge>
                    {:else}
                      <Badge variant="default">Compliant</Badge>
                    {/if}
                  </Table.Cell>
                  <Table.Cell>
                    <Button.Root variant="ghost" size="sm">Details</Button.Root>
                  </Table.Cell>
                </Table.Row>
              {/each}
            </Table.Body>
          </Table.Root>
        </Card.Content>
        <Card.Footer class="flex justify-between">
          <Button.Root variant="secondary">Export Data</Button.Root>
          <Button.Root>Generate Compliance Report</Button.Root>
        </Card.Footer>
      </Card.Root>

      <!-- Recent Compliance Incidents -->
      <Card.Root class="mt-6">
        <Card.Header>
          <Card.Title>Recent Compliance Incidents</Card.Title>
          <Card.Description>Details of recent diet compliance issues</Card.Description>
        </Card.Header>
        <Card.Content>
          <div class="space-y-4">
            {#each recentIncidents as incident}
              <div class="border rounded-md p-4">
                <div class="flex items-start justify-between">
                  <div>
                    <div class="flex items-center">
                      <span class="font-medium mr-2">Incident #{incident.id}</span>
                      <Badge
                        variant={incident.severity === 'High'
                          ? 'destructive'
                          : incident.severity === 'Medium'
                            ? 'default'
                            : 'outline'}
                      >
                        {incident.severity} Sev
                      </Badge>
                    </div>
                    <p class="text-sm text-muted-foreground mt-1">
                      {incident.date} • Patient #{incident.patientId}
                    </p>
                  </div>
                  <Badge variant="outline">{incident.diet}</Badge>
                </div>
                <p class="mt-3">{incident.issue}</p>
                <div class="mt-2 text-sm">
                  <span class="font-medium">Outcome:</span>
                  {incident.outcome}
                </div>
              </div>
            {/each}
          </div>
        </Card.Content>
      </Card.Root>
    </Tabs.Content>

    <!-- Nutritional Analysis Tab -->
    <Tabs.Content value="nutritional-analysis" class="pt-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Nutritional Compliance Chart -->
        <Card.Root class="lg:col-span-2">
          <Card.Header>
            <Card.Title>Nutritional Target Achievement</Card.Title>
            <Card.Description>Actual vs. target values for key nutrients</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="h-80">
              <LayerCake
                data={nutritionalMetrics}
                x={(d) => d.nutrient}
                y={(d) => d.compliance}
                yDomain={[0, 100]}
                padding={{ top: 20, right: 10, bottom: 30, left: 50 }}
              >
                <Svg>
                  <Bar
                    fill={(d) => {
                      return d.compliance >= 95
                        ? '#22c55e'
                        : d.compliance >= 90
                          ? '#f59e0b'
                          : '#ef4444';
                    }}
                  />
                </Svg>
              </LayerCake>
            </div>
          </Card.Content>
        </Card.Root>

        <!-- Nutritional Metrics -->
        <Card.Root>
          <Card.Header>
            <Card.Title>Nutrient Guidelines</Card.Title>
            <Card.Description>Standard targets vs. actual delivery</Card.Description>
          </Card.Header>
          <Card.Content class="space-y-4">
            {#each nutritionalMetrics as metric}
              <div>
                <div class="flex justify-between items-center mb-1">
                  <div class="font-medium">{metric.nutrient}</div>
                  <div class="text-sm">
                    Target: {metric.target} • Actual: {metric.actual}
                  </div>
                </div>
                <div class="relative pt-1">
                  <Progress value={metric.compliance} max={100} class="bg-gray-200">
                    <Progress
                      style={`transform: translateX(-${100 - metric.compliance}%)`}
                      class={metric.compliance >= 95
                        ? 'bg-green-500'
                        : metric.compliance >= 90
                          ? 'bg-yellow-500'
                          : 'bg-red-500'}
                    />
                  </Progress>
                  <div class="flex justify-between text-xs mt-1">
                    <div>{metric.compliance}% of target</div>
                    <div>
                      {#if metric.compliance < 90}
                        <span class="text-red-500">Action needed</span>
                      {:else if metric.compliance < 95}
                        <span class="text-yellow-500">Monitor</span>
                      {:else}
                        <span class="text-green-500">Compliant</span>
                      {/if}
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </Card.Content>
        </Card.Root>
      </div>

      <!-- Nutritional Recommendations -->
      <Card.Root class="mt-6">
        <Card.Header>
          <Card.Title>Dietary Recommendations</Card.Title>
          <Card.Description>Suggested actions to improve nutritional compliance</Card.Description>
        </Card.Header>
        <Card.Content>
          <div class="space-y-4">
            <div class="p-4 bg-yellow-50 border border-yellow-100 rounded-md">
              <div class="flex">
                <AlertTriangle class="h-5 w-5 text-yellow-500 flex-shrink-0 mr-3 mt-0.5" />
                <div>
                  <h3 class="font-medium">Sodium Management</h3>
                  <p class="mt-1 text-sm">
                    Sodium content is 6.5% above target in low sodium diets. Review and adjust these
                    recipes:
                  </p>
                  <ul class="list-disc pl-5 mt-2 text-sm">
                    <li>Vegetable Soup (1240mg vs. target 900mg)</li>
                    <li>Chicken Stir Fry (860mg vs. target 780mg)</li>
                    <li>Herbed Rice Pilaf (680mg vs. target 550mg)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="p-4 bg-yellow-50 border border-yellow-100 rounded-md">
              <div class="flex">
                <AlertTriangle class="h-5 w-5 text-yellow-500 flex-shrink-0 mr-3 mt-0.5" />
                <div>
                  <h3 class="font-medium">Fiber Enhancement</h3>
                  <p class="mt-1 text-sm">
                    Fiber content is 16% below target across meal plans. Consider these
                    improvements:
                  </p>
                  <ul class="list-disc pl-5 mt-2 text-sm">
                    <li>Incorporate more whole grains in place of refined grains</li>
                    <li>Increase legume portions in appropriate diets</li>
                    <li>Add fiber-rich vegetable sides to standard meals</li>
                    <li>Include fruit with higher fiber content in snacks and desserts</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="p-4 bg-blue-50 border border-blue-100 rounded-md">
              <div class="flex">
                <CheckCircle class="h-5 w-5 text-blue-500 flex-shrink-0 mr-3 mt-0.5" />
                <div>
                  <h3 class="font-medium">Protein Targets</h3>
                  <p class="mt-1 text-sm">
                    Protein targets are being met at 96% compliance. Continue current portion sizing
                    and distribution strategies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card.Content>
        <Card.Footer>
          <Button.Root>Implement Recommendations</Button.Root>
        </Card.Footer>
      </Card.Root>
    </Tabs.Content>

    <!-- Meal Delivery Tab -->
    <Tabs.Content value="meal-delivery" class="pt-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Meal Delivery Status -->
        <Card.Root>
          <Card.Header>
            <Card.Title>Meal Delivery Performance</Card.Title>
            <Card.Description>On-time delivery rates by unit</Card.Description>
          </Card.Header>
          <Card.Content>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Unit</Table.Head>
                  <Table.Head class="text-right">Total Meals</Table.Head>
                  <Table.Head class="text-right">On-Time</Table.Head>
                  <Table.Head class="text-right">Late %</Table.Head>
                  <Table.Head class="text-right">Avg Delay (min)</Table.Head>
                  <Table.Head>Status</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {#each mealFulfillment as unit}
                  <Table.Row>
                    <Table.Cell class="font-medium">{unit.unit}</Table.Cell>
                    <Table.Cell class="text-right">{unit.total}</Table.Cell>
                    <Table.Cell class="text-right">{unit.onTime}</Table.Cell>
                    <Table.Cell class="text-right">{unit.latePercent.toFixed(1)}%</Table.Cell>
                    <Table.Cell class="text-right">{unit.avgDelay}</Table.Cell>
                    <Table.Cell>
                      {#if unit.latePercent > 10}
                        <Badge variant="destructive">Action Required</Badge>
                      {:else if unit.latePercent > 5}
                        <Badge variant="outline">Monitor</Badge>
                      {:else}
                        <Badge variant="default">Compliant</Badge>
                      {/if}
                    </Table.Cell>
                  </Table.Row>
                {/each}
              </Table.Body>
            </Table.Root>
          </Card.Content>
        </Card.Root>

        <!-- Special Diet Request Fulfillment -->
        <Card.Root>
          <Card.Header>
            <Card.Title>Special Diet Request Fulfillment</Card.Title>
            <Card.Description>Response times for special diet modifications</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="space-y-5">
              <div>
                <div class="flex justify-between items-center mb-2">
                  <div class="font-medium">Same-Day Requests</div>
                  <div class="text-sm">40 min avg. response time</div>
                </div>
                <Progress value={85} max={100} class="bg-gray-200">
                  <Progress style="transform: translateX(-15%)" class="bg-green-500" />
                </Progress>
                <div class="text-xs mt-1">85% fulfilled within SLA (target: 80%)</div>
              </div>

              <div>
                <div class="flex justify-between items-center mb-2">
                  <div class="font-medium">Advanced Requests</div>
                  <div class="text-sm">3.5 hr avg. response time</div>
                </div>
                <Progress value={97} max={100} class="bg-gray-200">
                  <Progress style="transform: translateX(-3%)" class="bg-green-500" />
                </Progress>
                <div class="text-xs mt-1">97% fulfilled within SLA (target: 95%)</div>
              </div>

              <div>
                <div class="flex justify-between items-center mb-2">
                  <div class="font-medium">Emergency Requests</div>
                  <div class="text-sm">18 min avg. response time</div>
                </div>
                <Progress value={92} max={100} class="bg-gray-200">
                  <Progress style="transform: translateX(-8%)" class="bg-green-500" />
                </Progress>
                <div class="text-xs mt-1">92% fulfilled within SLA (target: 90%)</div>
              </div>

              <div>
                <div class="flex justify-between items-center mb-2">
                  <div class="font-medium">Diet Change Accuracy</div>
                  <div class="text-sm">98.5% first-time correct</div>
                </div>
                <Progress value={98.5} max={100} class="bg-gray-200">
                  <Progress style="transform: translateX(-1.5%)" class="bg-green-500" />
                </Progress>
                <div class="text-xs mt-1">98.5% accurate (target: 98%)</div>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      </div>

      <!-- Fulfillment Improvement Recommendations -->
      <Card.Root class="mt-6">
        <Card.Header>
          <Card.Title>Service Improvement Recommendations</Card.Title>
          <Card.Description>Action items to enhance meal delivery performance</Card.Description>
        </Card.Header>
        <Card.Content>
          <div class="space-y-4">
            <div class="p-4 bg-yellow-50 border border-yellow-100 rounded-md">
              <div class="flex">
                <AlertTriangle class="h-5 w-5 text-yellow-500 flex-shrink-0 mr-3 mt-0.5" />
                <div>
                  <h3 class="font-medium">Floor 4 Delivery Delays</h3>
                  <p class="mt-1 text-sm">
                    Floor 4 has 10.9% late meal deliveries, exceeding the 10% threshold.
                  </p>
                  <ul class="list-disc pl-5 mt-2 text-sm">
                    <li>Review staffing levels during peak meal service times</li>
                    <li>Evaluate cart routing efficiency for Floor 4</li>
                    <li>Consider staggered meal delivery schedule to improve throughput</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="p-4 bg-blue-50 border border-blue-100 rounded-md">
              <div class="flex">
                <CheckCircle class="h-5 w-5 text-blue-500 flex-shrink-0 mr-3 mt-0.5" />
                <div>
                  <h3 class="font-medium">Same-Day Request Process Improvements</h3>
                  <p class="mt-1 text-sm">
                    Same-day request fulfillment is exceeding targets at 85% vs. 80% target.
                  </p>
                  <p class="mt-1 text-sm">
                    Continue the streamlined approval process implemented last month and maintain
                    current staffing levels for diet office.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card.Root>
    </Tabs.Content>

    <!-- HACCP Compliance Tab -->
    <Tabs.Content value="haccp-checks" class="pt-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- HACCP Compliance Overview -->
        <Card.Root>
          <Card.Header>
            <Card.Title>HACCP Compliance Summary</Card.Title>
            <Card.Description>Critical control point monitoring</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="space-y-6">
              <div>
                <div class="text-sm font-medium">Compliance Rate</div>
                <div class="text-3xl font-bold mt-1">{haccpCompliance.complianceRate}%</div>
                <div class="text-xs text-muted-foreground mt-1">
                  {haccpCompliance.completed} of {haccpCompliance.totalChecks} checks completed
                </div>
              </div>

              <div>
                <div class="text-sm font-medium">Critical Issues</div>
                <div class="text-3xl font-bold mt-1">{haccpCompliance.criticalIssues}</div>
                <div class="text-xs text-green-500 flex items-center mt-1">
                  -1 from previous {dateRange}
                </div>
              </div>

              <div>
                <div class="text-sm font-medium">Temperature Check Compliance</div>
                <div class="text-3xl font-bold mt-1">97.8%</div>
              </div>

              <div>
                <div class="text-sm font-medium">Allergen Control Compliance</div>
                <div class="text-3xl font-bold mt-1">99.2%</div>
              </div>
            </div>
          </Card.Content>
        </Card.Root>

        <!-- Top HACCP Issues -->
        <Card.Root class="lg:col-span-2">
          <Card.Header>
            <Card.Title>Top HACCP Compliance Issues</Card.Title>
            <Card.Description>Most frequently identified control point failures</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="space-y-4">
              {#each haccpCompliance.topIssues as issue, index}
                <div class="p-4 border rounded-md">
                  <div class="flex">
                    <div class="text-2xl font-bold text-gray-300 mr-4">{index + 1}</div>
                    <div>
                      <h3 class="font-medium">{issue}</h3>
                      <p class="text-sm text-muted-foreground mt-1">
                        {#if index === 0}
                          6 instances in the past 30 days
                        {:else if index === 1}
                          4 instances in the past 30 days
                        {:else}
                          2 instances in the past 30 days
                        {/if}
                      </p>

                      <div class="mt-3">
                        <Button.Root variant="outline" size="sm">View Detailed Report</Button.Root>
                      </div>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </Card.Content>
        </Card.Root>
      </div>

      <!-- HACCP Action Plan -->
      <Card.Root class="mt-6">
        <Card.Header>
          <Card.Title>HACCP & Diet Safety Action Plan</Card.Title>
          <Card.Description
            >Critical steps to ensure continued food safety compliance</Card.Description
          >
        </Card.Header>
        <Card.Content>
          <div class="space-y-4">
            <div class="p-4 border rounded-md">
              <h3 class="font-medium">Temperature Control for Special Diets</h3>
              <div class="mt-2 space-y-2">
                <div class="flex items-start">
                  <div
                    class="h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
                  >
                    <span class="text-xs">1</span>
                  </div>
                  <div>
                    <p class="font-medium">Staff Training Refresh</p>
                    <p class="text-sm text-muted-foreground">
                      Conduct refresher training on temperature monitoring for dietary-specific
                      holding equipment
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
                  >
                    <span class="text-xs">2</span>
                  </div>
                  <div>
                    <p class="font-medium">Equipment Calibration</p>
                    <p class="text-sm text-muted-foreground">
                      Schedule verification of temperature monitoring equipment calibration
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
                  >
                    <span class="text-xs">3</span>
                  </div>
                  <div>
                    <p class="font-medium">Automated Monitoring</p>
                    <p class="text-sm text-muted-foreground">
                      Implement digital temperature logging for special diet holding areas
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4 border rounded-md">
              <h3 class="font-medium">Cross-Contamination Prevention</h3>
              <div class="mt-2 space-y-2">
                <div class="flex items-start">
                  <div
                    class="h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
                  >
                    <span class="text-xs">1</span>
                  </div>
                  <div>
                    <p class="font-medium">Zone Verification</p>
                    <p class="text-sm text-muted-foreground">
                      Audit allergen-free preparation zone compliance
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
                  >
                    <span class="text-xs">2</span>
                  </div>
                  <div>
                    <p class="font-medium">Color-Coded Equipment</p>
                    <p class="text-sm text-muted-foreground">
                      Verify integrity of color-coding system for allergen-specific equipment
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
                  >
                    <span class="text-xs">3</span>
                  </div>
                  <div>
                    <p class="font-medium">Audit Schedule</p>
                    <p class="text-sm text-muted-foreground">
                      Implement surprise audits of allergen protocols during peak production
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card.Content>
        <Card.Footer class="flex justify-between">
          <Button.Root variant="secondary">Export HACCP Report</Button.Root>
          <Button.Root>Update HACCP Plan</Button.Root>
        </Card.Footer>
      </Card.Root>
    </Tabs.Content>
  </Tabs.Root>
</div>

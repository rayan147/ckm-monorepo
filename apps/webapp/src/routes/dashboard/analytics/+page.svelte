<!-- AnalyticsDashboard.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import * as Select from '$lib/components/ui/select/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Button from '$lib/components/ui/button/index.js';
  import * as Alert from '$lib/components/ui/alert/index.js';
  import * as Separator from '$lib/components/ui/separator/index.js';
  import { CircleAlert } from 'lucide-svelte';

  // Import tabs
  import CostManagementTab from '$lib/components/domain/analytics/cost-management-tab.svelte';
  import InventoryOptimizationTab from '$lib/components/domain/analytics/inventory-optimization-tab.svelte';
  import ProductionEfficiencyTab from '$lib/components/domain/analytics/production-efficiency-tab.svelte';
  import MenuPerformanceTab from '$lib/components/domain/analytics/menu-performance-tab.svelte';
  import ComplianceMonitoringTab from '$lib/components/domain/analytics/compliance-monitoring-tab.svelte';
  import DietaryComplianceTab from '$lib/components/domain/analytics/dietary-compliance-tab.svelte';
  import StaffProductivityTab from '$lib/components/domain/analytics/staff-productivity-tab.svelte';
  import SupplierPerformanceTab from '$lib/components/domain/analytics/supplier-performance-tab.svelte';
  import CustomerSatisfactionTab from '$lib/components/domain/analytics/customer-satisfaction-tab.svelte';

  // State management using Svelte 5 runes
  let activeTab = $state('cost-management');
  let dateRange = $state('week');
  let selectedFacility = $state('all');
  let isLoading = $state(false);

  // Mock data for facilities dropdown
  let facilities = $state([
    { value: 'all', label: 'All Facilities' },
    { value: 'facility1', label: 'Memorial Hospital' },
    { value: 'facility2', label: 'Riverside Care Center' },
    { value: 'facility3', label: 'Elite Catering Services' }
  ]);

  // Derived value for Select component
  let triggerFacilityContent = $derived(
    facilities.find((f) => f.value === selectedFacility)?.label ?? 'Select a facility'
  );

  // Mock data for date range dropdown
  let dateRanges = $state([
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ]);

  // Derived value for Select component
  let triggerDateContent = $derived(
    dateRanges.find((d) => d.value === dateRange)?.label ?? 'Select time period'
  );

  // Simulated alerts for dashboard
  let alerts = $state([
    {
      title: 'Critical Temperature Alert',
      description: 'Refrigerator #3 temperature above threshold (6.2°C)',
      type: 'critical',
      time: '15 minutes ago'
    },
    {
      title: 'Inventory Alert',
      description: '5 items below PAR level, requires immediate attention',
      type: 'warning',
      time: '2 hours ago'
    },
    {
      title: 'Dietary Compliance Alert',
      description: 'Meal plan for patient #4583 missing gluten-free options',
      type: 'critical',
      time: '1 hour ago'
    }
  ]);

  function updateData() {
    isLoading = true;

    // Simulate API call delay
    setTimeout(() => {
      isLoading = false;
    }, 800);
  }

  // Update data when filters change
  $effect(() => {
    if (dateRange || selectedFacility) {
      updateData();
    }
  });

  onMount(() => {
    // Initial data load
    updateData();
  });

  function handleFacilityChange(value: string) {
    selectedFacility = value;
  }

  function handleDateRangeChange(value: string) {
    dateRange = value;
  }
</script>

<div class="p-6 max-w-screen-2xl mx-auto space-y-6">
  <!-- Dashboard Header with Alerts -->
  <div class="flex flex-col lg:flex-row gap-6 items-start">
    <!-- Header -->
    <div class="flex-1">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 class="text-2xl font-bold">Analytics Dashboard</h1>
          <p class="text-muted-foreground">Comprehensive kitchen performance metrics</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Select.Root
            type="single"
            value={selectedFacility}
            onSelectedChange={(val) => handleFacilityChange(val as string)}
          >
            <Select.Trigger class="min-w-[180px]">
              {triggerFacilityContent}
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.GroupHeading>Facilities</Select.GroupHeading>
                {#each facilities as facility (facility.value)}
                  <Select.Item value={facility.value} label={facility.label}>
                    {facility.label}
                  </Select.Item>
                {/each}
              </Select.Group>
            </Select.Content>
          </Select.Root>

          <Select.Root
            type="single"
            value={dateRange}
            onSelectedChange={(val) => handleDateRangeChange(val as string)}
          >
            <Select.Trigger class="min-w-[180px]">
              {triggerDateContent}
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.GroupHeading>Time Period</Select.GroupHeading>
                {#each dateRanges as range (range.value)}
                  <Select.Item value={range.value} label={range.label}>
                    {range.label}
                  </Select.Item>
                {/each}
              </Select.Group>
            </Select.Content>
          </Select.Root>

          <Button.Root variant="outline" class="gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-download"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export
          </Button.Root>
        </div>
      </div>

      <!-- Critical Alerts Section -->
      <div class="space-y-3">
        <h2 class="text-lg font-semibold">Critical Alerts</h2>
        {#each alerts as alert}
          <Alert.Root variant={alert.type === 'critical' ? 'destructive' : 'default'}>
            <CircleAlert class="h-4 w-4" />
            <Alert.Title>{alert.title}</Alert.Title>
            <Alert.Description class="flex justify-between items-center">
              <span>{alert.description}</span>
              <span class="text-xs">{alert.time}</span>
            </Alert.Description>
          </Alert.Root>
        {/each}
      </div>
    </div>

    <!-- Summary KPIs -->
    <Card.Root class="w-full lg:w-80">
      <Card.Header>
        <Card.Title>Today's Summary</Card.Title>
        <Card.Description>Key kitchen metrics</Card.Description>
      </Card.Header>
      <Card.Content>
        <div class="space-y-4">
          <div>
            <div class="text-sm font-medium">Food Cost Ratio</div>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold">32.4%</span>
              <span class="text-sm text-red-500 flex items-center">
                +2.1%
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ml-1"><path d="m6 9 6-6 6 6" /><path d="m6 18 6-6 6 6" /></svg
                >
              </span>
            </div>
            <Separator.Root class="my-2" />
          </div>

          <div>
            <div class="text-sm font-medium">Compliance Rate</div>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold">94.8%</span>
              <span class="text-sm text-green-500 flex items-center">
                +1.3%
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ml-1"><path d="m6 9 6-6 6 6" /><path d="m6 18 6-6 6 6" /></svg
                >
              </span>
            </div>
            <Separator.Root class="my-2" />
          </div>

          <div>
            <div class="text-sm font-medium">Production Efficiency</div>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold">87.2%</span>
              <span class="text-sm text-green-500 flex items-center">
                +0.5%
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ml-1"><path d="m6 9 6-6 6 6" /><path d="m6 18 6-6 6 6" /></svg
                >
              </span>
            </div>
            <Separator.Root class="my-2" />
          </div>

          <div>
            <div class="text-sm font-medium">Wastage (% of Production)</div>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold">4.3%</span>
              <span class="text-sm text-red-500 flex items-center">
                +0.2%
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ml-1"><path d="m6 9 6-6 6 6" /><path d="m6 18 6-6 6 6" /></svg
                >
              </span>
            </div>
          </div>
        </div>
      </Card.Content>
      <Card.Footer>
        <Button.Root variant="outline" class="w-full">View Reports</Button.Root>
      </Card.Footer>
    </Card.Root>
  </div>

  <!-- Analytics Tabs -->
  <Tabs.Root value={activeTab} onValueChange={(value) => (activeTab = value)} class="w-full">
    <Tabs.List class="grid grid-cols-3 md:grid-cols-9 gap-2">
      <Tabs.Trigger value="cost-management">Cost</Tabs.Trigger>
      <Tabs.Trigger value="inventory">Inventory</Tabs.Trigger>
      <Tabs.Trigger value="production">Production</Tabs.Trigger>
      <Tabs.Trigger value="menu">Menu</Tabs.Trigger>
      <Tabs.Trigger value="compliance">Compliance</Tabs.Trigger>
      <Tabs.Trigger value="dietary">Dietary</Tabs.Trigger>
      <Tabs.Trigger value="staff">Staff</Tabs.Trigger>
      <Tabs.Trigger value="supplier">Supplier</Tabs.Trigger>
      <Tabs.Trigger value="satisfaction">Satisfaction</Tabs.Trigger>
    </Tabs.List>

    <div class="mt-6">
      <!-- Tab Contents -->
      <Tabs.Content value="cost-management">
        <CostManagementTab {dateRange} {selectedFacility} {isLoading} />
      </Tabs.Content>

      <Tabs.Content value="inventory">
        <InventoryOptimizationTab {dateRange} {selectedFacility} {isLoading} />
      </Tabs.Content>

      <Tabs.Content value="production">
        <ProductionEfficiencyTab {dateRange} {selectedFacility} {isLoading} />
      </Tabs.Content>

      <Tabs.Content value="menu">
        <MenuPerformanceTab {dateRange} {selectedFacility} {isLoading} />
      </Tabs.Content>

      <Tabs.Content value="compliance">
        <ComplianceMonitoringTab {dateRange} {selectedFacility} {isLoading} />
      </Tabs.Content>

      <Tabs.Content value="dietary">
        <DietaryComplianceTab {dateRange} {selectedFacility} {isLoading} />
      </Tabs.Content>

      <Tabs.Content value="staff">
        <StaffProductivityTab {dateRange} {selectedFacility} {isLoading} />
      </Tabs.Content>

      <Tabs.Content value="supplier">
        <SupplierPerformanceTab {dateRange} {selectedFacility} {isLoading} />
      </Tabs.Content>

      <Tabs.Content value="satisfaction">
        <CustomerSatisfactionTab {dateRange} {selectedFacility} {isLoading} />
      </Tabs.Content>
    </div>
  </Tabs.Root>
</div>

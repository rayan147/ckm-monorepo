<!-- # src/routes/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import LineChart from '$lib/components/charts/LineChart.svelte';

	let activeOrders = 0;
	let todayRevenue = 0;
	let lowStockItems = 0;
	let recentOrders = [];
	let salesData = $state([]);

	onMount(async () => {
		// Fetch dashboard data
		// This is where you'd make API calls to get real data
		activeOrders = 12;
		todayRevenue = 2456;
		lowStockItems = 5;
		recentOrders = [
			{ id: 1, customer: 'John Doe', status: 'Completed', total: 59.99 }
			// ... more orders
		];
		salesData = [
			{ date: '2023-01', amount: 4000 },
			{ date: '2023-02', amount: 3000 }
			// ... more data points
		];
	});
</script>

<h1 class="text-3xl font-semibold text-gray-900">Dashboard</h1>

<div class="mt-4">
	<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
		<!-- Dashboard cards for activeOrders, todayRevenue, lowStockItems -->
	</div>
</div>

<div class="mt-8">
	<h2 class="text-xl font-semibold text-gray-900">Recent Orders</h2>
	<div class="mt-4">
		<!-- Table for recentOrders -->
	</div>
</div>

<div class="mt-8">
	<h2 class="text-xl font-semibold text-gray-900">Sales Trend</h2>
	<div class="mt-4">
		<LineChart data={salesData} />
	</div>
</div>

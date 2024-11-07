<script>
	import { onMount } from 'svelte';
	import { TrendingUp, ChefHat, DollarSign, ShoppingBag } from 'lucide-svelte';
	import { kpiStore } from '$lib/stores/kpiStore';

	onMount(async () => {
		await kpiStore.fetchKPIs();
	});
</script>

<div class="mt-8">
	<h2 class="text-2xl font-semibold text-gray-900">Organization KPIs</h2>
	<div class="grid grid-cols-1 gap-5 mt-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="overflow-hidden bg-white rounded-lg shadow">
			<div class="p-5">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<DollarSign class="w-6 h-6 text-gray-400" />
					</div>
					<div class="flex-1 w-0 ml-5">
						<dl>
							<dt class="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
							<dd class="flex items-baseline">
								<div class="text-2xl font-semibold text-gray-900">
									${$kpiStore.totalRevenue.toLocaleString()}
								</div>
								<div class="flex items-baseline ml-2 text-sm font-semibold text-green-600">
									<TrendingUp class="self-center flex-shrink-0 w-5 h-5 text-green-500" />
									<span class="sr-only">Increased by</span>
									{$kpiStore.revenueGrowth}%
								</div>
							</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>

		<div class="overflow-hidden bg-white rounded-lg shadow">
			<div class="p-5">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<ShoppingBag class="w-6 h-6 text-gray-400" />
					</div>
					<div class="flex-1 w-0 ml-5">
						<dl>
							<dt class="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
							<dd class="flex items-baseline">
								<div class="text-2xl font-semibold text-gray-900">
									{$kpiStore.totalOrders.toLocaleString()}
								</div>
								<div class="flex items-baseline ml-2 text-sm font-semibold text-green-600">
									<TrendingUp class="self-center flex-shrink-0 w-5 h-5 text-green-500" />
									<span class="sr-only">Increased by</span>
									{$kpiStore.orderGrowth}%
								</div>
							</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>

		<div class="overflow-hidden bg-white rounded-lg shadow">
			<div class="p-5">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<ChefHat class="w-6 h-6 text-gray-400" />
					</div>
					<div class="flex-1 w-0 ml-5">
						<dl>
							<dt class="text-sm font-medium text-gray-500 truncate">Total Employees</dt>
							<dd class="flex items-baseline">
								<div class="text-2xl font-semibold text-gray-900">
									{$kpiStore.totalEmployees.toLocaleString()}
								</div>
							</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>

		<div class="overflow-hidden bg-white rounded-lg shadow">
			<div class="p-5">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<DollarSign class="w-6 h-6 text-gray-400" />
					</div>
					<div class="flex-1 w-0 ml-5">
						<dl>
							<dt class="text-sm font-medium text-gray-500 truncate">Average Order Value</dt>
							<dd class="flex items-baseline">
								<div class="text-2xl font-semibold text-gray-900">
									${$kpiStore.averageOrderValue.toFixed(2)}
								</div>
							</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Edit } from 'lucide-svelte';
	import RestaurantList from './RestaurantList.svelte';
	import UserList from './UserList.svelte';
	import OrganizationForm from './OrganizationForm.svelte';
	import KPIDashboard from './KPIDashboard.svelte';
	import { organizationStore } from '$lib/stores/organizationStore';

	let showOrganizationModal = $state(false);
	let organization = $state();
	let loading = $state();
	let error = $state();

	const unsubscribe = organizationStore.subscribe((state) => {
		organization = state.organization;
		loading = state.loading;
		error = state.error;
	});

	onMount(() => {
		organizationStore.fetchOrganization();
	});

	onDestroy(unsubscribe);

	function editOrganization() {
		showOrganizationModal = true;
	}

	function handleUpdateOrganization(updatedData) {
		organizationStore.updateOrganization(updatedData);
		showOrganizationModal = false;
	}
</script>

<div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
	<div class="flex items-center justify-between">
		<h1 class="text-3xl font-semibold text-gray-900">Organization Management</h1>
		<button
			onclick={editOrganization}
			class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			<Edit class="w-5 h-5 mr-2" />
			Edit Organization
		</button>
	</div>

	{#if error}
		<div
			class="relative px-4 py-3 mt-4 text-red-700 bg-red-100 border border-red-400 rounded"
			role="alert"
		>
			<strong class="font-bold">Error:</strong>
			<span class="block sm:inline">{error}</span>
		</div>
	{/if}

	{#if loading}
		<div class="mt-8 text-center">
			<p>Loading organization information...</p>
		</div>
	{:else if organization}
		<div class="mt-8 overflow-hidden bg-white shadow sm:rounded-lg">
			<div class="px-4 py-5 sm:px-6">
				<h3 class="text-lg font-medium leading-6 text-gray-900">Organization Information</h3>
			</div>
			<div class="px-4 py-5 border-t border-gray-200 sm:px-6">
				<dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
					<div class="sm:col-span-1">
						<dt class="text-sm font-medium text-gray-500">Organization name</dt>
						<dd class="mt-1 text-sm text-gray-900">{organization.name}</dd>
					</div>
					<div class="sm:col-span-1">
						<dt class="text-sm font-medium text-gray-500">Description</dt>
						<dd class="mt-1 text-sm text-gray-900">{organization.description}</dd>
					</div>
					<div class="sm:col-span-1">
						<dt class="text-sm font-medium text-gray-500">Contact email</dt>
						<dd class="mt-1 text-sm text-gray-900">{organization.contactEmail}</dd>
					</div>
					<div class="sm:col-span-1">
						<dt class="text-sm font-medium text-gray-500">Contact phone</dt>
						<dd class="mt-1 text-sm text-gray-900">{organization.contactPhone}</dd>
					</div>
					<div class="sm:col-span-2">
						<dt class="text-sm font-medium text-gray-500">Address</dt>
						<dd class="mt-1 text-sm text-gray-900">{organization.address}</dd>
					</div>
				</dl>
			</div>
		</div>
	{/if}

	<KPIDashboard />

	<RestaurantList />

	<UserList />
</div>

{#if showOrganizationModal}
	<OrganizationForm
		{organization}
		on:close={() => (showOrganizationModal = false)}
		on:submit={handleUpdateOrganization}
	/>
{/if}

<script>
	import { onMount } from 'svelte';
	import { Plus, Search, Edit, Trash2 } from 'lucide-svelte';

	let staff = $state([]);
	let searchTerm = $state('');

	onMount(async () => {
		// Fetch staff from API
		staff = [
			{ id: 1, name: 'John Doe', role: 'Chef', email: 'john@example.com', phone: '123-456-7890' },
			{
				id: 2,
				name: 'Jane Smith',
				role: 'Server',
				email: 'jane@example.com',
				phone: '234-567-8901'
			},
			{
				id: 3,
				name: 'Mike Johnson',
				role: 'Manager',
				email: 'mike@example.com',
				phone: '345-678-9012'
			}
			// Add more sample staff...
		];
	});

	let filteredStaff = $derived(staff.filter(
		(member) =>
			member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
			member.email.toLowerCase().includes(searchTerm.toLowerCase())
	));

	function addStaffMember() {
		// Navigate to staff member creation page or open modal
		console.log('Add new staff member');
	}

	function editStaffMember(id) {
		// Navigate to staff member edit page or open modal
		console.log('Edit staff member', id);
	}

	function deleteStaffMember(id) {
		// Show confirmation dialog and delete if confirmed
		if (confirm('Are you sure you want to delete this staff member?')) {
			console.log('Delete staff member', id);
			staff = staff.filter((member) => member.id !== id);
		}
	}
</script>

<div class="px-4 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8">
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
		<h1 class="mb-4 text-3xl font-bold text-gray-900 sm:mb-0">Staff Management</h1>
		<button
			onclick={addStaffMember}
			class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			<Plus class="w-5 h-5 mr-2" />
			Add Staff Member
		</button>
	</div>

	<div class="mt-6">
		<div class="relative">
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<Search class="w-5 h-5 text-gray-400" />
			</div>
			<input
				type="text"
				bind:value={searchTerm}
				class="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				placeholder="Search staff..."
			/>
		</div>
	</div>

	<div class="flex flex-col mt-8">
		<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
				<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
					<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-gray-50">
							<tr>
								<th
									scope="col"
									class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
								>
									Name
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
								>
									Role
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
								>
									Email
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
								>
									Phone
								</th>
								<th scope="col" class="relative px-6 py-3">
									<span class="sr-only">Actions</span>
								</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							{#each filteredStaff as member (member.id)}
								<tr class="hover:bg-gray-50">
									<td class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
										{member.name}
									</td>
									<td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
										{member.role}
									</td>
									<td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
										{member.email}
									</td>
									<td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
										{member.phone}
									</td>
									<td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
										<button
											onclick={() => editStaffMember(member.id)}
											class="mr-4 text-indigo-600 hover:text-indigo-900 focus:outline-none"
											title="Edit"
										>
											<Edit class="w-5 h-5" />
										</button>
										<button
											onclick={() => deleteStaffMember(member.id)}
											class="text-red-600 hover:text-red-900 focus:outline-none"
											title="Delete"
										>
											<Trash2 class="w-5 h-5" />
										</button>
									</td>
								</tr>
							{/each}
							{#if filteredStaff.length === 0}
								<tr>
									<td
										colspan="5"
										class="px-6 py-4 text-sm text-center text-gray-500 whitespace-nowrap"
									>
										No staff members found.
									</td>
								</tr>
							{/if}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Add any custom styles here */
</style>

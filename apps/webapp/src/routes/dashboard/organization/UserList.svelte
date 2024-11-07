<script lang="ts">
	import { onMount } from 'svelte';
	import { Plus, Search, Edit, Trash2 } from 'lucide-svelte';
	import { userStore } from '$lib/stores/userStore';

	let searchTerm = $state('');
	let showUserModal = $state(false);
	let selectedUser = null;

	onMount(() => {
		userStore.fetchUsers();
	});

	function addUser() {
		selectedUser = null;
		showUserModal = true;
	}

	function editUser(user) {
		selectedUser = user;
		showUserModal = true;
	}

	function deleteUser(id) {
		if (confirm('Are you sure you want to delete this user?')) {
			userStore.deleteUser(id);
		}
	}

	let filteredUsers = $derived($userStore.users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.role.toLowerCase().includes(searchTerm.toLowerCase())
	));
</script>

<div class="mt-8">
	<div class="flex items-center justify-between">
		<h2 class="text-2xl font-semibold text-gray-900">Users</h2>
		<button
			onclick={addUser}
			class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			<Plus class="w-5 h-5 mr-2" />
			Add User
		</button>
	</div>

	<div class="mt-4">
		<div class="relative rounded-md shadow-sm">
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<Search class="w-5 h-5 text-gray-400" />
			</div>
			<input
				type="text"
				bind:value={searchTerm}
				class="block w-full pl-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				placeholder="Search users..."
			/>
		</div>
	</div>

	<div class="flex flex-col mt-8">
		<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
				<div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
					<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-gray-50">
							<tr>
								<th
									scope="col"
									class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
									>Name</th
								>
								<th
									scope="col"
									class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
									>Email</th
								>
								<th
									scope="col"
									class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
									>Role</th
								>
								<th scope="col" class="relative px-6 py-3">
									<span class="sr-only">Actions</span>
								</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							{#each filteredUsers as user (user.id)}
								<tr>
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="flex items-center">
											<div class="flex-shrink-0 w-10 h-10">
												<img
													class="w-10 h-10 rounded-full"
													src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random`}
													alt=""
												/>
											</div>
											<div class="ml-4">
												<div class="text-sm font-medium text-gray-900">{user.name}</div>
											</div>
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="text-sm text-gray-900">{user.email}</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<span
											class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
										>
											{user.role}
										</span>
									</td>
									<td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
										<button
											onclick={() => editUser(user)}
											class="mr-4 text-indigo-600 hover:text-indigo-900"
										>
											<Edit class="w-5 h-5" />
										</button>
										<button
											onclick={() => deleteUser(user.id)}
											class="text-red-600 hover:text-red-900"
										>
											<Trash2 class="w-5 h-5" />
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

{#if showUserModal}
	<!-- Add a UserForm component here, similar to RestaurantForm -->
	<!-- <UserForm user={selectedUser} on:close={() => showUserModal = false} /> -->
{/if}

<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import { createEventDispatcher } from 'svelte';
	import { restaurantStore } from '$lib/stores/restaurantStore';

	interface Props {
		restaurant?: any;
	}

	let { restaurant = null }: Props = $props();

	let name = $state(restaurant?.name || '');
	let address = $state(restaurant?.address || '');
	let manager = $state(restaurant?.manager || '');

	const dispatch = createEventDispatcher();

	async function handleSubmit() {
		try {
			if (restaurant) {
				await restaurantStore.updateRestaurant({ ...restaurant, name, address, manager });
			} else {
				await restaurantStore.addRestaurant({ name, address, manager });
			}
			dispatch('close');
		} catch (error) {
			console.error('Error saving restaurant:', error);
		}
	}
</script>

<div
	class="fixed inset-0 z-10 overflow-y-auto"
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<div
		class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
	>
		<div
			class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
			aria-hidden="true"
		></div>
		<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
			>&#8203;</span
		>
		<div
			class="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
		>
			<div>
				<h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">
					{restaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
				</h3>
				<form onsubmit={preventDefault(handleSubmit)} class="mt-4">
					<div class="mb-4">
						<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
						<input
							type="text"
							name="name"
							id="name"
							bind:value={name}
							required
							class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<div class="mb-4">
						<label for="address" class="block text-sm font-medium text-gray-700">Address</label>
						<input
							type="text"
							name="address"
							id="address"
							bind:value={address}
							required
							class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<div class="mb-4">
						<label for="manager" class="block text-sm font-medium text-gray-700">Manager</label>
						<input
							type="text"
							name="manager"
							id="manager"
							bind:value={manager}
							required
							class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
						<button
							type="submit"
							class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
						>
							Save
						</button>
						<button
							type="button"
							onclick={() => dispatch('close')}
							class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

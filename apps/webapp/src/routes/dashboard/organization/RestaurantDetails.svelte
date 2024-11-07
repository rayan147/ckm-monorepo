<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { MapPin, Phone, Mail, Users } from 'lucide-svelte';

	let { restaurant } = $props();

	const dispatch = createEventDispatcher();
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
					{restaurant.name}
				</h3>
				<div class="mt-4">
					<div class="flex items-center mb-2">
						<MapPin class="w-5 h-5 mr-2 text-gray-400" />
						<p class="text-sm text-gray-500">{restaurant.address}</p>
					</div>
					<div class="flex items-center mb-2">
						<Users class="w-5 h-5 mr-2 text-gray-400" />
						<p class="text-sm text-gray-500">Manager: {restaurant.manager}</p>
					</div>
					<!-- Add more details as needed -->
				</div>
				<div class="mt-5 sm:mt-6">
					<button
						type="button"
						onclick={() => dispatch('close')}
						class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<script lang="ts">
	import { preventDefault } from 'svelte/legacy';
	import { createEventDispatcher } from 'svelte';

	// Props and dispatch setup
	let { registrationData = $bindable() } = $props();
	const dispatch = createEventDispatcher();

	// Initial state for new restaurant
	let newRestaurant = $state({
		name: '',
		address: '',
		city: '',
		state: '',
		zipCode: '',
		owner: ''
	});

	// Form handling functions
	function addRestaurant() {
		registrationData.restaurants = [...registrationData.restaurants, { ...newRestaurant }];

		// Reset form after adding
		newRestaurant = {
			name: '',
			address: '',
			city: '',
			state: '',
			zipCode: '',
			owner: ''
		};
	}

	function handleSubmit() {
		dispatch('next');
	}

	function goBack() {
		dispatch('prev');
	}
</script>

<form onsubmit={preventDefault(handleSubmit)} class="space-y-4">
	<!-- Organization Name Input -->
	<div>
		<input
			type="text"
			bind:value={registrationData.organizationName}
			placeholder="Organization Name"
			required
			class="w-full px-3 py-2 border rounded-md"
		/>
	</div>

	<!-- Restaurants Section -->
	<div class="space-y-4">
		<h3 class="mb-2 font-semibold">Restaurants</h3>

		<!-- Existing Restaurants List -->
		{#each registrationData.restaurants as restaurant, index (index)}
			<div class="mb-2">
				<p>{restaurant.name} - {restaurant.address}</p>
			</div>
		{/each}

		<!-- Add New Restaurant Form -->
		<div class="flex space-x-4">
			<div class="w-full">
				<!-- Restaurant Details Inputs -->
				<div class="space-y-3">
					<input
						type="text"
						bind:value={newRestaurant.name}
						placeholder="Restaurant Name"
						class="w-full px-3 py-2 border rounded-md"
					/>
					<input
						type="text"
						bind:value={newRestaurant.address}
						placeholder="Address"
						class="w-full px-3 py-2 border rounded-md"
					/>
					<input
						type="text"
						bind:value={newRestaurant.city}
						placeholder="Enter city"
						class="w-full px-3 py-2 border rounded-md"
					/>
					<input
						type="text"
						bind:value={newRestaurant.state}
						placeholder="Enter state"
						class="w-full px-3 py-2 border rounded-md"
					/>
					<input
						type="text"
						bind:value={newRestaurant.zipCode}
						placeholder="Enter zip code"
						class="w-full px-3 py-2 border rounded-md"
					/>
					<input
						type="text"
						bind:value={newRestaurant.owner}
						placeholder="Enter owner"
						class="w-full px-3 py-2 border rounded-md"
					/>
				</div>

				<!-- Add Restaurant Button -->
				<button
					type="button"
					onclick={addRestaurant}
					class="w-full py-2 mt-4 text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50"
				>
					Add Restaurant
				</button>

				<!-- Navigation Buttons -->
				<div class="flex space-x-4 mt-4">
					<button
						type="button"
						onclick={goBack}
						class="w-1/2 py-2 text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50"
					>
						Back
					</button>
					<button
						type="submit"
						class="w-1/2 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
					>
						Next
					</button>
				</div>
			</div>
		</div>
	</div>
</form>

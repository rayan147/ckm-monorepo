<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import { createEventDispatcher } from 'svelte';

	let { registrationData = $bindable() } = $props();

	const dispatch = createEventDispatcher();

	function handleSubmit() {
		registrationData.restaurants = [registrationData.restaurants[0] || {}];
		dispatch('next');
	}

	function goBack() {
		dispatch('prev');
	}
</script>

<form onsubmit={preventDefault(handleSubmit)} class="space-y-4">
	<div>
		<input
			type="text"
			bind:value={registrationData.restaurants[0].name}
			placeholder="Restaurant Name"
			required
			class="w-full px-3 py-2 border rounded-md"
		/>
	</div>
	<div>
		<input
			type="text"
			bind:value={registrationData.restaurants[0].address}
			placeholder="Restaurant Street Address"
			required
			class="w-full px-3 py-2 border rounded-md"
		/>
	</div>
	<div>
		<input
			type="text"
			bind:value={registrationData.restaurants[0].city}
			placeholder="Enter City"
			required
			class="w-full px-3 py-2 border rounded-md"
		/>
	</div>
	<div>
		<input
			type="text"
			bind:value={registrationData.restaurants[0].state}
			placeholder="Enter state"
			required
			class="w-full px-3 py-2 border rounded-md"
		/>
	</div>
	<div>
		<input
			type="text"
			bind:value={registrationData.restaurants[0].zipCode}
			placeholder="zip Code"
			required
			class="w-full px-3 py-2 border rounded-md"
		/>
	</div>
	<div>
		<input
			type="text"
			bind:value={registrationData.restaurants[0].owner}
			placeholder="Restaurant Owner"
			required
			class="w-full px-3 py-2 border rounded-md"
		/>
	</div>
	<div class="flex space-x-4">
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
</form>

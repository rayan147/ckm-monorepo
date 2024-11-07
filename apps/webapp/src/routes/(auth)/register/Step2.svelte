<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import { createEventDispatcher } from 'svelte';

	let { registrationData = $bindable() } = $props<{
		registrationData: {
			firstName: string;
			lastName: string;
			isOrganization?: boolean;
		};
	}>();

	const dispatch = createEventDispatcher();

	function handleSubmit() {
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
			bind:value={registrationData.firstName}
			placeholder="First Name"
			required
			class="w-full px-3 py-2 border rounded-md"
		/>
	</div>
	<div>
		<input
			type="text"
			bind:value={registrationData.lastName}
			placeholder="Last Name"
			required
			class="w-full px-3 py-2 border rounded-md"
		/>
	</div>
	<div>
		<label class="flex items-center">
			<input type="checkbox" bind:checked={registrationData.isOrganization} class="mr-2" />
			I represent an organization with multiple restaurants
		</label>
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

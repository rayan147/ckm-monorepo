<script lang="ts">
	import { preventDefault } from 'svelte/legacy';
	import { createEventDispatcher } from 'svelte';

	let { registrationData = $bindable() } = $props<{
		registrationData: {
			email: string;
			password: string;
		};
	}>();

	console.log({
		registrationData
	});

	const dispatch = createEventDispatcher();

	function handleSubmit() {
		dispatch('next');
	}
</script>

<form onsubmit={preventDefault(handleSubmit)} class="space-y-4">
	<div>
		<input
			type="email"
			bind:value={registrationData.email}
			placeholder="Email address"
			required
			class="w-full px-3 py-2 border rounded-md"
		/>
	</div>
	<div>
		<input
			type="password"
			bind:value={registrationData.password}
			placeholder="Password"
			required
			class="w-full px-3 py-2 border rounded-md"
		/>
	</div>
	<button type="submit" class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
		Next
	</button>
</form>

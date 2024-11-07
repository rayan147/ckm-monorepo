<script lang="ts">
	import Login from '$lib/components/Auth/Login/Login.svelte';
	import Chef from '$lib/components/chef.svelte';
	let { form } = $props();
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
	<div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
		<div class="flex justify-center mb-6">
			<Chef />
		</div>
		<Login {form} />
	</div>
</div>

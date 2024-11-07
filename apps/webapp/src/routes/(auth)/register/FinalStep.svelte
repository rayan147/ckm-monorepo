<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';

	type CleanedRestaurant = {
		name: string;
		imageUrl: string;
		address: string;
		city: string;
		zipCode: string;
		state: string;
		owner: string;
	};

	type RegistrationData = {
		email: string;
		password: string;
		firstName: string;
		lastName: string;
		isOrganization?: boolean;
		organizationName?: string;
		restaurants: CleanedRestaurant | CleanedRestaurant[];
	};

	let { registrationData = $bindable() } = $props<{ registrationData: RegistrationData }>();

	let submitting = $state(false);
	let error = $state('');
	let success = $state(false);

	const handleEnhance: SubmitFunction = () => {
		submitting = true;
		error = '';
		return async ({ result, update }) => {
			submitting = false;
			if (result.type === 'success') {
				success = true;
				setTimeout(() => {
					goto('/login'); // Redirect to login page after successful registration
				}, 3000);
			} else if (result.type === 'failure') {
				error = result.data?.message || 'An error occurred. Please try again.';
			}
			await update();
		};
	};
</script>

<div class="space-y-4">
	{#if success}
		<div class="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
			Registration successful! You will be redirected to the login page shortly.
		</div>
	{:else}
		<h3 class="text-lg font-semibold">Review Your Information</h3>
		<p>Email: {registrationData.email}</p>
		<p>Name: {registrationData.firstName} {registrationData.lastName}</p>
		{#if registrationData.isOrganization}
			<p>Organization: {registrationData.organizationName}</p>
			<p>Restaurants:</p>
			<ul class="list-disc list-inside">
				{#each registrationData.restaurants as restaurant, index (index)}
					<li>{restaurant.name} - {restaurant.address}</li>
				{/each}
			</ul>
		{:else}
			<p>Restaurant: {registrationData.restaurants[0].name}</p>
			<p>Address: {registrationData.restaurants[0].address}</p>
		{/if}

		{#if error}
			<div class="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
				{error}
			</div>
		{/if}

		<form method="POST" use:enhance={handleEnhance}>
			<input type="hidden" name="registrationData" value={JSON.stringify(registrationData)} />
			<button
				type="submit"
				class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
				disabled={submitting}
			>
				{submitting ? 'Registering...' : 'Complete Registration'}
			</button>
		</form>

		<p class="mt-4 text-sm text-center">
			By clicking "Complete Registration", you agree to our
			<a href="/terms" class="text-indigo-600 hover:underline">Terms of Service</a> and
			<a href="/privacy" class="text-indigo-600 hover:underline">Privacy Policy</a>.
		</p>
	{/if}
</div>

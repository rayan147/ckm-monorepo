<script lang="ts">
	import Chef from '$lib/components/chef.svelte';
	import Step1 from './Step1.svelte';
	import Step2 from './Step2.svelte';
	import Step3Organization from './Step3Organization.svelte';
	import Step3SingleRestaurant from './Step3SingleRestaurant.svelte';
	import FinalStep from './FinalStep.svelte';

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

	let registrationData = $state<RegistrationData>({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		isOrganization: false,
		organizationName: '',
		restaurants: [
			{
				name: '',
				imageUrl: '',
				address: '',
				zipCode: '',
				state: '',
				city: '',
				owner: ''
			}
		]
	});

	let currentStep = $state(1);
	let isOrganization = $state(false);

	function nextStep() {
		if (currentStep === 2) {
			if (registrationData.isOrganization !== undefined) {
				isOrganization = registrationData.isOrganization;
			}
		}
		currentStep++;
	}

	function prevStep() {
		currentStep--;
	}
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
	<div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
		<div class="flex justify-center mb-6">
			<Chef />
		</div>
		<h2 class="mb-6 text-2xl font-bold text-center text-gray-900">Create Your Account</h2>

		{#if currentStep === 1}
			<Step1 bind:registrationData on:next={nextStep} />
		{:else if currentStep === 2}
			<Step2 bind:registrationData on:next={nextStep} on:prev={prevStep} />
		{:else if currentStep === 3 && isOrganization}
			<Step3Organization bind:registrationData on:next={nextStep} on:prev={prevStep} />
		{:else if currentStep === 3 && !isOrganization}
			<Step3SingleRestaurant bind:registrationData on:next={nextStep} on:prev={prevStep} />
		{:else}
			<FinalStep bind:registrationData />
		{/if}
	</div>
</div>

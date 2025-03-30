<script lang="ts">
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Button } from '$lib/components/ui/button';
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader
  } from '$lib/components/ui/card';
  import { Progress } from '$lib/components/ui/progress';

  import Step1 from './first-step.svelte';
  import Step2 from './second-step.svelte';
  import Step3Organization from './third-step-organization.svelte';
  import Step3SingleRestaurant from './third-step-single-restaurant.svelte';
  import ReviewStep from './review-step.svelte';

  // Define the steps
  const steps = ['Account', 'Personal', 'Business', 'Review'];
  let currentStep = $state(0);
  let progress = $state(25);

  // Restaurant type definition
  type Restaurant = {
    name: string;
    imageUrl: string;
    address: string;
    city: string;
    zipCode: string;
    state: string;
    owner: string;
  };

  // Form data state
  let formData = $state({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    isOrganization: false,
    role: 'STAFF',
    profileImage: '',
    auth: {},
    organizationInput: {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      email: '',
      website: ''
    },
    restaurantsInput: [
      {
        name: '',
        imageUrl: '',
        address: '',
        city: '',
        zipCode: '',
        state: '',
        owner: ''
      }
    ]
  });

  // Error and loading states
  let error = $state('');
  let submitting = $state(false);
  let formSubmitted = $state(false);

  // Step navigation
  function nextStep() {
    if (currentStep < steps.length - 1) {
      currentStep++;
      updateProgress();
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      updateProgress();
    }
  }

  function updateProgress() {
    progress = ((currentStep + 1) / steps.length) * 100;
  }

  // Form submission handler
  const handleSubmit: SubmitFunction = () => {
    submitting = true;
    error = '';

    return async ({ result, update }) => {
      submitting = false;

      if (result.type === 'redirect') {
        // Handle redirect from server action
        formSubmitted = true;
        // Will be redirected by SvelteKit
      } else if (result.type === 'success') {
        formSubmitted = true;
        setTimeout(() => {
          window.location.href = '/login?registered=true';
        }, 2000);
      } else if (result.type === 'failure') {
        error = result.data?.message || 'Registration failed. Please try again.';
        if (result.data?.errors) {
          console.error('Validation errors:', result.data.errors);
        }
      }

      await update();
    };
  };
</script>

<Card class="w-full shadow-none border-0">
  <CardHeader>
    <CardDescription class="text-center">
      Step {currentStep + 1} of {steps.length}:
      <span class="mx-1">{steps[currentStep]}</span>
    </CardDescription>

    <div class="mt-2">
      <Progress value={progress} class="h-2" />
    </div>
  </CardHeader>

  <CardContent>
    {#if formSubmitted}
      <div class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
        Registration successful! You will be redirected to the login page.
      </div>
    {:else if error}
      <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
        {error}
      </div>
    {/if}

    {#if currentStep === 0}
      <Step1 bind:formData />
    {:else if currentStep === 1}
      <Step2 bind:formData />
    {:else if currentStep === 2 && formData.isOrganization}
      <Step3Organization bind:formData />
    {:else if currentStep === 2 && !formData.isOrganization}
      <Step3SingleRestaurant bind:formData />
    {:else if currentStep === 3}
      <form method="POST" action="?/register" use:enhance={handleSubmit} id="registration-form">
        <input type="hidden" name="registrationData" value={JSON.stringify(formData)} />
        <ReviewStep {formData} {submitting} />
      </form>
    {/if}
  </CardContent>

  <CardFooter class="flex justify-between">
    <Button variant="outline" onclick={prevStep} disabled={currentStep === 0 || submitting}>
      Previous
    </Button>

    {#if currentStep < steps.length - 1}
      <Button onclick={nextStep} disabled={submitting}>Next</Button>
    {:else if !formSubmitted}
      <Button form="registration-form" type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Complete Registration'}
      </Button>
    {/if}
  </CardFooter>
</Card>

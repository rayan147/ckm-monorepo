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
  const steps = ['Account', 'Personal', 'Business', 'Review'] as const;
  let currentStep = $state(0);
  let progress = $state(25);

  // Form data state
  let formData = $state({
    email: 'rayan361@gmail.com',
    password: 'ramirez123456',
    firstName: 'Rayan',
    lastName: 'Ramirez',
    isOrganization: true,
    role: 'ADMIN',
    profileImage: '',
    auth: {
      passwordHash: '',
      role: 'STAFF'
    },
    organizationInput: {
      name: 'ckm',
      imageUrl: ''
    },
    restaurantsInput: [
      {
        name: 'Berry',
        imageUrl: '',
        address: '133 augusta st',
        city: 'South Amboy',
        zipCode: '08778',
        state: 'NJ',
        owner: 'RR'
      }
    ]
  });

  let error = $state('');
  let submitting = $state(false);
  let formSubmitted = $state(false);

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

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !submitting) {
      e.preventDefault();
      nextStep();
    }
  }

  function handleKeyDownBackSpace(e: KeyboardEvent) {
    if (e.key === 'Backspace' && !submitting) {
      e.preventDefault();
      prevStep();
    } else if ((e.key === 'Backspace' && e.ctrlKey) || e.key === 'Escape') {
      e.preventDefault();
      prevStep();
    }
  }

  function updateProgress() {
    progress = ((currentStep + 1) / steps.length) * 100;
  }

  const handleSubmit: SubmitFunction = () => {
    submitting = true;
    error = '';

    return async ({ result }) => {
      submitting = false;

      if (result.type === 'failure') {
        error = result.data?.message || 'Registration failed. Please try again.';
      } else if (result.type === 'success') {
        formSubmitted = true;
        // Redirect after a short delay
        setTimeout(() => {
          window.location.href = '/login?registered=true';
        }, 2000);
      }
    };
  };
</script>

<div class="flex justify-center w-full px-4 py-6">
  <div class={currentStep === 2 || currentStep === 3 ? 'w-full max-w-3xl' : 'w-full max-w-lg'}>
    <Card class="shadow-none border-0 rounded-lg w-full">
      <CardHeader>
        <div class="space-y-1 text-center">
          <h2 id="registration-step-label" class="text-base font-medium text-gray-900">
            Step <span aria-current="step">{currentStep + 1}</span> of {steps.length}
          </h2>

          <CardDescription class="text-indigo-600 font-semibold">
            {steps[currentStep]}
          </CardDescription>
        </div>

        <div
          class="mt-3"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-labelledby="registration-step-label"
        >
          <Progress value={progress} class="h-2 bg-gray-200" />
        </div>
      </CardHeader>
      <CardContent>
        {#if formSubmitted}
          <div class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            <div class="flex items-center">
              <svg
                class="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Registration successful! You will be redirected to the login page.
            </div>
          </div>
        {:else if error}
          <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            <div class="flex items-center">
              <svg
                class="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              {error}
            </div>
          </div>
        {/if}

        <div class="transition-all duration-300 ease-in-out">
          {#if currentStep === 0}
            <section aria-labelledby="account-step">
              <h2 id="account-step" class="sr-only">Account Information</h2>
              <Step1 bind:formData />
            </section>
          {:else if currentStep === 1}
            <section aria-labelledby="personal-step">
              <h2 id="personal-step" class="sr-only">Personal Information</h2>
              <Step2 bind:formData />
            </section>
          {:else if currentStep === 2 && formData.isOrganization}
            <section aria-labelledby="organization-step">
              <h2 id="organization-step" class="sr-only">Organization Information</h2>
              <Step3Organization bind:formData />
            </section>
          {:else if currentStep === 2 && !formData.isOrganization}
            <section aria-labelledby="restaurant-step">
              <h2 id="restaurant-step" class="sr-only">Restaurant Information</h2>
              <Step3SingleRestaurant bind:formData />
            </section>
          {:else if currentStep === 3}
            <section aria-labelledby="review-step">
              <h2 id="review-step" class="sr-only">Review Information</h2>
              <form
                method="POST"
                action="?/register"
                use:enhance={handleSubmit}
                id="registration-form"
              >
                <div class="space-y-4">
                  <input type="hidden" name="registrationData" value={JSON.stringify(formData)} />
                  <ReviewStep {formData} {submitting} />
                </div>
              </form>
            </section>
          {/if}
        </div>
      </CardContent>

      <CardFooter class="flex justify-between pt-6">
        <div aria-label="Form navigation">
          <Button
            variant="outline"
            onclick={prevStep}
            disabled={currentStep === 0 || submitting}
            onkeydown={handleKeyDownBackSpace}
            tabindex={0}
            class="px-5 py-2 border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Go to previous step"
          >
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            Previous
          </Button>
        </div>

        <div>
          {#if currentStep < steps.length - 1}
            <Button
              onclick={nextStep}
              disabled={submitting}
              onkeydown={handleKeyDown}
              tabindex={1}
              class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Go to next step"
            >
              Next
              <svg
                class="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </Button>
          {:else if !formSubmitted}
            <Button
              form="registration-form"
              type="submit"
              disabled={submitting}
              class="px-5 py-2 bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Complete registration"
            >
              {#if submitting}
                <svg
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              {:else}
                Complete Registration
                <svg
                  class="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              {/if}
            </Button>
          {/if}
        </div>
      </CardFooter>
    </Card>
  </div>
</div>

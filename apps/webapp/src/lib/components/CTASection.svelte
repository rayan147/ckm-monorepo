<!-- lib/components/CTASection.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  interface Props {
    form: { message?: string } | undefined;
  }

  let { form }: Props = $props();

  let isSuccess = $derived(form?.message && form.message.includes('registered'));

  let formElement: HTMLFormElement = $state();
  let submitting = $state(false);

  function handleSubmit() {
    submitting = true;
  }

  function handleResult() {
    submitting = false;
    if (formElement) {
      formElement.reset();
    }
  }
</script>

<div class="bg-white">
  <div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
    <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
      <span class="block">Ready to revolutionize</span>
      <span class="block text-indigo-600">your kitchen management?</span>
    </h2>
    <div class="mt-8 sm:flex">
      <div class="w-full sm:max-w-md">
        <form
          bind:this={formElement}
          class="sm:flex"
          id="email-form"
          method="post"
          use:enhance={() => {
            handleSubmit();
            return ({ update }) => {
              update({ reset: false });
              handleResult();
            };
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            class="w-full px-5 py-3 placeholder-gray-500 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <button
              type="submit"
              class="flex items-center justify-center w-full px-5 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Get Early Access'}
            </button>
          </div>
        </form>
        {#if form?.message}
          <div
            id="form-message"
            class="mt-4 text-sm font-medium {isSuccess ? 'text-green-600' : 'text-red-600'}"
          >
            <p class="flex items-center">
              {#if isSuccess}
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              {:else}
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              {/if}
              {form.message}
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

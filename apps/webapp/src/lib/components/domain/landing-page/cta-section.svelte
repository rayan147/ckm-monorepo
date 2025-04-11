<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Alert, AlertDescription } from '$lib/components/ui/alert';
  import { CheckCircle2, AlertCircle } from 'lucide-svelte';

  interface Props {
    form: { message?: string } | undefined;
  }

  let { form }: Props = $props();

  let isSuccess = $derived(form?.message && form.message.includes('registered'));

  let formElement: HTMLFormElement | null = $state(null);
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

<div class="bg-indigo-50" id="email-form">
  <div class="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:py-24 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        <span class="block">Ready to revolutionize</span>
        <span class="block text-indigo-600">your kitchen management?</span>
      </h2>
      <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
        Get early access to CKM and transform how you handle dietary management, inventory, and meal
        planning. Free 14-day trial with full support.
      </p>
    </div>

    <div class="max-w-md mx-auto mt-8">
      <form
        bind:this={formElement}
        class="space-y-4"
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
        <div class="flex flex-col gap-4 sm:flex-row">
          <Input type="email" name="email" placeholder="Enter your email" required class="flex-1" />
          <Button type="submit" class="whitespace-nowrap" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Get Early Access'}
          </Button>
        </div>

        {#if form?.message}
          <Alert variant={isSuccess ? 'default' : 'destructive'} class="mt-4">
            <div class="flex items-center gap-2">
              {#if isSuccess}
                <CheckCircle2 class="h-4 w-4" />
              {:else}
                <AlertCircle class="h-4 w-4" />
              {/if}
              <AlertDescription>
                {form.message}
              </AlertDescription>
            </div>
          </Alert>
        {/if}
      </form>

      <div class="mt-6 text-center text-sm text-gray-500">
        <p>Free 14-day trial. No credit card required. HIPAA compliant.</p>
      </div>
    </div>
  </div>
</div>

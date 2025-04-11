<script lang="ts">
  import { Button } from '$lib/components/ui/button';

  interface Props {
    title: string;
    description: string;
    buttonText: string;
    features: { icon: string; title: string }[];
    reversed?: boolean;
  }

  let { title, description, buttonText, features, reversed = false }: Props = $props();
</script>

<div class={reversed ? 'bg-white' : 'bg-gray-50'}>
  <div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-20 lg:px-8">
    <div class="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
      {#if reversed}
        <div class="grid grid-cols-2 gap-8 mt-10 lg:mt-0">
          {#each features as feature}
            <div
              class="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-sm hover:shadow transition-shadow duration-300"
            >
              {@html feature.icon}
              <h3 class="mt-4 text-lg font-medium text-gray-900">{feature.title}</h3>
            </div>
          {/each}
        </div>
      {/if}

      <div class={reversed ? 'mt-10 lg:mt-0' : ''}>
        <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">{title}</h2>
        <p class="mt-4 text-lg text-gray-500">{description}</p>
        <div class="mt-8">
          <Button
            href="#email-form"
            variant="default"
            size="lg"
            class="px-6 py-3 text-base font-medium"
          >
            {buttonText}
          </Button>
        </div>
      </div>

      {#if !reversed}
        <div class="grid grid-cols-2 gap-8 mt-10 lg:mt-0 lg:ml-8">
          {#each features as feature}
            <div
              class="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-sm hover:shadow transition-shadow duration-300"
            >
              {@html feature.icon}
              <h3 class="mt-4 text-lg font-medium text-gray-900">{feature.title}</h3>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

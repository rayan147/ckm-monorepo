<script lang="ts">
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
  } from '$lib/components/ui/card';

  interface Props {
    features: { title: string; description: string }[];
  }

  let { features }: Props = $props();
</script>

<div id="features" class="bg-gray-50">
  <div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-20 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        <span class="block">Comprehensive kitchen management</span>
        <span class="block text-indigo-600">for every dietary need</span>
      </h2>
      <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
        Whether you're managing a hospital dietary department or a catering business, our platform
        provides the tools you need to excel.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3">
      {#each features as feature}
        <Card class="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle class="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription class="text-base text-gray-500">{feature.description}</CardDescription>
          </CardContent>
        </Card>
      {/each}
    </div>
  </div>
</div>

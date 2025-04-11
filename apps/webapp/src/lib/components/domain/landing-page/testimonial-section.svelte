<script lang="ts">
  import { Card, CardContent } from '$lib/components/ui/card';

  interface Props {
    testimonials: {
      quote: string;
      author: string;
      role: string;
    }[];
  }

  let { testimonials }: Props = $props();
</script>

<div class="bg-indigo-50">
  <div class="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Trusted by Industry Leaders
      </h2>
      <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
        See how CKM is transforming kitchen management across healthcare and catering businesses.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
      {#each testimonials as testimonial}
        <Card
          class="h-full bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <CardContent class="p-8">
            <div class="text-indigo-600 mb-6">
              <svg class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                />
              </svg>
            </div>
            <p class="text-lg text-gray-700 mb-6">{testimonial.quote}</p>
            <div class="flex items-center">
              <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span class="text-indigo-600 font-bold text-lg">{testimonial.author[0]}</span>
              </div>
              <div class="ml-3">
                <p class="text-base font-medium text-gray-900">{testimonial.author}</p>
                <p class="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </div>
</div>

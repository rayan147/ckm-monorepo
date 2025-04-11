<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
  } from '$lib/components/ui/accordion';

  interface Props {
    faqs: {
      question: string;
      answer: string;
    }[];
  }

  let { faqs }: Props = $props();
</script>

<div class="bg-white">
  <div class="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Frequently Asked Questions
      </h2>
      <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
        Get answers to common questions about our kitchen management platform.
      </p>
    </div>

    <div class="max-w-3xl mx-auto mt-12">
      <Accordion type="single" class="w-full">
        {#each faqs as faq, i}
          <AccordionItem value="item-{i + 1}">
            <AccordionTrigger class="text-lg font-medium text-left text-gray-900 py-4 px-1">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent class="text-base text-gray-600 px-1 pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        {/each}
      </Accordion>
    </div>
  </div>
</div>

<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import type { ActionData } from './$types';
  import Navbar from '$lib/components/domain/nav/navbar.svelte';
  import HeroSection from '$lib/components/domain/landing-page/hero-section.svelte';
  import FeatureSection from '$lib/components/domain/landing-page/feature-section.svelte';
  import FeatureGrid from '$lib/components/domain/landing-page/feature-grid.svelte';
  import CTASection from '$lib/components/domain/landing-page/cta-section.svelte';
  import Footer from '$lib/components/domain/landing-page/footer.svelte';

  interface Props {
    form: ActionData;
  }

  let { form }: Props = $props();

  onMount(() => {
    if (form?.message) {
      const formMessage = document.getElementById('form-message');
      if (formMessage) {
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  const features = [
    {
      title: 'Insights',
      description: 'Get real-time insights into your kitchen operations and customer behavior.'
    },
    {
      title: 'Business Ops',
      description: 'Streamline your kitchen operations with AI-powered recommendations.'
    },
    {
      title: 'People Ops & HR',
      description: 'Manage your staff efficiently with smart scheduling and communication tools.'
    }
  ];

  const recipeManagementFeatures = [
    {
      icon: '<svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>',
      title: 'Recipe Scaling'
    },
    {
      icon: '<svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>',
      title: 'Menu Optimization'
    }
  ];

  const laborCostFeatures = [
    {
      icon: '<svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
      title: 'Smart Scheduling'
    },
    {
      icon: '<svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>',
      title: 'Productivity Analysis'
    }
  ];

  const profitabilityFeatures = [
    {
      icon: '<svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
      title: 'Food Cost Analysis'
    },
    {
      icon: '<svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
      title: 'Smart Pricing'
    }
  ];
</script>

<main class="min-h-screen bg-white">
  <Navbar />
  <HeroSection />
  <FeatureGrid {features} />
  <FeatureSection
    title="Recipe Management & Menu Engineering"
    description="Take control of your menu with our advanced recipe management and menu engineering tools."
    buttonText="Learn more"
    features={recipeManagementFeatures}
  />
  <FeatureSection
    title="Labor Cost Optimization"
    description="Reduce labor costs with AI-driven scheduling, time tracking, and productivity analysis."
    buttonText="Learn more"
    features={laborCostFeatures}
    reversed={true}
  />
  <FeatureSection
    title="Maximize Profitability"
    description="Optimize your food costs and pricing strategy with our AI-driven analysis and recommendations."
    buttonText="Explore features"
    features={profitabilityFeatures}
  />
  <CTASection {form} />
  <Footer />
</main>

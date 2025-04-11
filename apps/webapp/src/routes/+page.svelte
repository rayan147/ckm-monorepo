<script lang="ts">
  import HeroSection from '$lib/components/domain/landing-page/hero-section.svelte';
  import FeatureGrid from '$lib/components/domain/landing-page/feature-grid.svelte';
  import FeatureSection from '$lib/components/domain/landing-page/feature-section.svelte';
  import TestimonialSection from '$lib/components/domain/landing-page/testimonial-section.svelte';
  import CTASection from '$lib/components/domain/landing-page/cta-section.svelte';
  import Footer from '$lib/components/domain/landing-page/footer.svelte';
  import FAQSection from '$lib/components/domain/landing-page/faq-section.svelte';
  import Navbar from '$lib/components/layout/nav/navbar.svelte';

  let { form } = $props();

  const kitchenFeatures = [
    {
      title: 'Inventory Management',
      description:
        'Track ingredients, supplies, and equipment with real-time updates and automatic reordering.'
    },
    {
      title: 'Menu Planning',
      description:
        'Create and manage menus for events, daily services, or patient meals while accounting for dietary restrictions.'
    },
    {
      title: 'Recipe Scaling',
      description:
        'Automatically adjust recipes to serve any number of guests or patients with precise measurements.'
    },
    {
      title: 'Cost Control',
      description:
        'Monitor food costs, reduce waste, and optimize purchasing for maximum profitability.'
    },
    {
      title: 'Dietary Compliance',
      description:
        'Ensure all meals meet required dietary specifications for medical needs, allergies, and preferences.'
    },
    {
      title: 'Reports & Analytics',
      description:
        'Generate comprehensive reports on costs, consumption, and operational efficiency.'
    }
  ];

  const planningFeatures = [
    {
      icon: '<svg class="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>',
      title: 'Event Planning'
    },
    {
      icon: '<svg class="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>',
      title: 'Client Management'
    },
    {
      icon: '<svg class="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clip-rule="evenodd"></path></svg>',
      title: 'Dietary Tracking'
    },
    {
      icon: '<svg class="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>',
      title: 'Menu Templates'
    }
  ];

  const managementFeatures = [
    {
      icon: '<svg class="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>',
      title: 'Inventory Control'
    },
    {
      icon: '<svg class="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>',
      title: 'Cost Tracking'
    },
    {
      icon: '<svg class="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>',
      title: 'Performance Analytics'
    },
    {
      icon: '<svg class="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"></path><path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"></path><path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"></path></svg>',
      title: 'Data Integration'
    }
  ];

  const testimonials = [
    {
      quote:
        "CKM has completely transformed how we manage dietary restrictions for our hospital patients. We've reduced errors by 40% while saving time on meal planning.",
      author: 'Sarah Johnson',
      role: 'Dietary Director, Memorial Hospital'
    },
    {
      quote:
        'As a catering business handling multiple events daily, CKM has streamlined our inventory and menu planning. We can now handle twice the events with the same staff.',
      author: 'Michael Chen',
      role: 'Owner, Elite Catering Services'
    },
    {
      quote:
        'The HIPAA compliance features give us peace of mind when managing patient dietary needs, and the interface is intuitive enough that our entire staff adapted quickly.',
      author: 'Dr. Lisa Martinez',
      role: 'Nutrition Services, County Medical Center'
    }
  ];

  const faqs = [
    {
      question: 'How does CKM handle dietary restrictions and allergies?',
      answer:
        'CKM features a comprehensive database of allergens and dietary restrictions that automatically flags ingredients when planning menus. For healthcare settings, it integrates with patient records to ensure compliance with medical dietary requirements.'
    },
    {
      question: 'Is CKM compliant with healthcare regulations?',
      answer:
        'Yes, CKM is fully HIPAA compliant for healthcare settings, with secure data handling, encryption, and audit trails. We also comply with food safety regulations relevant to catering operations.'
    },
    {
      question: 'Can CKM scale from small catering businesses to large hospital systems?',
      answer:
        'Absolutely. Our system is designed to scale seamlessly from small operations to enterprise-level implementations. We offer tiered pricing plans based on volume and feature requirements.'
    },
    {
      question: 'Does CKM integrate with existing systems like EHRs or POS?',
      answer:
        'Yes, CKM offers integration capabilities with major Electronic Health Record systems for hospitals and popular Point of Sale systems for catering businesses, ensuring smooth data flow across your operations.'
    }
  ];
</script>

<div class="min-h-screen bg-white">
  <Navbar />
  <HeroSection />

  <FeatureGrid features={kitchenFeatures} />

  <FeatureSection
    title="Streamline Event Planning"
    description="Perfect for catering businesses managing multiple events. Plan menus, track client preferences, and scale recipes effortlessly."
    buttonText="Perfect for Caterers"
    features={planningFeatures}
  />

  <FeatureSection
    title="Hospital Dietary Management"
    description="Ensure patient safety with accurate dietary tracking. Comply with all healthcare regulations while optimizing kitchen efficiency."
    buttonText="HIPAA Compliant"
    features={managementFeatures}
    reversed={true}
  />

  <TestimonialSection {testimonials} />

  <FAQSection {faqs} />

  <CTASection {form} />

  <Footer />
</div>

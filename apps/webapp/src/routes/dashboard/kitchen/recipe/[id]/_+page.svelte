<!-- src/routes/recipe/[id]/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
  import type { PageProps } from './$types';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { RecipeState, setRecipeContext } from '$lib/contexts/recipe-context.svelte';
  import { UtensilsCrossed, ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { Badge } from '$lib/components/ui/badge';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
  import * as Carousel from '$lib/components/ui/carousel/index.js';

  // Using existing recipe header component
  import RecipeHeader from '$lib/components/domain/recipes/recipe-header.svelte';
  import RecipeAllergens from '$lib/components/domain/recipes/recipe-allergens.svelte';
  import { default as RecipeOverview } from '$lib/components/domain/recipes/tabs/overview-tab.svelte';
  import { default as RecipeIngredients } from '$lib/components/domain/recipes/tabs/ingredients-tab.svelte';
  import { default as RecipeInstructions } from '$lib/components/domain/recipes/tabs/instructions-tab.svelte';
  import { default as RecipeEquipment } from '$lib/components/domain/recipes/tabs/equipment-tab.svelte';
  import { default as RecipeSafety } from '$lib/components/domain/recipes/tabs/safety-tab.svelte';
  import TimerDialog from '$lib/components/domain/recipes/timer-dialog.svelte';
  import ImageModal from '$lib/components/domain/recipes/image-modal.svelte';
  import CompletionModal from '$lib/components/domain/recipes/completion-modal.svelte';

  // Initialize props
  let { form, data }: PageProps = $props();
  const { recipe, dailyValues, usdaMatches, ingredientToMatch } = data;

  // Create recipe state instance
  const recipeState = $state(new RecipeState(recipe));

  // Set context for child components
  setRecipeContext(recipeState);

  // Define the API state
  let carouselApi = $state<CarouselAPI>();
  let currentSlide = $state(0);

  // Update current slide when carousel changes
  $effect(() => {
    if (carouselApi) {
      // Set initial slide
      currentSlide = carouselApi.selectedScrollSnap();

      // Update on select event
      carouselApi.on('select', () => {
        if (carouselApi && carouselApi.selectedScrollSnap() !== undefined) {
          currentSlide = carouselApi.selectedScrollSnap();
        }
      });
    }
  });
  // Store active tab preference
  $effect(() => {
    if (browser && recipeState.activeTab) {
      try {
        localStorage.setItem('recipeDetailActiveTab', recipeState.activeTab);
      } catch (e) {
        console.error('Error saving tab preference:', e);
      }
    }
  });

  // Load saved tab preference on mount
  onMount(() => {
    try {
      if (browser) {
        const savedTab = localStorage.getItem('recipeDetailActiveTab');
        if (savedTab) {
          recipeState.activeTab = savedTab;
        }
      }
    } catch (e) {
      console.error('Error loading tab preference:', e);
    }

    // Clean up timer on component destroy
    return () => {
      if (recipeState.timerInterval) clearInterval(recipeState.timerInterval);
    };
  });

  // Navigate back to recipes list
  function goBack() {
    goto('/dashboard/kitchen/');
  }
  // Helper functions for direct navigation
  function prevSlide() {
    carouselApi?.scrollPrev();
  }

  function nextSlide() {
    carouselApi?.scrollNext();
  }
  // Total time calculation
</script>

<main class="container mx-auto px-4 py-6 max-w-7xl">
  <!-- Using existing recipe header component -->
  <RecipeHeader {goBack} />

  <!-- Recipe content grid -->
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <!-- Left column -->
    <div class="lg:col-span-5">
      <div class="mb-6">
        {#if data.recipe.imageUrls && data.recipe.imageUrls.length > 0}
          <Carousel.Root
            class="w-full rounded-xl overflow-hidden relative"
            setApi={(api) => (carouselApi = api)}
            opts={{ loop: true }}
          >
            <Carousel.Content>
              {#each data.recipe.imageUrls as imageUrl, i (imageUrl)}
                <Carousel.Item>
                  <div class="p-0">
                    <div class="border-0 shadow-none">
                      <div
                        class="flex aspect-video items-center justify-center p-0"
                        onclick={() => recipeState.openImageModal(imageUrl, data.recipe.name)}
                        role="button"
                        tabindex="0"
                        onkeyup={(e) =>
                          e.key === 'Enter' &&
                          recipeState.openImageModal(imageUrl, data.recipe.name)}
                      >
                        <img
                          src={imageUrl}
                          alt={`${data.recipe.name} - image ${i + 1}`}
                          class="w-full h-full object-cover cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              {/each}
            </Carousel.Content>

            {#if data.recipe.imageUrls.length > 1}
              <!-- Custom Previous/Next buttons instead of using the component ones -->
              <div
                class="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 z-10 pointer-events-none"
              >
                <button
                  type="button"
                  class="bg-black/50 text-white hover:bg-black/70 w-8 h-8 rounded-full flex items-center justify-center pointer-events-auto"
                  onclick={prevSlide}
                  aria-label="Previous slide"
                >
                  <ChevronLeft class="h-5 w-5" />
                </button>
                <button
                  type="button"
                  class="bg-black/50 text-white hover:bg-black/70 w-8 h-8 rounded-full flex items-center justify-center pointer-events-auto"
                  onclick={nextSlide}
                  aria-label="Next slide"
                >
                  <ChevronRight class="h-5 w-5" />
                </button>
              </div>

              <!-- Dots indicator -->
              <div class="absolute bottom-4 w-full flex justify-center gap-2 z-10">
                <div class="flex gap-1.5">
                  {#each data.recipe.imageUrls as _, i}
                    <button
                      type="button"
                      class="w-2.5 h-2.5 rounded-full {currentSlide === i
                        ? 'bg-white'
                        : 'bg-white/40'}"
                      aria-label="Go to slide {i + 1}"
                      onclick={() => carouselApi?.scrollTo(i)}
                    ></button>
                  {/each}
                </div>
              </div>
            {/if}
          </Carousel.Root>
        {:else}
          <div
            class="w-full aspect-video flex items-center justify-center bg-gray-100 rounded-xl text-gray-400"
          >
            <UtensilsCrossed class="h-16 w-16" />
          </div>
        {/if}
      </div>
      <!-- Allergen information card -->
      <RecipeAllergens />
    </div>

    <!-- Right column -->
    <div class="lg:col-span-7">
      <article aria-labelledby="recipe-title" class="mb-8">
        <header class="mb-6">
          <h1 id="recipe-title" class="text-3xl font-bold text-gray-800 mb-3">
            {data.recipe.name}
          </h1>

          {#if data.recipe.description}
            <p class="text-gray-600">
              {data.recipe.description}
            </p>
          {/if}

          {#if data.recipe.tags && data.recipe.tags.length > 0}
            <div class="mt-4 flex flex-wrap gap-2" aria-label="Recipe tags">
              {#each data.recipe.tags as tag}
                <Badge variant="secondary" class="text-xs">{tag.name}</Badge>
              {/each}
            </div>
          {/if}

          {#if data.recipe.skillLevel}
            <div
              class="mt-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              Skill Level: {data.recipe.skillLevel}
            </div>
          {/if}
        </header>

        <Tabs value="overview" class="w-full">
          <TabsList class="w-full grid grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="safety">Safety</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" class="space-y-6">
            <RecipeOverview {dailyValues} {usdaMatches} {form} {ingredientToMatch} />
          </TabsContent>

          <TabsContent value="ingredients">
            <RecipeIngredients />
          </TabsContent>

          <TabsContent value="instructions">
            <RecipeInstructions />
          </TabsContent>

          <TabsContent value="equipment">
            <RecipeEquipment />
          </TabsContent>

          <TabsContent value="safety">
            <RecipeSafety />
          </TabsContent>
        </Tabs>
      </article>
    </div>
  </div>

  <!-- Modals -->
  <TimerDialog />
  <ImageModal />
  <CompletionModal />
</main>

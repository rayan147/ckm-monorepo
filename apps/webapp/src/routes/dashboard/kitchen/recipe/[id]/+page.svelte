<script lang="ts">
  import { onMount } from 'svelte';
  import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
  import type { PageProps } from './$types';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { RecipeState, setRecipeContext } from '$lib/contexts/recipe-context.svelte';
  import {
    UtensilsCrossed,
    ChevronLeft,
    ChevronRight,
    Clock,
    ChefHat,
    Users,
    Thermometer,
    ScrollText,
    ArrowLeft,
    Star,
    BookOpen,
    History,
    Share2,
    Apple
  } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Separator } from '$lib/components/ui/separator';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from '$lib/components/ui/card';
  import { ScrollArea } from '$lib/components/ui/scroll-area';
  import * as Carousel from '$lib/components/ui/carousel/index.js';
  import { Skeleton } from '$lib/components/ui/skeleton';
  import NutritionCard from '$lib/components/domain/recipes/nutrition-card.svelte';
  import CostAnalysis from '$lib/components/domain/recipes/cost-analysis.svelte';
  // Import existing components
  import RecipeAllergens from '$lib/components/domain/recipes/recipe-allergens.svelte';
  import { default as RecipeIngredients } from '$lib/components/domain/recipes/tabs/ingredients-tab.svelte';
  import { default as RecipeInstructions } from '$lib/components/domain/recipes/tabs/instructions-tab.svelte';
  import { default as RecipeEquipment } from '$lib/components/domain/recipes/tabs/equipment-tab.svelte';
  import { default as RecipeSafety } from '$lib/components/domain/recipes/tabs/safety-tab.svelte';
  import TimerDialog from '$lib/components/domain/recipes/timer-dialog.svelte';
  import ImageModal from '$lib/components/domain/recipes/image-modal.svelte';
  import CompletionModal from '$lib/components/domain/recipes/completion-modal.svelte';
  import { zodSchemas } from '@ckm/db';

  import RecipeHeader from '$lib/components/domain/recipes/recipe-header.svelte';
  import { nice } from 'd3';

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
  let isLoading = $state(true);
  let activeVersion = $state(
    recipe.versions && recipe.versions.length > 0 ? recipe.versions[0] : null
  );
  let showVersionHistory = $state(false);

  // Calculate times and other metrics
  const totalTime = recipe.prepTime + recipe.cookTime;
  const formattedTotalTime = formatTime(totalTime);
  const formattedPrepTime = formatTime(recipe.prepTime);
  const formattedCookTime = formatTime(recipe.cookTime);

  // Format time helper function
  function formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }

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
    if (browser && recipe.activeTab) {
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
          recipe.activeTab = savedTab;
        }
      }
    } catch (e) {
      console.error('Error loading tab preference:', e);
    }

    // Simulate loading complete
    setTimeout(() => {
      isLoading = false;
    }, 500);

    // Clean up timer on component destroy
    return () => {
      if (recipe.timerInterval) clearInterval(recipeState.timerInterval);
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

  // Handle recipe version selection
  function selectVersion(version: zodSchemas.RecipeVersion) {
    activeVersion = version;
    showVersionHistory = false;
  }
</script>

<main class="container mx-auto px-4 py-6 max-w-7xl">
  <!-- Breadcrumb & Back navigation -->
  <div class="flex items-center mb-6 text-sm text-gray-500">
    <Button variant="ghost" size="sm" onclick={goBack} class="flex items-center gap-1">
      <ArrowLeft class="h-4 w-4" />
      <span>Back to Recipes</span>
    </Button>
    <div class="flex items-center ml-2">
      <span class="mx-2">/</span>
      <span>{recipe.cookBook?.name || 'Cookbook'}</span>
      <span class="mx-2">/</span>
      <span class="font-medium text-gray-800">{recipe.name}</span>
    </div>
  </div>

  <!-- Recipe header - displays when loading or after content is ready -->
  <div class="mb-8">
    {#if isLoading}
      <Skeleton class="h-8 w-2/3 mb-2" />
      <Skeleton class="h-4 w-1/2 mb-4" />
      <div class="flex gap-2 mb-4">
        <Skeleton class="h-6 w-16" />
        <Skeleton class="h-6 w-16" />
        <Skeleton class="h-6 w-16" />
      </div>
    {:else}
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800">{recipe.name}</h1>
        <div class="flex items-center gap-2">
          <RecipeHeader bind:showVersionHistory />
        </div>
      </div>

      {#if recipe.description}
        <p class="text-gray-600 mb-4">{recipe.description}</p>
      {/if}

      <div class="flex flex-wrap gap-4 mb-6">
        <div class="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-md">
          <Clock class="h-4 w-4 text-gray-600" />
          <div class="text-sm">
            <span class="font-medium">{formattedTotalTime}</span>
            <span class="text-gray-500 text-xs ml-1">Total</span>
          </div>
        </div>

        <div class="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-md">
          <ChefHat class="h-4 w-4 text-gray-600" />
          <div class="text-sm">
            <span class="font-medium">{formattedPrepTime}</span>
            <span class="text-gray-500 text-xs ml-1">Prep</span>
          </div>
        </div>

        <div class="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-md">
          <Thermometer class="h-4 w-4 text-gray-600" />
          <div class="text-sm">
            <span class="font-medium">{formattedCookTime}</span>
            <span class="text-gray-500 text-xs ml-1">Cook</span>
          </div>
        </div>

        <div class="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-md">
          <Users class="h-4 w-4 text-gray-600" />
          <div class="text-sm">
            <span class="font-medium">{recipe.servings}</span>
            <span class="text-gray-500 text-xs ml-1">Servings</span>
          </div>
        </div>

        {#if recipe.skillLevel}
          <div class="flex items-center gap-1 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-md">
            <Star class="h-4 w-4" />
            <span class="text-sm font-medium">{recipe.skillLevel}</span>
          </div>
        {/if}
      </div>

      {#if recipe.tags && recipe.tags.length > 0}
        <div class="flex flex-wrap gap-2 mb-2" aria-label="Recipe tags">
          {#each recipe.tags as tag}
            <Badge variant="secondary" class="text-xs">{tag.name}</Badge>
          {/each}
        </div>
      {/if}

      <!-- Version history popover -->
      {#if showVersionHistory && recipe.versions && recipe.versions.length > 0}
        <Card class="mt-4 max-w-md">
          <CardHeader>
            <CardTitle class="text-lg">Recipe Versions</CardTitle>
            <CardDescription>Select a version to view</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea class="h-[300px]">
              <div class="space-y-2">
                {#each recipe.versions as version}
                  <div
                    class="p-3 rounded-md cursor-pointer transition-colors {activeVersion?.id ===
                    version.id
                      ? 'bg-primary/10'
                      : 'hover:bg-gray-100'}"
                    onclick={() => selectVersion(version)}
                    onkeydown={(e) => e.key === 'Enter' && selectVersion(version)}
                    tabindex="0"
                    role="button"
                  >
                    <div class="flex justify-between">
                      <div class="font-medium">Version {version.versionNumber}</div>
                      {#if version.isActive}
                        <Badge variant="outline" class="text-xs">Active</Badge>
                      {/if}
                    </div>
                    {#if version.createdAt}
                      <div class="text-sm text-gray-500">
                        {new Date(version.createdAt).toLocaleDateString()}
                      </div>
                    {/if}
                    {#if version.changes}
                      <div class="text-sm mt-1">{version.changes}</div>
                    {/if}
                  </div>
                {/each}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              size="sm"
              onclick={() => (showVersionHistory = false)}
              class="w-full"
            >
              Close
            </Button>
          </CardFooter>
        </Card>
      {/if}
    {/if}
  </div>

  <!-- Recipe content grid -->
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <!-- Left column -->
    <div class="lg:col-span-5">
      <div class="sticky top-6">
        <div class="mb-6">
          {#if isLoading}
            <Skeleton class="w-full aspect-video rounded-xl" />
          {:else if recipe.imageUrls && recipe.imageUrls.length > 0}
            <Carousel.Root
              class="w-full rounded-xl overflow-hidden relative"
              setApi={(api) => (carouselApi = api)}
              opts={{ loop: true }}
            >
              <Carousel.Content>
                {#each recipe.imageUrls as imageUrl, i (imageUrl)}
                  <Carousel.Item>
                    <div class="p-0">
                      <div class="border-0 shadow-none">
                        <div
                          class="flex aspect-video items-center justify-center p-0"
                          onclick={() => recipeState.openImageModal(imageUrl, recipe.name)}
                          onkeydown={(e) =>
                            e.key === 'Enter' && recipeState.openImageModal(imageUrl, recipe.name)}
                          role="button"
                          tabindex="0"
                        >
                          <img
                            src={imageUrl}
                            alt={`${recipe.name} - image ${i + 1}`}
                            class="w-full h-full object-cover cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </Carousel.Item>
                {/each}
              </Carousel.Content>

              {#if recipe.imageUrls.length > 1}
                <!-- Custom Previous/Next buttons -->
                <div
                  class="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 z-10 pointer-events-none"
                >
                  <Button
                    variant="secondary"
                    size="icon"
                    class="bg-black/50 hover:bg-black/70 text-white rounded-full pointer-events-auto h-8 w-8 p-0"
                    onclick={prevSlide}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft class="h-5 w-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    class="bg-black/50 hover:bg-black/70 text-white rounded-full pointer-events-auto h-8 w-8 p-0"
                    onclick={nextSlide}
                    aria-label="Next slide"
                  >
                    <ChevronRight class="h-5 w-5" />
                  </Button>
                </div>

                <!-- Dots indicator -->
                <div class="absolute bottom-4 w-full flex justify-center gap-2 z-10">
                  <div class="flex gap-1.5">
                    {#each recipe.imageUrls as _, i}
                      <button
                        type="button"
                        class="w-2.5 h-2.5 rounded-full transition-colors {currentSlide === i
                          ? 'bg-white'
                          : 'bg-white/40 hover:bg-white/60'}"
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
        <!-- <RecipeAllergens /> -->
      </div>
    </div>

    <!-- Right column -->
    <div class="lg:col-span-7">
      <article aria-labelledby="recipe-details" class="mb-8">
        {#if isLoading}
          <div class="space-y-4">
            <Skeleton class="h-10 w-full mb-4" />
            <Skeleton class="h-32 w-full" />
            <Skeleton class="h-32 w-full" />
          </div>
        {:else}
          <Tabs
            value={recipe.activeTab || 'overview'}
            class="w-full"
            onValueChange={(value) => (recipe.activeTab = value)}
          >
            <TabsList class="w-full grid grid-cols-2 md:grid-cols-6 mb-6">
              <TabsTrigger value="overview" class="flex items-center gap-1">
                <ScrollText class="h-4 w-4 mr-1 hidden md:inline" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="nutrition" class="flex items-center gap-1">
                <Apple class="h-4 w-4 mr-1 hidden md:inline" />
                Nutrition
              </TabsTrigger>
              <TabsTrigger value="ingredients" class="flex items-center gap-1">
                <BookOpen class="h-4 w-4 mr-1 hidden md:inline" />
                Ingredients
              </TabsTrigger>
              <TabsTrigger value="instructions" class="flex items-center gap-1">
                <ChefHat class="h-4 w-4 mr-1 hidden md:inline" />
                Instructions
              </TabsTrigger>
              <TabsTrigger value="equipment" class="flex items-center gap-1">
                <UtensilsCrossed class="h-4 w-4 mr-1 hidden md:inline" />
                Equipment
              </TabsTrigger>
              <TabsTrigger value="safety" class="flex items-center gap-1">
                <Thermometer class="h-4 w-4 mr-1 hidden md:inline" />
                Safety
              </TabsTrigger>
            </TabsList>

            <div class="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <TabsContent value="overview" class="space-y-6 mt-0">
                {#if recipe.laborCosts && recipe.laborCosts.length > 0}
                  <CostAnalysis />
                {/if}

                <Separator class="mb-4" />
              </TabsContent>

              <TabsContent value="nutrition" class="space-y-6 mt-0">
                {#if recipe.nutritionalInfo}
                  <NutritionCard {dailyValues} {form} {usdaMatches} {ingredientToMatch} />
                {/if}
              </TabsContent>

              <TabsContent value="ingredients" class="mt-0">
                <!-- <RecipeIngredients /> -->
              </TabsContent>

              <TabsContent value="instructions" class="mt-0">
                <RecipeInstructions />
              </TabsContent>

              <TabsContent value="equipment" class="mt-0">
                <RecipeEquipment />
              </TabsContent>

              <TabsContent value="safety" class="mt-0">
                <RecipeSafety />
              </TabsContent>
            </div>
          </Tabs>
        {/if}
      </article>
    </div>
  </div>

  <!-- Modals -->
  <TimerDialog />
  <ImageModal />
  <CompletionModal />
</main>

<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Separator } from '$lib/components/ui/separator';
  import * as Card from '$lib/components/ui/card';
  import * as Carousel from '$lib/components/ui/carousel';
  import * as Tabs from '$lib/components/ui/tabs';
  import {
    ArrowLeft,
    Clock,
    Users,
    DollarSign,
    ChefHat,
    Thermometer,
    AlertTriangle,
    Tag,
    Utensils,
    Flame,
    BarChart,
    Leaf,
    Heart,
    Printer,
    Share2
  } from 'lucide-svelte';
  import { goto } from '$app/navigation';
  import { fade, fly } from 'svelte/transition';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import type { PageProps } from './$types';
  import type { Recipe } from '@ckm/db';
  import { AspectRatio } from '$lib/components/ui/aspect-ratio';

  // Initialize props with runes syntax
  let { data }: PageProps = $props();

  // State management with runes - using default value for SSR compatibility
  let activeTab = $state('overview');

  // Load saved tab preference on mount
  onMount(() => {
    try {
      if (browser) {
        const savedTab = localStorage.getItem('recipeDetailActiveTab');
        if (savedTab) {
          activeTab = savedTab;
        }
      }
    } catch (e) {
      console.error('Error loading tab preference:', e);
    }
  });

  // Save tab preference in localStorage, but only in browser
  $effect(() => {
    if (browser && activeTab) {
      try {
        localStorage.setItem('recipeDetailActiveTab', activeTab);
      } catch (e) {
        console.error('Error saving tab preference:', e);
      }
    }
  });

  // Format cook time in a human-readable way
  function formatTime(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} minutes`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0
        ? `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`
        : `${hours} hour${hours > 1 ? 's' : ''}`;
    }
  }

  function getTotalTime(recipe: Recipe): string {
    const total = (recipe.prepTime || 0) + (recipe.cookTime || 0);
    return formatTime(total);
  }

  // Navigate back to recipes list
  function goBack() {
    goto('/dashboard/kitchen/');
  }

  // For nutritional info display
  function calculatePercentage(value: number, max: number): number {
    return Math.min(Math.round((value / max) * 100), 100);
  }
</script>

<main class="container mx-auto px-6 py-8 max-w-7xl">
  <!-- Header Navigation -->
  <header class="flex justify-between items-center mb-8">
    <Button
      variant="ghost"
      size="icon"
      onclick={goBack}
      class="h-12 w-12 hover:bg-muted/50 transition-colors rounded-lg"
      aria-label="Go back"
    >
      <ArrowLeft class="h-5 w-5" aria-hidden="true" />
    </Button>

    <nav>
      <ul class="flex items-center gap-4">
        <li>
          <Button
            variant="outline"
            size="sm"
            class="flex items-center gap-1 hover:bg-primary/10 transition-colors rounded-lg"
            aria-label="Save recipe"
          >
            <Heart class="h-4 w-4" />
            <span class="hidden md:inline">Save</span>
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            size="sm"
            class="flex items-center gap-1 hover:bg-primary/10 transition-colors rounded-lg"
            aria-label="Print recipe"
          >
            <Printer class="h-4 w-4" />
            <span class="hidden md:inline">Print</span>
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            size="sm"
            class="flex items-center gap-1 hover:bg-primary/10 transition-colors rounded-lg"
            aria-label="Share recipe"
          >
            <Share2 class="h-4 w-4" />
            <span class="hidden md:inline">Share</span>
          </Button>
        </li>
      </ul>
    </nav>
  </header>

  <!-- Main Content Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 m-3">
    <!-- Left Column: Visuals & Quick Info -->
    <section aria-labelledby="recipe-visual-info" class="space-y-8">
      <h2 id="recipe-visual-info" class="sr-only">Recipe Visual Information</h2>
      <!-- Image Carousel -->
      <figure>
        <Carousel.Root class="w-auto group mr-3">
          <Carousel.Content>
            {#each data.recipe.imageUrls as image, i (i)}
              <Carousel.Item>
                <AspectRatio
                  ratio={12 / 10}
                  class="aspect-square overflow-hidden rounded-xl transition-transform hover:scale-105"
                >
                  <img
                    src={image}
                    alt={`${data.recipe.name} image ${i + 1}`}
                    class="w-full h-full object-cover rounded-3xl"
                    loading="lazy"
                  />
                </AspectRatio>
              </Carousel.Item>
            {/each}
          </Carousel.Content>
          <Carousel.Previous class="opacity-0 group-hover:opacity-100 transition-opacity" />
          <Carousel.Next class="opacity-0 group-hover:opacity-100 transition-opacity" />
        </Carousel.Root>
      </figure>

      <!-- Quick Info Card -->
      <section aria-labelledby="recipe-details">
        <Card.Root class="w-full hover:shadow-lg transition-shadow mx-2">
          <Card.Header>
            <Card.Title>Recipe Details</Card.Title>
          </Card.Header>
          <Card.Content>
            <dl class="grid grid-cols-2 gap-4">
              <div class="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                <Clock class="h-4 w-4 text-primary" />
                <div>
                  <dt class="text-sm text-gray-600">Prep Time</dt>
                  <dd class="font-semibold">{formatTime(data.recipe.prepTime)}</dd>
                </div>
              </div>
              <div class="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                <Flame class="h-4 w-4 text-primary" />
                <div>
                  <dt class="text-sm text-gray-600">Cook Time</dt>
                  <dd class="font-semibold">{formatTime(data.recipe.cookTime)}</dd>
                </div>
              </div>
              <div class="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                <Users class="h-4 w-4 text-primary" />
                <div>
                  <dt class="text-sm text-gray-600">Servings</dt>
                  <dd class="font-semibold">{data.recipe.servings}</dd>
                </div>
              </div>
              <div class="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                <DollarSign class="h-4 w-4 text-primary" />
                <div>
                  <dt class="text-sm text-gray-600">Food Cost</dt>
                  <dd class="font-semibold">${data.recipe.foodCost?.toFixed(2) || '0.00'}</dd>
                </div>
              </div>
              {#if data.recipe.laborCosts && data.recipe.laborCosts.length > 0}
                <div class="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                  <BarChart class="h-4 w-4 text-primary" />
                  <div>
                    <dt class="text-sm text-gray-600">Labor Cost</dt>
                    <dd class="font-semibold">
                      ${data.recipe.laborCosts[0].totalLaborCost.toFixed(2)}
                    </dd>
                  </div>
                </div>
              {/if}
            </dl>

            {#if data.recipe.dietaryRestrictions && data.recipe.dietaryRestrictions.length > 0}
              <Separator class="my-4" />
              <div>
                <h4 class="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Leaf class="h-4 w-4 text-primary" />
                  Dietary Info
                </h4>
                <div class="flex flex-wrap gap-2 mt-2">
                  {#each data.recipe.dietaryRestrictions as restriction}
                    <Badge variant="outline" class="text-xs">{restriction.name}</Badge>
                  {/each}
                </div>
              </div>
            {/if}
          </Card.Content>
        </Card.Root>
      </section>
    </section>
    <!-- Right Column: Header & Tabbed Details -->
    <section aria-labelledby="recipe-title" class="space-y-8">
      <!-- Recipe Header -->
      <header class="space-y-4">
        <h1 class="text-4xl font-bold text-gray-800" in:fade={{ duration: 300 }}>
          {data.recipe.name}
        </h1>
        {#if data.recipe.description}
          <p class="text-lg text-gray-600 max-w-prose">
            {data.recipe.description}
          </p>
        {/if}
        {#if data.recipe.tags && data.recipe.tags.length > 0}
          <ul class="flex flex-wrap gap-2">
            {#each data.recipe.tags as tag}
              <li>
                <Badge variant="secondary" class="text-xs">{tag.name}</Badge>
              </li>
            {/each}
          </ul>
        {/if}
      </header>

      <!-- Tab Navigation & Content -->
      <Tabs.Root bind:value={activeTab}>
        <Tabs.List class="flex border-b space-6  overflow-x-auto py-6" role="tablist">
          <Tabs.Trigger
            value="overview"
            class="py-2 px-4 font-medium transition-colors relative"
            role="tab"
            id="tab-overview"
            aria-controls="panel-overview"
          >
            Overview
          </Tabs.Trigger>
          <Tabs.Trigger
            value="ingredients"
            role="tab"
            id="tab-ingredients"
            aria-controls="panel-ingredients"
            class="py-2 px-4 font-medium transition-colors relative"
          >
            Ingredients
          </Tabs.Trigger>
          <Tabs.Trigger
            value="instructions"
            class="py-2 px-4 font-medium transition-colors relative"
            role="tab"
            id="tab-instructions"
            aria-controls="panel-instructions"
          >
            Instructions
          </Tabs.Trigger>
          <Tabs.Trigger
            value="equipment"
            class="py-2 px-4 font-medium transition-colors relative"
            role="tab"
            id="tab-equipment"
            aria-controls="panel-equipment"
          >
            Equipment
          </Tabs.Trigger>
          <Tabs.Trigger
            value="safety"
            class="py-2 px-4 font-medium transition-colors relative"
            role="tab"
            id="tab-safety"
            aria-controls="panel-safety"
          >
            Safety &amp; Storage
          </Tabs.Trigger>
        </Tabs.List>

        <!-- Overview Tab -->
        <Tabs.Content
          value="overview"
          class="pt-6"
          role="tabpanel"
          id="panel-overview"
          aria-labelledby="tab-overview"
        >
          <Card.Root>
            <Card.Content class="p-6">
              <p class="text-gray-700">
                {data.recipe.description || 'No detailed description available.'}
              </p>
              <dl class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div class="bg-gray-50 p-4 rounded-lg text-center">
                  <dt class="text-sm text-gray-500">Prep Time</dt>
                  <dd class="font-semibold mt-1">{formatTime(data.recipe.prepTime)}</dd>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg text-center">
                  <dt class="text-sm text-gray-500">Cook Time</dt>
                  <dd class="font-semibold mt-1">{formatTime(data.recipe.cookTime)}</dd>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg text-center">
                  <dt class="text-sm text-gray-500">Total Time</dt>
                  <dd class="font-semibold mt-1">{getTotalTime(data.recipe)}</dd>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg text-center">
                  <dt class="text-sm text-gray-500">Servings</dt>
                  <dd class="font-semibold mt-1">{data.recipe.servings}</dd>
                </div>
              </dl>
            </Card.Content>
          </Card.Root>

          {#if data.recipe.laborCosts && data.recipe.laborCosts.length > 0}
            <section aria-labelledby="cost-analysis">
              <Card.Root class="mt-6">
                <Card.Header>
                  <Card.Title id="cost-analysis">Cost Analysis</Card.Title>
                  <Card.Description>Cost breakdown for this recipe</Card.Description>
                </Card.Header>
                <Card.Content class="p-6">
                  <dl class="grid grid-cols-2 gap-3 space-x-3">
                    <div class="flex justify-between">
                      <dt class="text-gray-500">Food Cost</dt>
                      <dd class="font-semibold">${data.recipe.foodCost?.toFixed(2) || '0.00'}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-gray-500">Labor Cost</dt>
                      <dd class="font-semibold">
                        ${data.recipe.laborCosts[0].totalLaborCost.toFixed(2)}
                      </dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-gray-500">Total Cost</dt>
                      <dd class="font-semibold">
                        ${(
                          (data.recipe.foodCost || 0) + data.recipe.laborCosts[0].totalLaborCost
                        ).toFixed(2)}
                      </dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-gray-500">Cost per Serving</dt>
                      <dd class="font-semibold">
                        ${(
                          ((data.recipe.foodCost || 0) + data.recipe.laborCosts[0].totalLaborCost) /
                          data.recipe.servings
                        ).toFixed(2)}
                      </dd>
                    </div>
                  </dl>
                </Card.Content>
              </Card.Root>
            </section>
          {/if}
          <Separator class="mb-4" />

          {#if data.recipe.nutritionalInfo}
            <!-- Nutritional information card with improved visual design -->
            <section aria-labelledby="nutrition-facts">
              <Card.Root>
                <Card.Header class="pb-3">
                  <Card.Title id="nutrition-facts">Nutrition Facts</Card.Title>
                  <Card.Description>
                    Per serving ({data.recipe.nutritionalInfo.servingSize.toFixed(2)}
                    {data.recipe.nutritionalInfo.servingUnit})
                  </Card.Description>
                </Card.Header>
                <Card.Content>
                  <!-- Calories -->
                  <div class="mb-4">
                    <div class="flex justify-between mb-1">
                      <span class="font-medium">Calories</span>
                      <span class="font-bold"
                        >{Math.round(data.recipe.nutritionalInfo.calories)} cal</span
                      >
                    </div>
                  </div>

                  <Separator class="mb-4" />

                  <!-- Macronutrients with standardized progress bars -->
                  <div class="space-y-4">
                    <!-- Protein -->
                    <div>
                      <div class="flex justify-between mb-1">
                        <span>Protein</span>
                        <span>{data.recipe.nutritionalInfo.protein.toFixed(2)}g</span>
                      </div>
                      <div
                        class="w-full bg-muted rounded-full h-2 overflow-hidden"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="50"
                        aria-valuenow={data.recipe.nutritionalInfo.protein}
                        aria-label={`${data.recipe.nutritionalInfo.protein.toFixed(2)} grams of protein`}
                      >
                        <div
                          class="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all"
                          style="width: {calculatePercentage(
                            data.recipe.nutritionalInfo.protein,
                            50
                          )}%"
                        ></div>
                      </div>
                    </div>

                    <!-- Carbohydrates -->
                    <div>
                      <div class="flex justify-between mb-1">
                        <span>Carbohydrates</span>
                        <span>{data.recipe.nutritionalInfo.carbohydrates.toFixed(2)}g</span>
                      </div>
                      <div
                        class="w-full bg-muted rounded-full h-2 overflow-hidden"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="300"
                        aria-valuenow={data.recipe.nutritionalInfo.carbohydrates}
                        aria-label={`${data.recipe.nutritionalInfo.carbohydrates.toFixed(2)} grams of carbohydrates`}
                      >
                        <div
                          class="h-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all"
                          style="width: {calculatePercentage(
                            data.recipe.nutritionalInfo.carbohydrates,
                            300
                          )}%"
                        ></div>
                      </div>
                    </div>

                    <!-- Fat -->
                    <div>
                      <div class="flex justify-between mb-1">
                        <span>Fat</span>
                        <span>{data.recipe.nutritionalInfo.fat.toFixed(2)}g</span>
                      </div>
                      <div
                        class="w-full bg-muted rounded-full h-2 overflow-hidden"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="70"
                        aria-valuenow={data.recipe.nutritionalInfo.fat}
                        aria-label={`${data.recipe.nutritionalInfo.fat.toFixed(2)} grams of fat`}
                      >
                        <div
                          class="h-2 rounded-full bg-gradient-to-r from-red-500 to-red-400"
                          style="width: {calculatePercentage(data.recipe.nutritionalInfo.fat, 70)}%"
                        ></div>
                      </div>
                    </div>
                  </div>

                  <Separator class="my-4" />

                  <!-- Additional nutritional details with consistent layout -->
                  <dl class="grid grid-cols-2 gap-y-2 text-sm">
                    <dt class="text-muted-foreground">Fiber</dt>
                    <dd class="text-right">{data.recipe.nutritionalInfo.fiber.toFixed(2)}g</dd>

                    <dt class="text-muted-foreground">Sugar</dt>
                    <dd class="text-right">{data.recipe.nutritionalInfo.sugar.toFixed(2)}g</dd>

                    <dt class="text-muted-foreground">Sodium</dt>
                    <dd class="text-right">{data.recipe.nutritionalInfo.sodium.toFixed(2)}mg</dd>
                  </dl>
                </Card.Content>
              </Card.Root>
            </section>
          {/if}
        </Tabs.Content>

        <!-- Ingredients Tab -->
        <Tabs.Content
          value="ingredients"
          class="pt-6"
          role="tabpanel"
          id="panel-ingredients"
          aria-labelledby="tab-ingredients"
        >
          <Card.Root>
            <Card.Header>
              <Card.Title>Ingredients</Card.Title>
              <Card.Description>Ingredients for {data.recipe.servings} servings</Card.Description>
            </Card.Header>
            <Card.Content class="p-6">
              {#if data.recipe.ingredients && data.recipe.ingredients.length > 0}
                <ul class="space-y-4">
                  {#each data.recipe.ingredients as ingredient}
                    <li
                      class="flex justify-between items-center gap-1 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span>{ingredient.ingredient?.name || 'Unknown ingredient'}</span>
                      <span class="font-semibold"
                        >{ingredient.quantity.toFixed(2)} {ingredient.unit}</span
                      >
                    </li>
                  {/each}
                </ul>
              {:else}
                <p class="text-gray-500 italic">No ingredients added yet.</p>
              {/if}
            </Card.Content>
          </Card.Root>
        </Tabs.Content>

        <!-- Instructions Tab -->
        <Tabs.Content
          value="instructions"
          class="pt-6"
          role="tabpanel"
          id="panel-instructions"
          aria-labelledby="tab-instructions"
        >
          <Card.Root>
            <Card.Header>
              <Card.Title>Step-by-Step Instructions</Card.Title>
              <Card.Description>Follow these steps to prepare the recipe</Card.Description>
            </Card.Header>
            <Card.Content class="p-6">
              {#if data.recipe.instructions && data.recipe.instructions.length > 0}
                <ol class="space-y-6">
                  {#each data.recipe.instructions as instruction}
                    <li class="p-4 hover:shadow-lg transition-shadow rounded-lg">
                      <div class="flex gap-4">
                        <div
                          class="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary font-medium flex items-center justify-center"
                          aria-hidden="true"
                        >
                          {instruction.stepNumber || '•'}
                        </div>
                        <div>
                          <p class="mb-3 text-gray-700">{instruction.instruction}</p>
                          {#if instruction.imageUrl}
                            <figure class="mt-3">
                              <img
                                src={instruction.imageUrl}
                                alt={`Illustration for step ${instruction.stepNumber}`}
                                class="rounded-lg w-full max-h-64 object-cover"
                              />
                            </figure>
                          {/if}
                          {#if instruction.timeInMinutes || instruction.temperature}
                            <dl class="flex gap-4 mt-3">
                              {#if instruction.timeInMinutes}
                                <div
                                  class="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md"
                                >
                                  <Clock class="h-4 w-4 text-gray-500" aria-hidden="true" />
                                  <div>
                                    <dt class="sr-only">Time</dt>
                                    <dd class="text-sm">{instruction.timeInMinutes} minutes</dd>
                                  </div>
                                </div>
                              {/if}
                              {#if instruction.temperature}
                                <div
                                  class="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md"
                                >
                                  <Thermometer class="h-4 w-4 text-gray-500" aria-hidden="true" />
                                  <div>
                                    <dt class="sr-only">Temperature</dt>
                                    <dd class="text-sm">
                                      {instruction.temperature}°{instruction.temperatureUnit || 'C'}
                                    </dd>
                                  </div>
                                </div>
                              {/if}
                            </dl>
                          {/if}
                          {#if instruction.techniqueTips || instruction.warningNotes || instruction.isCritical}
                            <div class="mt-4 space-y-3">
                              {#if instruction.isCritical}
                                <div
                                  class="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg"
                                  role="alert"
                                >
                                  <AlertTriangle
                                    class="h-4 w-4 text-amber-500"
                                    aria-hidden="true"
                                  />
                                  <p class="text-sm text-amber-800">
                                    This is a critical step! Pay attention.
                                  </p>
                                </div>
                              {/if}
                              {#if instruction.techniqueTips}
                                <div
                                  class="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg"
                                >
                                  <ChefHat class="h-4 w-4 text-blue-500" aria-hidden="true" />
                                  <p class="text-sm text-blue-800">{instruction.techniqueTips}</p>
                                </div>
                              {/if}
                              {#if instruction.warningNotes}
                                <div
                                  class="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
                                  role="alert"
                                >
                                  <AlertTriangle class="h-4 w-4 text-red-500" aria-hidden="true" />
                                  <p class="text-sm text-red-800">{instruction.warningNotes}</p>
                                </div>
                              {/if}
                            </div>
                          {/if}
                        </div>
                      </div>
                    </li>
                  {/each}
                </ol>
              {:else}
                <p class="text-gray-500 italic">No instructions added yet.</p>
              {/if}
            </Card.Content>
          </Card.Root>
        </Tabs.Content>

        <!-- Equipment Tab -->
        <Tabs.Content
          value="equipment"
          class="pt-6"
          role="tabpanel"
          id="panel-equipment"
          aria-labelledby="tab-equipment"
        >
          <Card.Root>
            <Card.Header>
              <Card.Title>Required Equipment</Card.Title>
              <Card.Description>Tools needed for this recipe</Card.Description>
            </Card.Header>
            <Card.Content class="p-6">
              {#if data.recipe.equipment && data.recipe.equipment.length > 0}
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {#each data.recipe.equipment as item}
                    <li
                      class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <Utensils class="h-5 w-5 text-gray-500" aria-hidden="true" />
                      <div>
                        <h3 class="font-semibold">{item.name}</h3>
                        {#if item.description}
                          <p class="text-sm text-gray-600">{item.description}</p>
                        {/if}
                      </div>
                    </li>
                  {/each}
                </ul>
              {:else}
                <p class="text-gray-500 italic">No equipment specified yet.</p>
              {/if}
            </Card.Content>
          </Card.Root>
        </Tabs.Content>

        <!-- Safety & Storage Tab -->
        <Tabs.Content
          value="safety"
          class="pt-6"
          role="tabpanel"
          id="panel-safety"
          aria-labelledby="tab-safety"
        >
          <section aria-labelledby="control-points">
            <Card.Root>
              <Card.Header>
                <Card.Title id="control-points" class="flex items-center gap-2">
                  <AlertTriangle class="h-4 w-4 text-amber-500" aria-hidden="true" />
                  Critical Control Points
                </Card.Title>
                <Card.Description>Important safety checkpoints</Card.Description>
              </Card.Header>
              <Card.Content class="p-6">
                {#if data.recipe.temperatures && data.recipe.temperatures.length > 0}
                  <ul class="space-y-4">
                    {#each data.recipe.temperatures as temp}
                      <li
                        class="p-4 border rounded-lg transition-shadow hover:shadow-md {temp.isCritical
                          ? 'border-amber-200 bg-amber-50'
                          : 'border-gray-200 bg-gray-50'}"
                      >
                        <div class="flex justify-between items-center">
                          <h4 class="font-semibold flex items-center gap-2">
                            <Thermometer class="h-4 w-4 text-primary" aria-hidden="true" />
                            Step {temp.stepNumber}
                          </h4>
                          {#if temp.isCritical}
                            <Badge
                              variant="outline"
                              class="bg-amber-100 text-amber-800 border-amber-300"
                            >
                              Critical
                            </Badge>
                          {/if}
                        </div>
                        <dl class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div class="flex items-center gap-2">
                            <Flame class="h-4 w-4 text-gray-500" aria-hidden="true" />
                            <div>
                              <dt class="sr-only">Temperature range</dt>
                              <dd class="text-sm">
                                {temp.minTemp.toFixed(2)}<strong>°C </strong> - {temp.maxTemp.toFixed(
                                  2
                                )}<strong>°C</strong>
                              </dd>
                            </div>
                          </div>
                          {#if temp.holdTime}
                            <div class="flex items-center gap-2">
                              <Clock class="h-4 w-4 text-gray-500" aria-hidden="true" />
                              <div>
                                <dt class="sr-only">Hold time</dt>
                                <dd class="text-sm">Hold {temp.holdTime} mins</dd>
                              </div>
                            </div>
                          {/if}
                        </dl>
                        {#if temp.description}
                          <p
                            class="mt-2 text-sm {temp.isCritical
                              ? 'text-amber-800'
                              : 'text-gray-600'}"
                          >
                            {temp.description}
                          </p>
                        {/if}
                      </li>
                    {/each}
                  </ul>
                {:else}
                  <p class="text-gray-500 italic">No temperature control points defined.</p>
                {/if}
              </Card.Content>
            </Card.Root>
          </section>
          {#if data.recipe.storage}
            <section aria-labelledby="storage-instructions" class="mt-6">
              <Card.Root>
                <Card.Header>
                  <Card.Title id="storage-instructions" class="flex items-center gap-2">
                    <Clock class="h-4 w-4 text-primary" aria-hidden="true" />
                    Storage Instructions
                  </Card.Title>
                  <Card.Description>How to store this dish</Card.Description>
                </Card.Header>
                <Card.Content class="p-6">
                  <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <dt class="font-semibold text-sm text-gray-600 mb-2">Storage Method</dt>
                      <dd class="text-gray-700">{data.recipe.storage.method}</dd>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <dt class="font-semibold text-sm text-gray-600 mb-2">Shelf Life</dt>
                      <dd class="text-gray-700">
                        {data.recipe.storage.shelfLife > 24
                          ? `${Math.floor(data.recipe.storage.shelfLife / 24)} days ${data.recipe.storage.shelfLife % 24 > 0 ? 'and ' + (data.recipe.storage.shelfLife % 24) + ' hours' : ''}`
                          : `${data.recipe.storage.shelfLife} hours`}
                      </dd>
                    </div>
                  </dl>
                  <dl class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {#if data.recipe.storage.temperature}
                      <div class="bg-gray-50 p-4 rounded-lg">
                        <dt class="font-semibold text-sm text-gray-600 mb-2">
                          Storage Temperature
                        </dt>
                        <dd class="text-gray-700">
                          {data.recipe.storage.temperature.toFixed(2)}°C
                        </dd>
                      </div>
                    {/if}
                    {#if data.recipe.storage.containerType}
                      <div class="bg-gray-50 p-4 rounded-lg">
                        <dt class="font-semibold text-sm text-gray-600 mb-2">Container Type</dt>
                        <dd class="text-gray-700">{data.recipe.storage.containerType}</dd>
                      </div>
                    {/if}
                  </dl>
                  {#if data.recipe.storage.specialNotes}
                    <div class="mt-4 p-4 border border-blue-200 bg-blue-50 rounded-lg" role="note">
                      <h4 class="font-semibold flex items-center gap-2 text-blue-600 text-sm">
                        <AlertTriangle class="h-4 w-4" aria-hidden="true" />
                        Special Notes
                      </h4>
                      <p class="text-blue-800 text-sm">{data.recipe.storage.specialNotes}</p>
                    </div>
                  {/if}
                </Card.Content>
              </Card.Root>
            </section>
          {/if}
        </Tabs.Content>
      </Tabs.Root>
    </section>
  </div>
</main>

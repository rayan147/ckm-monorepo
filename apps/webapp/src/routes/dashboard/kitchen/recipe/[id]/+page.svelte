<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import * as Card from '$lib/components/ui/card';
  import * as Avatar from '$lib/components/ui/avatar';
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
    Scale,
    BarChart,
    Leaf
  } from 'lucide-svelte';
  import { goto } from '$app/navigation';
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import type { PageProps } from './$types';
  import { Tabs } from '$lib/components/ui/tabs';
  import type { Recipe } from '@ckm/db';
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

  // Change active tab
  function setActiveTab(tab: string) {
    activeTab = tab;
  }
</script>

<div class="container mx-auto p-6 max-w-7xl">
  <prev>{JSON.stringify(data, null, 2)}</prev>
  <!-- Header with back button -->
  <header class="mb-6">
    <div class="flex items-center gap-2 mb-2">
      <Button variant="ghost" size="icon" onclick={goBack} class="mr-2">
        <ArrowLeft class="h-5 w-5" />
      </Button>
      <h1 class="text-3xl font-bold tracking-tight" in:fade={{ duration: 300 }}>
        {data.recipe.name}
      </h1>
    </div>

    {#if data.recipe.description}
      <p class="text-muted-foreground mt-1 max-w-3xl">
        {data.recipe.description}
      </p>
    {/if}

    <!-- Recipe tags and badges -->
    {#if data.recipe.tags && data.recipe.tags.length > 0}
      <div class="flex flex-wrap gap-2 mt-3">
        {#each data.recipe.tags as tag}
          <Badge variant="outline" class="flex items-center gap-1">
            <Tag class="h-3 w-3" />
            {tag.name}
          </Badge>
        {/each}
      </div>
    {/if}
  </header>

  <!-- Main content with tabs -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Left column - Recipe image and quick info -->
    <div class="lg:col-span-1">
      <div class="sticky top-6 space-y-6">
        <!-- Recipe image -->
        <Card.Root>
          <div class="aspect-square overflow-hidden rounded-md">
            {#if data.recipe.imageUrls && data.recipe.imageUrls.length > 0}
              <img
                src={data.recipe.imageUrls[0]}
                alt={data.recipe.name}
                class="w-full h-full object-cover"
                loading="lazy"
              />
            {:else}
              <div class="w-full h-full bg-muted flex items-center justify-center">
                <ChefHat class="h-16 w-16 text-muted-foreground" />
              </div>
            {/if}
          </div>
        </Card.Root>

        <!-- Quick info card -->
        <Card.Root>
          <Card.Header>
            <Card.Title>Quick Info</Card.Title>
          </Card.Header>
          <Card.Content>
            <div class="space-y-4">
              <!-- Preparation time -->
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <Clock class="h-4 w-4 text-muted-foreground" />
                  <span>Total Time:</span>
                </div>
                <span class="font-medium">{getTotalTime(data.recipe)}</span>
              </div>

              <!-- Servings -->
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <Users class="h-4 w-4 text-muted-foreground" />
                  <span>Servings:</span>
                </div>
                <span class="font-medium">{data.recipe.servings}</span>
              </div>

              <!-- Food cost -->
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <DollarSign class="h-4 w-4 text-muted-foreground" />
                  <span>Food Cost:</span>
                </div>
                <span class="font-medium">${data.recipe.foodCost?.toFixed(2) || '0.00'}</span>
              </div>

              <!-- Skill level -->
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <ChefHat class="h-4 w-4 text-muted-foreground" />
                  <span>Skill Level:</span>
                </div>
                <Badge variant="outline">
                  {data.recipe.skillLevel || 'Intermediate'}
                </Badge>
              </div>

              {#if data.recipe.laborCosts && data.recipe.laborCosts.length > 0}
                <!-- Labor cost info -->
                <div class="flex justify-between items-center">
                  <div class="flex items-center gap-2">
                    <BarChart class="h-4 w-4 text-muted-foreground" />
                    <span>Labor Cost:</span>
                  </div>
                  <span class="font-medium">
                    ${data.recipe.laborCosts[0].totalLaborCost.toFixed(2)}
                  </span>
                </div>
              {/if}
            </div>

            {#if data.recipe.dietaryRestrictions && data.recipe.dietaryRestrictions.length > 0}
              <Separator class="my-4" />
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <Leaf class="h-4 w-4 text-muted-foreground" />
                  <span class="text-sm font-medium">Dietary Information:</span>
                </div>
                <div class="flex flex-wrap gap-2 mt-1">
                  {#each data.recipe.dietaryRestrictions as restriction}
                    <Badge variant="secondary" class="text-xs">
                      {restriction.name}
                    </Badge>
                  {/each}
                </div>
              </div>
            {/if}
          </Card.Content>
        </Card.Root>

        {#if data.recipe.nutritionalInfo}
          <!-- Nutritional information card -->
          <Card.Root>
            <Card.Header>
              <Card.Title>Nutrition Facts</Card.Title>
              <Card.Description>
                Per serving ({data.recipe.nutritionalInfo.servingSize}
                {data.recipe.nutritionalInfo.servingUnit})
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <div class="space-y-4">
                <!-- Calories -->
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="font-medium">Calories</span>
                    <span>{Math.round(data.recipe.nutritionalInfo.calories)} cal</span>
                  </div>
                </div>

                <Separator />

                <!-- Macronutrients with progress bars -->
                <div>
                  <!-- Protein -->
                  <div class="mb-3">
                    <div class="flex justify-between mb-1">
                      <span>Protein</span>
                      <span>{data.recipe.nutritionalInfo.protein}g</span>
                    </div>
                    <div class="w-full bg-muted rounded-full h-2">
                      <div
                        class="bg-blue-500 h-2 rounded-full"
                        style="width: {calculatePercentage(
                          data.recipe.nutritionalInfo.protein,
                          50
                        )}%"
                      ></div>
                    </div>
                  </div>

                  <!-- Carbohydrates -->
                  <div class="mb-3">
                    <div class="flex justify-between mb-1">
                      <span>Carbohydrates</span>
                      <span>{data.recipe.nutritionalInfo.carbohydrates}g</span>
                    </div>
                    <div class="w-full bg-muted rounded-full h-2">
                      <div
                        class="bg-amber-500 h-2 rounded-full"
                        style="width: {calculatePercentage(
                          data.recipe.nutritionalInfo.carbohydrates,
                          300
                        )}%"
                      ></div>
                    </div>
                  </div>

                  <!-- Fat -->
                  <div class="mb-3">
                    <div class="flex justify-between mb-1">
                      <span>Fat</span>
                      <span>{data.recipe.nutritionalInfo.fat}g</span>
                    </div>
                    <div class="w-full bg-muted rounded-full h-2">
                      <div
                        class="bg-red-500 h-2 rounded-full"
                        style="width: {calculatePercentage(data.recipe.nutritionalInfo.fat, 70)}%"
                      ></div>
                    </div>
                  </div>
                </div>

                <Separator />

                <!-- Additional nutritional details -->
                <div class="text-sm grid grid-cols-2 gap-y-2">
                  <span>Fiber</span>
                  <span class="text-right">{data.recipe.nutritionalInfo.fiber}g</span>

                  <span>Sugar</span>
                  <span class="text-right">{data.recipe.nutritionalInfo.sugar}g</span>

                  <span>Sodium</span>
                  <span class="text-right">{data.recipe.nutritionalInfo.sodium}mg</span>
                </div>
              </div>
            </Card.Content>
          </Card.Root>
        {/if}
      </div>
    </div>
  </div>
  <!-- Right column - Custom tab implementation -->
  <div class="lg:col-span-2">
    <!-- Custom tabs navigation -->
    <div class="border-b mb-6">
      <div class="flex flex-wrap -mb-px">
        <button
          class="py-2 px-4 font-medium text-sm border-b-2 mr-2 transition-colors
            {activeTab === 'overview'
            ? 'border-primary text-primary'
            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'}"
          onclick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          class="py-2 px-4 font-medium text-sm border-b-2 mr-2 transition-colors
            {activeTab === 'ingredients'
            ? 'border-primary text-primary'
            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'}"
          onclick={() => setActiveTab('ingredients')}
        >
          Ingredients
        </button>
        <button
          class="py-2 px-4 font-medium text-sm border-b-2 mr-2 transition-colors
            {activeTab === 'instructions'
            ? 'border-primary text-primary'
            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'}"
          onclick={() => setActiveTab('instructions')}
        >
          Instructions
        </button>
        <button
          class="py-2 px-4 font-medium text-sm border-b-2 mr-2 transition-colors
            {activeTab === 'equipment'
            ? 'border-primary text-primary'
            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'}"
          onclick={() => setActiveTab('equipment')}
        >
          Equipment
        </button>
        <button
          class="py-2 px-4 font-medium text-sm border-b-2 transition-colors
            {activeTab === 'safety'
            ? 'border-primary text-primary'
            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'}"
          onclick={() => setActiveTab('safety')}
        >
          Safety & Storage
        </button>
      </div>
    </div>
  </div>

  <!-- Tab panels -->
  {#if activeTab === 'overview'}
    <div class="space-y-6" in:fade={{ duration: 200 }}>
      <Card.Root>
        <Card.Header>
          <Card.Title>Recipe Overview</Card.Title>
          <Card.Description>Key information about this recipe</Card.Description>
        </Card.Header>
        <Card.Content>
          <div class="prose prose-slate max-w-none">
            <p>{data.recipe.description || 'No detailed description available for this recipe.'}</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <!-- Preparation details -->
              <div>
                <h3 class="text-lg font-medium mb-2">Preparation Details</h3>
                <ul class="space-y-2">
                  <li class="flex justify-between">
                    <span class="text-muted-foreground">Prep Time:</span>
                    <span>{formatTime(data.recipe.prepTime)}</span>
                  </li>
                  <li class="flex justify-between">
                    <span class="text-muted-foreground">Cook Time:</span>
                    <span>{formatTime(data.recipe.cookTime)}</span>
                  </li>
                  <li class="flex justify-between">
                    <span class="text-muted-foreground">Total Time:</span>
                    <span>{getTotalTime(data.recipe)}</span>
                  </li>
                  <li class="flex justify-between">
                    <span class="text-muted-foreground">Servings:</span>
                    <span>{data.recipe.servings}</span>
                  </li>
                </ul>
              </div>

              <!-- Yield information -->
              {#if data.recipe.yields && data.recipe.yields.length > 0}
                <div>
                  <h3 class="text-lg font-medium mb-2">Yield Information</h3>
                  <ul class="space-y-2">
                    <li class="flex justify-between">
                      <span class="text-muted-foreground">Expected Yield:</span>
                      <span>{data.recipe.yields[0].expectedYield} {data.recipe.yields[0].unit}</span
                      >
                    </li>
                    {#if data.recipe.yields[0].actualYield}
                      <li class="flex justify-between">
                        <span class="text-muted-foreground">Actual Yield:</span>
                        <span>{data.recipe.yields[0].actualYield} {data.recipe.yields[0].unit}</span
                        >
                      </li>
                    {/if}
                    {#if data.recipe.yields[0].wastagePercent}
                      <li class="flex justify-between">
                        <span class="text-muted-foreground">Wastage:</span>
                        <span>{data.recipe.yields[0].wastagePercent}%</span>
                      </li>
                    {/if}
                  </ul>
                </div>
              {/if}
            </div>
          </div>
        </Card.Content>
      </Card.Root>

      <!-- Cost breakdown if available -->
      {#if data.recipe.laborCosts && data.recipe.laborCosts.length > 0}
        <Card.Root>
          <Card.Header>
            <Card.Title>Cost Analysis</Card.Title>
            <Card.Description>Breakdown of food and labor costs</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Food cost -->
              <div>
                <h3 class="text-lg font-medium mb-3">Food Cost</h3>
                <div class="flex items-center justify-between">
                  <span>Total Food Cost:</span>
                  <span class="font-semibold">${data.recipe.foodCost?.toFixed(2) || '0.00'}</span>
                </div>
                <div class="flex items-center justify-between mt-2">
                  <span>Per Serving:</span>
                  <span class="font-semibold">
                    ${(data.recipe.foodCost / data.recipe.servings).toFixed(2) || '0.00'}
                  </span>
                </div>
              </div>

              <!-- Labor cost -->
              <div>
                <h3 class="text-lg font-medium mb-3">Labor Cost</h3>
                <div class="flex items-center justify-between">
                  <span>Prep Time:</span>
                  <span>{formatTime(data.recipe.laborCosts[0].prepTime)}</span>
                </div>
                <div class="flex items-center justify-between mt-2">
                  <span>Cook Time:</span>
                  <span>{formatTime(data.recipe.laborCosts[0].cookTime)}</span>
                </div>
                <div class="flex items-center justify-between mt-2">
                  <span>Labor Rate:</span>
                  <span>${data.recipe.laborCosts[0].laborRate.toFixed(2)}/hr</span>
                </div>
                <div class="flex items-center justify-between mt-2">
                  <span>Total Labor Cost:</span>
                  <span class="font-semibold"
                    >${data.recipe.laborCosts[0].totalLaborCost.toFixed(2)}</span
                  >
                </div>
              </div>
            </div>

            <!-- Total cost -->
            <div class="mt-6 p-4 bg-muted rounded-lg">
              <div class="flex items-center justify-between">
                <span class="font-medium">Total Recipe Cost:</span>
                <span class="font-bold text-lg">
                  ${(data.recipe.foodCost + data.recipe.laborCosts[0].totalLaborCost).toFixed(2)}
                </span>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      {/if}
    </div>
  {/if}

  {#if activeTab === 'ingredients'}
    <div class="space-y-6" in:fade={{ duration: 200 }}>
      <Card.Root>
        <Card.Header>
          <Card.Title>Ingredients</Card.Title>
          <Card.Description>
            All ingredients needed for {data.recipe.servings} servings
          </Card.Description>
        </Card.Header>
        <Card.Content>
          {#if data.recipe.ingredients && data.recipe.ingredients.length > 0}
            <ul class="space-y-3">
              {#each data.recipe.ingredients as ingredient}
                <li class="flex justify-between items-center py-2 border-b last:border-0">
                  <div class="flex items-start gap-2">
                    <Utensils class="h-4 w-4 text-muted-foreground mt-1" />
                    <div class="ml-2 mt-1">
                      <p class="mb-3">{instruction.instruction}</p>

                      <!-- Step image if available -->
                      {#if instruction.imageUrl}
                        <div class="mt-3 mb-3">
                          <img
                            src={instruction.imageUrl}
                            alt={`Step ${instruction.stepNumber}`}
                            class="rounded-lg max-h-64 object-cover"
                          />
                        </div>
                      {/if}

                      <!-- Additional information -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        {#if instruction.timeInMinutes}
                          <div class="flex items-center gap-2">
                            <Clock class="h-4 w-4 text-muted-foreground" />
                            <span class="text-sm">{instruction.timeInMinutes} minutes</span>
                          </div>
                        {/if}

                        {#if instruction.temperature}
                          <div class="flex items-center gap-2">
                            <Thermometer class="h-4 w-4 text-muted-foreground" />
                            <span class="text-sm"
                              >{instruction.temperature}°{instruction.temperatureUnit || 'C'}</span
                            >
                          </div>
                        {/if}
                      </div>

                      <!-- Warnings and tips -->
                      {#if instruction.techniqueTips || instruction.warningNotes || instruction.isCritical}
                        <div class="mt-3 space-y-2">
                          {#if instruction.isCritical}
                            <div
                              class="flex items-start gap-2 p-2 bg-amber-50 border border-amber-200 rounded-lg"
                            >
                              <AlertTriangle class="h-4 w-4 text-amber-500 mt-0.5" />
                              <p class="text-sm text-amber-800">
                                This is a critical step! Pay extra attention.
                              </p>
                            </div>
                          {/if}

                          {#if instruction.techniqueTips}
                            <div
                              class="flex items-start gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg"
                            >
                              <ChefHat class="h-4 w-4 text-blue-500 mt-0.5" />
                              <p class="text-sm text-blue-800">{instruction.techniqueTips}</p>
                            </div>
                          {/if}

                          {#if instruction.warningNotes}
                            <div
                              class="flex items-start gap-2 p-2 bg-red-50 border border-red-200 rounded-lg"
                            >
                              <AlertTriangle class="h-4 w-4 text-red-500 mt-0.5" />
                              <p class="text-sm text-red-800">{instruction.warningNotes}</p>
                            </div>
                          {/if}
                        </div>
                      {/if}
                    </div>
                  </div>
                </li>
              {/each}
            </ul>
          {:else}
            <p class="text-muted-foreground italic">
              No instructions have been added to this recipe yet.
            </p>
          {/if}
        </Card.Content>
      </Card.Root>
    </div>
  {/if}

  {#if activeTab === 'equipment'}
    <div class="space-y-6" in:fade={{ duration: 200 }}>
      <Card.Root>
        <Card.Header>
          <Card.Title>Required Equipment</Card.Title>
          <Card.Description>Tools and equipment needed for this recipe</Card.Description>
        </Card.Header>
        <Card.Content>
          {#if data.recipe.equipment && data.recipe.equipment.length > 0}
            <ul class="space-y-3">
              {#each data.recipe.equipment as equipment}
                <li class="flex items-start gap-3 py-3 border-b last:border-0">
                  <div class="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
                    <Utensils class="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 class="font-medium">{equipment.equipment.name}</h4>

                    {#if equipment.equipment.description}
                      <p class="text-sm text-muted-foreground">{equipment.equipment.description}</p>
                    {/if}

                    {#if equipment.notes}
                      <p class="text-sm mt-1 p-2 bg-muted rounded-md">{equipment.notes}</p>
                    {/if}
                  </div>
                </li>
              {/each}
            </ul>
          {:else}
            <p class="text-muted-foreground italic">
              No equipment has been specified for this recipe.
            </p>
          {/if}
        </Card.Content>
      </Card.Root>
    </div>
  {/if}

  {#if activeTab === 'safety'}
    <div class="space-y-6" in:fade={{ duration: 200 }}>
      <!-- Critical Control Points -->
      <Card.Root>
        <Card.Header>
          <Card.Title class="flex items-center gap-2">
            <AlertTriangle class="h-4 w-4 text-amber-500" />
            Critical Control Points
          </Card.Title>
          <Card.Description>Important safety checkpoints during preparation</Card.Description>
        </Card.Header>
        <Card.Content>
          {#if data.recipe.criticalPoints && data.recipe.criticalPoints.length > 0}
            <ul class="space-y-4">
              {#each data.recipe.criticalPoints as point}
                <li class="p-3 border border-amber-200 bg-amber-50 rounded-lg">
                  <div class="flex justify-between items-start">
                    <h4 class="font-medium">Step {point.stepNumber}</h4>
                    {#if point.threshold && point.unit}
                      <Badge variant="outline" class="bg-amber-100 text-amber-800 border-amber-300">
                        {point.threshold}
                        {point.unit}
                      </Badge>
                    {/if}
                  </div>
                  <p class="mt-1 text-amber-800">{point.description}</p>
                  <div class="mt-2 p-2 bg-white rounded border border-amber-200">
                    <span class="text-sm font-medium">Required Action:</span>
                    <p class="text-sm mt-1">{point.action}</p>
                  </div>
                </li>
              {/each}
            </ul>
          {:else}
            <p class="text-muted-foreground italic">
              No critical control points have been defined for this recipe.
            </p>
          {/if}
        </Card.Content>
      </Card.Root>
    </div>
  {/if}
  <!-- Temperature Control Points -->
  <Card.Root>
    <Card.Header>
      <Card.Title class="flex items-center gap-2">
        <Thermometer class="h-4 w-4 text-blue-500" />
        Temperature Controls
      </Card.Title>
      <Card.Description>Specific temperature requirements for food safety</Card.Description>
    </Card.Header>
    <Card.Content>
      {#if data.recipe.temperatures && data.recipe.temperatures.length > 0}
        <ul class="space-y-4">
          {#each data.recipe.temperatures as temp}
            <li
              class="p-3 border rounded-lg {temp.isCritical
                ? 'border-blue-200 bg-blue-50'
                : 'border-muted bg-muted/50'}"
            >
              <div class="flex justify-between items-center">
                <h4 class="font-medium">Step {temp.stepNumber}</h4>
                {#if temp.isCritical}
                  <Badge variant="outline" class="bg-blue-100 text-blue-800 border-blue-300">
                    Critical
                  </Badge>
                {/if}
              </div>

              <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="flex items-center gap-2">
                  <Flame class="h-4 w-4 text-muted-foreground" />
                  <span class="text-sm">
                    {temp.minTemp}°C - {temp.maxTemp}°C
                  </span>
                </div>

                {#if temp.holdTime}
                  <div class="flex items-center gap-2">
                    <Clock class="h-4 w-4 text-muted-foreground" />
                    <span class="text-sm">Hold for {temp.holdTime} minutes</span>
                  </div>
                {/if}
              </div>

              {#if temp.description}
                <p
                  class="mt-2 text-sm {temp.isCritical ? 'text-blue-800' : 'text-muted-foreground'}"
                >
                  {temp.description}
                </p>
              {/if}
            </li>
          {/each}
        </ul>
      {:else}
        <p class="text-muted-foreground italic">
          No temperature control points have been defined for this recipe.
        </p>
      {/if}
    </Card.Content>
  </Card.Root>

  <!-- Storage Instructions -->
  {#if data.recipe.storage}
    <Card.Root>
      <Card.Header>
        <Card.Title>Storage Instructions</Card.Title>
        <Card.Description>How to properly store this dish</Card.Description>
      </Card.Header>
      <Card.Content>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-3 bg-muted rounded-lg">
              <h4 class="font-medium mb-2">Storage Method</h4>
              <p>{data.recipe.storage.method}</p>
            </div>

            <div class="p-3 bg-muted rounded-lg">
              <h4 class="font-medium mb-2">Shelf Life</h4>
              <p>
                {#if data.recipe.storage.shelfLife > 24}
                  {Math.floor(data.recipe.storage.shelfLife / 24)} days
                  {data.recipe.storage.shelfLife % 24 > 0
                    ? `and ${data.recipe.storage.shelfLife % 24} hours`
                    : ''}
                {:else}
                  {data.recipe.storage.shelfLife} hours
                {/if}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#if data.recipe.storage.temperature}
              <div class="p-3 bg-muted rounded-lg">
                <h4 class="font-medium mb-2">Storage Temperature</h4>
                <p>{data.recipe.storage.temperature}°C</p>
              </div>
            {/if}

            {#if data.recipe.storage.containerType}
              <div class="p-3 bg-muted rounded-lg">
                <h4 class="font-medium mb-2">Container Type</h4>
                <p>{data.recipe.storage.containerType}</p>
              </div>
            {/if}
          </div>

          {#if data.recipe.storage.specialNotes}
            <div class="p-3 border border-blue-200 bg-blue-50 rounded-lg">
              <h4 class="font-medium mb-2 flex items-center gap-2">
                <AlertTriangle class="h-4 w-4 text-blue-500" />
                Special Notes
              </h4>
              <p class="text-blue-800">{data.recipe.storage.specialNotes}</p>
            </div>
          {/if}
        </div>
      </Card.Content>
    </Card.Root>
  {/if}

  <!-- <!-- Ingredients Section --> -->
  <!-- {#if data.recipe.ingredients} -->
  <!--   <Card.Root> -->
  <!--     <Card.Header> -->
  <!--       <Card.Title>Ingredients</Card.Title> -->
  <!--     </Card.Header> -->
  <!--     <Card.Content> -->
  <!--       <ul class="space-y-4"> -->
  <!--         {#each data.recipe.ingredients as ingredient} -->
  <!--           <li class="flex justify-between items-center"> -->
  <!--             <div> -->
  <!--               <span class="font-medium">{ingredient.ingredient.name}</span> -->
  <!--               {#if ingredient.processingInstructions} -->
  <!--                 <p class="text-sm text-muted-foreground">{ingredient.processingInstructions}</p> -->
  <!--               {/if} -->
  <!--             </div> -->
  <!--             <div class="text-right"> -->
  <!--               <span class="font-medium">{ingredient.quantity} {ingredient.unit}</span> -->
  <!--               {#if ingredient.cost} -->
  <!--                 <p class="text-xs text-muted-foreground">${ingredient.cost.toFixed(2)}</p> -->
  <!--               {/if} -->
  <!--             </div> -->
  <!--           </li> -->
  <!--         {/each} -->
  <!--       </ul> -->
  <!--     {:else} -->
  <!--       <p class="text-muted-foreground italic">No ingredients have been added to this recipe yet.</p> -->
  <!--     {/if} -->
  <!--     </Card.Content> -->
  <!--   </Card.Root> -->
  <!-- {/if} -->
  <!---->
  <!--           <!-- Substitutions if available --> -->
  <!--           {#if data.recipe.ingredients && data.recipe.ingredients.some(ing => ing.substituteIngredients && ing.substituteIngredients.length > 0)} -->
  <!--             <Card.Root> -->
  <!--               <Card.Header> -->
  <!--                 <Card.Title>Substitutions</Card.Title> -->
  <!--                 <Card.Description>Optional ingredient substitutions</Card.Description> -->
  <!--               </Card.Header> -->
  <!--               <Card.Content> -->
  <!--                 <ul class="space-y-3"> -->
  <!--                   {#each data.recipe.ingredients.filter(ing => ing.substituteIngredients && ing.substituteIngredients.length > 0) as ingredient} -->
  <!--                     <li class="py-2 border-b last:border-0"> -->
  <!--                       <div class="flex justify-between items-center"> -->
  <!--                         <span class="font-medium">{ingredient.ingredient.name}</span> -->
  <!--                         <span>{ingredient.quantity} {ingredient.unit}</span> -->
  <!--                       </div> -->
  <!--                       <div class="mt-2"> -->
  <!--                         <span class="text-sm text-muted-foreground">Can be substituted with:</span> -->
  <!--                         <div class="mt-1 flex flex-wrap gap-2"> -->
  <!--                           {#each ingredient.substituteIngredients as subId} -->
  <!--                             {#if subId && data.ingredients && data.ingredients[subId]} -->
  <!--                               <Badge variant="outline">{data.ingredients[subId].name}</Badge> -->
  <!--                             {/if} -->
  <!--                           {/each} -->
  <!--                         </div> -->
  <!--                       </div> -->
  <!--                     </li> -->
  <!--                   {/each} -->
  <!--                 </ul> -->
  <!--               </Card.Content> -->
  <!--             </Card.Root> -->
  <!--           {/if} -->
  <!--         </div> -->
  <!--       {/if} -->
  <!---->
  <!--       {#if activeTab === 'instructions'} -->
  <!--         <div class="space-y-6" in:fade={{ duration: 200 }}> -->
  <!--           <Card.Root> -->
  <!--             <Card.Header> -->
  <!--               <Card.Title>Preparation Instructions</Card.Title> -->
  <!--               <Card.Description>Step-by-step cooking guide</Card.Description> -->
  <!--             </Card.Header> -->
  <!--             <Card.Content> -->
  <!--               {#if data.recipe.instructions && data.recipe.instructions.length > 0} -->
  <!--                 <ol class="space-y-6 mt-2"> -->
  <!--                   {#each data.recipe.instructions as instruction} -->
  <!--                     <li class="relative pl-10 pb-6 border-l last:border-l-0 border-l-muted"> -->
  <!--                       <span class="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium"> -->
  <!--                         {instruction.stepNumber} -->
  <!--                       </span> -->
  <!---->
  <!--                       <div class="ml-2 mt-1"> -->
  <!--                         <p class="mb-3">{instruction.instruction}</p> -->
  <!---->
  <!--                         <!-- Step image if available --> -->
  <!--                         {#if instruction.imageUrl} -->
  <!--                           <div class="mt-3 mb-3"> -->
  <!--                             <img  -->
  <!--                               src={instruction.imageUrl}  -->
  <!--                               alt={`Step ${instruction.stepNumber}`}  -->
  <!--                               class="rounded-lg max-h-64 object-cover" -->
  <!--                             /> -->
  <!--                           </div> -->
  <!--                         {/if} -->
</div>

<script lang="ts">
  import type { PageProps } from './$types';
  import { fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { goto } from '$app/navigation';
  // Import Lucide icons
  import {
    ChevronLeft,
    Clock,
    DollarSign,
    Utensils,
    ListOrdered,
    Heart,
    Printer,
    Share2,
    Users,
    Star
  } from 'lucide-svelte';
  // Import shadcn components
  import { Button } from '$lib/components/ui/button';
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
  } from '$lib/components/ui/card';
  import { Separator } from '$lib/components/ui/separator';
  import { Badge } from '$lib/components/ui/badge';
  import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';

  // Get the recipe data
  let { data }: PageProps = $props();

  // Function to go back to recipe list
  function goBack() {
    goto('/dashboard/kitchen');
  }

  // Calculate difficulty based on ingredients and steps
  const difficulty =
    data.recipe.ingredients.length > 8 || data.recipe.instructions.length > 6
      ? 'Advanced'
      : data.recipe.ingredients.length > 5 || data.recipe.instructions.length > 4
        ? 'Intermediate'
        : 'Easy';
</script>

<div class="container mx-auto py-8 px-4 max-w-5xl" in:fade={{ duration: 300, easing: quintOut }}>
  <div class="flex justify-between items-center mb-6">
    <Button variant="outline" size="sm" onclick={goBack} class="flex items-center gap-1">
      <ChevronLeft class="h-4 w-4" />
      <span>Back to recipes</span>
    </Button>

    <div class="flex gap-2">
      <Button variant="ghost" size="icon" class="rounded-full" aria-label="Favorite">
        <Heart class="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" class="rounded-full" aria-label="Print">
        <Printer class="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" class="rounded-full" aria-label="Share">
        <Share2 class="h-4 w-4" />
      </Button>
    </div>
  </div>

  <Card>
    <div class="relative h-80 sm:h-96 overflow-hidden">
      <img
        src={data.recipe.imageUrl}
        alt={data.recipe.description}
        class="w-full h-full object-cover rounded-sm"
        loading="lazy"
      />
      <div
        class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6"
      >
        <Badge variant="outline" class="bg-primary/20 text-primary-foreground mb-2"
          >Chef's Choice</Badge
        >
        <h1 class="text-3xl sm:text-4xl font-bold text-white">{data.recipe.name}</h1>
      </div>
    </div>

    <CardHeader>
      <div class="flex justify-between items-start">
        <div>
          <CardTitle class="text-2xl">{data.recipe.name}</CardTitle>
          <CardDescription class="mt-1.5 text-base">{data.recipe.description}</CardDescription>
        </div>
        <Badge
          variant={difficulty === 'Easy'
            ? 'outline'
            : difficulty === 'Intermediate'
              ? 'secondary'
              : 'default'}
        >
          {difficulty}
        </Badge>
      </div>

      <div class="flex flex-wrap gap-6 mt-4">
        <div class="flex items-center">
          <Clock class="h-5 w-5 mr-2 text-muted-foreground" />
          <span>{data.recipe.cookTime} minutes</span>
        </div>
        <div class="flex items-center">
          <DollarSign class="h-5 w-5 mr-2 text-muted-foreground" />
          <span>${data.recipe.foodCost}</span>
        </div>
        <div class="flex items-center">
          <Utensils class="h-5 w-5 mr-2 text-muted-foreground" />
          <span>{data.recipe.ingredients.length} ingredients</span>
        </div>
        <div class="flex items-center">
          <Users class="h-5 w-5 mr-2 text-muted-foreground" />
          <span>Serves 4</span>
        </div>
      </div>

      <div class="flex items-center mt-4">
        {#each Array(5) as _, i}
          <Star class="h-4 w-4 {i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-muted'}" />
        {/each}
        <span class="ml-2 text-sm text-muted-foreground">4.0 (24 reviews)</span>
      </div>
    </CardHeader>

    <Separator />

    <CardContent class="pt-6">
      <!-- Chef's note -->
      <div class="bg-muted/50 rounded-lg p-4 mb-8">
        <div class="flex items-start gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Chef" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 class="font-semibold text-sm">Chef's Note</h3>
            <p class="text-sm text-muted-foreground mt-1">
              For best results, let the ingredients come to room temperature before starting. This
              recipe works well with seasonal substitutions.
            </p>
          </div>
        </div>
      </div>

      <!-- Ingredients section -->
      <div class="mb-8">
        <div class="flex items-center mb-4">
          <Utensils class="h-5 w-5 mr-2" />
          <h2 class="text-xl font-semibold">Ingredients</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          {#each data.recipe.ingredients as ingredient}
            <div class="flex items-start py-2 border-b border-muted">
              <div
                class="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0"
              >
                <span class="text-xs text-primary">{ingredient.ingredient.name.charAt(0)}</span>
              </div>
              <div>
                <span class="font-medium">{ingredient.ingredient.name}</span>
                <div class="text-sm text-muted-foreground">
                  {ingredient.amount}
                  {ingredient.unit}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <Separator class="my-6" />

      <!-- Instructions section -->
      <div>
        <div class="flex items-center mb-4">
          <ListOrdered class="h-5 w-5 mr-2" />
          <h2 class="text-xl font-semibold">Instructions</h2>
        </div>
        <div class="space-y-4">
          {#each data.recipe.instructions as instruction, i}
            <div class="flex gap-4">
              <div
                class="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium"
              >
                {i + 1}
              </div>
              <div class="pt-1 pb-6 border-l border-muted pl-6 ml-3 flex-1">
                <p>{instruction.description}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </CardContent>

    <CardFooter
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/50 px-6 py-4"
    >
      <div class="text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleDateString()}
      </div>
      <Button>Edit Recipe</Button>
    </CardFooter>
  </Card>
</div>

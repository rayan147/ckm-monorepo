<!-- src/lib/recipe/RecipeVisuals.svelte -->
<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import * as Carousel from '$lib/components/ui/carousel';
  import { Badge } from '$lib/components/ui/badge';
  import { Separator } from '$lib/components/ui/separator';
  import { AspectRatio } from '$lib/components/ui/aspect-ratio';
  import { Clock, Flame, Users, DollarSign, BarChart, Leaf } from 'lucide-svelte';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';

  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;
</script>

<article aria-labelledby="recipe-visual-info" class="space-y-8">
  <h2 id="recipe-visual-info" class="sr-only">Recipe Visual Information</h2>

  <!-- Image Carousel -->
  <figure>
    <figcaption class="sr-only">{recipe.name} image gallery</figcaption>
    <Carousel.Root class="w-auto group mr-3">
      <Carousel.Content>
        {#each recipe.imageUrls as image, i (i)}
          <Carousel.Item>
            <AspectRatio
              ratio={12 / 10}
              class="aspect-square overflow-hidden rounded-xl transition-transform hover:scale-105"
            >
              <img
                src={image}
                alt={`${recipe.name} image ${i + 1}`}
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
    <h3 id="recipe-details-heading" class="sr-only">Recipe Quick Details</h3>
    <Card.Root class="w-full hover:shadow-lg transition-shadow mx-2">
      <Card.Header>
        <Card.Title>Recipe Details</Card.Title>
      </Card.Header>
      <Card.Content>
        <dl class="grid grid-cols-2 gap-4">
          <div class="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
            <Clock class="h-4 w-4 text-primary" aria-hidden="true" />
            <div>
              <dt class="text-sm text-gray-600">Prep Time</dt>
              <dd class="font-semibold">{recipeState.formatTime(recipe.prepTime)}</dd>
            </div>
          </div>
          <!-- Additional details omitted for brevity -->
        </dl>

        {#if recipe.dietaryRestrictions && recipe.dietaryRestrictions.length > 0}
          <Separator class="my-4" />
          <div>
            <h4 class="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Leaf class="h-4 w-4 text-primary" />
              Dietary Info
            </h4>
            <div class="flex flex-wrap gap-2 mt-2">
              {#each recipe.dietaryRestrictions as restriction}
                <Badge variant="outline" class="text-xs">{restriction.name}</Badge>
              {/each}
            </div>
          </div>
        {/if}
      </Card.Content>
    </Card.Root>
  </section>
</article>

<!-- src/lib/recipe/components/ImageModal.svelte -->
<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import { Button } from '$lib/components/ui/button';
  import { AspectRatio } from '$lib/components/ui/aspect-ratio';
  import { X } from 'lucide-svelte';
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';

  const recipeState = getRecipeContext();
</script>

{#if recipeState.showImageModal}
  <AlertDialog.Root open={recipeState.showImageModal}>
    <AlertDialog.Content class="max-w-4xl p-1">
      <div class="absolute top-2 right-2 z-10">
        <Button
          variant="outline"
          size="icon"
          class="h-8 w-8 rounded-full bg-white/80"
          onclick={() => recipeState.closeImageModal()}
        >
          <X class="h-4 w-4" />
        </Button>
      </div>
      <figure>
        <AspectRatio ratio={16 / 9} class="bg-muted rounded-md">
          <img
            src={recipeState.currentImage}
            alt={recipeState.currentImageAlt}
            class="h-full w-full object-contain"
          />
        </AspectRatio>
        <figcaption class="mt-2 text-center text-sm text-gray-500">
          {recipeState.currentImageAlt}
        </figcaption>
      </figure>
    </AlertDialog.Content>
  </AlertDialog.Root>
{/if}

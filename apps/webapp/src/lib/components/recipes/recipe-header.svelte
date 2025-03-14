<!-- src/lib/recipe/RecipeHeader.svelte -->
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { ArrowLeft, Heart, Printer, Share2 } from 'lucide-svelte';

  let { goBack } = $props();
</script>

<header class="flex justify-between items-center mb-8">
  <nav aria-label="Main navigation">
    <Button
      variant="ghost"
      size="icon"
      onclick={goBack}
      class="h-12 w-12 hover:bg-muted/50 transition-colors rounded-lg"
      aria-label="Go back"
    >
      <ArrowLeft class="h-5 w-5" aria-hidden="true" />
    </Button>
  </nav>

  <nav aria-label="Recipe actions">
    <ul class="flex items-center gap-4">
      <li>
        <Button
          variant="outline"
          size="sm"
          class="flex items-center gap-1 hover:bg-primary/10 transition-colors rounded-lg"
          aria-label="Save recipe"
        >
          <Heart class="h-4 w-4" aria-hidden="true" />
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
          <Printer class="h-4 w-4" aria-hidden="true" />
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
          <Share2 class="h-4 w-4" aria-hidden="true" />
          <span class="hidden md:inline">Share</span>
        </Button>
      </li>
    </ul>
  </nav>
</header>

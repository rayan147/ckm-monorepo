<script>
  import * as Card from '$lib/components/ui/card';
  import { Star, StarHalf } from 'lucide-svelte';

  let { name = '', rating = 0, date = '', comment = '' } = $props();
</script>

<Card.Root>
  <Card.Content class="pt-6">
    <div class="flex justify-between items-start">
      <div>
        <p class="font-semibold text-foreground">{name}</p>
        <div class="flex items-center mt-1">
          <div class="flex items-center">
            {#each Array(5) as _, i}
              {#if i < Math.floor(rating)}
                <Star class="w-4 h-4 text-amber-400 fill-current" />
              {:else if i < rating && rating % 1 !== 0}
                <StarHalf class="w-4 h-4 text-amber-400 fill-current" />
              {:else}
                <Star class="w-4 h-4 text-muted-foreground/30" />
              {/if}
            {/each}
          </div>
          <span class="text-xs text-muted-foreground ml-2">{date}</span>
        </div>
      </div>
    </div>
    {#if comment}
      <div class="mt-2">
        <p class="text-sm text-muted-foreground">{comment}</p>
      </div>
    {/if}
  </Card.Content>
</Card.Root>

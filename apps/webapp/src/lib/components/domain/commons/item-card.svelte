<script>
  import * as Card from '$lib/components/ui/card';
  import { TrendingUp, TrendingDown } from 'lucide-svelte';

  let {
    name = '',
    value,
    subValue = '',
    label = '',
    subLabel = '',
    trend = 'neutral' // "up", "down", or "neutral"
  } = $props();
</script>

<Card.Root>
  <Card.Content class="pt-6">
    <div class="flex justify-between">
      <div>
        <p class="font-semibold text-foreground">{name}</p>
        <div class="flex items-center mt-1">
          <span class="text-lg font-medium">{value}</span>
          <span class="text-xs text-muted-foreground ml-1">{label}</span>

          {#if trend === 'up'}
            <TrendingUp class="h-4 w-4 text-emerald-500 ml-2" />
          {:else if trend === 'down'}
            <TrendingDown class="h-4 w-4 text-rose-500 ml-2" />
          {/if}
        </div>
      </div>
      {#if subValue}
        <div class="text-right">
          <p class="text-lg font-medium">{subValue}</p>
          <p class="text-xs text-muted-foreground">{subLabel}</p>
        </div>
      {/if}
    </div>
  </Card.Content>
</Card.Root>

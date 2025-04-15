<script>
  import { TrendingUp, TrendingDown } from 'lucide-svelte';
  import * as Card from '$lib/components/ui/card';

  let {
    title = '',
    value = '',
    trend = 'neutral', // "up", "down", or "neutral"
    change = '',
    period = '',
    icon: Icon = null
  } = $props();
</script>

<Card.Root class="h-full">
  <Card.Content class="pt-6">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-muted-foreground">{title}</p>
        <p class="text-2xl font-bold mt-1">{value}</p>
      </div>
      {#if Icon}
        <div class="bg-primary/10 p-2 rounded-full">
          <Icon class="h-5 w-5 text-primary" />
        </div>
      {/if}
    </div>
    <div class="mt-2 flex items-center text-sm">
      {#if trend === 'up'}
        <TrendingUp class="h-4 w-4 text-emerald-500 mr-1" />
        <span class="text-emerald-500 font-medium">{change}</span>
      {:else if trend === 'down'}
        <TrendingDown class="h-4 w-4 text-rose-500 mr-1" />
        <span class="text-rose-500 font-medium">{change}</span>
      {/if}
      {#if period}
        <span class="text-muted-foreground ml-1">{period}</span>
      {/if}
    </div>
  </Card.Content>
</Card.Root>

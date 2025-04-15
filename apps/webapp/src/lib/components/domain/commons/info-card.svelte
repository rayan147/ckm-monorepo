<script>
  import * as Card from '$lib/components/ui/card';

  let { title = '', value = '', description = '', icon: Icon = null } = $props();
</script>

<Card.Root>
  <Card.Content class="pt-6">
    <div class="flex">
      {#if Icon}
        <div class="flex-shrink-0">
          <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon class="h-5 w-5 text-primary" />
          </div>
        </div>
      {/if}
      <div class={Icon ? 'ml-4' : ''}>
        <p class="font-semibold text-foreground">{title}</p>
        {#if value}
          <p class="text-sm font-medium text-primary mt-0.5">{value}</p>
        {/if}
        {#if description}
          <p class="text-sm text-muted-foreground mt-1">{description}</p>
        {/if}
      </div>
    </div>
  </Card.Content>
</Card.Root>

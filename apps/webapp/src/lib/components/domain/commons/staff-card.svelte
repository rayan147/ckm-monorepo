<script>
  import * as Card from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';

  let { name = '', position = '', metrics = '', avatar = '' } = $props();
</script>

<Card.Root>
  <Card.Content class="pt-6">
    <div class="flex items-center">
      <Avatar class="h-10 w-10">
        {#if avatar}
          <AvatarImage src={avatar} alt={name} />
        {/if}
        <AvatarFallback class="bg-primary/10 text-primary">{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div class="ml-4 flex-1">
        <div class="flex justify-between items-start">
          <div>
            <p class="font-semibold text-foreground">{name}</p>
            <p class="text-sm text-muted-foreground">{position}</p>
          </div>
          <Badge variant="success" class="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            Top Performer
          </Badge>
        </div>
        {#if metrics}
          <div class="mt-1">
            <p class="text-sm text-muted-foreground">{metrics}</p>
          </div>
        {/if}
      </div>
    </div>
  </Card.Content>
</Card.Root>

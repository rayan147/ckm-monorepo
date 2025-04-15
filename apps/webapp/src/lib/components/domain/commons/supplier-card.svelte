<script>
  import * as Card from '$lib/components/ui/card';
  import { BarChart3, Phone } from 'lucide-svelte';
  import { Badge } from '$lib/components/ui/badge';

  let { name = '', category = '', metrics = '', contact = '' } = $props();
</script>

<Card.Root>
  <Card.Content class="pt-6">
    <div class="flex flex-col">
      <div class="flex justify-between items-start">
        <div>
          <p class="font-semibold text-foreground">{name}</p>
          <p class="text-sm text-muted-foreground">{category}</p>
        </div>
        <Badge variant="secondary">Supplier</Badge>
      </div>
      <div class="mt-3 space-y-2">
        <div class="flex items-start">
          <BarChart3 class="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
          <p class="text-sm text-muted-foreground">{metrics}</p>
        </div>
        <div class="flex items-start">
          <Phone class="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
          <p class="text-sm text-muted-foreground">{contact}</p>
        </div>
      </div>
    </div>
  </Card.Content>
</Card.Root>

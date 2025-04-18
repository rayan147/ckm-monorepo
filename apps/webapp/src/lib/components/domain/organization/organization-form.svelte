<!-- src/lib/components/organization/OrganizationForm.svelte -->
<script lang="ts">
  import { createOrganization, updateOrganization } from '$lib/api/organizations';
  import * as Card from '$lib/components/ui/card/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Building2, ImageIcon, X, Loader2 } from 'lucide-svelte';
  import type { Organization } from '$lib/types/models';

  const { organization, onSuccess = $bindable() } = $props<{
    organization?: Organization;
    onSuccess?: () => void;
  }>();

  // Form state
  let name = $state(organization?.name || '');
  let imageUrl = $state(organization?.imageUrl || '');
  let errors = $state<Record<string, string>>({});
  let isSubmitting = $state(false);
  let submitError = $state<string | null>(null);

  // Validation
  $effect(() => {
    validateForm();
  });

  function validateForm() {
    let newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Organization name is required';
    } else if (name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (imageUrl && !isValidUrl(imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }

    errors = newErrors;
  }

  function isValidUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  async function handleSubmit() {
    validateForm();

    if (Object.keys(errors).length > 0) {
      return; // Don't submit if there are validation errors
    }

    try {
      isSubmitting = true;
      submitError = null;

      if (organization) {
        // Update existing organization
        await updateOrganization(organization.id, { name, imageUrl });
      } else {
        // Create new organization
        await createOrganization({ name, imageUrl });
      }

      // Call success callback
      onSuccess?.();
    } catch (error) {
      submitError = error instanceof Error ? error.message : 'Failed to save organization';
      console.error(submitError);
    } finally {
      isSubmitting = false;
    }
  }

  function clearImageUrl() {
    imageUrl = '';
  }
</script>

<form onsubmit={handleSubmit}>
  <Card.Root>
    <Card.Header>
      <Card.Title>{organization ? 'Edit Organization' : 'Create Organization'}</Card.Title>
      <Card.Description>
        {organization
          ? 'Update the details of your organization'
          : 'Add a new organization to your system'}
      </Card.Description>
    </Card.Header>

    <Card.Content class="space-y-6">
      <!-- Organization name field -->
      <div class="space-y-2">
        <Label for="name">Organization Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter organization name"
          bind:value={name}
          class={errors.name ? 'border-destructive' : ''}
        />
        {#if errors.name}
          <p class="text-sm text-destructive">{errors.name}</p>
        {/if}
      </div>

      <!-- Organization image URL field -->
      <div class="space-y-2">
        <Label for="imageUrl">Logo URL</Label>
        <div class="flex items-center space-x-2">
          <div class="relative flex-1">
            <Input
              id="imageUrl"
              type="text"
              placeholder="https://example.com/logo.png"
              bind:value={imageUrl}
              class={errors.imageUrl ? 'border-destructive pr-10' : 'pr-10'}
            />
            {#if imageUrl}
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-500"
                onclick={clearImageUrl}
              >
                <X class="h-4 w-4" />
              </button>
            {/if}
          </div>

          <div class="h-10 w-10 border rounded flex items-center justify-center">
            {#if imageUrl && isValidUrl(imageUrl)}
              <img
                src={imageUrl}
                alt="Logo preview"
                class="h-full w-full object-cover rounded"
                onerror={() => (errors.imageUrl = 'Invalid image URL')}
              />
            {:else}
              <ImageIcon class="h-5 w-5 text-muted-foreground" />
            {/if}
          </div>
        </div>

        {#if errors.imageUrl}
          <p class="text-sm text-destructive">{errors.imageUrl}</p>
        {/if}
      </div>

      {#if submitError}
        <div class="bg-destructive/10 text-destructive px-4 py-3 rounded-md">
          {submitError}
        </div>
      {/if}
    </Card.Content>

    <Card.Footer class="flex justify-end space-x-4">
      <Button type="button" variant="outline" onclick={() => onSuccess?.()}>Cancel</Button>
      <Button type="submit" disabled={isSubmitting}>
        {#if isSubmitting}
          <Loader2 class="mr-2 h-4 w-4 animate-spin" />
          {organization ? 'Updating...' : 'Creating...'}
        {:else}
          {organization ? 'Update Organization' : 'Create Organization'}
        {/if}
      </Button>
    </Card.Footer>
  </Card.Root>
</form>

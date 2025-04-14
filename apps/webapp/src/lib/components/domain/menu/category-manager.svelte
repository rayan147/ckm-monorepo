<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Label } from '$lib/components/ui/label';
  import { Button } from '$lib/components/ui/button';
  import { AlertCircle, Trash2 } from 'lucide-svelte';

  interface Category {
    id: number | null;
    name: string;
    description: string | null;
    displayOrder: number;
  }

  interface Props {
    category: Category;
    onSave: (category: Category) => void;
    onCancel: () => void;
    onDelete?: (categoryId: number) => void;
  }

  let { category, onSave, onCancel, onDelete }: Props = $props();

  // Local state
  let editingCategory = $state<Category>({ ...category });
  let errors = $state<Record<string, string>>({});

  // Form validation
  function validateForm() {
    const newErrors: Record<string, string> = {};

    if (!editingCategory.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (editingCategory.displayOrder < 0) {
      newErrors.displayOrder = 'Display order cannot be negative';
    }

    errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  // Form submission
  function handleSubmit() {
    if (validateForm()) {
      onSave(editingCategory);
    }
  }

  // Delete confirmation
  function handleDelete() {
    if (editingCategory.id !== null && onDelete) {
      onDelete(editingCategory.id);
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  <div class="space-y-4">
    <div class="space-y-2">
      <Label for="category-name" class={errors.name ? 'text-red-500' : ''}>Name *</Label>
      <Input
        id="category-name"
        type="text"
        bind:value={editingCategory.name}
        class={errors.name ? 'border-red-500' : ''}
        placeholder="e.g., Appetizers, Main Courses, Desserts"
      />
      {#if errors.name}
        <p class="text-xs text-red-500">{errors.name}</p>
      {/if}
    </div>

    <div class="space-y-2">
      <Label for="category-description">Description</Label>
      <Textarea
        id="category-description"
        rows={3}
        bind:value={editingCategory.description}
        placeholder="Optional description of this category"
      />
    </div>

    <div class="space-y-2">
      <Label for="category-order" class={errors.displayOrder ? 'text-red-500' : ''}
        >Display Order</Label
      >
      <Input
        id="category-order"
        type="number"
        min="0"
        bind:value={editingCategory.displayOrder}
        class={errors.displayOrder ? 'border-red-500' : ''}
      />
      {#if errors.displayOrder}
        <p class="text-xs text-red-500">{errors.displayOrder}</p>
      {:else}
        <p class="text-xs text-gray-500">Lower numbers appear first on the menu</p>
      {/if}
    </div>
  </div>

  <div class="bg-blue-50 border-l-4 border-blue-500 p-4">
    <div class="flex">
      <AlertCircle class="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
      <div>
        <h3 class="text-sm font-medium text-blue-800">About Categories</h3>
        <p class="text-sm text-blue-700">
          Categories help organize your menu items and make it easier for customers to browse your
          menu. Common categories include Appetizers, Main Courses, and Desserts.
        </p>
      </div>
    </div>
  </div>

  <div class="flex justify-between pt-4">
    <div>
      {#if editingCategory.id !== null && onDelete}
        <Button
          type="button"
          variant="destructive"
          onclick={handleDelete}
          class="flex items-center gap-1"
        >
          <Trash2 class="h-4 w-4" />
          <span>Delete</span>
        </Button>
      {/if}
    </div>

    <div class="flex gap-2">
      <Button type="button" variant="outline" onclick={onCancel}>Cancel</Button>
      <Button type="submit" variant="default">Save Category</Button>
    </div>
  </div>
</form>

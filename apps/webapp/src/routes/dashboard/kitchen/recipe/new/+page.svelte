<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import * as Tabs from '$lib/components/ui/tabs';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Label } from '$lib/components/ui/label';
  import { Badge } from '$lib/components/ui/badge';
  import { Separator } from '$lib/components/ui/separator';
  import * as Select from '$lib/components/ui/select';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Switch } from '$lib/components/ui/switch';
  import { toast } from 'svelte-sonner';
  import * as Dialog from '$lib/components/ui/dialog';
  import { quintOut } from 'svelte/easing';
  import { fade, fly } from 'svelte/transition';
  import {
    Search,
    ArrowLeft,
    Camera,
    ChevronRight,
    Clock,
    Copy,
    DollarSign,
    Edit,
    Flame,
    Link2,
    List,
    Plus,
    Save,
    Trash2,
    Users,
    X,
    PlusCircle,
    MinusCircle,
    FileImage,
    ChevronsUpDown,
    SlidersHorizontal,
    Tag as TagIcon
  } from 'lucide-svelte';
  import Chef from '$lib/images/chef.svelte';

  // import { useSortable } from '@dnd-kit-svelte/sortable';
  import type {
    Recipe,
    Ingredient,
    RecipeInstruction,
    CookBook,
    RecipeTag,
    DietaryRestriction,
    RecipeEquipment
  } from '@ckm/db';

  // Type definitions for custom types used in this file
  interface Instruction {
    id: number;
    stepNumber: number;
    text: string;
    imageUrl?: string;
    timers: Array<{
      id: number;
      label: string;
      duration: number;
    }>;
    tips: string;
  }

  interface Tag {
    id: number;
    name: string;
  }

  interface CookingEquipment {
    id: number;
    name: string;
    required: boolean;
  }

  // Props and State
  let isNew = true;
  let recipe = null;
  let loading = true;
  let saving = false;
  let activeTab = 'basic';
  let imagePreview = [];
  let imageFiles = [];
  let availableTags = [];
  let availableDietaryRestrictions = [];
  let availableCookBooks = [];
  let cookBookSearch = '';
  let tagSearch = '';
  let equipmentSearch = '';

  // For creating new items
  let newTagName = '';
  let newEquipmentName = '';
  let showAddTagDialog = false;
  let showAddEquipmentDialog = false;

  // Initialize component
  $: {
    // Check if we're creating a new recipe or editing an existing one
    const id = $page.params.id;
    isNew = id === 'new';

    // Load data when component is mounted
    if (loading) {
      loadData();
    }
  }

  // Functions
  async function loadData() {
    loading = true;
    try {
      // Load reference data (tags, dietary restrictions, cookbooks)
      await loadReferenceData();

      // If editing, load the recipe
      if (!isNew) {
        await loadRecipe();
      } else {
        // Initialize a new recipe
        recipe = createEmptyRecipe();
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      loading = false;
    }
  }

  function createEmptyRecipe() {
    return {
      id: 0, // Will be assigned by the server
      name: '',
      description: '',
      servings: 4,
      prepTime: 15,
      cookTime: 30,
      totalTime: 45,
      skillLevel: 'beginner',
      foodCost: 0,
      calories: 0,
      isPublic: true,
      isFavorite: false,
      imageUrls: [],
      ingredients: [createEmptyIngredient(1)],
      instructions: [createEmptyInstruction(1)],
      notes: '',
      source: '',
      sourceUrl: '',
      dateCreated: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      tags: [],
      ratings: [],
      dietaryRestrictions: [],
      nutritionInfo: {
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
        fiber: 0,
        sugar: 0,
        sodium: 0
      },
      cookingEquipment: []
    };
  }

  function createEmptyIngredient(id) {
    return {
      id,
      name: '',
      quantity: 1,
      unit: '',
      notes: '',
      category: 'other',
      isOptional: false,
      substitutes: []
    };
  }

  function createEmptyInstruction(id) {
    return {
      id,
      stepNumber: id,
      text: '',
      imageUrl: undefined,
      timers: [],
      tips: ''
    };
  }

  async function loadReferenceData() {
    // Simulated API calls - in a real app, these would fetch from the server
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Mock data
    availableTags = [
      { id: 1, name: 'French' },
      { id: 2, name: 'Italian' },
      { id: 3, name: 'Vegetarian' },
      { id: 4, name: 'Vegan' },
      { id: 5, name: 'Gluten-Free' },
      { id: 6, name: 'Dinner' },
      { id: 7, name: 'Lunch' },
      { id: 8, name: 'Breakfast' },
      { id: 9, name: 'Dessert' },
      { id: 10, name: 'Appetizer' },
      { id: 11, name: 'Soup' },
      { id: 12, name: 'Salad' },
      { id: 13, name: 'Quick & Easy' },
      { id: 14, name: 'Slow Cooker' },
      { id: 15, name: 'Grill' }
    ];

    availableDietaryRestrictions = [
      { id: 1, name: 'Vegetarian', description: 'No meat, poultry, or seafood' },
      { id: 2, name: 'Vegan', description: 'No animal products' },
      { id: 3, name: 'Gluten-Free', description: 'No wheat, barley, or rye' },
      { id: 4, name: 'Dairy-Free', description: 'No milk, cheese, or other dairy' },
      { id: 5, name: 'Nut-Free', description: 'No tree nuts or peanuts' },
      { id: 6, name: 'Low-Carb', description: 'Reduced carbohydrates' },
      { id: 7, name: 'Keto', description: 'High fat, very low carb' },
      { id: 8, name: 'Paleo', description: 'No processed foods, grains, or dairy' }
    ];

    availableCookBooks = [
      {
        id: 1,
        name: 'French Classics',
        category: 'International',
        description: 'Traditional French recipes',
        imageUrl: '/images/cookbook-french.jpg'
      },
      {
        id: 2,
        name: 'Italian Favorites',
        category: 'International',
        description: 'Classic Italian dishes',
        imageUrl: '/images/cookbook-italian.jpg'
      },
      {
        id: 3,
        name: 'Weeknight Dinners',
        category: 'Quick Meals',
        description: 'Fast and easy dinner recipes',
        imageUrl: '/images/cookbook-weeknight.jpg'
      },
      {
        id: 4,
        name: 'Holiday Specials',
        category: 'Seasonal',
        description: 'Special occasion recipes',
        imageUrl: '/images/cookbook-holiday.jpg'
      },
      {
        id: 5,
        name: 'Healthy Options',
        category: 'Health',
        description: 'Nutritious and balanced meals',
        imageUrl: '/images/cookbook-healthy.jpg'
      }
    ];
  }

  async function loadRecipe() {
    // Simulated API call - in a real app, this would fetch from the server
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock data for example
    recipe = {
      id: 123,
      name: 'Classic Beef Bourguignon',
      description:
        'A traditional French beef stew made with red wine, bacon, onions, and mushrooms. Perfect for a cozy winter dinner.',
      servings: 4,
      prepTime: 30,
      cookTime: 180,
      totalTime: 210,
      skillLevel: 'intermediate',
      foodCost: 25.75,
      calories: 450,
      isPublic: true,
      isFavorite: true,
      imageUrls: ['/images/beef-bourguignon-1.jpg', '/images/beef-bourguignon-2.jpg'],
      ingredients: [
        {
          id: 1,
          name: 'beef chuck',
          quantity: 2,
          unit: 'pounds',
          notes: 'cut into 1-inch cubes',
          category: 'meat',
          isOptional: false,
          substitutes: ['beef brisket', 'stewing beef']
        },
        {
          id: 2,
          name: 'bacon',
          quantity: 6,
          unit: 'slices',
          notes: 'diced',
          category: 'meat',
          isOptional: false,
          substitutes: ['pancetta']
        },
        {
          id: 3,
          name: 'red wine',
          quantity: 2,
          unit: 'cups',
          notes: 'Burgundy or Pinot Noir',
          category: 'liquids',
          isOptional: false,
          substitutes: ['beef broth']
        }
        // More ingredients would be here...
      ],
      instructions: [
        {
          id: 1,
          stepNumber: 1,
          text: 'Preheat oven to 325°F (165°C). Pat the beef dry with paper towels and season generously with salt and pepper.',
          imageUrl: '/images/beef-bourguignon-step1.jpg',
          timers: [],
          tips: 'Drying the beef is essential for proper browning.'
        },
        {
          id: 2,
          stepNumber: 2,
          text: 'In a large Dutch oven, cook the bacon over medium heat until crisp. Remove with a slotted spoon to a plate lined with paper towels. Leave the bacon fat in the pot.',
          imageUrl: '/images/beef-bourguignon-step2.jpg',
          timers: [
            {
              id: 1,
              label: 'Cook bacon',
              duration: 8
            }
          ],
          tips: "Don't discard the bacon fat - it adds flavor to the dish."
        }
        // More instructions would be here...
      ],
      notes:
        "This recipe is adapted from Julia Child's classic version but simplified for the home cook.",
      source: "Adapted from 'Mastering the Art of French Cooking'",
      sourceUrl: 'https://example.com/beef-bourguignon',
      dateCreated: '2023-10-15T14:32:00Z',
      dateModified: '2023-12-02T09:45:00Z',
      tags: [
        { id: 1, name: 'French' },
        { id: 3, name: 'Dinner' },
        { id: 7, name: 'Winter' }
      ],
      ratings: [],
      cookBook: {
        id: 1,
        name: 'French Classics',
        category: 'International',
        description: 'Traditional French recipes adapted for the modern kitchen',
        imageUrl: '/images/cookbook-french.jpg'
      },
      dietaryRestrictions: [],
      nutritionInfo: {
        calories: 450,
        fat: 22,
        carbs: 15,
        protein: 35,
        fiber: 3,
        sugar: 5,
        sodium: 820
      },
      cookingEquipment: [
        { id: 1, name: 'Dutch oven', required: true },
        { id: 2, name: 'Kitchen tongs', required: false }
      ]
    };

    // Set image previews from existing URLs
    imagePreview = [...recipe.imageUrls];
  }

  // Form submission
  function handleSubmit(event) {
    event.preventDefault();
    if (!recipe) return;

    saving = true;

    // Calculate total time if not set manually
    if (!recipe.totalTime || recipe.totalTime < recipe.prepTime + recipe.cookTime) {
      recipe.totalTime = recipe.prepTime + recipe.cookTime;
    }

    // Update modification date
    recipe.dateModified = new Date().toISOString();

    // In a real app, this would be an API call to save the recipe
    setTimeout(() => {
      toast.success(isNew ? 'Recipe created successfully!' : 'Recipe updated successfully!');

      // Navigate back to recipe detail or list
      if (isNew) {
        goto(`/dashboard/kitchen/recipe/${recipe.id || 123}`); // Use mock ID for demo
      } else {
        goto(`/dashboard/kitchen/recipe/${recipe.id}`);
      }

      saving = false;
    }, 1000);
  }

  // Image handling
  function handleImageUpload(event) {
    const target = event.target;
    if (!target.files || !recipe) return;

    const newFiles = Array.from(target.files);
    imageFiles = [...imageFiles, ...newFiles];

    // Create previews
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          imagePreview = [...imagePreview, e.target.result];
        }
      };
      reader.readAsDataURL(file);
    });

    // In a real app, you would upload files to a server and get URLs back
    // For now, just use the previews as placeholders
    recipe.imageUrls = [...imagePreview];
  }

  function removeImage(index) {
    if (!recipe) return;

    imagePreview = imagePreview.filter((_, i) => i !== index);
    imageFiles = imageFiles.filter((_, i) => i !== index);
    recipe.imageUrls = [...imagePreview];
  }

  // Ingredient handling
  function addIngredient() {
    if (!recipe) return;

    const id = Math.max(0, ...recipe.ingredients.map((ing) => ing.id)) + 1;
    recipe.ingredients = [...recipe.ingredients, createEmptyIngredient(id)];
  }

  function removeIngredient(id) {
    if (!recipe) return;

    recipe.ingredients = recipe.ingredients.filter((ing) => ing.id !== id);
  }

  function moveIngredient(fromIndex, toIndex) {
    if (!recipe) return;

    const ingredient = recipe.ingredients.splice(fromIndex, 1)[0];
    recipe.ingredients.splice(toIndex, 0, ingredient);
    recipe.ingredients = [...recipe.ingredients]; // Trigger reactivity
  }

  // Instruction handling
  function addInstruction() {
    if (!recipe) return;

    const id = Math.max(0, ...recipe.instructions.map((inst) => inst.id)) + 1;
    const stepNumber = recipe.instructions.length + 1;
    recipe.instructions = [
      ...recipe.instructions,
      {
        ...createEmptyInstruction(id),
        stepNumber
      }
    ];
  }

  function removeInstruction(id) {
    if (!recipe) return;

    recipe.instructions = recipe.instructions.filter((inst) => inst.id !== id);

    // Renumber remaining instructions
    recipe.instructions = recipe.instructions.map((inst, index) => ({
      ...inst,
      stepNumber: index + 1
    }));
  }

  function moveInstruction(fromIndex, toIndex) {
    if (!recipe) return;

    const instruction = recipe.instructions.splice(fromIndex, 1)[0];
    recipe.instructions.splice(toIndex, 0, instruction);

    // Renumber all instructions
    recipe.instructions = recipe.instructions.map((inst, index) => ({
      ...inst,
      stepNumber: index + 1
    }));
  }

  // Timer handling
  function addTimer(instructionId) {
    if (!recipe) return;

    const instruction = recipe.instructions.find((i) => i.id === instructionId);
    if (!instruction) return;

    const timerId = instruction.timers?.length
      ? Math.max(0, ...instruction.timers.map((t) => t.id)) + 1
      : 1;

    instruction.timers = [
      ...(instruction.timers || []),
      {
        id: timerId,
        label: `Timer ${timerId}`,
        duration: 5
      }
    ];

    // Update the instruction in the recipe
    recipe.instructions = recipe.instructions.map((i) =>
      i.id === instructionId ? instruction : i
    );
  }

  function removeTimer(instructionId, timerId) {
    if (!recipe) return;

    const instruction = recipe.instructions.find((i) => i.id === instructionId);
    if (!instruction || !instruction.timers) return;

    instruction.timers = instruction.timers.filter((t) => t.id !== timerId);

    // Update the instruction in the recipe
    recipe.instructions = recipe.instructions.map((i) =>
      i.id === instructionId ? instruction : i
    );
  }

  // Tag and dietary restriction handling
  function toggleTag(tag) {
    if (!recipe) return;

    const exists = recipe.tags.some((t) => t.id === tag.id);

    if (exists) {
      recipe.tags = recipe.tags.filter((t) => t.id !== tag.id);
    } else {
      recipe.tags = [...recipe.tags, tag];
    }
  }

  function toggleDietaryRestriction(restriction) {
    if (!recipe) return;

    const exists = recipe.dietaryRestrictions.some((r) => r.id === restriction.id);

    if (exists) {
      recipe.dietaryRestrictions = recipe.dietaryRestrictions.filter(
        (r) => r.id !== restriction.id
      );
    } else {
      recipe.dietaryRestrictions = [...recipe.dietaryRestrictions, restriction];
    }
  }

  function addNewTag() {
    if (!newTagName.trim()) return;

    // In a real app, this would save to the server first
    const id = Math.max(0, ...availableTags.map((t) => t.id)) + 1;
    const newTag = { id, name: newTagName };

    availableTags = [...availableTags, newTag];

    // Add it to the recipe
    if (recipe) {
      recipe.tags = [...recipe.tags, newTag];
    }

    newTagName = '';
    showAddTagDialog = false;
  }

  // Equipment handling
  function toggleEquipment(equipment) {
    if (!recipe) return;

    const exists = recipe.cookingEquipment.some((e) => e.id === equipment.id);

    if (exists) {
      recipe.cookingEquipment = recipe.cookingEquipment.filter((e) => e.id !== equipment.id);
    } else {
      recipe.cookingEquipment = [
        ...recipe.cookingEquipment,
        {
          ...equipment,
          required: true
        }
      ];
    }
  }

  function toggleEquipmentRequired(id) {
    if (!recipe) return;

    recipe.cookingEquipment = recipe.cookingEquipment.map((e) =>
      e.id === id ? { ...e, required: !e.required } : e
    );
  }

  function addNewEquipment() {
    if (!newEquipmentName.trim()) return;

    // In a real app, this would save to the server first
    const id = recipe?.cookingEquipment.length
      ? Math.max(0, ...recipe.cookingEquipment.map((e) => e.id)) + 1
      : 1;

    const newEquipment = {
      id,
      name: newEquipmentName,
      required: true
    };

    // Add it to the recipe
    if (recipe) {
      recipe.cookingEquipment = [...recipe.cookingEquipment, newEquipment];
    }

    newEquipmentName = '';
    showAddEquipmentDialog = false;
  }

  // Cookbook handling
  function handleCookBookChange(id) {
    if (!recipe) return;

    const cookBookId = parseInt(id);
    const selectedCookBook = availableCookBooks.find((c) => c.id === cookBookId);

    if (selectedCookBook) {
      recipe.cookBook = selectedCookBook;
      recipe.cookBookId = cookBookId;
    } else {
      recipe.cookBook = undefined;
      recipe.cookBookId = undefined;
    }
  }

  // Handle adding substitutes
  function addSubstitute(ingredient, inputValue) {
    if (inputValue && inputValue.trim()) {
      ingredient.substitutes = [...(ingredient.substitutes || []), inputValue.trim()];
      return ''; // Return empty string to clear the input
    }
    return inputValue; // Return unchanged if empty
  }

  // Helper for file input handling for step images
  function handleStepImageUpload(instruction, files) {
    if (!files || !files.length) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        instruction.imageUrl = event.target.result;
        recipe.instructions = [...recipe.instructions]; // Trigger reactivity
      }
    };
    reader.readAsDataURL(file);
  }
</script>

<svelte:head>
  <title
    >{isNew ? 'Create New Recipe' : `Edit ${recipe?.name || 'Recipe'}`} | Kitchen Dashboard</title
  >
  <meta
    name="description"
    content={isNew ? 'Create a new recipe' : `Edit recipe details for ${recipe?.name || ''}`}
  />
</svelte:head>

<main class="container mx-auto p-4 md:p-6 max-w-4xl">
  <!-- Back navigation -->
  <div class="mb-6">
    <Button
      variant="ghost"
      class="pl-0"
      on:click={() => goto('/dashboard/kitchen/recipe')}
      disabled={saving}
    >
      <ArrowLeft class="h-4 w-4 mr-2" />
      Back to Recipes
    </Button>
  </div>

  <!-- Form header -->
  <header class="mb-6">
    <h1 class="text-2xl md:text-3xl font-bold">
      {isNew ? 'Create New Recipe' : `Edit ${recipe?.name || 'Recipe'}`}
    </h1>
    <p class="text-muted-foreground mt-1">
      {isNew ? 'Add a new recipe to your collection' : 'Update the details of your recipe'}
    </p>
  </header>

  {#if loading}
    <!-- Loading state -->
    <div class="flex flex-col space-y-4">
      <div class="h-10 w-2/3 bg-muted rounded-md animate-pulse" />
      <div class="h-40 w-full bg-muted rounded-lg animate-pulse" />
      <div class="grid grid-cols-2 gap-4">
        <div class="h-20 bg-muted rounded-md animate-pulse" />
        <div class="h-20 bg-muted rounded-md animate-pulse" />
      </div>
    </div>
  {:else if recipe}
    <!-- Recipe form -->
    <form onsubmit={handleSubmit}>
      <Card.Root class="mb-8">
        <Card.Content class="p-6">
          <!-- Tabs for organizing form sections -->
          <Tabs.Root value={activeTab} class="mb-6" onValueChange={(value) => (activeTab = value)}>
            <Tabs.List class="mb-6">
              <Tabs.Trigger value="basic">Basic Info</Tabs.Trigger>
              <Tabs.Trigger value="ingredients">Ingredients</Tabs.Trigger>
              <Tabs.Trigger value="instructions">Instructions</Tabs.Trigger>
              <Tabs.Trigger value="details">Details & Metadata</Tabs.Trigger>
              <Tabs.Trigger value="nutrition">Nutrition</Tabs.Trigger>
            </Tabs.List>

            <!-- Basic Info Tab -->
            <Tabs.Content value="basic" class="space-y-6">
              <!-- Recipe name -->
              <div class="space-y-2">
                <Label for="name" class="text-base">Recipe Name</Label>
                <Input
                  id="name"
                  bind:value={recipe.name}
                  placeholder="Enter recipe name"
                  required
                />
              </div>

              <!-- Description -->
              <div class="space-y-2">
                <Label for="description" class="text-base">Description</Label>
                <Textarea
                  id="description"
                  bind:value={recipe.description}
                  placeholder="Brief description of the recipe"
                  rows={3}
                />
              </div>

              <!-- Recipe timing and servings -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="space-y-2">
                  <Label for="prep-time" class="text-base">Prep Time (min)</Label>
                  <Input
                    id="prep-time"
                    type="number"
                    bind:value={recipe.prepTime}
                    min="0"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <Label for="cook-time" class="text-base">Cook Time (min)</Label>
                  <Input
                    id="cook-time"
                    type="number"
                    bind:value={recipe.cookTime}
                    min="0"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <Label for="servings" class="text-base">Servings</Label>
                  <Input
                    id="servings"
                    type="number"
                    bind:value={recipe.servings}
                    min="1"
                    required
                  />
                </div>
              </div>

              <!-- Recipe images -->
              <div class="space-y-2">
                <Label class="text-base">Recipe Images</Label>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  {#each imagePreview as src, i}
                    <div class="relative aspect-square rounded-md overflow-hidden border bg-muted">
                      <img
                        {src}
                        alt={`Recipe preview ${i + 1}`}
                        class="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        class="absolute top-2 right-2 h-6 w-6 rounded-full bg-background/80 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                        onclick={() => removeImage(i)}
                      >
                        <X class="h-4 w-4" />
                      </button>
                    </div>
                  {/each}

                  <!-- Upload button -->
                  <label
                    class="relative aspect-square cursor-pointer rounded-md border-2 border-dashed flex flex-col items-center justify-center bg-muted/30 hover:bg-muted transition-colors"
                  >
                    <div class="flex flex-col items-center justify-center">
                      <FileImage class="h-8 w-8 text-muted-foreground mb-2" />
                      <span class="text-xs text-muted-foreground text-center px-2">
                        Click to upload
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      class="hidden"
                      onchange={handleImageUpload}
                      multiple
                    />
                  </label>
                </div>
              </div>

              <!-- Skill level -->
              <div class="space-y-2">
                <Label for="skill-level" class="text-base">Skill Level</Label>
                <Select.Root
                  value={recipe.skillLevel || 'beginner'}
                  onValueChange={(value) => (recipe.skillLevel = value)}
                >
                  <Select.Trigger id="skill-level" class="w-full"></Select.Trigger>
                  <Select.Content>
                    <Select.Item value="beginner">Beginner</Select.Item>
                    <Select.Item value="intermediate">Intermediate</Select.Item>
                    <Select.Item value="advanced">Advanced</Select.Item>
                    <Select.Item value="expert">Expert</Select.Item>
                  </Select.Content>
                </Select.Root>
              </div>

              <!-- Food cost -->
              <div class="space-y-2">
                <Label for="food-cost" class="text-base">Food Cost ($)</Label>
                <Input
                  id="food-cost"
                  type="number"
                  bind:value={recipe.foodCost}
                  min="0"
                  step="0.01"
                />
              </div>

              <!-- Cookbook selection -->
              <div class="space-y-2">
                <Label for="cookbook" class="text-base">Cookbook</Label>
                <Select.Root
                  value={recipe.cookBookId?.toString() || ''}
                  onValueChange={handleCookBookChange}
                >
                  <Select.Trigger id="cookbook" class="w-full"></Select.Trigger>
                  <Select.Content>
                    <Select.Item value="">None</Select.Item>
                    {#each availableCookBooks as cookbook}
                      <Select.Item value={cookbook.id.toString()}>
                        {cookbook.name} ({cookbook.category})
                      </Select.Item>
                    {/each}
                  </Select.Content>
                </Select.Root>
              </div>
            </Tabs.Content>

            <!-- Ingredients Tab Content -->
            <Tabs.Content value="ingredients" class="space-y-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-medium">Recipe Ingredients</h2>
                <Button type="button" variant="outline" size="sm" on:click={addIngredient}>
                  <Plus class="h-4 w-4 mr-2" />
                  Add Ingredient
                </Button>
              </div>

              <!-- Ingredient list -->
              <div class="space-y-4">
                {#if recipe.ingredients.length === 0}
                  <div class="text-center py-8 border-2 border-dashed rounded-md">
                    <p class="text-muted-foreground mb-2">No ingredients added yet</p>
                    <Button type="button" variant="outline" size="sm" on:click={addIngredient}>
                      <Plus class="h-4 w-4 mr-2" />
                      Add First Ingredient
                    </Button>
                  </div>
                {:else}
                  {#each recipe.ingredients as ingredient, index (ingredient.id)}
                    <div class="border rounded-md p-4">
                      <div class="flex justify-between items-start mb-3">
                        <h3 class="font-medium">Ingredient {index + 1}</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          class="h-8 w-8 text-destructive hover:text-destructive"
                          onclick={() => removeIngredient(ingredient.id)}
                        >
                          <X class="h-4 w-4" />
                        </Button>
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-2">
                          <Label for={`ingredient-name-${ingredient.id}`}>Ingredient Name</Label>
                          <Input
                            id={`ingredient-name-${ingredient.id}`}
                            bind:value={ingredient.name}
                            placeholder="e.g. Butter"
                            required
                          />
                        </div>

                        <div class="grid grid-cols-2 gap-2">
                          <div class="space-y-2">
                            <Label for={`ingredient-quantity-${ingredient.id}`}>Quantity</Label>
                            <Input
                              id={`ingredient-quantity-${ingredient.id}`}
                              type="number"
                              bind:value={ingredient.quantity}
                              min="0"
                              step="0.01"
                              required
                            />
                          </div>

                          <div class="space-y-2">
                            <Label for={`ingredient-unit-${ingredient.id}`}>Unit</Label>
                            <Input
                              id={`ingredient-unit-${ingredient.id}`}
                              bind:value={ingredient.unit}
                              placeholder="e.g. cup, tbsp"
                            />
                          </div>
                        </div>

                        <div class="space-y-2">
                          <Label for={`ingredient-notes-${ingredient.id}`}>Notes</Label>
                          <Input
                            id={`ingredient-notes-${ingredient.id}`}
                            bind:value={ingredient.notes}
                            placeholder="e.g. cold, diced"
                          />
                        </div>

                        <div class="space-y-2">
                          <Label for={`ingredient-category-${ingredient.id}`}>Category</Label>
                          <Select.Root
                            value={ingredient.category}
                            onValueChange={(value) => (ingredient.category = value)}
                          >
                            <Select.Trigger
                              id={`ingredient-category-${ingredient.id}`}
                              class="w-full"
                            ></Select.Trigger>
                            <Select.Content>
                              <Select.Item value="meat">Meat</Select.Item>
                              <Select.Item value="vegetables">Vegetables</Select.Item>
                              <Select.Item value="dairy">Dairy</Select.Item>
                              <Select.Item value="pantry">Pantry</Select.Item>
                              <Select.Item value="liquids">Liquids</Select.Item>
                              <Select.Item value="other">Other</Select.Item>
                            </Select.Content>
                          </Select.Root>
                        </div>
                      </div>

                      <div class="mt-3 flex items-center">
                        <Checkbox
                          id={`ingredient-optional-${ingredient.id}`}
                          checked={ingredient.isOptional}
                          onCheckedChange={(checked) => (ingredient.isOptional = !!checked)}
                        />
                        <Label for={`ingredient-optional-${ingredient.id}`} class="ml-2">
                          Optional ingredient
                        </Label>
                      </div>

                      <!-- Substitutes -->
                      <div class="mt-4 pt-3 border-t">
                        <Label class="mb-2 block">Substitutes (optional)</Label>

                        <div class="flex flex-wrap gap-2 mb-2">
                          {#each ingredient.substitutes || [] as substitute, i}
                            <Badge variant="secondary" class="flex items-center gap-1 pl-2 h-6">
                              {substitute}
                              <Button
                                type="button"
                                class="ml-1 h-4 w-4 rounded-full hover:bg-primary/20 inline-flex items-center justify-center"
                                onclick={() => {
                                  ingredient.substitutes = ingredient.substitutes.filter(
                                    (_, index) => index !== i
                                  );
                                }}
                              >
                                <X class="h-3 w-3" />
                              </Button>
                            </Badge>
                          {/each}
                        </div>

                        <div class="flex gap-2">
                          <Input
                            id={`ingredient-substitute-${ingredient.id}`}
                            placeholder="Add substitute..."
                            class="flex-1"
                            onkeydown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                const input = e.target;
                                if (input.value.trim()) {
                                  ingredient.substitutes = [
                                    ...(ingredient.substitutes || []),
                                    input.value.trim()
                                  ];
                                  input.value = '';
                                }
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onclick={(e) => {
                              const input = document.getElementById(
                                `ingredient-substitute-${ingredient.id}`
                              );
                              if (input && input.value && input.value.trim()) {
                                ingredient.substitutes = [
                                  ...(ingredient.substitutes || []),
                                  input.value.trim()
                                ];
                                input.value = '';
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  {/each}
                {/if}
              </div>
            </Tabs.Content>

            <!-- Instructions Tab -->
            <Tabs.Content value="instructions" class="space-y-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-medium">Recipe Instructions</h2>
                <Button type="button" variant="outline" size="sm" onclick={addInstruction}>
                  <Plus class="h-4 w-4 mr-2" />
                  Add Step
                </Button>
              </div>

              <!-- Instruction list -->
              <div class="space-y-6">
                {#if recipe.instructions.length === 0}
                  <div class="text-center py-8 border-2 border-dashed rounded-md">
                    <p class="text-muted-foreground mb-2">No instructions added yet</p>
                    <Button type="button" variant="outline" size="sm" onclick={addInstruction}>
                      <Plus class="h-4 w-4 mr-2" />
                      Add First Step
                    </Button>
                  </div>
                {:else}
                  {#each recipe.instructions as instruction, index (instruction.id)}
                    <div class="border rounded-md p-4">
                      <div class="flex justify-between items-start mb-3">
                        <h3 class="font-medium">Step {instruction.stepNumber}</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          class="h-8 w-8 text-destructive hover:text-destructive"
                          onclick={() => removeInstruction(instruction.id)}
                        >
                          <X class="h-4 w-4" />
                        </Button>
                      </div>

                      <div class="space-y-4">
                        <div class="space-y-2">
                          <Label for={`instruction-text-${instruction.id}`}>Step Description</Label>
                          <Textarea
                            id={`instruction-text-${instruction.id}`}
                            bind:value={instruction.text}
                            placeholder="Describe this step..."
                            rows={3}
                            required
                          />
                        </div>

                        <div class="space-y-2">
                          <Label for={`instruction-tips-${instruction.id}`}>Tips (optional)</Label>
                          <Textarea
                            id={`instruction-tips-${instruction.id}`}
                            bind:value={instruction.tips}
                            placeholder="Any tips for this step?"
                            rows={2}
                          />
                        </div>

                        <!-- Step image -->
                        <div class="space-y-2">
                          <Label for={`instruction-image-${instruction.id}`}
                            >Step Image (optional)</Label
                          >

                          {#if instruction.imageUrl}
                            <div
                              class="relative w-full max-w-md h-40 rounded-md overflow-hidden border bg-muted"
                            >
                              <img
                                src={instruction.imageUrl}
                                alt={`Step ${instruction.stepNumber}`}
                                class="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                class="absolute top-2 right-2 h-6 w-6 rounded-full bg-background/80 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                                onclick={() => {
                                  instruction.imageUrl = undefined;
                                  recipe.instructions = [...recipe.instructions]; // Trigger reactivity
                                }}
                              >
                                <X class="h-4 w-4" />
                              </button>
                            </div>
                          {:else}
                            <label
                              class="flex items-center justify-center w-full max-w-md h-32 cursor-pointer rounded-md border-2 border-dashed bg-muted/30 hover:bg-muted transition-colors"
                            >
                              <div class="flex flex-col items-center justify-center">
                                <Camera class="h-8 w-8 text-muted-foreground mb-2" />
                                <span class="text-sm text-muted-foreground">
                                  Upload step image
                                </span>
                              </div>
                              <input
                                id={`instruction-image-${instruction.id}`}
                                type="file"
                                accept="image/*"
                                class="hidden"
                                onchange={(e) => {
                                  if (e.target.files) {
                                    handleStepImageUpload(instruction, e.target.files);
                                  }
                                }}
                              />
                            </label>
                          {/if}
                        </div>

                        <!-- Timers for this step -->
                        <div class="space-y-2">
                          <div class="flex items-center justify-between">
                            <Label>Timers for this step</Label>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onclick={() => addTimer(instruction.id)}
                            >
                              <Plus class="h-3 w-3 mr-1" />
                              Add Timer
                            </Button>
                          </div>

                          {#if !instruction.timers?.length}
                            <p class="text-sm text-muted-foreground italic">No timers added</p>
                          {:else}
                            <div class="space-y-2">
                              {#each instruction.timers as timer (timer.id)}
                                <div class="flex items-center gap-2">
                                  <Input
                                    bind:value={timer.label}
                                    placeholder="Timer label"
                                    class="flex-1"
                                  />
                                  <div class="flex items-center gap-2 w-24">
                                    <Input
                                      type="number"
                                      bind:value={timer.duration}
                                      min="1"
                                      class="w-full"
                                    />
                                    <span class="text-sm whitespace-nowrap">min</span>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    class="h-8 w-8 text-destructive hover:text-destructive"
                                    on:click={() => removeTimer(instruction.id, timer.id)}
                                  >
                                    <X class="h-4 w-4" />
                                  </Button>
                                </div>
                              {/each}
                            </div>
                          {/if}
                        </div>
                      </div>
                    </div>
                  {/each}
                {/if}
              </div>
            </Tabs.Content>

            <!-- Details Tab -->
            <Tabs.Content value="details" class="space-y-6">
              <!-- Source information -->
              <div class="space-y-4">
                <h2 class="text-xl font-medium">Source Information</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <Label for="source">Source Name</Label>
                    <Input
                      id="source"
                      bind:value={recipe.source}
                      placeholder="e.g. Grandma's Recipe Book"
                    />
                  </div>

                  <div class="space-y-2">
                    <Label for="source-url">Source URL</Label>
                    <Input
                      id="source-url"
                      bind:value={recipe.sourceUrl}
                      placeholder="e.g. https://example.com/recipe"
                      type="url"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <!-- Tags -->
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <h2 class="text-xl font-medium">Recipe Tags</h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onclick={() => (showAddTagDialog = true)}
                  >
                    <Plus class="h-4 w-4 mr-2" />
                    Add New Tag
                  </Button>
                </div>

                <!-- Selected tags -->
                <div class="flex flex-wrap gap-2 mb-4">
                  {#if recipe.tags.length === 0}
                    <p class="text-sm text-muted-foreground italic">No tags selected</p>
                  {:else}
                    {#each recipe.tags as tag (tag.id)}
                      <Badge variant="secondary" class="flex items-center gap-1 pl-2 h-6">
                        {tag.name}
                        <button
                          type="button"
                          class="ml-1 h-4 w-4 rounded-full hover:bg-primary/20 inline-flex items-center justify-center"
                          onclick={() => toggleTag(tag)}
                        >
                          <X class="h-3 w-3" />
                        </button>
                      </Badge>
                    {/each}
                  {/if}
                </div>

                <!-- Tag search -->
                <div class="space-y-2">
                  <Label for="tag-search">Search Tags</Label>
                  <div class="relative">
                    <Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="tag-search"
                      placeholder="Search for tags..."
                      class="pl-8"
                      bind:value={tagSearch}
                    />
                  </div>
                </div>

                <!-- Available tags -->
                <div class="border rounded-md p-3 max-h-40 overflow-y-auto">
                  <div class="flex flex-wrap gap-2">
                    {#each availableTags.filter((t) => !recipe.tags.some((rt) => rt.id === t.id) && t.name
                          .toLowerCase()
                          .includes(tagSearch.toLowerCase())) as tag (tag.id)}
                      <Badge
                        variant="outline"
                        class="cursor-pointer hover:bg-secondary"
                        on:click={() => toggleTag(tag)}
                      >
                        <Plus class="h-3 w-3 mr-1" />
                        {tag.name}
                      </Badge>
                    {/each}
                  </div>
                </div>
              </div>

              <Separator />

              <!-- Dietary restrictions -->
              <div class="space-y-4">
                <h2 class="text-xl font-medium">Dietary Restrictions</h2>

                <!-- Selected restrictions -->
                <div class="flex flex-wrap gap-2 mb-4">
                  {#if recipe.dietaryRestrictions.length === 0}
                    <p class="text-sm text-muted-foreground italic">
                      No dietary restrictions selected
                    </p>
                  {:else}
                    {#each recipe.dietaryRestrictions as restriction (restriction.id)}
                      <Badge
                        variant="secondary"
                        class="flex items-center gap-1 pl-2 h-6 bg-green-100 text-green-800"
                      >
                        {restriction.name}
                        <button
                          type="button"
                          class="ml-1 h-4 w-4 rounded-full hover:bg-primary/20 inline-flex items-center justify-center"
                          onclick={() => toggleDietaryRestriction(restriction)}
                        >
                          <X class="h-3 w-3" />
                        </button>
                      </Badge>
                    {/each}
                  {/if}
                </div>

                <!-- Available restrictions -->
                <div class="border rounded-md p-3">
                  <div class="flex flex-wrap gap-2">
                    {#each availableDietaryRestrictions.filter((r) => !recipe.dietaryRestrictions.some((rr) => rr.id === r.id)) as restriction (restriction.id)}
                      <Badge
                        variant="outline"
                        class="cursor-pointer hover:bg-green-100 hover:text-green-800"
                        onclick={() => toggleDietaryRestriction(restriction)}
                        title={restriction.description}
                      >
                        <Plus class="h-3 w-3 mr-1" />
                        {restriction.name}
                      </Badge>
                    {/each}
                  </div>
                </div>
              </div>

              <Separator />

              <!-- Cooking equipment -->
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <h2 class="text-xl font-medium">Cooking Equipment</h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onclick={() => (showAddEquipmentDialog = true)}
                  >
                    <Plus class="h-4 w-4 mr-2" />
                    Add Equipment
                  </Button>
                </div>

                <!-- Selected equipment -->
                {#if recipe.cookingEquipment.length === 0}
                  <p class="text-sm text-muted-foreground italic">No equipment added</p>
                {:else}
                  <div class="space-y-2">
                    {#each recipe.cookingEquipment as equipment (equipment.id)}
                      <div class="flex items-center justify-between border rounded-md p-2">
                        <div class="flex items-center">
                          <Checkbox
                            id={`equipment-required-${equipment.id}`}
                            checked={equipment.required}
                            onCheckedChange={() => toggleEquipmentRequired(equipment.id)}
                          />
                          <Label for={`equipment-required-${equipment.id}`} class="ml-2">
                            {equipment.name}
                            {#if !equipment.required}
                              <span class="text-sm text-muted-foreground ml-1">(optional)</span>
                            {/if}
                          </Label>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          class="h-7 w-7 text-destructive hover:text-destructive"
                          on:click={() => toggleEquipment(equipment)}
                        >
                          <X class="h-4 w-4" />
                        </Button>
                      </div>
                    {/each}
                  </div>
                {/if}
              </div>

              <Separator />

              <!-- Notes -->
              <div class="space-y-2">
                <Label for="notes" class="text-base">Recipe Notes</Label>
                <Textarea
                  id="notes"
                  bind:value={recipe.notes}
                  placeholder="Additional notes, tips, or variations for this recipe"
                  rows={4}
                />
              </div>

              <!-- Visibility settings -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <Label for="public-toggle" class="text-base flex flex-col">
                    <span>Public Recipe</span>
                    <span class="font-normal text-sm text-muted-foreground">
                      Make this recipe visible to other users
                    </span>
                  </Label>
                  <Switch
                    id="public-toggle"
                    checked={recipe.isPublic}
                    onCheckedChange={(checked) => (recipe.isPublic = checked)}
                  />
                </div>
              </div>
            </Tabs.Content>

            <!-- Nutrition Tab -->
            <Tabs.Content value="nutrition" class="space-y-6">
              <h2 class="text-xl font-medium mb-4">Nutrition Information</h2>
              <p class="text-sm text-muted-foreground mb-6">
                Enter nutrition information per serving. These values are optional.
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div class="space-y-2">
                  <Label for="calories">Calories</Label>
                  <Input
                    id="calories"
                    type="number"
                    bind:value={recipe.nutritionInfo.calories}
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="protein">Protein (g)</Label>
                  <Input
                    id="protein"
                    type="number"
                    bind:value={recipe.nutritionInfo.protein}
                    min="0"
                    step="0.1"
                    placeholder="0"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="fat">Fat (g)</Label>
                  <Input
                    id="fat"
                    type="number"
                    bind:value={recipe.nutritionInfo.fat}
                    min="0"
                    step="0.1"
                    placeholder="0"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="carbs">Carbohydrates (g)</Label>
                  <Input
                    id="carbs"
                    type="number"
                    bind:value={recipe.nutritionInfo.carbs}
                    min="0"
                    step="0.1"
                    placeholder="0"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="fiber">Fiber (g)</Label>
                  <Input
                    id="fiber"
                    type="number"
                    bind:value={recipe.nutritionInfo.fiber}
                    min="0"
                    step="0.1"
                    placeholder="0"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="sugar">Sugar (g)</Label>
                  <Input
                    id="sugar"
                    type="number"
                    bind:value={recipe.nutritionInfo.sugar}
                    min="0"
                    step="0.1"
                    placeholder="0"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="sodium">Sodium (mg)</Label>
                  <Input
                    id="sodium"
                    type="number"
                    bind:value={recipe.nutritionInfo.sodium}
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>

              <div class="p-4 bg-amber-50 border border-amber-200 rounded-md mt-6">
                <p class="text-sm text-amber-800">
                  <strong>Tip:</strong> Nutrition information is important for those with dietary restrictions
                  or health conditions. Consider adding at least calories if available.
                </p>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </Card.Content>
      </Card.Root>

      <!-- Form submission buttons -->
      <div class="flex justify-end gap-2 mt-8">
        <Button
          type="button"
          variant="outline"
          onclick={() => goto('/dashboard/kitchen/recipe')}
          disabled={saving}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {#if saving}
            <div
              class="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
            ></div>
          {/if}
          {isNew ? 'Create Recipe' : 'Save Changes'}
        </Button>
      </div>
    </form>
  {/if}

  <!-- Dialog for adding new tag -->
  <Dialog.Root open={showAddTagDialog} onOpenChange={(open) => (showAddTagDialog = open)}>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Add New Tag</Dialog.Title>
        <Dialog.Description>Create a new tag for categorizing recipes.</Dialog.Description>
      </Dialog.Header>

      <div class="grid gap-4 py-4">
        <div class="space-y-2">
          <Label for="new-tag-name">Tag Name</Label>
          <Input
            id="new-tag-name"
            bind:value={newTagName}
            placeholder="e.g. Vegetarian, Italian, Quick"
          />
        </div>
      </div>

      <Dialog.Footer>
        <Button variant="outline" onclick={() => (showAddTagDialog = false)}>Cancel</Button>
        <Button onclick={addNewTag} disabled={!newTagName.trim()}>Add Tag</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>

  <!-- Dialog for adding new equipment -->
  <Dialog.Root
    open={showAddEquipmentDialog}
    onOpenChange={(open) => (showAddEquipmentDialog = open)}
  >
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Add Cooking Equipment</Dialog.Title>
        <Dialog.Description>
          Add a new piece of cooking equipment for this recipe.
        </Dialog.Description>
      </Dialog.Header>

      <div class="grid gap-4 py-4">
        <div class="space-y-2">
          <Label for="new-equipment-name">Equipment Name</Label>
          <Input
            id="new-equipment-name"
            bind:value={newEquipmentName}
            placeholder="e.g. Dutch oven, Food processor"
          />
        </div>
      </div>

      <Dialog.Footer>
        <Button variant="outline" onclick={() => (showAddEquipmentDialog = false)}>Cancel</Button>
        <Button onclick={addNewEquipment} disabled={!newEquipmentName.trim()}>Add Equipment</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</main>


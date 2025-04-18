<script lang="ts">
  interface Recipe {
    id: number;
    name: string;
    description: string;
    servings: number;
    prepTime: number; // in minutes
    cookTime: number; // in minutes
    totalTime: number; // in minutes
    skillLevel: SkillLevel;
    foodCost: number; // in dollars
    calories: number;
    isPublic: boolean;
    isFavorite: boolean;
    imageUrls: string[];
    ingredients: Ingredient[];
    instructions: Instruction[];
    notes: string;
    source: string;
    sourceUrl: string;
    dateCreated: string;
    dateModified: string;
    tags: Tag[];
    ratings: Rating[];
    cookBook?: CookBook;
    cookBookId?: number;
    dietaryRestrictions: DietaryRestriction[];
    nutritionInfo: NutritionInfo;
    cookingEquipment: CookingEquipment[];
    userRating?: number; // Current user's rating
  }

  interface Ingredient {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    notes: string;
    category: string;
    isOptional: boolean;
    substitutes: string[];
  }

  interface Instruction {
    id: number;
    stepNumber: number;
    text: string;
    imageUrl?: string;
    timers?: Timer[];
    tips?: string;
  }

  interface Timer {
    id: number;
    label: string;
    duration: number; // in minutes
  }

  interface Tag {
    id: number;
    name: string;
  }

  interface Rating {
    id: number;
    userId: number;
    score: number;
    comment: string;
    date: string;
  }

  interface CookBook {
    id: number;
    name: string;
    category: string;
    description: string;
    imageUrl?: string;
  }

  interface DietaryRestriction {
    id: number;
    name: string;
    description?: string;
  }

  interface NutritionInfo {
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
    fiber: number;
    sugar: number;
    sodium: number;
  }

  interface CookingEquipment {
    id: number;
    name: string;
    required: boolean;
  }

  interface MealPlan {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    meals: MealPlanItem[];
  }

  interface MealPlanItem {
    id: number;
    recipeId: number;
    recipe?: Recipe;
    date: string;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'other';
    servings: number;
    notes: string;
  }

  interface ShoppingListItem {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    category: string;
    purchased: boolean;
    recipeIds: number[]; // which recipes require this ingredient
  }

  type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

  type RecipeView = 'grid' | 'list' | 'compact';

  type RecipeFilter = {
    skillLevel?: SkillLevel[];
    dietaryRestrictions?: number[];
    cookTime?: [number, number]; // min, max in minutes
    foodCost?: [number, number]; // min, max in dollars
    tags?: number[];
    favorites?: boolean;
    cookBooks?: number[];
  };

  // ==== COMPONENT SCRIPT ====

  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { navigating, page } from '$app/state';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input/index.js';
  import * as Pagination from '$lib/components/ui/pagination';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';
  import * as Table from '$lib/components/ui/table';
  import * as Tabs from '$lib/components/ui/tabs';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import * as Select from '$lib/components/ui/select';
  import * as Sheet from '$lib/components/ui/sheet';
  import * as Accordion from '$lib/components/ui/accordion';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import { Slider } from '$lib/components/ui/slider';
  import { Avatar } from '$lib/components/ui/avatar';
  import { Separator } from '$lib/components/ui/separator';
  import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';
  import { LocalStorage } from '$lib/hooks/local-storage.svelte';
  import { toast } from 'svelte-sonner';
  import { quintOut } from 'svelte/easing';
  import { fade, fly, scale } from 'svelte/transition';
  import { z } from 'zod';
  import Chef from '$lib/images/chef.svelte';
  import {
    BookIcon,
    BookOpen,
    Calendar,
    Clock,
    DollarSign,
    Edit,
    FileText,
    Filter,
    Grid,
    Heart,
    List,
    Plus,
    Search,
    Settings,
    ShoppingCart,
    Star,
    Tag as TagIcon,
    Trash2,
    Users,
    Utensils,
    BarChart,
    HelpCircle,
    ChevronDown,
    ChevronRight,
    ChevronLeft,
    Share2,
    Printer,
    PlusCircle,
    XCircle,
    Download,
    Upload,
    Save,
    Bookmark,
    Flame,
    ListCheck,
    FolderKanban,
    LogOut,
    Thermometer,
    Droplets,
    ClipboardCheck,
    Biohazard,
    Droplet,
    Contact
  } from 'lucide-svelte';

  // ==== STATE MANAGEMENT ====

  // Initialize props with runes syntax
  let { data, form } = $props<{
    data: {
      recipes: Recipe[];
      totalCount: number;
      cookBooks: CookBook[];
      dietaryRestrictions: DietaryRestriction[];
      tags: Tag[];
      pagination: {
        currentPage: number;
        perPage: number;
      };
    };
    form: any;
  }>();

  // State management with runes
  let searchTerm = $state(page.url.searchParams.get('search') || '');
  let recipeToDelete = $state<Recipe | null>(null);
  let viewMode = new LocalStorage<RecipeView>('recipeViewMode', 'grid');
  let isDialogOpen = $state(false);
  let isFilterOpen = $state(false);
  let activeTab = $state('all');
  let selectedRecipes = $state<number[]>([]);
  let isBatchActionsOpen = $state(false);
  let showNutritionInfo = $state(false);
  let showIngredients = $state(false);
  let showMealPlanDrawer = $state(false);
  let showShoppingListDrawer = $state(false);
  let recentlyViewed = $state<number[]>([]);
  let isImportDialogOpen = $state(false);
  let isExportDialogOpen = $state(false);
  let filters = $state<RecipeFilter>({
    skillLevel: [],
    dietaryRestrictions: [],
    cookTime: [0, 180], // 0-3 hours
    foodCost: [0, 100], // $0-$100
    tags: [],
    favorites: false,
    cookBooks: []
  });

  // Loading state for skeletons
  const skeletonRows = Array(10).fill(null);

  // Handle form submission feedback
  $effect(() => {
    if (form) {
      if (form.success) {
        toast.success(form.message);
      } else {
        toast.error(form.message);
      }
    }
  });

  // ==== UTILITY FUNCTIONS ====

  /**
   * Creates a debounced function that delays invoking the provided function
   * until after the specified wait time has elapsed since the last invocation.
   */
  function debounce<T extends (...args: string[]) => void>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    return function executedFunction(...args: Parameters<T>): void {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const debouncedSearch = debounce((value) => {
    const params = new URLSearchParams(page.url.searchParams);
    if (value) params.set('search', value);
    else params.delete('search');
    params.set('page', '1');
    goto(`?${params.toString()}`);
  }, 300);

  /**
   * Returns the appropriate color classes for a given skill level
   */
  function getSkillLevelColor(level: string | null | undefined): string {
    if (!level) return 'bg-gray-100 text-gray-800';

    const normalizedLevel = level.toLowerCase();

    const colors = {
      beginner: 'bg-emerald-100 text-emerald-800',
      intermediate: 'bg-blue-100 text-blue-800',
      advanced: 'bg-amber-100 text-amber-800',
      expert: 'bg-rose-100 text-rose-800'
    };

    return colors[normalizedLevel as SkillLevel] || 'bg-gray-100 text-gray-800';
  }

  /**
   * Format cooking time from minutes to a readable format
   */
  function formatCookTime(minutes: number): string {
    if (!minutes || isNaN(minutes)) return 'N/A';

    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
  }

  /**
   * Format price to currency format
   */
  function formatPrice(price: number): string {
    if (!price || isNaN(price)) return '$0.00';
    return `$${price.toFixed(2)}`;
  }

  /**
   * Calculate average rating from ratings array
   */
  function calculateAverageRating(ratings: Rating[]): number {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((total, rating) => total + rating.score, 0);
    return Math.round((sum / ratings.length) * 10) / 10; // One decimal place
  }

  /**
   * Generate structured recipe data for recipe schema
   */
  function generateRecipeSchema(recipe: Recipe): string {
    const schema = {
      '@context': 'https://schema.org/',
      '@type': 'Recipe',
      name: recipe.name,
      description: recipe.description,
      author: {
        '@type': 'Person',
        name: 'Recipe Author'
      },
      datePublished: recipe.dateCreated,
      image: recipe.imageUrls && recipe.imageUrls.length > 0 ? recipe.imageUrls[0] : '',
      prepTime: `PT${recipe.prepTime}M`,
      cookTime: `PT${recipe.cookTime}M`,
      totalTime: `PT${recipe.totalTime}M`,
      recipeYield: `${recipe.servings} servings`,
      recipeCategory: recipe.cookBook?.category || '',
      recipeCuisine: '',
      keywords: recipe.tags.map((tag) => tag.name).join(', '),
      nutrition: {
        '@type': 'NutritionInformation',
        calories: `${recipe.nutritionInfo?.calories || 0} calories`
      },
      recipeIngredient: recipe.ingredients.map(
        (ingredient) => `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`
      ),
      recipeInstructions: recipe.instructions.map((instruction) => ({
        '@type': 'HowToStep',
        text: instruction.text
      }))
    };

    return JSON.stringify(schema);
  }

  // ==== EVENT HANDLERS ====

  function handleSearchInput(event: Event) {
    searchTerm = (event.target as HTMLInputElement).value;
    debouncedSearch(searchTerm);
  }

  function handleDialogClose() {
    isDialogOpen = !isDialogOpen;

    if (!isDialogOpen) {
      recipeToDelete = null;
    }
  }

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(page.url.searchParams);
    params.set('page', newPage.toString());
    goto(`?${params.toString()}`);
  }

  function toggleViewMode(mode: RecipeView) {
    viewMode.value = mode;
  }

  function confirmDelete(recipe: Recipe) {
    recipeToDelete = recipe;
    isDialogOpen = true;
  }

  function navigateToRecipeDetails(id: number) {
    // Add to recently viewed if not already there
    if (!recentlyViewed.includes(id)) {
      recentlyViewed = [id, ...recentlyViewed.slice(0, 4)]; // Keep last 5
    }
    goto(`/dashboard/kitchen/recipe/${id}`);
  }

  function createNewRecipe() {
    goto(`/dashboard/kitchen/recipe/new`);
  }

  function toggleFilters() {
    isFilterOpen = !isFilterOpen;
  }

  function resetFilters() {
    filters = {
      skillLevel: [],
      dietaryRestrictions: [],
      cookTime: [0, 180],
      foodCost: [0, 100],
      tags: [],
      favorites: false,
      cookBooks: []
    };
    applyFilters();
  }

  function applyFilters() {
    const params = new URLSearchParams(page.url.searchParams);

    // Add filter parameters
    if (filters.skillLevel && filters.skillLevel.length > 0) {
      params.set('skillLevel', filters.skillLevel.join(','));
    } else {
      params.delete('skillLevel');
    }

    if (filters.dietaryRestrictions && filters.dietaryRestrictions.length > 0) {
      params.set('dietaryRestrictions', filters.dietaryRestrictions.join(','));
    } else {
      params.delete('dietaryRestrictions');
    }

    if (filters.tags && filters.tags.length > 0) {
      params.set('tags', filters.tags.join(','));
    } else {
      params.delete('tags');
    }

    if (filters.cookBooks && filters.cookBooks.length > 0) {
      params.set('cookBooks', filters.cookBooks.join(','));
    } else {
      params.delete('cookBooks');
    }

    if (filters.favorites) {
      params.set('favorites', 'true');
    } else {
      params.delete('favorites');
    }

    params.set('minCookTime', filters.cookTime[0].toString());
    params.set('maxCookTime', filters.cookTime[1].toString());
    params.set('minCost', filters.foodCost[0].toString());
    params.set('maxCost', filters.foodCost[1].toString());

    params.set('page', '1');
    goto(`?${params.toString()}`);

    isFilterOpen = false;
  }

  function toggleRecipeSelection(id: number) {
    if (selectedRecipes.includes(id)) {
      selectedRecipes = selectedRecipes.filter((recipeId) => recipeId !== id);
    } else {
      selectedRecipes = [...selectedRecipes, id];
    }

    isBatchActionsOpen = selectedRecipes.length > 0;
  }

  function clearSelectedRecipes() {
    selectedRecipes = [];
    isBatchActionsOpen = false;
  }

  function handleBatchDelete() {
    // Implementation for batch delete
    toast.info(`Deleting ${selectedRecipes.length} recipes...`);
    // After server action completes
    clearSelectedRecipes();
  }

  function toggleFavorite(recipe: Recipe) {
    // Implementation for toggling favorite status
    const newStatus = !recipe.isFavorite;
    toast.success(newStatus ? 'Added to favorites' : 'Removed from favorites');
    // Update local state and send to server
  }

  function addToMealPlan(recipeIds: number[]) {
    showMealPlanDrawer = true;
    // Populate meal plan drawer with selected recipes
  }

  function addToShoppingList(recipeIds: number[]) {
    showShoppingListDrawer = true;
    // Populate shopping list drawer with ingredients from selected recipes
  }

  function exportRecipes(recipeIds: number[]) {
    isExportDialogOpen = true;
    // Show export dialog with options (PDF, JSON, etc.)
  }

  function importRecipes() {
    isImportDialogOpen = true;
    // Show import dialog with options
  }

  function printRecipe(recipeId: number) {
    // Implementation for print functionality
    window.print();
  }

  function shareRecipe(recipe: Recipe) {
    // Implementation for sharing
    const url = `${window.location.origin}/recipes/${recipe.id}`;
    navigator.clipboard.writeText(url);
    toast.success('Recipe link copied to clipboard');
  }
</script>

<!-- Main application layout -->
<svelte:head>
  <title>Recipe Manager | Kitchen Dashboard</title>
  <meta
    name="description"
    content="Manage and organize your culinary creations with our comprehensive Recipe Manager"
  />
</svelte:head>

<main class="container mx-auto p-4 md:p-6 max-w-7xl">
  <!-- Page Header -->
  <header class="mb-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Recipe Manager</h1>
        <p class="text-muted-foreground mt-1">Manage and organize your culinary creations</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" onclick={() => importRecipes()} class="sm:w-auto">
          <Upload class="h-4 w-4 mr-2" />
          <span>Import</span>
        </Button>
        <Button onclick={() => createNewRecipe()} class="w-full sm:w-auto">
          <Plus class="h-4 w-4 mr-2" />
          <span>New Recipe</span>
        </Button>
      </div>
    </div>
  </header>

  <script lang="ts">
    import {
      BookOpen,
      Calendar,
      Clock,
      ShoppingCart,
      ListCheck,
      FolderKanban,
      Flame,
      Star,
      ChevronDown,
      Users,
      Settings,
      LogOut,
      PlusCircle,
      Bookmark,
      Utensils,
      BarChart,
      HelpCircle
    } from 'lucide-svelte';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
    import { buttonVariants } from '$lib/components/ui/button/index.js';
  </script>

  <!-- Kitchen Dashboard Navigation Tabs with Dropdown -->
  <Tabs.Root value={activeTab} class="mb-6" onValueChange={(value) => (activeTab = value)}>
    <Tabs.List class="bg-card rounded-lg p-1 shadow-sm border flex items-center">
      <Tabs.Trigger value="prepBroad" class="flex items-center gap-2">
        <ListCheck class="h-4 w-4" />
        <span>Prep Board</span>
        <Badge variant="secondary">{data?.totalCount || 0}</Badge>
      </Tabs.Trigger>

      <Tabs.Trigger value="proudctionPlan" class="flex items-center gap-2">
        <FolderKanban class="h-4 w-4" />
        <span>Production Plans</span>
      </Tabs.Trigger>

      <!-- Quick Access Dropdown -->
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium focus:outline-none"
        >
          <Flame class="h-4 w-4" />
          <span>Quick Access forms</span>
          <ChevronDown class="h-4 w-4 ml-1" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="w-48">
          <DropdownMenu.Group>
            <DropdownMenu.Item onSelect={() => (activeTab = 'favorites')}>
              <Thermometer class="mr-2 h-4 w-4" />
              <span>Temperature Logs</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => (activeTab = 'recipes')}>
              <Droplets class="mr-2 h-4 w-4" />
              <span>Sanitation Checks</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => (activeTab = 'cookbooks')}>
              <ClipboardCheck class="mr-2 h-4 w-4" />
              <span>HACCP Plans</span>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onSelect={() => (activeTab = 'analytics')}>
              <Checkbox class="mr-2 h-4 w-4" />
              <span>Self-Inspection Checklists</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => (activeTab = 'bookmarks')}>
              <Droplet class="mr-2 h-4 w-4" />
              <span>Sanitation & Cleaning Schedules</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => (activeTab = 'bookmarks')}>
              <Contact class="mr-2 h-4 w-4" />
              <span>Employee Training & Hygiene Records</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => (activeTab = 'bookmarks')}>
              <Biohazard class="mr-2 h-4 w-4" />
              <span>Waste Management & Traceability Records</span>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <Tabs.Trigger value="cookbooks" class="flex items-center gap-2">
        <BookOpen class="h-4 w-4" />
        <span>Cookbooks</span>
      </Tabs.Trigger>

      <Tabs.Trigger value="meal-plans" class="flex items-center gap-2 md:flex">
        <Calendar class="h-4 w-4" />
        <span>Orders</span>
      </Tabs.Trigger>

      <Tabs.Trigger value="shopping" class="flex items-center gap-2  md:flex">
        <ShoppingCart class="h-4 w-4" />
        <span>Vendors / suppliers</span>
      </Tabs.Trigger>

      <!-- Settings Dropdown -->
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          class="ml-auto flex items-center gap-2 px-3 py-1.5 text-sm font-medium focus:outline-none"
        >
          <Settings class="h-4 w-4" />
          <ChevronDown class="h-4 w-4" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="w-48">
          <DropdownMenu.Item>
            <Users class="mr-2 h-4 w-4" />
            <span>Team Settings</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <PlusCircle class="mr-2 h-4 w-4" />
            <span>New Project</span>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <HelpCircle class="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <LogOut class="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Tabs.List>
  </Tabs.Root>

  <!-- Search and filter toolbar -->
  <div class="mt-6 bg-card rounded-lg p-4 shadow-sm border">
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="relative flex items-center flex-1">
        <label for="recipe-search" class="sr-only">Search recipes</label>
        <Search class="absolute left-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <Input
          id="recipe-search"
          type="search"
          placeholder="Search recipes, ingredients, tags..."
          class="pl-10 w-full"
          bind:value={searchTerm}
          oninput={handleSearchInput}
          autocomplete="off"
        />
      </div>

      <div class="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onclick={() => toggleFilters()}
          class="flex items-center gap-2 h-10"
          aria-label="Filter recipes"
          aria-expanded={isFilterOpen}
        >
          <Filter class="h-4 w-4" aria-hidden="true" />
          <span class="hidden sm:inline">Filters</span>
          {#if Object.values(filters).some((f) => (Array.isArray(f) ? f.length > 0 : f))}
            <Badge variant="secondary" class="ml-1">Active</Badge>
          {/if}
        </Button>

        <div class="flex items-center space-x-2" role="group" aria-label="View options">
          <Button
            type="button"
            variant={viewMode.value === 'grid' ? 'default' : 'outline'}
            size="icon"
            class="h-10 w-10"
            onclick={() => toggleViewMode('grid')}
            aria-label="Grid view"
            aria-pressed={viewMode.value === 'grid'}
          >
            <Grid class="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant={viewMode.value === 'list' ? 'default' : 'outline'}
            size="icon"
            class="h-10 w-10"
            onclick={() => toggleViewMode('list')}
            aria-label="List view"
            aria-pressed={viewMode.value === 'list'}
          >
            <List class="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant={viewMode.value === 'compact' ? 'default' : 'outline'}
            size="icon"
            class="h-10 w-10 hidden sm:flex"
            onclick={() => toggleViewMode('compact')}
            aria-label="Compact view"
            aria-pressed={viewMode.value === 'compact'}
          >
            <FileText class="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Filters panel (expandable) -->
    {#if isFilterOpen}
      <div
        in:fly={{ y: -10, duration: 200 }}
        out:fly={{ y: -10, duration: 200 }}
        class="mt-4 pt-4 border-t"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Skill Level Filter -->
          <div>
            <label class="text-sm font-medium mb-1 block">Skill Level</label>
            <div class="space-y-2">
              {#each ['beginner', 'intermediate', 'advanced', 'expert'] as level}
                <div class="flex items-center">
                  <Checkbox
                    id={`skill-${level}`}
                    checked={filters.skillLevel?.includes(level)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        filters.skillLevel = [...(filters.skillLevel || []), level];
                      } else {
                        filters.skillLevel = filters.skillLevel?.filter((l) => l !== level) || [];
                      }
                    }}
                  />
                  <label for={`skill-${level}`} class="ml-2 text-sm capitalize">
                    {level}
                  </label>
                </div>
              {/each}
            </div>
          </div>

          <!-- Dietary Restrictions Filter -->
          <div>
            <label class="text-sm font-medium mb-1 block">Dietary Restrictions</label>
            <div class="space-y-2">
              {#each data?.dietaryRestrictions || [] as restriction}
                <div class="flex items-center">
                  <Checkbox
                    id={`diet-${restriction.id}`}
                    checked={filters.dietaryRestrictions?.includes(restriction.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        filters.dietaryRestrictions = [
                          ...(filters.dietaryRestrictions || []),
                          restriction.id
                        ];
                      } else {
                        filters.dietaryRestrictions =
                          filters.dietaryRestrictions?.filter((id) => id !== restriction.id) || [];
                      }
                    }}
                  />
                  <label for={`diet-${restriction.id}`} class="ml-2 text-sm">
                    {restriction.name}
                  </label>
                </div>
              {/each}
            </div>
          </div>

          <!-- Cook Time & Cost Range Filters -->
          <div>
            <label class="text-sm font-medium mb-1 block">Cook Time Range</label>
            <div class="px-2 py-4">
              <Slider
                min={0}
                max={180}
                step={5}
                value={filters.cookTime}
                onValueChange={(value) => {
                  filters.cookTime = value;
                }}
              />
              <div class="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>{formatCookTime(filters.cookTime?.[0] || 0)}</span>
                <span>{formatCookTime(filters.cookTime?.[1] || 180)}</span>
              </div>
            </div>

            <label class="text-sm font-medium mb-1 mt-3 block">Food Cost Range</label>
            <div class="px-2 py-4">
              <Slider
                min={0}
                max={100}
                step={1}
                value={filters.foodCost}
                onValueChange={(value) => {
                  filters.foodCost = value;
                }}
              />
              <div class="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>{formatPrice(filters.foodCost?.[0] || 0)}</span>
                <span>{formatPrice(filters.foodCost?.[1] || 100)}</span>
              </div>
            </div>
          </div>

          <!-- Cookbooks & Tags Filter -->
          <div>
            <label class="text-sm font-medium mb-1 block">Cookbooks</label>
            <Select.Root
              value={filters.cookBooks?.join(',')}
              onValueChange={(value) => {
                filters.cookBooks = value ? value.split(',').map(Number) : [];
              }}
            >
              <Select.Trigger class="w-full mb-3">
                <Select.Value placeholder="Select cookbooks" />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each data?.cookBooks || [] as cookbook}
                    <Select.Item value={cookbook.id.toString()}>{cookbook.name}</Select.Item>
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>

            <label class="text-sm font-medium mb-1 block">Only show favorites</label>
            <div class="flex items-center">
              <Checkbox
                id="favorites-only"
                checked={filters.favorites}
                onCheckedChange={(checked) => {
                  filters.favorites = !!checked;
                }}
              />
              <label for="favorites-only" class="ml-2 text-sm">Show only favorites</label>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-4 pt-4 border-t">
          <Button variant="outline" onclick={() => resetFilters()}>Reset Filters</Button>
          <Button onclick={() => applyFilters()}>Apply Filters</Button>
        </div>
      </div>
    {/if}
  </div>

  <!-- Batch Action Bar (visible when recipes are selected) -->
  {#if isBatchActionsOpen}
    <div
      in:fly={{ y: 20, duration: 200 }}
      out:fly={{ y: 20, duration: 200 }}
      class="fixed bottom-0 left-0 right-0 bg-background shadow-md border-t p-4 z-50"
    >
      <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Badge variant="secondary" class="px-2 py-1">
            {selectedRecipes.length} selected
          </Badge>
          <Button size="sm" variant="ghost" onclick={() => clearSelectedRecipes()}>Clear</Button>
        </div>
        <div class="flex items-center gap-2">
          <Button size="sm" variant="outline" onclick={() => addToMealPlan(selectedRecipes)}>
            <Calendar class="h-4 w-4 mr-1" />
            Add to Meal Plan
          </Button>
          <Button size="sm" variant="outline" onclick={() => addToShoppingList(selectedRecipes)}>
            <ShoppingCart class="h-4 w-4 mr-1" />
            Add to Shopping List
          </Button>
          <Button size="sm" variant="outline" onclick={() => exportRecipes(selectedRecipes)}>
            <Download class="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button size="sm" variant="destructive" onclick={() => handleBatchDelete()}>
            <Trash2 class="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Tab Content -->
  <!-- <Tabs.Content value="all" class="mt-6"> -->
  <!-- Status message for screen readers -->
  {#if data?.recipes?.length === 0}
    <div class="sr-only" role="status" aria-live="polite">No recipes found.</div>
  {/if}

  <!-- Recipe List Content -->
  <section aria-labelledby="recipes-heading">
    <h2 id="recipes-heading" class="sr-only">Recipes</h2>

    {#if data?.recipes?.length === 0}
      <!-- Empty state -->
      <div
        class="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg border border-dashed"
      >
        <Chef class="h-16 w-16 text-muted-foreground mb-4" />
        <h3 class="text-lg font-medium">No recipes found</h3>
        <p class="text-muted-foreground mb-4">
          {searchTerm
            ? 'No recipes match your search criteria.'
            : 'Get started by adding your first recipe.'}
        </p>
        <Button onclick={createNewRecipe}>
          <Plus class="h-4 w-4 mr-2" />
          Create Recipe
        </Button>
      </div>
    {:else}
      {#key data?.pagination?.currentPage}
        {#if viewMode.value === 'grid'}
          <!-- Grid View -->
          <ul
            in:fade={{ duration: 300, easing: quintOut }}
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            role="list"
          >
            {#if navigating.to}
              {#each skeletonRows.slice(0, 8) as _}
                <li>
                  <Card.Root class="h-full">
                    <Card.Header class="p-0">
                      <Skeleton class="h-48 w-full rounded-t-lg" />
                    </Card.Header>
                    <Card.Content class="p-4">
                      <Skeleton class="h-6 w-3/4 mb-2" />
                      <Skeleton class="h-4 w-1/2 mb-4" />
                      <div class="flex justify-between">
                        <Skeleton class="h-4 w-16" />
                        <Skeleton class="h-4 w-16" />
                      </div>
                    </Card.Content>
                  </Card.Root>
                </li>
              {/each}
            {:else}
              {#each data.recipes as recipe, i (recipe.id)}
                <li>
                  <article
                    in:fly={{ y: 20, duration: 300, delay: i * 50, easing: quintOut }}
                    out:fly={{ y: -20, duration: 200, easing: quintOut }}
                    class="h-full"
                  >
                    <Card.Root
                      class="h-full overflow-hidden group border hover:border-primary/50 hover:shadow-md transition-all relative"
                    >
                      <!-- Selection checkbox -->
                      <div class="absolute top-2 right-2 z-10">
                        <Checkbox
                          checked={selectedRecipes.includes(recipe.id)}
                          onCheckedChange={() => toggleRecipeSelection(recipe.id)}
                          aria-label={`Select ${recipe.name}`}
                          class="h-5 w-5 bg-background/90 backdrop-blur-sm data-[state=checked]:bg-primary"
                          onclick={(e) => e.stopPropagation()}
                        />
                      </div>

                      <!-- Favorite button -->
                      <button
                        type="button"
                        onclick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(recipe);
                        }}
                        class="absolute top-2 left-2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                        aria-label={recipe.isFavorite
                          ? 'Remove from favorites'
                          : 'Add to favorites'}
                      >
                        <Heart
                          class={`h-4 w-4 ${
                            recipe.isFavorite
                              ? 'text-red-500 fill-red-500'
                              : 'text-muted-foreground'
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      <button
                        class="text-left w-full h-full flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        onclick={() => navigateToRecipeDetails(recipe.id)}
                        aria-label={`View details for ${recipe.name}`}
                      >
                        <!-- Card Header -->
                        <Card.Header class="p-0 relative flex-shrink-0">
                          <div class="relative h-48 overflow-hidden">
                            {#if recipe.imageUrls && recipe.imageUrls.length > 0}
                              <img
                                src={recipe.imageUrls[0]}
                                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                alt={`Image of ${recipe.name}`}
                                loading="lazy"
                              />
                            {:else}
                              <div
                                class="bg-muted w-full h-full flex items-center justify-center text-muted-foreground"
                              >
                                <Chef class="h-12 w-12" aria-hidden="true" />
                              </div>
                            {/if}

                            {#if recipe.dietaryRestrictions && recipe.dietaryRestrictions.length > 0}
                              <div
                                class="absolute bottom-2 left-2 flex flex-wrap gap-1 max-w-[calc(100%-1rem)]"
                              >
                                {#each recipe.dietaryRestrictions.slice(0, 2) as restriction}
                                  <Badge
                                    variant="secondary"
                                    class="bg-background/90 backdrop-blur-sm"
                                  >
                                    {restriction.name}
                                  </Badge>
                                {/each}
                                {#if recipe.dietaryRestrictions.length > 2}
                                  <Badge
                                    variant="secondary"
                                    class="bg-background/90 backdrop-blur-sm"
                                  >
                                    +{recipe.dietaryRestrictions.length - 2}
                                  </Badge>
                                {/if}
                              </div>
                            {/if}
                          </div>
                        </Card.Header>

                        <!-- Card Content -->
                        <Card.Content class="p-4 flex-grow flex flex-col">
                          <h3 class="font-medium text-lg line-clamp-1 mb-1">{recipe.name}</h3>

                          <!-- Rating stars -->
                          <div class="flex items-center gap-1 mb-1">
                            {#each Array(5) as _, i}
                              <Star
                                class={`h-3 w-3 ${
                                  i < Math.round(calculateAverageRating(recipe.ratings))
                                    ? 'text-amber-500 fill-amber-500'
                                    : 'text-muted-foreground'
                                }`}
                              />
                            {/each}
                            <span class="text-xs text-muted-foreground ml-1">
                              ({recipe.ratings?.length || 0})
                            </span>
                          </div>

                          {#if recipe.cookBook}
                            <div
                              class="text-sm text-muted-foreground mb-2 line-clamp-1 flex items-center"
                            >
                              <BookIcon class="h-3 w-3 mr-1 flex-shrink-0" aria-hidden="true" />
                              <span class="truncate">{recipe.cookBook.name}</span>
                              <span
                                class="ml-1 px-1.5 py-0.5 text-xs bg-primary/10 text-secondary-foreground rounded-full whitespace-nowrap"
                              >
                                {recipe.cookBook.category}
                              </span>
                            </div>
                          {/if}

                          <!-- Short description -->
                          <p class="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {recipe.description || 'No description available.'}
                          </p>

                          <dl
                            class="flex items-center gap-3 text-sm text-muted-foreground mb-3 mt-auto"
                          >
                            <div class="flex items-center">
                              <dt class="sr-only">Cook Time</dt>
                              <Clock class="h-3 w-3 mr-1" aria-hidden="true" />
                              <dd>{formatCookTime(recipe.cookTime)}</dd>
                            </div>
                            <div class="flex items-center">
                              <dt class="sr-only">Food Cost</dt>
                              <DollarSign class="h-3 w-3 mr-1" aria-hidden="true" />
                              <dd>{formatPrice(recipe?.foodCost ?? 0)}</dd>
                            </div>
                            <div class="flex items-center">
                              <dt class="sr-only">Servings</dt>
                              <Users class="h-3 w-3 mr-1" aria-hidden="true" />
                              <dd>{recipe.servings || '-'}</dd>
                            </div>
                          </dl>

                          <div class="flex justify-between items-center mt-auto">
                            {#if recipe.skillLevel}
                              <Badge
                                variant="outline"
                                class={getSkillLevelColor(recipe.skillLevel)}
                              >
                                {recipe.skillLevel}
                              </Badge>
                            {:else}
                              <span></span>
                            {/if}

                            <!-- Tags (if available) -->
                            {#if recipe.tags && recipe.tags.length > 0}
                              <div class="flex space-x-1">
                                <TagIcon class="h-3 w-3 text-muted-foreground" />
                                <span class="text-xs text-muted-foreground">
                                  {recipe.tags.length}
                                  {recipe.tags.length === 1 ? 'tag' : 'tags'}
                                </span>
                              </div>
                            {/if}
                          </div>
                        </Card.Content>
                      </button>
                    </Card.Root>
                  </article>
                </li>
              {/each}
            {/if}
          </ul>
        {:else if viewMode.value === 'list'}
          <!-- List View -->
          <div
            in:fade={{ duration: 300, easing: quintOut }}
            class="rounded-lg border overflow-hidden"
          >
            <Table.Root>
              <caption class="sr-only">List of recipes</caption>
              <Table.Header>
                <Table.Row>
                  <Table.Head class="w-[30px]">
                    <Checkbox
                      checked={selectedRecipes.length > 0 &&
                        selectedRecipes.length === data.recipes.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          selectedRecipes = data.recipes.map((r) => r.id);
                        } else {
                          selectedRecipes = [];
                        }
                        isBatchActionsOpen = selectedRecipes.length > 0;
                      }}
                      aria-label="Select all recipes"
                    />
                  </Table.Head>
                  <Table.Head>Recipe</Table.Head>
                  <Table.Head class="hidden md:table-cell">Cook Time</Table.Head>
                  <Table.Head class="hidden md:table-cell">Skill Level</Table.Head>
                  <Table.Head class="hidden sm:table-cell">Cost</Table.Head>
                  <Table.Head class="hidden lg:table-cell">Tags</Table.Head>
                  <Table.Head class="w-[120px] text-right">Actions</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {#if navigating.to}
                  {#each skeletonRows as _}
                    <Table.Row>
                      <Table.Cell class="w-[30px]">
                        <Skeleton class="h-4 w-4" />
                      </Table.Cell>
                      <Table.Cell>
                        <div class="flex items-center gap-3">
                          <Skeleton class="h-10 w-10 rounded-md" />
                          <div>
                            <Skeleton class="h-5 w-32 mb-1" />
                            <Skeleton class="h-4 w-24" />
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell class="hidden md:table-cell">
                        <Skeleton class="h-4 w-16" />
                      </Table.Cell>
                      <Table.Cell class="hidden md:table-cell">
                        <Skeleton class="h-5 w-24" />
                      </Table.Cell>
                      <Table.Cell class="hidden sm:table-cell">
                        <Skeleton class="h-4 w-16 ml-auto" />
                      </Table.Cell>
                      <Table.Cell class="hidden lg:table-cell">
                        <Skeleton class="h-5 w-32" />
                      </Table.Cell>
                      <Table.Cell>
                        <div class="flex gap-2 justify-end">
                          <Skeleton class="h-8 w-8 rounded-md" />
                          <Skeleton class="h-8 w-8 rounded-md" />
                          <Skeleton class="h-8 w-8 rounded-md" />
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  {/each}
                {:else}
                  {#each data.recipes as recipe (recipe.id)}
                    <Table.Row>
                      <Table.Cell class="w-[30px]">
                        <Checkbox
                          checked={selectedRecipes.includes(recipe.id)}
                          onCheckedChange={() => toggleRecipeSelection(recipe.id)}
                          aria-label={`Select ${recipe.name}`}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <button
                          class="flex items-center gap-3 w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                          onclick={() => navigateToRecipeDetails(recipe.id)}
                          aria-label={`View details for ${recipe.name}`}
                        >
                          <div class="h-10 w-10 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                            {#if recipe.imageUrls && recipe.imageUrls.length > 0}
                              <img
                                src={recipe.imageUrls[0]}
                                alt={`Image of ${recipe.name}`}
                                class="h-full w-full object-cover"
                              />
                            {:else}
                              <div class="h-full w-full flex items-center justify-center">
                                <Chef class="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                              </div>
                            {/if}
                          </div>

                          <div class="min-w-0 flex-1">
                            <div class="font-medium text-sm flex items-center">
                              {recipe.name}
                              {#if recipe.isFavorite}
                                <Heart class="h-3 w-3 ml-1 text-red-500 fill-red-500" />
                              {/if}
                            </div>

                            <div class="flex items-center mt-0.5">
                              <!-- Rating stars -->
                              <div class="flex items-center gap-0.5">
                                {#each Array(5) as _, i}
                                  <Star
                                    class={`h-3 w-3 ${
                                      i < Math.round(calculateAverageRating(recipe.ratings))
                                        ? 'text-amber-500 fill-amber-500'
                                        : 'text-muted-foreground'
                                    }`}
                                  />
                                {/each}
                              </div>

                              {#if recipe.cookBook}
                                <span class="mx-1 text-muted-foreground">•</span>
                                <BookIcon
                                  class="h-3 w-3 mr-1 text-muted-foreground flex-shrink-0"
                                />
                                <span class="text-xs text-muted-foreground truncate mr-1">
                                  {recipe.cookBook.name}
                                </span>
                              {/if}
                            </div>
                          </div>
                        </button>
                      </Table.Cell>
                      <Table.Cell class="hidden md:table-cell">
                        <span class="inline-flex items-center">
                          <Clock class="h-3 w-3 mr-1 text-muted-foreground" aria-hidden="true" />
                          {formatCookTime(recipe.cookTime)}
                        </span>
                      </Table.Cell>
                      <Table.Cell class="hidden md:table-cell">
                        {#if recipe.skillLevel}
                          <Badge variant="outline" class={getSkillLevelColor(recipe.skillLevel)}>
                            {recipe.skillLevel}
                          </Badge>
                        {/if}
                      </Table.Cell>
                      <Table.Cell class="hidden sm:table-cell font-medium">
                        <span class="inline-flex items-center">
                          <DollarSign
                            class="h-3 w-3 mr-0.5 text-muted-foreground"
                            aria-hidden="true"
                          />
                          {formatPrice(recipe?.foodCost ?? 0)}
                        </span>
                      </Table.Cell>
                      <Table.Cell class="hidden lg:table-cell">
                        {#if recipe.tags && recipe.tags.length > 0}
                          <div class="flex flex-wrap gap-1">
                            {#each recipe.tags.slice(0, 2) as tag}
                              <Badge variant="outline" class="text-xs">
                                {tag.name}
                              </Badge>
                            {/each}
                            {#if recipe.tags.length > 2}
                              <Badge variant="outline" class="text-xs">
                                +{recipe.tags.length - 2}
                              </Badge>
                            {/if}
                          </div>
                        {/if}
                      </Table.Cell>
                      <Table.Cell class="w-[120px]">
                        <div class="flex items-center justify-end gap-1">
                          <!-- Action buttons -->
                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                class="h-8 w-8"
                                aria-label="More options"
                              >
                                <Settings class="h-4 w-4" />
                              </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content align="end">
                              <DropdownMenu.Group>
                                <DropdownMenu.Item
                                  onclick={() => navigateToRecipeDetails(recipe.id)}
                                >
                                  <Edit class="h-4 w-4 mr-2" />
                                  Edit Recipe
                                </DropdownMenu.Item>
                                <DropdownMenu.Item onclick={() => toggleFavorite(recipe)}>
                                  <Heart class="h-4 w-4 mr-2" />
                                  {recipe.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                                </DropdownMenu.Item>
                                <DropdownMenu.Item onclick={() => addToMealPlan([recipe.id])}>
                                  <Calendar class="h-4 w-4 mr-2" />
                                  Add to Meal Plan
                                </DropdownMenu.Item>
                                <DropdownMenu.Item onclick={() => addToShoppingList([recipe.id])}>
                                  <ShoppingCart class="h-4 w-4 mr-2" />
                                  Add to Shopping List
                                </DropdownMenu.Item>
                              </DropdownMenu.Group>
                              <DropdownMenu.Separator />
                              <DropdownMenu.Group>
                                <DropdownMenu.Item onclick={() => printRecipe(recipe.id)}>
                                  <Printer class="h-4 w-4 mr-2" />
                                  Print Recipe
                                </DropdownMenu.Item>
                                <DropdownMenu.Item onclick={() => shareRecipe(recipe)}>
                                  <Share2 class="h-4 w-4 mr-2" />
                                  Share Recipe
                                </DropdownMenu.Item>
                                <DropdownMenu.Item onclick={() => exportRecipes([recipe.id])}>
                                  <Download class="h-4 w-4 mr-2" />
                                  Export Recipe
                                </DropdownMenu.Item>
                              </DropdownMenu.Group>
                              <DropdownMenu.Separator />
                              <DropdownMenu.Item
                                onclick={() => confirmDelete(recipe)}
                                class="text-destructive focus:text-destructive"
                              >
                                <Trash2 class="h-4 w-4 mr-2" />
                                Delete Recipe
                              </DropdownMenu.Item>
                            </DropdownMenu.Content>
                          </DropdownMenu.Root>

                          <Button
                            variant="ghost"
                            size="icon"
                            class="h-8 w-8"
                            onclick={() => toggleFavorite(recipe)}
                            aria-label={recipe.isFavorite
                              ? 'Remove from favorites'
                              : 'Add to favorites'}
                          >
                            <Heart
                              class={`h-4 w-4 ${
                                recipe.isFavorite
                                  ? 'text-red-500 fill-red-500'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            class="h-8 w-8"
                            onclick={() => navigateToRecipeDetails(recipe.id)}
                            aria-label={`Edit ${recipe.name}`}
                          >
                            <Edit class="h-4 w-4" />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  {/each}
                {/if}
              </Table.Body>
            </Table.Root>
          </div>
        {:else}
          <!-- Compact View -->
          <ul class="space-y-2">
            {#if navigating.to}
              {#each skeletonRows as _}
                <li>
                  <Card.Root>
                    <Card.Content class="p-3">
                      <div class="flex items-center gap-3">
                        <Skeleton class="h-4 w-4" />
                        <Skeleton class="h-5 w-48" />
                        <div class="ml-auto flex gap-2">
                          <Skeleton class="h-6 w-16" />
                          <Skeleton class="h-6 w-16" />
                          <Skeleton class="h-6 w-6 rounded-full" />
                        </div>
                      </div>
                    </Card.Content>
                  </Card.Root>
                </li>
              {/each}
            {:else}
              {#each data.recipes as recipe (recipe.id)}
                <li>
                  <Card.Root
                    class="overflow-hidden hover:border-primary/50 hover:shadow-sm transition-all"
                  >
                    <Card.Content class="p-3">
                      <div class="flex items-center gap-2">
                        <Checkbox
                          checked={selectedRecipes.includes(recipe.id)}
                          onCheckedChange={() => toggleRecipeSelection(recipe.id)}
                          aria-label={`Select ${recipe.name}`}
                          onclick={(e) => e.stopPropagation()}
                        />

                        <button
                          class="flex-1 flex items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                          onclick={() => navigateToRecipeDetails(recipe.id)}
                          aria-label={`View details for ${recipe.name}`}
                        >
                          <span class="font-medium line-clamp-1 flex-1">{recipe.name}</span>

                          {#if recipe.ratings && recipe.ratings.length > 0}
                            <span class="text-xs flex items-center gap-0.5 text-muted-foreground">
                              <Star class="h-3 w-3 text-amber-500 fill-amber-500" />
                              {calculateAverageRating(recipe.ratings)}
                            </span>
                          {/if}

                          {#if recipe.cookTime}
                            <span
                              class="text-xs flex items-center gap-0.5 text-muted-foreground whitespace-nowrap"
                            >
                              <Clock class="h-3 w-3" />
                              {formatCookTime(recipe.cookTime)}
                            </span>
                          {/if}

                          {#if recipe.foodCost}
                            <span
                              class="text-xs flex items-center gap-0.5 text-muted-foreground whitespace-nowrap"
                            >
                              <DollarSign class="h-3 w-3" />
                              {formatPrice(recipe.foodCost)}
                            </span>
                          {/if}

                          {#if recipe.skillLevel}
                            <Badge
                              variant="outline"
                              class={`${getSkillLevelColor(recipe.skillLevel)} text-xs py-0`}
                            >
                              {recipe.skillLevel}
                            </Badge>
                          {/if}
                        </button>

                        <div class="flex gap-1 ml-auto">
                          <Button
                            variant="ghost"
                            size="icon"
                            class="h-7 w-7"
                            onclick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(recipe);
                            }}
                            aria-label={recipe.isFavorite
                              ? 'Remove from favorites'
                              : 'Add to favorites'}
                          >
                            <Heart
                              class={`h-4 w-4 ${
                                recipe.isFavorite
                                  ? 'text-red-500 fill-red-500'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          </Button>

                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                              <Button
                                variant="ghost"
                                size="icon"
                                class="h-7 w-7"
                                aria-label="More options"
                              >
                                <Settings class="h-4 w-4" />
                              </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content align="end">
                              <DropdownMenu.Item onclick={() => navigateToRecipeDetails(recipe.id)}>
                                <Edit class="h-4 w-4 mr-2" />
                                Edit Recipe
                              </DropdownMenu.Item>
                              <DropdownMenu.Item onclick={() => addToMealPlan([recipe.id])}>
                                <Calendar class="h-4 w-4 mr-2" />
                                Add to Meal Plan
                              </DropdownMenu.Item>
                              <DropdownMenu.Item onclick={() => addToShoppingList([recipe.id])}>
                                <ShoppingCart class="h-4 w-4 mr-2" />
                                Add to Shopping List
                              </DropdownMenu.Item>
                              <DropdownMenu.Separator />
                              <DropdownMenu.Item
                                onclick={() => confirmDelete(recipe)}
                                class="text-destructive focus:text-destructive"
                              >
                                <Trash2 class="h-4 w-4 mr-2" />
                                Delete Recipe
                              </DropdownMenu.Item>
                            </DropdownMenu.Content>
                          </DropdownMenu.Root>
                        </div>
                      </div>
                    </Card.Content>
                  </Card.Root>
                </li>
              {/each}
            {/if}
          </ul>
        {/if}
      {/key}
    {/if}
  </section>

  <!-- Pagination -->
  {#if data?.pagination && data.totalCount > data.pagination.perPage}
    <nav class="flex justify-center mt-8" aria-label="Pagination">
      <Pagination.Root
        count={data.totalCount}
        perPage={data.pagination.perPage}
        page={data.pagination.currentPage}
      >
        {#snippet children({ pages, currentPage })}
          <Pagination.Content>
            <Pagination.Item>
              {#if currentPage}
                <div in:fade={{ duration: 100 }}>
                  <Pagination.PrevButton
                    onclick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Go to previous page"
                  />
                </div>
              {/if}
            </Pagination.Item>

            {#each pages as page (page.key)}
              {#if page.type === 'ellipsis'}
                <Pagination.Item>
                  <div in:fade>
                    <Pagination.Ellipsis />
                  </div>
                </Pagination.Item>
              {:else}
                <Pagination.Item>
                  <div in:fade={{ duration: 100 }}>
                    <Pagination.Link
                      {page}
                      isActive={currentPage === page.value}
                      onclick={() => handlePageChange(page.value)}
                      aria-label={`Go to page ${page.value}`}
                      aria-current={currentPage === page.value ? 'page' : undefined}
                    >
                      {page.value}
                    </Pagination.Link>
                  </div>
                </Pagination.Item>
              {/if}
            {/each}

            <Pagination.Item>
              {#if currentPage}
                <div in:fade={{ duration: 100 }}>
                  <Pagination.NextButton
                    onclick={() => handlePageChange(currentPage + 1)}
                    aria-label="Go to next page"
                    disabled={currentPage === Math.ceil(data.totalCount / data.pagination.perPage)}
                  />
                </div>
              {/if}
            </Pagination.Item>
          </Pagination.Content>
        {/snippet}
      </Pagination.Root>
    </nav>
  {/if}
</main>

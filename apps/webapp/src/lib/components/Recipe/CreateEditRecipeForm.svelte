<script lang="ts">
  import { preventDefault } from 'svelte/legacy';

  import { onMount } from 'svelte';
  import { Plus, Search, Edit, Trash2, ChevronLeft } from 'lucide-svelte';
  import { api } from '@ckm/lib-api';
  import type { Recipe, Restaurant, CookBook, Ingredient } from '@ckm/types';

  let currentView: 'list' | 'create' | 'edit' | 'view' = $state('list');
  let currentRecipe: RecipeFormData | null = $state(null);
  let errors: string[] = $state([]);

  // New variables for additional data
  let restaurants: Restaurant[] = [];
  let cookBooks: CookBook[] = [];
  let ingredientsList: Ingredient[] = [];

  // Step management
  let currentStep: number = $state(1);
  const totalSteps = 3;

  interface RecipeFormData {
    id?: string;
    name: string;
    imageUrl?: string;
    description?: string | null;
    servings: number;
    cookTime: number;
    prepTime: number;
    frequency?: number | null;
    foodCost?: number | null;
    restaurantId?: string;
    cookBookId?: string;
    ingredients: Array<{
      id: numbner;
      quantity: number;
      unit: string;
      ingredientId: string;
    }>;
    instructions: Array<{
      stepNumber: number;
      instruction: string;
    }>;
  }

  // Function to handle navigation between steps
  function nextStep() {
    if (currentStep < totalSteps) {
      currentStep += 1;
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      currentStep -= 1;
    }
  }

  function addRecipe() {
    currentRecipe = {
      name: '',
      imageUrl: '',
      description: '',
      servings: 1,
      cookTime: 0,
      prepTime: 0,
      frequency: null,
      foodCost: null,
      restaurantId: '',
      cookBookId: '',
      ingredients: [],
      instructions: []
    };
    currentView = 'create';
    currentStep = 1;
    errors = [];
  }

  // Other functions remain the same...

  async function handleSubmit() {
    try {
      // Data preparation remains the same...

      if (currentView === 'create') {
        await api.recipe.createRecipe({ body: data });
      } else if (currentView === 'edit') {
        await api.recipe.updateRecipe({
          params: { id: currentRecipe.id },
          body: data
        });
      }
      await fetchRecipes();
      currentView = 'list';
      currentRecipe = null;
      errors = [];
    } catch (error: any) {
      console.error('Failed to save recipe:', error);
      errors = [error.message || 'Failed to save recipe'];
    }
  }

  // AddIngredient, removeIngredient, addInstruction, removeInstruction functions remain the same...

  function goBack() {
    currentView = 'list';
    currentRecipe = null;
    errors = [];
  }
</script>

<!-- Main Container -->
<div class="container p-4 mx-auto">
  <!-- Create/Edit Recipe Form -->
  {#if currentView === 'create' || currentView === 'edit'}
    <div class="max-w-3xl p-8 mx-auto bg-white rounded-lg shadow-md">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-semibold text-gray-800">
          {currentView === 'create' ? 'Create New Recipe' : 'Edit Recipe'}
        </h2>
        <button
          onclick={goBack}
          class="inline-flex items-center px-3 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
        >
          <ChevronLeft class="w-4 h-4 mr-1" />
          Back
        </button>
      </div>

      <!-- Step Indicators -->

      <!-- why is this not highlighted on active step? -->
      <div class="mb-8">
        <div class="flex items-center">
          {#each Array(totalSteps) as _, index}
            <div class="flex items-center">
              <div
                class="flex items-center justify-center w-8 h-8 text-white bg-indigo-600 rounded-full"
              >
                {index + 1}
              </div>
              {#if index < totalSteps - 1}
                <div class="flex-1 h-1 bg-indigo-300"></div>
              {/if}
            </div>
          {/each}
        </div>
        <div class="flex justify-between mt-2 text-sm text-gray-600">
          <span>Basic Info</span>
          <span>Ingredients</span>
          <span>Instructions</span>
        </div>
      </div>

      <!-- Display Errors -->
      {#if errors.length > 0}
        <div class="mb-4">
          {#each errors as error}
            <p class="text-sm text-red-600">{error}</p>
          {/each}
        </div>
      {/if}

      <form onsubmit={preventDefault(handleSubmit)}>
        {#if currentStep === 1}
          <!-- Step 1: Basic Info -->
          <div class="space-y-6">
            <!-- Recipe Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                bind:value={currentRecipe.name}
                required
                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <!-- Image URL -->
            <div>
              <label for="imageUrl" class="block text-sm font-medium text-gray-700">Image URL</label
              >
              <input
                type="text"
                id="imageUrl"
                bind:value={currentRecipe.imageUrl}
                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <!-- Description -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700"
                >Description</label
              >
              <textarea
                id="description"
                bind:value={currentRecipe.description}
                rows="4"
                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>

            <!-- Servings, Prep Time, Cook Time -->
            <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label for="servings" class="block text-sm font-medium text-gray-700"
                  >Servings</label
                >
                <input
                  type="number"
                  id="servings"
                  bind:value={currentRecipe.servings}
                  required
                  min="1"
                  class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label for="prepTime" class="block text-sm font-medium text-gray-700"
                  >Prep Time (mins)</label
                >
                <input
                  type="number"
                  id="prepTime"
                  bind:value={currentRecipe.prepTime}
                  required
                  min="0"
                  class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label for="cookTime" class="block text-sm font-medium text-gray-700"
                  >Cook Time (mins)</label
                >
                <input
                  type="number"
                  id="cookTime"
                  bind:value={currentRecipe.cookTime}
                  required
                  min="0"
                  class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <!-- Restaurant and CookBook -->
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label for="restaurantId" class="block text-sm font-medium text-gray-700"
                  >Restaurant</label
                >
                <select
                  id="restaurantId"
                  bind:value={currentRecipe.restaurantId}
                  required
                  class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a restaurant</option>
                  {#each restaurants as restaurant}
                    <option value={restaurant.id}>{restaurant.name}</option>
                  {/each}
                </select>
              </div>
              <div>
                <label for="cookBookId" class="block text-sm font-medium text-gray-700"
                  >CookBook</label
                >
                <select
                  id="cookBookId"
                  bind:value={currentRecipe.cookBookId}
                  required
                  class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a cookbook</option>
                  {#each cookBooks as cookBook}
                    <option value={cookBook.id}>{cookBook.name}</option>
                  {/each}
                </select>
              </div>
            </div>
          </div>
        {:else if currentStep === 2}
          <!-- Step 2: Ingredients -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-700">Ingredients</h3>
            {#if currentRecipe}
              {#each currentRecipe.ingredients as ingredient, index}
                <div class="flex items-center space-x-2">
                  <select
                    id="ingredient-id-{index}"
                    bind:value={ingredient.ingredientId}
                    required
                    class="flex-1 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select an ingredient</option>
                    {#each ingredientsList as ing}
                      <option value={ing.id}>{ing.name}</option>
                    {/each}
                  </select>
                  <input
                    type="number"
                    id="ingredient-quantity-{index}"
                    placeholder="Quantity"
                    bind:value={ingredient.quantity}
                    required
                    min="0"
                    class="w-24 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    id="ingredient-unit-{index}"
                    placeholder="Unit"
                    bind:value={ingredient.unit}
                    required
                    class="w-24 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onclick={() => removeIngredient(index)}
                    class="p-2 text-red-600 hover:text-red-800"
                    aria-label="Remove ingredient"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              {/each}
            {/if}
            <button
              type="button"
              onclick={addIngredient}
              class="inline-flex items-center px-3 py-2 mt-4 text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none"
            >
              <Plus class="w-4 h-4 mr-2" />
              Add Ingredient
            </button>
          </div>
        {:else if currentStep === 3}
          <!-- Step 3: Instructions -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-700">Instructions</h3>
            {#if currentRecipe && currentRecipe.instructions}
              {#each currentRecipe.instructions as instruction, index}
                <div class="flex items-start space-x-2">
                  <span class="mt-2 text-gray-700">{index + 1}.</span>
                  <textarea
                    id="instruction-text-{index}"
                    placeholder="Instruction"
                    bind:value={instruction.instruction}
                    required
                    class="flex-1 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  ></textarea>
                  <button
                    type="button"
                    onclick={() => removeInstruction(index)}
                    class="p-2 mt-1 text-red-600 hover:text-red-800"
                    aria-label="Remove instruction"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              {/each}
            {/if}
            <button
              type="button"
              onclick={addInstruction}
              class="inline-flex items-center px-3 py-2 mt-4 text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none"
            >
              <Plus class="w-4 h-4 mr-2" />
              Add Instruction
            </button>
          </div>
        {/if}

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-8">
          {#if currentStep > 1}
            <button
              type="button"
              onclick={prevStep}
              class="inline-flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
            >
              <ChevronLeft class="w-4 h-4 mr-1" />
              Previous
            </button>
          {/if}
          {#if currentStep < totalSteps}
            <button
              type="button"
              onclick={nextStep}
              class="inline-flex items-center px-4 py-2 ml-auto text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Next
              <ChevronLeft class="w-4 h-4 ml-1 transform rotate-180" />
            </button>
          {:else}
            <button
              type="submit"
              class="inline-flex items-center px-4 py-2 ml-auto text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none"
            >
              Save Recipe
            </button>
          {/if}
        </div>
      </form>
    </div>
  {/if}
</div>

<style>
  /* Custom styles for step indicators */
  .step-active {
    background-color: #4f46e5;
  }
  .step-inactive {
    background-color: #a5b4fc;
  }
</style>

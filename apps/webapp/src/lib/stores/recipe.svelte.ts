// recipe.svelte.ts
import { type Conversion, conversions } from '$lib/utils/ingredientsConversion';
import { api } from '@ckm/lib-api';
import convertUnitsHelper, { isWeightUnit } from '$lib/utils/unitConvertionVolumeToWeight';
import { recipeStore } from '$lib/stores/recipeStore';
import type { Recipe, RecipeFormData } from '@ckm/types';

type ViewState = 'list' | 'create' | 'edit' | 'view';

export class RecipeState {
  // State variables
  recipes = $state([]);
  searchTerm = $state('');
  currentView: ViewState = $state('list');
  currentRecipe: RecipeFormData | null = $state(null);
  errors = $state<string[]>([]);
  loading = $state(false);

  // Additional data
  restaurants = $state([]);
  cookBooks = $state([]);
  ingredientsList = $state([]);

  // Step management
  currentStep = $state(1);
  totalSteps = 4;

  // Pagination state variables
  totalCount = $state(0);
  currentPage = $state(1);
  itemsPerPage = $state(10);

  // Standardization variables
  isStandardizing = $state(false);
  standardizingIngredientIndex = $state<number | null>(null);
  standardizingToUnit = $state('');
  customConversions: Conversion[] = [];

  // All units
  allUnits = [
    ...new Set([
      ...conversions.map((conv) => conv.fromUnit),
      ...conversions.map((conv) => conv.toUnit),
    ]),
  ].sort();

  // Unit conversion variables
  isConvertingUnits = $state(false);
  currentIngredientIndex = $state<number | null>(null);
  newUnit = $state('');
  convertedQuantity = $state<number | null>(null);

  // Scaling variables
  isScaling = $state(false);
  scaleFactor = $state(1);

  // Ingredient total cost
  ingredientTotalCost = $state(0);

  // Total pages
  totalPages = $derived(() => Math.ceil(this.totalCount / this.itemsPerPage));

  // Unsubscribe function for store
  unsubscribe: (() => void) | undefined;

  constructor() {
    // Effects to watch for changes
    $effect(() => {
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages || 1;
      }
    });

    $effect(() => {
      if (this.searchTerm !== '') {
        this.currentPage = 1;
        this.fetchRecipes();
      }
    });

    $effect(() => {
      if (this.currentRecipe) {
        this.ingredientTotalCost = this.currentRecipe.ingredients.reduce((acc, ingredient) => {
          const ing = this.ingredientsList.find((i) => i.id === ingredient.ingredientId);
          return ing && ing.price ? acc + ing.price * ingredient.quantity : acc;
        }, 0);
      }
    });

    $effect(() => {
      if (this.currentView === 'view') {
        this.isScaling = false;
        this.isConvertingUnits = false;
      }
    });
  }

  async init() {
    await this.fetchRestaurants();
    await this.fetchCookBooks();
    await this.fetchIngredients();
    this.fetchRecipes();

    // Subscribe to the store
    this.unsubscribe = recipeStore.subscribe((state) => {
      this.recipes = state.recipes;
      this.loading = state.loading;
      this.errors = [state.error];
      this.totalCount = state.totalCount;
      this.currentPage = state.currentPage;
      this.itemsPerPage = state.itemsPerPage;
    });
  }

  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  // Methods
  goBack() {
    this.currentView = 'list';
    this.currentRecipe = null;
    this.errors = [];
  }

  startStandardization(index: number) {
    this.standardizingIngredientIndex = index;
    this.standardizingToUnit = '';
    this.isStandardizing = true;
  }

  closeStandardizationModal() {
    this.isStandardizing = false;
    this.standardizingIngredientIndex = null;
    this.standardizingToUnit = '';
  }

  applyStandardization() {
    if (this.standardizingIngredientIndex === null || !this.currentRecipe) return;
    const ingredient = this.currentRecipe.ingredients[this.standardizingIngredientIndex];

    try {
      const convertedQuantity = convertUnitsHelper(
        ingredient.quantity,
        ingredient.unit,
        this.standardizingToUnit,
        undefined,
        this.customConversions
      );

      this.currentRecipe.ingredients[this.standardizingIngredientIndex] = {
        ...ingredient,
        quantity: convertedQuantity,
        unit: this.standardizingToUnit,
      };

      this.closeStandardizationModal();
    } catch (error) {
      console.error(
        `Failed to convert ${ingredient.quantity} ${ingredient.unit} of ingredient ID ${ingredient.ingredientId}`,
        error
      );
      alert('Conversion failed. Please check the units and try again.');
    }
  }

  openUnitConversion(index: number) {
    this.currentIngredientIndex = index;
    this.isConvertingUnits = true;
    this.newUnit = '';
    this.convertedQuantity = null;
  }

  closeUnitConversion() {
    this.isConvertingUnits = false;
    this.currentIngredientIndex = null;
    this.newUnit = '';
    this.convertedQuantity = null;
  }

  convertUnit() {
    if (this.currentIngredientIndex === null || !this.currentRecipe) return;
    const ingredient = this.currentRecipe.ingredients[this.currentIngredientIndex];
    try {
      const result = convertUnitsHelper(ingredient.quantity, ingredient.unit, this.newUnit);
      this.convertedQuantity = result;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  }

  applyUnitConversion() {
    if (
      this.currentIngredientIndex === null ||
      this.convertedQuantity === null ||
      !this.currentRecipe
    )
      return;
    this.currentRecipe.ingredients[this.currentIngredientIndex].quantity = this.convertedQuantity;
    this.currentRecipe.ingredients[this.currentIngredientIndex].unit = this.newUnit;
    this.closeUnitConversion();
  }

  scaleRecipe() {
    if (!this.currentRecipe) return;

    if (isNaN(this.scaleFactor) || this.scaleFactor <= 0) {
      alert('Please enter a valid positive number for scaling.');
      return;
    }

    this.currentRecipe.servings = Math.round(this.currentRecipe.servings * this.scaleFactor);
    this.currentRecipe.ingredients = this.currentRecipe.ingredients.map((ingredient) => ({
      ...ingredient,
      quantity: ingredient.quantity * this.scaleFactor,
    }));

    this.isScaling = false;
  }

  resetScaling() {
    if (!this.currentRecipe) return;
    this.fetchRecipes();
    this.isScaling = false;
    this.scaleFactor = 1;
  }

  handleClickOutside(event: MouseEvent) {
    const modal = document.querySelector('.modal-content');
    if (modal && !modal.contains(event.target as Node)) {
      this.closeUnitConversion();
    }
  }

  standardizeIngredients() {
    if (!this.currentRecipe) return;

    this.currentRecipe.ingredients = this.currentRecipe.ingredients.map((ingredient) => {
      if (isWeightUnit(ingredient.unit)) {
        return ingredient;
      }

      try {
        const convertedQuantity = convertUnitsHelper(
          ingredient.quantity,
          ingredient.unit,
          'gram',
          undefined,
          this.customConversions
        );

        return {
          ...ingredient,
          quantity: convertedQuantity,
          unit: 'gram',
        };
      } catch (error) {
        console.error(
          `Failed to convert ${ingredient.quantity} ${ingredient.unit} of ingredient ID ${ingredient.ingredientId}`,
          error
        );
        return ingredient;
      }
    });
  }

  fetchRecipes() {
    const skip = (this.currentPage - 1) * this.itemsPerPage;
    recipeStore.fetchRecipes({ skip, take: this.itemsPerPage, searchTerm: this.searchTerm });
  }

  async fetchRestaurants() {
    try {
      const response = await api.restaurant.getRestaurants({});
      if (response.status === 200) {
        this.restaurants = response.body;
      } else {
        throw new Error(`Error fetching restaurants: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Failed to fetch restaurants:', error);
      this.errors = [error.message || 'Failed to fetch restaurants'];
    }
  }

  async fetchCookBooks() {
    try {
      const response = await api.cookbook.getCookBooks({});
      if (response.status === 200) {
        this.cookBooks = response.body;
      } else {
        throw new Error(`Error fetching cookBooks: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Failed to fetch cookBooks:', error);
      this.errors = [error.message || 'Failed to fetch cookBooks'];
    }
  }

  async fetchIngredients() {
    try {
      const response = await api.ingredient.getIngredients({});
      if (response.status === 200) {
        this.ingredientsList = response.body;
      } else {
        throw new Error(`Error fetching ingredients: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Failed to fetch ingredients:', error);
      this.errors = [error.message || 'Failed to fetch ingredients'];
    }
  }

  addRecipe() {
    this.currentRecipe = {
      name: '',
      imageUrl: '',
      description: '',
      servings: 0,
      cookTime: 0,
      prepTime: 0,
      frequency: null,
      foodCost: null,
      restaurantId: 0,
      cookBookId: 0,
      ingredients: [],
      instructions: [],
    };
    this.currentView = 'create';
    this.errors = []; // Clear previous errors
  }

  editRecipe(recipe: Recipe) {
    if (!recipe) return;
    this.currentRecipe = {
      id: recipe.id,
      name: recipe.name,
      imageUrl: recipe.imageUrl && recipe.imageUrl.length > 0 ? recipe.imageUrl[0] : '',
      description: recipe.description,
      servings: recipe.servings,
      cookTime: recipe.cookTime,
      prepTime: recipe.prepTime,
      frequency: recipe.frequency,
      foodCost: recipe.foodCost,
      restaurantId: recipe.restaurantId,
      cookBookId: recipe.cookBookId,
      ingredients: recipe.ingredients.map((ingredient) => ({
        id: ingredient.id, // RecipeIngredient ID
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        ingredientId: ingredient.ingredientId,
      })),
      instructions: recipe.instructions.map((instruction) => ({
        id: instruction.id, // RecipeInstruction ID
        stepNumber: instruction.stepNumber,
        instruction: instruction.instruction,
        imageUrl: instruction.imageUrl,
      })),
    };
    this.currentView = 'edit';
    this.errors = []; // Clear previous errors
  }

  viewRecipe(recipe: Recipe) {
    this.currentRecipe = {
      id: recipe.id,
      name: recipe.name,
      imageUrl: recipe.imageUrl && recipe.imageUrl.length > 0 ? recipe.imageUrl[0] : '',
      description: recipe.description,
      servings: recipe.servings,
      cookTime: recipe.cookTime,
      prepTime: recipe.prepTime,
      frequency: recipe.frequency,
      foodCost: recipe.foodCost,
      restaurantId: recipe.restaurantId,
      cookBookId: recipe.cookBookId,
      ingredients: recipe.ingredients.map((ingredient) => ({
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        ingredientId: ingredient.ingredientId,
      })),
      instructions: recipe.instructions.map((instruction) => ({
        stepNumber: instruction.stepNumber,
        instruction: instruction.instruction,
        imageUrl: instruction.imageUrl,
        id: instruction.id,
      })),
    };
    this.currentView = 'view';
    this.errors = []; // Clear previous errors
  }

  async deleteRecipe(id: number) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      try {
        await api.recipe.deleteRecipe({ params: { id } });
        this.fetchRecipes();
      } catch (error: any) {
        console.error('Failed to delete recipe:', error);
        this.errors = [error.message || 'Failed to delete recipe'];
      }
    }
  }

  async handleSubmit() {
    try {
      if (
        !this.currentRecipe ||
        this.currentRecipe.ingredients.length === 0 ||
        this.currentRecipe.instructions.length === 0
      ) {
        throw new Error(`Recipe must have at least one ingredient and one instruction`);
      }

      let data: any;

      if (this.currentView === 'create') {
        // Construct data for creation
        data = {
          name: this.currentRecipe.name,
          imageUrl: this.currentRecipe.imageUrl ? [this.currentRecipe.imageUrl] : [],
          description: this.currentRecipe.description,
          servings: this.currentRecipe.servings,
          cookTime: this.currentRecipe.cookTime,
          prepTime: this.currentRecipe.prepTime,
          frequency: this.currentRecipe.frequency,
          foodCost: this.currentRecipe.foodCost,
          restaurant: {
            connect: { id: this.currentRecipe.restaurantId },
          },
          cookBook: {
            connect: { id: this.currentRecipe.cookBookId },
          },
          ingredients: {
            create: this.currentRecipe.ingredients.map((ingredient) => ({
              quantity: ingredient.quantity,
              unit: ingredient.unit,
              ingredient: {
                connect: { id: ingredient.ingredientId },
              },
            })),
          },
          instructions: {
            create: this.currentRecipe.instructions.map((instruction) => ({
              stepNumber: instruction.stepNumber,
              instruction: instruction.instruction,
              imageUrl: instruction.imageUrl,
            })),
          },
        };

        // Call the create API endpoint
        recipeStore.createRecipe(data);
      } else if (this.currentView === 'edit') {
        // Collect IDs for deletion
        const originalRecipe = this.recipes.find((r) => r.id === this.currentRecipe?.id);
        if (!originalRecipe) throw new Error('Original recipe not found');

        const deleteIngredientIds = originalRecipe.ingredients
          .filter(
            (origIng) =>
              !this.currentRecipe?.ingredients.some((currIng) => currIng.id === origIng.id)
          )
          .map((ing) => ing.id);

        const deleteInstructionIds = originalRecipe.instructions
          .filter(
            (origInst) =>
              !this.currentRecipe?.instructions.some((currInst) => currInst.id === origInst.id)
          )
          .map((inst) => inst.id);

        const deleteIds = {
          ingredientIds: deleteIngredientIds,
          instructionIds: deleteInstructionIds,
        };

        // Construct data for updating
        data = {
          name: this.currentRecipe.name,
          imageUrl: this.currentRecipe.imageUrl ? [this.currentRecipe.imageUrl] : [],
          description: this.currentRecipe.description,
          servings: this.currentRecipe.servings,
          cookTime: this.currentRecipe.cookTime,
          prepTime: this.currentRecipe.prepTime,
          frequency: this.currentRecipe.frequency,
          foodCost: this.currentRecipe.foodCost,
          restaurant: {
            connect: { id: this.currentRecipe.restaurantId },
          },
          cookBook: {
            connect: { id: this.currentRecipe.cookBookId },
          },
          ingredients: {
            update: this.currentRecipe.ingredients
              .filter((ingredient) => ingredient.id)
              .map((ingredient) => ({
                where: { id: ingredient.id },
                data: {
                  quantity: ingredient.quantity,
                  unit: ingredient.unit,
                  ingredient: {
                    connect: { id: ingredient.ingredientId },
                  },
                },
              })),
            create: this.currentRecipe.ingredients
              .filter((ingredient) => !ingredient.id)
              .map((ingredient) => ({
                quantity: ingredient.quantity,
                unit: ingredient.unit,
                ingredient: {
                  connect: { id: ingredient.ingredientId },
                },
              })),
          },
          instructions: {
            update: this.currentRecipe.instructions
              .filter((instruction) => instruction.id)
              .map((instruction) => ({
                where: { id: instruction.id },
                data: {
                  stepNumber: instruction.stepNumber,
                  instruction: instruction.instruction,
                  imageUrl: instruction.imageUrl,
                },
              })),
            create: this.currentRecipe.instructions
              .filter((instruction) => !instruction.id)
              .map((instruction) => ({
                stepNumber: instruction.stepNumber,
                instruction: instruction.instruction,
                imageUrl: instruction.imageUrl,
              })),
          },
        };

        if (!this.currentRecipe.id) {
          throw new Error('Recipe ID not found');
        }

        // Call the update API endpoint
        await api.recipe.updateRecipe({
          params: { id: +this.currentRecipe.id },
          body: { data, deleteIds },
        });
      }

      // Post-operation steps
      this.fetchRecipes();
      this.currentView = 'list';
      this.currentRecipe = null;
      this.errors = [];
    } catch (error: any) {
      console.error('Failed to save recipe:', error);
      this.errors = [error.message || 'Failed to save recipe'];
    }
  }

  addIngredient() {
    if (!this.currentRecipe) return;
    this.currentRecipe.ingredients = [
      ...this.currentRecipe.ingredients,
      { ingredientId: 0, quantity: 0, unit: '' },
    ];
  }

  removeIngredient(index: number) {
    if (!this.currentRecipe) return;
    this.currentRecipe.ingredients = this.currentRecipe.ingredients.filter((_, i) => i !== index);
  }

  addInstruction() {
    if (!this.currentRecipe) return;
    this.currentRecipe.instructions = [
      ...this.currentRecipe.instructions,
      {
        stepNumber: this.currentRecipe.instructions.length + 1,
        instruction: '',
        id: 0,
      },
    ];
  }

  removeInstruction(index: number) {
    if (!this.currentRecipe) return;
    this.currentRecipe.instructions = this.currentRecipe.instructions.filter((_, i) => i !== index);
    // Adjust step numbers
    this.currentRecipe.instructions = this.currentRecipe.instructions.map((instr, idx) => ({
      ...instr,
      stepNumber: idx + 1,
    }));
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep += 1;
      if (this.currentStep === 4) {
        this.calculateIngredientTotalCost();
      }
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
    }
  }

  calculateIngredientTotalCost() {
    if (!this.currentRecipe) return;
    this.ingredientTotalCost = this.currentRecipe.ingredients.reduce((total, ingredient) => {
      const ing = this.ingredientsList.find((ing) => ing.id === ingredient.ingredientId);
      if (ing && ing.price) {
        return total + ing.price * ingredient.quantity;
      }
      return total;
    }, 0);
    // Update foodCost with ingredientTotalCost
    this.currentRecipe.foodCost = this.ingredientTotalCost;
  }
}


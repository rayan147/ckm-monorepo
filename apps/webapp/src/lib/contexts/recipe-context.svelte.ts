// src/lib/recipe/RecipeContext.ts
import { setContext, getContext } from 'svelte';
import { zodSchemas } from '@ckm/db';
import { z } from 'zod';

const RecipeIngredientWithRelationSchema = zodSchemas.RecipeIngredientSchema.extend({
  ingredient: zodSchemas.IngredientSchema,
})

const RecipeCriticalPointSchema = zodSchemas.RecipeCriticalPointSchema.omit({
  id: true,
  recipeId: true,
  createdAt: true,
  updatedAt: true
})

const RecipeEquipmentSchema = zodSchemas.RecipeEquipmentSchema.omit({
  id: true,
  recipeId: true
})

const RecipeTags = zodSchemas.RecipeTagSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})

const DietaryRestrictionSchema = zodSchemas.DietaryRestrictionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})

const CookBookSchema = zodSchemas.CookBookSchema.omit({
  id: true,
  restaurantId: true

})

const NutritionalInfoSchema = zodSchemas.RecipeNutritionSchema.omit({
  id: true,
  recipeId: true
})

const RecipeWithNutritionAndInstructionsAndIngredientsSchema = zodSchemas.RecipeSchema.extend({
  nutritionalInfo: NutritionalInfoSchema.nullable(),
  instructions: z.array(zodSchemas.RecipeInstructionSchema),
  ingredients: z.array(RecipeIngredientWithRelationSchema),
  tags: z.array(RecipeTags),
  dietaryRestrictions: z.array(DietaryRestrictionSchema),
  cookBook: CookBookSchema,
  equiments: z.array(RecipeEquipmentSchema),
  criticalPoints: z.array(RecipeCriticalPointSchema)
})

export type RecipeIncludes = z.infer<typeof RecipeWithNutritionAndInstructionsAndIngredientsSchema>

export class RecipeState {
  recipe = $state<RecipeIncludes>({
    id: 0,
    name: '',
    description: '',
    servings: 1,
    prepTime: 0,
    cookTime: 0,
    imageUrls: [''],
    restaurantId: 1,
    cookBookId: 1,
    foodCost: 0,
    frequency: 0,
    isDeleted: false,
    isPublished: false,
    publishedAt: null,
    language: 'en',
    skillLevel: 'INTERMEDIATE',
    category: zodSchemas.CategorySchema.enum.MAIN_COURSE,
    // Relationships with empty arrays/null values
    ingredients: [],
    instructions: [],
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0,
      servingSize: 0,
      servingUnit: 'gram',
      // Initialize all allergen properties
      containsGluten: false,
      containsDairy: false,
      containsNuts: false,
      containsEggs: false,
      containsSoy: false,
      containsFish: false,
      containsShellfish: false,
      containsSesame: false,
    },
    tags: [{
      name: '',
      description: ''
    }],
    dietaryRestrictions: [{
      name: '',
      description: '',
      icon: '',
    }],
    cookBook: {
      name: '',
      category: '',
      imageUrl: ''
    },
    equiments: [{
      notes: '',
      equipmentId: 1,
      recipeInstructionId: 1,

    }],
    criticalPoints: [
      {
        stepNumber: 0,
        description: '',
        unit: '',
        action: '',
        threshold: 5,



      }
    ]

  })
  currentStep: number = $state(1);
  completedSteps: number[] = $state([]);
  activeTab: string = 'overview';
  showTimer: boolean = $state(false);
  timerMinutes: number = $state(0);
  timerSeconds: number = $state(0)
  timerRunning: boolean = $state(false);
  timerInterval: ReturnType<typeof setTimeout> | undefined = undefined;
  showImageModal: boolean = $state(false);
  currentImage: string = $state('');
  currentImageAlt: string = $state('')
  showCompletionModal: boolean = $state(false)

  constructor(recipe: RecipeIncludes) {
    this.recipe = recipe;
  }

  // FIXED: Completely rewritten step completion management
  markStepComplete(stepNumber: number): void {
    // Only add the step if it's not already in the array
    if (!this.isStepCompleted(stepNumber)) {
      // Create a brand new array with all existing items plus the new one
      // Sort the array to ensure consistent order
      const newCompletedSteps = [...this.completedSteps, stepNumber].sort((a, b) => a - b);

      // Explicitly assign the new array to trigger reactivity
      this.completedSteps = newCompletedSteps;

      console.log(`Step ${stepNumber} marked complete. Current completed steps:`, this.completedSteps);
    }
  }

  // ADDED: Separate helper to check step completion status
  isStepCompleted(stepNumber: number): boolean {
    return this.completedSteps.includes(stepNumber);
  }

  // FIXED: Simplified navigation without auto-completion
  goToStep(stepNumber: number): void {
    if (stepNumber >= 1 &&
      this.recipe.instructions &&
      stepNumber <= this.recipe.instructions.length) {
      this.currentStep = stepNumber;
      console.log(`Navigated to step ${stepNumber}`);
    }
  }

  nextStep(): void {
    if (this.recipe.instructions &&
      this.currentStep < this.recipe.instructions.length) {
      this.currentStep = this.currentStep + 1;
      console.log(`Moved to next step: ${this.currentStep}`);
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep = this.currentStep - 1;
      console.log(`Moved to previous step: ${this.currentStep}`);
    }
  }

  // ADDED: Method to handle the "Complete & Continue" action
  completeAndContinue(): void {
    // First mark the current step as complete
    this.markStepComplete(this.currentStep);

    // Then move to the next step if possible
    if (this.recipe.instructions &&
      this.currentStep < this.recipe.instructions.length) {
      this.nextStep();
    } else {
      // If this is the last step, show completion modal
      this.finishRecipe();
    }
  }

  // Timer methods
  startTimer(minutes: number): void {
    // Clear any existing timer
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerRunning = false;
    }

    this.timerMinutes = minutes;
    this.timerSeconds = 0;
    this.showTimer = true;
  }

  toggleTimer(): void {
    if (!this.timerRunning) {
      this.timerRunning = true;
      this.timerInterval = setInterval(() => {
        if (this.timerSeconds > 0) {
          this.timerSeconds--;
        } else if (this.timerMinutes > 0) {
          this.timerMinutes--;
          this.timerSeconds = 59;
        } else {
          if (this.timerInterval) clearInterval(this.timerInterval);
          this.timerRunning = false;
        }
      }, 1000);
    } else {
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.timerRunning = false;
    }
  }

  resetTimer(): void {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerRunning = false;
    this.showTimer = false;
  }

  // Image modal methods
  openImageModal(imageUrl: string, alt: string): void {
    this.currentImage = imageUrl;
    this.currentImageAlt = alt;
    this.showImageModal = true;
  }

  closeImageModal(): void {
    this.showImageModal = false;
  }

  // Completion modal
  finishRecipe(): void {
    this.showCompletionModal = true;
  }

  closeCompletionModal(): void {
    this.showCompletionModal = false;
  }

  // Helper methods
  getProgressValue(): number {
    return this.recipe.instructions?.length
      ? (this.completedSteps.length / this.recipe.instructions.length) * 100
      : 0;
  }

  formatTime(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} minutes`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0
        ? `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`
        : `${hours} hour${hours > 1 ? 's' : ''}`;
    }
  }

  getTotalTime(): string {
    const total = (this.recipe.prepTime || 0) + (this.recipe.cookTime || 0);
    return this.formatTime(total);
  }


  // Calculate nutrition-related methods
  calculatePercentage(value: number, max: number): number {
    return Math.min(Math.round((value / max) * 100), 100);
  }

  // Check if recipe has complete nutrition data
  hasNutritionData(): boolean {
    return Boolean(
      this.recipe.nutritionalInfo &&
      (this.recipe.nutritionalInfo.calories > 0 ||
        this.recipe.nutritionalInfo.protein > 0 ||
        this.recipe.nutritionalInfo.carbohydrates > 0 ||
        this.recipe.nutritionalInfo.fat > 0)
    );
  }

  // Get daily value percentages
  getDailyValuePercentage(nutrientValue: number, dailyValue: number): number {
    if (!nutrientValue || !dailyValue) return 0;
    return Math.min(Math.round((nutrientValue / dailyValue) * 100), 100);
  }

  // Format nutrition values (helper method)
  formatNutrient(value: number | null | undefined, decimals: number = 1): string {
    if (value === null || value === undefined) return '—';
    return value.toFixed(decimals);
  }
}

// Context key (using a Symbol for uniqueness)
const RECIPE_CONTEXT_KEY = Symbol('recipe-state');

// Context setter and getter
export function setRecipeContext(recipeState: RecipeState): void {
  setContext(RECIPE_CONTEXT_KEY, recipeState);
}

export function getRecipeContext(): RecipeState {
  return getContext(RECIPE_CONTEXT_KEY) as RecipeState;
}

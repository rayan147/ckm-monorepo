import { zodSchemas } from '@ckm/db';

import { z } from 'zod';
import { initContract } from '@ts-rest/core';


const c = initContract();

export const recipeContract = c.router({
  // Existing Endpoints
  createRecipe: {
    method: 'POST',
    path: '/recipes',
    responses: {
      201: zodSchemas.RecipeSchema,
      400: z.object({ message: z.string() }),
    },
    body: z.any(),
    summary: 'Create a new recipe',
  },

  uploadFileS3: {
    method: 'POST',
    path: '/recipes/upload',
    contentType: 'multipart/form-data',
    responses: {
      201: z.object({
        url: z.string()
        // uploadFileS3: z.object({
        //   name: z.string(),
        //   size: z.number(),
        //   type: z.string(),
        //   url: z.string(),
        // })
      }),
      400: z.object({ message: z.string() }),
    },
    body: z.string(),
    summary: 'uploads recipe images to s3 bucket',
  },

  getRecipes: {
    method: 'GET',
    path: '/recipes',
    responses: {
      200: z.object({ recipes: z.array(zodSchemas.RecipeSchema), totalCount: z.number() }),
    },
    query: z.object({
      skip: z.coerce.number().optional(),
      take: z.coerce.number().optional(),
      restaurantId: z.coerce.number().optional(),
      searchTerm: z.string().optional(),
    }),
    summary: 'Get all recipes',
  },
  getRecipe: {
    method: 'GET',
    path: '/recipes/:id',
    pathParams: z.object({
      id: z.coerce.number(),
    }),
    responses: {
      200: zodSchemas.RecipeSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get a recipe by ID',
  },

  updateRecipe: {
    method: 'PUT',
    path: '/recipes/:id',
    pathParams: z.object({
      id: z.coerce.number(),
    }),
    responses: {
      200: zodSchemas.RecipeSchema,
      400: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    body: zodSchemas.RecipeUpdateInputSchema,

    summary: 'Update a recipe',
  },
  deleteRecipe: {
    method: 'DELETE',
    path: '/recipes/:id',
    pathParams: z.object({
      id: z.coerce.number(),
    }),
    responses: {
      200: zodSchemas.RecipeSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete a recipe',
  },
  // Ingredient Management
  addIngredientToRecipe: {
    method: 'POST',
    path: '/recipes/:recipeId/ingredients',
    pathParams: z.object({
      recipeId: z.coerce.number(),
    }),
    responses: {
      200: zodSchemas.RecipeIngredientSchema,
      400: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    body: zodSchemas.RecipeIngredientUncheckedCreateInputSchema,
    summary: 'Add an ingredient to a recipe',
  },
  removeIngredientFromRecipe: {
    method: 'DELETE',
    path: '/recipes/:recipeId/ingredients/:id',
    pathParams: z.object({
      recipeId: z.coerce.number(),
      id: z.coerce.number(),
    }),
    responses: {
      200: zodSchemas.RecipeIngredientSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Remove an ingredient from a recipe',
  },
  updateIngredientInRecipe: {
    method: 'PUT',
    path: '/recipes/:recipeId/ingredients/:id',
    pathParams: z.object({
      recipeId: z.coerce.number(),
      id: z.coerce.number(),
    }),
    responses: {
      200: zodSchemas.RecipeIngredientSchema,
      400: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    body: zodSchemas.RecipeIngredientUncheckedUpdateInputSchema,
    summary: 'Update an ingredient in a recipe',
  },
  getRecipeIngredients: {
    method: 'GET',
    path: '/recipes/:recipeId/ingredients',
    pathParams: z.object({
      recipeId: z.coerce.number(),
    }),
    responses: {
      200: z.array(zodSchemas.RecipeIngredientSchema),
      404: z.object({ message: z.string() }),
    },
    summary: 'Get all ingredients for a recipe',
  },
  getRecipeIngredient: {
    method: 'GET',
    path: '/recipes/:recipeId/ingredients/:id',
    pathParams: z.object({
      recipeId: z.coerce.number(),
      id: z.coerce.number(),
    }),
    responses: {
      200: zodSchemas.RecipeIngredientSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get a specific ingredient from a recipe',
  },
  // Instruction Management
  addInstructionToRecipe: {
    method: 'POST',
    path: '/recipes/:recipeId/instructions',
    pathParams: z.object({
      recipeId: z.coerce.number(),
    }),
    responses: {
      200: zodSchemas.RecipeInstructionSchema,
      400: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    body: zodSchemas.RecipeInstructionCreateInputSchema,
    summary: 'Add an instruction to a recipe',
  },
  removeInstructionFromRecipe: {
    method: 'DELETE',
    path: '/recipes/:recipeId/instructions/:id',
    pathParams: z.object({
      recipeId: z.coerce.number(),
      id: z.coerce.number(),
    }),
    responses: {
      200: zodSchemas.RecipeInstructionSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Remove an instruction from a recipe',
  },
  updateInstructionInRecipe: {
    method: 'PUT',
    path: '/recipes/:recipeId/instructions/:id',
    pathParams: z.object({
      recipeId: z.coerce.number(),
      id: z.coerce.number(),
    }),
    responses: {
      200: zodSchemas.RecipeInstructionSchema,
      400: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    body: zodSchemas.RecipeInstructionUpdateInputSchema,
    summary: 'Update an instruction in a recipe',
  },
  getRecipeInstruction: {
    method: 'GET',
    path: '/recipes/:recipeId/instructions/:id',
    pathParams: z.object({
      recipeId: z.coerce.number(),
      id: z.coerce.number(),
    }),
    responses: {
      200: zodSchemas.RecipeInstructionSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get a specific instruction from a recipe',
  },
  getRecipeInstructions: {
    method: 'GET',
    path: '/recipes/:recipeId/instructions',
    pathParams: z.object({
      recipeId: z.coerce.number(),
    }),
    responses: {
      200: z.array(zodSchemas.RecipeInstructionSchema),
      404: z.object({ message: z.string() }),
    },
    summary: 'Get all instructions for a recipe',
  },
  // Food Cost and Pricing
  calculateFoodCost: {
    method: 'POST',
    path: '/recipes/:recipeId/calculate-food-cost',
    pathParams: z.object({
      recipeId: z.coerce.number(),
    }),
    responses: {
      200: z.object({ totalCost: z.number() }),
      404: z.object({ message: z.string() }),
    },
    body: z.object({
      ingredientPrices: z.array(z.object({ ingredientId: z.number(), price: z.number() })),
    }),
    summary: 'Calculate the total food cost for a recipe',
  },
  getFoodCostHistory: {
    method: 'GET',
    path: '/recipes/:recipeId/food-cost-history',
    pathParams: z.object({
      recipeId: z.coerce.number(),
    }),
    responses: {
      200: z.array(zodSchemas.FoodCostHistorySchema),
      404: z.object({ message: z.string() }),
    },
    summary: 'Get the food cost history for a recipe',
  },
  calculateRecipePrice: {
    method: 'POST',
    path: '/recipes/:recipeId/calculate-price',
    pathParams: z.object({
      recipeId: z.coerce.number(),
    }),
    body: z.object({
      profitMargin: z.number().optional(), // Profit margin as a decimal (e.g., 0.3 for 30%)
    }),
    responses: {
      200: z.object({ price: z.number() }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Calculate the selling price for a recipe',
  },
  getRecipePrice: {
    method: 'GET',
    path: '/recipes/:recipeId/price',
    pathParams: z.object({
      recipeId: z.coerce.number(),
    }),
    query: z.object({
      profitMargin: z.number().optional(), // Optional profit margin
    }),
    responses: {
      200: z.object({ price: z.number() }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Get the selling price for a recipe',
  },
});

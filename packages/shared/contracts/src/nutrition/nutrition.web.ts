import { zodSchemas } from "@ckm/db";
import { initContract } from "@ts-rest/core";
import { coerce, z } from "zod";

// Define USDA food structure for use in responses
const UsdaFoodSchema = z.object({
  fdcId: z.union([z.string(), z.number()]),
  description: z.string(),
  dataType: z.string().optional(),
  foodCategory: z.string().optional(),
  brandOwner: z.string().optional(),
  foodNutrients: z.array(
    z.object({
      nutrient: z.object({
        id: z.number(),
        name: z.string(),
        unitName: z.string().optional()
      }).optional(),
      nutrientId: z.number().optional(),
      nutrientName: z.string().optional(),
      amount: z.number().optional(),
      value: z.number().optional(),
      unitName: z.string().optional()
    })
  ).optional()
});

// Updated USDA search response
const UsdaSearchResponseSchema = z.object({
  foods: z.array(UsdaFoodSchema).optional(),
  totalHits: z.number().optional(),
  currentPage: z.number().optional(),
  totalPages: z.number().optional()
});

// Define schema for manual nutrition data input
const ManualNutritionInputSchema = z.object({
  calories: z.number().min(0).max(1000),
  protein: z.number().min(0).max(100),
  carbohydrates: z.number().min(0).max(100),
  fat: z.number().min(0).max(100),
  fiber: z.number().min(0).max(50),
  sugar: z.number().min(0).max(100),
  sodium: z.number().min(0).max(10000)
});

const c = initContract();

export const nutritionContract = c.router({
  getRecipeNutrition: {
    method: 'GET',
    path: '/recipes/:id/nutrition',
    pathParams: z.object({ id: coerce.number() }),
    responses: {
      200: zodSchemas.RecipeNutritionSchema,
      400: z.object({ message: z.string() })
    },
    summary: 'Get the calculated nutrition for the recipe'
  },

  calculateRecipeNutrition: {
    method: 'GET',
    path: '/recipes/:id/nutrition/calculate',
    pathParams: z.object({ id: coerce.number() }),
    responses: {
      200: zodSchemas.RecipeNutritionSchema,
      400: z.object({ message: z.string() })
    },
    summary: 'Force recalculation of recipe nutrition'
  },

  ingredientNutrition: {
    method: 'GET',
    path: 'ingredients/usda-search',
    query: z.object({
      query: z.string(),
      pageSize: z.coerce.number()
    }),
    responses: {
      200: UsdaSearchResponseSchema,
      400: z.object({ message: z.string() })
    },
    summary: 'Search ingredients in USDA database'
  },

  importUSDANutrition: {
    method: 'POST',
    path: '/ingredients/:id/import-usda-nutrition',
    pathParams: z.object({ id: coerce.number() }),
    responses: {
      200: z.object({
        success: z.boolean(),
        message: z.string(),
        ingredient: z.any().optional() // Return updated ingredient
      }),
      400: z.object({ success: z.boolean(), message: z.string() })
    },
    body: z.object({
      usdaFoodId: z.string().optional()
    }),
    summary: 'Import nutrition data from USDA for an ingredient'
  },

  // New endpoint for manual nutrition data entry
  updateManualNutrition: {
    method: 'POST',
    path: '/ingredients/:id/manual-nutrition',
    pathParams: z.object({ id: coerce.number() }),
    responses: {
      200: z.object({
        success: z.boolean(),
        message: z.string(),
        ingredient: z.any().optional() // Return updated ingredient
      }),
      400: z.object({ success: z.boolean(), message: z.string() })
    },
    body: ManualNutritionInputSchema,
    summary: 'Manually update nutrition data for an ingredient'
  }
});

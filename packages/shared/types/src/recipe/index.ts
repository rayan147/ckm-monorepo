import { zodSchemas } from '@ckm/db';
import { z } from 'zod';
import { Recipe as BaseRecipe } from '@ckm/db';

export const RecipeIngredientCreateSchema = z.object({
  ingredientId: z.number(),
  quantity: z.string(),
  unit: z.string(),
});

export const RecipeInstructionSchema = z.object({
  id: z.number(),
  stepNumber: z.number(),
  instruction: z.string(), // This will be encrypted
  imageUrl: z.string().nullable(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  isDeleted: z.boolean(),
  deleted: z.date().nullable(),
});

export const RecipeInstructionCreateSchema = z.object({
  stepNumber: z.number(),
  instruction: z.string(),
  imageUrl: z.string().optional(),
});

export const RecipeCreateSchema = z.object({
  name: z.string(),
  imageUrl: z.array(z.string()),
  description: z.string().optional(),
  servings: z.number(),
  cookTime: z.number(), restaurantId: z.number(), cookBookId: z.number(), ingredients: z.array(RecipeIngredientCreateSchema),
  instructions: z.array(RecipeInstructionCreateSchema),
});

export const RecipeFormDataSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  imageUrl: z.string().optional() || z.array(z.string()).optional(),
  description: z.string().optional().nullish(),
  servings: z.number(),
  cookTime: z.number(),
  prepTime: z.number(),
  frequency: z.number().optional().nullable(),
  foodCost: z.number().optional().nullable(),
  restaurantId: z.number().optional().nullable(),
  cookBookId: z.number().optional().nullable(),
  isDeleted: z.boolean().default(false).optional(),
  ingredients: z.array(RecipeIngredientCreateSchema),
  instructions: z.array(RecipeInstructionCreateSchema),
})

export interface Recipe extends BaseRecipe {
  instructions: Array<{
    id: number;
    stepNumber: number;
    instruction: string;
    imageUrl?: string;
  }>;
  ingredients: Array<{
    quantity: number;
    unit: string;
    ingredientId: number;
  }>;
}

export const RecipeUpdateSchema = RecipeCreateSchema.partial();

export type RecipeFormData = z.infer<typeof RecipeFormDataSchema>;
export type RecipeCreate = z.infer<typeof zodSchemas.RecipeCreateInputSchema>;
export type RecipeUpdate = z.infer<typeof RecipeUpdateSchema>;

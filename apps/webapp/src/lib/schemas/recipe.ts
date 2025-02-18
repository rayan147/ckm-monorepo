import { z } from 'zod';

export const IngredientSchema = z.object({
  ingredientId: z.number().positive(),
  quantity: z.number().positive(),
  unit: z.string().min(1)
});

export const RecipeSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(500).optional(),
  cookTime: z.number().positive(),
  prepTime: z.number().positive(),
  servings: z.number().positive(),
  ingredients: z.array(IngredientSchema).min(1),
  instructions: z.array(z.string().min(10)).min(1)
});

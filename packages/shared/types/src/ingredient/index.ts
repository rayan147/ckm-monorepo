import { z } from 'zod';

export const IngredientSchema = z.object({
    id: z.number(),
    name: z.string(),
    category: z.string(),
  });
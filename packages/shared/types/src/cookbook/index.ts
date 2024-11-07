import { zodSchemas } from '@ckm/db';
import { z } from "zod"

export const CookBookSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
  recipes: z.array(zodSchemas.RecipeSchema),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const CookBookCreateSchema = CookBookSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  recipes: true,
})

export const CookBookUpdateSchema = CookBookCreateSchema.partial()

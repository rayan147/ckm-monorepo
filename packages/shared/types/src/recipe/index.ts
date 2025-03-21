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

// Helper schemas
const nutrientSchema = z.object({
  nutrientId: z.number(),
  nutrientName: z.string(),
  nutrientNumber: z.string(),
  value: z.number().optional(),       // Assuming nutrient values exist
  unitName: z.string().optional(),
  derivationCode: z.string().optional(),
  derivationDescription: z.string().optional(),
});

const foodMeasureSchema = z.object({
  disseminationText: z.string().optional(),
  gramWeight: z.number().optional(),
  id: z.number().optional(),
  modifier: z.string().optional(),
  rank: z.number().optional(),
});

const foodAttributeSchema = z.object({
  id: z.number(),
  value: z.union([z.string(), z.number()]),
  name: z.string(),
  sequenceNumber: z.number().optional(),
});

const finalFoodInputFoodSchema = z.object({
  foodDescription: z.string(),
  gramWeight: z.number(),
  id: z.number(),
  portionCode: z.string().optional(),
  portionDescription: z.string().optional(),
  unit: z.string().optional(),
});

// Main schema
const usdaFoodItemSchema = z.object({
  fdcId: z.number(),
  description: z.string(),
  dataType: z.enum(["Branded", "Survey (FNDDS)", "Foundation", "SR Legacy"]),
  brandName: z.string().nullable().optional(),
  brandOwner: z.string().nullable().optional(),
  dataSource: z.string().optional(),
  allHighlightFields: z.string().optional(),
  finalFoodInputFoods: z.array(finalFoodInputFoodSchema).optional(),
  foodAttributeTypes: z.array(z.string()).optional(), // Adjust based on actual structure
  foodAttributes: z.array(foodAttributeSchema).optional(),
  foodCategory: z.string(),
  foodMeasures: z.array(foodMeasureSchema).optional(),
  foodNutrients: z.array(nutrientSchema),
  foodVersionIds: z.array(z.number()).optional(),
  gtinUpc: z.string().optional(),
  householdServingFullText: z.string().optional(),
  ingredients: z.string().nullable().optional(),
  marketCountry: z.string().optional(),
  microbes: z.array(z.unknown()).optional(), // Update if structure is known
  modifiedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  packageWeight: z.string().optional(),
  publishedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  score: z.number().optional(),
  servingSize: z.number().optional(),
  servingSizeUnit: z.string().optional(),
  subbrandName: z.string().nullable().optional(),
  tradeChannels: z.array(z.enum(["NO_TRADE_CHANNEL", "CHILD_NUTRITION_FOOD_PROGRAMS", "GROCERY", "MASS_MERCHANDISING"])).optional(),
  additionalDescriptions: z.string().optional(),
  foodCode: z.number().optional(),
  foodClass: z.string().optional(),
  scientificName: z.string().optional(),
  ndbNumber: z.number().optional(),

});

export const usdaMatchesSchema = z.array(usdaFoodItemSchema);

// Type export
export type USDAFoodItem = z.infer<typeof usdaFoodItemSchema>;
export type USDAMatches = z.infer<typeof usdaMatchesSchema>;

export const RecipeUpdateSchema = RecipeCreateSchema.partial();

export type RecipeFormData = z.infer<typeof RecipeFormDataSchema>;
export type RecipeCreate = z.infer<typeof zodSchemas.RecipeCreateInputSchema>;
export type RecipeUpdate = z.infer<typeof RecipeUpdateSchema>;

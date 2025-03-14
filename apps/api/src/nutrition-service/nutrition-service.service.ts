// src/services/nutrition.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsdaApiService } from 'src/usda-api/usda-api.service';
import { RecipeNutrition } from '@ckm/db';
import conversionFactorsImport from './conversionFactors.json';
const conversionFactors: ConversionFactors = conversionFactorsImport;

// Define your types
type UnitConversion = {
  [unit: string]: number;
};

type CategoryConversion = {
  [unit: string]: UnitConversion;
};

type ConversionFactors = {
  volume: CategoryConversion;
  weight: CategoryConversion;
};

type NutritionProps = Pick<RecipeNutrition, 'calories' | 'protein' | 'carbohydrates' | 'fat' | 'fiber' | 'sugar' | 'sodium'>;

@Injectable()
export class NutritionService {
  constructor(
    private prisma: PrismaService,
    private usdaApiService: UsdaApiService,
  ) { }

  async calculateRecipeNutrition(recipeId: number): Promise<any> {
    // 1. Get recipe and all ingredients with quantities
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
        yields: true, // Get the recipe yield information
      },
    });

    if (!recipe) {
      throw new Error(`Recipe with ID ${recipeId} not found`);
    }

    // Get total recipe yield (for per-serving calculations)
    const recipeYield = recipe.yields.length > 0
      ? recipe.yields[0].expectedYield
      : recipe.servings;

    const servingUnit = recipe.yields.length > 0
      ? recipe.yields[0].unit
      : 'servings';

    // 2. Initialize nutritional totals
    const nutritionTotals = {
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0,
    } satisfies Partial<RecipeNutrition>
    console.log('Recipe ingredients:', recipe.ingredients.length);
    // 3. Calculate nutrition for each ingredient
    for (const recipeIngredient of recipe.ingredients) {
      const { ingredient, quantity, unit } = recipeIngredient;
      console.log('Processing ingredient:', {
        id: ingredient.id,
        name: ingredient.name,
        quantity,
        unit,
        hasNutrition: Boolean(ingredient.calories),
        usdaId: ingredient.usdaFoodId
      });
      // If ingredient doesn't have nutritional data, try to fetch it
      if (!ingredient.calories) {
        await this.updateIngredientNutrition(ingredient.id);
        // Refetch the ingredient with updated nutrition data
        const updatedIngredient = await this.prisma.ingredient.findUnique({
          where: { id: ingredient.id },
        });

        if (updatedIngredient) {
          Object.assign(ingredient, updatedIngredient);
        }
      }

      // Convert quantity to grams/ml for calculation
      const quantityInBaseUnit = await this.convertToBaseUnit(quantity, unit, ingredient.id);
      console.log('Converted quantity:', quantityInBaseUnit);
      // Add to recipe totals
      nutritionTotals.calories += (ingredient.calories || 0) * quantityInBaseUnit / 100;
      nutritionTotals.protein += (ingredient.protein || 0) * quantityInBaseUnit / 100;
      nutritionTotals.carbohydrates += (ingredient.carbohydrates || 0) * quantityInBaseUnit / 100;
      nutritionTotals.fat += (ingredient.fat || 0) * quantityInBaseUnit / 100;
      nutritionTotals.fiber += (ingredient.fiber || 0) * quantityInBaseUnit / 100;
      nutritionTotals.sugar += (ingredient.sugar || 0) * quantityInBaseUnit / 100;
      nutritionTotals.sodium += (ingredient.sodium || 0) * quantityInBaseUnit / 100;
      // After calculation
      console.log('Contribution to totals:', {
        calories: (ingredient.calories || 0) * quantityInBaseUnit / 100,
        protein: (ingredient.protein || 0) * quantityInBaseUnit / 100,
        // etc.
      });
    }

    console.log('Final nutrition totals:', nutritionTotals);
    // 4. Calculate per-serving values
    const perServingValues: NutritionProps = Object.keys(nutritionTotals).reduce((result, key) => {
      const nutritionKey = key as keyof NutritionProps;
      result[nutritionKey] = recipeYield > 0
        ? nutritionTotals[nutritionKey] / recipeYield
        : nutritionTotals[nutritionKey];
      return result;
    }, {} as NutritionProps);

    const perServingNutrition: Omit<RecipeNutrition, 'id' | 'recipeId'> = {
      servingSize: recipeYield > 0 ? (1 / recipeYield) : 1,
      servingUnit,
      ...perServingValues
    };

    // 5. Save nutrition information to database
    const recipeNutrition = await this.prisma.recipeNutrition.upsert({
      where: { recipeId },
      update: perServingNutrition,
      create: {
        recipeId,
        ...perServingNutrition,
      },
    }) satisfies RecipeNutrition

    return recipeNutrition;
  }

  async updateIngredientNutrition(ingredientId: number): Promise<any> {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id: ingredientId },
    });
    console.log('Current ingredient data:', ingredient);

    if (!ingredient) {
      throw new Error(`Ingredient with ID ${ingredientId} not found`);
    }

    let nutritionData;

    // If has USDA ID, fetch from API
    if (ingredient.usdaFoodId) {
      nutritionData = await this.usdaApiService.getFoodNutrition(ingredient.usdaFoodId);
    } else {
      // Try to search by name with the enhanced fallback search
      const searchName = ingredient.name
        .toLowerCase()
        .replace(/fresh|raw|frozen|cooked|dried|sliced|chopped|diced/g, '')
        .trim();

      // Use the new searchFoodsWithFallback method instead of searchFoods
      const searchResults = await this.usdaApiService.searchFoodsWithFallback(searchName);
      console.log(`USDA search with fallback for "${ingredient.name}":`, searchResults?.foods?.length || 0, 'results');

      if (searchResults.foods && searchResults.foods.length > 0) {
        // Get the top match
        const topMatch = searchResults.foods[0];
        nutritionData = await this.usdaApiService.getFoodNutrition(topMatch.fdcId);

        // Update with the USDA ID for future reference
        await this.prisma.ingredient.update({
          where: { id: ingredientId },
          data: {
            usdaFoodId: topMatch.fdcId.toString(),
            nutritionSource: 'USDA',
          },
        });
      }
    }

    if (nutritionData) {
      // Extract and normalize nutrition data
      const extractedData = {
        calories: this.extractNutrientValue(nutritionData, 'Energy'),
        protein: this.extractNutrientValue(nutritionData, 'Protein'),
        carbohydrates: this.extractNutrientValue(nutritionData, 'Carbohydrate, by difference'),
        fat: this.extractNutrientValue(nutritionData, 'Total lipid (fat)'),
        fiber: this.extractNutrientValue(nutritionData, 'Fiber, total dietary'),
        sugar: this.extractNutrientValue(nutritionData, 'Sugars, total including NLEA'),
        sodium: this.extractNutrientValue(nutritionData, 'Sodium, Na'),
      };

      // Use the new extraction method if available and if any values are missing
      if (this.usdaApiService.extractNutritionData &&
        Object.values(extractedData).some(val => val === null)) {
        try {
          // Use the new standardized extraction method which handles more formats
          const standardizedData = this.usdaApiService.extractNutritionData(nutritionData);
          if (standardizedData) {
            console.log('Using standardized nutrition extraction for missing values');
            // Merge data, preferring the original method but filling in gaps
            Object.entries(standardizedData).forEach(([key, value]) => {
              const typedKey = key as keyof typeof extractedData;
              if (extractedData[typedKey] === null && value !== null) {
                extractedData[typedKey] = value;
              }
            });
          }
        } catch (error) {
          console.warn('Error using standardized extraction, falling back to basic extraction', error);
        }
      }

      const updatedIngredient = await this.prisma.ingredient.update({
        where: { id: ingredientId },
        data: {
          ...extractedData,
          nutritionUpdatedAt: new Date(),
        },
      });

      console.log('Updated ingredient nutrition:', updatedIngredient);
      return updatedIngredient;
    }

    return ingredient;
  }

  private extractNutrientValue(nutritionData: any, nutrientName: string): number | null {
    if (!nutritionData || !nutritionData.foodNutrients) return null;

    const nutrient = nutritionData.foodNutrients.find(
      (n: any) => n.nutrient && n.nutrient.name === nutrientName
    );

    return nutrient ? nutrient.amount : null;
  }

  // Manually enter nutrition data for an ingredient
  async updateManualNutrition(
    ingredientId: number,
    nutritionData: {
      calories: number;
      protein: number;
      carbohydrates: number;
      fat: number;
      fiber: number;
      sugar: number;
      sodium: number;
    }
  ): Promise<any> {
    // Validate data ranges
    if (nutritionData.calories < 0 || nutritionData.protein < 0 ||
      nutritionData.carbohydrates < 0 || nutritionData.fat < 0 ||
      nutritionData.fiber < 0 || nutritionData.sugar < 0 ||
      nutritionData.sodium < 0) {
      throw new Error('Nutrition values cannot be negative');
    }

    // Check if protein + carbs + fat exceeds 100g per 100g (with small tolerance)
    const macroSum = nutritionData.protein + nutritionData.carbohydrates + nutritionData.fat;
    if (macroSum > 105) { // Allow 5% tolerance
      throw new Error(`Total of protein, carbs, and fat (${macroSum}g) exceeds 100g for a 100g portion`);
    }

    try {
      const updatedIngredient = await this.prisma.ingredient.update({
        where: { id: ingredientId },
        data: {
          ...nutritionData,
          nutritionSource: 'MANUAL',
          nutritionUpdatedAt: new Date(),
        },
      });

      return updatedIngredient;
    } catch (error) {
      console.error('Error updating manual nutrition data:', error);
      throw new Error('Failed to update ingredient nutrition data');
    }
  }

  // Enhanced convertToBaseUnit method
  private async convertToBaseUnit(
    quantity: number,
    unit: string,
    ingredientId: number
  ): Promise<number> {
    // Normalize the unit name
    const normalizedUnit = unit.toLowerCase().trim();

    // Get the ingredient for density information
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id: ingredientId },
      select: { density: true },
    });

    // Determine if the unit is weight or volume
    const category = this.determineUnitCategory(normalizedUnit);

    if (!category) {
      console.warn(`Unknown unit type: ${normalizedUnit}, using direct conversion fallback`);
      return this.directConversionFallback(quantity, normalizedUnit);
    }

    // Convert to the base unit for the category (grams for weight, milliliters for volume)
    const baseUnit = category === 'weight' ? 'gram' : 'milliliter';
    let convertedValue: number;

    try {
      // Use the conversion algorithm to convert to base unit
      convertedValue = this.convertWithinCategory(quantity, normalizedUnit, baseUnit, category);
      console.log(`Converted ${quantity} ${normalizedUnit} to ${convertedValue} ${baseUnit}`);
    } catch (error) {
      console.warn(`Conversion error: ${(error as { message: string }).message}, using direct conversion fallback`);
      convertedValue = this.directConversionFallback(quantity, normalizedUnit);
    }

    // Handle volume to weight conversion if needed
    if (category === 'volume' && ingredient?.density) {
      // If we converted to milliliters and have density, convert to grams
      convertedValue *= ingredient.density;
      console.log(`Applied density factor (${ingredient.density}): ${convertedValue} grams`);
    }

    return convertedValue;
  }
  // Helper to determine unit category
  private determineUnitCategory(unit: string): 'weight' | 'volume' | null {
    // Check if unit exists in weight category
    if (
      unit in conversionFactors.weight ||
      Object.values(conversionFactors.weight).some(conversions => unit in conversions)
    ) {
      return 'weight';
    }

    // Check if unit exists in volume category
    if (
      unit in conversionFactors.volume ||
      Object.values(conversionFactors.volume).some(conversions => unit in conversions)
    ) {
      return 'volume';
    }

    return null;
  }

  // Convert within a single category using the conversion factors
  private convertWithinCategory(
    value: number,
    fromUnit: string,
    toUnit: string,
    category: 'weight' | 'volume'
  ): number {
    if (fromUnit === toUnit) return value;

    const conversions = conversionFactors[category];

    // Direct conversion if available
    if (conversions[fromUnit] && conversions[fromUnit][toUnit]) {
      return value * conversions[fromUnit][toUnit];
    }

    // Inverse conversion if available
    if (conversions[toUnit] && conversions[toUnit][fromUnit]) {
      return value / conversions[toUnit][fromUnit];
    }

    // Try to find an intermediate unit for conversion
    const units = Object.keys(conversions);
    for (const intermediateUnit of units) {
      if (
        intermediateUnit !== fromUnit &&
        intermediateUnit !== toUnit &&
        (conversions[fromUnit]?.[intermediateUnit] || conversions[intermediateUnit]?.[fromUnit]) &&
        (conversions[toUnit]?.[intermediateUnit] || conversions[intermediateUnit]?.[toUnit])
      ) {
        // Convert from source to intermediate
        let intermediate = 0;
        if (conversions[fromUnit]?.[intermediateUnit]) {
          intermediate = value * conversions[fromUnit][intermediateUnit];
        } else {
          intermediate = value / conversions[intermediateUnit][fromUnit];
        }

        // Convert from intermediate to target
        if (conversions[intermediateUnit]?.[toUnit]) {
          return intermediate * conversions[intermediateUnit][toUnit];
        } else {
          return intermediate / conversions[toUnit][intermediateUnit];
        }
      }
    }

    throw new Error(`No conversion path found between ${fromUnit} and ${toUnit} in ${category}`);
  }

  // Fallback to direct conversion factors for common units
  private directConversionFallback(quantity: number, unit: string): number {
    // Direct conversion factors as a fallback
    const directConversions: Record<string, number> = {
      'kg': 1000,
      'kilogram': 1000,
      'g': 1,
      'gram': 1,
      'mg': 0.001,
      'milligram': 0.001,
      'lb': 453.592,
      'pound': 453.592,
      'oz': 28.3495,
      'ounce': 28.3495,
      'l': 1000,
      'liter': 1000,
      'ml': 1,
      'milliliter': 1,
      'cup': 240,
      'tbsp': 15,
      'tablespoon': 15,
      'tsp': 5,
      'teaspoon': 5,
      // Add more direct conversions as needed
    };

    const factor = directConversions[unit] || 1;
    console.log(`Applied direct conversion factor for ${unit}: ${factor}`);
    return quantity * factor;
  }
}

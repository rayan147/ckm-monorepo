import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { UsdaApiService } from 'src/usda-api/usda-api.service';
import { NutritionService } from './nutrition-service.service';
import { PrismaService } from '../prisma/prisma.service';
import { contract } from '@ckm/contracts';

// Remove the deprecated TsRest decorator
@Controller()
export class NutritionController {
  constructor(
    private readonly nutritionService: NutritionService,
    private readonly usdaApiService: UsdaApiService,
    private readonly prisma: PrismaService,
  ) { }

  @TsRestHandler(contract.nutrition.getRecipeNutrition)
  async getRecipeNutrition() {
    return tsRestHandler(contract.nutrition.getRecipeNutrition, async ({ params }) => {
      try {
        const nutrition = await this.nutritionService.calculateRecipeNutrition(params.id);
        return { status: 200, body: nutrition };
      } catch (error: unknown) {
        console.error('Error getting recipe nutrition:', error);
        return {
          status: 400,
          body: { message: error instanceof Error ? error.message : 'Failed to get nutrition data' }
        };
      }
    });
  }

  @TsRestHandler(contract.nutrition.calculateRecipeNutrition)
  async calculateRecipeNutrition() {
    return tsRestHandler(contract.nutrition.calculateRecipeNutrition, async ({ params }) => {
      try {
        const nutrition = await this.nutritionService.calculateRecipeNutrition(params.id);
        console.log({ nutrition });
        return { status: 200, body: nutrition };
      } catch (error: unknown) {
        console.error('Error calculating recipe nutrition:', error);
        return {
          status: 400,
          body: { message: error instanceof Error ? error.message : 'Failed to calculate nutrition data' }
        };
      }
    });
  }

  @TsRestHandler(contract.nutrition.ingredientNutrition)
  async searchUsdaIngredients() {
    return tsRestHandler(contract.nutrition.ingredientNutrition, async ({ query }) => {
      try {
        // Improve search query by removing common modifiers
        const cleanedQuery = query.query
          .toLowerCase()
          .replace(/fresh|raw|frozen|cooked|dried|sliced|chopped|diced/g, '')
          .trim();

        console.log(`Searching USDA for: "${cleanedQuery}" (original: "${query.query}")`);

        const results = await this.usdaApiService.searchFoods(
          cleanedQuery || query.query,
          query.pageSize
        );

        return { status: 200, body: results };
      } catch (error: unknown) {
        console.error('Error searching USDA ingredients:', error);
        return {
          status: 400,
          body: { message: error instanceof Error ? error.message : 'Failed to search USDA database' }
        };
      }
    });
  }

  @TsRestHandler(contract.nutrition.importUSDANutrition)
  async importUsdaNutrition() {
    return tsRestHandler(contract.nutrition.importUSDANutrition, async ({ params, body }) => {
      try {
        if (!body.usdaFoodId) {
          return {
            status: 400,
            body: { success: false, message: 'USDA Food ID is required' }
          };
        }

        // Get ingredient information for better log context
        const ingredient = await this.prisma.ingredient.findUnique({
          where: { id: params.id },
          select: { name: true }
        });

        console.log(`Importing USDA nutrition for "${ingredient?.name || 'unknown'}" (ID: ${params.id}) from USDA ID: ${body.usdaFoodId}`);

        // First update the ingredient with the USDA ID
        await this.prisma.ingredient.update({
          where: { id: params.id },
          data: {
            usdaFoodId: body.usdaFoodId,
            nutritionSource: 'USDA',
          },
        });

        // Then fetch and update the nutritional data
        const updatedIngredient = await this.nutritionService.updateIngredientNutrition(params.id);

        return {
          status: 200,
          body: {
            success: true,
            message: 'Nutrition data imported successfully',
            ingredient: updatedIngredient
          }
        };
      } catch (error: unknown) {
        console.error('Error importing USDA nutrition:', error);
        return {
          status: 400,
          body: {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to import nutrition data'
          }
        };
      }
    });
  }
}

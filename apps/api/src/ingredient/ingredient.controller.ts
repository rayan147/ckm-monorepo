import { contract } from '@ckm/contracts';
import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { LoggingService } from '../logging/logging.service';
import { IngredientService } from './ingredient.service';

@Controller()
export class IngredientController {
  constructor(
    private readonly ingredientService: IngredientService,
    private readonly logger: LoggingService,
  ) {
    this.logger.setContext(IngredientController.name);
  }

  @TsRestHandler(contract.ingredient.createIngredient)
  async createIngredient() {
    return tsRestHandler(contract.ingredient.createIngredient, async ({ body }) => {
      this.logger.log('Received request to create ingredient');
      const ingredient = await this.ingredientService.createIngredient(body);
      return { status: 201, body: ingredient };
    });
  }

  @TsRestHandler(contract.ingredient.getIngredients)
  async getIngredients() {
    return tsRestHandler(contract.ingredient.getIngredients, async ({ query }) => {
      this.logger.log('Received request to get ingredients');
      const ingredients = await this.ingredientService.getIngredients({
        skip: query.skip,
        take: query.take,
        where: query.where,
        orderBy: query.orderBy,
      });
      return { status: 200, body: ingredients };
    });
  }

  @TsRestHandler(contract.ingredient.getIngredient)
  async getIngredient() {
    return tsRestHandler(contract.ingredient.getIngredient, async ({ params }) => {
      this.logger.log(`Received request to get ingredient with ID ${params.id}`);
      const ingredient = await this.ingredientService.getIngredient(params.id);
      return { status: 200, body: ingredient };
    });
  }

  @TsRestHandler(contract.ingredient.updateIngredient)
  async updateIngredient() {
    return tsRestHandler(contract.ingredient.updateIngredient, async ({ params, body }) => {
      this.logger.log(`Received request to update ingredient with ID ${params.id}`);
      const ingredient = await this.ingredientService.updateIngredient(params.id, body);
      return { status: 200, body: ingredient };
    });
  }

  @TsRestHandler(contract.ingredient.deleteIngredient)
  async deleteIngredient() {
    return tsRestHandler(contract.ingredient.deleteIngredient, async ({ params }) => {
      this.logger.log(`Received request to delete ingredient with ID ${params.id}`);
      const ingredient = await this.ingredientService.deleteIngredient(params.id);
      return {
        status: 200,
        body: { message: 'Ingredient deleted successfully' },
      };
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggingService } from '../logging/logging.service';
import { Ingredient, Prisma } from '@ckm/db';

@Injectable()
export class IngredientService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggingService,
  ) {
    this.logger.setContext('IngredientService');
  }

  async createIngredient(
    data: Prisma.IngredientCreateInput,
  ): Promise<Ingredient> {
    try {
      return await this.prisma.ingredient.create({ data });
    } catch (error) {
      this.logger.handleError(error, 'Failed to create ingredient');
    }
  }

  async getIngredients(params: {
    skip?: number;
    take?: number;
    where?: Prisma.IngredientWhereInput;
    orderBy?: Prisma.IngredientOrderByWithRelationInput;
  }): Promise<Ingredient[]> {
    const { skip, take, where, orderBy } = params;
    try {
      return await this.prisma.ingredient.findMany({
        skip,
        take,
        where,
        orderBy,
      });
    } catch (error) {
      this.logger.handleError(error, 'Failed to fetch ingredients');
    }
  }

  async getIngredient(id: number): Promise<Ingredient> {
    try {
      const ingredient = await this.prisma.ingredient.findUnique({
        where: { id },
      });
      if (!ingredient) {
        throw new Error('Ingredient not found');
      }
      return ingredient;
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to fetch ingredient with ID ${id}`,
      );
    }
  }

  async updateIngredient(
    id: number,
    data: Prisma.IngredientUpdateInput,
  ): Promise<Ingredient> {
    try {
      return await this.prisma.ingredient.update({
        where: { id },
        data,
      });
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to update ingredient with ID ${id}`,
      );
    }
  }

  async deleteIngredient(id: number): Promise<Ingredient> {
    try {
      return await this.prisma.ingredient.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to delete ingredient with ID ${id}`,
      );
    }
  }
}

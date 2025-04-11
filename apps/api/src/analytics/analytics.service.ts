import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class AnalyticsService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggingService,
  ) {
    this.logger.setContext('AnalyticsService');
  }

  async getFoodCostHistory(recipeId: number, startDate: Date, endDate: Date) {
    try {
      return await this.prisma.foodCostHistory.findMany({
        where: {
          recipeId,
          date: { gte: startDate, lte: endDate },
        },
        orderBy: { date: 'asc' },
      });
    } catch (error) {
      this.logger.handleError(error, 'Failed to get food cost history');
    }
  }

  async getPrepHistory(recipeId: number, startDate: Date, endDate: Date) {
    try {
      return await this.prisma.prepHistory.findMany({
        where: {
          recipeId,
          date: { gte: startDate, lte: endDate },
        },
        orderBy: { date: 'asc' },
      });
    } catch (error) {
      this.logger.handleError(error, 'Failed to get prep history');
    }
  }

  async getMenuAnalytics(menuId: number) {
    try {
      const menuItems = await this.prisma.menuItem.findMany({
        where: { menuId },
        include: { recipes: true },
      });

      const lowestCostItem = menuItems.reduce((min, item) =>
        item.foodCost < min.foodCost ? item : min,
      );

      const highestCostItem = menuItems.reduce((max, item) =>
        item.foodCost > max.foodCost ? item : max,
      );

      const averageFoodCost =
        menuItems.reduce((sum, item) => sum + item.foodCost, 0) / menuItems.length;

      return { lowestCostItem, highestCostItem, averageFoodCost };
    } catch (error) {
      this.logger.handleError(error, 'Failed to get menu analytics');
    }
  }

  async getRecipeAnalytics(recipeId: number, startDate: Date, endDate: Date) {
    try {
      const prepHistory = await this.getPrepHistory(recipeId, startDate, endDate);
      const foodCostHistory = await this.getFoodCostHistory(recipeId, startDate, endDate);

      const totalPrepCount = prepHistory.reduce((sum, item) => sum + item.quantity, 0);
      const averagePrepsPerWeek =
        totalPrepCount / ((endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
      const averageFoodCost =
        foodCostHistory.reduce((sum, item) => sum + item.cost, 0) / foodCostHistory.length;

      const foodCostTrend = foodCostHistory.map(item => ({
        date: item.date.toISOString(),
        cost: item.cost,
      }));

      return {
        averagePrepsPerWeek,
        totalPrepCount,
        averageFoodCost,
        foodCostTrend,
      };
    } catch (error) {
      this.logger.handleError(error, 'Failed to get recipe analytics');
    }
  }

  async getRestaurantAnalytics(restaurantId: number, startDate: Date, endDate: Date) {
    try {
      const totalRecipes = await this.prisma.recipe.count({
        where: { restaurantId },
      });
      const totalMenuItems = await this.prisma.menuItem.count({
        where: { menu: { restaurantId } },
      });

      const recipes = await this.prisma.recipe.findMany({
        where: { restaurantId },
        include: { prepHistory: true, foodCostHistory: true },
      });

      const mostPreparedRecipes = recipes
        .map(recipe => ({
          recipe,
          prepCount: recipe.prepHistory.reduce((sum, item) => sum + item.quantity, 0),
        }))
        .sort((a, b) => b.prepCount - a.prepCount)
        .slice(0, 5);

      const averageFoodCost =
        recipes.reduce((sum, recipe) => {
          const recipeCosts = recipe.foodCostHistory.map(h => h.cost);
          return sum + recipeCosts.reduce((a, b) => a + b, 0) / recipeCosts.length;
        }, 0) / recipes.length;

      const foodCostTrend = await this.prisma.foodCostHistory.groupBy({
        by: ['date'],
        where: {
          recipe: { restaurantId },
          date: { gte: startDate, lte: endDate },
        },
        _avg: { cost: true },
      });

      return {
        totalRecipes,
        totalMenuItems,
        averageFoodCost,
        mostPreparedRecipes,
        foodCostTrend: foodCostTrend.map(item => ({
          date: item.date.toISOString(),
          cost: item._avg.cost,
        })),
      };
    } catch (error) {
      this.logger.handleError(error, 'Failed to get restaurant analytics');
    }
  }
}

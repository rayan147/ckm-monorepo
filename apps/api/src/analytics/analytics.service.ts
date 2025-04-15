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
      return [];
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
      return [];
    }
  }

  async getMenuAnalytics(menuId: number) {
    try {
      const menuItems = await this.prisma.menuItem.findMany({
        where: { menuId },
        include: { recipes: true },
      });

      // If no menu items found or empty array, return null
      if (!menuItems || menuItems.length === 0) {
        return null;
      }

      const lowestCostItem = menuItems.reduce((min, item) =>
        (item.foodCost !== null && item.foodCost !== undefined && 
         (min.foodCost === null || min.foodCost === undefined || item.foodCost < min.foodCost)) 
          ? item : min,
        menuItems[0]
      );

      const highestCostItem = menuItems.reduce((max, item) =>
        (item.foodCost !== null && item.foodCost !== undefined && 
         (max.foodCost === null || max.foodCost === undefined || item.foodCost > max.foodCost)) 
          ? item : max,
        menuItems[0]
      );

      // Safely calculate average, handle null/undefined values
      const validCosts = menuItems
        .map(item => item.foodCost)
        .filter(cost => cost !== null && cost !== undefined);
      
      const averageFoodCost = validCosts.length > 0 
        ? validCosts.reduce((sum, cost) => sum + cost, 0) / validCosts.length
        : 0;

      return { lowestCostItem, highestCostItem, averageFoodCost };
    } catch (error) {
      this.logger.handleError(error, 'Failed to get menu analytics');
      return null;
    }
  }

  async getRecipeAnalytics(recipeId: number, startDate: Date, endDate: Date) {
    try {
      const prepHistory = await this.getPrepHistory(recipeId, startDate, endDate) || [];
      const foodCostHistory = await this.getFoodCostHistory(recipeId, startDate, endDate) || [];

      // Safe calculation of total prep count
      const totalPrepCount = prepHistory.reduce((sum, item) => {
        const quantity = item.quantity !== null && item.quantity !== undefined ? item.quantity : 0;
        return sum + quantity; 
      }, 0);

      // Prevent division by zero
      const timeDiff = endDate.getTime() - startDate.getTime();
      const weeksCount = timeDiff > 0 ? timeDiff / (7 * 24 * 60 * 60 * 1000) : 1;
      const averagePrepsPerWeek = totalPrepCount / weeksCount;
      
      // Safe calculation of average food cost
      const averageFoodCost = foodCostHistory.length > 0 ?
        foodCostHistory.reduce((sum, item) => sum + (item.cost || 0), 0) / foodCostHistory.length : 0;

      // Safe mapping of food cost trend
      const foodCostTrend = foodCostHistory.map(item => ({
        date: item.date ? item.date.toISOString() : new Date().toISOString(),
        cost: item.cost || 0,
      }));

      return {
        averagePrepsPerWeek,
        totalPrepCount,
        averageFoodCost,
        foodCostTrend,
      };
    } catch (error) {
      this.logger.handleError(error, 'Failed to get recipe analytics');
      return {
        averagePrepsPerWeek: 0,
        totalPrepCount: 0,
        averageFoodCost: 0,
        foodCostTrend: [],
      };
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

      // Safely calculate most prepared recipes
      const mostPreparedRecipes = recipes
        .map(recipe => ({
          recipe,
          prepCount: recipe.prepHistory.reduce((sum, item) => sum + (item.quantity || 0), 0),
        }))
        .sort((a, b) => b.prepCount - a.prepCount)
        .slice(0, 5);

      // Safely calculate average food cost
      let averageFoodCost = 0;
      if (recipes.length > 0) {
        let validRecipeCount = 0;
        const totalCost = recipes.reduce((sum, recipe) => {
          const recipeCosts = recipe.foodCostHistory
            .map(h => h.cost)
            .filter(cost => cost !== null && cost !== undefined);
            
          if (recipeCosts.length > 0) {
            validRecipeCount++;
            return sum + recipeCosts.reduce((a, b) => a + b, 0) / recipeCosts.length;
          }
          return sum;
        }, 0);
        
        averageFoodCost = validRecipeCount > 0 ? totalCost / validRecipeCount : 0;
      }

      // Get food cost trend with error handling
      let foodCostTrend = [];
      try {
        const costTrendData = await this.prisma.foodCostHistory.groupBy({
          by: ['date'],
          where: {
            recipe: { restaurantId },
            date: { gte: startDate, lte: endDate },
          },
          _avg: { cost: true },
        });

        foodCostTrend = costTrendData.map(item => ({
          date: item.date ? item.date.toISOString() : new Date().toISOString(),
          cost: item._avg.cost ?? 0,
        }));
      } catch (groupByError) {
        this.logger.handleError(groupByError, 'Failed to get food cost trend');
      }

      return {
        totalRecipes,
        totalMenuItems,
        averageFoodCost,
        mostPreparedRecipes,
        foodCostTrend,
      };
    } catch (error) {
      this.logger.handleError(error, 'Failed to get restaurant analytics');
      return {
        totalRecipes: 0,
        totalMenuItems: 0,
        averageFoodCost: 0,
        mostPreparedRecipes: [],
        foodCostTrend: [],
      };
    }
  }
}

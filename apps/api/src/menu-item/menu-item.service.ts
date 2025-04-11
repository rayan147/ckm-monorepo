import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggingService } from '../logging/logging.service';
import { MenuItem, Prisma } from '@ckm/db';
import { Recipe } from '@ckm/db';
import { RecipeService } from '../recipe/recipe.service';

@Injectable()
export class MenuItemService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggingService,
    private recipeService: RecipeService,
  ) {
    this.logger.setContext('MenuItemService');
  }

  async getMenuItemFoodCost(menuItemId: number): Promise<number> {
    try {
      const menuItem = await this.getMenuItem(menuItemId);
      const foodCost = (
        await Promise.all(
          menuItem.recipes.map(async recipe => {
            const portion = recipe.servings;
            const recipeFoodCost = await this.recipeService.FindCostByRecipeId(recipe.id);
            return portion * recipeFoodCost;
          }),
        )
      ).reduce((acc, cost) => acc + cost, 0);

      return foodCost;
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to calculate menu item food cost for ID ${menuItemId}`,
      );
    }
  }
  async createMenuItem(data: Prisma.MenuItemCreateInput): Promise<MenuItem> {
    try {
      const menuItem = await this.prisma.menuItem.create({ data });
      const foodCost = await this.getMenuItemFoodCost(menuItem.id);
      await this.updateMenuItem(menuItem.id, { foodCost });
      return menuItem;
    } catch (error) {
      this.logger.handleError(error, 'Failed to create menu item');
    }
  }

  async getMenuItems(params: {
    skip?: number;
    take?: number;
    menuId?: number;
  }): Promise<MenuItem[]> {
    const { skip, take, menuId } = params;
    try {
      return await this.prisma.menuItem.findMany({
        where: { menuId },
        skip,
        take,
        include: { recipes: true },
      });
    } catch (error) {
      this.logger.handleError(error, 'Failed to fetch menu items');
    }
  }

  async getMenuItem(id: number): Promise<MenuItem & { recipes: Recipe[] }> {
    try {
      const menuItem = await this.prisma.menuItem.findUnique({
        where: { id },
        include: { recipes: true },
      });
      if (!menuItem) {
        throw new Error('Menu item not found');
      }
      return menuItem;
    } catch (error) {
      this.logger.handleError(error, `Failed to fetch menu item with ID ${id}`);
    }
  }

  async updateMenuItem(id: number, data: Prisma.MenuItemUpdateInput): Promise<MenuItem> {
    try {
      return await this.prisma.menuItem.update({
        where: { id },
        data,
        include: { recipes: true },
      });
    } catch (error) {
      this.logger.handleError(error, `Failed to update menu item with ID ${id}`);
    }
  }

  async deleteMenuItem(id: number): Promise<MenuItem> {
    try {
      return await this.prisma.menuItem.delete({
        where: { id },
        include: { recipes: true },
      });
    } catch (error) {
      this.logger.handleError(error, `Failed to delete menu item with ID ${id}`);
    }
  }

  async getMenuItemByRecipeId(recipeId: number): Promise<MenuItem> {
    try {
      const menuIem = await this.prisma.menuItem.findFirst({
        where: { recipes: { some: { id: recipeId } } },
        include: { recipes: true },
      });

      if (!menuIem) {
        throw new Error('Menu item not found');
      }

      return menuIem;
    } catch (error) {
      this.logger.handleError(error, `Failed to fetch menu item by recipe ID ${recipeId}`);
    }
  }

  async calculateMenuItemPrice(menuItemId: number): Promise<number> {
    try {
      const menuItem = await this.getMenuItem(menuItemId);
      const price = menuItem.recipes.reduce((acc, recipe) => {
        return acc + (recipe.foodCost ?? 0);
      }, 0);
      return price;
    } catch (error) {
      this.logger.handleError(error, `Failed to calculate menu item price for ID ${menuItemId}`);
    }
  }

  async calculateItemsPrice(menuItemIds: number[]): Promise<number> {
    try {
      const itemsPrice = await Promise.all(menuItemIds.map(id => this.calculateMenuItemPrice(id)));
      return itemsPrice.reduce((acc, price) => acc + price, 0);
    } catch (error) {
      this.logger.handleError(error, 'Failed to calculate items price');
    }
  }

  async calculateMenuItemFoodCostPercentage(menuItemId: number): Promise<number> {
    try {
      const menuItem = await this.getMenuItem(menuItemId);
      const foodCost = menuItem.recipes.reduce((acc, recipe) => {
        return acc + (recipe.foodCost ?? 0);
      }, 0);
      const price = menuItem.recipes.reduce((acc, recipe) => {
        return acc + (recipe.foodCost ?? 0);
      }, 0);
      return (foodCost / price) * 100;
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to calculate menu item food cost percentage for ID ${menuItemId}`,
      );
    }
  }

  async calculateItemsFoodCostPercentage(menuItemIds: number[]): Promise<number> {
    try {
      const itemsFoodCostPercentage = await Promise.all(
        menuItemIds.map(id => this.calculateMenuItemFoodCostPercentage(id)),
      );
      return itemsFoodCostPercentage.reduce((acc, price) => acc + price, 0);
    } catch (error) {
      this.logger.handleError(error, 'Failed to calculate items food cost percentage');
    }
  }

  async addRecipeToMenuItem(menuItemId: number, recipeId: number): Promise<MenuItem> {
    try {
      const menuItem = await this.getMenuItem(menuItemId);
      const recipe = await this.prisma.recipe.findUnique({
        where: { id: recipeId },
      });
      if (!recipe) {
        throw new Error('Recipe not found');
      }
      await this.prisma.menuItem.update({
        where: { id: menuItemId },
        data: { recipes: { connect: { id: recipeId } } },
      });
      return menuItem;
    } catch (error) {
      this.logger.handleError(error, `Failed to add recipe ${recipeId} to menu item ${menuItemId}`);
    }
  }
} //

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const logging_service_1 = require("../logging/logging.service");
const recipe_service_1 = require("../recipe/recipe.service");
let MenuItemService = class MenuItemService {
    constructor(prisma, logger, recipeService) {
        this.prisma = prisma;
        this.logger = logger;
        this.recipeService = recipeService;
        this.logger.setContext('MenuItemService');
    }
    async getMenuItemFoodCost(menuItemId) {
        try {
            const menuItem = await this.getMenuItem(menuItemId);
            const foodCost = (await Promise.all(menuItem.recipes.map(async (recipe) => {
                const portion = recipe.servings;
                const recipeFoodCost = await this.recipeService.FindCostByRecipeId(recipe.id);
                return portion * recipeFoodCost;
            }))).reduce((acc, cost) => acc + cost, 0);
            return foodCost;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to calculate menu item food cost for ID ${menuItemId}`);
        }
    }
    async createMenuItem(data) {
        try {
            const menuItem = await this.prisma.menuItem.create({ data });
            const foodCost = await this.getMenuItemFoodCost(menuItem.id);
            await this.updateMenuItem(menuItem.id, { foodCost });
            return menuItem;
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to create menu item');
        }
    }
    async getMenuItems(params) {
        const { skip, take, menuId } = params;
        try {
            return await this.prisma.menuItem.findMany({
                where: { menuId },
                skip,
                take,
                include: { recipes: true },
            });
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to fetch menu items');
        }
    }
    async getMenuItem(id) {
        try {
            const menuItem = await this.prisma.menuItem.findUnique({
                where: { id },
                include: { recipes: true },
            });
            if (!menuItem) {
                throw new Error('Menu item not found');
            }
            return menuItem;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to fetch menu item with ID ${id}`);
        }
    }
    async updateMenuItem(id, data) {
        try {
            return await this.prisma.menuItem.update({
                where: { id },
                data,
                include: { recipes: true },
            });
        }
        catch (error) {
            this.logger.handleError(error, `Failed to update menu item with ID ${id}`);
        }
    }
    async deleteMenuItem(id) {
        try {
            return await this.prisma.menuItem.delete({
                where: { id },
                include: { recipes: true },
            });
        }
        catch (error) {
            this.logger.handleError(error, `Failed to delete menu item with ID ${id}`);
        }
    }
    async getMenuItemByRecipeId(recipeId) {
        try {
            const menuIem = await this.prisma.menuItem.findFirst({
                where: { recipes: { some: { id: recipeId } } },
                include: { recipes: true },
            });
            if (!menuIem) {
                throw new Error('Menu item not found');
            }
            return menuIem;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to fetch menu item by recipe ID ${recipeId}`);
        }
    }
    async calculateMenuItemPrice(menuItemId) {
        try {
            const menuItem = await this.getMenuItem(menuItemId);
            const price = menuItem.recipes.reduce((acc, recipe) => {
                var _a;
                return acc + ((_a = recipe.foodCost) !== null && _a !== void 0 ? _a : 0);
            }, 0);
            return price;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to calculate menu item price for ID ${menuItemId}`);
        }
    }
    async calculateItemsPrice(menuItemIds) {
        try {
            const itemsPrice = await Promise.all(menuItemIds.map((id) => this.calculateMenuItemPrice(id)));
            return itemsPrice.reduce((acc, price) => acc + price, 0);
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to calculate items price');
        }
    }
    async calculateMenuItemFoodCostPercentage(menuItemId) {
        try {
            const menuItem = await this.getMenuItem(menuItemId);
            const foodCost = menuItem.recipes.reduce((acc, recipe) => {
                var _a;
                return acc + ((_a = recipe.foodCost) !== null && _a !== void 0 ? _a : 0);
            }, 0);
            const price = menuItem.recipes.reduce((acc, recipe) => {
                var _a;
                return acc + ((_a = recipe.foodCost) !== null && _a !== void 0 ? _a : 0);
            }, 0);
            return (foodCost / price) * 100;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to calculate menu item food cost percentage for ID ${menuItemId}`);
        }
    }
    async calculateItemsFoodCostPercentage(menuItemIds) {
        try {
            const itemsFoodCostPercentage = await Promise.all(menuItemIds.map((id) => this.calculateMenuItemFoodCostPercentage(id)));
            return itemsFoodCostPercentage.reduce((acc, price) => acc + price, 0);
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to calculate items food cost percentage');
        }
    }
    async addRecipeToMenuItem(menuItemId, recipeId) {
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
        }
        catch (error) {
            this.logger.handleError(error, `Failed to add recipe ${recipeId} to menu item ${menuItemId}`);
        }
    }
};
exports.MenuItemService = MenuItemService;
exports.MenuItemService = MenuItemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        logging_service_1.LoggingService,
        recipe_service_1.RecipeService])
], MenuItemService);
//# sourceMappingURL=menu-item.service.js.map
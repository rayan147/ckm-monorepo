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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const logging_service_1 = require("../logging/logging.service");
let AnalyticsService = class AnalyticsService {
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
        this.logger.setContext('AnalyticsService');
    }
    async getFoodCostHistory(recipeId, startDate, endDate) {
        try {
            return await this.prisma.foodCostHistory.findMany({
                where: {
                    recipeId,
                    date: { gte: startDate, lte: endDate },
                },
                orderBy: { date: 'asc' },
            });
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to get food cost history');
            return [];
        }
    }
    async getPrepHistory(recipeId, startDate, endDate) {
        try {
            return await this.prisma.prepHistory.findMany({
                where: {
                    recipeId,
                    date: { gte: startDate, lte: endDate },
                },
                orderBy: { date: 'asc' },
            });
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to get prep history');
            return [];
        }
    }
    async getMenuAnalytics(menuId) {
        try {
            const menuItems = await this.prisma.menuItem.findMany({
                where: { menuId },
                include: { recipes: true },
            });
            if (!menuItems || menuItems.length === 0) {
                return null;
            }
            const lowestCostItem = menuItems.reduce((min, item) => (item.foodCost !== null && item.foodCost !== undefined &&
                (min.foodCost === null || min.foodCost === undefined || item.foodCost < min.foodCost))
                ? item : min, menuItems[0]);
            const highestCostItem = menuItems.reduce((max, item) => (item.foodCost !== null && item.foodCost !== undefined &&
                (max.foodCost === null || max.foodCost === undefined || item.foodCost > max.foodCost))
                ? item : max, menuItems[0]);
            const validCosts = menuItems
                .map(item => item.foodCost)
                .filter(cost => cost !== null && cost !== undefined);
            const averageFoodCost = validCosts.length > 0
                ? validCosts.reduce((sum, cost) => sum + cost, 0) / validCosts.length
                : 0;
            return { lowestCostItem, highestCostItem, averageFoodCost };
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to get menu analytics');
            return null;
        }
    }
    async getRecipeAnalytics(recipeId, startDate, endDate) {
        try {
            const prepHistory = await this.getPrepHistory(recipeId, startDate, endDate) || [];
            const foodCostHistory = await this.getFoodCostHistory(recipeId, startDate, endDate) || [];
            const totalPrepCount = prepHistory.reduce((sum, item) => {
                const quantity = item.quantity !== null && item.quantity !== undefined ? item.quantity : 0;
                return sum + quantity;
            }, 0);
            const timeDiff = endDate.getTime() - startDate.getTime();
            const weeksCount = timeDiff > 0 ? timeDiff / (7 * 24 * 60 * 60 * 1000) : 1;
            const averagePrepsPerWeek = totalPrepCount / weeksCount;
            const averageFoodCost = foodCostHistory.length > 0 ?
                foodCostHistory.reduce((sum, item) => sum + (item.cost || 0), 0) / foodCostHistory.length : 0;
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
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to get recipe analytics');
            return {
                averagePrepsPerWeek: 0,
                totalPrepCount: 0,
                averageFoodCost: 0,
                foodCostTrend: [],
            };
        }
    }
    async getRestaurantAnalytics(restaurantId, startDate, endDate) {
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
                prepCount: recipe.prepHistory.reduce((sum, item) => sum + (item.quantity || 0), 0),
            }))
                .sort((a, b) => b.prepCount - a.prepCount)
                .slice(0, 5);
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
                foodCostTrend = costTrendData.map(item => {
                    var _a;
                    return ({
                        date: item.date ? item.date.toISOString() : new Date().toISOString(),
                        cost: (_a = item._avg.cost) !== null && _a !== void 0 ? _a : 0,
                    });
                });
            }
            catch (groupByError) {
                this.logger.handleError(groupByError, 'Failed to get food cost trend');
            }
            return {
                totalRecipes,
                totalMenuItems,
                averageFoodCost,
                mostPreparedRecipes,
                foodCostTrend,
            };
        }
        catch (error) {
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
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        logging_service_1.LoggingService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map
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
        }
    }
    async getMenuAnalytics(menuId) {
        try {
            const menuItems = await this.prisma.menuItem.findMany({
                where: { menuId },
                include: { recipes: true },
            });
            const lowestCostItem = menuItems.reduce((min, item) => item.foodCost < min.foodCost ? item : min);
            const highestCostItem = menuItems.reduce((max, item) => item.foodCost > max.foodCost ? item : max);
            const averageFoodCost = menuItems.reduce((sum, item) => sum + item.foodCost, 0) /
                menuItems.length;
            return { lowestCostItem, highestCostItem, averageFoodCost };
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to get menu analytics');
        }
    }
    async getRecipeAnalytics(recipeId, startDate, endDate) {
        try {
            const prepHistory = await this.getPrepHistory(recipeId, startDate, endDate);
            const foodCostHistory = await this.getFoodCostHistory(recipeId, startDate, endDate);
            const totalPrepCount = prepHistory.reduce((sum, item) => sum + item.quantity, 0);
            const averagePrepsPerWeek = totalPrepCount /
                ((endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
            const averageFoodCost = foodCostHistory.reduce((sum, item) => sum + item.cost, 0) /
                foodCostHistory.length;
            const foodCostTrend = foodCostHistory.map((item) => ({
                date: item.date.toISOString(),
                cost: item.cost,
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
                .map((recipe) => ({
                recipe,
                prepCount: recipe.prepHistory.reduce((sum, item) => sum + item.quantity, 0),
            }))
                .sort((a, b) => b.prepCount - a.prepCount)
                .slice(0, 5);
            const averageFoodCost = recipes.reduce((sum, recipe) => {
                const recipeCosts = recipe.foodCostHistory.map((h) => h.cost);
                return (sum + recipeCosts.reduce((a, b) => a + b, 0) / recipeCosts.length);
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
                foodCostTrend: foodCostTrend.map((item) => ({
                    date: item.date.toISOString(),
                    cost: item._avg.cost,
                })),
            };
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to get restaurant analytics');
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
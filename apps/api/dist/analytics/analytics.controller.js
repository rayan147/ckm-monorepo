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
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const nest_1 = require("@ts-rest/nest");
const contracts_1 = require("@ckm/contracts");
const analytics_service_1 = require("./analytics.service");
const logging_service_1 = require("../logging/logging.service");
const auth_decorator_1 = require("../decorators/auth.decorator");
const db_1 = require("@ckm/db");
let AnalyticsController = class AnalyticsController {
    constructor(analyticsService, logger) {
        this.analyticsService = analyticsService;
        this.logger = logger;
        this.logger.setContext('AnalyticsController');
    }
    async getFoodCostHistory() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.analytics.getFoodCostHistory, async ({ query }) => {
            this.logger.log('Received request to get food cost history');
            const history = await this.analyticsService.getFoodCostHistory(parseInt(query.recipeId), new Date(query.startDate), new Date(query.endDate));
            return { status: 200, body: history || [] };
        });
    }
    async getPrepHistory() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.analytics.getPrepHistory, async ({ query }) => {
            this.logger.log('Received request to get prep history');
            const history = await this.analyticsService.getPrepHistory(parseInt(query.recipeId), new Date(query.startDate), new Date(query.endDate));
            return { status: 200, body: history || [] };
        });
    }
    async getMenuAnalytics() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.analytics.getMenuAnalytics, async ({ query }) => {
            this.logger.log('Received request to get menu analytics');
            const analytics = await this.analyticsService.getMenuAnalytics(parseInt(query.menuId));
            if (!analytics) {
                const emptyMenuItem = {
                    id: 0,
                    name: 'No item',
                    description: null,
                    price: 0,
                    menuId: parseInt(query.menuId),
                    isActive: false,
                    foodCost: 0,
                    recipeIds: [],
                    recipeServingsAmount: [],
                    recipeServingsCost: [],
                    allergens: [],
                    categoryId: null,
                    recipes: []
                };
                return {
                    status: 200,
                    body: {
                        lowestCostItem: emptyMenuItem,
                        highestCostItem: emptyMenuItem,
                        averageFoodCost: 0
                    }
                };
            }
            return { status: 200, body: analytics };
        });
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN, db_1.UserRole.MANAGER, db_1.UserRole.CHEF),
    (0, nest_1.TsRestHandler)(contracts_1.contract.analytics.getFoodCostHistory),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getFoodCostHistory", null);
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN, db_1.UserRole.MANAGER, db_1.UserRole.CHEF),
    (0, nest_1.TsRestHandler)(contracts_1.contract.analytics.getPrepHistory),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getPrepHistory", null);
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN, db_1.UserRole.MANAGER, db_1.UserRole.CHEF),
    (0, nest_1.TsRestHandler)(contracts_1.contract.analytics.getMenuAnalytics),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getMenuAnalytics", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, nest_1.TsRest)({ jsonQuery: true }),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService,
        logging_service_1.LoggingService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map
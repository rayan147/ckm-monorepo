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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutritionController = void 0;
const common_1 = require("@nestjs/common");
const nest_1 = require("@ts-rest/nest");
const usda_api_service_1 = require("../usda-api/usda-api.service");
const nutrition_service_service_1 = require("./nutrition-service.service");
const prisma_service_1 = require("../prisma/prisma.service");
const contracts_1 = require("@ckm/contracts");
let NutritionController = class NutritionController {
    constructor(nutritionService, usdaApiService, prisma) {
        this.nutritionService = nutritionService;
        this.usdaApiService = usdaApiService;
        this.prisma = prisma;
    }
    async getRecipeNutrition() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.nutrition.getRecipeNutrition, async ({ params }) => {
            try {
                const nutrition = await this.nutritionService.calculateRecipeNutrition(params.id);
                return { status: 200, body: nutrition };
            }
            catch (error) {
                console.error('Error getting recipe nutrition:', error);
                return {
                    status: 400,
                    body: {
                        message: error instanceof Error ? error.message : 'Failed to get nutrition data',
                    },
                };
            }
        });
    }
    async calculateRecipeNutrition(request) {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.nutrition.calculateRecipeNutrition, async ({ params }) => {
            try {
                const nutrition = await this.nutritionService.calculateRecipeNutrition(params.id);
                console.log({ request });
                return { status: 200, body: nutrition };
            }
            catch (error) {
                console.error('Error calculating recipe nutrition:', error);
                return {
                    status: 400,
                    body: {
                        message: error instanceof Error ? error.message : 'Failed to calculate nutrition data',
                    },
                };
            }
        });
    }
    async searchUsdaIngredients() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.nutrition.ingredientNutrition, async ({ query }) => {
            try {
                const cleanedQuery = query.query
                    .toLowerCase()
                    .replace(/fresh|raw|frozen|cooked|dried|sliced|chopped|diced/g, '')
                    .trim();
                console.log(`Searching USDA for: "${cleanedQuery}" (original: "${query.query}")`);
                const results = await this.usdaApiService.searchFoodsWithFallback(cleanedQuery || query.query, query.pageSize);
                return { status: 200, body: results };
            }
            catch (error) {
                console.error('Error searching USDA ingredients:', error);
                return {
                    status: 400,
                    body: {
                        message: error instanceof Error ? error.message : 'Failed to search USDA database',
                    },
                };
            }
        });
    }
    async importUsdaNutrition() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.nutrition.importUSDANutrition, async ({ params, body }) => {
            try {
                if (!body.usdaFoodId) {
                    return {
                        status: 400,
                        body: { success: false, message: 'USDA Food ID is required' },
                    };
                }
                const ingredient = await this.prisma.ingredient.findUnique({
                    where: { id: params.id },
                    select: { name: true },
                });
                console.log(`Importing USDA nutrition for "${(ingredient === null || ingredient === void 0 ? void 0 : ingredient.name) || 'unknown'}" (ID: ${params.id}) from USDA ID: ${body.usdaFoodId}`);
                await this.prisma.ingredient.update({
                    where: { id: params.id },
                    data: {
                        usdaFoodId: body.usdaFoodId,
                        nutritionSource: 'USDA',
                    },
                });
                const updatedIngredient = await this.nutritionService.updateIngredientNutrition(params.id);
                return {
                    status: 200,
                    body: {
                        success: true,
                        message: 'Nutrition data imported successfully',
                        ingredient: updatedIngredient,
                    },
                };
            }
            catch (error) {
                console.error('Error importing USDA nutrition:', error);
                return {
                    status: 400,
                    body: {
                        success: false,
                        message: error instanceof Error ? error.message : 'Failed to import nutrition data',
                    },
                };
            }
        });
    }
    async updateManualNutrition() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.nutrition.updateManualNutrition, async ({ params, body }) => {
            try {
                const ingredient = await this.prisma.ingredient.findUnique({
                    where: { id: params.id },
                    select: { name: true },
                });
                console.log(`Manually updating nutrition for "${(ingredient === null || ingredient === void 0 ? void 0 : ingredient.name) || 'unknown'}" (ID: ${params.id})`);
                const macroSum = body.protein + body.carbohydrates + body.fat;
                if (macroSum > 100) {
                    return {
                        status: 400,
                        body: {
                            success: false,
                            message: `Total of protein (${body.protein}g), carbs (${body.carbohydrates}g), and fat (${body.fat}g) exceeds 100g for a 100g portion`,
                        },
                    };
                }
                const updatedIngredient = await this.nutritionService.updateManualNutrition(params.id, body);
                return {
                    status: 200,
                    body: {
                        success: true,
                        message: 'Nutrition data manually updated successfully',
                        ingredient: updatedIngredient,
                    },
                };
            }
            catch (error) {
                console.error('Error updating manual nutrition:', error);
                return {
                    status: 400,
                    body: {
                        success: false,
                        message: error instanceof Error ? error.message : 'Failed to update nutrition data manually',
                    },
                };
            }
        });
    }
};
exports.NutritionController = NutritionController;
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.nutrition.getRecipeNutrition),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NutritionController.prototype, "getRecipeNutrition", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.nutrition.calculateRecipeNutrition),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NutritionController.prototype, "calculateRecipeNutrition", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.nutrition.ingredientNutrition),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NutritionController.prototype, "searchUsdaIngredients", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.nutrition.importUSDANutrition),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NutritionController.prototype, "importUsdaNutrition", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.nutrition.updateManualNutrition),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NutritionController.prototype, "updateManualNutrition", null);
exports.NutritionController = NutritionController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [nutrition_service_service_1.NutritionService,
        usda_api_service_1.UsdaApiService,
        prisma_service_1.PrismaService])
], NutritionController);
//# sourceMappingURL=nutrition-service.controller.js.map
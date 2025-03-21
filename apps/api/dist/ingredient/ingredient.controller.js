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
var IngredientController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientController = void 0;
const contracts_1 = require("@ckm/contracts");
const common_1 = require("@nestjs/common");
const nest_1 = require("@ts-rest/nest");
const logging_service_1 = require("../logging/logging.service");
const ingredient_service_1 = require("./ingredient.service");
let IngredientController = IngredientController_1 = class IngredientController {
    constructor(ingredientService, logger) {
        this.ingredientService = ingredientService;
        this.logger = logger;
        this.logger.setContext(IngredientController_1.name);
    }
    async createIngredient() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.ingredient.createIngredient, async ({ body }) => {
            this.logger.log('Received request to create ingredient');
            const ingredient = await this.ingredientService.createIngredient(body);
            return { status: 201, body: ingredient };
        });
    }
    async getIngredients() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.ingredient.getIngredients, async ({ query }) => {
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
    async getIngredient() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.ingredient.getIngredient, async ({ params }) => {
            this.logger.log(`Received request to get ingredient with ID ${params.id}`);
            const ingredient = await this.ingredientService.getIngredient(params.id);
            return { status: 200, body: ingredient };
        });
    }
    async updateIngredient() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.ingredient.updateIngredient, async ({ params, body }) => {
            this.logger.log(`Received request to update ingredient with ID ${params.id}`);
            const ingredient = await this.ingredientService.updateIngredient(params.id, body);
            return { status: 200, body: ingredient };
        });
    }
    async deleteIngredient() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.ingredient.deleteIngredient, async ({ params }) => {
            this.logger.log(`Received request to delete ingredient with ID ${params.id}`);
            const ingredient = await this.ingredientService.deleteIngredient(params.id);
            return {
                status: 200,
                body: { message: 'Ingredient deleted successfully' },
            };
        });
    }
};
exports.IngredientController = IngredientController;
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.ingredient.createIngredient),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "createIngredient", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.ingredient.getIngredients),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "getIngredients", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.ingredient.getIngredient),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "getIngredient", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.ingredient.updateIngredient),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "updateIngredient", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.ingredient.deleteIngredient),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "deleteIngredient", null);
exports.IngredientController = IngredientController = IngredientController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [ingredient_service_1.IngredientService,
        logging_service_1.LoggingService])
], IngredientController);
//# sourceMappingURL=ingredient.controller.js.map
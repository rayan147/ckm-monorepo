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
exports.IngredientService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const logging_service_1 = require("../logging/logging.service");
let IngredientService = class IngredientService {
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
        this.logger.setContext('IngredientService');
    }
    async createIngredient(data) {
        try {
            return await this.prisma.ingredient.create({ data });
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to create ingredient');
        }
    }
    async getIngredients(params) {
        const { skip, take, where, orderBy } = params;
        try {
            return await this.prisma.ingredient.findMany({
                skip,
                take,
                where,
                orderBy,
            });
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to fetch ingredients');
        }
    }
    async getIngredient(id) {
        try {
            const ingredient = await this.prisma.ingredient.findUnique({
                where: { id },
            });
            if (!ingredient) {
                throw new Error('Ingredient not found');
            }
            return ingredient;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to fetch ingredient with ID ${id}`);
        }
    }
    async updateIngredient(id, data) {
        try {
            return await this.prisma.ingredient.update({
                where: { id },
                data,
            });
        }
        catch (error) {
            this.logger.handleError(error, `Failed to update ingredient with ID ${id}`);
        }
    }
    async deleteIngredient(id) {
        try {
            return await this.prisma.ingredient.delete({
                where: { id },
            });
        }
        catch (error) {
            this.logger.handleError(error, `Failed to delete ingredient with ID ${id}`);
        }
    }
};
exports.IngredientService = IngredientService;
exports.IngredientService = IngredientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        logging_service_1.LoggingService])
], IngredientService);
//# sourceMappingURL=ingredient.service.js.map
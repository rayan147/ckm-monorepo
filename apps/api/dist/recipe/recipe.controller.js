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
exports.RecipeController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const nest_1 = require("@ts-rest/nest");
const contracts_1 = require("@ckm/contracts");
const recipe_service_1 = require("./recipe.service");
const logging_service_1 = require("../logging/logging.service");
const s3_aws_service_1 = require("../helpers/aws/s3.aws.service");
const env_service_1 = require("../env/env.service");
const multerConfig = {
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type'), false);
        }
    }
};
let RecipeController = class RecipeController {
    constructor(recipeService, logger, s3Service, envService) {
        this.recipeService = recipeService;
        this.logger = logger;
        this.s3Service = s3Service;
        this.envService = envService;
        this.logger.setContext('RecipeController');
    }
    async uploadFileS3(file) {
        try {
            if (!file) {
                throw new Error('No file uploaded');
            }
            const bucketName = this.envService.get('RECIPE_IMAGES_BUCKET');
            this.logger.log(`Processing file: ${file.originalname}`);
            const key = `upload/${Date.now()}-${file.originalname}`;
            const url = await this.s3Service.uploadFile(bucketName, key, file.buffer);
            return { url };
        }
        catch (error) {
            this.logger.error(`File upload failed: ${error}`);
            throw error;
        }
    }
    async createRecipe() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.recipe.createRecipe, async ({ body }) => {
            this.logger.log('Received request to create recipe');
            const recipe = await this.recipeService.createRecipe(body);
            return { status: 201, body: recipe };
        });
    }
    async getRecipes() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.recipe.getRecipes, async ({ query }) => {
            this.logger.log('Received request to get recipes');
            const recipes = await this.recipeService.getRecipes({
                skip: query.skip,
                take: query.take,
                restaurantId: query.restaurantId,
                searchTerm: query.searchTerm,
            });
            return { status: 200, body: recipes };
        });
    }
    async getRecipe() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.recipe.getRecipe, async ({ params }) => {
            this.logger.log(`Received request to get recipe with ID ${params.id}`);
            const recipe = await this.recipeService.getRecipe(params.id);
            return { status: 200, body: recipe };
        });
    }
    async updateRecipe() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.recipe.updateRecipe, async ({ params, body }) => {
            this.logger.log(`Received request to update recipe with ID ${params.id}`);
            const recipe = await this.recipeService.updateRecipe(params.id, body);
            return { status: 200, body: recipe };
        });
    }
    async deleteRecipe() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.recipe.deleteRecipe, async ({ params }) => {
            this.logger.log(`Received request to delete recipe with ID ${params.id}`);
            const recipe = await this.recipeService.deleteRecipe(params.id);
            return { status: 200, body: recipe };
        });
    }
    async removeIngredientFromRecipe() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.recipe.removeIngredientFromRecipe, async ({ params }) => {
            this.logger.log(`Received request to remove ingredient with ID ${params.id} from recipe ${params.recipeId}`);
            const recipeIngredient = await this.recipeService.removeIngredientFromRecipe(params.recipeId, params.id);
            return { status: 200, body: recipeIngredient };
        });
    }
    async updateIngredientInRecipe() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.recipe.updateIngredientInRecipe, async ({ params, body }) => {
            this.logger.log(`Received request to update ingredient with ID ${params.id} in recipe ${params.recipeId}`);
            const recipeIngredient = await this.recipeService.updateIngredientInRecipe(params.recipeId, params.id, body);
            return { status: 200, body: recipeIngredient };
        });
    }
    async getRecipeIngredients() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.recipe.getRecipeIngredients, async ({ params }) => {
            this.logger.log(`Received request to get ingredients for recipe ${params.recipeId}`);
            const ingredients = await this.recipeService.getRecipeIngredients(params.recipeId);
            return { status: 200, body: ingredients };
        });
    }
    async getRecipeIngredient() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.recipe.getRecipeIngredient, async ({ params }) => {
            this.logger.log(`Received request to get ingredient ${params.id} for recipe ${params.recipeId}`);
            const ingredient = await this.recipeService.getRecipeIngredient(params.recipeId, params.id);
            return { status: 200, body: ingredient };
        });
    }
    async addInstructionToRecipe() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.recipe.addInstructionToRecipe, async ({ params, body }) => {
            this.logger.log(`Received request to add instruction to recipe ${params.recipeId}`);
            const instruction = await this.recipeService.addInstructionToRecipe(params.recipeId, body);
            return { status: 200, body: instruction };
        });
    }
    async removeInstructionFromRecipe() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.recipe.removeInstructionFromRecipe, async ({ params }) => {
            this.logger.log(`Received request to remove instruction ${params.id} from recipe ${params.recipeId}`);
            const instruction = await this.recipeService.removeInstructionFromRecipe(params.recipeId, params.id);
            return { status: 200, body: instruction };
        });
    }
    async updateInstructionInRecipe() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.recipe.updateInstructionInRecipe, async ({ params, body }) => {
            this.logger.log(`Received request to update instruction ${params.id} in recipe ${params.recipeId}`);
            const instruction = await this.recipeService.updateInstructionInRecipe(params.recipeId, params.id, body);
            return { status: 200, body: instruction };
        });
    }
    async getRecipeInstruction() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.recipe.getRecipeInstruction, async ({ params }) => {
            this.logger.log(`Received request to get instruction ${params.id} for recipe ${params.recipeId}`);
            const instruction = await this.recipeService.getRecipeInstruction(params.recipeId, params.id);
            return { status: 200, body: instruction };
        });
    }
    async getRecipeInstructions() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.recipe.getRecipeInstructions, async ({ params }) => {
            this.logger.log(`Received request to get instructions for recipe ${params.recipeId}`);
            const instructions = await this.recipeService.getRecipeInstructions(params.recipeId);
            return { status: 200, body: instructions };
        });
    }
    async calculateFoodCost() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.recipe.calculateFoodCost, async ({ params }) => {
            this.logger.log(`Received request to calculate food cost for recipe ${params.recipeId}`);
            const totalCost = await this.recipeService.calculateFoodCost(params.recipeId);
            return { status: 200, body: { totalCost } };
        });
    }
    async getFoodCostHistory() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.recipe.getFoodCostHistory, async ({ params }) => {
            this.logger.log(`Received request to get food cost history for recipe ${params.recipeId}`);
            const history = await this.recipeService.getFoodCostHistory(params.recipeId);
            return { status: 200, body: history };
        });
    }
    async calculateRecipePrice() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.recipe.calculateRecipePrice, async ({ params, body }) => {
            var _a;
            const profitMargin = (_a = body.profitMargin) !== null && _a !== void 0 ? _a : 0.3;
            this.logger.log(`Received request to calculate price for recipe ${params.recipeId} with profit margin ${profitMargin * 100}%`);
            const price = await this.recipeService.calculateRecipePrice(params.recipeId, profitMargin);
            return { status: 200, body: { price } };
        });
    }
    async getRecipePrice() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.recipe.getRecipePrice, async ({ params, query }) => {
            var _a;
            const profitMargin = (_a = query.profitMargin) !== null && _a !== void 0 ? _a : 0.3;
            this.logger.log(`Received request to get price for recipe ${params.recipeId} with profit margin ${profitMargin * 100}%`);
            const price = await this.recipeService.calculateRecipePrice(params.recipeId, profitMargin);
            return { status: 200, body: { price } };
        });
    }
};
exports.RecipeController = RecipeController;
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.recipe.uploadFileS3),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multerConfig)),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "uploadFileS3", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.recipe.createRecipe),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "createRecipe", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.recipe.getRecipes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getRecipes", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.recipe.getRecipe),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getRecipe", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.recipe.updateRecipe),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "updateRecipe", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.recipe.deleteRecipe),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "deleteRecipe", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.recipe.removeIngredientFromRecipe),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "removeIngredientFromRecipe", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.recipe.updateIngredientInRecipe),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "updateIngredientInRecipe", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.recipe.getRecipeIngredients),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getRecipeIngredients", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.recipe.getRecipeIngredient),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getRecipeIngredient", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.recipe.addInstructionToRecipe),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "addInstructionToRecipe", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.recipe.removeInstructionFromRecipe),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "removeInstructionFromRecipe", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.recipe.updateInstructionInRecipe),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "updateInstructionInRecipe", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.recipe.getRecipeInstruction),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getRecipeInstruction", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.recipe.getRecipeInstructions),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getRecipeInstructions", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.recipe.calculateFoodCost),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "calculateFoodCost", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.recipe.getFoodCostHistory),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getFoodCostHistory", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.recipe.calculateRecipePrice),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "calculateRecipePrice", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.recipe.getRecipePrice),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getRecipePrice", null);
exports.RecipeController = RecipeController = __decorate([
    (0, nest_1.TsRest)({ jsonQuery: true }),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [recipe_service_1.RecipeService,
        logging_service_1.LoggingService,
        s3_aws_service_1.S3Service,
        env_service_1.EnvService])
], RecipeController);
//# sourceMappingURL=recipe.controller.js.map
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
exports.RecipeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const logging_service_1 = require("../logging/logging.service");
const encryption_service_1 = require("../helpers/encryption/encryption.service");
const kms_aws_service_1 = require("../helpers/aws/kms.aws.service");
const env_service_1 = require("../env/env.service");
const db_1 = require("@ckm/db");
let RecipeService = class RecipeService {
    constructor(prisma, logger, kmsService, encryptionService, envService) {
        this.prisma = prisma;
        this.logger = logger;
        this.kmsService = kmsService;
        this.encryptionService = encryptionService;
        this.envService = envService;
        this.logger.setContext('RecipeService');
    }
    async FindCostByRecipeId(recipeId) {
        this.logger.log(`Calculating food cost for recipe with ID ${recipeId}`);
        try {
            const recipe = await this.prisma.recipe.findUnique({
                where: { id: recipeId },
                include: {
                    ingredients: {
                        include: { ingredient: true },
                    },
                },
            });
            if (!recipe || recipe.isDeleted) {
                throw new common_1.NotFoundException(`Recipe with ID ${recipeId} not found`);
            }
            const totalCost = recipe.ingredients.reduce((sum, ri) => {
                return sum + ri.quantity * ri.ingredient.price;
            }, 0);
            this.logger.log(`Food cost calculated successfully: ${totalCost}`);
            return totalCost;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to calculate food cost for recipe ${recipeId}`);
        }
    }
    async createRecipe(data) {
        var _a, _b;
        try {
            this.logger.log(`Creating recipe: ${JSON.stringify(data)}`);
            const createdRecipe = await this.prisma.recipe.create({
                data: Object.assign(Object.assign({}, data), { ingredients: {
                        create: (_a = data.ingredients) === null || _a === void 0 ? void 0 : _a.create,
                    }, instructions: {
                        create: (_b = data.instructions) === null || _b === void 0 ? void 0 : _b.create,
                    } }),
                include: {
                    ingredients: {
                        include: {
                            ingredient: true,
                        },
                    },
                    instructions: true,
                    restaurant: true,
                    cookBook: true,
                },
            });
            this.logger.log(`Recipe created successfully: ${JSON.stringify(createdRecipe)}`);
            return createdRecipe;
        }
        catch (error) {
            if (error instanceof db_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.BadRequestException('Recipe with the same name already exists');
                }
            }
            throw error;
        }
    }
    async updateRecipe(id, input) {
        try {
            this.logger.log(`Updating recipe: ${JSON.stringify(input)}`);
            const { data, deleteIds } = input;
            const updatedRecipe = await this.prisma.$transaction(async (prisma) => {
                var _a, _b, _c, _d;
                if (deleteIds) {
                    if (deleteIds.ingredientIds && deleteIds.ingredientIds.length > 0) {
                        await prisma.recipeIngredient.deleteMany({
                            where: { id: { in: deleteIds.ingredientIds } },
                        });
                    }
                    if (deleteIds.instructionIds && deleteIds.instructionIds.length > 0) {
                        await prisma.recipeInstruction.deleteMany({
                            where: { id: { in: deleteIds.instructionIds } },
                        });
                    }
                }
                const recipe = await prisma.recipe.update({
                    where: { id },
                    data: {
                        name: data.name,
                        imageUrls: data.imageUrls,
                        description: data.description,
                        servings: data.servings,
                        cookTime: data.cookTime,
                        prepTime: data.prepTime,
                        frequency: data.frequency,
                        foodCost: data.foodCost,
                        restaurant: data.restaurant,
                        cookBook: data.cookBook,
                        ingredients: {
                            update: (_a = data.ingredients) === null || _a === void 0 ? void 0 : _a.update,
                            create: (_b = data.ingredients) === null || _b === void 0 ? void 0 : _b.create,
                        },
                        instructions: {
                            update: (_c = data.instructions) === null || _c === void 0 ? void 0 : _c.update,
                            create: (_d = data.instructions) === null || _d === void 0 ? void 0 : _d.create,
                        },
                    },
                    include: {
                        ingredients: {
                            include: {
                                ingredient: true,
                            },
                        },
                        instructions: true,
                        restaurant: true,
                        cookBook: true,
                    },
                });
                return recipe;
            });
            this.logger.log(`Recipe updated successfully: ${JSON.stringify(updatedRecipe)}`);
            return updatedRecipe;
        }
        catch (error) {
            if (error instanceof db_1.Prisma.PrismaClientKnownRequestError) {
                this.logger.handleError(error, `Failed to update recipe with ID ${id}`);
            }
            throw error;
        }
    }
    async getRecipes(params) {
        const { skip, take, restaurantId, searchTerm } = params;
        this.logger.log(`Fetching recipes with params: ${JSON.stringify(params)}`);
        try {
            const where = Object.assign({ restaurantId, isDeleted: false }, (searchTerm && {
                OR: [
                    { name: { contains: searchTerm, mode: 'insensitive' } },
                    { description: { contains: searchTerm, mode: 'insensitive' } },
                ],
            }));
            const [totalCount, recipes] = await Promise.all([
                this.prisma.recipe.count({ where }),
                this.prisma.recipe.findMany({
                    where,
                    skip,
                    take,
                    include: {
                        ingredients: { include: { ingredient: true } },
                        instructions: { orderBy: { stepNumber: 'asc' } },
                        tags: true,
                        laborCosts: true,
                        equipment: true,
                        storage: true
                    },
                }),
            ]);
            return { recipes, totalCount };
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to fetch recipes');
        }
    }
    async getRecipe(id) {
        this.logger.log(`Fetching recipe with ID ${id}`);
        try {
            const recipe = await this.prisma.recipe.findUnique({
                where: { id },
                include: {
                    ingredients: {
                        include: { ingredient: true },
                    },
                    instructions: {
                        orderBy: { stepNumber: 'asc' },
                    },
                    menuItemRecipes: true,
                    foodCostHistory: true,
                    prepHistory: true,
                    prepBoards: true,
                    nutritionalInfo: true,
                    tags: true,
                    dietaryRestrictions: true,
                    laborCosts: true,
                    yields: true,
                    equipment: true,
                    criticalPoints: true,
                    temperatures: true,
                    storage: true,
                    prepItems: true,
                },
            });
            if (!recipe || recipe.isDeleted) {
                throw new common_1.NotFoundException(`Recipe with ID ${id} not found`);
            }
            return recipe;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to fetch recipe with ID ${id}`);
        }
    }
    async deleteRecipe(id) {
        this.logger.log(`Deleting (soft) recipe th ID ${id}`);
        try {
            const existingRecipe = await this.prisma.recipe.findUnique({
                where: { id },
            });
            if (!existingRecipe || existingRecipe.isDeleted) {
                throw new common_1.NotFoundException(`Recipe with ID ${id} not found or already deleted`);
            }
            const deletedRecipe = await this.prisma.recipe.update({
                where: { id },
                data: {
                    isDeleted: true,
                },
                include: {
                    ingredients: true,
                    instructions: true,
                },
            });
            this.logger.log(`Recipe soft-deleted successfully: ${JSON.stringify(deletedRecipe)}`);
            return deletedRecipe;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to delete recipe with ID ${id}`);
        }
    }
    async removeIngredientFromRecipe(recipeId, id) {
        this.logger.log(`Removing ingredient ${id} from recipe ${recipeId}`);
        try {
            const recipeIngredient = await this.prisma.recipeIngredient.findUnique({
                where: { id },
            });
            if (!recipeIngredient || recipeIngredient.recipeId !== recipeId) {
                throw new common_1.NotFoundException(`Ingredient with ID ${id} not found in recipe ${recipeId}`);
            }
            const deletedRecipeIngredient = await this.prisma.recipeIngredient.delete({
                where: { id },
            });
            this.logger.log(`Ingredient removed successfully from recipe ${recipeId}`);
            return deletedRecipeIngredient;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to remove ingredient ${id} from recipe ${recipeId}`);
        }
    }
    async updateIngredientInRecipe(recipeId, id, data) {
        this.logger.log(`Updating ingredient ${id} in recipe ${recipeId}`);
        try {
            const existingRecipeIngredient = await this.prisma.recipeIngredient.findUnique({
                where: { id },
            });
            if (!existingRecipeIngredient ||
                existingRecipeIngredient.recipeId !== recipeId) {
                throw new common_1.NotFoundException(`Ingredient with ID ${id} not found in recipe ${recipeId}`);
            }
            const updatedRecipeIngredient = await this.prisma.recipeIngredient.update({
                where: { id },
                data,
            });
            this.logger.log(`Ingredient updated successfully in recipe ${recipeId}`);
            return updatedRecipeIngredient;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to update ingredient ${id} in recipe ${recipeId}`);
        }
    }
    async getRecipeIngredients(recipeId) {
        this.logger.log(`Fetching ingredients for recipe ${recipeId}`);
        try {
            const recipe = await this.prisma.recipe.findUnique({
                where: { id: recipeId },
            });
            if (!recipe || recipe.isDeleted) {
                throw new common_1.NotFoundException(`Recipe with ID ${recipeId} not found`);
            }
            const ingredients = await this.prisma.recipeIngredient.findMany({
                where: { recipeId },
                include: { ingredient: true },
            });
            return ingredients;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to fetch ingredients for recipe ${recipeId}`);
        }
    }
    async getRecipeIngredient(recipeId, id) {
        this.logger.log(`Fetching ingredient ${id} for recipe ${recipeId}`);
        try {
            const ingredient = await this.prisma.recipeIngredient.findUnique({
                where: { id },
                include: { ingredient: true },
            });
            if (!ingredient || ingredient.recipeId !== recipeId) {
                throw new common_1.NotFoundException(`Ingredient with ID ${id} not found for recipe ${recipeId}`);
            }
            return ingredient;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to fetch ingredient ${id} for recipe ${recipeId}`);
        }
    }
    async addInstructionToRecipe(recipeId, instructionData) {
        this.logger.log(`Adding instruction to recipe ${recipeId}`);
        try {
            const recipe = await this.prisma.recipe.findUnique({
                where: { id: recipeId },
            });
            if (!recipe || recipe.isDeleted) {
                throw new common_1.NotFoundException(`Recipe with ID ${recipeId} not found`);
            }
            const encryptedInstruction = await this.encryptionService.encrypt(instructionData.instruction);
            const instruction = await this.prisma.recipeInstruction.create({
                data: Object.assign(Object.assign({}, instructionData), { instruction: encryptedInstruction, recipe: { connect: { id: recipeId } } }),
            });
            this.logger.log(`Instruction added successfully to recipe ${recipeId}`);
            return instruction;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to add instruction to recipe ${recipeId}`);
        }
    }
    async removeInstructionFromRecipe(recipeId, id) {
        this.logger.log(`Removing instruction ${id} from recipe ${recipeId}`);
        try {
            const instruction = await this.prisma.recipeInstruction.findUnique({
                where: { id },
            });
            if (!instruction || instruction.recipeId !== recipeId) {
                throw new common_1.NotFoundException(`Instruction with ID ${id} not found for recipe ${recipeId}`);
            }
            const deletedInstruction = await this.prisma.recipeInstruction.delete({
                where: { id },
            });
            this.logger.log(`Instruction removed successfully from recipe ${recipeId}`);
            return deletedInstruction;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to remove instruction ${id} from recipe ${recipeId}`);
        }
    }
    async updateInstructionInRecipe(recipeId, id, data) {
        this.logger.log(`Updating instruction ${id} in recipe ${recipeId}`);
        try {
            const existingInstruction = await this.prisma.recipeInstruction.findUnique({
                where: { id },
            });
            if (!existingInstruction || existingInstruction.recipeId !== recipeId) {
                throw new common_1.NotFoundException(`Instruction with ID ${id} not found for recipe ${recipeId}`);
            }
            if (data.instruction) {
                data.instruction = await this.encryptionService.encrypt(data.instruction);
            }
            const updatedInstruction = await this.prisma.recipeInstruction.update({
                where: { id },
                data,
            });
            this.logger.log(`Instruction updated successfully in recipe ${recipeId}`);
            return updatedInstruction;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to update instruction ${id} in recipe ${recipeId}`);
        }
    }
    async getRecipeInstruction(recipeId, id) {
        this.logger.log(`Fetching instruction ${id} for recipe ${recipeId}`);
        try {
            const instruction = await this.prisma.recipeInstruction.findUnique({
                where: { id },
                include: { recipe: true },
            });
            if (!instruction || instruction.recipeId !== recipeId) {
                throw new common_1.NotFoundException(`Instruction with ID ${id} not found for recipe ${recipeId}`);
            }
            instruction.instruction = await this.encryptionService.decrypt(instruction.instruction);
            return instruction;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to fetch instruction ${id} for recipe ${recipeId}`);
        }
    }
    async getRecipeInstructions(recipeId) {
        this.logger.log(`Fetching instructions for recipe ${recipeId}`);
        try {
            const recipe = await this.prisma.recipe.findUnique({
                where: { id: recipeId },
            });
            if (!recipe || recipe.isDeleted) {
                throw new common_1.NotFoundException(`Recipe with ID ${recipeId} not found`);
            }
            const instructions = await this.prisma.recipeInstruction.findMany({
                where: { recipeId },
                orderBy: { stepNumber: 'asc' },
            });
            const decryptedInstructions = await Promise.all(instructions.map(async (instruction) => (Object.assign(Object.assign({}, instruction), { instruction: await this.encryptionService.decrypt(instruction.instruction) }))));
            return decryptedInstructions;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to fetch instructions for recipe ${recipeId}`);
        }
    }
    async calculateFoodCost(recipeId) {
        this.logger.log(`Calculating food cost for recipe ${recipeId}`);
        try {
            const recipe = await this.prisma.recipe.findUnique({
                where: { id: recipeId },
                include: {
                    ingredients: {
                        include: { ingredient: true },
                    },
                },
            });
            if (!recipe || recipe.isDeleted) {
                throw new common_1.NotFoundException(`Recipe with ID ${recipeId} not found`);
            }
            const totalCost = recipe.ingredients.reduce((sum, ri) => {
                return sum + ri.quantity * ri.ingredient.price;
            }, 0);
            await this.prisma.foodCostHistory.create({
                data: {
                    recipeId,
                    cost: totalCost,
                    date: new Date(),
                },
            });
            await this.prisma.recipe.update({
                where: { id: recipeId },
                data: { foodCost: totalCost },
            });
            this.logger.log(`Food cost calculated successfully for recipe ${recipeId}: ${totalCost}`);
            return totalCost;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to calculate food cost for recipe ${recipeId}`);
        }
    }
    async getFoodCostHistory(recipeId) {
        this.logger.log(`Fetching food cost history for recipe ${recipeId}`);
        try {
            const recipe = await this.prisma.recipe.findUnique({
                where: { id: recipeId },
            });
            if (!recipe || recipe.isDeleted) {
                throw new common_1.NotFoundException(`Recipe with ID ${recipeId} not found`);
            }
            const history = await this.prisma.foodCostHistory.findMany({
                where: { recipeId },
                orderBy: { date: 'desc' },
            });
            return history;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to fetch food cost history for recipe ${recipeId}`);
        }
    }
    async calculateRecipePrice(recipeId, profitMargin = 0.3) {
        this.logger.log(`Calculating recipe price for recipe ${recipeId} with profit margin ${profitMargin * 100}%`);
        try {
            const recipe = await this.prisma.recipe.findUnique({
                where: { id: recipeId },
                include: {
                    ingredients: {
                        include: { ingredient: true },
                    },
                },
            });
            if (!recipe || recipe.isDeleted) {
                throw new common_1.NotFoundException(`Recipe with ID ${recipeId} not found`);
            }
            let foodCost = recipe.foodCost;
            if (foodCost === null || foodCost === undefined) {
                foodCost = await this.calculateFoodCost(recipeId);
            }
            const price = foodCost * (1 + profitMargin);
            this.logger.log(`Recipe price calculated successfully for recipe ${recipeId}: ${price}`);
            return price;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to calculate recipe price for recipe ${recipeId}`);
        }
    }
    async getRecipePrice(recipeId, profitMargin) {
        this.logger.log(`Fetching recipe price for recipe ${recipeId}`);
        try {
            const price = await this.calculateRecipePrice(recipeId, profitMargin);
            return price;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to fetch recipe price for recipe ${recipeId}`);
        }
    }
};
exports.RecipeService = RecipeService;
exports.RecipeService = RecipeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        logging_service_1.LoggingService,
        kms_aws_service_1.KmsService,
        encryption_service_1.EncryptionService,
        env_service_1.EnvService])
], RecipeService);
//# sourceMappingURL=recipe.service.js.map
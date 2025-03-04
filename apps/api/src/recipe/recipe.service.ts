import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggingService } from '../logging/logging.service';
import { EncryptionService } from '../helpers/encryption/encryption.service';
import { RecipeCreate, RecipeUpdate } from '@ckm/types';
import {
  FoodCostHistory,
  Recipe,
  RecipeIngredient,
  RecipeInstruction,
} from '@ckm/db';
import { KmsService } from 'src/helpers/aws/kms.aws.service';
import { v4 as uuidv4 } from 'uuid';
import { EnvService } from 'src/env/env.service';
import { Prisma } from '@ckm/db';
import { RecipeUpdateRequest } from '@ckm/contracts/src/recipe';

@Injectable()
export class RecipeService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggingService,
    private kmsService: KmsService,
    private encryptionService: EncryptionService,
    private envService: EnvService,
  ) {
    this.logger.setContext('RecipeService');
  }

  /**
   *
   * @param recipeId
   * @returns food cost of a recipe
   */
  // Adds up the cost of all ingredients in a recipe and returns the total cost.
  async FindCostByRecipeId(recipeId: number): Promise<number> {
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
        throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
      }

      const totalCost = recipe.ingredients.reduce((sum, ri) => {
        return sum + ri.quantity * ri.ingredient.price;
      }, 0);

      this.logger.log(`Food cost calculated successfully: ${totalCost}`);
      return totalCost;
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to calculate food cost for recipe ${recipeId}`,
      );
    }
  }

  //

  /**
   * Creates a new recipe along with its related data.
   * Handles nested relations and ensures data integrity.
   */
  async createRecipe(data: Prisma.RecipeCreateInput): Promise<Recipe> {
    try {
      this.logger.log(`Creating recipe: ${JSON.stringify(data)}`);

      const createdRecipe = await this.prisma.recipe.create({
        data: {
          ...data,
          ingredients: {
            create: data.ingredients?.create,
          },
          instructions: {
            create: data.instructions?.create,
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

      this.logger.log(
        `Recipe created successfully: ${JSON.stringify(createdRecipe)}`,
      );
      return createdRecipe;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Recipe with the same name already exists',
          );
        }
      }
      throw error;
    }
  }

  async updateRecipe(id: number, input: RecipeUpdateRequest): Promise<Recipe> {
    try {
      this.logger.log(`Updating recipe: ${JSON.stringify(input)}`);
      const { data, deleteIds } = input;

      const updatedRecipe = await this.prisma.$transaction(async (prisma) => {
        // Perform deletions if any
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

        // Update the recipe
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
              update: data.ingredients?.update,
              create: data.ingredients?.create,
            },
            instructions: {
              update: data.instructions?.update,
              create: data.instructions?.create,
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

      this.logger.log(
        `Recipe updated successfully: ${JSON.stringify(updatedRecipe)}`,
      );
      return updatedRecipe;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.logger.handleError(error, `Failed to update recipe with ID ${id}`);
      }
      throw error;
    }
  }

  async getRecipes(params: {
    skip?: number;
    take?: number;
    restaurantId?: number;
    searchTerm?: string;
  }): Promise<{ recipes: Recipe[]; totalCount: number }> {
    const { skip, take, restaurantId, searchTerm } = params;
    this.logger.log(`Fetching recipes with params: ${JSON.stringify(params)}`);
    try {
      const where: Prisma.RecipeWhereInput = {
        restaurantId,
        isDeleted: false,
        ...(searchTerm && {
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
          ],
        }),
      };

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

          },
        }),
      ]);

      return { recipes, totalCount };
    } catch (error) {
      this.logger.handleError(error, 'Failed to fetch recipes');
    }
  }

  /**
   * Retrieves a single recipe by its ID.
   */
  async getRecipe(id: number): Promise<Recipe> {
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
        throw new NotFoundException(`Recipe with ID ${id} not found`);
      }

      return recipe;
    } catch (error) {
      this.logger.handleError(error, `Failed to fetch recipe with ID ${id}`);
    }
  }

  /**
   * Soft deletes a recipe by setting its isDeleted flag to true.
   */
  async deleteRecipe(id: number): Promise<Recipe> {
    this.logger.log(`Deleting (soft) recipe th ID ${id}`);
    try {
      // Ensure the recipe exists and is not already deleted
      const existingRecipe = await this.prisma.recipe.findUnique({
        where: { id },
      });
      if (!existingRecipe || existingRecipe.isDeleted) {
        throw new NotFoundException(
          `Recipe with ID ${id} not found or already deleted`,
        );
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

      this.logger.log(
        `Recipe soft-deleted successfully: ${JSON.stringify(deletedRecipe)}`,
      );
      return deletedRecipe;
    } catch (error) {
      this.logger.handleError(error, `Failed to delete recipe with ID ${id}`);
    }
  }

  /**
   * Removes an ingredient from a specific recipe.
   */
  async removeIngredientFromRecipe(
    recipeId: number,
    id: number,
  ): Promise<RecipeIngredient> {
    this.logger.log(`Removing ingredient ${id} from recipe ${recipeId}`);
    try {
      // Ensure the RecipeIngredient exists
      const recipeIngredient = await this.prisma.recipeIngredient.findUnique({
        where: { id },
      });

      if (!recipeIngredient || recipeIngredient.recipeId !== recipeId) {
        throw new NotFoundException(
          `Ingredient with ID ${id} not found in recipe ${recipeId}`,
        );
      }

      // Delete the RecipeIngredient
      const deletedRecipeIngredient = await this.prisma.recipeIngredient.delete(
        {
          where: { id },
        },
      );

      this.logger.log(
        `Ingredient removed successfully from recipe ${recipeId}`,
      );
      return deletedRecipeIngredient;
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to remove ingredient ${id} from recipe ${recipeId}`,
      );
    }
  }

  /**
   * Updates an ingredient in a specific recipe.
   */
  async updateIngredientInRecipe(
    recipeId: number,
    id: number,
    data: Prisma.RecipeIngredientUpdateInput,
  ): Promise<RecipeIngredient> {
    this.logger.log(`Updating ingredient ${id} in recipe ${recipeId}`);
    try {
      // Ensure the RecipeIngredient exists
      const existingRecipeIngredient =
        await this.prisma.recipeIngredient.findUnique({
          where: { id },
        });

      if (
        !existingRecipeIngredient ||
        existingRecipeIngredient.recipeId !== recipeId
      ) {
        throw new NotFoundException(
          `Ingredient with ID ${id} not found in recipe ${recipeId}`,
        );
      }

      const updatedRecipeIngredient = await this.prisma.recipeIngredient.update(
        {
          where: { id },
          data,
        },
      );

      this.logger.log(`Ingredient updated successfully in recipe ${recipeId}`);
      return updatedRecipeIngredient;
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to update ingredient ${id} in recipe ${recipeId}`,
      );
    }
  }

  /**
   * Retrieves all ingredients for a specific recipe.
   */
  async getRecipeIngredients(recipeId: number): Promise<RecipeIngredient[]> {
    this.logger.log(`Fetching ingredients for recipe ${recipeId}`);
    try {
      // Ensure the recipe exists
      const recipe = await this.prisma.recipe.findUnique({
        where: { id: recipeId },
      });
      if (!recipe || recipe.isDeleted) {
        throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
      }

      const ingredients = await this.prisma.recipeIngredient.findMany({
        where: { recipeId },
        include: { ingredient: true },
      });
      return ingredients;
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to fetch ingredients for recipe ${recipeId}`,
      );
    }
  }

  /**
   * Retrieves a specific ingredient from a recipe.
   */
  async getRecipeIngredient(
    recipeId: number,
    id: number,
  ): Promise<RecipeIngredient> {
    this.logger.log(`Fetching ingredient ${id} for recipe ${recipeId}`);
    try {
      const ingredient = await this.prisma.recipeIngredient.findUnique({
        where: { id },
        include: { ingredient: true },
      });

      if (!ingredient || ingredient.recipeId !== recipeId) {
        throw new NotFoundException(
          `Ingredient with ID ${id} not found for recipe ${recipeId}`,
        );
      }
      return ingredient;
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to fetch ingredient ${id} for recipe ${recipeId}`,
      );
    }
  }

  /**
   * Adds an instruction to a specific recipe.
   */
  async addInstructionToRecipe(
    recipeId: number,
    instructionData: Prisma.RecipeInstructionCreateInput,
  ): Promise<RecipeInstruction> {
    this.logger.log(`Adding instruction to recipe ${recipeId}`);
    try {
      // Ensure the recipe exists
      const recipe = await this.prisma.recipe.findUnique({
        where: { id: recipeId },
      });
      if (!recipe || recipe.isDeleted) {
        throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
      }

      // Encrypt the instruction if necessary
      const encryptedInstruction = await this.encryptionService.encrypt(
        instructionData.instruction,
      );

      const instruction = await this.prisma.recipeInstruction.create({
        data: {
          ...instructionData,
          instruction: encryptedInstruction,
          recipe: { connect: { id: recipeId } },
        },
      });

      this.logger.log(`Instruction added successfully to recipe ${recipeId}`);
      return instruction;
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to add instruction to recipe ${recipeId}`,
      );
    }
  }

  /**
   * Removes an instruction from a specific recipe.
   */
  async removeInstructionFromRecipe(
    recipeId: number,
    id: number,
  ): Promise<RecipeInstruction> {
    this.logger.log(`Removing instruction ${id} from recipe ${recipeId}`);
    try {
      // Ensure the instruction exists and belongs to the recipe
      const instruction = await this.prisma.recipeInstruction.findUnique({
        where: { id },
      });

      if (!instruction || instruction.recipeId !== recipeId) {
        throw new NotFoundException(
          `Instruction with ID ${id} not found for recipe ${recipeId}`,
        );
      }

      const deletedInstruction = await this.prisma.recipeInstruction.delete({
        where: { id },
      });

      this.logger.log(
        `Instruction removed successfully from recipe ${recipeId}`,
      );
      return deletedInstruction;
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to remove instruction ${id} from recipe ${recipeId}`,
      );
    }
  }

  /**
   * Updates an instruction in a specific recipe.
   */
  async updateInstructionInRecipe(
    recipeId: number,
    id: number,
    data: Prisma.RecipeInstructionUpdateInput,
  ): Promise<RecipeInstruction> {
    this.logger.log(`Updating instruction ${id} in recipe ${recipeId}`);
    try {
      // Ensure the instruction exists and belongs to the recipe
      const existingInstruction =
        await this.prisma.recipeInstruction.findUnique({
          where: { id },
        });

      if (!existingInstruction || existingInstruction.recipeId !== recipeId) {
        throw new NotFoundException(
          `Instruction with ID ${id} not found for recipe ${recipeId}`,
        );
      }

      // Encrypt the instruction if it's being updated
      if (data.instruction) {
        data.instruction = await this.encryptionService.encrypt(
          data.instruction as string,
        );
      }

      const updatedInstruction = await this.prisma.recipeInstruction.update({
        where: { id },
        data,
      });

      this.logger.log(`Instruction updated successfully in recipe ${recipeId}`);
      return updatedInstruction;
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to update instruction ${id} in recipe ${recipeId}`,
      );
    }
  }

  /**
   * Retrieves a specific instruction from a recipe.
   */
  async getRecipeInstruction(
    recipeId: number,
    id: number,
  ): Promise<RecipeInstruction> {
    this.logger.log(`Fetching instruction ${id} for recipe ${recipeId}`);
    try {
      const instruction = await this.prisma.recipeInstruction.findUnique({
        where: { id },
        include: { recipe: true },
      });

      if (!instruction || instruction.recipeId !== recipeId) {
        throw new NotFoundException(
          `Instruction with ID ${id} not found for recipe ${recipeId}`,
        );
      }

      // Optionally decrypt the instruction before returning
      instruction.instruction = await this.encryptionService.decrypt(
        instruction.instruction,
      );

      return instruction;
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to fetch instruction ${id} for recipe ${recipeId}`,
      );
    }
  }

  /**
   * Retrieves all instructions for a specific recipe.
   */
  async getRecipeInstructions(recipeId: number): Promise<RecipeInstruction[]> {
    this.logger.log(`Fetching instructions for recipe ${recipeId}`);
    try {
      // Ensure the recipe exists
      const recipe = await this.prisma.recipe.findUnique({
        where: { id: recipeId },
      });
      if (!recipe || recipe.isDeleted) {
        throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
      }

      const instructions = await this.prisma.recipeInstruction.findMany({
        where: { recipeId },
        orderBy: { stepNumber: 'asc' },
      });

      // Optionally decrypt instructions before returning
      const decryptedInstructions = await Promise.all(
        instructions.map(async (instruction) => ({
          ...instruction,
          instruction: await this.encryptionService.decrypt(
            instruction.instruction,
          ),
        })),
      );

      return decryptedInstructions;
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to fetch instructions for recipe ${recipeId}`,
      );
    }
  }

  /**
   * Calculates the total food cost for a recipe based on its ingredients.
   * Updates the recipe's foodCost and logs the calculation in FoodCostHistory.
   */
  async calculateFoodCost(recipeId: number): Promise<number> {
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
        throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
      }

      // Calculate total cost
      const totalCost = recipe.ingredients.reduce((sum, ri) => {
        return sum + ri.quantity * ri.ingredient.price;
      }, 0);

      // Create a FoodCostHistory record
      await this.prisma.foodCostHistory.create({
        data: {
          recipeId,
          cost: totalCost,
          date: new Date(),
        },
      });

      // Update the recipe's foodCost
      await this.prisma.recipe.update({
        where: { id: recipeId },
        data: { foodCost: totalCost },
      });

      this.logger.log(
        `Food cost calculated successfully for recipe ${recipeId}: ${totalCost}`,
      );
      return totalCost;
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to calculate food cost for recipe ${recipeId}`,
      );
    }
  }

  /**
   * Retrieves the food cost history for a specific recipe.
   */
  async getFoodCostHistory(recipeId: number): Promise<FoodCostHistory[]> {
    this.logger.log(`Fetching food cost history for recipe ${recipeId}`);
    try {
      // Ensure the recipe exists
      const recipe = await this.prisma.recipe.findUnique({
        where: { id: recipeId },
      });
      if (!recipe || recipe.isDeleted) {
        throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
      }

      const history = await this.prisma.foodCostHistory.findMany({
        where: { recipeId },
        orderBy: { date: 'desc' },
      });
      return history;
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to fetch food cost history for recipe ${recipeId}`,
      );
    }
  }

  /**
   * Calculates the price of a recipe based on its food cost and desired profit margin.
   */
  async calculateRecipePrice(
    recipeId: number,
    profitMargin: number = 0.3,
  ): Promise<number> {
    // Default profit margin of 30% if not provided
    this.logger.log(
      `Calculating recipe price for recipe ${recipeId} with profit margin ${profitMargin * 100}%`,
    );
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
        throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
      }

      // Ensure foodCost is up-to-date
      let foodCost = recipe.foodCost;
      if (foodCost === null || foodCost === undefined) {
        foodCost = await this.calculateFoodCost(recipeId);
      }

      // Calculate price based on food cost and profit margin
      const price = foodCost * (1 + profitMargin);

      this.logger.log(
        `Recipe price calculated successfully for recipe ${recipeId}: ${price}`,
      );
      return price;
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to calculate recipe price for recipe ${recipeId}`,
      );
    }
  }

  /**
   * Retrieves the price of a specific recipe.
   */
  async getRecipePrice(
    recipeId: number,
    profitMargin?: number,
  ): Promise<number> {
    this.logger.log(`Fetching recipe price for recipe ${recipeId}`);
    try {
      const price = await this.calculateRecipePrice(recipeId, profitMargin);
      return price;
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to fetch recipe price for recipe ${recipeId}`,
      );
    }
  }
}

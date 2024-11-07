// controllers/recipe.controller.ts
import { Controller, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts'; // Adjust the import path as needed
import { RecipeService } from './recipe.service';
import { LoggingService } from '../logging/logging.service';
import { S3Service } from '../helpers/aws/s3.aws.service'
import { Express } from 'express';
import { EnvService } from '../env/env.service'


const multerConfig: MulterOptions = {
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Add allowed mime types
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
};




@TsRest({ jsonQuery: true })
@Controller()
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly logger: LoggingService,
    private readonly s3Service: S3Service,
    private readonly envService: EnvService,
  ) {
    this.logger.setContext('RecipeController');
  }



  @TsRestHandler(contract.recipe.uploadFileS3)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFileS3(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new Error('No file uploaded');
      }

      const bucketName = this.envService.get('RECIPE_IMAGES_BUCKET');
      this.logger.log(`Processing file: ${file.originalname}`);

      const key = `upload/${Date.now()}-${file.originalname}`;
      const url = await this.s3Service.uploadFile(bucketName, key, file.buffer);

      return { url };
    } catch (error) {
      this.logger.error(`File upload failed: ${error}`);
      throw error;
    }
  }


  @TsRestHandler(contract.recipe.createRecipe)
  async createRecipe() {
    return tsRestHandler(contract.recipe.createRecipe, async ({ body }) => {
      this.logger.log('Received request to create recipe');
      const recipe = await this.recipeService.createRecipe(body);
      return { status: 201, body: recipe };
    });
  }

  @TsRestHandler(contract.recipe.getRecipes)
  async getRecipes() {
    return tsRestHandler(contract.recipe.getRecipes, async ({ query }) => {
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

  @TsRestHandler(contract.recipe.getRecipe)
  async getRecipe() {
    return tsRestHandler(contract.recipe.getRecipe, async ({ params }) => {
      this.logger.log(`Received request to get recipe with ID ${params.id}`);
      const recipe = await this.recipeService.getRecipe(params.id);
      return { status: 200, body: recipe };
    });
  }

  @TsRestHandler(contract.recipe.updateRecipe)
  async updateRecipe() {
    return tsRestHandler(
      contract.recipe.updateRecipe,
      async ({ params, body }) => {
        this.logger.log(
          `Received request to update recipe with ID ${params.id}`,
        );
        const recipe = await this.recipeService.updateRecipe(params.id, body);
        return { status: 200, body: recipe };
      },
    );
  }

  @TsRestHandler(contract.recipe.deleteRecipe)
  async deleteRecipe() {
    return tsRestHandler(contract.recipe.deleteRecipe, async ({ params }) => {
      this.logger.log(`Received request to delete recipe with ID ${params.id}`);
      const recipe = await this.recipeService.deleteRecipe(params.id);
      return { status: 200, body: recipe };
    });
  }

  // Ingredient Management
  // @TsRestHandler(contract.recipe.addIngredientToRecipe)
  // async addIngredientToRecipe() {
  //   return tsRestHandler(
  //     contract.recipe.addIngredientToRecipe,
  //     async ({ params, body }) => {
  //       this.logger.log(
  //         `Received request to add ingredient to recipe with ID ${params.recipeId}`,
  //       );
  //       const recipeIngredient = await this.recipeService.addIngredientToRecipe(
  //         { ...body, recipeId: params.recipeId },
  //       );
  //       return { status: 200, body: recipeIngredient };
  //     },
  //   );
  // }

  @TsRestHandler(contract.recipe.removeIngredientFromRecipe)
  async removeIngredientFromRecipe() {
    return tsRestHandler(
      contract.recipe.removeIngredientFromRecipe,
      async ({ params }) => {
        this.logger.log(
          `Received request to remove ingredient with ID ${params.id} from recipe ${params.recipeId}`,
        );
        const recipeIngredient =
          await this.recipeService.removeIngredientFromRecipe(
            params.recipeId,
            params.id,
          );
        return { status: 200, body: recipeIngredient };
      },
    );
  }

  @TsRestHandler(contract.recipe.updateIngredientInRecipe)
  async updateIngredientInRecipe() {
    return tsRestHandler(
      contract.recipe.updateIngredientInRecipe,
      async ({ params, body }) => {
        this.logger.log(
          `Received request to update ingredient with ID ${params.id} in recipe ${params.recipeId}`,
        );
        const recipeIngredient =
          await this.recipeService.updateIngredientInRecipe(
            params.recipeId,
            params.id,
            body,
          );
        return { status: 200, body: recipeIngredient };
      },
    );
  }

  @TsRestHandler(contract.recipe.getRecipeIngredients)
  async getRecipeIngredients() {
    return tsRestHandler(
      contract.recipe.getRecipeIngredients,
      async ({ params }) => {
        this.logger.log(
          `Received request to get ingredients for recipe ${params.recipeId}`,
        );
        const ingredients = await this.recipeService.getRecipeIngredients(
          params.recipeId,
        );
        return { status: 200, body: ingredients };
      },
    );
  }

  @TsRestHandler(contract.recipe.getRecipeIngredient)
  async getRecipeIngredient() {
    return tsRestHandler(
      contract.recipe.getRecipeIngredient,
      async ({ params }) => {
        this.logger.log(
          `Received request to get ingredient ${params.id} for recipe ${params.recipeId}`,
        );
        const ingredient = await this.recipeService.getRecipeIngredient(
          params.recipeId,
          params.id,
        );
        return { status: 200, body: ingredient };
      },
    );
  }

  // Instruction Management
  @TsRestHandler(contract.recipe.addInstructionToRecipe)
  async addInstructionToRecipe() {
    return tsRestHandler(
      contract.recipe.addInstructionToRecipe,
      async ({ params, body }) => {
        this.logger.log(
          `Received request to add instruction to recipe ${params.recipeId}`,
        );
        const instruction = await this.recipeService.addInstructionToRecipe(
          params.recipeId,
          body,
        );
        return { status: 200, body: instruction };
      },
    );
  }

  @TsRestHandler(contract.recipe.removeInstructionFromRecipe)
  async removeInstructionFromRecipe() {
    return tsRestHandler(
      contract.recipe.removeInstructionFromRecipe,
      async ({ params }) => {
        this.logger.log(
          `Received request to remove instruction ${params.id} from recipe ${params.recipeId}`,
        );
        const instruction =
          await this.recipeService.removeInstructionFromRecipe(
            params.recipeId,
            params.id,
          );
        return { status: 200, body: instruction };
      },
    );
  }

  @TsRestHandler(contract.recipe.updateInstructionInRecipe)
  async updateInstructionInRecipe() {
    return tsRestHandler(
      contract.recipe.updateInstructionInRecipe,
      async ({ params, body }) => {
        this.logger.log(
          `Received request to update instruction ${params.id} in recipe ${params.recipeId}`,
        );
        const instruction = await this.recipeService.updateInstructionInRecipe(
          params.recipeId,
          params.id,
          body,
        );
        return { status: 200, body: instruction };
      },
    );
  }

  @TsRestHandler(contract.recipe.getRecipeInstruction)
  async getRecipeInstruction() {
    return tsRestHandler(
      contract.recipe.getRecipeInstruction,
      async ({ params }) => {
        this.logger.log(
          `Received request to get instruction ${params.id} for recipe ${params.recipeId}`,
        );
        const instruction = await this.recipeService.getRecipeInstruction(
          params.recipeId,
          params.id,
        );
        return { status: 200, body: instruction };
      },
    );
  }

  @TsRestHandler(contract.recipe.getRecipeInstructions)
  async getRecipeInstructions() {
    return tsRestHandler(
      contract.recipe.getRecipeInstructions,
      async ({ params }) => {
        this.logger.log(
          `Received request to get instructions for recipe ${params.recipeId}`,
        );
        const instructions = await this.recipeService.getRecipeInstructions(
          params.recipeId,
        );
        return { status: 200, body: instructions };
      },
    );
  }

  // Food Cost and Pricing
  @TsRestHandler(contract.recipe.calculateFoodCost)
  async calculateFoodCost() {
    return tsRestHandler(
      contract.recipe.calculateFoodCost,
      async ({ params }) => {
        this.logger.log(
          `Received request to calculate food cost for recipe ${params.recipeId}`,
        );
        const totalCost = await this.recipeService.calculateFoodCost(
          params.recipeId,
        );
        return { status: 200, body: { totalCost } };
      },
    );
  }

  @TsRestHandler(contract.recipe.getFoodCostHistory)
  async getFoodCostHistory() {
    return tsRestHandler(
      contract.recipe.getFoodCostHistory,
      async ({ params }) => {
        this.logger.log(
          `Received request to get food cost history for recipe ${params.recipeId}`,
        );
        const history = await this.recipeService.getFoodCostHistory(
          params.recipeId,
        );
        return { status: 200, body: history };
      },
    );
  }

  @TsRestHandler(contract.recipe.calculateRecipePrice)
  async calculateRecipePrice() {
    return tsRestHandler(
      contract.recipe.calculateRecipePrice,
      async ({ params, body }) => {
        const profitMargin = body.profitMargin ?? 0.3; // Default to 30% if not provided
        this.logger.log(
          `Received request to calculate price for recipe ${params.recipeId} with profit margin ${profitMargin * 100}%`,
        );
        const price = await this.recipeService.calculateRecipePrice(
          params.recipeId,
          profitMargin,
        );
        return { status: 200, body: { price } };
      },
    );
  }

  @TsRestHandler(contract.recipe.getRecipePrice)
  async getRecipePrice() {
    return tsRestHandler(
      contract.recipe.getRecipePrice,
      async ({ params, query }) => {
        const profitMargin = query.profitMargin ?? 0.3; // Default to 30% if not provided
        this.logger.log(
          `Received request to get price for recipe ${params.recipeId} with profit margin ${profitMargin * 100}%`,
        );
        const price = await this.recipeService.calculateRecipePrice(
          params.recipeId,
          profitMargin,
        );
        return { status: 200, body: { price } };
      },
    );
  }
}

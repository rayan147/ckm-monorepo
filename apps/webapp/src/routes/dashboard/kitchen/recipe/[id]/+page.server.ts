// src/routes/dashboard/kitchen/recipe/[id]/+page.server.ts
import { createApiClient } from '@ckm/lib-api';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
  calculateNutrition: async ({ params, fetch }) => {
    try {
      const recipeId = parseInt(params.id);

      if (isNaN(recipeId)) {
        return fail(400, { success: false, message: 'Invalid recipe ID' });
      }

      const api = createApiClient(fetch)
      const { status, body } = await api.nutrition.calculateRecipeNutrition({
        params: { id: recipeId }
      });

      if (status !== 200 || !body) {
        return fail(status, {
          success: false,
          message: 'Failed to calculate nutrition'
        });
      }

      // Get full updated recipe
      const recipeResponse = await api.recipe.getRecipe({
        params: { id: recipeId }
      });

      if (recipeResponse.status !== 200) {
        return fail(recipeResponse.status, {
          success: false,
          message: 'Recipe update failed'
        });
      }
      return {
        success: true,
        message: 'Nutrition calculated successfully',
        nutritionalInfo: body,
        updatedRecipe: recipeResponse.body
      };
    } catch (err) {
      console.error('Error calculating nutrition:', err);
      return fail(500, {
        success: false,
        message: err instanceof Error ? err.message : 'An unknown error occurred'
      });
    }
  },

  matchIngredient: async ({ params, request }) => {
    const formData = await request.formData();
    const ingredientId = formData.get('ingredientId');
    const usdaFoodId = formData.get('usdaFoodId');

    if (!ingredientId || !usdaFoodId) {
      return fail(400, {
        success: false,
        message: 'Missing required parameters'
      });
    }

    try {
      const { status, body } = await api.nutrition.importUSDANutrition({
        params: { id: parseInt(ingredientId.toString()) },
        body: { usdaFoodId: usdaFoodId.toString() }
      });

      if (status !== 200 || !body.success) {
        return fail(status, {
          success: false,
          message: body?.message || 'Failed to import nutrition data'
        });
      }

      // Get updated recipe after match
      const recipeId = parseInt(params.id);
      const recipeResponse = await api.recipe.getRecipe({
        params: { id: recipeId }
      });

      return {
        success: true,
        message: 'Nutrition data imported successfully',
        updatedRecipe: recipeResponse.status === 200 ? recipeResponse.body : null
      };
    } catch (err) {
      console.error('Error matching ingredient:', err);
      return fail(500, {
        success: false,
        message: err instanceof Error ? err.message : 'An unknown error occurred'
      });
    }
  },

  searchIngredient: async ({ request }) => {
    const formData = await request.formData();
    const query = formData.get('query')?.toString();

    if (!query) {
      return fail(400, {
        success: false,
        message: 'No search query provided'
      });
    }

    try {
      const { status, body } = await api.nutrition.ingredientNutrition({
        query: {
          query: query,
          pageSize: 10
        }
      });

      if (status !== 200 || !body) {
        return fail(status, {
          success: false,
          message: 'Failed to search for ingredients'
        });
      }

      return {
        success: true,
        message: 'Search completed',
        matches: body.foods || []
      };
    } catch (err) {
      console.error('Error searching for ingredient:', err);
      return fail(500, {
        success: false,
        message: err instanceof Error ? err.message : 'An unknown error occurred'
      });
    }
  },

  saveManualNutrition: async ({ params, request }) => {
    const formData = await request.formData();
    const ingredientId = formData.get('ingredientId')?.toString();

    if (!ingredientId) {
      return fail(400, {
        success: false,
        message: 'Missing ingredient ID'
      });
    }

    // Extract nutrition data from form
    const nutritionData = {
      calories: parseFloat(formData.get('calories')?.toString() || '0'),
      protein: parseFloat(formData.get('protein')?.toString() || '0'),
      carbohydrates: parseFloat(formData.get('carbohydrates')?.toString() || '0'),
      fat: parseFloat(formData.get('fat')?.toString() || '0'),
      fiber: parseFloat(formData.get('fiber')?.toString() || '0'),
      sugar: parseFloat(formData.get('sugar')?.toString() || '0'),
      sodium: parseFloat(formData.get('sodium')?.toString() || '0'),
      containsGluten: formData.get('containsGluten') === 'on',
      containsDairy: formData.get('containsDairy') === 'on',
      containsNuts: formData.get('containsNuts') === 'on',
      containsEggs: formData.get('containsEggs') === 'on',
      containsSoy: formData.get('containsSoy') === 'on',
      containsFish: formData.get('containsFish') === 'on',
      containsShellfish: formData.get('containsShellfish') === 'on',
      containsSesame: formData.get('containsSesame') === 'on'
    };

    try {
      const { status, body } = await api.nutrition.updateManualNutrition({
        params: { id: parseInt(ingredientId) },
        body: nutritionData
      });

      if (status !== 200 || !body.success) {
        return fail(status, {
          success: false,
          message: body?.message || 'Failed to update nutrition data'
        });
      }

      // Get updated recipe
      const recipeId = parseInt(params.id);
      const recipeResponse = await api.recipe.getRecipe({
        params: { id: recipeId }
      });

      return {
        success: true,
        message: 'Nutrition data updated successfully',
        updatedRecipe: recipeResponse.status === 200 ? recipeResponse.body : null
      };
    } catch (err) {
      console.error('Error saving manual nutrition:', err);
      return fail(500, {
        success: false,
        message: err instanceof Error ? err.message : 'An unknown error occurred'
      });
    }
  }
};

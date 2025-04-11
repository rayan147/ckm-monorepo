import { api } from '@ckm/lib-api';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { USDAMatches } from '@ckm/types';

export const load: PageLoad = async ({ url, params }) => {
  try {
    const recipeId = parseInt(params.id);

    if (isNaN(recipeId)) {
      return error(400, { message: 'Invalid recipe ID' });
    }

    const { status, body } = await api.recipe.getRecipe({
      params: { id: recipeId }
    });
    console.log({ body });

    if (status !== 200) {
      error(404, { message: 'Recipe not found' });
    }

    const ingredientToMatch = url.searchParams.get('matchIngredient');
    let usdaMatches = [] as unknown;

    if (ingredientToMatch) {
      const searchResult = await api.nutrition.ingredientNutrition({
        query: {
          query: ingredientToMatch,
          pageSize: 10
        }
      });
      if (searchResult.status === 200 && searchResult.body?.foods) {
        usdaMatches = searchResult.body.foods;
      }
    }

    // Debug logs to verify all relations are received from API
    //
    if (status === 200) {
      console.log({ body });
    }

    return {
      recipe: body,
      usdaMatches,
      ingredientToMatch,
      dailyValues: {
        calories: 2000,
        fat: 65,
        carbohydrates: 300,
        protein: 50,
        sugar: 50,
        sodium: 2300
      }
    };
  } catch (err) {
    if (err instanceof Error) {
      return error(500, err.message);
    }
    console.error(err);
    return error(500, 'An unknown error occurred');
  }
};

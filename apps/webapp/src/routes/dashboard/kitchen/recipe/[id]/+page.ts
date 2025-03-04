import { api } from "@ckm/lib-api";
import type { PageLoad } from "./$types";
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return error(400, { message: 'Invalid recipe ID' });
    }

    const { status, body } = await api.recipe.getRecipe({
      params: { id }
    });


    if (status !== 200) {
      return error(404, { message: 'Recipe not found' });
    }

    return {
      recipe: body
    };
  } catch (err) {
    if (err instanceof Error) {
      return error(500, err.message);
    }
    return error(500, 'An unknown error occurred');
  }
};

import { api } from "@ckm/lib-api";
import type { PageLoad } from "./$types";
import { error } from '@sveltejs/kit';
export const load: PageLoad = ({ params }) => {
  try {

    const recipes = api.recipe.getRecipes();
    if (!recipes) error(400, { message: `Not found` })
    return { recipes }

  } catch (err) {
    if (err instanceof Error) {
      error(400, err.message)
    }
  }
}

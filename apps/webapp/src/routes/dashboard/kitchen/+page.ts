import { api } from "@ckm/lib-api";
import type { PageLoad } from "./$types";
import { error } from '@sveltejs/kit';
export const load: PageLoad = async ({ params }) => {
  try {

    const { status, body } = await api.recipe.getRecipes({});
    if (status !== 200) error(400, { message: `Not found` })

    return body

  } catch (err) {
    if (err instanceof Error) {
      error(400, err.message)
    }
  }
}

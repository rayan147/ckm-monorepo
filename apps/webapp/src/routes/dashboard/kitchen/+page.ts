import { api } from "@ckm/lib-api";
import type { PageLoad } from "./$types";
import { error } from '@sveltejs/kit';


export const load: PageLoad = async ({ url, params }) => {
  try {
    // The formula is: skip = (page - 1) * perPage
    const page = parseInt(url.searchParams.get('page') || '1')
    const perPage = 10;
    const skip = (page - 1) * perPage;
    const searchTerm = url.searchParams.get('search') || '';

    const { status, body } = await api.recipe.getRecipes({
      query: {
        skip,
        take: perPage,
        searchTerm: searchTerm || undefined,
      }
    });
    if (status !== 200) error(400, { message: `Not found` })

    return body

  } catch (err) {
    if (err instanceof Error) {
      error(400, err.message)
    }
  }
}

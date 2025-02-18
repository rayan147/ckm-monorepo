import { writable } from 'svelte/store';
import { api } from '@ckm/lib-api';
//import type { Recipe } from '@ckm/db';

interface RecipeState {
  recipes: [];
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
}

interface RecipeInput {
  skip?: number;
  take?: number;
  restaurantId?: number;
  searchTerm?: string;
}


function createRecipeStore() {
  const { subscribe, set, update } = writable<RecipeState>({
    recipes: [],
    loading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
    itemsPerPage: 10
  });

  let currentQuery: RecipeInput = {}
  return {
    subscribe,
    fetchRecipes: async (query: RecipeInput) => {
      currentQuery = query
      update((state) => ({ ...state, loading: true, error: null }));
      try {
        const response = await api.recipe.getRecipes({ query });
        if (response.status !== 200) throw new Error(`Failed to fetch recipes: ${response.status}`);

        const { recipes, totalCount } = response.body;

        update((state) => ({
          ...state,
          recipes,
          loading: false,
          totalCount,
          currentPage: Math.floor((query.skip ?? 0) / state.itemsPerPage) + 1
        }));
      } catch (error: any) {
        update((state) => ({ ...state, error: error.message, loading: false }));
        console.error(error);
      }
    },
    setPage: (page: number) => {
      update((state) => ({ ...state, currentPage: page }));
    },
    setItemsPerPage: (items: number) => {
      update((state) => ({ ...state, itemsPerPage: items }));
    },

    deleteRecipe: async (id: number) => {
      update((state) => ({ ...state, loading: true, error: null }));
      if (confirm('Are you sure you want to delete this recipe?')) {
        try {
          await api.recipe.deleteRecipe({ params: { id } });
        } catch (error: any) {
          update((state) => ({ ...state, error: error.message, loading: false }));
          console.error(error);
        } finally {
          const response = await api.recipe.getRecipes(currentQuery);
          if (response.status !== 200) throw new Error(`Failed to fetch recipes: ${response.status}`);

          const { recipes, totalCount } = response.body;

          update((state) => ({
            ...state,
            recipes,
            loading: false,
            totalCount,
            currentPage: Math.floor((currentQuery.skip ?? 0) / state.itemsPerPage) + 1
          }));


        }
      }

    },
    createRecipe: async (data: unknown) => {
      update((state) => ({ ...state, loading: true, error: null }));
      try {

        const response = await api.recipe.createRecipe({ body: data });
        if (response.status !== 200) throw new Error(`Failed to create recipes: ${response.status}`);



      } catch (error) {
        update((state) => ({ ...state, error: error.message, loading: false }));
        console.error(error);

      } finally {

        console.log(`currentQuery is ${currentQuery}`)
      }
    }
  }
}
export const recipeStore = createRecipeStore();

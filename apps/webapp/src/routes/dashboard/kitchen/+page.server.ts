import { api } from '@ckm/lib-api';
import { error, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
  deleteRecipe: async ({ request }) => {
    const formData = await request.formData();
    const id = Number(formData.get('id'));

    if (!id) {
      return { success: false, message: 'Recipe ID is required' };
    }

    try {
      await api.recipe.deleteRecipe({ params: { id } });
      return {
        success: true,
        message: 'Recipe deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting recipe:', error);
      return {
        success: false,
        message: 'Failed to delete recipe'
      };
    }
  }
} satisfies Actions;

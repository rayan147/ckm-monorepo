<script lang="ts">
  import { run, createBubbler, stopPropagation } from 'svelte/legacy';

  const bubble = createBubbler();
  import { onMount, setContext, onDestroy } from 'svelte';
  import { api } from '@ckm/lib-api';
  import type { Recipe as BaseRecipe, Restaurant, CookBook, Ingredient } from '@ckm/zod-schemas';
  import RecipeDetailsView from '$lib/components/Recipe/RecipeDetailsView.svelte';
  import RecipeForm from './RecipeForm.svelte';
  import RecipeHeader from './RecipeHeader.svelte';
  import RecipeTable from './RecipeTable.svelte';
  import Pagination from './Pagination.svelte';
  import { recipeStore } from '$lib/stores/recipeStore';
  import convertUnitsHelper, { isWeightUnit } from '$lib/utils/unitConvertionVolumeToWeight';
  import { type Conversion, conversions } from '$lib/utils/ingredientsConversion';
  import type { RecipeFormData, Recipe } from '@ckm/types';
  import { RecipeState } from '$lib/stores/recipe.svelte';

  const recipeState = new RecipeState();
  setContext('recipeState', recipeState);

  onMount(() => {
    recipeState.init();
  });

  onDestroy(() => {
    recipeState.destroy();
  });
</script>

<!-- Main Container -->
<div class="container p-4 mx-auto">
  <!-- Header Section -->
  {#if recipeState.currentView === 'list'}
    <RecipeHeader />

    <RecipeTable />

    <!-- <Pagination /> -->
  {/if}

  <!-- Create/Edit Recipe Form -->
  <div class="container p-4 mx-auto">
    <!-- Create/Edit Recipe Form -->
    {#if recipeState.currentView === 'create' || recipeState.currentView === 'edit'}
      <!-- <RecipeForm -->
      <!--   {recipesState.currentView} -->
      <!--   bind:currentRecipe -->
      <!--   {restaurants} -->
      <!--   {cookBooks} -->
      <!--   {ingredientsList} -->
      <!--   {errors} -->
      <!--   {totalSteps} -->
      <!--   {goBack} -->
      <!--   {handleSubmit} -->
      <!--   {prevStep} -->
      <!--   {nextStep} -->
      <!--   {addIngredient} -->
      <!--   {removeIngredient} -->
      <!--   {addInstruction} -->
      <!--   {removeInstruction} -->
      <!-- /> -->
    {/if}
  </div>

  <!--     > -->
  <!--       <div class="flex items-center justify-between mb-4"> -->
  <!--         <h3 class="text-lg font-medium text-gray-900">Standardize Ingredient</h3> -->
  <!--         <div -->
  <!--           onclick={closeStandardizationModal} -->
  <!--           class="text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer" -->
  <!--           aria-label="Close modal" -->
  <!--         > -->
  <!--           <!-- Close Icon --> -->
  <!--           <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> -->
  <!--             <path -->
  <!--               stroke-linecap="round" -->
  <!--               stroke-linejoin="round" -->
  <!--               stroke-width="2" -->
  <!--               d="M6 18L18 6M6 6l12 12" -->
  <!--             /> -->
  <!--           </svg> -->
  <!--         </div> -->
  <!--       </div> -->
  <!--       {#if currentRecipe} -->
  <!--         <p class="mb-4"> -->
  <!--           Current: {currentRecipe.ingredients[standardizingIngredientIndex].quantity.toFixed(2)} -->
  <!--           {currentRecipe.ingredients[standardizingIngredientIndex].unit} -->
  <!--         </p> -->
  <!--         <div class="flex flex-col mb-4 space-y-2"> -->
  <!--           <select -->
  <!--             bind:value={standardizingToUnit} -->
  <!--             class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" -->
  <!--           > -->
  <!--             <option value="">Select unit to convert to</option> -->
  <!--             {#each allUnits as unit} -->
  <!--               <option value={unit}>{unit}</option> -->
  <!--             {/each} -->
  <!--           </select> -->
  <!--           <button -->
  <!--             onclick={applyStandardization} -->
  <!--             class="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" -->
  <!--           > -->
  <!--             Convert -->
  <!--           </button> -->
  <!--         </div> -->
  <!--       {/if} -->
  <!--     </div> -->
  <!--   </div> -->
  <!-- {/if} -->
</div>

<style>
  /* Custom styles for step indicators */
</style>

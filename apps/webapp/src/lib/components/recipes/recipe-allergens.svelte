<!-- src/lib/components/recipes/recipe-allergens.svelte -->
<script lang="ts">
  import { getRecipeContext } from '$lib/contexts/recipe-context.svelte';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Separator } from '$lib/components/ui/separator';
  import { AlertTriangle, Check, Info, Leaf, ChevronDown, ChevronUp } from 'lucide-svelte';
  import { slide } from 'svelte/transition';
  import { SvelteMap } from 'svelte/reactivity';

  // Get recipe from context
  const recipeState = getRecipeContext();
  const recipe = recipeState.recipe;

  type MapAllergen = {
    Gluten: boolean;
    Dairy: boolean;
    Nuts: boolean;
    Eggs: boolean;
    Soy: boolean;
    Fish: boolean;
    Shellfish: boolean;
    Sesame: boolean;
  };

  // Track expanded allergen details using SvelteMap instead of a regular object
  let expandedAllergens = new SvelteMap<string, boolean>();

  const allergens = [
    'Gluten',
    'Dairy',
    'Nuts',
    'Eggs',
    'Soy',
    'Fish',
    'Shellfish',
    'Sesame'
  ] as const;
  const allergenKeywords = {
    Gluten: [
      // Basic gluten sources
      'wheat',
      'barley',
      'rye',
      'spelt',
      'kamut',
      'triticale',
      'farro',
      'durum',
      'semolina',
      'gluten',
      'flour',
      'bread',
      'pasta',
      'noodle',
      'couscous',
      'bulgur',
      'seitan',

      // Common gluten-containing foods
      'muesli',
      'granola',
      'cereal',
      'cracker',
      'biscuit',
      'cookie',
      'cake',
      'pastry',
      'pie',
      'pizza',
      'pretzel',
      'croissant',
      'bagel',
      'muffin',
      'pancake',
      'waffle',
      'bun',
      'breadcrumb',
      'crouton',
      'tortilla',
      'flatbread',
      'doughnut',
      'brioche',
      'pita',

      // Ingredients often containing gluten
      'malt',
      'brewer',
      'beer',
      'ale',
      'lager',
      'stout',
      'batter',
      'breading',
      'gravy',
      'custard',
      'pudding',
      'stuffing',
      'panko',
      'breadstick',

      // Cereal grains that often contain gluten
      'bran',
      'germ',
      'wheat germ',
      'oat',
      'oats',
      'oatmeal',

      // Industrial food additives
      'hydrolyzed wheat protein',
      'modified food starch',
      'maltodextrin'
    ],

    Dairy: [
      // Basic dairy sources
      'milk',
      'cream',
      'butter',
      'cheese',
      'yogurt',
      'whey',
      'lactose',
      'casein',
      'caseinate',
      'dairy',
      'buttermilk',
      'ghee',
      'pudding',

      // Cheese varieties
      'cheddar',
      'mozzarella',
      'parmesan',
      'feta',
      'gouda',
      'brie',
      'ricotta',
      'cottage cheese',
      'mascarpone',
      'cream cheese',
      'blue cheese',
      'gorgonzola',
      'swiss',
      'provolone',

      // Milk products
      'ice cream',
      'gelato',
      'custard',
      'milkshake',
      'kefir',
      'quark',
      'skyr',
      'half and half',
      'sour cream',
      'curds',
      'lassi',
      'condensed milk',
      'evaporated milk',
      'powdered milk',
      'dulce de leche'
    ],

    Nuts: [
      // Common nuts
      'nut',
      'almond',
      'cashew',
      'pecan',
      'walnut',
      'hazelnut',
      'pistachio',
      'macadamia',
      'pine nut',
      'brazil nut',
      'chestnut',
      'beechnut',
      'hickory nut',
      'peanut',

      // Nut products & derivatives
      'nutella',
      'nougat',
      'praline',
      'marzipan',
      'frangipane',
      'almond paste',
      'almond milk',
      'almond flour',
      'almond butter',
      'cashew milk',
      'cashew butter',
      'walnut oil',
      'pecan pie',

      // Other common terms
      'mixed nuts',
      'trail mix',
      'nut butter',
      'nut milk',

      // Coconut products (often classified as tree nuts for allergy purposes)
      'coconut',
      'coconut milk',
      'coconut water',
      'coconut cream',
      'coconut oil',
      'coconut flour'
    ],

    Eggs: [
      // Basic egg terms
      'egg',
      'eggs',
      'yolk',
      'white',
      'albumin',
      'meringue',
      'mayonnaise',

      // Foods commonly containing eggs
      'omelet',
      'frittata',
      'quiche',
      'custard',
      'pudding',
      'flan',
      'ice cream',
      'gelato',
      'aioli',
      'hollandaise',
      'béarnaise',
      'eggnog',
      'merengue',
      'souffle',
      'mousse',

      // Baked goods with eggs
      'cake',
      'cookie',
      'muffin',
      'pancake',
      'waffle',
      'crepe',
      'french toast',
      'brioche',
      'challah',
      'pastry',

      // Hidden egg ingredients
      'lecithin',
      'lysozyme',
      'globulin',
      'ovoglobulin',
      'ovomucin',
      'ovovitellin',
      'vitellin',
      'livetin',
      'ovalbumin'
    ],

    Soy: [
      // Basic soy products
      'soy',
      'soya',
      'tofu',
      'edamame',
      'miso',
      'tempeh',
      'natto',
      'soy milk',
      'soy sauce',
      'tamari',
      'soy flour',
      'soybean',
      'soy protein',
      'textured vegetable protein',
      'tvp',
      'tsp',
      'soy lecithin',

      // Fermented soy products
      'doenjang',
      'doubanjiang',
      'gochujang',
      'cheonggukjang',

      // Asian foods often containing soy
      'teriyaki',
      'shoyu',
      'hoisin',
      'oyster sauce',
      'seitan',
      'mock meat',
      'vegetarian meat',
      'plant-based meat',

      // Hidden soy ingredients
      'hydrolyzed vegetable protein',
      'vegetable broth',
      'vegetable starch',
      'vegetable protein',
      'lecithin',
      'emulsifier'
    ],

    Fish: [
      // Common fish
      'fish',
      'salmon',
      'tuna',
      'trout',
      'cod',
      'halibut',
      'haddock',
      'mackerel',
      'herring',
      'sardine',
      'anchovy',
      'tilapia',
      'bass',
      'snapper',
      'flounder',
      'sole',
      'perch',
      'mahi mahi',
      'swordfish',
      'catfish',
      'whitefish',

      // Fish products
      'caviar',
      'roe',
      'fish sauce',
      'fish paste',
      'surimi',
      'furikake',
      'bonito',
      'katsuobushi',
      'dashi',
      'caesar dressing',
      'worcestershire sauce',

      // Canned fish
      'canned tuna',
      'canned salmon',
      'canned sardines',
      'canned anchovies'
    ],

    Shellfish: [
      // Crustaceans
      'shellfish',
      'shrimp',
      'prawn',
      'crab',
      'lobster',
      'crayfish',
      'crawfish',
      'langoustine',
      'krill',

      // Mollusks
      'clam',
      'mussel',
      'oyster',
      'scallop',
      'squid',
      'calamari',
      'octopus',
      'abalone',
      'snail',
      'escargot',
      'periwinkle',
      'conch',
      'whelk',

      // Shellfish products
      'seafood',
      'bisque',
      'chowder',
      'bouillabaisse',
      'paella',
      'cioppino',
      'frutti di mare',
      'crab cake',
      'shrimp paste',
      'fish sauce',
      'nam pla',
      'patis',
      'crab stick',
      'surimi'
    ],

    Sesame: [
      // Basic sesame products
      'sesame',
      'tahini',
      'sesame oil',
      'sesame seed',
      'sesame paste',
      'sesame flour',
      'sesame butter',
      'goma',
      'benne seed',

      // Foods commonly containing sesame
      'hummus',
      'baba ghanoush',
      'halva',
      'falafel',
      "za'atar",
      'seeded bread',
      'everything bagel',
      'sesame bagel',
      'tahini sauce',
      'sesame dressing',
      'sesame snaps',
      'sesame candy',
      'halvah',
      'gomashio',
      'furikake',
      'sesame chicken',
      'sesame noodles',
      'burger bun',
      'hamburger bun'
    ]
  } as const;

  // Toggle expanded state for allergen
  function toggleAllergen(allergen: string) {
    console.log({ expandedAllergens });
    // Using SvelteMap's set method which triggers reactivity internally
    expandedAllergens.set(allergen, !expandedAllergens.get(allergen));
  }

  // Function to determine if an allergen is present
  function allergenStatus(name: keyof MapAllergen) {
    if (!recipe.nutritionalInfo) return null;

    const allergenMap = {
      Gluten: recipe.nutritionalInfo.containsGluten,
      Dairy: recipe.nutritionalInfo.containsDairy,
      Nuts: recipe.nutritionalInfo.containsNuts,
      Eggs: recipe.nutritionalInfo.containsEggs,
      Soy: recipe.nutritionalInfo.containsSoy,
      Fish: recipe.nutritionalInfo.containsFish,
      Shellfish: recipe.nutritionalInfo.containsShellfish,
      Sesame: recipe.nutritionalInfo.containsSesame
    };

    return allergenMap[name];
  }
  function findAllergensInIngredients(allergen: keyof MapAllergen) {
    if (!recipe.ingredients) return [];

    // Get keywords for the specified allergen
    const keywords = allergenKeywords[allergen];

    // Check each ingredient
    return recipe.ingredients
      .filter((ri) => {
        const ingredient = ri.ingredient;
        const name = ingredient.name.toLowerCase();
        const processingNotes = (ri.processingInstructions || '').toLowerCase();
        const combinedText = name + ' ' + processingNotes;

        // Use word boundary matching for more accurate detection
        return keywords.some((keyword) => {
          const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'i');
          return regex.test(combinedText);
        });
      })
      .map((ri) => ri.ingredient.name);
  }

  // Format date helper
  function formatDate(date: Date) {
    if (!date) return 'Not yet published';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<Card class="mb-6">
  <CardHeader class="pb-3">
    <CardTitle class="text-base font-medium flex items-center gap-2">
      <Info class="h-4 w-4 text-primary-500" />
      Dietary & Allergen Information
    </CardTitle>
  </CardHeader>

  <CardContent>
    <h4 class="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
      <Leaf class="h-4 w-4 text-red-600" />
      Dietary Restrictions
    </h4>

    {#if recipe.dietaryRestrictions && recipe.dietaryRestrictions.length > 0}
      <div class="mb-4">
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {#each recipe.dietaryRestrictions as restriction}
            <div class="flex items-center gap-2 bg-red-50 border border-red-200 rounded-md p-2">
              <span
                class="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center"
              >
                <Leaf class="h-3 w-3 text-red-600" />
              </span>
              <span class="text-sm font-medium text-red-700">{restriction.name}</span>
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <p class="text-sm text-gray-500 italic mb-4">No dietary restrictions specified</p>
    {/if}

    <Separator class="my-3" />

    <h4 class="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
      <AlertTriangle class="h-4 w-4 text-amber-500" />
      Allergen Information
    </h4>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {#each allergens as allergen}
        {@const status = allergenStatus(allergen)}
        {@const allergenIngredients = status ? findAllergensInIngredients(allergen) : []}
        {@const hasIngredients = allergenIngredients.length > 0}
        {console.log({ allergenIngredients })}

        <div class="rounded-md border overflow-hidden">
          <button
            class={`w-full p-3 flex items-center justify-between ${status === true ? 'bg-red-50 border-red-200' : status === false ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
            onclick={() => hasIngredients && toggleAllergen(allergen)}
            aria-expanded={expandedAllergens.get(allergen)}
            disabled={!hasIngredients}
          >
            <div class="flex items-center gap-2">
              {#if status === true}
                <span
                  class="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <AlertTriangle class="h-3 w-3 text-red-600" />
                </span>
                <span class="text-sm font-medium">Contains {allergen}</span>
              {:else if status === false}
                <span
                  class="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Check class="h-3 w-3 text-green-600" />
                </span>
                <span class="text-sm">{allergen}-Free</span>
              {:else}
                <span
                  class="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Info class="h-3 w-3 text-gray-500" />
                </span>
                <span class="text-sm text-gray-500">{allergen}</span>
              {/if}
            </div>

            {#if hasIngredients}
              <span class="text-sm text-gray-500" aria-hidden="true">
                {#if expandedAllergens.get(allergen)}
                  <ChevronUp class="h-4 w-4" />
                {:else}
                  <ChevronDown class="h-4 w-4" />
                {/if}
              </span>
            {/if}
          </button>

          {#if hasIngredients && expandedAllergens.get(allergen)}
            <div
              class="p-3 bg-white border-t border-red-100 text-sm"
              transition:slide={{ duration: 200 }}
            >
              <p class="font-medium text-gray-700 mb-1">Found in these ingredients:</p>
              <ul class="space-y-1 pl-2">
                {#each allergenIngredients as ingredient}
                  <li class="text-gray-600 flex items-start">
                    <span class="text-red-400 mr-1.5" aria-hidden="true">•</span>
                    {ingredient}
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    {#if recipe.criticalPoints && recipe.criticalPoints.length > 0}
      <Separator class="my-3" />

      <h4 class="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        <AlertTriangle class="h-4 w-4 text-amber-500" />
        Food Safety Critical Points
      </h4>

      <ul class="space-y-1.5 text-sm text-gray-600">
        {#each recipe.criticalPoints as point}
          <li class="flex items-start gap-2">
            <span class="text-amber-500 mt-0.5">•</span>
            <span>{point.description}</span>
          </li>
        {/each}
      </ul>
    {/if}

    <div class="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
      {#if recipe.publishedAt}
        Last updated: {formatDate(recipe.publishedAt)}
      {:else}
        Has not been published yet
      {/if}
    </div>
  </CardContent>
</Card>

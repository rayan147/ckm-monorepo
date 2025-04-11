import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { EnvService } from 'src/env/env.service';

// Interface for USDA nutrient data structure
interface UsdaFoodNutrient {
  nutrient?: {
    id?: number;
    name?: string;
  };
  amount?: number;
}

interface NutritionData {
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

interface AllergenData {
  containsGluten: boolean;
  containsDairy: boolean;
  containsNuts: boolean;
  containsEggs: boolean;
  containsSoy: boolean;
  containsFish: boolean;
  containsShellfish: boolean;
  containsSesame: boolean;
}

// Map of USDA nutrient names to our internal property names
type NutrientNameMap = {
  [key: string]: keyof NutritionData;
};

// Map of USDA nutrient IDs to our internal property names
type NutrientIdMap = {
  [key: number]: keyof NutritionData;
};

@Injectable()
export class UsdaApiService {
  private readonly apiKey: string;
  private readonly baseUrl: string = 'https://api.nal.usda.gov/fdc/v1';
  private readonly allergenKeywords = {
    gluten: [
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
      'maltodextrin',
    ],

    dairy: [
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
      'dulce de leche',
    ],

    nuts: [
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
      'coconut flour',
    ],

    eggs: [
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
      'ovalbumin',
    ],

    soy: [
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
      'emulsifier',
    ],

    fish: [
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
      'canned anchovies',
    ],

    shellfish: [
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
      'surimi',
    ],

    sesame: [
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
      'hamburger bun',
    ],
  } as const;

  constructor(
    private readonly httpService: HttpService,
    private readonly envService: EnvService,
  ) {
    this.apiKey = this.envService.get('USDA_API_KEY');
    if (!this.apiKey) {
      console.warn('USDA_API_KEY is not set. USDA food data API calls will fail.');
    }
  }
  detectAllergens(foodData: any): AllergenData {
    const allergens: AllergenData = {
      containsGluten: false,
      containsDairy: false,
      containsNuts: false,
      containsEggs: false,
      containsSoy: false,
      containsFish: false,
      containsShellfish: false,
      containsSesame: false,
    };

    if (!foodData) return allergens;

    // Get food description and ingredients list if available
    const description = foodData.description || '';
    const ingredients = foodData.ingredients || '';
    console.log(`description is ${description} and ingredients is ${ingredients}`);
    const combinedText = (description + ' ' + ingredients).toLowerCase();

    // Check each allergen category
    allergens.containsGluten = this.allergenKeywords.gluten.some(keyword =>
      combinedText.includes(keyword),
    );
    allergens.containsDairy = this.allergenKeywords.dairy.some(keyword =>
      combinedText.includes(keyword),
    );
    allergens.containsNuts = this.allergenKeywords.nuts.some(keyword =>
      combinedText.includes(keyword),
    );
    allergens.containsEggs = this.allergenKeywords.eggs.some(keyword =>
      combinedText.includes(keyword),
    );
    allergens.containsSoy = this.allergenKeywords.soy.some(keyword =>
      combinedText.includes(keyword),
    );
    allergens.containsFish = this.allergenKeywords.fish.some(keyword =>
      combinedText.includes(keyword),
    );
    allergens.containsShellfish = this.allergenKeywords.shellfish.some(keyword =>
      combinedText.includes(keyword),
    );
    allergens.containsSesame = this.allergenKeywords.sesame.some(keyword =>
      combinedText.includes(keyword),
    );

    return allergens;
  }

  async searchFoods(query: string, pageSize: number = 25): Promise<any> {
    try {
      const url = `${this.baseUrl}/foods/search`;

      // Include all data types available in the USDA database
      // This includes: Foundation, SR Legacy, Survey (FNDDS), Branded, and Experimental Foods
      const params = {
        api_key: this.apiKey,
        query,
        pageSize,
        // Don't specify dataType to get results from all categories
        // Or explicitly include all categories:
        dataType: 'Foundation,SR Legacy,Survey (FNDDS),Branded,Experimental',
      };

      const { data } = await firstValueFrom(
        this.httpService.get(url, { params }).pipe(
          catchError((error: AxiosError) => {
            console.error('Error searching USDA foods:', error.response?.data || error.message);
            throw new Error(`Failed to search foods: ${error.message}`);
          }),
        ),
      );

      console.log(`USDA search for "${query}" returned ${data?.foods?.length || 0} results`);
      console.log(`the data is: ${JSON.stringify(data, null, 2)}`);
      return data;
    } catch (error) {
      console.error('Error in searchFoods:', error);
      return { foods: [] };
    }
  }

  async getFoodNutrition(fdcId: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/food/${fdcId}`;
      const { data } = await firstValueFrom(
        this.httpService
          .get(url, {
            params: {
              api_key: this.apiKey,
              format: 'full',
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              console.error('Error fetching food details:', error.response?.data || error.message);
              throw new Error(`Failed to get food details: ${error.message}`);
            }),
          ),
      );
      return data;
    } catch (error) {
      console.error('Error in getFoodNutrition:', error);
      return null;
    }
  }

  // Utility method to search with fallback to broader search if no results
  async searchFoodsWithFallback(query: string, pageSize: number = 25): Promise<any> {
    // First, try with the original query
    const result = await this.searchFoods(query, pageSize);

    // If we got results, return them
    if (result.foods && result.foods.length > 0) {
      return result;
    }

    // If no results and query has multiple words, try with just the first word
    const words = query.split(' ').filter(word => word.length > 2); // Filter out very short words
    if (words.length > 1) {
      console.log(`No results for "${query}", trying with first word "${words[0]}"`);
      return this.searchFoods(words[0], pageSize);
    }

    return result; // Return original empty result if no fallback
  }

  // Helper method to extract standardized nutrition data from USDA response
  extractNutritionData(foodData: any): NutritionData | null {
    if (!foodData || !foodData.foodNutrients) {
      return null;
    }

    const nutritionData: NutritionData = {
      calories: 0,
      protein: 0,
      fat: 0,
      carbohydrates: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0,
    };

    // Map of nutrient names to our standardized names
    const nutrientNameMap: NutrientNameMap = {
      Energy: 'calories',
      Protein: 'protein',
      'Total lipid (fat)': 'fat',
      'Carbohydrate, by difference': 'carbohydrates',
      'Fiber, total dietary': 'fiber',
      'Sugars, total including NLEA': 'sugar',
      'Sodium, Na': 'sodium',
    };

    // Also check by nutrient IDs as a fallback
    const nutrientIdMap: NutrientIdMap = {
      1008: 'calories', // Energy (kcal)
      1003: 'protein',
      1004: 'fat',
      1005: 'carbohydrates',
      1079: 'fiber',
      2000: 'sugar',
      1093: 'sodium',
    };

    // Process each nutrient
    (foodData.foodNutrients || []).forEach((nutrient: UsdaFoodNutrient) => {
      let nutrientName: keyof NutritionData | undefined;

      // Check using the name
      if (
        nutrient.nutrient &&
        nutrient.nutrient.name &&
        nutrient.nutrient.name in nutrientNameMap
      ) {
        nutrientName = nutrientNameMap[nutrient.nutrient.name];
      }

      // If not found by name, try by ID
      if (
        !nutrientName &&
        nutrient.nutrient &&
        nutrient.nutrient.id &&
        nutrient.nutrient.id in nutrientIdMap
      ) {
        nutrientName = nutrientIdMap[nutrient.nutrient.id];
      }

      // If we identified this nutrient, store its value
      if (nutrientName && nutrient.amount !== undefined) {
        nutritionData[nutrientName] = nutrient.amount;
      }
    });

    return nutritionData;
  }
}

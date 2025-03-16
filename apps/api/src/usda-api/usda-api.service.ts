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
    gluten: ['wheat', 'barley', 'rye', 'gluten', 'bread', 'pasta', 'flour'],
    dairy: ['milk', 'cheese', 'yogurt', 'cream', 'butter', 'dairy', 'lactose', 'whey'],
    nuts: ['nuts', 'almond', 'walnut', 'pecan', 'cashew', 'pistachio', 'hazelnut', 'peanut', 'macadamia'],
    eggs: ['egg', 'eggs', 'yolk', 'albumin'],
    soy: ['soy', 'soya', 'tofu', 'edamame'],
    fish: ['fish', 'salmon', 'tuna', 'cod', 'tilapia', 'halibut', 'trout'],
    shellfish: ['shellfish', 'shrimp', 'crab', 'lobster', 'prawn', 'clam', 'oyster', 'mussel', 'scallop'],
    sesame: ['sesame', 'tahini']
  };

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
      containsSesame: false
    };

    if (!foodData) return allergens;

    // Get food description and ingredients list if available
    const description = foodData.description || '';
    const ingredients = foodData.ingredients || '';
    const combinedText = (description + ' ' + ingredients).toLowerCase();

    // Check each allergen category
    allergens.containsGluten = this.allergenKeywords.gluten.some(keyword =>
      combinedText.includes(keyword));
    allergens.containsDairy = this.allergenKeywords.dairy.some(keyword =>
      combinedText.includes(keyword));
    allergens.containsNuts = this.allergenKeywords.nuts.some(keyword =>
      combinedText.includes(keyword));
    allergens.containsEggs = this.allergenKeywords.eggs.some(keyword =>
      combinedText.includes(keyword));
    allergens.containsSoy = this.allergenKeywords.soy.some(keyword =>
      combinedText.includes(keyword));
    allergens.containsFish = this.allergenKeywords.fish.some(keyword =>
      combinedText.includes(keyword));
    allergens.containsShellfish = this.allergenKeywords.shellfish.some(keyword =>
      combinedText.includes(keyword));
    allergens.containsSesame = this.allergenKeywords.sesame.some(keyword =>
      combinedText.includes(keyword));

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
        dataType: 'Foundation,SR Legacy,Survey (FNDDS),Branded,Experimental'
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
      console.log(`the data is: ${JSON.stringify(data, null, 2)}`)
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
        this.httpService.get(url, {
          params: {
            api_key: this.apiKey,
            format: 'full',
          },
        }).pipe(
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
      sodium: 0
    };

    // Map of nutrient names to our standardized names
    const nutrientNameMap: NutrientNameMap = {
      'Energy': 'calories',
      'Protein': 'protein',
      'Total lipid (fat)': 'fat',
      'Carbohydrate, by difference': 'carbohydrates',
      'Fiber, total dietary': 'fiber',
      'Sugars, total including NLEA': 'sugar',
      'Sodium, Na': 'sodium'
    };

    // Also check by nutrient IDs as a fallback
    const nutrientIdMap: NutrientIdMap = {
      1008: 'calories', // Energy (kcal)
      1003: 'protein',
      1004: 'fat',
      1005: 'carbohydrates',
      1079: 'fiber',
      2000: 'sugar',
      1093: 'sodium'
    };

    // Process each nutrient
    (foodData.foodNutrients || []).forEach((nutrient: UsdaFoodNutrient) => {
      let nutrientName: keyof NutritionData | undefined;

      // Check using the name
      if (nutrient.nutrient && nutrient.nutrient.name && nutrient.nutrient.name in nutrientNameMap) {
        nutrientName = nutrientNameMap[nutrient.nutrient.name];
      }

      // If not found by name, try by ID
      if (!nutrientName && nutrient.nutrient && nutrient.nutrient.id && nutrient.nutrient.id in nutrientIdMap) {
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

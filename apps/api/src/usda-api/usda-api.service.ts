// src/services/usda-api.service.ts
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { EnvService } from 'src/env/env.service';

interface NutrientMap {
  'Energy': number;
  'Protein': number;
  'Total lipid (fat)': number;
  'Carbohydrate, by difference': number;
  'Fiber, total dietary': number;
  'Sugars, total including NLEA': number;
  'Sodium, Na': number;
}

@Injectable()
export class UsdaApiService {
  private readonly apiKey: string;
  private readonly baseUrl: string = 'https://api.nal.usda.gov/fdc/v1';

  constructor(
    private readonly httpService: HttpService,
    private readonly envService: EnvService,
  ) {
    this.apiKey = this.envService.get('USDA_API_KEY');
    if (!this.apiKey) {
      console.warn('USDA_API_KEY is not set. USDA food data API calls will fail.');
    }
  }

  async searchFoods(query: string, pageSize: number = 25): Promise<any> {
    try {
      const url = `${this.baseUrl}/foods/search`;

      // Create params object without array notation
      const params = {
        api_key: this.apiKey,
        query,
        pageSize,
        dataType: 'Foundation,SR Legacy' // Change to comma-separated string instead of array
      };

      const { data } = await firstValueFrom(
        this.httpService.get(url, { params }).pipe(
          catchError((error: AxiosError) => {
            console.error('Error searching USDA foods:', error.response?.data || error.message);
            throw new Error(`Failed to search foods: ${error.message}`);
          }),
        ),
      );
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

  // Helper method to lookup common nutrient IDs
  // getNutrientIdByName(name: keyof NutrientMap): number | null {
  //   const nutrientMap = {
  //     'Energy': 1008, // Energy (kcal)
  //     'Protein': 1003,
  //     'Total lipid (fat)': 1004,
  //     'Carbohydrate, by difference': 1005,
  //     'Fiber, total dietary': 1079,
  //     'Sugars, total including NLEA': 2000,
  //   }
  //   return nutrientMap[name]
  // }
}

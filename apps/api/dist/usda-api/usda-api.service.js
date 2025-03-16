"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsdaApiService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const axios_1 = require("@nestjs/axios");
const env_service_1 = require("../env/env.service");
let UsdaApiService = class UsdaApiService {
    constructor(httpService, envService) {
        this.httpService = httpService;
        this.envService = envService;
        this.baseUrl = 'https://api.nal.usda.gov/fdc/v1';
        this.allergenKeywords = {
            gluten: ['wheat', 'barley', 'rye', 'gluten', 'bread', 'pasta', 'flour'],
            dairy: ['milk', 'cheese', 'yogurt', 'cream', 'butter', 'dairy', 'lactose', 'whey'],
            nuts: ['nuts', 'almond', 'walnut', 'pecan', 'cashew', 'pistachio', 'hazelnut', 'peanut', 'macadamia'],
            eggs: ['egg', 'eggs', 'yolk', 'albumin'],
            soy: ['soy', 'soya', 'tofu', 'edamame'],
            fish: ['fish', 'salmon', 'tuna', 'cod', 'tilapia', 'halibut', 'trout'],
            shellfish: ['shellfish', 'shrimp', 'crab', 'lobster', 'prawn', 'clam', 'oyster', 'mussel', 'scallop'],
            sesame: ['sesame', 'tahini']
        };
        this.apiKey = this.envService.get('USDA_API_KEY');
        if (!this.apiKey) {
            console.warn('USDA_API_KEY is not set. USDA food data API calls will fail.');
        }
    }
    detectAllergens(foodData) {
        const allergens = {
            containsGluten: false,
            containsDairy: false,
            containsNuts: false,
            containsEggs: false,
            containsSoy: false,
            containsFish: false,
            containsShellfish: false,
            containsSesame: false
        };
        if (!foodData)
            return allergens;
        const description = foodData.description || '';
        const ingredients = foodData.ingredients || '';
        const combinedText = (description + ' ' + ingredients).toLowerCase();
        allergens.containsGluten = this.allergenKeywords.gluten.some(keyword => combinedText.includes(keyword));
        allergens.containsDairy = this.allergenKeywords.dairy.some(keyword => combinedText.includes(keyword));
        allergens.containsNuts = this.allergenKeywords.nuts.some(keyword => combinedText.includes(keyword));
        allergens.containsEggs = this.allergenKeywords.eggs.some(keyword => combinedText.includes(keyword));
        allergens.containsSoy = this.allergenKeywords.soy.some(keyword => combinedText.includes(keyword));
        allergens.containsFish = this.allergenKeywords.fish.some(keyword => combinedText.includes(keyword));
        allergens.containsShellfish = this.allergenKeywords.shellfish.some(keyword => combinedText.includes(keyword));
        allergens.containsSesame = this.allergenKeywords.sesame.some(keyword => combinedText.includes(keyword));
        return allergens;
    }
    async searchFoods(query, pageSize = 25) {
        var _a;
        try {
            const url = `${this.baseUrl}/foods/search`;
            const params = {
                api_key: this.apiKey,
                query,
                pageSize,
                dataType: 'Foundation,SR Legacy,Survey (FNDDS),Branded,Experimental'
            };
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, { params }).pipe((0, rxjs_1.catchError)((error) => {
                var _a;
                console.error('Error searching USDA foods:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                throw new Error(`Failed to search foods: ${error.message}`);
            })));
            console.log(`USDA search for "${query}" returned ${((_a = data === null || data === void 0 ? void 0 : data.foods) === null || _a === void 0 ? void 0 : _a.length) || 0} results`);
            console.log(`the data is: ${JSON.stringify(data, null, 2)}`);
            return data;
        }
        catch (error) {
            console.error('Error in searchFoods:', error);
            return { foods: [] };
        }
    }
    async getFoodNutrition(fdcId) {
        try {
            const url = `${this.baseUrl}/food/${fdcId}`;
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
                params: {
                    api_key: this.apiKey,
                    format: 'full',
                },
            }).pipe((0, rxjs_1.catchError)((error) => {
                var _a;
                console.error('Error fetching food details:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                throw new Error(`Failed to get food details: ${error.message}`);
            })));
            return data;
        }
        catch (error) {
            console.error('Error in getFoodNutrition:', error);
            return null;
        }
    }
    async searchFoodsWithFallback(query, pageSize = 25) {
        const result = await this.searchFoods(query, pageSize);
        if (result.foods && result.foods.length > 0) {
            return result;
        }
        const words = query.split(' ').filter(word => word.length > 2);
        if (words.length > 1) {
            console.log(`No results for "${query}", trying with first word "${words[0]}"`);
            return this.searchFoods(words[0], pageSize);
        }
        return result;
    }
    extractNutritionData(foodData) {
        if (!foodData || !foodData.foodNutrients) {
            return null;
        }
        const nutritionData = {
            calories: 0,
            protein: 0,
            fat: 0,
            carbohydrates: 0,
            fiber: 0,
            sugar: 0,
            sodium: 0
        };
        const nutrientNameMap = {
            'Energy': 'calories',
            'Protein': 'protein',
            'Total lipid (fat)': 'fat',
            'Carbohydrate, by difference': 'carbohydrates',
            'Fiber, total dietary': 'fiber',
            'Sugars, total including NLEA': 'sugar',
            'Sodium, Na': 'sodium'
        };
        const nutrientIdMap = {
            1008: 'calories',
            1003: 'protein',
            1004: 'fat',
            1005: 'carbohydrates',
            1079: 'fiber',
            2000: 'sugar',
            1093: 'sodium'
        };
        (foodData.foodNutrients || []).forEach((nutrient) => {
            let nutrientName;
            if (nutrient.nutrient && nutrient.nutrient.name && nutrient.nutrient.name in nutrientNameMap) {
                nutrientName = nutrientNameMap[nutrient.nutrient.name];
            }
            if (!nutrientName && nutrient.nutrient && nutrient.nutrient.id && nutrient.nutrient.id in nutrientIdMap) {
                nutrientName = nutrientIdMap[nutrient.nutrient.id];
            }
            if (nutrientName && nutrient.amount !== undefined) {
                nutritionData[nutrientName] = nutrient.amount;
            }
        });
        return nutritionData;
    }
};
exports.UsdaApiService = UsdaApiService;
exports.UsdaApiService = UsdaApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        env_service_1.EnvService])
], UsdaApiService);
//# sourceMappingURL=usda-api.service.js.map
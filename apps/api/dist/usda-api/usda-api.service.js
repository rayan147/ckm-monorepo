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
            gluten: [
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
                'bran',
                'germ',
                'wheat germ',
                'oat',
                'oats',
                'oatmeal',
                'hydrolyzed wheat protein',
                'modified food starch',
                'maltodextrin',
            ],
            dairy: [
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
                'mixed nuts',
                'trail mix',
                'nut butter',
                'nut milk',
                'coconut',
                'coconut milk',
                'coconut water',
                'coconut cream',
                'coconut oil',
                'coconut flour',
            ],
            eggs: [
                'egg',
                'eggs',
                'yolk',
                'white',
                'albumin',
                'meringue',
                'mayonnaise',
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
                'doenjang',
                'doubanjiang',
                'gochujang',
                'cheonggukjang',
                'teriyaki',
                'shoyu',
                'hoisin',
                'oyster sauce',
                'seitan',
                'mock meat',
                'vegetarian meat',
                'plant-based meat',
                'hydrolyzed vegetable protein',
                'vegetable broth',
                'vegetable starch',
                'vegetable protein',
                'lecithin',
                'emulsifier',
            ],
            fish: [
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
                'canned tuna',
                'canned salmon',
                'canned sardines',
                'canned anchovies',
            ],
            shellfish: [
                'shellfish',
                'shrimp',
                'prawn',
                'crab',
                'lobster',
                'crayfish',
                'crawfish',
                'langoustine',
                'krill',
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
                'sesame',
                'tahini',
                'sesame oil',
                'sesame seed',
                'sesame paste',
                'sesame flour',
                'sesame butter',
                'goma',
                'benne seed',
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
            containsSesame: false,
        };
        if (!foodData)
            return allergens;
        const description = foodData.description || '';
        const ingredients = foodData.ingredients || '';
        console.log(`description is ${description} and ingredients is ${ingredients}`);
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
                dataType: 'Foundation,SR Legacy,Survey (FNDDS),Branded,Experimental',
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
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService
                .get(url, {
                params: {
                    api_key: this.apiKey,
                    format: 'full',
                },
            })
                .pipe((0, rxjs_1.catchError)((error) => {
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
            sodium: 0,
        };
        const nutrientNameMap = {
            Energy: 'calories',
            Protein: 'protein',
            'Total lipid (fat)': 'fat',
            'Carbohydrate, by difference': 'carbohydrates',
            'Fiber, total dietary': 'fiber',
            'Sugars, total including NLEA': 'sugar',
            'Sodium, Na': 'sodium',
        };
        const nutrientIdMap = {
            1008: 'calories',
            1003: 'protein',
            1004: 'fat',
            1005: 'carbohydrates',
            1079: 'fiber',
            2000: 'sugar',
            1093: 'sodium',
        };
        (foodData.foodNutrients || []).forEach((nutrient) => {
            let nutrientName;
            if (nutrient.nutrient &&
                nutrient.nutrient.name &&
                nutrient.nutrient.name in nutrientNameMap) {
                nutrientName = nutrientNameMap[nutrient.nutrient.name];
            }
            if (!nutrientName &&
                nutrient.nutrient &&
                nutrient.nutrient.id &&
                nutrient.nutrient.id in nutrientIdMap) {
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
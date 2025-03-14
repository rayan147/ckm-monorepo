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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutritionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const usda_api_service_1 = require("../usda-api/usda-api.service");
const conversionFactors_json_1 = __importDefault(require("./conversionFactors.json"));
const conversionFactors = conversionFactors_json_1.default;
let NutritionService = class NutritionService {
    constructor(prisma, usdaApiService) {
        this.prisma = prisma;
        this.usdaApiService = usdaApiService;
    }
    async calculateRecipeNutrition(recipeId) {
        const recipe = await this.prisma.recipe.findUnique({
            where: { id: recipeId },
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
                yields: true,
            },
        });
        if (!recipe) {
            throw new Error(`Recipe with ID ${recipeId} not found`);
        }
        const recipeYield = recipe.yields.length > 0
            ? recipe.yields[0].expectedYield
            : recipe.servings;
        const servingUnit = recipe.yields.length > 0
            ? recipe.yields[0].unit
            : 'servings';
        const nutritionTotals = {
            calories: 0,
            protein: 0,
            carbohydrates: 0,
            fat: 0,
            fiber: 0,
            sugar: 0,
            sodium: 0,
        };
        console.log('Recipe ingredients:', recipe.ingredients.length);
        for (const recipeIngredient of recipe.ingredients) {
            const { ingredient, quantity, unit } = recipeIngredient;
            console.log('Processing ingredient:', {
                id: ingredient.id,
                name: ingredient.name,
                quantity,
                unit,
                hasNutrition: Boolean(ingredient.calories),
                usdaId: ingredient.usdaFoodId
            });
            if (!ingredient.calories) {
                await this.updateIngredientNutrition(ingredient.id);
                const updatedIngredient = await this.prisma.ingredient.findUnique({
                    where: { id: ingredient.id },
                });
                if (updatedIngredient) {
                    Object.assign(ingredient, updatedIngredient);
                }
            }
            const quantityInBaseUnit = await this.convertToBaseUnit(quantity, unit, ingredient.id);
            console.log('Converted quantity:', quantityInBaseUnit);
            nutritionTotals.calories += (ingredient.calories || 0) * quantityInBaseUnit / 100;
            nutritionTotals.protein += (ingredient.protein || 0) * quantityInBaseUnit / 100;
            nutritionTotals.carbohydrates += (ingredient.carbohydrates || 0) * quantityInBaseUnit / 100;
            nutritionTotals.fat += (ingredient.fat || 0) * quantityInBaseUnit / 100;
            nutritionTotals.fiber += (ingredient.fiber || 0) * quantityInBaseUnit / 100;
            nutritionTotals.sugar += (ingredient.sugar || 0) * quantityInBaseUnit / 100;
            nutritionTotals.sodium += (ingredient.sodium || 0) * quantityInBaseUnit / 100;
            console.log('Contribution to totals:', {
                calories: (ingredient.calories || 0) * quantityInBaseUnit / 100,
                protein: (ingredient.protein || 0) * quantityInBaseUnit / 100,
            });
        }
        console.log('Final nutrition totals:', nutritionTotals);
        const perServingValues = Object.keys(nutritionTotals).reduce((result, key) => {
            const nutritionKey = key;
            result[nutritionKey] = recipeYield > 0
                ? nutritionTotals[nutritionKey] / recipeYield
                : nutritionTotals[nutritionKey];
            return result;
        }, {});
        const perServingNutrition = Object.assign({ servingSize: recipeYield > 0 ? (1 / recipeYield) : 1, servingUnit }, perServingValues);
        const recipeNutrition = await this.prisma.recipeNutrition.upsert({
            where: { recipeId },
            update: perServingNutrition,
            create: Object.assign({ recipeId }, perServingNutrition),
        });
        return recipeNutrition;
    }
    async updateIngredientNutrition(ingredientId) {
        var _a;
        const ingredient = await this.prisma.ingredient.findUnique({
            where: { id: ingredientId },
        });
        console.log('Current ingredient data:', ingredient);
        if (!ingredient) {
            throw new Error(`Ingredient with ID ${ingredientId} not found`);
        }
        let nutritionData;
        if (ingredient.usdaFoodId) {
            nutritionData = await this.usdaApiService.getFoodNutrition(ingredient.usdaFoodId);
        }
        else {
            const searchName = ingredient.name
                .toLowerCase()
                .replace(/fresh|raw|frozen|cooked|dried|sliced|chopped|diced/g, '')
                .trim();
            const searchResults = await this.usdaApiService.searchFoods(searchName);
            console.log(`USDA search for "${ingredient.name}":`, ((_a = searchResults === null || searchResults === void 0 ? void 0 : searchResults.foods) === null || _a === void 0 ? void 0 : _a.length) || 0, 'results');
            if (searchResults.foods && searchResults.foods.length > 0) {
                const topMatch = searchResults.foods[0];
                nutritionData = await this.usdaApiService.getFoodNutrition(topMatch.fdcId);
                await this.prisma.ingredient.update({
                    where: { id: ingredientId },
                    data: {
                        usdaFoodId: topMatch.fdcId.toString(),
                        nutritionSource: 'USDA',
                    },
                });
            }
        }
        if (nutritionData) {
            const updatedIngredient = await this.prisma.ingredient.update({
                where: { id: ingredientId },
                data: {
                    calories: this.extractNutrientValue(nutritionData, 'Energy'),
                    protein: this.extractNutrientValue(nutritionData, 'Protein'),
                    carbohydrates: this.extractNutrientValue(nutritionData, 'Carbohydrate, by difference'),
                    fat: this.extractNutrientValue(nutritionData, 'Total lipid (fat)'),
                    fiber: this.extractNutrientValue(nutritionData, 'Fiber, total dietary'),
                    sugar: this.extractNutrientValue(nutritionData, 'Sugars, total including NLEA'),
                    sodium: this.extractNutrientValue(nutritionData, 'Sodium, Na'),
                    nutritionUpdatedAt: new Date(),
                },
            });
            console.log('Updated ingredient nutrition:', updatedIngredient);
            return updatedIngredient;
        }
        return ingredient;
    }
    extractNutrientValue(nutritionData, nutrientName) {
        if (!nutritionData || !nutritionData.foodNutrients)
            return null;
        const nutrient = nutritionData.foodNutrients.find((n) => n.nutrient && n.nutrient.name === nutrientName);
        return nutrient ? nutrient.amount : null;
    }
    async convertToBaseUnit(quantity, unit, ingredientId) {
        const normalizedUnit = unit.toLowerCase().trim();
        const ingredient = await this.prisma.ingredient.findUnique({
            where: { id: ingredientId },
            select: { density: true },
        });
        const category = this.determineUnitCategory(normalizedUnit);
        if (!category) {
            console.warn(`Unknown unit type: ${normalizedUnit}, using direct conversion fallback`);
            return this.directConversionFallback(quantity, normalizedUnit);
        }
        const baseUnit = category === 'weight' ? 'gram' : 'milliliter';
        let convertedValue;
        try {
            convertedValue = this.convertWithinCategory(quantity, normalizedUnit, baseUnit, category);
            console.log(`Converted ${quantity} ${normalizedUnit} to ${convertedValue} ${baseUnit}`);
        }
        catch (error) {
            console.warn(`Conversion error: ${error.message}, using direct conversion fallback`);
            convertedValue = this.directConversionFallback(quantity, normalizedUnit);
        }
        if (category === 'volume' && (ingredient === null || ingredient === void 0 ? void 0 : ingredient.density)) {
            convertedValue *= ingredient.density;
            console.log(`Applied density factor (${ingredient.density}): ${convertedValue} grams`);
        }
        return convertedValue;
    }
    determineUnitCategory(unit) {
        if (unit in conversionFactors.weight ||
            Object.values(conversionFactors.weight).some(conversions => unit in conversions)) {
            return 'weight';
        }
        if (unit in conversionFactors.volume ||
            Object.values(conversionFactors.volume).some(conversions => unit in conversions)) {
            return 'volume';
        }
        return null;
    }
    convertWithinCategory(value, fromUnit, toUnit, category) {
        var _a, _b, _c, _d, _e, _f;
        if (fromUnit === toUnit)
            return value;
        const conversions = conversionFactors[category];
        if (conversions[fromUnit] && conversions[fromUnit][toUnit]) {
            return value * conversions[fromUnit][toUnit];
        }
        if (conversions[toUnit] && conversions[toUnit][fromUnit]) {
            return value / conversions[toUnit][fromUnit];
        }
        const units = Object.keys(conversions);
        for (const intermediateUnit of units) {
            if (intermediateUnit !== fromUnit &&
                intermediateUnit !== toUnit &&
                (((_a = conversions[fromUnit]) === null || _a === void 0 ? void 0 : _a[intermediateUnit]) || ((_b = conversions[intermediateUnit]) === null || _b === void 0 ? void 0 : _b[fromUnit])) &&
                (((_c = conversions[toUnit]) === null || _c === void 0 ? void 0 : _c[intermediateUnit]) || ((_d = conversions[intermediateUnit]) === null || _d === void 0 ? void 0 : _d[toUnit]))) {
                let intermediate = 0;
                if ((_e = conversions[fromUnit]) === null || _e === void 0 ? void 0 : _e[intermediateUnit]) {
                    intermediate = value * conversions[fromUnit][intermediateUnit];
                }
                else {
                    intermediate = value / conversions[intermediateUnit][fromUnit];
                }
                if ((_f = conversions[intermediateUnit]) === null || _f === void 0 ? void 0 : _f[toUnit]) {
                    return intermediate * conversions[intermediateUnit][toUnit];
                }
                else {
                    return intermediate / conversions[toUnit][intermediateUnit];
                }
            }
        }
        throw new Error(`No conversion path found between ${fromUnit} and ${toUnit} in ${category}`);
    }
    directConversionFallback(quantity, unit) {
        const directConversions = {
            'kg': 1000,
            'kilogram': 1000,
            'g': 1,
            'gram': 1,
            'mg': 0.001,
            'milligram': 0.001,
            'lb': 453.592,
            'pound': 453.592,
            'oz': 28.3495,
            'ounce': 28.3495,
            'l': 1000,
            'liter': 1000,
            'ml': 1,
            'milliliter': 1,
            'cup': 240,
            'tbsp': 15,
            'tablespoon': 15,
            'tsp': 5,
            'teaspoon': 5,
        };
        const factor = directConversions[unit] || 1;
        console.log(`Applied direct conversion factor for ${unit}: ${factor}`);
        return quantity * factor;
    }
};
exports.NutritionService = NutritionService;
exports.NutritionService = NutritionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        usda_api_service_1.UsdaApiService])
], NutritionService);
//# sourceMappingURL=nutrition-service.service.js.map
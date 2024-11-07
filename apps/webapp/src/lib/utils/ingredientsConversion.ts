export interface Conversion {
  fromUnit: string;
  toUnit: string;
  factor: number;
}

export const conversions: Conversion[] = [
  // Volume conversions
  { fromUnit: 'gallon', toUnit: 'quart', factor: 4 },
  { fromUnit: 'quart', toUnit: 'pint', factor: 2 },
  { fromUnit: 'pint', toUnit: 'cup', factor: 2 },
  { fromUnit: 'cup', toUnit: 'fluidOunce', factor: 8 },
  { fromUnit: 'fluidOunce', toUnit: 'tablespoon', factor: 2 },
  { fromUnit: 'tablespoon', toUnit: 'teaspoon', factor: 3 },
  { fromUnit: 'liter', toUnit: 'milliliter', factor: 1000 },
  { fromUnit: 'fluidOunce', toUnit: 'milliliter', factor: 29.5735 },
  { fromUnit: 'cup', toUnit: 'milliliter', factor: 236.588 },
  { fromUnit: 'cup', toUnit: 'liter', factor: 0.236588 },
  { fromUnit: 'teaspoon', toUnit: 'milliliter', factor: 4.92892 },
  { fromUnit: 'tablespoon', toUnit: 'milliliter', factor: 14.7868 },
  { fromUnit: 'gallon', toUnit: 'fluidOunce', factor: 128 },
  { fromUnit: 'quart', toUnit: 'fluidOunce', factor: 32 },
  { fromUnit: 'pint', toUnit: 'fluidOunce', factor: 16 },
  { fromUnit: 'cup', toUnit: 'tablespoon', factor: 16 },
  { fromUnit: 'fluidOunce', toUnit: 'cup', factor: 0.125 },

  // Weight conversions
  { fromUnit: 'kilogram', toUnit: 'gram', factor: 1000 },
  { fromUnit: 'gram', toUnit: 'milligram', factor: 1000 },
  { fromUnit: 'milligram', toUnit: 'gram', factor: 0.001 },
  { fromUnit: 'pound', toUnit: 'ounce', factor: 16 },
  { fromUnit: 'pound', toUnit: 'gram', factor: 453.592 },
  { fromUnit: 'pound', toUnit: 'kilogram', factor: 0.453592 },
  { fromUnit: 'pound', toUnit: 'milligram', factor: 453592 },
  { fromUnit: 'ounce', toUnit: 'gram', factor: 28.3495 },
  { fromUnit: 'ounce', toUnit: 'milligram', factor: 28349.5 },
  { fromUnit: 'gram', toUnit: 'ounce', factor: 0.035274 },
  { fromUnit: 'kilogram', toUnit: 'pound', factor: 2.20462 },

  // Ingredient-specific conversions to weight
  // All-Purpose Flour
  { fromUnit: 'cupFlour', toUnit: 'gram', factor: 125 },
  { fromUnit: 'tablespoonFlour', toUnit: 'gram', factor: 7.8125 },
  // Granulated Sugar
  { fromUnit: 'cupSugar', toUnit: 'gram', factor: 200 },
  { fromUnit: 'tablespoonSugar', toUnit: 'gram', factor: 12.5 },
  // Brown Sugar (packed)
  { fromUnit: 'cupBrownSugar', toUnit: 'gram', factor: 220 },
  { fromUnit: 'tablespoonBrownSugar', toUnit: 'gram', factor: 13.75 },
  // Powdered Sugar (Confectioners' Sugar)
  { fromUnit: 'cupPowderedSugar', toUnit: 'gram', factor: 120 },
  { fromUnit: 'tablespoonPowderedSugar', toUnit: 'gram', factor: 7.5 },
  // Butter
  { fromUnit: 'cupButter', toUnit: 'gram', factor: 227 },
  { fromUnit: 'tablespoonButter', toUnit: 'gram', factor: 14.1875 },
  // Honey
  { fromUnit: 'cupHoney', toUnit: 'gram', factor: 340 },
  { fromUnit: 'tablespoonHoney', toUnit: 'gram', factor: 21.25 },
  // Milk
  { fromUnit: 'cupMilk', toUnit: 'gram', factor: 244 },
  { fromUnit: 'tablespoonMilk', toUnit: 'gram', factor: 15.25 },
  // Water
  { fromUnit: 'cupWater', toUnit: 'gram', factor: 240 },
  { fromUnit: 'tablespoonWater', toUnit: 'gram', factor: 15 },
  // Vegetable Oil
  { fromUnit: 'cupOil', toUnit: 'gram', factor: 218 },
  { fromUnit: 'tablespoonOil', toUnit: 'gram', factor: 13.625 },
  // Salt
  { fromUnit: 'teaspoonSalt', toUnit: 'gram', factor: 6 },
  { fromUnit: 'tablespoonSalt', toUnit: 'gram', factor: 18 },
  // Baking Powder
  { fromUnit: 'teaspoonBakingPowder', toUnit: 'gram', factor: 4 },
  // Baking Soda
  { fromUnit: 'teaspoonBakingSoda', toUnit: 'gram', factor: 4.6 },
  // Cocoa Powder
  { fromUnit: 'cupCocoaPowder', toUnit: 'gram', factor: 85 },
  { fromUnit: 'tablespoonCocoaPowder', toUnit: 'gram', factor: 5.3125 },
  // Rolled Oats
  { fromUnit: 'cupOats', toUnit: 'gram', factor: 90 },
  // Rice (uncooked)
  { fromUnit: 'cupRice', toUnit: 'gram', factor: 190 },
  // Almonds (sliced)
  { fromUnit: 'cupAlmonds', toUnit: 'gram', factor: 92 },
  // Peanut Butter
  { fromUnit: 'cupPeanutButter', toUnit: 'gram', factor: 270 },
  { fromUnit: 'tablespoonPeanutButter', toUnit: 'gram', factor: 16.875 },
  // Yogurt
  { fromUnit: 'cupYogurt', toUnit: 'gram', factor: 245 },
  // Cream Cheese
  { fromUnit: 'cupCreamCheese', toUnit: 'gram', factor: 225 },
  // Corn Syrup
  { fromUnit: 'cupCornSyrup', toUnit: 'gram', factor: 328 },
  // Maple Syrup
  { fromUnit: 'cupMapleSyrup', toUnit: 'gram', factor: 322 },
  // Margarine
  { fromUnit: 'cupMargarine', toUnit: 'gram', factor: 230 },
  // Heavy Cream
  { fromUnit: 'cupHeavyCream', toUnit: 'gram', factor: 238 },
  // Sour Cream
  { fromUnit: 'cupSourCream', toUnit: 'gram', factor: 230 },
  // Egg
  { fromUnit: 'egg', toUnit: 'gram', factor: 50 }, // Average weight of a large egg
  // Stick of Butter
  { fromUnit: 'stickButter', toUnit: 'gram', factor: 113.4 },
  { fromUnit: 'stickButter', toUnit: 'cup', factor: 0.5 },

  // Less common but useful conversions
  { fromUnit: 'gallon', toUnit: 'liter', factor: 3.78541 },
  { fromUnit: 'quart', toUnit: 'liter', factor: 0.946353 },
  { fromUnit: 'pint', toUnit: 'milliliter', factor: 473.176 },
  { fromUnit: 'liter', toUnit: 'quart', factor: 1.05669 },
  { fromUnit: 'milliliter', toUnit: 'fluidOunce', factor: 0.033814 },

  // Metric to Imperial conversions
  { fromUnit: 'liter', toUnit: 'deciliter', factor: 10 },
  { fromUnit: 'liter', toUnit: 'centiliter', factor: 100 },
  { fromUnit: 'liter', toUnit: 'milliliter', factor: 1000 },

  // International units (Imperial measurements)
  { fromUnit: 'imperialPint', toUnit: 'milliliter', factor: 568.261 },
  { fromUnit: 'imperialGallon', toUnit: 'liter', factor: 4.54609 },
];

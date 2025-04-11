// File: $lib/utils/unitConversion.ts
import { conversions, type Conversion } from '$lib/utils/ingredientsConversion';

type ConversionGraph = Map<string, Map<string, number>>;

// Build the conversion graph
const graph = buildConversionGraph(conversions);

// Function to build the conversion graph
function buildConversionGraph(conversions: Conversion[]): ConversionGraph {
  const graph: ConversionGraph = new Map();
  conversions.forEach(({ fromUnit, toUnit, factor }) => {
    if (!graph.has(fromUnit)) graph.set(fromUnit, new Map());
    if (!graph.has(toUnit)) graph.set(toUnit, new Map());
    graph.get(fromUnit)!.set(toUnit, factor);
    graph.get(toUnit)!.set(fromUnit, 1 / factor);
  });
  return graph;
}

// Function to find conversion factor between units
function findConversionFactor(
  graph: ConversionGraph,
  startUnit: string,
  endUnit: string
): number | null {
  if (startUnit === endUnit) return 1;

  const visited = new Set<string>();
  const queue: Array<{ unit: string; factor: number }> = [{ unit: startUnit, factor: 1 }];

  while (queue.length > 0) {
    const { unit, factor } = queue.shift()!;
    if (unit === endUnit) return factor;

    visited.add(unit);
    const neighbors = graph.get(unit);
    if (neighbors) {
      for (const [neighborUnit, neighborFactor] of neighbors.entries()) {
        if (!visited.has(neighborUnit)) {
          queue.push({
            unit: neighborUnit,
            factor: factor * neighborFactor
          });
        }
      }
    }
  }

  return null; // Conversion path not found
}

// Functions to determine unit categories
export function isVolumeUnit(unit: string): boolean {
  const volumeUnits = new Set([
    'gallon',
    'quart',
    'pint',
    'cup',
    'fluidOunce',
    'tablespoon',
    'teaspoon',
    'milliliter',
    'liter',
    'cubicMeter',
    'cubicFoot',
    'cubicInch',
    // Include ingredient-specific volume units
    'cupFlour',
    'cupSugar',
    'cupBrownSugar',
    'cupPowderedSugar',
    'cupButter',
    'cupHoney',
    'cupMilk',
    'cupWater',
    'cupOil',
    'tablespoonFlour',
    'tablespoonSugar',
    'tablespoonBrownSugar',
    'tablespoonButter',
    'tablespoonHoney',
    'tablespoonMilk',
    'tablespoonWater',
    'tablespoonOil',
    'tablespoonSalt',
    'teaspoonSalt',
    'teaspoonBakingPowder',
    'teaspoonBakingSoda'
  ]);
  return volumeUnits.has(unit);
}

export function isWeightUnit(unit: string): boolean {
  const weightUnits = new Set([
    'ton',
    'kilogram',
    'gram',
    'milligram',
    'metricTon',
    'pound',
    'ounce',
    'stone'
  ]);
  return weightUnits.has(unit);
}

// Main conversion function
export function convertUnits(
  value: number,
  fromUnit: string,
  toUnit: string,
  density?: number // e.g., grams per milliliter
): number {
  // Check for direct conversion first
  const factor = findConversionFactor(graph, fromUnit, toUnit);
  if (factor !== null) {
    return value * factor;
  }

  // Check if we need a volume-to-weight conversion
  const fromIsVolume = isVolumeUnit(fromUnit);
  const toIsVolume = isVolumeUnit(toUnit);

  if (density !== undefined) {
    // Handle volume to weight conversion
    if (fromIsVolume && !toIsVolume) {
      // First convert to milliliters
      const volumeInMl = convertUnits(value, fromUnit, 'milliliter');
      // Then convert to grams using density
      const weightInGrams = volumeInMl * density;
      // Finally convert to target weight unit
      return convertUnits(weightInGrams, 'gram', toUnit);
    }
    // Handle weight to volume conversion
    else if (!fromIsVolume && toIsVolume) {
      // First convert to grams
      const weightInGrams = convertUnits(value, fromUnit, 'gram');
      // Then convert to milliliters using density
      const volumeInMl = weightInGrams / density;
      // Finally convert to target volume unit
      return convertUnits(volumeInMl, 'milliliter', toUnit);
    }
  }

  throw new Error('Conversion not possible without density');
}

// Helper function to format quantities
export function formatQuantity(value: number, precision: number = 2): string {
  if (Number.isInteger(value)) {
    return value.toString();
  }
  return value.toFixed(precision);
}

// Helper function to try ingredient-specific conversion if standard fails
export function tryIngredientSpecificConversion(
  value: number,
  ingredient: string,
  fromUnit: string,
  toUnit: string
): number | null {
  // Map ingredient to specific conversion units
  let specificFromUnit = fromUnit;

  if (fromUnit === 'cup') {
    if (ingredient.includes('flour')) {
      specificFromUnit = 'cupFlour';
    } else if (ingredient.includes('sugar')) {
      if (ingredient.includes('brown')) {
        specificFromUnit = 'cupBrownSugar';
      } else if (ingredient.includes('powder')) {
        specificFromUnit = 'cupPowderedSugar';
      } else {
        specificFromUnit = 'cupSugar';
      }
    } else if (ingredient.includes('butter')) {
      specificFromUnit = 'cupButter';
    }
  }

  // Try the conversion with specific unit
  if (specificFromUnit !== fromUnit) {
    const factor = findConversionFactor(graph, specificFromUnit, toUnit);
    if (factor !== null) {
      return value * factor;
    }
  }

  return null;
}

// Example usage
/*
try {
  const densityOliveOil = 0.91; // grams per milliliter
  const pounds = convertUnits(1, 'liter', 'pound', densityOliveOil);
  console.log(`1 liter of olive oil is approximately ${pounds.toFixed(2)} pounds`);
} catch (error) {
  console.error('Conversion error:', (error as Error).message);
}
*/

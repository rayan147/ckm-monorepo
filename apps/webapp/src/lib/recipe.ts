import { conversions, typ Conversion } from "./utils/ingredientsConversion";

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
  const queue: Array<{ unit: string; factor: number }> = [
    { unit: startUnit, factor: 1 },
  ];

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
            factor: factor * neighborFactor,
          });
        }
      }
    }
  }

  return null; // Conversion path not found
}

// Functions to determine unit categories
function isVolumeUnit(unit: string): boolean {
  const volumeUnits = new Set([
    'gallon', 'quart', 'pint', 'cup', 'fluidOunce',
    'tablespoon', 'teaspoon', 'milliliter', 'liter',
    'cubicMeter', 'cubicFoot', 'cubicInch',
  ]);
  return volumeUnits.has(unit);
}

function isWeightUnit(unit: string): boolean {
  const weightUnits = new Set([
    'ton', 'kilogram', 'gram', 'milligram',
    'metricTon', 'pound', 'ounce', 'stone',
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
  const factor = findConversionFactor(graph, fromUnit, toUnit);

  if (factor !== null) {
    return value * factor;
  }

  const fromIsVolume = isVolumeUnit(fromUnit);
  const toIsVolume = isVolumeUnit(toUnit);

  if (density !== undefined) {
    if (fromIsVolume && !toIsVolume) {
      // Volume to weight conversion
      const volumeInMl = convertUnits(value, fromUnit, 'milliliter');
      const weightInGrams = volumeInMl * density;
      return convertUnits(weightInGrams, 'gram', toUnit);
    } else if (!fromIsVolume && toIsVolume) {
      // Weight to volume conversion
      const weightInGrams = convertUnits(value, fromUnit, 'gram');
      const volumeInMl = weightInGrams / density;
      return convertUnits(volumeInMl, 'milliliter', toUnit);
    }
  }

  throw new Error('Conversion not possible without density');
}

// Example usage
try {
  const densityOliveOil = 0.91; // grams per milliliter
  const pounds = convertUnits(1, 'liter', 'pound', densityOliveOil);
  console.log(`1 liter of olive oil is approximately ${pounds.toFixed(2)} pounds`);
} catch (error) {
  console.error('Conversion error:', (error as Error).message);
}


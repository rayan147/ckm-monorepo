// File: convertUnitsHelper.ts

import { conversions, type Conversion } from './ingredientsConversion';

type ConversionGraph = Map<string, Map<string, number>>;

// Function to build the conversion graph
function buildConversion(
  conversions: Conversion[],
  customConversions?: Conversion[]
): ConversionGraph {
  const graph: ConversionGraph = new Map();

  // Add standard conversions
  conversions.forEach(({ fromUnit, toUnit, factor }) => {
    if (!graph.has(fromUnit)) graph.set(fromUnit, new Map());
    if (!graph.has(toUnit)) graph.set(toUnit, new Map());

    graph.get(fromUnit)!.set(toUnit, factor);
    graph.get(toUnit)!.set(fromUnit, 1 / factor);
  });

  // Add custom conversions
  if (customConversions) {
    customConversions.forEach(({ fromUnit, toUnit, factor }) => {
      // Remove existing edges between these units
      graph.get(fromUnit)?.delete(toUnit);
      graph.get(toUnit)?.delete(fromUnit);

      // Ensure the units are in the graph
      if (!graph.has(fromUnit)) graph.set(fromUnit, new Map());
      if (!graph.has(toUnit)) graph.set(toUnit, new Map());

      // Add the custom conversion
      graph.get(fromUnit)!.set(toUnit, factor);
      graph.get(toUnit)!.set(fromUnit, 1 / factor);
    });
  }

  return graph;
}

// Function to find conversion factor between units using Dijkstra's algorithm
function findConversionFactor(
  graph: ConversionGraph,
  startUnit: string,
  endUnit: string,
  customConversions?: Conversion[]
): number | null {
  if (startUnit === endUnit) return 1;

  // Priority queue for Dijkstra's algorithm
  const queue: Array<{ unit: string; factor: number; cost: number }> = [
    { unit: startUnit, factor: 1, cost: 0 }
  ];
  const visited = new Map<string, number>();

  while (queue.length > 0) {
    // Sort the queue based on cumulative cost (lowest cost first)
    queue.sort((a, b) => a.cost - b.cost);
    const { unit, factor, cost } = queue.shift()!;

    // Skip if we've already found a cheaper path to this unit
    if (visited.has(unit) && visited.get(unit)! <= cost) continue;
    visited.set(unit, cost);

    if (unit === endUnit) return factor;

    const neighbors = graph.get(unit);
    if (neighbors) {
      for (const [neighborUnit, neighborFactor] of neighbors.entries()) {
        // Determine the cost of the edge
        const edgeIsCustom =
          customConversions?.some(
            (conv) =>
              (conv.fromUnit === unit && conv.toUnit === neighborUnit) ||
              (conv.fromUnit === neighborUnit && conv.toUnit === unit)
          ) ?? false;

        const edgeCost = edgeIsCustom ? 1 : 2; // Lower cost for custom conversions

        queue.push({
          unit: neighborUnit,
          factor: factor * neighborFactor,
          cost: cost + edgeCost
        });
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
    'cubicInch'
    // Include ingredient-specific volume units if necessary
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
    // Include ingredient-specific weight units if necessary
  ]);
  return weightUnits.has(unit);
}

// Main conversion function
export default function convertUnitsHelper(
  value: number,
  fromUnit: string,
  toUnit: string,
  density?: number,
  customConversions?: Conversion[]
): number {
  // Build the graph including custom conversions
  const graph = buildConversion(conversions, customConversions);

  const factor = findConversionFactor(graph, fromUnit, toUnit, customConversions);

  if (factor !== null) {
    return value * factor;
  }

  const fromIsVolume = isVolumeUnit(fromUnit);
  const toIsVolume = isVolumeUnit(toUnit);

  if (density !== undefined) {
    if (fromIsVolume && !toIsVolume) {
      // Volume to weight conversion
      const volumeInMl = convertUnitsHelper(
        value,
        fromUnit,
        'milliliter',
        undefined,
        customConversions
      );
      const weightInGrams = volumeInMl * density;
      return convertUnitsHelper(weightInGrams, 'gram', toUnit, undefined, customConversions);
    } else if (!fromIsVolume && toIsVolume) {
      // Weight to volume conversion
      const weightInGrams = convertUnitsHelper(
        value,
        fromUnit,
        'gram',
        undefined,
        customConversions
      );
      const volumeInMl = weightInGrams / density;
      return convertUnitsHelper(volumeInMl, 'milliliter', toUnit, undefined, customConversions);
    }
  }

  throw new Error('Conversion not possible without density');
}

// Example usage with corrected custom conversion
try {
  // Custom conversion based on known equivalence
  const customConversions: Conversion[] = [{ fromUnit: 'cupFlour', toUnit: 'ounce', factor: 4.6 }];

  const pounds = convertUnitsHelper(
    0.75, // value
    'cupFlour', // fromUnit
    'pound', // toUnit
    undefined, // density (not needed here)
    customConversions // customConversions
  );

  console.log(`0.75 cup of flour is approximately ${pounds.toFixed(6)} pounds`);
} catch (error) {
  console.error('Conversion error:', (error as Error).message);
}

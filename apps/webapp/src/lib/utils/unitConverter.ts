// Type definitions for our conversion factors
type UnitConversion = {
	[unit: string]: number;
};

type CategoryConversion = {
	[unit: string]: UnitConversion;
};

type ConversionFactors = {
	volume: CategoryConversion;
	weight: CategoryConversion;
};

// Import conversion factors
import conversionFactorsImport from './conversionFactors.json';
const conversionFactors: ConversionFactors = conversionFactorsImport;

interface ConversionStep {
	step: number;
	explanation: string;
	intermediateValue: number;
}

function convertUnits(
	startValue: number,
	startUnit: string,
	endUnit: string
): { result: number; steps: ConversionStep[] } {
	let currentValue = startValue;
	const steps: ConversionStep[] = [];

	steps.push({
		step: 1,
		explanation: `Starting with ${startValue} ${startUnit}.`,
		intermediateValue: currentValue
	});

	// Determine the category (volume or weight)
	const startCategory = Object.keys(conversionFactors).find(
		(cat) => startUnit in conversionFactors[cat as keyof ConversionFactors]
	) as keyof ConversionFactors | undefined;

	const endCategory = Object.keys(conversionFactors).find(
		(cat) => endUnit in conversionFactors[cat as keyof ConversionFactors]
	) as keyof ConversionFactors | undefined;

	if (!startCategory || !endCategory) {
		throw new Error('Unsupported units for conversion');
	}

	// Function to convert between two units within the same category
	function convertSameCategory(
		value: number,
		fromUnit: string,
		toUnit: string,
		category: keyof ConversionFactors
	): number {
		if (fromUnit === toUnit) return value;
		const conversions = conversionFactors[category];
		if (conversions[fromUnit] && conversions[fromUnit][toUnit]) {
			return value * conversions[fromUnit][toUnit];
		}
		if (conversions[toUnit] && conversions[toUnit][fromUnit]) {
			return value / conversions[toUnit][fromUnit];
		}
		throw new Error(`No conversion found between ${fromUnit} and ${toUnit} in ${category}`);
	}

	// Handle conversion within the same category
	if (startCategory === endCategory) {
		try {
			currentValue = convertSameCategory(currentValue, startUnit, endUnit, startCategory);
			steps.push({
				step: 2,
				explanation: `Converted directly from ${startUnit} to ${endUnit} in ${startCategory} category.`,
				intermediateValue: currentValue
			});
		} catch (error) {
			// If direct conversion is not possible, try intermediate conversions
			const units = Object.keys(conversionFactors[startCategory]);
			const intermediateUnit = units.find(
				(unit) =>
					unit !== startUnit &&
					unit !== endUnit &&
					(conversionFactors[startCategory][startUnit]?.[unit] ||
						conversionFactors[startCategory][unit]?.[startUnit]) &&
					(conversionFactors[startCategory][endUnit]?.[unit] ||
						conversionFactors[startCategory][unit]?.[endUnit])
			);

			if (intermediateUnit) {
				currentValue = convertSameCategory(
					currentValue,
					startUnit,
					intermediateUnit,
					startCategory
				);
				steps.push({
					step: steps.length + 1,
					explanation: `Converted from ${startUnit} to ${intermediateUnit} in ${startCategory} category.`,
					intermediateValue: currentValue
				});

				currentValue = convertSameCategory(currentValue, intermediateUnit, endUnit, startCategory);
				steps.push({
					step: steps.length + 1,
					explanation: `Converted from ${intermediateUnit} to ${endUnit} in ${startCategory} category.`,
					intermediateValue: currentValue
				});
			} else {
				throw new Error(
					`Unable to convert between ${startUnit} and ${endUnit} in ${startCategory} category`
				);
			}
		}
	} else {
		// Handle conversion between different categories (volume to weight or vice versa)
		throw new Error(
			'Conversion between volume and weight is not supported without knowing the substance density'
		);
	}

	steps.push({
		step: steps.length + 1,
		explanation: `Final result: ${currentValue} ${endUnit}.`,
		intermediateValue: currentValue
	});

	return {
		result: currentValue,
		steps
	};
}

// Example usage
try {
	const result = convertUnits(2, 'gallon', 'liter');
	console.log('Final Result:', result.result);
	console.log('Steps Explanation:');
	result.steps.forEach((step) => {
		console.log(`Step ${step.step}: ${step.explanation}`);
	});
} catch (error) {
	console.error('Conversion error:', error.message);
}

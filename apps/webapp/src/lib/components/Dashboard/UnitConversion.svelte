<script lang="ts">
	import { onMount } from 'svelte';
	import { z } from 'zod';
	import conversionFactorsImport from './conversionFactors.json';

	// Define Zod schemas
	const UnitConversionSchema = z.record(z.number());

	const CategoryConversionSchema = z.record(UnitConversionSchema);

	const ConversionFactorsSchema = z.object({
		volume: CategoryConversionSchema,
		weight: CategoryConversionSchema
	});

	const ConversionStepSchema = z.object({
		step: z.number(),
		explanation: z.string(),
		intermediateValue: z.number()
	});

	// Parse and validate conversion factors
	const conversionFactors = ConversionFactorsSchema.parse(conversionFactorsImport);

	// Infer types from Zod schemas
	type ConversionFactors = z.infer<typeof ConversionFactorsSchema>;
	type ConversionStep = z.infer<typeof ConversionStepSchema>;

	let startValue: number = $state(1);
	let startUnit: string = '';
	let endUnit: string = $state('');
	let result: number | null = $state(null);
	let steps: ConversionStep[] = $state([]);

	// Extract all unique units from conversionFactors
	const allUnits = [
		...new Set(Object.values(conversionFactors).flatMap((category) => Object.keys(category)))
	].sort();

	let startUnitSearch = $state('');
	let endUnitSearch = $state('');
	let startUnitFocused = $state(false);
	let endUnitFocused = $state(false);

	let filteredStartUnits = $derived(allUnits.filter((unit) =>
		unit.toLowerCase().includes(startUnitSearch.toLowerCase())
	));

	let filteredEndUnits = $derived(allUnits.filter((unit) =>
		unit.toLowerCase().includes(endUnitSearch.toLowerCase())
	));

	function convertUnits() {
		if (!startValue || !startUnit || !endUnit) {
			alert('Please fill in all fields');
			return;
		}

		try {
			const conversion = convertUnitsHelper(startValue, startUnit, endUnit);
			result = conversion.result;
			steps = conversion.steps;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			} else {
				alert('An unknown error occurred');
			}
		}
	}

	function handleStartUnitSelect(unit: string) {
		startUnit = unit;
		startUnitSearch = unit;
		startUnitFocused = false;
	}

	function handleEndUnitSelect(unit: string) {
		endUnit = unit;
		endUnitSearch = unit;
		endUnitFocused = false;
	}

	function convertUnitsHelper(
		startValue: number,
		startUnit: string,
		endUnit: string
	): { result: number; steps: ConversionStep[] } {
		let currentValue = startValue;
		const steps: ConversionStep[] = [];

		steps.push(
			ConversionStepSchema.parse({
				step: 1,
				explanation: `Starting with ${startValue} ${startUnit}.`,
				intermediateValue: currentValue
			})
		);

		// Determine the category (volume or weight)
		const startCategory = (Object.keys(conversionFactors) as Array<keyof ConversionFactors>).find(
			(cat) => startUnit in conversionFactors[cat]
		);

		const endCategory = (Object.keys(conversionFactors) as Array<keyof ConversionFactors>).find(
			(cat) => endUnit in conversionFactors[cat]
		);

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
			if (fromUnit in conversions && toUnit in conversions[fromUnit]) {
				return value * conversions[fromUnit][toUnit];
			}
			if (toUnit in conversions && fromUnit in conversions[toUnit]) {
				return value / conversions[toUnit][fromUnit];
			}
			throw new Error(`No conversion found between ${fromUnit} and ${toUnit} in ${category}`);
		}

		// Handle conversion within the same category
		if (startCategory === endCategory) {
			try {
				currentValue = convertSameCategory(currentValue, startUnit, endUnit, startCategory);
				steps.push(
					ConversionStepSchema.parse({
						step: 2,
						explanation: `Converted directly from ${startUnit} to ${endUnit} in ${startCategory} category.`,
						intermediateValue: currentValue
					})
				);
			} catch (error) {
				// If direct conversion is not possible, try intermediate conversions
				const units = Object.keys(conversionFactors[startCategory]);
				const intermediateUnit = units.find(
					(unit) =>
						unit !== startUnit &&
						unit !== endUnit &&
						((startUnit in conversionFactors[startCategory] &&
							unit in conversionFactors[startCategory][startUnit]) ||
							(unit in conversionFactors[startCategory] &&
								startUnit in conversionFactors[startCategory][unit])) &&
						((endUnit in conversionFactors[startCategory] &&
							unit in conversionFactors[startCategory][endUnit]) ||
							(unit in conversionFactors[startCategory] &&
								endUnit in conversionFactors[startCategory][unit]))
				);

				if (intermediateUnit) {
					currentValue = convertSameCategory(
						currentValue,
						startUnit,
						intermediateUnit,
						startCategory
					);
					steps.push(
						ConversionStepSchema.parse({
							step: steps.length + 1,
							explanation: `Converted from ${startUnit} to ${intermediateUnit} in ${String(startCategory)} category.`,
							intermediateValue: currentValue
						})
					);

					currentValue = convertSameCategory(
						currentValue,
						intermediateUnit,
						endUnit,
						startCategory
					);
					steps.push(
						ConversionStepSchema.parse({
							step: steps.length + 1,
							explanation: `Converted from ${intermediateUnit} to ${endUnit} in ${String(startCategory)} category.`,
							intermediateValue: currentValue
						})
					);
				} else {
					throw new Error(
						`Unable to convert between ${startUnit} and ${endUnit} in ${String(startCategory)} category`
					);
				}
			}
		} else {
			// Handle conversion between different categories (volume to weight or vice versa)
			throw new Error(
				'Conversion between volume and weight is not supported without knowing the substance density'
			);
		}

		steps.push(
			ConversionStepSchema.parse({
				step: steps.length + 1,
				explanation: `Final result: ${currentValue} ${endUnit}.`,
				intermediateValue: currentValue
			})
		);

		return {
			result: currentValue,
			steps
		};
	}
</script>

<div class="max-w-2xl p-6 mx-auto my-8 bg-white rounded-lg shadow-md">
	<h2 class="mb-6 text-3xl font-bold text-center text-gray-800">Unit Conversion</h2>
	<div class="grid grid-cols-1 gap-6 mb-6">
		<div>
			<label for="startValue" class="block mb-1 text-sm font-medium text-gray-700">Value</label>
			<input
				type="number"
				id="startValue"
				bind:value={startValue}
				class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
				required
			/>
		</div>
		<div class="relative">
			<label for="startUnit" class="block mb-1 text-sm font-medium text-gray-700">From Unit</label>
			<input
				type="text"
				id="startUnit"
				bind:value={startUnitSearch}
				onfocus={() => (startUnitFocused = true)}
				class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
				required
			/>
			{#if startUnitFocused && filteredStartUnits.length > 0}
				<ul
					class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
				>
					{#each filteredStartUnits as unit}
						<li>
							<button
								type="button"
								class="w-full px-3 py-2 text-left hover:bg-indigo-600 hover:text-white"
								onclick={() => handleStartUnitSelect(unit)}
								onfocus={() => (startUnitFocused = true)}
								onblur={() => (startUnitFocused = false)}
							>
								{unit}
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<div class="relative">
			<label for="endUnit" class="block mb-1 text-sm font-medium text-gray-700">To Unit</label>
			<input
				type="text"
				id="endUnit"
				bind:value={endUnitSearch}
				onfocus={() => (endUnitFocused = true)}
				class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
				required
			/>
			{#if endUnitFocused && filteredEndUnits.length > 0}
				<ul
					class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
				>
					{#each filteredEndUnits as unit}
						<li>
							<button
								type="button"
								class="w-full px-3 py-2 text-left hover:bg-indigo-600 hover:text-white"
								onclick={() => handleEndUnitSelect(unit)}
								onfocus={() => (startUnitFocused = true)}
								onblur={() => (startUnitFocused = false)}
							>
								{unit}
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
	<button
		onclick={convertUnits}
		class="w-full px-4 py-2 text-white transition duration-150 ease-in-out bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
	>
		Convert
	</button>
	{#if result !== null}
		<div class="p-4 mt-6 bg-gray-100 rounded-md">
			<h3 class="mb-2 text-xl font-semibold text-gray-800">
				Result: {result.toFixed(2)}
				{endUnit}
			</h3>
			<h4 class="mb-2 text-lg font-semibold text-gray-700">Conversion Steps:</h4>
			<ol class="space-y-1 list-decimal list-inside">
				{#each steps as step}
					<li class="text-gray-600">{step.explanation}</li>
				{/each}
			</ol>
		</div>
	{/if}
</div>

<style>
	/* Add any additional styles here if needed */
</style>

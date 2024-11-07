<!-- lib/components/FeatureGrid.svelte -->
<script lang="ts">
	interface Props {
		features: { title: string; description: string }[];
	}

	let { features }: Props = $props();
</script>

<div class="bg-gray-50">
	<div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
		<h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
			<span class="block">Comprehensive kitchen management</span>
			<span class="block text-indigo-600">powered by AI</span>
		</h2>
		<div class="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each features as feature}
				<div class="overflow-hidden bg-white rounded-lg shadow">
					<div class="px-4 py-5 sm:p-6">
						<h3 class="text-lg font-medium leading-6 text-gray-900">{feature.title}</h3>
						<p class="mt-2 text-sm text-gray-500">{feature.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

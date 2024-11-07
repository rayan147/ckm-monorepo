<!-- lib/components/FeatureSection.svelte -->
<script lang="ts">
	interface Props {
		title: string;
		description: string;
		buttonText: string;
		features: { icon: string; title: string }[];
		reversed?: boolean;
	}

	let {
		title,
		description,
		buttonText,
		features,
		reversed = false
	}: Props = $props();
</script>

<div class={reversed ? 'bg-gray-50' : 'bg-white'}>
	<div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
		<div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
			{#if reversed}
				<div class="mt-12 grid grid-cols-2 gap-0.5 md:grid-cols-2 lg:mt-0">
					{#each features as feature}
						<div class="flex justify-center col-span-1 px-8 py-8">
							<div class="text-center">
								{@html feature.icon}
								<h3 class="mt-2 text-sm font-medium text-gray-900">{feature.title}</h3>
							</div>
						</div>
					{/each}
				</div>
			{/if}
			<div class={reversed ? 'mt-8 lg:mt-0' : ''}>
				<h2 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">{title}</h2>
				<p class="mt-4 text-xl text-gray-500">{description}</p>
				<div class="mt-8">
					<a
						href="#email-form"
						class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
					>
						{buttonText}
					</a>
				</div>
			</div>
			{#if !reversed}
				<div class="mt-12 grid grid-cols-2 gap-0.5 md:grid-cols-2 lg:mt-0 lg:ml-8">
					{#each features as feature}
						<div class="flex justify-center col-span-1 px-8 py-8">
							<div class="text-center">
								{@html feature.icon}
								<h3 class="mt-2 text-sm font-medium text-gray-900">{feature.title}</h3>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

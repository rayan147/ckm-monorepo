<script>
	import { page } from '$app/stores';
	// this page is useful for docs, and as a filter
	console.log($page.params.slug);
	const slugArr = $page.params.slug.split('/');
</script>

<a href="/" class="home"> Home</a>
{#if slugArr.length === 1}
	<!-- content here -->
	<h1>Viewing docs for feature {slugArr[0]}</h1>
{:else if slugArr.length === 2}
	<!-- else content here -->
	<h1>Viewing docs for feature {slugArr[0]} and concept {slugArr[1]}</h1>
{/if}

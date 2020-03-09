<script>
	import Discover from './_components/Discover.svelte';
	import Explore from './_components/Explore.svelte';

	let viewMode = 'discover';

	function onSetViewMode(event) {
		viewMode = event.detail.viewMode;
		console.log('set view mode: ' + viewMode);
	}
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

{#if viewMode === 'discover'}
	<Discover on:setViewMode="{onSetViewMode}" />
{:else}
	<Explore on:setViewMode="{onSetViewMode}" />
{/if}
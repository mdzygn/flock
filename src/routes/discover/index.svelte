<script>
	import Discover from './_components/Discover.svelte';
	import Explore from './_components/Explore.svelte';
	import ExploreZoomed from './_components/ExploreZoomed.svelte';

	let viewMode = 'discover';
	let locationMode = 'global';
	let exploreZoomed = false;

	function setViewMode(event) {
		viewMode = event.detail.viewMode;
		console.log('set view mode: ' + viewMode);
	}

	function toggleLocationMode() {
		locationMode = (locationMode === 'global') ? 'local' : 'global';
		console.log('set location mode: ' + locationMode);
	}

	function exploreZoomIn() {
		exploreZoomed = true;
	}
	function exploreZoomOut() {
		exploreZoomed = false;
	}
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

{#if viewMode === 'discover'}
	<Discover {locationMode} on:setViewMode="{setViewMode}" on:toggleLocationMode="{toggleLocationMode}" />
{:else}
	{#if exploreZoomed}
		<ExploreZoomed on:exploreZoomOut="{exploreZoomOut}" />
	{:else}
		<Explore {locationMode} on:setViewMode="{setViewMode}" on:toggleLocationMode="{toggleLocationMode}" on:exploreZoomIn="{exploreZoomIn}" />
	{/if}
{/if}
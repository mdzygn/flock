<script>
	import Discover from './_components/Discover.svelte';
	import Explore from './_components/Explore.svelte';

	let viewMode = 'discover';
	let locationMode = 'global';

	function setViewMode(event) {
		viewMode = event.detail.viewMode;
		console.log('set view mode: ' + viewMode);
	}

	function toggleLocationMode() {
		locationMode = (locationMode === 'global') ? 'local' : 'global';
		console.log('set location mode: ' + locationMode);
	}
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

{#if viewMode === 'discover'}
	<Discover {locationMode} on:setViewMode="{setViewMode}" on:toggleLocationMode="{toggleLocationMode}" />
{:else}
	<Explore {locationMode} on:setViewMode="{setViewMode}" on:toggleLocationMode="{toggleLocationMode}" />
{/if}
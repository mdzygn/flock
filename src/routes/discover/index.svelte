<script>
	import { viewMode, locationMode, exploreZoomed } from '../../models/appModel.js';

	import Discover from './_components/Discover.svelte';
	import Explore from './_components/Explore.svelte';
	import ExploreZoomed from './_components/ExploreZoomed.svelte';

	function setViewMode(event) {
		$viewMode = event.detail.viewMode;
	}

	function toggleLocationMode() {
		$locationMode = ($locationMode === 'global') ? 'local' : 'global';
	}

	function exploreZoomIn() {
		$exploreZoomed = true;
	}
	function exploreZoomOut() {
		$exploreZoomed = false;
	}
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

{#if $viewMode === 'discover'}
	<Discover locationMode={$locationMode} on:setViewMode="{setViewMode}" on:toggleLocationMode="{toggleLocationMode}" />
{:else}
	{#if $exploreZoomed}
		<ExploreZoomed on:exploreZoomOut="{exploreZoomOut}" />
	{:else}
		<Explore locationMode={$locationMode} on:setViewMode="{setViewMode}" on:toggleLocationMode="{toggleLocationMode}" on:exploreZoomIn="{exploreZoomIn}" />
	{/if}
{/if}
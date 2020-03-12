<script>
	import Proxy from '../../../components/Proxy.svelte';
	import Hotspots from '../../../components/Hotspots.svelte';
	import Hotspot from '../../../components/Hotspot.svelte';

	import { viewMode, locationMode, exploreZoomed } from '../../../models/appState.js';

	function toggleViewMode() {
		$viewMode = ($viewMode === 'explore') ? 'discover' : 'explore';
	}

	function toggleLocationMode() {
		$locationMode = ($locationMode === 'global') ? 'local' : 'global';

		// reset zoom if zoomed in and toggling location state
		if ($exploreZoomed) {
			$exploreZoomed = false;
		}
	}

	$: proxyFilterImage = ($locationMode === 'global') ? 'explore_filter.png' : 'explore_filter_local.png';
</script>

<div class="filterBar">
	<Hotspots>
		<!-- Toggle View Mode -->
		<Hotspot onClick="{toggleViewMode}" style="
			left: 7px;
			top: 5px;
			width: 44px;
			height: 46px;" />

		<!-- Toggle Location Mode -->
		<Hotspot onClick="{toggleLocationMode}" style="
			right: 10px;
			top: 5px;
			width: 232px;
			height: 46px;" />
	</Hotspots>

	<Proxy image="{proxyFilterImage}" />
</div>

<style>
	.filterBar {
		position: absolute;
    	height: 60px;
		background-image: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.6), rgba(0,0,0,0));
	}
</style>
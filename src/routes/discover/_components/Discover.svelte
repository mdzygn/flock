<script>
	import ScrollView from '../../../components/ScrollView.svelte';

	import Proxy from '../../../components/Proxy.svelte';
	import Hotspots from '../../../components/Hotspots.svelte';
    import Hotspot from '../../../components/Hotspot.svelte';

	import Feed from './../../_components/Feed.svelte';

	import { viewMode, locationMode } from '../../../models/appState.js';
	import { loadProject } from '../../../actions/appActions.js';

	function toggleViewMode() {
		$viewMode = ($viewMode === 'explore') ? 'discover' : 'explore';
	}

	function toggleLocationMode() {
		$locationMode = ($locationMode === 'global') ? 'local' : 'global';
	}

	$: proxyContentOffset = ($locationMode === 'global') ? 0 : 3;
	$: proxyFilterImage = ($locationMode === 'global') ? 'discover_search' : 'discover_search_local';
</script>

<ScrollView id="discover">
	<div>
		<Hotspots>
			<!-- Toggle View Mode -->
			<Hotspot onClick="{toggleViewMode}" style="
				left: 7px;
				top: 5px;
				width: 38px;
				height: 39px;" />

			<!-- Toggle Location Mode -->
			<Hotspot onClick="{toggleLocationMode}}" style="
				right: 10px;
				top: 5px;
				width: 232px;
				height: 46px;" />
		</Hotspots>

		<Proxy image="{proxyFilterImage}" />
	</div>

	<!-- <Feed type="discover" linkToProjects="{true}" count="{5}" offset="{proxyContentOffset}"/> -->

	<div class="feed">
		<Proxy image="discover1" onClick="{e => loadProject('s7djj2s2')}" />
		<Proxy image="discover2" onClick="{e => loadProject('ma9l2h4h')}" />
		<Proxy image="discover3" onClick="{e => loadProject('m2lmad9a')}" />
		<Proxy image="discover4" onClick="{e => loadProject('36bsf5gs')}" />
		<Proxy image="discover5" onClick="{e => loadProject('9dm4l7ps')}" />
	</div>
</ScrollView>

<style>
	.feed {
		width: 100%;

		padding-top: 10px;

    	line-height: 0;
	}

	.feed :global(.proxy) {
		padding-bottom: 10px;
	}
</style>
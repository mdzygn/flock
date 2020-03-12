<script>
	import ScrollView from '../../../components/ScrollView.svelte';

	import Proxy from '../../../components/Proxy.svelte';
	import Hotspots from '../../../components/Hotspots.svelte';
    import Hotspot from '../../../components/Hotspot.svelte';

	import Feed from './../../_components/Feed.svelte';

	import { viewMode, locationMode } from '../../../models/appState.js';

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

	<Feed type="discover" linkToProjects="{true}" count="{5}" offset="{proxyContentOffset}"/>
</ScrollView>
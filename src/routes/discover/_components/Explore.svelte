<script>
	import { locationMode, exploreZoomed } from '../../../models/appModel';

	import Proxy from '../../../components/Proxy.svelte';
	import Hotspots from '../../../components/Hotspots.svelte';
    import Hotspot from '../../../components/Hotspot.svelte';

	import ScrollView from '../../../components/ScrollView.svelte';

	$: proxyContentImage = ($locationMode === 'global') ? 'explore_content' : 'explore_content_local';

	import ExploreFilterBar from './ExploreFilterBar.svelte';

	function exploreZoomIn() {
		$exploreZoomed = true;
	}
</script>

<div class="content">
	<div class="contentArea">
		<Hotspots>
			<!-- Zoom In -->
			<Hotspot onClick="{exploreZoomIn}" style="
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 350px;
				height: 350px;
				border-radius: 999px;" />
		</Hotspots>

		<Proxy image="{proxyContentImage}" />
	</div>

	<ExploreFilterBar />
</div>

<style>
	.content {
		position: absolute;
		width: 100%;
		height: 100%;

		background-color: #0B0B0B;
	}

	.content :global(.hotspotContainer) {
		height: 100%;
	}

	.contentArea {
		position: absolute;
		width: 100%;
		height: 100%;

		display:flex;
		align-items: center;
		justify-content: center;
	}
</style>
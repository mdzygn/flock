<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let locationMode = 'global';

	import Proxy from '../../../components/Proxy.svelte';
	import Hotspots from '../../../components/Hotspots.svelte';
    import Hotspot from '../../../components/Hotspot.svelte';

	import ScrollView from '../../../components/ScrollView.svelte';

	$: proxyContentImage = (locationMode === 'global') ? 'explore_content' : 'explore_content_local';
	$: proxyFilterImage = (locationMode === 'global') ? 'explore_filter.png' : 'explore_filter_local.png';
</script>

<div class="content">
	<div class="contentArea">
		<Hotspots>
			<!-- Zoom In -->
			<Hotspot onClick="{e => dispatch('exploreZoomIn')}" style="
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 350px;
				height: 350px;
				border-radius: 999px;" />
		</Hotspots>

		<Proxy image="{proxyContentImage}" />
	</div>

	<div class="filterBar">
		<Hotspots>
			<!-- Toggle View Mode -->
			<Hotspot onClick="{e => dispatch('setViewMode', {viewMode: 'discover'})}" style="
				left: 7px;
				top: 5px;
				width: 44px;
				height: 46px;" />

			<!-- Toggle Location Mode -->
			<Hotspot onClick="{e => dispatch('toggleLocationMode')}" style="
				right: 10px;
				top: 5px;
				width: 232px;
				height: 46px;" />
		</Hotspots>

		<Proxy image="{proxyFilterImage}" />
	</div>
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

	.filterBar {
		position: absolute;
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
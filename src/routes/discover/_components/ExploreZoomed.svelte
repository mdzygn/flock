<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let locationMode = 'global';

	import { loadProject } from '../../../actions/appActions.js';

	import Proxy from '../../../components/Proxy.svelte';
	import Hotspots from '../../../components/Hotspots.svelte';
    import Hotspot from '../../../components/Hotspot.svelte';

	import ScrollView from '../../../components/ScrollView.svelte';

	import ExploreFilterBar from './ExploreFilterBar.svelte';
</script>

<div class="content">
	<div class="contentArea">
		<Hotspots>
			<!-- Zoom Out -->
			<Hotspot onClick="{e => dispatch('exploreZoomOut')}" style="
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;" />

			<!-- Select Project -->
			<Hotspot onClick="{e => loadProject('m62lsp2o')}" style="
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 250px;
				height: 250px;
				border-radius: 999px;" />
		</Hotspots>

		<Proxy image="explore_zoomed" className="exploreZoomed" />
	</div>

	<ExploreFilterBar {locationMode} />
</div>

<style>
	.content {
		position: absolute;
		width: 100%;
		height: 100%;

		background-color: #0B0B0B;

		overflow: hidden;
	}

	.content :global(.hotspotContainer) {
		top: 0;
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

	.contentArea :global(.exploreZoomed) {
		margin-top: 55px;
	}
</style>
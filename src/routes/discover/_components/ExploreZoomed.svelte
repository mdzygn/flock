<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import { loadProject } from '../../../actions/appActions.js';

	import Hotspots from '../../../components/Hotspots.svelte';
	import Proxy from '../../../components/Proxy.svelte';

	import ScrollView from '../../../components/ScrollView.svelte';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="content">
	<div class="contentArea">
		<Hotspots>
			<!-- Zoom Out -->
			<div on:click="{e => dispatch('exploreZoomOut')}" style="
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;">&nbsp;</div>

			<!-- Select Project -->
			<div class="button" on:click="{e => loadProject('m62lsp2o')}" style="
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 250px;
				height: 250px;
				border-radius: 999px;">&nbsp;</div>
		</Hotspots>

		<Proxy image="explore_zoomed" className="exploreZoomed" />
	</div>
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

	.button {
		cursor: pointer;
	}
</style>
<script>
	import Hotspots from '../../components/Hotspots.svelte';
	import Proxy from '../../components/Proxy.svelte';

	import ScrollView from '../../components/ScrollView.svelte';

	let projectId = 'm62lsp2o';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="content">
	<div class="contentArea">
		<Hotspots>
			<a href="explore" style="
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;">&nbsp;</a>
			<a href="projects/{projectId}" style="
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 250px;
				height: 250px;
				border-radius: 999px;">&nbsp;</a>
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
		margin-top: 70px;
	}
</style>
<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import Hotspots from '../../../components/Hotspots.svelte';
	import Proxy from '../../../components/Proxy.svelte';

	import ScrollView from '../../../components/ScrollView.svelte';

	function setDiscoverMode() {
		dispatch('setViewMode', {viewMode: 'discover'});
	}
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="content">
	<div class="contentArea">
		<Hotspots>
			<a href="explore/zoom" style="
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 350px;
				height: 350px;
				border-radius: 999px;">&nbsp;</a>
		</Hotspots>

		<Proxy image="explore_content" />
	</div>

	<div class="filterBar">
		<Hotspots>
			<div on:click="{setDiscoverMode}" style="
				left: 7px;
				top: 5px;
				width: 44px;
				height: 46px;">&nbsp;</div>
			<a href="explore/local" style="
				right: 10px;
				top: 5px;
				width: 232px;
				height: 46px;">&nbsp;</a>
		</Hotspots>

		<Proxy image="explore_filter" />
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
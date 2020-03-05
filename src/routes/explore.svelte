<script>
	import Hotspots from '../components/Hotspots.svelte';

	import ScrollView from '../components/ScrollView.svelte';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="content">
	<a class="contentArea" href="messages/a4kcmsd3">
		<img src="content/proxy/explore_content.jpg" style="width: 100%" alt="search" />
	</a>

	<div class="filterBar">
		<img src="content/proxy/explore_filter.jpg" style="width: 100%" alt="search" />
	</div>

	<Hotspots>
		<a href="contacts" style="
			left: 5px;
			top: 5px;
			width: 40px;
			height: 39px;">&nbsp;</a>
	</Hotspots>
</div>

<style>
	.content {
		position: absolute;
		width: 100%;
		height: 100%;

		background-color: #0B0B0B;
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
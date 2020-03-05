<script>
	import Hotspots from '../components/Hotspots.svelte';

	import ScrollView from '../components/ScrollView.svelte';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="content">
	<a class="contentItem" href="messages/a4kcmsd3">
		<img src="content/proxy/explore.jpg" style="width: 100%" alt="search" />
	</a>

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

		/* display:flex;
		align-items: center;
		justify-content: center; */
	}

	.contentItem {
	}
</style>
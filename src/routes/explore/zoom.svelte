<script>
	import Hotspots from '../../components/Hotspots.svelte';

	import ScrollView from '../../components/ScrollView.svelte';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="content">
	<a class="contentArea" href="messages/a4kcmsd3">
		<Hotspots>
			<a href="explore" style="
				width: 100%;
				height: 100%;">&nbsp;</a>
			<a href="discover" style="
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 250px;
				height: 250px;
				border-radius: 999px;">&nbsp;</a>
		</Hotspots>

		<img src="content/proxy/explore_zoomed.jpg" style="width: 100%; margin-top: 70px;" alt="search" />
	</a>
</div>

<style>
	.content {
		position: absolute;
		width: 100%;
		height: 100%;

		background-color: #0B0B0B;

		overflow: hidden;
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
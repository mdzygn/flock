<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';

	import Hotspots from '../../components/Hotspots.svelte';
    import Hotspot from '../../components/Hotspot.svelte';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView id="messages">
	<a href="messages/a4kcmsd3" class="messageView">
		<Hotspots>
			<Hotspot href="contacts" style="
				left: 7px;
				top: 5px;
				width: 44px;
				height: 40px;" />
		</Hotspots>

		<Proxy image="messages" />
	</a>
</ScrollView>

<style>
</style>
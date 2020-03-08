<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';

	import Hotspots from '../../components/Hotspots.svelte';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<a href="messages/a4kcmsd3" class="messageView">
		<Hotspots>
			<a href="contacts" style="
				left: 7px;
				top: 5px;
				width: 44px;
				height: 40px;">&nbsp;</a>
		</Hotspots>

		<Proxy image="messages" />
	</a>
</ScrollView>

<style>
</style>
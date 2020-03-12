<script>
	import ScrollView from '../components/ScrollView.svelte';

	import Proxy from '../components/Proxy.svelte';
    import Hotspot from '../components/Hotspot.svelte';

	import { loadProfile, loadConversation } from '../actions/appActions.js';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView id="contacts">
	<Proxy image="contacts">
		<!-- Contact Profiles -->
		<Hotspot onClick="{e => loadProfile('bl20a8lm')}" style="
			left: 9px;
			top: 46px;
			width: 256px;
			height: 693px;" />

		<!-- Send Message -->
		<Hotspot onClick="{e => loadConversation('r70dp2bf', {isNew: true})}" style="
			right: 7px;
			top: 51px;
			width: 59px;
			height: 678px;" />
	</Proxy>
</ScrollView>

<style>
</style>
<script>
	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';
    import Hotspot from '../../../components/Hotspot.svelte';

	import { loadProject } from '../../../actions/appActions.js';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView id="likes">
	<Proxy image="likes">
        <!-- Project Links -->
        <Hotspot onClick="{e => loadProject('m62lsp2o')}" style="
			left: 0px;
			top: 47px;
			width: 100%;
			height: 869px;" />
	</Proxy>
</ScrollView>

<style>
</style>
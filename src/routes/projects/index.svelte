<script>
	import ScrollView from '../../components/ScrollView.svelte';

	import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import { newProject, loadProject } from '../../actions/appActions.js';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView id="projects">
	<Proxy image="projects">
		<Hotspot onClick="{e => loadProject('m62lsp2o', {owner: true})}" style="
			left: 0;
			width: 100%;
			top: 81px;
			height: 196px;" />
		<Hotspot onClick="{e => loadProject('m62lsp2o', {following: true})}" style="
			left: 0px;
			width: 100%;
			top: 359px;
			height: 527px;" />
		<Hotspot onClick="{newProject}" style="
			right: 10px;
			top: 277px;
			width: 142px;
			height: 46px;" />
	</Proxy>
</ScrollView>

<style>
</style>
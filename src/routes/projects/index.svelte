<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';

	import { newProject, loadProject } from '../../actions/appActions.js';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView id="projects">
	<Proxy image="projects">
		<div on:click="{e => loadProject('m62lsp2o', {owner: true})}" style="
			left: 0;
			width: 100%;
			top: 81px;
			height: 196px;">&nbsp;</div>
		<div on:click="{e => loadProject('m62lsp2o', {following: true})}" style="
			left: 0px;
			width: 100%;
			top: 359px;
			height: 527px;">&nbsp;</div>
		<div on:click="{newProject}" style="
			right: 10px;
			top: 277px;
			width: 142px;
			height: 46px;">&nbsp;</div>
	</Proxy>
</ScrollView>

<style>
</style>
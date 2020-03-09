<script>
	import { goto } from '@sapper/app';

	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';

	import { following, owner } from '../../models/projectViewState.js';

	let projectId = 'm62lsp2o';

	function loadOwnedProject() {
		$owner = true;
		$following = false;
		goto('projects/' + projectId);
	}
	function loadFollowedProject() {
		$owner = false;
		$following = true;
		goto('projects/' + projectId);
	}
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView id="projects">
	<Proxy image="projects">
		<div on:click="{loadOwnedProject}" style="
			left: 0;
			width: 100%;
			top: 81px;
			height: 196px;">&nbsp;</div>
		<div on:click="{loadFollowedProject}" style="
			left: 0px;
			width: 100%;
			top: 359px;
			height: 527px;">&nbsp;</div>
		<a href="projects/create" style="
			right: 10px;
			top: 277px;
			width: 142px;
			height: 46px;">&nbsp;</a>
	</Proxy>
</ScrollView>

<style>
</style>
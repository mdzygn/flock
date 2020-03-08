<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';

	let projectId = 'm62lsp2o';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<Proxy image="projects">
		<a href="projects/{projectId}/following" style="
			left: 0;
			top: 81px;
			width: 100%;
			height: 196px;">&nbsp;</a>
		<a href="create" style="
			right: 10px;
			top: 277px;
			width: 142px;
			height: 46px;">&nbsp;</a>
	</Proxy>
</ScrollView>

<style>
</style>
<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';

	let projectId = 'm62lsp2o';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<Proxy image="likes">
        <!-- Project Links -->
        <a href="projects/{projectId}" style="
			left: 0px;
			top: 47px;
			width: 100%;
			height: 869px;">&nbsp;</a>
	</Proxy>
</ScrollView>

<style>
</style>
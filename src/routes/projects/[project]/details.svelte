<script>
	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';

	let projectId = 'm62lsp2o';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<Proxy image="create_project_2" href="projects/{projectId}/populate" />
	</div>
</ScrollView>

<style>
</style>
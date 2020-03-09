<script>
	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';

	import { projectId } from '../../../models/appState';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<Proxy image="create_project_2" href="projects/{$projectId}" />
	</div>
</ScrollView>

<style>
</style>
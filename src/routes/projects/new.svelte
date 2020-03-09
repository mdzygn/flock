<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';

	import { createProject } from '../../actions/appActions.js';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<Proxy image="create_project" onClick="{e => createProject('m62lsp2o')}" />
	</div>
</ScrollView>

<style>
</style>
<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';

	import { createProject } from '../../actions/projectActions';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<Proxy image="create_project" onClick="{e => createProject('92kd73kj')}" />
	</div>
</ScrollView>

<style>
</style>
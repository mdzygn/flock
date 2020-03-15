<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';

	import { createProject } from '../../a\ctions/appActions.js';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<Proxy image="create_project" onClick="{e => createProject('msl30nhg')}" />
	</div>
</ScrollView>

<style>
</style>
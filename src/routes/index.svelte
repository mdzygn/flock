<script>
	import ScrollView from '../components/ScrollView.svelte';
	import Proxy from '../components/Proxy.svelte';

	import Feed from './_components/Feed.svelte';

	import { loadProject, loadProjectPost } from '../actions/appActions.js';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView id="newsfeed">
	<div class="feed">
		<Proxy image="feed1" onClick="{e => loadProjectPost('m62lsp2o')}" />
		<Proxy image="feed3" onClick="{e => loadProjectPost('m62lsp2o')}" />
		<Proxy image="feed4" onClick="{e => loadProject('m62lsp2o')}" />
		<Proxy image="feed5" onClick="{e => loadProjectPost('m62lsp2o')}" />
		<Proxy image="feed6" onClick="{e => loadProject('m62lsp2o')}" />
	</div>
	<!-- <Feed /> -->
</ScrollView>

<style>
	.feed {
		width: 100%;

		padding-top: 10px;

    	line-height: 0;
	}

	.feed :global(.proxy) {
		padding-bottom: 10px;
	}
</style>
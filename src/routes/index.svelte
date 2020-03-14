<script>
	import ScrollView from '../components/ScrollView.svelte';
	import Proxy from '../components/Proxy.svelte';

	import Feed from './_components/Feed.svelte';

	import { loadProject, loadProjectPost, loadThread } from '../actions/appActions.js';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView id="newsfeed">
	<div class="feed">
		<Proxy image="feed1" onClick="{e => loadProjectPost('s7djj2s2')}" />
		<Proxy image="feed2" onClick="{e => loadThread('sm2ld9p2')}" />
		<Proxy image="feed3" onClick="{e => loadProjectPost('s7djj2s2')}" />
		<Proxy image="feed4" onClick="{e => loadProject('s7djj2s2')}" />
		<Proxy image="feed5" onClick="{e => loadProjectPost('s7djj2s2')}" />
		<Proxy image="feed6" onClick="{e => loadProject('s7djj2s2')}" />
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
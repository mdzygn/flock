<script>
	import ScrollView from '../components/ScrollView.svelte';
	import Proxy from '../components/Proxy.svelte';

	import Feed from './_components/Feed.svelte';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView id="newsfeed">
	<!-- <Feed /> -->

	<div class="feed">
		<Proxy image="feed1" href="projects/m62lsp2o#post" />
		<Proxy image="feed3" href="projects/m62lsp2o#post" />
		<Proxy image="feed4" href="projects/m62lsp2o" />
		<Proxy image="feed5" href="projects/m62lsp2o#post" />
		<Proxy image="feed6" href="projects/m62lsp2o" />
	</div>
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
<script>
	import { goto } from '@sapper/app';
	import { onMount } from 'svelte';

	import ScrollView from '../components/ScrollView.svelte';
	import Proxy from '../components/Proxy.svelte';

	import Feed from './_components/Feed.svelte';

	import { showBetaFeatures } from '../models/appModel';

	if (!$showBetaFeatures) {
		onMount(async () => {
			goto('discover'); // reroute
		});
	}

	import { loadProject, loadProjectPost, loadPost } from '../actions/appActions';

</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

{#if $showBetaFeatures}
	<ScrollView id="newsfeed">
		<div class="feed">
			<Proxy image="feed1" onClick="{e => loadProjectPost('s7djj2s2')}" />
			<Proxy image="feed2" onClick="{e => loadPost('ma9l2h4h')}" />
			<Proxy image="feed3" onClick="{e => loadProjectPost('s7djj2s2')}" />
			<Proxy image="feed4" onClick="{e => loadProject('36bsf5gs')}" />
			<Proxy image="feed5" onClick="{e => loadProjectPost('s7djj2s2')}" />
			<Proxy image="feed6" onClick="{e => loadProject('s7djj2s2')}" />
		</div>
		<!-- <Feed /> -->
	</ScrollView>
{/if}

<style>
	.feed {
		width: 100%;

		padding-top: 5px;

    	line-height: 0;
	}

	.feed :global(.proxy) {
		padding-bottom: 10px;
	}
</style>
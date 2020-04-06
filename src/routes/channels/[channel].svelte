<script>
	import { writable } from 'svelte/store';

	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';
	import NewPostButton from '../_components/NewPostButton.svelte';
	import ContentLoader from '../_components/ContentLoader.svelte';
	import PostItem from '../_components/PostItem.svelte';

	import {
		channelId,
		showBetaFeatures,
	} from '../../models/appModel';

	import {
		getPosts,
	} from '../../models/postsModel';

    let posts = writable([]);
	$: { posts = getPosts( { channelId: $channelId, type: 'thread' } ) };

	import { loadThread } from '../../actions/appActions';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView id="channel">
	<div class="content">
		{#if $showBetaFeatures}
			<Proxy image="channel_actions" className="channelActions" />
		{/if}
		<!-- <Proxy image="channel_posts" className="channelPosts proxyOverlay" onClick="{e => loadThread('sm2ld9p2')}" /> -->
		<div class="postsContainer">
            {#each $posts as post}
				<PostItem {post} />
			{:else}
				<ContentLoader label="This channel has no posts" />
            {/each}
		</div>
		<NewPostButton />
	</div>
</ScrollView>

<style>
	/* .content :global(.proxyOverlay) {
		position: absolute;
		opacity: 0.5;
	} */

	.content :global(.channelActions) {
		box-shadow: 0 2px 3px 0 rgba(0,0,0,0.12);
	}

	.content :global(.channelPosts) {
		margin-top: 5px;
	}

	.content {
		margin-bottom: 40px;
	}

	.postsContainer {
    	padding-top: 5px;
	}
</style>
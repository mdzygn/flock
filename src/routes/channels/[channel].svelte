<script>
	import locale from '../../locale';

	import { writable } from 'svelte/store';
	import { goto } from '@sapper/app';

	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';
	import NewPostButton from '../_components/NewPostButton.svelte';
	import ContentLoader from '../_components/ContentLoader.svelte';
	import PostItem from '../_components/PostItem.svelte';

	import {
		project,
		channel,
		channelId,
		showBetaFeatures,
		getIsProjectTeamMember,
	} from '../../models/appModel';

	import {
		loadCurrentProject,
		loadCurrentChannel,
		newThread,
	} from '../../actions/appActions';

	import {
		getPosts,
		loadingPosts,
	} from '../../models/postsModel';

	import {
		getChannelDefaultDescription,
	} from '../../models/channelsModel';

	loadCurrentProject();
	loadCurrentChannel();

	const DISPLAY_BOTTOM_LINK_POST_COUNT = 6;

    let posts = writable([]);
	$: { posts = getPosts( { channelId: $channelId, type: 'thread' } ) };

	$: canPost = $channel && (!$channel.teamOnly || getIsProjectTeamMember($project));

	$: channelDescription = $channel && ($channel.description || getChannelDefaultDescription($channel)) || null;

	import {
		loadPost,
    	checkLoggedIn,
	} from '../../actions/appActions';

	function newPost() {
		if (!checkLoggedIn()) { return; }

		newThread();
	}
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="pageContent">
	<ScrollView id="channel">
		<div slot="scrollHeader">
			{#if channelDescription}
				<div class="channelHeader" class:channelHeaderPost="{canPost}">{channelDescription}</div>
			{/if}
			{#if canPost}
				<!-- <Proxy image="channel_actions" className="channelActions" /> -->
				<NewPostButton onClick="{newPost}" className="newPostHeader" />
			{/if}
		</div>

		<div class="content">
			<!-- <Proxy image="channel_posts" className="channelPosts proxyOverlay" onClick="{e => loadPost('sm2ld9p2')}" /> -->
			<div class="postsContainer">
				{#each $posts as post}
					<PostItem {post} />
				{:else}

					{#if $loadingPosts && (!$posts || !$posts.length) }
						<ContentLoader label="{locale.LOADING.CHANNEL}" />
					{:else}
						<ContentLoader label="This channel has no posts" />
					{/if}
				{/each}
			</div>
			{#if canPost && $posts && $posts.length >= DISPLAY_BOTTOM_LINK_POST_COUNT}
				<NewPostButton onClick="{newPost}" />
			{/if}
		</div>
	</ScrollView>
</div>

<style>
	/* .content :global(.proxyOverlay) {
		position: absolute;
		opacity: 0.5;
	} */

	.channelHeader {
		background-color: #ffffff;
		font-size: 1.4rem;
		color: #666666;

		padding: 16px 20px;
		/* margin-bottom: 5px; */
	}
	.channelHeaderPost {
    	padding-bottom: 0;
	}

	.pageContent :global(.newPostHeader) {
		margin: 0;

	    /* height: 54px;
		display:flex;
		align-items: center;
		background-color: #ffffff; */
	}

	.content :global(.channelActions) {
		box-shadow: 0 2px 3px 0 rgba(0,0,0,0.12);
	}

	.content :global(.contentLoader) {
    	background-color: #ffffff;
	}

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
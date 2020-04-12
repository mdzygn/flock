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
		user,
	} from '../../models/appModel';

	import {
		loadCurrentProject,
		loadCurrentChannel,
		newThread,
		loadPost,
		checkLoggedIn,
	} from '../../actions/appActions';

	import {
		loadUsersOfItemModels,
	} from '../../models/usersModel';

	import {
		getPosts,
		loadingPosts,
	} from '../../models/postsModel';

	import {
		loadingChannels,
		getChannelDefaultDescription,
	} from '../../models/channelsModel';

	loadCurrentProject();
	loadCurrentChannel();

	const DISPLAY_BOTTOM_LINK_POST_COUNT = 6;

	$: sortByCreated = ($channel && $channel.sortByCreated) || false;

    let posts = writable([]);
	$: { posts = getPosts( { channelId: $channelId, type: 'thread', sortByCreated } ) };

    $: isTeamMember = $user && getIsProjectTeamMember($project);
	$: canPost = $channel && (!$channel.teamOnly || isTeamMember);

	$: channelDescription = $channel && ($channel.description || getChannelDefaultDescription($channel)) || null;

    $: {
        loadUsersOfItemModels($posts);
    }

	function newPost() {
		if (!checkLoggedIn()) { return; }

		newThread();
	}
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="pageContent">
	{#if $loadingChannels && (!$channel || $channel.id !== $channelId ) }
		<ContentLoader label="{locale.LOADING.CHANNEL}" />
	{:else if !$channel || !$channel.id}
		<ContentLoader label="{locale.CHANNEL.NOT_FOUND}" />
	{:else}
		<ScrollView id="channel">
			<div slot="scrollHeader">
				{#if channelDescription}
					<div class="channelHeader" class:channelHeaderPost="{canPost}">{@html channelDescription}</div>
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
							<ContentLoader label="{locale.LOADING.CHANNEL_ITEMS}" />
						{:else}
							<ContentLoader>{locale.CHANNEL.NO_POSTS}{#if canPost}<br/>Be the first to <a href="javascript:void(0)" on:click="{newPost}">Add a Post</a>{/if}</ContentLoader>
						{/if}
					{/each}
				</div>
				{#if canPost && $posts && $posts.length >= DISPLAY_BOTTOM_LINK_POST_COUNT}
					<NewPostButton onClick="{newPost}" />
				{/if}
			</div>
		</ScrollView>
	{/if}
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
    	background-color: #f2f2f2;
        font-size: 1.3rem;
        line-height: 2.2rem;
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
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

    let posts = writable([]);
	$: { posts = getPosts( { channelId: $channelId, type: 'thread' } ) };

	$: canPost = $channel && (!$channel.teamOnly || getIsProjectTeamMember($project));

	$: channelDescription = $channel && ($channel.description || getChannelDefaultDescription($channel)) || null;

	import {
		loadThread,
    	checkLoggedIn,
	} from '../../actions/appActions';

	function postThread() {
		if (!checkLoggedIn()) { return; }

		goto('threads/new');
	}
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="pageContent">
	<ScrollView id="channel">
		<div slot="scrollHeader">
			{#if canPost}
				<!-- <Proxy image="channel_actions" className="channelActions" /> -->
				<NewPostButton onClick="{postThread}" className="newPostHeader" />
			{/if}
		</div>

		<div class="content">
			<!-- <Proxy image="channel_posts" className="channelPosts proxyOverlay" onClick="{e => loadThread('sm2ld9p2')}" /> -->
			{#if channelDescription}
				<div class="channelHeader">{channelDescription}</div>
			{/if}
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
			{#if canPost && $posts && $posts.length}
				<NewPostButton onClick="{postThread}" />
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
		padding: 20px;
		font-size: 1.4rem;
		color: #666666;
		margin-bottom: 5px;
	}

	.pageContent :global(.newPostHeader) {
		padding: 0;

	    height: 54px;
		display:flex;
		align-items: center;
		background-color: #ffffff;
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
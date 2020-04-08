<script>
	import locale from '../../locale';

	import { writable } from 'svelte/store';

	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import ThreadPost from '../_components/ThreadPost.svelte';

	import NewPostButton from '../_components/NewPostButton.svelte';

	import ContentLoader from '../_components/ContentLoader.svelte';
	import PostItem from '../_components/PostItem.svelte';

	import { loadProfile } from '../../actions/appActions';

	import {
		postId,
		post,
		postsAnchorToBottom,
	} from '../../models/appModel';

	import {
		loadCurrentChannel,
		loadCurrentPost,
		checkLoggedIn,
		newThreadPost,
	} from '../../actions/appActions';

	import {
		getPost,
		getPosts,
		loadingPosts,
	} from '../../models/postsModel';

	const DISPLAY_BOTTOM_LINK_POST_COUNT = 3;

	loadCurrentChannel();
	loadCurrentPost();

    // let post = writable([]);
	// $: { post = getPost( { postId: $postId, type: 'thread' } ) };

    let posts = writable([]);
	$: { posts = getPosts( { threadId: $postId, type: 'threadPost' } ) };

    function reply() {
		if (!checkLoggedIn()) { return; }
		newThreadPost();
    }
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView id="thread" anchorToBottom="{$postsAnchorToBottom}">
	<!-- <div slot="scrollHeader">
		<ThreadPost {post} />
	</div> -->

	<div class="content">
		<ThreadPost {post} />
		<!-- <Proxy image="thread_posts" className="proxyOverlay">
			<Hotspot onClick="{e => loadProfile('bl20a8lm')}" style="
				left: 7px;
				top: 8px;
				width: 49px;
				height: 1013px;" />
		</Proxy> -->
		<!-- <NewPostButton type="thread_reply" /> -->

		<div class="contentContainer">
			<!-- <Proxy image="channel_posts" className="channelPosts proxyOverlay" onClick="{e => loadPost('sm2ld9p2')}" /> -->
			<div class="postsContainer">
				{#each $posts as post}
					<PostItem {post} type="threadPost" />
				{:else}

					{#if $loadingPosts && (!$posts || !$posts.length) }
						<ContentLoader label="{locale.LOADING.THREAD}" />
					{:else}
						<ContentLoader>{locale.THREAD.NO_POSTS},<br/>be the first to <a href="javascript:void(0)" on:click="{reply}">leave a reply</a></ContentLoader>
					{/if}
				{/each}
			</div>
			{#if $posts && $posts.length >= DISPLAY_BOTTOM_LINK_POST_COUNT}
				<NewPostButton onClick="{reply}" type="reply" />
			{/if}
		</div>
	</div>
</ScrollView>

<style>
	.content :global(.proxyOverlay) {
		position: absolute;
		opacity: 0.5;
	}

	.content {
		margin-bottom: 40px;
	}

	/* .content :global(.proxyThreadPost) {
		margin-top: 5px;
	} */

	/* .content :global(.proxyThreadPosts) {
		margin-top: 10px;
	} */

	.content :global(.postItem) {
    	margin-bottom: 0;
		border-bottom: 2px solid #EEEEEE;
	}

	.content :global(.contentLoader) {
    	background-color: #f2f2f2;
        font-size: 1.3rem;
        line-height: 2rem;
	}

	.contentContainer {
    	margin-bottom: 100px;
	}

	.postsContainer {
		margin-top: 10px;
	}
</style>
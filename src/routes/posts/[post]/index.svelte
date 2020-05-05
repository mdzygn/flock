<script>
	import locale from '../../../locale';

	import { tick } from 'svelte';
	import { writable } from 'svelte/store';

	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';
    import Hotspot from '../../../components/Hotspot.svelte';

	import ThreadPost from '../../_components/ThreadPost.svelte';

	import NewPostButton from '../../_components/NewPostButton.svelte';

	import ContentLoader from '../../_components/ContentLoader.svelte';
	import PostItem from '../../_components/PostItem.svelte';

	import EditPost from '../../posts/_components/EditPost.svelte';

	import { loadProfile } from '../../../actions/appActions';

	import AppModel, {
		postId,
		post,
		postsAnchorToBottom,
		user,
		userId,
		project,
		isUserLoaded,
	} from '../../../models/appModel';

	import {
		loadCurrentChannel,
		loadCurrentPost,
		checkLoggedIn,
		newThreadPost,
	} from '../../../actions/appActions';

	import {
		loadUsersOfItem,
		loadUsersOfItemModels,
	} from '../../../models/usersModel';

	import {
		getPost,
		getPosts,
		loadingPosts,
	} from '../../../models/postsModel';

	import {
		loadingProjects,
	} from '../../../models/projectsModel';

	// $: userLoading = (!($user && $user.loaded) && $userId);

	let showAddPost = false;

	const DISPLAY_BOTTOM_LINK_POST_COUNT = 3;

	$: projectTitleString = ($project && $project.title && $project.title + ' - ') || '';
	$: isArchived = ($project && $project.archived) || false;

	AppModel.on('newThreadPost', onNewThreadPost);

	loadCurrentChannel();
	loadCurrentPost();

    // let post = writable([]);
	// $: { post = getPost( { postId: $postId, type: 'thread' } ) };

    let posts = writable([]);
	$: { posts = getPosts( { threadId: $postId, type: 'threadPost' } ) };

    $: {
        loadUsersOfItem($post);
	}
    $: {
        loadUsersOfItemModels($posts);
	}

    function reply() {
		if (!checkLoggedIn()) { return; }
		newThreadPost();
	}

	function onNewThreadPost() {
		showAddPost = true;
	}

	function hideReplyPanel() {
		showAddPost = false;
	}

	$: {
		showAddPost;
		onReplyPanelResized();
	}

	let scrollRegion = null;

	let replyRegionHeight = 0;
	let replyRegion = null;

	async function onReplyPanelResized() {
		await tick();

		if (showAddPost) {
			replyRegionHeight = (replyRegion && replyRegion.offsetHeight) || 0;
		} else {
			replyRegionHeight = 0;
		}
		// console.log('replyRegionHeight', replyRegionHeight);

		if (replyRegionHeight !== 0) {
			scrollToBottom();
		}
	}

	async function scrollToBottom() {
		if (scrollRegion) {
			await tick();

			if (typeof window !== 'undefined') {
				window.setTimeout(() => {
					scrollRegion.scrollTo(0, scrollRegion.scrollHeight);
				}, 300);
			}

			scrollRegion.scrollTo(0, scrollRegion.scrollHeight);
		}
	}
</script>

<svelte:head>
	<title>{projectTitleString}Flock</title>
</svelte:head>

<div class="content" class:showAddPost="{showAddPost}">
	<ScrollView id="thread" bind:scrollRegion="{scrollRegion}" anchorToBottom="{$postsAnchorToBottom}" bottomOffset="{replyRegionHeight}" disabledMinHeight="{showAddPost}">
		{#if ($loadingPosts && (!$post || $post.id !== $postId)) || !isUserLoaded($user, $userId) || (!$project && $loadingProjects) }
			<ContentLoader label="{locale.LOADING.THREAD}" />
		{:else if !$post || !$post.id}
			<ContentLoader label="{locale.THREAD.NOT_FOUND}" />
		{:else}
			<!-- <div slot="scrollHeader">
				<ThreadPost {post} />
			</div> -->

			<div class="scrollContent">
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
								<ContentLoader label="{locale.LOADING.THREAD_ITEMS}" />
							{:else if !showAddPost}
								<ContentLoader>{locale.THREAD.NO_POSTS}<br/>
									{#if !isArchived}
										be the first to <a href="javascript:void(0)" on:click="{reply}">Leave a Reply</a>
									{/if}
								</ContentLoader>
							{/if}
						{/each}
					</div>
					{#if !showAddPost && $posts && $posts.length >= DISPLAY_BOTTOM_LINK_POST_COUNT}
						<NewPostButton onClick="{reply}" type="reply" />
					{/if}
				</div>
			</div>
		{/if}
	</ScrollView>

	{#if showAddPost}
		<EditPost inlineComponent="{true}" bind:element="{replyRegion}" on:hide="{hideReplyPanel}" on:resize="{onReplyPanelResized}" />
	{/if}
</div>

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

	.content :global(.contentLoader) {
    	background-color: #f2f2f2;
        font-size: 1.3rem;
        line-height: 2.2rem;
	}

	.contentContainer {
    	margin-bottom: 100px;
	}
	.showAddPost .contentContainer {
    	margin-bottom: 10px;
	}
	/* .showAddPost .scrollContent {
    	min-height: initial !important;
	} */

	.postsContainer {
		margin-top: 10px;
	}

	.content .postsContainer :global(.postItem) {
    	margin-bottom: 0;
		border-bottom: 2px solid #EEEEEE;
	}

    /* .content :global(.showAddPost) {
    	bottom: 40px;
	} */
</style>
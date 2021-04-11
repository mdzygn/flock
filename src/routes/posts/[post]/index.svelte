<script>
	import locale from '../../../locale';
	import config from '../../../config';

	import { tick, onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';
    import Hotspot from '../../../components/Hotspot.svelte';

	import ThreadPost from '../../_components/ThreadPost.svelte';

	import NewPostButton from '../../_components/NewPostButton.svelte';

	import ContentLoader from '../../_components/ContentLoader.svelte';
	import PostItem from '../../_components/PostItem.svelte';

    import ReplyIcon from "../../../assets/icons/reply.png";

	import EditPost from '../../posts/_components/EditPost.svelte';
	import AddPost from '../../posts/_components/AddPost.svelte';

	import { loadProfile } from '../../../actions/appActions';

	import { stopEvent } from '../../../utils';

	import { setNotificationSeenTimeout, clearNotificationSeenTimeout } from '../../../models/notificationsModel';

	import AppModel, {
		postId,
		post,
		postsAnchorToBottom,
		user,
		userId,
		project,
		isUserLoaded,
		loggingIn,
    	postType,
	} from '../../../models/appModel';

	import {
		loadCurrentChannel,
		loadCurrentPost,
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

	let newPostMessage = '';
	let newPostMessageField = null;

	const DISPLAY_BOTTOM_LINK_POST_COUNT = 3;

	$: projectTitleString = ($project && $project.title && $project.title + ' - ') || '';
	$: isArchived = ($project && $project.archived) || false;

	$: threadLoading = ($loadingPosts && (!$post || $post.id !== $postId)) || !isUserLoaded($user, $userId, $loggingIn) || (!$project && $loadingProjects);

	$: isLoadingPosts = ($loadingPosts && (!$posts || !$posts.length));

	$: postExists = $post && $post.id;

	$: {
		if ($postsAnchorToBottom && scrollRegion && !isLoadingPosts && $posts) {
			(async () => {
				await tick();
				scrollToBottom();

				// window.setTimeout(()=> {
				// 	console.log('$postsAnchorToBottom', $postsAnchorToBottom);
				// 	scrollToBottom();
				// }, 100);
			})();
		}
	}

    $postType = 'threadPost';

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

    function reply(event) {
		stopEvent(event);
		newThreadPost();
	}

	async function onNewThreadPost() {
		showAddPost = true;

		if (newPostMessageField) {
			await tick();
			newPostMessageField.focus();
		}
	}

	function hideReplyPanel() {
		showAddPost = false;
	}

	$: {
		showAddPost; threadLoading;
		onReplyPanelResized();
	}

	let scrollRegion = null;

	let replyRegionHeight = 0;

	let replyRegion = null;
	let newPostRegion = null;

	async function onReplyPanelResized() {
		await tick();

		if (showAddPost) {
			replyRegionHeight = (replyRegion && replyRegion.offsetHeight) || 0;
		} else {
			replyRegionHeight = (newPostRegion && newPostRegion.offsetHeight) || 0;
			// replyRegionHeight = 0;
		}
		// console.log('replyRegionHeight', replyRegionHeight);

		if (replyRegionHeight !== 0 && showAddPost) {
			scrollToBottom();
		}
	}

	async function scrollToBottom() {
		if (scrollRegion) {
			await tick();

			if (typeof window !== 'undefined') { // ensure keyboard has appeared
				window.setTimeout(() => {
					if (scrollRegion) {
						scrollRegion.scrollTo(0, scrollRegion.scrollHeight);
					}
				}, 250);
				window.setTimeout(() => {
					if (scrollRegion) {
						scrollRegion.scrollTo(0, scrollRegion.scrollHeight);
					}
				}, 500);
			}

			if (scrollRegion) {
				scrollRegion.scrollTo(0, scrollRegion.scrollHeight);
			}
		}
	}

	let postSeenTimeout;
	let threadSeenTimeout;
	onMount(() => {
		postSeenTimeout = setNotificationSeenTimeout({postId: $postId});
		threadSeenTimeout = setNotificationSeenTimeout({threadId: $postId}, config.REPLY_VIEWED_DELAY);

		AppModel.on('newThreadPost', onNewThreadPost);
	});
	onDestroy(() => {
		clearNotificationSeenTimeout(postSeenTimeout);
		clearNotificationSeenTimeout(threadSeenTimeout);

		AppModel.off('newThreadPost', onNewThreadPost);
	});
</script>

<svelte:head>
	<title>{projectTitleString}Flock</title>
</svelte:head>

<div class="content" class:showAddPost="{showAddPost}">
	<ScrollView id="thread" bind:scrollRegion="{scrollRegion}" anchorToBottom="{$postsAnchorToBottom}" bottomOffset="{replyRegionHeight}" disabledMinHeight="{showAddPost}">
		{#if threadLoading }
			<ContentLoader label="{locale.LOADING.THREAD}" />
		{:else if !postExists}
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
							{#if isLoadingPosts }
								<ContentLoader label="{locale.LOADING.THREAD_ITEMS}" />
							{:else if !showAddPost}
								<ContentLoader>{locale.THREAD.NO_POSTS}<br/>
									{#if !isArchived}
										be the first to <a href="{location.href}" on:click="{(e) => { reply(); return stopEvent(e); }}">Leave a Reply</a>
									{/if}
								</ContentLoader>
							{/if}
						{/each}
					</div>
					<!-- {#if !showAddPost && $posts && !isLoadingPosts}
						<AddPost {newPostMessage} onClick="{reply}" placeholderLabel="{locale.THREAD.REPLY_PLACEHOLDER}" />
					{/if} -->
					{#if !showAddPost && $posts && $posts.length >= DISPLAY_BOTTOM_LINK_POST_COUNT}
						<NewPostButton onClick="{reply}" icon="{ReplyIcon}" label="{locale.THREAD.REPLY}" />
					{/if}
				</div>
			</div>
		{/if}
	</ScrollView>

	{#if !showAddPost && postExists && !threadLoading}
		<AddPost {newPostMessage} onClick="{reply}" placeholderLabel="{locale.THREAD.REPLY_PLACEHOLDER}" bind:element="{newPostRegion}" />
	{/if}
	<EditPost shown="{showAddPost}" bind:message="{newPostMessage}" bind:messageField="{newPostMessageField}" inlineComponent="{true}" bind:element="{replyRegion}" on:hide="{hideReplyPanel}" on:resize="{onReplyPanelResized}" />
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

	.postsContainer :global(.contentLoader) {
    	background-color: #f2f2f2;
        font-size: 1.3rem;
        line-height: 2.2rem;
	}
	.content .postsContainer :global(.postItem:last-child) {
		border-bottom: none;
	}

	.contentContainer {
		padding-bottom: 20px;
    	/* margin-bottom: 50px; */
    	/* margin-bottom: 100px; */
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

	.content :global(.newPostButtonPanel) {
		margin-top: 5px;
	}

	.content :global(.addPostPanel) {
		position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
		box-shadow: 0 -2px 5px 0 rgba(0,0,0,0.15);
	}

	
	.content :global(.newPostButtonPanel) {
		height: 36px;
	}
	.content :global(.newPostButtonPanel .newPostButton) {
	    padding-right: 46px;
    	font-size: 1.3rem;
	}
	.content :global(.newPostButtonPanel .icon) {
		padding-left: 16px;
		transform: scale(0.45, 0.45);
	}
</style>
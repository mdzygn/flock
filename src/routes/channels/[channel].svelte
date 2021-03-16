<script>
	import locale from '../../locale';

	import { writable } from 'svelte/store';
	import { goto } from '@sapper/app';
	import { tick } from 'svelte';

	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';
	import NewPostButton from '../_components/NewPostButton.svelte';
	import ContentLoader from '../_components/ContentLoader.svelte';
	import PostItem from '../_components/PostItem.svelte';

	import EditPost from '../posts/_components/EditPost.svelte';
	import AddPost from '../posts/_components/AddPost.svelte';

    // import CloseIcon from "../../assets/icons/clear.png";

	import { stopEvent } from '../../utils';

	import {
		project,
		channel,
		channelId,
		showBetaFeatures,
		getIsProjectTeamMember,
		user,
		userId,
		isUserLoaded,
		loggingIn,
    	postType,
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

	import {
		loadingProjects,
	} from '../../models/projectsModel';

	// $: userLoading = (!($user && $user.loaded) && $userId);

	$: projectTitleString = ($project && $project.title && $project.title + ' - ') || '';
	$: isArchived = ($project && $project.archived) || false;

	
    $postType = 'thread';

	loadCurrentProject();
	loadCurrentChannel();

	const DISPLAY_BOTTOM_LINK_POST_COUNT = 6;

	$: sortByCreated = ($channel && $channel.sortByCreated) || false;

    let posts = writable([]);
	$: { posts = getPosts( { channelId: $channelId, type: 'thread', sortByCreated } ) };

    $: isTeamMember = $user && getIsProjectTeamMember($project);
	$: canPost = $channel && (!$channel.teamOnly || isTeamMember) && !isArchived;

	$: channelDescription = $channel && ($channel.description || getChannelDefaultDescription($channel)) || null;

	let newPostMessage = '';
	let newPostMessageField = null;
	
	let showAddPost = false;

	$: {
		showAddPost; newPostRegion;
		onNewPostPanelResized();
	}

	let newPostRegionHeight = 0;
	let newPostRegion = null;

	async function onNewPostPanelResized() {
		await tick();

		if (showAddPost) {
			newPostRegionHeight = (newPostRegion && newPostRegion.offsetHeight) || 0;
		} else {
			newPostRegionHeight = 0;
		}

		// if (newPostRegionHeight !== 0) {
		// 	scrollToBottom();
		// }
	}

    $: {
        loadUsersOfItemModels($posts);
    }

	function hideAddPostPanel() {
		showAddPost = false;
	}

	async function newPost(event) {
		stopEvent(event);
		if (!checkLoggedIn()) { return; }

		showAddPost = true;

		if (newPostMessageField) {
			await tick();
			newPostMessageField.focus();
		}

		// if (!canPost) { return; }

		// newThread();
	}
</script>

<svelte:head>
	<title>{projectTitleString}Flock</title>
</svelte:head>

<div class="pageContent">
	{#if ($loadingChannels && (!$channel || $channel.id !== $channelId)) || !isUserLoaded($user, $userId, $loggingIn) || (!$project && $loadingProjects) }
		<ContentLoader label="{locale.LOADING.CHANNEL}" />
	{:else if !$channel || !$channel.id}
		<ContentLoader label="{locale.CHANNEL.NOT_FOUND}" />
	{:else}
		<ScrollView id="channel" topOffset="{newPostRegionHeight}" showScrollHeader="{!showAddPost}">
			<div slot="scrollHeader">
				<div class="channelHeader">
					{#if channelDescription}
						<div class="channelHeaderDescription" on:click="{canPost ? newPost : null}" class:channelHeaderPost="{canPost}">{@html channelDescription}</div>
					{/if}
					{#if canPost}
						<AddPost {newPostMessage} onClick="{newPost}" submitLabel="{locale.CHANNEL.ADD_POST}" />
					{/if}
				</div>
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
							<ContentLoader>{locale.CHANNEL.NO_POSTS}
								{#if canPost}<br/>be the first to <a href="/posts/new" on:click="{(e) => { newPost(); return stopEvent(e); }}">Add a Post</a>{/if}
							</ContentLoader>
						{/if}
					{/each}
				</div>
				{#if canPost && $posts && $posts.length >= DISPLAY_BOTTOM_LINK_POST_COUNT}
					<NewPostButton onClick="{newPost}" />
				{/if}
			</div>
		</ScrollView>
		
		{#if canPost}
			<EditPost shown="{showAddPost}" bind:message="{newPostMessage}" bind:messageField="{newPostMessageField}" submitLabel="{locale.CHANNEL.ADD_POST}" inlineComponent="{true}" bind:element="{newPostRegion}" on:hide="{hideAddPostPanel}" on:resize="{onNewPostPanelResized}" />
		{/if}
	{/if}
</div>

<style>
	/* .content :global(.proxyOverlay) {
		position: absolute;
		opacity: 0.5;
	} */

	.channelHeader {
		background-color: #ffffff;

	}
	.channelHeaderDescription {
		/* padding: 16px 20px; */
		/* margin-bottom: 5px; */

		padding: 9px 16px;
		padding-top: 10px;

		font-size: 1.3rem;
		color: #666666;
		
        overflow-wrap: break-word;
        word-wrap: break-word;
	}
	/* .channelHeaderPost {
		padding-bottom: 14px;
		padding-right: 150px;
	} */

	.pageContent :global(.newPostHeader) {
		margin: 0;

		position: absolute;
		bottom: 1px;
		right: 0;
		width: 150px;

	    /* height: 54px;
		display:flex;
		align-items: center;
		background-color: #ffffff; */
	}

	.content :global(.channelActions) {
		box-shadow: 0 2px 3px 0 rgba(0,0,0,0.12);
	}

	.postsContainer :global(.contentLoader) {
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

	/* .pageContent :global(.content) {
		top: 135px;
	} */

	.pageContent :global(.editPostContent.inlineComponent) {
		top: 0;
		bottom: initial;

        box-shadow: 0 2px 3px 0 rgba(0,0,0,0.1);
	}

	/* .pageContent :global(.editPostContent.inlineComponent .pageTitle) {
		padding-left: 16px;
		margin-top: -1px;
	} */

	.pageContent :global(.editPostContent.inlineComponent .nextButton) {
    	padding-right: 30px;
    }
    .pageContent :global(.editPostContent.inlineComponent .nextButton .icon) {
    	transform: scale(0.4, 0.4);
    }

	/* .pageContent :global(.editPostContent.inlineComponent .collapsePanel .icon) {
		margin-top: 12px;
    	margin-left: 16px;
	} */

	
	.pageContent :global(.editPostContent.inlineComponent .imageSelectionBox.opened) {
		height: 204px;
		padding-top: 0;
	}
	.pageContent :global(.editPostContent.inlineComponent .imageSelectionBox .imageCarousel) {
    	top: 124px;
	}
	.pageContent :global(.editPostContent.inlineComponent .imageSelectionBox .imageItem) {
		width: 96px;
		height: 57px;
		margin: 0 4px;
	}
	.pageContent :global(.editPostContent.inlineComponent .addImage) {
		right: 99px;
	}
	.pageContent :global(.editPostContent.inlineComponent .removeImage) {
		right: initial;
	}
	.pageContent :global(.editPostContent.inlineComponent .imageSelectionBox .uploadButton) {
		width: 62px;
		height: 62px;
		margin-left: -31px;
	}
	.pageContent :global(.editPostContent.inlineComponent .imageSelectionBox .uploadButtonIcon) {
		width: 31px;
		height: 27px;
	}
	.pageContent :global(.editPostContent.inlineComponent .imageSelectionBox .buttonLabel) {
		margin-top: -1px;
		font-size: 1.1rem;
	}
	.pageContent :global(.editPostContent.inlineComponent .imageSelectionBox .searchBar) {
		top: 88px;
	}
	.pageContent :global(.editPostContent.inlineComponent .imageSelectionBox .searchIcon) {
		width: 18px;
		height: 18px;
	}
	.pageContent :global(.editPostContent.inlineComponent .imageSelectionBox .searchFieldInput ) {
    	padding: 5px 11px;
    	font-size: 1.4rem;
	}

	.pageContent .channelHeader :global(.addPostPanel) {
    	margin: 0;
    	padding: 0;
	}
	.pageContent :global(.addPostPanel .newMessageArea) {
		padding-right: 106px;
	}
</style>
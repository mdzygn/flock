<script>
    import locale from '../../locale';

	import { tick } from 'svelte';

    import { get, writable } from 'svelte/store';
    
	import { stopEvent } from '../../utils';

    import PostTypes from '../../config/PostTypes';

    import Proxy from '../../components/Proxy.svelte';

    import ContentPanel from './ContentPanel.svelte';
    import ChannelListItem from './ChannelListItem.svelte';
	import ContentLoader from './ContentLoader.svelte';

	import PostItem from './PostItem.svelte';
    
	import AddPost from '../posts/_components/AddPost.svelte';
	import EditPost from '../posts/_components/EditPost.svelte';

	import {
		getIsProjectTeamMember,
        showBetaFeatures,
        user,
        projectId,
    } from '../../models/appModel';

    import {
		checkLoggedIn,
	} from '../../actions/appActions';

	import {
		getChannels,
        getDefaultChannel,
        getIsTeamManagedChannel,
        loadingChannels,
        getIsBaseDisplayChannel,
    } from '../../models/channelsModel';

	import {
		getPosts,
		loadingPosts,
	} from '../../models/postsModel';

	import {
		projectToggleFollowing,
	} from '../../actions/projectActions';

    import ChannelsBar from './ChannelsBar.svelte';

    export let project;

    export let displayInline = false;

    let channels = writable(null);
    $: { channels = $project && getChannels( { projectId: $project.id } ) };

	$: isNew = (isTeamMember && $project && $project.isNew) || false;
    $: isTeamMember = $user && getIsProjectTeamMember($project);
    $: canEdit = (isTeamMember && !$project.archived) || false;
    $: following = ($project && $project.following) || false;
    $: isArchived = (isTeamMember && $project && $project.archived) || false;
    $: viewAllChannels = following || isTeamMember;
    $: channelsLoading = $loadingChannels && !$channels;

	$: sortByCreated = false; // ($curChannel && $curChannel.sortByCreated) || false;

    let currentChannelId = null;
    let currentChannelTitle = null;
    $: currentChannelTargetTitle = currentChannelTitle || 'General';

    $: defaultChannel = $channels && getDefaultChannel();
    $: targetChannelId = currentChannelId || ($defaultChannel && $defaultChannel.id);

    const MAX_DISPLAY_POSTS = 3;

    let posts = writable([]);
	$: { posts = getPosts( { projectId: $projectId, type: 'thread', channelId: currentChannelId, sortByCreated, limit: MAX_DISPLAY_POSTS} ) }; //channelId: $channelId,

	$: canPost = isTeamMember && !isArchived;
	// $: canPost = $curChannel && (!$curChannel.teamOnly || isTeamMember) && !isArchived;
    
    let hasActiveChannels = true; // false;
    let hasInactiveChannels = false;

    $: {
        let hasActiveChannel = false;
        let hasInactiveChannel = false;
        let channel;
        if ($channels) {
            for (let i = 0; i < $channels.length; i++) {
                channel = get($channels[i]);
                if (channel.postCount || getIsBaseDisplayChannel(channel) ) {
                    hasActiveChannel = true;
                    // break;
                } else {
                    hasInactiveChannel = true;
                }
            }
        }
        hasActiveChannels = hasActiveChannel;
        hasInactiveChannels = hasInactiveChannel;
    }

    let areMoreItems = false;

    let canPostInChannel = true; // TODO: base on current channel postable

	export let showAddPost = false;
	let newPostMessageField = null;

	let newPostMessage = '';

    async function newPost(event) {
        stopEvent(event);
        if (!checkLoggedIn()) { return; }
        
        showAddPost = true;

        if (newPostMessageField) {
        	await tick();
        	newPostMessageField.focus();
        }
    }

	function hideAddPostPanel() {
		showAddPost = false;
	}

    function onChannelTagSelect(channelId) {
        currentChannelId = channelId;
    }
</script>

<!-- {#if $channels && $channels.length} -->
    <!-- && (hasActiveChannels || isTeamMember || following) -->
    <div class="discussionFeed" class:isEditable="{canEdit}" class:channelsActive="{channelsLoading || hasActiveChannels || viewAllChannels}" class:displayInline>
        <!-- <Proxy image="{proxyChannelsImage}" className="proxyOverlay" /> -->
        <ContentPanel title="{locale.PROJECT.CHANNELS_TITLE}" titleOnClick="{!displayInline ? 'projects/'+$projectId+'/channels' : null}" showEdit="{canEdit && $showBetaFeatures}" showMoreAction="{areMoreItems}">
            {#if !isArchived && !displayInline}
                {#if (!hasActiveChannels || isNew) && viewAllChannels}
                    {#if isTeamMember}
                        <div class="getTheConversationStarted getStartedOwner" class:getStartedOwnerOffset="{canEdit && $showBetaFeatures}">{locale.PROJECT.GET_STARTED}</div>
                    {:else}
                        <div class="getTheConversationStarted">{locale.PROJECT.FOLLOWER_GET_STARTED}</div>
                    {/if}
                {:else}
                    <div class="getTheConversationStarted">{locale.PROJECT.GET_INVOLVED}</div>
                {/if}
            {/if}

            {#if channelsLoading}
                <ContentLoader label="{locale.LOADING.CHANNELS}" />
            {:else}
                <ChannelsBar {project} bind:currentChannelId="{currentChannelId}" bind:currentChannelTitle="{currentChannelTitle}" />

                {#if $posts && $posts.length}
                    <div class="postsContainer">
                        {#each $posts as post}
                            <PostItem {post} showChannelTags="{!currentChannelId}" onChannelSelect="{onChannelTagSelect}" />
                        {/each}
                        <!-- {:else}

                            {#if $loadingPosts && (!$posts || !$posts.length) }
                                <ContentLoader label="{locale.LOADING.CHANNEL_ITEMS}" />
                            {:else}
                                <ContentLoader>{locale.CHANNEL.NO_POSTS}
                                    {#if canPost}<br/>be the first to <a href="/posts/new" on:click="{(e) => { newPost(); return stopEvent(e); }}">Add a Post</a>{/if}
                                </ContentLoader>
                            {/if}
                        {/each} -->
                    </div>
                {:else}
                    {#if !showAddPost}
                        {#if $loadingPosts && (!$posts || !$posts.length) }
                            <ContentLoader label="{locale.LOADING.CHANNEL_ITEMS}" />
                        {:else}
                            <ContentLoader>{locale.CHANNEL.NO_POSTS}
                                {#if canPost}<br/>be the first to <a href="/posts/new" on:click="{(e) => { newPost(); return stopEvent(e); }}">Add a Post</a>{/if}
                            </ContentLoader>
                        {/if}
                    {/if}
                {/if}

                {#if canPostInChannel}
                    {#if !showAddPost}
                        <AddPost newPostMessage="{newPostMessage}" onClick="{newPost}" placeholderLabel="{locale.PROJECT.POST_DISCUSSION_PLACEHOLDER + currentChannelTargetTitle + locale.PROJECT.POST_DISCUSSION_PLACEHOLDER_AFFIX}" submitLabel="{locale.PROJECT.POST_DISCUSSION_ACTION}" />
                    {/if}
                    <EditPost targetPostType="{PostTypes.THREAD}" targetChannelId="{targetChannelId}" shown="{showAddPost}" bind:message="{newPostMessage}" bind:messageField="{newPostMessageField}" inlineComponent="{true}" smallNextButton="{true}" submitLabel="{locale.PROJECT.POST_DISCUSSION_ACTION}" on:hide="{hideAddPostPanel}" />
                {/if}
            {/if}
        </ContentPanel>
    </div>
<!-- {/if} -->

<style>
	/* .discussionFeed :global(.proxyOverlay) {
		position: absolute;
		opacity: 0.5;
	} */

	.discussionFeed :global(.panelContent) {
		position: relative;
	}

	.discussionFeed :global(.contentLoader) {
        padding: 0 20px;
        font-size: 1.2rem;
	}

    .discussionFeed :global(.contentPanel) {
        /* background-color: rgba(255, 255, 255, 0.25); */
        padding: 20px 0;
    }

    .getTheConversationStarted {
        position: absolute;
        top: -30px;

        right: 20px;
        color: #aaaaaa;

        font-size: 1.3rem;
    }

    /* .discussionFeedContainer {
        border-bottom: 1px solid #eeeeee;
    }
    .discussionFeedContainer :global(.discussionFeedItem) {
        border-top: 1px solid #eeeeee;
    }

    .channelsFollowCta {
        padding-top: 0px;
        padding-left: 20px;
        padding-bottom: 0px;
        font-size: 1.2rem;
        font-weight: initial;
        color: #999999;
    }
    .channelsActive .channelsFollowCta {
        padding-top: 10px;
    } */

    .getStartedOwner {
        /* right: 41px; */
        font-weight: 700;
		color: #DF3C3C;
    }

    .getStartedOwnerOffset {
        right: 56px;
    }

	.discussionFeed :global(.contentPanel .panelTitle) {
        padding-left: 20px;
        padding-bottom: 10px;
        margin-top: -5px;
	}
	.discussionFeed.channelsActive :global(.contentPanel .panelTitle) {
        padding-left: 20px;
        padding-bottom: 10px;

        /* font-size: 1.3rem;
        font-weight: initial; */

        margin-top: -4px;
	}
	.discussionFeed :global(.contentPanel .showMoreButton ) {
        padding-left: 30px;
        margin-top: 5px;
	}

    /* .discussionFeed :global(.showMoreButton) {
        padding-top: 16px;
    } */

    .discussionFeed :global(.editButton) {
        top: 0;
        bottom: 5px;
    }

	.postsContainer {
    	/* padding-top: 5px; */
		border-top: 2px solid #EEEEEE;

        /* background-color: #DDDDDD; */
	}

    .postsContainer :global(.contentLoader) {
        background-color: #f2f2f2;
        font-size: 1.3rem;
        line-height: 2.2rem;
    }

    .postsContainer :global(.contentLoader) {
        background-color: #f2f2f2;
        font-size: 1.3rem;
        line-height: 2.2rem;
    }
    .postsContainer :global(.postItem) {
    	margin-bottom: 0;
		border-bottom: 2px solid #EEEEEE;
	}

    .discussionFeed :global(.addPostPanel) {
    	margin-bottom: -20px;
	}

	.discussionFeed :global(.editPostContent.inlineComponent) {
        position: initial;
        box-shadow: initial;
	}

.discussionFeed :global(.editPostContent.inlineComponent .panelContent) {
    padding-top: 5px;
}

.discussionFeed :global(.editPostContent.inlineComponent .pageTitle) {
    /* font-size: 1.3rem; */
    padding-bottom: 5px;
}

.discussionFeed :global(.editPostContent.inlineComponent .collapsePanel) {
    top: -5px;
} 

.discussionFeed :global(.editPostContent.inlineComponent .addImage) {
    right: 76px;
}
</style>
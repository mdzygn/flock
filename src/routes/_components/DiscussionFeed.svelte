<script>
    import locale from '../../locale';

	import { tick } from 'svelte';

    import { get, writable } from 'svelte/store';
    
	import { stopEvent, gotoAnchor } from '../../utils';

    import Button from '../../components/Button.svelte';

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
		loadChannel,
	} from '../../actions/appActions';

	import {
		getChannels,
        getDefaultChannel,
        getIsTeamManagedChannel,
        loadingChannels,
        getIsBaseDisplayChannel,
		getChannelDefaultDescription,
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

    $: defaultChannel = $channels && getDefaultChannel({projectId: $projectId});
    $: targetChannelId = currentChannelId || ($defaultChannel && $defaultChannel.id);
    
    $: curChannel = targetChannelId && $channels && getCurChannel(targetChannelId);
    // $: curChannel = currentChannelId && $channels && getCurChannel(currentChannelId);

    $: currentChannelTargetTitle = curChannel && $curChannel && $curChannel.title || 'General';
	$: channelDescription = currentChannelId && curChannel && $curChannel && ($curChannel.description || getChannelDefaultDescription($curChannel));


    function onChannelSelected(newChannelId) {
        currentChannelId = newChannelId;
    }

    function getCurChannel(channelId) {
		return $channels.find(match => get(match).id === channelId);
    }

    const DEFAULT_DISPLAY_POSTS = 3;
    const INCREMENT_DISPLAY_POSTS = 5;
    let curNumDisplayPosts = DEFAULT_DISPLAY_POSTS;

    $: {
        currentChannelId;
        resetNumDisplayPosts();
    }

    let posts = writable([]);
	$: { posts = getPosts( { projectId: $projectId, type: 'thread', channelId: currentChannelId, sortByCreated, limit: curNumDisplayPosts + 1} ) }; //get one more to be able to check if there are more posts available

    $: areMoreItems = $posts && ($posts.length > curNumDisplayPosts);

    function resetNumDisplayPosts() {
        curNumDisplayPosts = DEFAULT_DISPLAY_POSTS;
    }

	$: canPost = curChannel && $curChannel && (!$curChannel.teamOnly || isTeamMember) && !isArchived;
	// $: canPost = (isTeamMember || !curChannel || ($curChannel && !$curChannel.teamOnly)) && !isArchived;
	// $: canPost = isTeamMember && !isArchived;
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
        gotoAnchor('discussions');
        currentChannelId = channelId;
    }

    function viewAllPosts() {
        if (currentChannelId) {
            loadChannel(currentChannelId);
        }
    }

    function showMorePosts() {
        curNumDisplayPosts += INCREMENT_DISPLAY_POSTS;
    }
</script>

{#if isTeamMember || ($channels && $channels.length)}
    <!-- && (hasActiveChannels || isTeamMember || following) -->
    <div id="discussions" class="discussionFeed" class:isEditable="{canEdit}" class:channelsActive="{channelsLoading || hasActiveChannels || viewAllChannels}" class:displayInline>
        <!-- <Proxy image="{proxyChannelsImage}" className="proxyOverlay" /> -->
        <!-- titleOnClick="{!displayInline ? 'projects/'+$projectId+'/channels' : null}" -->
        <ContentPanel title="{locale.PROJECT.CHANNELS_TITLE}" showEdit="{canEdit && $showBetaFeatures}">
            <Button className="viewAllChannels" onClick="{'projects/'+$projectId+'/channels'}">{locale.CHANNEL.VIEW_ALL_CHANNELS}</Button>

            <!-- {#if !isArchived && !displayInline}
                {#if (!hasActiveChannels || isNew) && viewAllChannels}
                    {#if isTeamMember}
                        <div class="getTheConversationStarted getStartedOwner" class:getStartedOwnerOffset="{canEdit && $showBetaFeatures}">{locale.PROJECT.GET_STARTED}</div>
                    {:else}
                        <div class="getTheConversationStarted">{locale.PROJECT.FOLLOWER_GET_STARTED}</div>
                    {/if}
                {:else}
                    <div class="getTheConversationStarted">{locale.PROJECT.GET_INVOLVED}</div>
                {/if}
            {/if} -->

            {#if channelsLoading}
                <ContentLoader label="{locale.LOADING.CHANNELS}" />
            {:else}
                <ChannelsBar {project} bind:currentChannelId="{currentChannelId}" />

                {#if channelDescription}
                    <div class="channelHeader">
                        <div class="channelHeaderDescription">{@html channelDescription}</div>
                        {#if areMoreItems}
                            <Button className="viewAllPostsButton" onClick="{viewAllPosts}">{locale.CHANNEL.VIEW_ALL_POSTS}</Button>
                        {/if}
                    </div>
                {/if}

                {#if $posts && $posts.length}
                    <div class="postsContainer">
                        {#each $posts as post, index}
                            {#if index < curNumDisplayPosts}
                                <PostItem {post} showChannelTags="{!currentChannelId}" onChannelSelect="{onChannelTagSelect}" />
                            {/if}
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
                    {#if areMoreItems}
                        <div class="postsFooter">
                            <Button className="showMorePostsButton" onClick="{showMorePosts}">{locale.CHANNEL.SHOW_MORE_POSTS}</Button>
                        </div>
                    {/if}
                {:else}
                    {#if !showAddPost}
                        {#if $loadingPosts && (!$posts || !$posts.length) }
                            <ContentLoader label="{locale.LOADING.CHANNEL_ITEMS}" />
                        {:else}
                            <ContentLoader>{currentChannelId ? locale.CHANNEL.NO_POSTS : locale.CHANNEL.ALL_CHANNELS_NO_POSTS}
                                <!-- {#if canPost}<br/>be the first to <a href="/posts/new" on:click="{(e) => { newPost(); return stopEvent(e); }}">Add a Post</a>{/if} -->
                            </ContentLoader>
                        {/if}
                    {/if}
                {/if}

                {#if canPost}
                    {#if !showAddPost}
                        {#if !isArchived && !displayInline}
                            {#if (!hasActiveChannels || isNew) && viewAllChannels}
                                {#if isTeamMember}
                                    <div class="getTheConversationStarted getStartedOwner">{locale.PROJECT.GET_STARTED}</div>
                                {:else}
                                    <div class="getTheConversationStarted">{locale.PROJECT.FOLLOWER_GET_STARTED}</div>
                                {/if}
                            {:else}
                                <div class="getTheConversationStarted">{locale.PROJECT.GET_INVOLVED}</div>
                            {/if}
                        {/if}
                        <AddPost newPostMessage="{newPostMessage}" onClick="{newPost}" placeholderLabel="{locale.PROJECT.POST_DISCUSSION_PLACEHOLDER + currentChannelTargetTitle + locale.PROJECT.POST_DISCUSSION_PLACEHOLDER_AFFIX}" submitLabel="{locale.PROJECT.POST_DISCUSSION_ACTION}" />
                    {/if}
                    <EditPost targetPostType="{PostTypes.THREAD}" bind:targetChannelId="{targetChannelId}" shown="{showAddPost}" bind:message="{newPostMessage}" bind:messageField="{newPostMessageField}" inlineComponent="{true}" showChannelSelect="{true}" {channels} smallNextButton="{true}" submitLabel="{locale.PROJECT.POST_DISCUSSION_ACTION}" on:hide="{hideAddPostPanel}" onChannelSelected="{onChannelSelected}" />
                {/if}
            {/if}
        </ContentPanel>
    </div>
{/if}

<style>
	/* .discussionFeed :global(.proxyOverlay) {
		position: absolute;
		opacity: 0.5;
	} */

	.discussionFeed :global(.panelContent) {
		position: relative;
	}

	.discussionFeed :global(.contentLoader) {
        /* padding: 0 20px; */
        font-size: 1.2rem;
        
        padding: 0 16px;
        font-size: 1.2rem;
        padding-top: 12px;
        padding-bottom: 10px;

        border-top: 2px solid #EEEEEE;
        border-bottom: 2px solid #EEEEEE;
	}

    .discussionFeed :global(.contentPanel) {
        /* background-color: rgba(255, 255, 255, 0.25); */
        padding: 20px 0;
    }

    .discussionFeed :global(.viewAllChannels) {
        position: absolute;
        top: -30px;

        right: 20px;
        color: #666666;
        /* color: #aaaaaa; */

        font-size: 1.3rem;
        font-weight: 700;
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

    /* .getStartedOwnerOffset {
        right: 56px;
    } */

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

    /* .postsContainer :global(.contentLoader) {
        background-color: #f2f2f2;
        font-size: 1.3rem;
        line-height: 2.2rem;
    } */

    .postsContainer :global(.postItem) {
    	margin-bottom: 0;
		border-bottom: 2px solid #EEEEEE;
	}

    .discussionFeed :global(.contentPanel .addPostPanel) {
    	margin-bottom: -20px;
        padding-top: 0;
	}

	.discussionFeed :global(.editPostContent.inlineComponent) {
        position: initial;
        box-shadow: initial;

        margin-top: 5px;
	}

    .discussionFeed :global(.editPostContent.inlineComponent .panelContent) {
        padding-top: 5px;
        margin-bottom: -20px;
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

    .channelHeader {
        position: relative;
    }

    .channelHeaderDescription {
        border-top: 1px solid #EEEEEE;

        padding: 6px 16px;
        padding-right: 65px;

        font-size: 1.3rem;
        color: #666666;

        overflow-wrap: break-word;
        word-wrap: break-word;
    }

    .discussionFeed :global(.viewAllPostsButton) {
        display: block;
        position: absolute;

        top: 7px;
        right: 18px;

        font-size: 1.3rem;
        font-weight: 700;

        color: #666666;
    }

    .postsFooter {
        position: relative;

        display: flex;
        flex-direction: column;
        
        border-bottom: 2px solid #EEEEEE;
        margin-top: -5px;
    }

    .discussionFeed :global(.showMorePostsButton) {
        /* display: block;
        position: absolute;

        top: 7px;
        right: 10px; */

        font-size: 1.3rem;
        font-weight: 700;

        padding: 5px;
        padding-right: 18px;
        align-self: flex-end;
        
        color: #666666;
    }

    .getTheConversationStarted {
        position: initial;
        top: initial;
        right: initial;

        padding: 9px 15px;
        padding-bottom: 4px;
        /* padding-top: 0; */

        color: #999999;
        font-size: 1.3rem;
    }

    .getStartedOwner {
        /* right: 41px; */
        font-weight: 700;
        color: #DF3C3C;
    }
</style>
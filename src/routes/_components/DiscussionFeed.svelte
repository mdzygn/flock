<script>
    import locale from '../../locale';

    import { get, writable } from 'svelte/store';
    
	import { stopEvent } from '../../utils';

    import Proxy from '../../components/Proxy.svelte';

    import ContentPanel from './ContentPanel.svelte';
    import ChannelListItem from './ChannelListItem.svelte';
	import ContentLoader from './ContentLoader.svelte';

	import PostItem from './PostItem.svelte';

	import {
		getIsProjectTeamMember,
        showBetaFeatures,
        user,
        projectId,
    } from '../../models/appModel';

	import {
		getChannels,
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

    //$: curChannelId = 
    //$: curChannel
    
	$: sortByCreated = false; // ($curChannel && $curChannel.sortByCreated) || false;

    const MAX_DISPLAY_POSTS = 3;

    let posts = writable([]);
	$: { posts = getPosts( { projectId: $projectId, type: 'thread', sortByCreated, limit: MAX_DISPLAY_POSTS} ) }; //channelId: $channelId,

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

    async function newPost(event) {
        stopEvent(event);
        if (!checkLoggedIn()) { return; }
        
        // showAddPost = true;

        // if (newPostMessageField) {
        // 	await tick();
        // 	newPostMessageField.focus();
        // }
    }

	// function followProject() {
    //     if ($project) {
    //         projectToggleFollowing($project.id);
    //     }
	// }

    // let proxyChannelsImage;

	// $: {
	// 	if (isTeamMember) {
	// 		if (isNew) {
	// 			proxyChannelsImage = 'project_channels_populate';
	// 		} else {
	// 			proxyChannelsImage = 'project_channels_owner';
	// 		}
	// 	} else {
	// 		if (following) {
	// 			proxyChannelsImage = 'project_channels_following';
	// 		} else {
	// 			proxyChannelsImage = 'project_channels';
	// 		}
	// 	}
	// }
</script>

<!-- {#if $channels && $channels.length} -->
    <!-- && (hasActiveChannels || isTeamMember || following) -->
    <div class="channelList" class:isEditable="{canEdit}" class:channelsActive="{channelsLoading || hasActiveChannels || viewAllChannels}" class:displayInline>
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
                <ChannelsBar filterString="" />

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
                
                <!-- {#if $channels && $channels.length && (hasActiveChannels || viewAllChannels)}
                    <div class="channelListContainer">
                        {#each $channels as channel}
                            {#if isTeamMember || get(channel).postCount || getIsBaseDisplayChannel(get(channel)) || (following && !getIsTeamManagedChannel(get(channel)))}
                                <ChannelListItem channel="{channel}" />
                            {/if}
                        {/each}
                    </div>
                {/if}
                {#if (hasInactiveChannels && !following && !isTeamMember) && !isArchived}
                    <div class="channelsFollowCta"><a href="{location.href}" on:click="{followProject}">{@html locale.PROJECT.CHANNELS_FOLLOW_LINK}</a>{@html hasActiveChannels ? locale.PROJECT.CHANNELS_FOLLOW_ALL : locale.PROJECT.CHANNELS_FOLLOW}</div>
                {/if} -->
            {/if}
        </ContentPanel>
    </div>
<!-- {/if} -->

<style>
	/* .channelList :global(.proxyOverlay) {
		position: absolute;
		opacity: 0.5;
	} */

	.channelList :global(.panelContent) {
		position: relative;
	}

	.channelList :global(.contentLoader) {
        padding: 0 20px;
        font-size: 1.2rem;
	}

    .channelList :global(.contentPanel) {
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

    /* .channelListContainer {
        border-bottom: 1px solid #eeeeee;
    }
    .channelListContainer :global(.channelListItem) {
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

	.channelList :global(.contentPanel .panelTitle) {
        padding-left: 20px;
        padding-bottom: 10px;
        margin-top: -5px;
	}
	.channelList.channelsActive :global(.contentPanel .panelTitle) {
        padding-left: 20px;
        padding-bottom: 10px;

        /* font-size: 1.3rem;
        font-weight: initial; */

        margin-top: -4px;
	}
	.channelList :global(.contentPanel .showMoreButton ) {
        padding-left: 30px;
        margin-top: 5px;
	}

    /* .channelList :global(.showMoreButton) {
        padding-top: 16px;
    } */

    .channelList :global(.editButton) {
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

</style>
<script>
    import locale from '../../locale';

    import { get, writable } from 'svelte/store';

    import Proxy from '../../components/Proxy.svelte';

    import ContentPanel from './ContentPanel.svelte';
    import ChannelListItem from './ChannelListItem.svelte';
	import ContentLoader from './ContentLoader.svelte';

	import {
		getIsProjectTeamMember,
        showBetaFeatures,
        user,
        projectId,
    } from '../../models/appModel';

	import {
		getChannels,
        // getIsTeamManagedChannel,
        loadingChannels,
        getIsBaseDisplayChannel,
        displayChannelForUser
    } from '../../models/channelsModel';

	import {
		projectToggleFollowing,
	} from '../../actions/projectActions';

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

	function followProject() {
        if ($project) {
            projectToggleFollowing($project.id);
        }
	}

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
                {#if $channels && $channels.length && (hasActiveChannels || viewAllChannels)}
                    <div class="channelListContainer">
                        {#each $channels as channel}
                            <!-- {#if isTeamMember || get(channel).postCount || getIsBaseDisplayChannel(get(channel)) || (following && !getIsTeamManagedChannel(get(channel)))} -->
                            {#if displayChannelForUser(channel, project)}
                                <ChannelListItem channel="{channel}" />
                            {/if}
                        {/each}
                    </div>
                <!-- {:else}
                    <ContentLoader label="This project has no channels" /> -->
                {/if}
                {#if (hasInactiveChannels && !following && !isTeamMember) && !isArchived}
                    <div class="channelsFollowCta"><a href="{location.href}" on:click="{followProject}">{@html locale.PROJECT.CHANNELS_FOLLOW_LINK}</a>{@html hasActiveChannels ? locale.PROJECT.CHANNELS_FOLLOW_ALL : locale.PROJECT.CHANNELS_FOLLOW}</div>
                {/if}
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

    .channelListContainer {
        border-bottom: 1px solid #eeeeee;
    }
    .channelListContainer :global(.channelListItem) {
        border-top: 1px solid #eeeeee;
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
    }

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
</style>
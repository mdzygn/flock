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
    } from '../../models/appModel';

	import {
		getChannels,
    } from '../../models/channelsModel';

    export let project;

    let channels = writable([]);
    $: { channels = $project && getChannels( { projectId: $project.id } ) };

	$: isNew = (isTeamMember && $project && $project.isNew) || false;
    $: isTeamMember = $user && getIsProjectTeamMember($project);
    $: canEdit = (isTeamMember && !$project.archived) || false;
    $: following = ($project && $project.following) || false;

    let hasActiveChannels = true; // false;

    $: {
        let hasActiveChannel = false;
        for (let i = 0; i < $channels.length; i++) {
            if (get($channels[i]).postCount) {
                hasActiveChannel = true;
                break;
            }
        }
        hasActiveChannels = hasActiveChannel;
    }

    let areMoreItems = false;

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

{#if $channels && $channels.length && (hasActiveChannels || isTeamMember || following)}
    <div class="channelList" class:isEditable="{canEdit}">
        <!-- <Proxy image="{proxyChannelsImage}" className="proxyOverlay" /> -->
        <ContentPanel title="Channels" showEdit="{canEdit && $showBetaFeatures}" showMoreAction="{areMoreItems}">
            {#if !hasActiveChannels || isNew}
                {#if isTeamMember}
                    <div class="getTheConversationStarted getTheConversationStartedOwner">{locale.PROJECT.GET_STARTED}</div>
                {:else}
                    <div class="getTheConversationStarted">{locale.PROJECT.FOLLOWER_GET_STARTED}</div>
                {/if}
            {/if}
            <!-- {#if $channels && $channels.length} -->
                <div class="channelListContainer">
                    {#each $channels as channel}
                        {#if (isTeamMember || following) || get(channel).postCount}
                            <ChannelListItem channel="{channel}" />
                        {/if}
                    {/each}
                </div>
            <!-- {:else}
                <ContentLoader label="This project has no channels" />
            {/if} -->
        </ContentPanel>
    </div>
{/if}

<style>
	/* .channelList :global(.proxyOverlay) {
		position: absolute;
		opacity: 0.5;
	} */

	.channelList :global(.panelContent ) {
		position: relative;
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

    .getTheConversationStartedOwner {
        /* right: 41px; */
        font-weight: 700;
		color: #DF3C3C;
    }

	.channelList :global(.contentPanel .panelTitle) {
        padding-left: 20px;
        padding-bottom: 10px;

        font-size: 1.3rem;
        font-weight: initial;
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
<script>
    import Proxy from '../../components/Proxy.svelte';

    import ContentPanel from './ContentPanel.svelte';
    import ChannelListItem from './ChannelListItem.svelte';

    import channelsData from '../../data/channels.json';

	import {
		getIsProjectTeamMember,
		showBetaFeatures,
    } from '../../models/appModel';

    export let project;

	$: isNew = ($project && $project.isNew) || false;
    $: isTeamMember = getIsProjectTeamMember($project);
    $: canEdit = (isTeamMember && !$project.archived) || false;

    let areMoreItems = false;

    let proxyChannelsImage;

	$: {
		if (isTeamMember) {
			if (isNew) {
				proxyChannelsImage = 'project_channels_populate';
			} else {
				proxyChannelsImage = 'project_channels_owner';
			}
		} else {
			if (following) {
				proxyChannelsImage = 'project_channels_following';
			} else {
				proxyChannelsImage = 'project_channels';
			}
		}
	}
</script>

<div class="channelList" class:isEditable="{canEdit}">
    <!-- <Proxy image="{proxyChannelsImage}" className="proxyOverlay" onClick="{e => loadChannel('7m2ldksm')}" /> -->
    <ContentPanel title="Channels" showEdit="{canEdit && $showBetaFeatures}" showMoreAction="{areMoreItems}">
        <div class="channelListContainer">
            {#each channelsData as channel}
                <ChannelListItem channel="{channel}" />
            {/each}
        </div>
    </ContentPanel>
</div>

<style>
	/* .channelList :global(.proxyOverlay) {
		position: absolute;
		opacity: 0.5;
	} */

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
        top: initial;
        bottom: 5px;
    }
</style>
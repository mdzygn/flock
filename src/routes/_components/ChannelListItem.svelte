<script>
    import Button from '../../components/Button.svelte';
    import Counter from '../_components/Counter.svelte';

    import ArrowIcon from "../../assets/icons/next_arrow.png";
	import AddDetailsIcon from "../../assets/icons/add_highlight.png";
    import CommentIcon from "../../assets/icons/comment_small.png";

	import {
        project,
        getIsProjectTeamMember,
        user,
	} from '../../models/appModel';

	import {
		getIsPrimaryChannel,
	} from '../../models/channelsModel';

	import {
		getUnviewedChannelNotificationCount,
	} from '../../models/notificationsModel';

	import {
		loadChannel,
	} from '../../actions/appActions';

    export let channel;

    $: channelTitle = ($channel && $channel.title) || '';
    $: channelId = ($channel && $channel.id) || null;

    $: messageCount = ($channel && $channel.postCount) || 0;
    $: unviewedCount = ($channel && getUnviewedChannelNotificationCount($channel.id)) || writable(0);

    $: isTeamMember = $user && getIsProjectTeamMember($project);

    $: isNew = ($project && $project.isNew) || false;
	$: isArchived = (isTeamMember && $project && $project.archived) || false;

    $: isPrimaryChannel = getIsPrimaryChannel($channel);

    function loadCurrentChannel() {
        if (channelId) {
            loadChannel(channelId);
        }
    }
</script>

<div class="channelListItem" class:noPosts="{!messageCount}">
    <Button className="channelListItemButton" onClick="{loadCurrentChannel}"># {channelTitle}
        {#if $unviewedCount || messageCount}
            <div class="postsIcon" style="background-image: url({CommentIcon})"/>
        {/if}
        <div class="buttonIcon" style="background-image: url({ArrowIcon})"/>
        {#if $unviewedCount || messageCount}
            <Counter count="{$unviewedCount || messageCount}" hasNew="{$unviewedCount}" />
        {:else if isTeamMember && isPrimaryChannel && !isArchived}
			<Button className="addFirstPostCTA" icon="{AddDetailsIcon}">add first post</Button>
        {/if}
        <!-- <Counter count="{unreadMessageCount ? unreadMessageCount : messageCount}" hasNew="{unreadMessageCount}" /> -->
    </Button>
</div>

<style>

    .channelListItem :global(.channelListItemButton) {
        padding-top: 9px;
        padding-bottom: 6px;

    	padding-left: 20px;
    	padding-right: 16px;

		font-size: 1.6rem;
		font-weight: 700;
        color: #000000;
    }
    .channelListItem :global(.channelListItemButton:hover) {
        background-color: #f9f9f9;
    }

    .channelListItem :global(.channelListItemButton) {
        position: relative;
    }

    .channelListItem.noPosts :global(.channelListItemButton) {
        color: #666666;
    }

    .channelListItem :global(.channelListItemButton .counterContainer) {
        float: right;
        margin-right: 7px;
    }
    .channelListItem :global(.channelListItemButton .counter) {
    	margin-left: 42px;
    }
    .channelListItem :global(.channelListItemButton .counter.default) {
        background-color: initial;
    }

    .buttonIcon {
        float: right;
        background-size: cover;
        width: 18px;
        height: 21px;
    }

    .channelListItem :global(.addFirstPostCTA) {
        float: right;

        margin-right: 40px;

		font-size: 1.3rem;
        margin-top: 1px;
		font-weight: 700;

		color: #DF3C3C;
	}
    .channelListItem :global(.addFirstPostCTA .icon) {
    	padding-left: 16px;
        margin-top: -2px;
	}

    .postsIcon {
        position: absolute;
        right: 64px;
        top: 12px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        width: 17px;
        height: 17px;
    }
</style>
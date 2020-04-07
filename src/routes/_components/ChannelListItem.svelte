<script>
    import Button from '../../components/Button.svelte';
    import Counter from '../_components/Counter.svelte';

    import ArrowIcon from "../../assets/icons/next_arrow.png";
	import AddDetailsIcon from "../../assets/icons/add_highlight.png";

	import {
		project,
	} from '../../models/appModel';

	import {
		getIsPrimaryChannel,
	} from '../../models/channelsModel';

	import {
		loadChannel,
	} from '../../actions/appActions';

    export let channel;

    $: channelTitle = ($channel && $channel.title) || '';
    $: channelId = ($channel && $channel.id) || null;
    $: messageCount = ($channel && $channel.postCount) || 0;

    $: isNew = ($project && $project.isNew) || false;

    $: isPrimaryChannel = getIsPrimaryChannel($channel);

    function loadCurrentChannel() {
        if (channelId) {
            loadChannel(channelId);
        }
    }
</script>

<div class="channelListItem">
    <Button className="channelListItemButton" onClick="{loadCurrentChannel}"># {channelTitle}
        <div class="buttonIcon" style="background-image: url({ArrowIcon})"/>
        {#if messageCount}
            <Counter count="{messageCount}" />
        {:else if isNew && isPrimaryChannel}
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

    .channelListItem :global(.channelListItemButton .counterContainer) {
        float: right;
        margin-right: 7px;
    }
    .channelListItem :global(.channelListItemButton .counter) {
    	margin-left: 42px;
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
        margin-top: -2px;

		font-size: 1.5rem;
		font-weight: 700;

		color: #DF3C3C;
	}
    .channelListItem :global(.addFirstPostCTA .icon) {
    	padding-left: 16px;
	}
</style>
<script>
    import Button from '../../components/Button.svelte';
    import Counter from '../_components/Counter.svelte';

    import ArrowIcon from "../../assets/icons/next_arrow.png";

	import {
		loadChannel,
	} from '../../actions/appActions';

    export let channel;

    // const unreadMessageCount = 5;
    // const messageCount = 10;

    $: channelTitle = (channel && channel.title) || '';
    $: channelId = (channel && channel.id) || null;

    function loadCurrentChannel() {
        if (channelId) {
            loadChannel(channelId);
        }
    }
</script>

<div class="channelListItem">
    <Button onClick="{loadCurrentChannel}"># {channelTitle}
        <div class="buttonIcon" style="background-image: url({ArrowIcon})"/>
        <!-- <Counter count="{unreadMessageCount ? unreadMessageCount : messageCount}" hasNew="{unreadMessageCount}" /> -->
    </Button>
</div>

<style>

    .channelListItem :global(.button) {
        padding-top: 9px;
        padding-bottom: 6px;

    	padding-left: 20px;
    	padding-right: 16px;

		font-size: 1.6rem;
		font-weight: 700;
        color: #000000;
    }
    .channelListItem :global(.button:hover) {
        background-color: #f9f9f9;
    }

    .channelListItem :global(.button .counterContainer) {
        float: right;
        margin-right: 7px;
    }
    .channelListItem :global(.button .counter) {
    	margin-left: 42px;
    }

    .buttonIcon {
        float: right;
        background-size: cover;
        width: 18px;
        height: 21px;
    }
</style>
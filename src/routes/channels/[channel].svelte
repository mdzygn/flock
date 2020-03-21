<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';
	import NewPostButton from '../../components/NewPostButton.svelte';

	import { channelId } from '../../models/appModel';

	import { loadThread } from '../../actions/appActions.js';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView id="channel">
	<div class="content">
		<Proxy image="channel_actions" className="channelActions" />
		<Proxy image="channel_posts" className="channelPosts" onClick="{e => loadThread('sm2ld9p2')}" />
		<NewPostButton />
	</div>
</ScrollView>

<style>
	.content :global(.channelActions) {
		box-shadow: 0 2px 3px 0 rgba(0,0,0,0.12);
	}

	.content :global(.channelPosts) {
		margin-top: 5px;
	}

	.content {
		margin-bottom: 40px;
	}
</style>
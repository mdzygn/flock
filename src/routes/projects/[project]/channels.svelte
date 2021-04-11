<script>
	import locale from '../../../locale';

	import ScrollView from '../../../components/ScrollView.svelte';

	import ChannelList from '../../_components/ChannelList.svelte';

	import {
		project,
	} from '../../../models/appModel';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="content">
	<ScrollView id="messages">
		<ChannelList project="{project}" displayInline="{true}" titleLabel="{locale.CHANNELS.TITLE}" />
	</ScrollView>
</div>

<style>
	/* .content :global(.proxyOverlay) {
        position: absolute;
        opacity: 0.5;
	} */
</style>
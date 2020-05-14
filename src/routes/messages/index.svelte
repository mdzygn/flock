<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';

	import Hotspots from '../../components/Hotspots.svelte';
	import Hotspot from '../../components/Hotspot.svelte';

	import { loadConversation } from '../../actions/appActions';

	import ConversationList from '../_components/ConversationList.svelte';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="content">
	<ScrollView id="messages">
		<!-- <div class="proxyOverlay">
			<Hotspots>
				<Hotspot href="contacts" style="
					left: 7px;
					top: 5px;
					width: 44px;
					height: 40px;" />

				<Hotspot href="contacts" style="
					right: 5px;
					top: 4px;
					width: 50px;
					height: 48px;" />

				<Hotspot onClick="{e => loadConversation('a4kcmsd3')}" style="
					left: 0;
					top: 49px;
					width: 100%;
					height: 689px;" />
			</Hotspots>

			<Proxy image="messages" />
		</div> -->

		<ConversationList />
	</ScrollView>
</div>

<style>
	/* .content :global(.proxyOverlay) {
        position: absolute;
        opacity: 0.5;
	} */
</style>
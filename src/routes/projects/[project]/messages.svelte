<script>
	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';

	import Hotspots from '../../../components/Hotspots.svelte';
	import Hotspot from '../../../components/Hotspot.svelte';

	import { project } from '../../../models/appModel';

	import { loadConversation } from '../../../actions/appActions';

	$: projectTitleString = ($project && $project.title && $project.title + ' - ') || '';

	// import NotificationList from '../../_components/NotificationList.svelte';
</script>

<svelte:head>
	<title>{projectTitleString}Flock</title>
</svelte:head>

<div class="content">
	<ScrollView id="messages">
		<div class="proxyOverlay">
			<Hotspots>
				<!-- Connections -->
				<Hotspot href="contacts" style="
					left: 7px;
					top: 5px;
					width: 44px;
					height: 40px;" />

				<!-- New Message -->
				<!-- <Hotspot onClick="{e => loadConversation('a4kcmsd3')}" style=" -->
				<Hotspot href="contacts" style="
					right: 5px;
					top: 4px;
					width: 50px;
					height: 48px;" />

				<!-- Load Conversation -->
				<Hotspot onClick="{e => loadConversation('a4kcmsd3')}" style="
					left: 0;
					top: 49px;
					width: 100%;
					height: 281px;" />
			</Hotspots>

			<Proxy image="messages_group" />
		</div>

		<!-- <ConversationList /> -->
	</ScrollView>
</div>

<style>
	.content :global(.proxyOverlay) {
        position: absolute;
        opacity: 0.5;
	}
</style>
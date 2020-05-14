<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import { conversation } from '../../models/appModel';
	import { loadProfile } from '../../actions/appActions';

	import ConversationView from '../_components/ConversationView.svelte';

	$: viewingGroupConversation = ($conversation && $conversation.isGroup) || false;
	$: isNewConversation = ($conversation && $conversation.isNew) || false;

	$: proxyMessageViewImage = viewingGroupConversation ? 'messages_group_view': 'message_view';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="messagesView">
	<ScrollView anchorToBottom="{true}" id="conversation">
		<div class="proxyOverlay">
			{#if isNewConversation}
				<div class="content">
					<Proxy image="message_new_message_profile" className="profileInfo" />
				</div>
			{:else}
				<Proxy image="{proxyMessageViewImage}">
					{#if viewingGroupConversation}
						<!-- Profiles -->
						<Hotspot onClick="{e => loadProfile('bl20a8lm')}" style="
							left: 6px;
							top: 25px;
							width: 50px;
							height: 307px;" />
					{:else}
						<!-- Profiles -->
						<Hotspot onClick="{e => loadProfile('bl20a8lm')}" style="
							left: 6px;
							top: 25px;
							width: 50px;
							height: 691px;" />
					{/if}
				</Proxy>
			{/if}
		</div>

		<ConversationView />
	</ScrollView>
</div>

<div class="messageInput">
	<Proxy image="message_input" />
</div>

<style>
	.messagesView :global(.proxyOverlay) {
        position: absolute;
        opacity: 0.5;
	}

	.messagesView {
		position: absolute;
		top: 0;
		bottom: 48px;
		width: 100%;
	}

	.messageInput {
		position: absolute;
    	bottom: 0;
	}

	.content {
		display: flex;
		justify-content: center;
	}

	.content :global(.profileInfo) {
		position: absolute;
		top: 60px;
		width: 217px;
	}
</style>
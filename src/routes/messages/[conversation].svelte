<script>
	import { tick } from 'svelte';
	import { writable } from 'svelte/store';

    import locale from '../../locale';

	import ScrollView from '../../components/ScrollView.svelte';

	import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import { loadProfile } from '../../actions/appActions';

    import ContentLoader from '../_components/ContentLoader.svelte';

	import ConversationView from '../_components/ConversationView.svelte';
	import MessageInput from '../_components/MessageInput.svelte';

    import {
        userId,
        conversationId,
        conversation,
	} from '../../models/appModel';

    import {
        loadingConversations,
    } from '../../models/conversationsModel';

	import MessagesModel, { getMessages, loadingMessages } from '../../models/messagesModel';

	import {
        loadCurrentConversation,
    } from '../../actions/appActions';

	loadCurrentConversation();

    export let messages = writable([]);
	$: { messages = $conversationId && getMessages({ conversationId: $conversationId }) };

    $: isLoadingMessages = $loadingMessages && (!$messages || !$messages.length);
    $: isLoadingConversation = $loadingConversations && (!$conversation || ($conversation.id !== $conversationId));

	$: viewingGroupConversation = ($conversation && $conversation.isGroup) || false;
	$: isNewConversation = ($conversation && $conversation.isNew) || false;

	$: proxyMessageViewImage = viewingGroupConversation ? 'messages_group_view': 'message_view';

	let scrollRegion;

	MessagesModel.on('messagedAdded', scrollToBottom);

	async function scrollToBottom() {
		if (scrollRegion) {
			await tick();

			if (scrollRegion) {
				scrollRegion.scrollTo(0, scrollRegion.scrollHeight);
			}
		}
	}
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="messagesView">
    {#if isLoadingMessages || isLoadingConversation}
        <ContentLoader label="{locale.LOADING.MESSAGES}" />
    {:else if !$messages || !$messages.length}
        <ContentLoader label="{locale.CONVERSATION.NO_MESSAGES}" />
        <!-- <div class="noMessages">
            {locale.CONVERSATION.NO_MESSAGES}
        </div> -->
    {:else}
		<ScrollView bind:scrollRegion="{scrollRegion}" anchorToBottom="{true}" id="conversation">
			<!-- <div class="proxyOverlay">
				{#if isNewConversation}
					<div class="content">
						<Proxy image="message_new_message_profile" className="profileInfo" />
					</div>
				{:else}
					<Proxy image="{proxyMessageViewImage}">
						{#if viewingGroupConversation}
							<Hotspot onClick="{e => loadProfile('bl20a8lm')}" style="
								left: 6px;
								top: 25px;
								width: 50px;
								height: 307px;" />
						{:else}
							<Hotspot onClick="{e => loadProfile('bl20a8lm')}" style="
								left: 6px;
								top: 25px;
								width: 50px;
								height: 691px;" />
						{/if}
					</Proxy>
				{/if}
			</div> -->

			<ConversationView {messages} />
		</ScrollView>
	{/if}
</div>

<MessageInput />

<style>
	.messagesView {
		position: absolute;
		top: 0;
		bottom: 54px;
		width: 100%;
	}
	.messagesView :global(.scrollContent) {
		display: flex;
		align-items: flex-end;
	}

    /* .noMessages {
        padding: 0 20px;
        font-size: 1.2rem;
        line-height: 1.8rem;
        padding-top: 10px;
        padding-bottom: 20px;
    } */

	/* .messagesView :global(.proxyOverlay) {
        position: absolute;
        opacity: 0.5;
	} */

	/* .content {
		display: flex;
		justify-content: center;
	}

	.content :global(.profileInfo) {
		position: absolute;
		top: 60px;
		width: 217px;
	} */
</style>
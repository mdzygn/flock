<svelte:window bind:innerHeight={viewHeight} bind:innerWidth={viewWidth} />

<script>
	import { tick, onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

    import config from '../../config';
    import locale from '../../locale';

	import ScrollView from '../../components/ScrollView.svelte';

	import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import { loadProfile } from '../../actions/appActions';

    import ContentLoader from '../_components/ContentLoader.svelte';

	import ConversationView from '../_components/ConversationView.svelte';
	import MessageInput from '../_components/MessageInput.svelte';

	import ConversationProfile from '../_components/ConversationProfile.svelte';

    import {
		userId,
		usercode,
        conversationId,
		conversation,
		newConversation
	} from '../../models/appModel';

    import ConversationsModel, {
		loadingConversations,
		setConversationSeenTimeout,
		clearConversationSeenTimeout,
    } from '../../models/conversationsModel';

	import MessagesModel, { getMessages, loadingMessages } from '../../models/messagesModel';

	import {
        loadCurrentConversation,
    } from '../../actions/appActions';

	loadCurrentConversation();

	let lastMessagesCount = 0;

    export let messages = writable(null); // []);
	$: {
		$conversation;
		updateMessage();
		// messages = ($conversation && getMessages({ conversationId: $conversationId }, messagesLoaded, $conversation.isNew)) || messages;
		// console.log('$conversationId', $conversationId, $messages);
		// messages = ($conversationId && getMessages({ conversationId: $conversationId }, messagesLoaded)) || messages;
	};

	$: {
		$userId; $usercode;
		loadCurrentConversation();
	}

	function updateMessage() {
		messages = ($conversation && getMessages({ conversationId: $conversationId }, null, $conversation.isNew)) || messages;
		// messages = ($conversation && getMessages({ conversationId: $conversationId }, messagesLoaded, $conversation.isNew)) || messages;
	}

	// $: {
	// 	$messages;
	// 	checkMessagesUpdated();
	// }

	$: {
		checkMessagesUpdated();

		// console.log('curConversation set seen?', $conversation, mounted, $messages, $messages && $messages.length);
		if ($conversation && mounted && $messages && $messages.length) { // !conversationSeenTimeout &&
			clearConversationSeenTimeout(conversationSeenTimeout);
			conversationSeenTimeout = setConversationSeenTimeout({conversationId: $conversationId});
		}
	}

	// $: console.log('messages', $messages);

    $: isLoadingMessages = $loadingMessages && !$messages; // (!$messages || !$messages.length);
	$: isLoadingConversation = $loadingConversations && (!$conversation || ($conversation.id !== $conversationId));
	$: isLoadingContent = (isLoadingMessages || isLoadingConversation) && !$newConversation;

	$: showMessageInput = !isLoadingContent && $userId && ($conversation || $newConversation);

	// $: { console.log('isLoadingContent', isLoadingContent, 'isLoadingMessages', isLoadingMessages, 'isLoadingConversation', isLoadingConversation, 'conversation', !!$conversation, 'messages', !!$messages, 'conv.id', $conversation && $conversation.id, '$conversationId', $conversationId); } // , '$conversation', $conversation

	// $: console.log('isLoadingConversation', isLoadingConversation, '$conversation', $conversation);

	$: viewingGroupConversation = ($conversation && $conversation.isGroup) || false;
	// $: isNewConversation = ($conversation && $conversation.isNew) || false;

	$: proxyMessageViewImage = viewingGroupConversation ? 'messages_group_view': 'message_view';

	let showMessagesAdded = false;

	let scrollRegion;

	let viewHeight, viewWidth;
	$: {
		if (viewHeight && viewWidth < config.MOBILE_DEVICE_MAX_WIDTH) { // if on mobile and height adjusted (keyboard shown)
			scrollToBottom();
		}
	}

	async function scrollToBottom() {
		if (scrollRegion) {
			await tick();

			if (scrollRegion) {
				scrollRegion.scrollTo(0, scrollRegion.scrollHeight);
			}
		}
	}

	async function checkMessagesUpdated() {
		if (scrollRegion) {
			if ($messages && $messages.length > lastMessagesCount) {
				// console.log('message added')
				if (scrollRegion.scrollTop + scrollRegion.offsetHeight > scrollRegion.scrollHeight - config.MIN_AUTO_SCROLL_BOTTOM_DIST) {
					await tick();
					scrollRegion.scrollTo(0, scrollRegion.scrollHeight);
				} else {
					showMessagesAdded = true;
				}
				clearConversationSeen();
			}
		}
		lastMessagesCount = $messages ? $messages.length : 0;
	}

	// async function messagesLoaded(result) {
	// 	checkMessagesUpdated();
	// 	clearConversationSeen();
	// }

	function onScroll() {
		if (showMessagesAdded && scrollRegion.scrollTop + scrollRegion.offsetHeight > scrollRegion.scrollHeight - config.MIN_HIDE_MESSAGES_BOTTOM_DIST) {
			showMessagesAdded = false;
		}
	}

	let mounted = false;
	let conversationSeenTimeout = null;

	onMount(() => {
		mounted = true;

		MessagesModel.on('messagedAdded', scrollToBottom);
		// ConversationsModel.on('conversationUpdated', conversationUpdated);

		// conversationSeenTimeout = setConversationSeenTimeout({conversationId: $conversationId});
	})

	onDestroy(() => {
		mounted = false;

		MessagesModel.off('messagedAdded', scrollToBottom);
		// ConversationsModel.off('conversationUpdated', conversationUpdated);

		clearConversationSeen();
	})

	// function conversationUpdated() {
	// 	// console.log('conversationUpdated');

	// 	if ($conversationId) {
	// 		messages = getMessages({ conversationId: $conversationId, getUnloaded: true }, messagesLoaded);
	// 	}
	// }

	function clearConversationSeen() {
		clearConversationSeenTimeout(conversationSeenTimeout); // force new timeout
		conversationSeenTimeout = null;
	}
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="content">
	<div class="messagesView">
		{#if isLoadingContent}
			<ContentLoader label="{locale.LOADING.MESSAGES}" />
		{:else if (!$messages || !$messages.length) && !$newConversation}
			<ContentLoader label="{locale.CONVERSATION.NO_MESSAGES}" />
			<!-- <div class="noMessages">
				{locale.CONVERSATION.NO_MESSAGES}
			</div> -->
		{:else}
			<ScrollView bind:scrollRegion="{scrollRegion}" onScroll="{onScroll}" anchorToBottom="{true}" id="conversation">
				{#if $newConversation}
					<ConversationProfile />
				{:else if $messages}
					<ConversationView {messages} />
				{/if}

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
			</ScrollView>
		{/if}

		{#if showMessagesAdded}
			<div class="messagesAddedIndicatorContainer">
				<div class="messagesAddedIndicator button" on:click="{scrollToBottom}">{locale.CONVERSATION.MESSAGES_ADDED}</div>
			</div>
		{/if}
	</div>

	{#if showMessageInput}
		<MessageInput />
	{/if}
</div>

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

	.button {
		cursor: pointer;
	}

	.messagesAddedIndicatorContainer {
		position: absolute;
    	width: 100%;
    	bottom: 2px;
		display: flex;
		justify-content: center;
	}

	.messagesAddedIndicator {
		font-size: 1.3rem;

		color: #ffffff;
        background-color: #DF3C3C;
		border-radius: 999px;
    	padding: 3px 10px;
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
</style>
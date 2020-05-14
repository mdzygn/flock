<script>
    import locale from '../../locale';

    import config from '../../config';

	import { get, writable } from 'svelte/store';

    import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import ContentPanel from './../_components/ContentPanel.svelte';
    import MessageItem from './MessageItem.svelte';
    import ContentLoader from './../_components/ContentLoader.svelte';

	import {
        newProject,
        loadCurrentConversation,
    } from '../../actions/appActions';

    import {
        userId,
        conversationId,
        conversation,
    } from '../../models/appModel';

    import {
        loadingConversations,
    } from '../../models/conversationsModel';

    import { getMessages, loadingMessages } from '../../models/messagesModel';

    $: isLoadingMessages = $loadingMessages && (!$messages || !$messages.length);
    $: isLoadingConversation = $loadingConversations && (!$conversation || ($conversation.id !== $conversationId));

	loadCurrentConversation();

    let messages = writable([]);
    $: { messages = getMessages({ userId: $userId }) };

    export let className = '';
</script>

<div class="messageList {className}">
    {#if isLoadingMessages || isLoadingConversation}
        <ContentLoader label="{locale.LOADING.MESSAGES}" />
    {:else}
        {#each $messages as message}
            <MessageItem {message} />
        {:else}
            <div class="noMessages">
                {locale.CONVERSATION.NO_MESSAGES}
            </div>
        {/each}
    {/if}
</div>

<style>
    .messageList {
        /* padding-top: 9px; */
        /* padding-top: 10px; */
        /* padding-top: 44px; */
        padding-bottom: 40px;
        /* padding-top: 310px; */
    }

    .messageList :global(.panelContent) {
        margin-top: -6px;
        margin-bottom: -6px;
    }

    .noMessages {
        padding: 0 20px;
        font-size: 1.2rem;
        line-height: 1.8rem;
        padding-top: 10px;
        padding-bottom: 20px;
    }

    .messageList :global(.contentLoader) {
        padding: 0 20px;
        font-size: 1.2rem;
        padding-top: 10px;
        padding-bottom: 30px;
        line-height: 2.5rem;
    }
</style>
<script>
    import locale from '../../locale';

    import config from '../../config';

	import { get, writable } from 'svelte/store';

    import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import ContentPanel from './../_components/ContentPanel.svelte';
    import ConversationListItem from './ConversationListItem.svelte';
    import ContentLoader from './../_components/ContentLoader.svelte';

	import { newProject } from '../../actions/appActions';

    import {
        userId,
        user,
        loggingIn,
		isUserLoaded,
    } from '../../models/appModel';

    // $: loggedOut = isUserLoaded($user, $userId) && !$user && !$userId;
    // $: console.log('loggedOut', loggedOut, 'isUserLoaded', isUserLoaded($user, $userId), 'userId', $userId);
    // $: console.log('isUserLoaded', isUserLoaded($user, $userId, $loggingIn));

    import { getConversations, loadingConversations } from '../../models/conversationsModel';

    $: isLoadingConversations = $loadingConversations && !$conversations;; // || !$conversations.length) // - don't check length as causes to flash
    // $: isLoadingConversations = $loadingConversations && (!$conversations || !$conversations.length);

    // $: console.log('isLoadingConversations', isLoadingConversations, 'loadingConversations', $loadingConversations);

    let conversations = writable(null);
    $: { conversations = getConversations({ userId: $userId }) };

    // $: { console.log('conversations', $conversations, 'isLoadingConversations', isLoadingConversations) }

    // (!$conversations || !isUserLoaded($user, $userId) || isLoadingConversations)

    export let className = '';
</script>

<div class="conversationList {className}">
    {#if isLoadingConversations || !isUserLoaded($user, $userId, $loggingIn)}
        <ContentLoader label="{locale.LOADING.CONVERSATIONS}" />
    {:else}
        {#if $conversations && $conversations.length}
            {#each $conversations as conversation}
                <ConversationListItem {conversation} />
            {/each}
        {:else}
            <div class="noConversations">
                {locale.CONVERSATIONS.NO_CONVERSATIONS}<br/><br/>
                <a href="discover">Discover</a> inspiring projects to get involved with<br/>or create a <a href="javascript:void(0)" on:click="{newProject}">New Project</a>
            </div>
        {/if}
    {/if}
</div>

<style>
    .conversationList {
        /* padding-top: 44px; */
        padding-top: 10px;
        padding-bottom: 40px;
        /* padding-top: 310px; */
    }

    .conversationList :global(.panelContent) {
        margin-top: -6px;
        margin-bottom: -6px;
    }

    .noConversations {
        padding: 0 20px;
        font-size: 1.2rem;
        line-height: 1.8rem;
        padding-top: 10px;
        padding-bottom: 20px;
    }

    .conversationList :global(.contentLoader) {
        padding: 0 20px;
        font-size: 1.2rem;
        padding-top: 10px;
        padding-bottom: 30px;
        line-height: 2.5rem;
    }
</style>
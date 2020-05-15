<script>
    // import locale from '../../locale';
    // import config from '../../config';
	// import { get, writable } from 'svelte/store';

    import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import ContentPanel from './../_components/ContentPanel.svelte';
    import MessageItem from './MessageItem.svelte';

    export let messages;

    export let className = '';
</script>

<div class="messageList {className}">
    {#each $messages as message}
        <MessageItem {message} />
    {/each}
</div>

<style>
    .messageList {
        width: 100%;
        padding-bottom: 20px;
        /* padding-bottom: 40px; */
        /* padding-top: 9px; */
        /* padding-top: 10px; */
        /* padding-top: 44px; */
        /* padding-top: 310px; */
    }

    .messageList :global(.panelContent) {
        margin-top: -6px;
        margin-bottom: -6px;
    }

    .messageList :global(.contentLoader) {
        padding: 0 20px;
        font-size: 1.2rem;
        padding-top: 10px;
        padding-bottom: 30px;
        line-height: 2.5rem;
    }
</style>
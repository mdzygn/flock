<script>
    import OverlayMenuItem from './OverlayMenuItem.svelte';

	import { closeOverlay } from '../../actions/appActions';

    export let promptId;
    export let targetItem = null;

    import promptIds from '../../config/promptIds';
    import prompts from '../../config/prompts';

    $: prompt = prompts[promptId];
    $: menuItems = (prompt && prompt.menuItems) || null;

    $: title = (prompt && prompt.title) || null;
    $: message = (prompt && prompt.message) || null;
    $: subMessage = (prompt && prompt.subMessage) || null;

    function selectMenuItem(event) {
        const menuItem = event.detail && event.detail.menuItem;
        const action = menuItem && menuItem.action;

        closeOverlay(); // ensure doing first in case opening new menu

        if (action) {
            action(targetItem);
        }
    }
</script>

<div class="overlayPrompt">
    {#if title || message || subMessage}
        <div class="content">
            {#if title}
                <div class="title">{title}</div>
            {/if}
            {#if message}
                <div class="message">{@html message}</div>
            {/if}
            {#if subMessage}
                <div class="subMessage">{@html subMessage}</div>
            {/if}
        </div>
    {/if}
    {#if menuItems && menuItems.length}
        <div class="menuItems">
            {#each menuItems as menuItem}
                {#if !menuItem.condition || menuItem.condition(targetItem)}
                    <OverlayMenuItem {menuItem} on:select="{selectMenuItem}" />
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style>
	.overlayPrompt {
        display: inline-block;

        width: 230px;

        background-color: #ffffff;
        border-radius: 5px;
        overflow: hidden;

        text-align: center;
	}

    .content {
        padding-top: 19px;
        padding-bottom: 25px;
    }

	.title {
        font-size: 1.5rem;
        line-height: 1.6rem;
        font-weight: 700;

        padding: 0 20px;
        padding-bottom: 15px;
	}

	.message {
        font-size: 1.4rem;
        line-height: 1.6rem;

        padding: 0 25px;
        padding-bottom: 16px;
	}

	.subMessage {
        font-size: 1.3rem;
        line-height: 1.5rem;

        padding: 0 38px;
        padding-bottom: 12px;
        color: #888888;
	}

	.overlayPrompt :global(.overlayMenuItem) {
        border-top: 1px solid #D4D4D4;
	}
	.overlayPrompt :global(.overlayMenuItem .button) {
        height: 40px;
        padding-left: 30px;
        padding-right: 30px;
	}
</style>
<script>
    import { tick } from 'svelte';

    import OverlayMenuItem from './OverlayMenuItem.svelte';

    import { closeOverlay } from '../../actions/appActions';
    import { dontAllowOverlayClose } from '../../models/appModel';

    import CloseIcon from "../../assets/icons/clear.png";

    import Button from '../../components/Button.svelte';

    export let promptId;
    export let targetItem = null;

    export let onConfirm = null;

    import promptIds from '../../config/promptIds';
    import prompts from '../../config/prompts';

    $: prompt = prompts[promptId];
    $: menuItems = (prompt && prompt.menuItems) || null;

    $: title = (prompt && prompt.title) || null;
    $: message = (prompt && prompt.message) || null;
    $: subMessage = (prompt && prompt.subMessage) || null;

    $: showClose = (prompt && prompt.showClose) || null;

    let hasSlots = $$props.$$slots;

    async function selectMenuItem(event) {
        const menuItem = event.detail && event.detail.menuItem;
        const action = menuItem && menuItem.action;

        closeOverlay(); // ensure doing first in case opening new menu
        await tick();

        if (action) {
            action(targetItem);
        }

        if (menuItem.default && onConfirm) {
            onConfirm();
        }
    }

    function close() {
        if (!$dontAllowOverlayClose) {
            closeOverlay();
        }
    }

    export function updateMenuItems() {
        menuItems = menuItems;
    }
</script>

<div class="overlayPrompt">
    {#if title || message || subMessage}
        <div class="content">
            {#if title}
                <div class="title">{title}</div>
            {/if}
            {#if showClose && !$dontAllowOverlayClose}
                <Button className="closeButton" onClick="{close}" icon="{CloseIcon}" />
            {/if}
            {#if message}
                <div class="message">{@html message}</div>
            {/if}
            {#if subMessage}
                <div class="subMessage">{@html subMessage}</div>
            {/if}
            {#if hasSlots}
                <div class="panelContent">
                    <slot></slot>
                </div>
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

        width: 250px;

        background-color: #ffffff;
        border-radius: 5px;
        overflow: hidden;

        text-align: center;
	}

    .content {
        position: relative;
        padding-top: 25px;
        padding-bottom: 30px;
    }

	.title {
        font-size: 1.6rem;
        line-height: 1.6rem;
        font-weight: 700;

        padding: 0 20px;
        padding-bottom: 15px;
	}

	.message {
        font-size: 1.5rem;
        line-height: 1.7rem;

        padding: 0 20px;
        padding-bottom: 18px;
	}

	.subMessage {
        font-size: 1.4rem;
        line-height: 1.6rem;

        padding: 0 20px;
        padding-bottom: 12px;
        color: #888888;
	}

	.overlayPrompt :global(.overlayMenuItem) {
        border-top: 1px solid #D4D4D4;
	}
	.overlayPrompt :global(.overlayMenuItem .button) {
        padding: 13px 30px;
	}

	.overlayPrompt :global(.closeButton) {
        position: absolute;
        top: 0;
        right: 0;

        height: 36px;
        width: 37px;
        opacity: 0.4;
	}
	.overlayPrompt :global(.closeButton .iconContainer) {
        display: block;
	}
	.overlayPrompt :global(.closeButton .iconInnerContainer) {
        justify-content: center;
        width: 100%;
        height: 100%;
	}
	.overlayPrompt :global(.closeButton .icon) {
        transform-origin: center;
        transform: scale(0.45, 0.45);
	}
</style>
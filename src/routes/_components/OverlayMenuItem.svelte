<script>
	import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    import Button from '../../components/Button.svelte';

    export let menuItem;

    // $: type = (menuItem && menuItem.type) || 'button';
    $: className = (menuItem && menuItem.className) || '';
    $: prefixText = (menuItem && menuItem.prefixText) || '';

    $: label = (menuItem && menuItem.label && (typeof menuItem.label === 'function' ? menuItem.label() : menuItem.label)) || '';
    $: disabled = (menuItem && menuItem.disabled && (typeof menuItem.disabled === 'function' ? menuItem.disabled() : menuItem.disabled)) || false;
    $: visible = (menuItem && menuItem.visible !== undefined) ? (typeof menuItem.visible === 'function' ? menuItem.visible() : menuItem.visible) : true;
    $: action = (menuItem && menuItem.action) || null;

    $: isDefault = (menuItem && menuItem.default) || false;

    function onClick() {
        dispatch('select', { menuItem });
    }
</script>

{#if visible}
    <div class="overlayMenuItem"><div class="{className}">
        {prefixText}
        <Button {onClick} {disabled} className="{isDefault ? 'default' : ''}">{label}</Button>
    </div></div>
{/if}

<style>
	.overlayMenuItem :global(.button) {
        font-size: 1.6rem;
        padding: 13px 30px;
        /* padding: 13px 17px; */
        padding-right: 30px;
        box-sizing: border-box;
	}

	.overlayMenuItem :global(.button.activeButton:hover) {
        background-color: #EEEEEE;
	}

	.overlayMenuItem :global(.button.disabled) {
        opacity: 0.33;
	}

    .overlayMenuItem :global(.default) {
        font-weight: 700;
    }

	.overlayMenuItem :global(.textPanel), .overlayMenuItem :global(.textPanel .button) {
        font-size: 1.3rem;
	}
	.overlayMenuItem :global(.textPanel) {
        display: block;
        padding: 10px 17px;
        box-sizing: initial;
	}
	.overlayMenuItem :global(.textPanel .button) {
        display: inline;
        padding: 0 4px;
        font-size: 1.3rem;
	}
	.overlayMenuItem :global(.textPanel .buttonContent) {
        display: inline;
        /* text-decoration: underline; */
        font-weight: bold;
        color: #333333;
	}
	.overlayMenuItem :global(.textPanel .button.activeButton:hover) {
        background-color: initial;
	}
	.overlayMenuItem :global(.textPanel .button.activeButton:hover .buttonContent) {
        color: #666666;
	}
</style>
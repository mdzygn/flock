<script>
	import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    import Button from '../../components/Button.svelte';

    export let menuItem;

    $: label = (menuItem && menuItem.label && (typeof menuItem.label === 'function' ? menuItem.label() : menuItem.label)) || '';
    $: disabled = (menuItem && menuItem.disabled && (typeof menuItem.disabled === 'function' ? menuItem.disabled() : menuItem.disabled)) || false;
    $: action = (menuItem && menuItem.action) || null;

    $: isDefault = (menuItem && menuItem.default) || false;

    function onClick() {
        dispatch('select', { menuItem });
    }
</script>

<div class="overlayMenuItem">
    <Button {onClick} {disabled} className="{isDefault ? 'default' : ''}">{label}</Button>
</div>

<style>
	.overlayMenuItem :global(.button) {
        font-size: 1.5rem;
        padding: 8px 13px;
        padding-right: 30px;
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
</style>
<script>
	import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    import Button from '../../components/Button.svelte';

    export let menuItem;

    $: label = (menuItem && menuItem.label && (typeof menuItem.label === 'function' ? menuItem.label() : menuItem.label)) || '';
    $: disabled = (menuItem && menuItem.disabled && (typeof menuItem.disabled === 'function' ? menuItem.disabled() : menuItem.disabled)) || false;
    $: action = (menuItem && menuItem.action) || null;

    function onClick() {
        dispatch('select', { menuItem });
    }
</script>

<div class="overlayMenuItem">
    <Button {onClick} {disabled}>{label}</Button>
</div>

<style>
	.overlayMenuItem :global(.button) {
        font-size: 1.5rem;
        padding: 8px 13px;
	}

	.overlayMenuItem :global(.button:hover) {
        background-color: #EEEEEE;
	}
</style>
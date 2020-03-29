<script>
    import Button from '../../components/Button.svelte';

    export let menuItem;

    $: label = (menuItem && menuItem.label) || '';
    $: disabled = (menuItem && menuItem.disabled) || false;
    $: action = (menuItem && menuItem.action) || null;

    function onClick() {
        if (action) {
            console.log(action);
        }
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
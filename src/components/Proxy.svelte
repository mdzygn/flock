<script>
    import Hotspots from './Hotspots.svelte';

    export let image;
    export let href;
    export let className;

    let hasSlots = $$props.$$slots;
</script>

<div class="{className}">
    {#if hasSlots}
        <Hotspots>
            <slot></slot>
        </Hotspots>
    {/if}

    {#if href}
        <a href="{href}">
            <img src="content/proxy/{image}.jpg" alt="proxy" />
        </a>
    {:else}
        <img src="content/proxy/{image}.jpg" alt="proxy" />
    {/if}
</div>

<style>
    img {
        width: 100%;
    }
</style>
<script>
    import Hotspots from './Hotspots.svelte';

    export let image;
    export let href;
    export let className;
</script>

<div class="{className}">
    <Hotspots>
        <slot></slot>
    </Hotspots>

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
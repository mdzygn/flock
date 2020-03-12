<script>
    import Hotspots from './Hotspots.svelte';

    export let image;
    export let href = null;
    export let className = '';
    export let style = null;
    export let absolutePlacement = false;
    export let onClick = null;

    $: imageSrc = (image.indexOf('.png') !== -1) ? image : image + '.jpg';

    let hasSlots = $$props.$$slots;
</script>

<div class="proxy {className}" {style} class:absolutePlacement>
    {#if hasSlots}
        <Hotspots>
            <slot></slot>
        </Hotspots>
    {/if}

    {#if href}
        <a {href} on:click={onClick}>
            <img src="content/proxy/{imageSrc}" alt="proxy" />
        </a>
    {:else}
        <img src="content/proxy/{imageSrc}" alt="proxy" on:click={onClick} class:button={onClick} />
    {/if}
</div>

<style>
    img {
        width: 100%;
    }

    .absolutePlacement img {
        width: 46%;
    }

    .absolutePlacement {
        position: absolute;
    }

    .button {
        cursor: pointer;
    }
</style>
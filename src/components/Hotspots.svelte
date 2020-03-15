<svelte:window bind:innerWidth={viewWidth}/>

<script>
    let viewWidth = 0;

    let hotspotContainerScale = 1;
    $: {
        if (viewWidth < 480) {
            hotspotContainerScale = viewWidth / 375;
        } else {
            hotspotContainerScale = 411 / 375;
        }
    }

    $: cssTransform = 'transform: scale(' + hotspotContainerScale + ', ' + hotspotContainerScale + '); transform-origin: 0 0;';
</script>

<div class="hotspotContainer" style="{cssTransform}">
    <slot></slot>
</div>

<style>
    .hotspotContainer {
        position: absolute;
        width: 375px;
        /* width: 100%; */
    }

    .hotspotContainer :global(a), .hotspotContainer :global(div) {
        position: absolute;

        text-decoration: none;
        line-height: 0;

        cursor: pointer;
    }
</style>
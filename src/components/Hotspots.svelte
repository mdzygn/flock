<script>
</script>

<div class="hotspotContainer">
    <slot></slot>
</div>

<style>
    .hotspotContainer {
        position: absolute;
        width: 100%;
    }

    .hotspotContainer :global(a), .hotspotContainer :global(div) {
        position: absolute;

        text-decoration: none;
        line-height: 0;

        cursor: pointer;
    }
</style>
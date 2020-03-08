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

    .hotspotContainer :global(a) {
        position: absolute;

        text-decoration: none;
        line-height: 0;
    }
</style>
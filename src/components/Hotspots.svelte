<script>
</script>

<div class="container">
    <slot></slot>
</div>

<style>
    .container {
        position: absolute;

        width: 100%;
        height: 100%;
    }

    .container :global(a) {
        position: absolute;

        text-decoration: none;
        line-height: 0;
    }
</style>
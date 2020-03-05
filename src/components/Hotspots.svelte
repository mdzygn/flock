<script>
</script>

<div class="container">
    <slot></slot>
</div>

<style>
    .container {
        position: absolute;
    }

    .container :global(a) {
        position: absolute;
        top: 0;
        left: 0;

        text-decoration: none;
        line-height: 0;
    }
</style>
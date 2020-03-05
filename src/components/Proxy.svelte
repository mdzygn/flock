<script>
    import Hotspots from './Hotspots.svelte';

    export let image;
</script>

<div>
    <Hotspots>
        <slot></slot>
    </Hotspots>

    <img src="content/proxy/{image}.jpg" alt="proxy" />
</div>

<style>
    img {
        width: 100%;
    }
</style>
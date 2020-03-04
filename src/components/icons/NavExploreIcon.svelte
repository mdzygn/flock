<script>
    import NavIcon from "../../assets/svg/nav_explore.html";
    import NavIconActive from "../../assets/svg/nav_explore_active.html";

    export let active = false;
</script>

<style>
</style>

{#if active}
    <NavIconActive />
{:else}
    <NavIcon />
{/if}
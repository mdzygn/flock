<script>
    import NavIcon from "../../assets/svg/nav_home.html";
    import NavIconActive from "../../assets/svg/nav_home_active.html";

    export let active = false;
</script>

<style>
</style>

{#if active}
    <NavIconActive />
{:else}
    <NavIcon />
{/if}
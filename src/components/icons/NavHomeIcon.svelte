<script>
    import NavHomeIcon from "../../assets/svg/nav_home.html";
    import NavHomeIconActive from "../../assets/svg/nav_home_active.html";

    export let active = false;
</script>

<style>
</style>

{#if active}
    <NavHomeIconActive />
{:else}
    <NavHomeIcon />
{/if}
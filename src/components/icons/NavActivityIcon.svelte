<script>
    import NavIcon from "../../assets/svg/nav_activity.html";
    import NavIconActive from "../../assets/svg/nav_activity_active.html";

    export let active = false;
</script>

<style>
</style>

{#if active}
    <NavIconActive />
{:else}
    <NavIcon />
{/if}
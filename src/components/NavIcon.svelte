<script>
    // import NavIcon from "../../assets/svg/nav_following.html";
    // import NavIconActive from "../../assets/svg/nav_following_active.html";

    export let iconId = 'home';

    export let active = false;
</script>

{#if active}
    <img src='icons/nav_{iconId}_active.png' alt='Following' />
    <!-- <NavIconActive /> -->
{:else}
    <img src='icons/nav_{iconId}.png' alt='Following' />
    <!-- <NavIcon /> -->
{/if}

<style>
    img {
        width: 46px;
        height: 46px;
    }
</style>
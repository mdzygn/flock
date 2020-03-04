<script>
    export let iconId = 'home';

    export let active = false;
</script>

{#if active}
    <img src='assets/icons/nav_{iconId}_active.png' alt='Following' />
{:else}
    <img src='assets/icons/nav_{iconId}.png' alt='Following' />
{/if}

<style>
    img {
        width: 46px;
        height: 46px;
    }
</style>
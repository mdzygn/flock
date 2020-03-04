<script>
    import AvatarIcon from './AvatarIcon.svelte';

	import sections from "../../models/sections.js";

    export let segment;

    $: curSection = sections.find(item => item.segment === segment);
    $: sectionLabel = curSection ? curSection.label : '';

</script>

<headerBar>
    {#if segment === undefined}
        <div class="logo">
            <img src='assets/logo.png' alt="Flock">
        </div>
    {:else}
        <div class="header">{sectionLabel}</div>
    {/if}
    <div class="avatarIcon">
        <AvatarIcon />
    </div>
</headerBar>

<style>
    .avatarIcon {
        position: absolute;
        right: 11px;
        top: 11px;
    }

    headerBar {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 60px;

        background: #ffffff;
        box-shadow: 0 2px 3px 0 rgba(0,0,0,0.12);
    }

    .logo {
        position: absolute;
        top: 12px;
        left: 15px;
    }

    .logo img {
        width: 50%;
    }

    .header {
        font-size: 2.2rem;
        font-weight: 400;

        position: absolute;
        top: 14px;
        left: 20px;
    }
</style>
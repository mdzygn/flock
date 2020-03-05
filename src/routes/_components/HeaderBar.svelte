<script>
    import { goto } from '@sapper/app'

    import BackIcon from "../../assets/icons/back.png";
    import AvatarIcon from './AvatarIcon.svelte';

	import sections, {getSectionByPath} from "../../models/sections.js";

    export let segment;
    export let path;

    $: curSection = getSectionByPath(path); // sections.find(item => new RegExp('^' + item.path + '$').test(path));
    $: sectionLabel = curSection ? curSection.label : '';
    $: parentSection = curSection ? curSection.parentSection : null;

    function goBack () {
        if (parentSection) {
            goto(parentSection);
        }
    }
</script>

<headerBar>
    {#if segment === undefined}
        <div class="logo">
            <img src='assets/logo.png' alt="Flock">
        </div>
    {:else}
        <div class="header" class:hasBack="{parentSection}">{sectionLabel}</div>
        {#if parentSection}
            <img class="backButton" src="{BackIcon}" alt="back" on:click|preventDefault="{goBack}" />
        {/if}
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

    .backButton {
        position: absolute;
        top: 8px;
        left: 5px;
        padding: 10px;

        width: 26px;
        height: 26px;

        cursor: pointer;
    }

    .hasBack {
        padding-left: 30px;
    }
</style>
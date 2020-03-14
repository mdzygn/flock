<script>
    import { goto } from '@sapper/app';

    import sections, { getSectionByPath, getIdForSection } from "../../models/sections.js";

    import {
        viewMode,
        project,
        conversation,
        viewedUser,
    } from '../../models/appState.js';

    // import { hasCreated } from '../../models/projectViewState.js';

	import { loadProfile } from '../../actions/appActions.js';

    import BackIcon from "../../assets/icons/back.png";
    import AvatarIcon from './AvatarIcon.svelte';

    export let segment;
    export let path;

    $: appState = {
        viewMode: $viewMode,
        viewingOwnProfile: $viewedUser ? $viewedUser.isCurrentUser : false,
    };

    $: curSection = getSectionByPath(path, appState);
    $: isProjectView = curSection ? curSection.isProjectView : false;
    $: parentSection = curSection ? curSection.parentSection : null;
    $: showBack = curSection ? curSection.showBack : false;
    $: isMyProfile = curSection ? (curSection.segment === 'profile') : false;
    // $: sectionLabel = curSection ? curSection.label : '';

    $: hasCreated = $project && $project.hasCreated;

    let sectionLabel = '';
    $: {
        if (/\/projects\/.*/.test(path) && $project) {
            sectionLabel = $project.title;
        } else if (/\/profile\/.*/.test(path) && $viewedUser && !$viewedUser.isCurrentUser) {
            sectionLabel = $viewedUser.fullName;
        } else if (/\/messages\/.*/.test(path) && $conversation && ($conversation.user || $conversation.project)) {
            if ($conversation.project && $project) { // // temporary
                sectionLabel = $project.title;
            } else {
                sectionLabel = $conversation.user ? $conversation.user.firstName : $conversation.project.name;
            }
        } else {
            sectionLabel = curSection ? curSection.label : '';
        }
    }

    function goBack () {
        if (isProjectView && hasCreated) {
            goto('projects');
        } else if (showBack) {
            history.back();
        } else if (parentSection) {
            goto(parentSection);
        }
    }

    function loadMyProfile() {
        if (!isMyProfile) {
            loadProfile('sl3p5oms'); // , {owner: true});
        }
    }
</script>

<headerBar>
    {#if segment === undefined}
        <div class="logo">
            <img src='assets/logo.png' alt="Flock">
        </div>
    {:else}
        <div class="header" class:hasBack="{showBack || parentSection}">{sectionLabel}</div>
        {#if showBack || parentSection}
            <img class="backButton" src="{BackIcon}" alt="back" on:click|preventDefault="{goBack}" />
        {/if}
    {/if}
    <div class="avatarIcon" class:button="{!isMyProfile}" on:click="{loadMyProfile}">
        <AvatarIcon />
    </div>
</headerBar>

<style>
    .avatarIcon {
        position: absolute;
        right: 11px;
        top: 11px;
    }

    .button {
        cursor: pointer;
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
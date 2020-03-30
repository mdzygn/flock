<script>
    import { goto } from '@sapper/app';

    import { getSectionByPath, getIdForSection } from "../../models/sectionsModel";

    import {
        viewMode,
        project,
        conversation,
        viewedUser,
        user,
        userId,
    } from '../../models/appModel';

	import { loadProfile } from '../../actions/appActions';

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
        if (/\/projects\/.+/.test(path) && !/\/projects\/new/.test(path) && !/\/projects\/archive/.test(path) && $project) {
            sectionLabel = $project.title;
        } else if (/\/profile\/.+/.test(path) && $viewedUser && !$viewedUser.isCurrentUser) {
            sectionLabel = $viewedUser.fullName;
        } else if (/\/messages\/.+/.test(path) && $conversation && ($conversation.user || $conversation.project)) {
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
            loadProfile($userId); // , {owner: true});
        }
    }
</script>

<div class="headerBar">
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
        <AvatarIcon user="{$user}" />
    </div>
</div>

<style>
    .headerBar {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 60px;

        background: #ffffff;
        box-shadow: 0 2px 3px 0 rgba(0,0,0,0.12);
    }

    .header {
        font-size: 2.2rem;
        font-weight: 400;

        position: absolute;
        top: 14px;

        left: 20px;
        right: 55px;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .logo {
        position: absolute;
        top: 12px;
        left: 15px;
    }
    .logo img {
        width: 50%;
    }

    .avatarIcon {
        position: absolute;
        right: 11px;
        top: 11px;
    }

    .button {
        cursor: pointer;
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

    .header.hasBack {
        left: 50px;
    }
</style>
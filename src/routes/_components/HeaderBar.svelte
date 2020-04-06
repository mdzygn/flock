<script>
    import locale from '../../locale';
    import promptIds from '../../config/promptIds';
    import { menuIds } from '../../config/menus';

    import { goto } from '@sapper/app';

    import config from '../../config';

    import Button from '../../components/Button.svelte';

	import OptionsMenuIcon from "../../assets/icons/menu.png";

    import { getSectionByPath, getIdForSection } from "../../models/sectionsModel";

    import {
        viewMode,
        project,
        conversation,
        viewedUser,
        user,
        userId,
        getIsCurrentUser,
        showBetaFeatures,
    } from '../../models/appModel';

    import {
        loadProfile,
        showMenu,
        showPrompt,
    } from '../../actions/appActions';

    import BackIcon from "../../assets/icons/back.png";
    import AvatarIcon from './AvatarIcon.svelte';

    export let segment;
    export let path;

    $: isCurrentUser = getIsCurrentUser($viewedUser && $viewedUser.id);

    $: appState = {
        viewMode: $viewMode,
        viewingOwnProfile: isCurrentUser,
        // viewingOwnProfile: $viewedUser ? $viewedUser.isCurrentUser : false,
    };

    $: loggedIn = !!$user;

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
        } else if (/\/profile\/.+/.test(path) && !isCurrentUser && $viewedUser) {//$viewedUser && !$viewedUser.isCurrentUser) {
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

    function signIn() {
		showPrompt(promptIds.LOG_IN);
        // setUser(config.GENERAL_USER);
    }
    function signUp() {
		showPrompt(promptIds.SIGN_UP);
    }

    function showMainOptions() {
		showMenu(menuIds.MAIN_OPTIONS);
    }
</script>

<div class="headerBar">
    {#if segment === undefined}
        {#if $showBetaFeatures}
            <div class="logo">
                <img src='assets/logo.png' alt="Flock">
            </div>
        {/if}
    {:else}
        <div class="header" class:hasBack="{showBack || parentSection}">{sectionLabel}</div>
        {#if showBack || parentSection}
            <img class="backButton" src="{BackIcon}" alt="back" on:click|preventDefault="{goBack}" />
        {/if}
    {/if}
    {#if $userId}
        <Button className="optionsButton" icon="{OptionsMenuIcon}" onClick="{showMainOptions}"></Button>
        <div class="avatarIcon" class:button="{!isMyProfile}" on:click="{loadMyProfile}">
            <AvatarIcon user="{user}" />
        </div>
    {:else}
        <div class="signInButtonContainer">
            <Button className="signUpButton" onClick="{signUp}">{locale.HEADER.SIGN_UP}</Button>
            <Button className="signInButton" onClick="{signIn}">{locale.HEADER.SIGN_IN}</Button>
        </div>
    {/if}
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
        right: 82px;

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
        top: 11px;
        /* right: 11px; */
        right: 41px;
    }

    .headerBar :global(.optionsButton) {
		position: absolute;

    	top: 8px;
    	right: 0;

		width: 28px;
		height: 26px;
        padding: 8px 3px;
	}
    .headerBar :global(.optionsButton .icon) {
		margin-top: 1px;
        margin-left: 5px;
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

    .signInButtonContainer {
        position: absolute;
        right: 0;
    }

    .headerBar :global(.signInButton) {
        display: inline-block;
        float: right;
    }
    .headerBar :global(.signInButton .buttonContent) {
        margin: 11px 0px;
        padding: 7px 8px;

        font-size: 1.5rem;
        font-weight: 700;
    }
    .headerBar :global(.signUpButton) {
        display: inline-block;
        float: right;
    }
    .headerBar :global(.signUpButton .buttonContent) {
        margin: 11px;
        margin-right: 11px;
        margin-left: 6px;

        padding: 7px 12px;

        font-size: 1.5rem;
        font-weight: 700;

        background-color: #222222;
        border-radius: 999px;
        color: #ffffff;
    }
</style>
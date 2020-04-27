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
        projectId,
        channelId,
        project,
        channel,
        conversation,
        viewedUser,
        user,
        userId,
        lastPreProjectPath,
        getIsCurrentUser,
        showBetaFeatures,
    } from '../../models/appModel';

    import {
        loadProfile,
        showMenu,
        showPrompt,
        loadCurrentUser,
    } from '../../actions/appActions';

    import BackIcon from "../../assets/icons/back.png";
    import AvatarIcon from './AvatarIcon.svelte';

    export let segment;
    export let path;

    loadCurrentUser();

    $: isCurrentUser = $user && getIsCurrentUser($viewedUser && $viewedUser.id);

    $: appState = {
        viewMode: $viewMode,
        viewingOwnProfile: isCurrentUser,
        // viewingOwnProfile: $viewedUser ? $viewedUser.isCurrentUser : false,
    };

    $: loggedIn = !!$user;

    $: curSection = getSectionByPath(path, appState);
    $: isProjectView = curSection ? curSection.isProjectView : false;
    $: parentPath = curSection ? curSection.parentPath : null;
    $: showBack = curSection ? curSection.showBack : false;
    $: isMyProfile = curSection ? (curSection.segment === 'profile') : false;
    // $: sectionLabel = curSection ? curSection.label : '';


    $: hasCreated = $project && $project.hasCreated;

    let sectionLabel = '';
    let hasSuperHeader = false;
    let superHeaderLabel = '';
    let headerLinkUrl = '';
    $: {
        if (/\/projects\/.+/.test(path) && !/\/projects\/new/.test(path) && !/\/projects\/archive/.test(path) && $project) {
            sectionLabel = $project.title;
        } else if (/\/channels\/.+/.test(path) && $channel) {
            sectionLabel = '#'+$channel.title;
        } else if (/\/posts\/.+/.test(path) && $channel) {
            sectionLabel = '#'+$channel.title;
        } else if (/\/profile\/.+/.test(path) && $viewedUser) {//$viewedUser && !$viewedUser.isCurrentUser) {
            if (isCurrentUser) {
                sectionLabel = 'My Profile';
            } else {
                sectionLabel = $viewedUser.name;
            }
        } else if (/\/messages\/.+/.test(path) && $conversation && ($conversation.user || $conversation.project)) {
            if ($conversation.project && $project) { // // temporary
                sectionLabel = $project.title;
            } else {
                sectionLabel = $conversation.user ? $conversation.user.firstName : $conversation.project.name;
            }
        } else {
            sectionLabel = curSection ? curSection.label : '';
        }

        if (/\/channels\/.+/.test(path)) {
            hasSuperHeader = true;
            if ($project) {
                superHeaderLabel = $project.title;
            }
            headerLinkUrl = '';
        } else if (/\/posts\/.+/.test(path)) {
            hasSuperHeader = true;
            if ($project) {
                superHeaderLabel = $project.title;
            }
            headerLinkUrl = 'channels/' + $channelId;
        } else {
            hasSuperHeader = false;
            headerLinkUrl = '';
        }
    }

    function goBack () {
        if (isProjectView && hasCreated) {
            goto('projects');
        } else if (curSection && curSection.useLastPreProjectPath && $lastPreProjectPath) {
            goto($lastPreProjectPath);
        } else if (parentPath) {
            let match;
            if (match = parentPath.match(/\[project\]/)) {
                parentPath = parentPath.substr(0, match.index) + $projectId + parentPath.substr(match.index + match[0].length);
            } else if (match = parentPath.match(/\[channel\]/)) {
                parentPath = parentPath.substr(0, match.index) + $channelId + parentPath.substr(match.index + match[0].length);
            }
            goto(parentPath);
        } else if (showBack) {
            history.back();
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

<div class="headerBar" class:hasSuperHeader="{hasSuperHeader}">
    {#if segment === undefined}
        {#if $showBetaFeatures}
            <div class="logo">
                <img src='assets/logo.png' alt="Flock">
            </div>
        {/if}
    {:else}
        {#if hasSuperHeader}
            <div class="superHeader" class:hasBack="{showBack || parentPath}"><a href="projects/{$projectId}">{superHeaderLabel}</a></div>
        {/if}
        <div class="header" class:loggedOut="{!loggedIn}" class:hasBack="{showBack || parentPath}">
            {#if headerLinkUrl}
                <a href="{headerLinkUrl}">{sectionLabel}</a>
            {:else}
                {sectionLabel}
            {/if}
        </div>
        {#if showBack || parentPath}
            <img class="backButton" src="{BackIcon}" alt="back" on:click|preventDefault="{goBack}" />
        {/if}
    {/if}
    {#if $userId}
        <Button className="optionsButton" icon="{OptionsMenuIcon}" onClick="{showMainOptions}"></Button>
        <div class="avatarIcon" class:button="{!isMyProfile}" on:click="{loadMyProfile}">
            <AvatarIcon user="{user}" useThumb="{true}" />
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
        font-size: 2.1rem;
        font-weight: 400;

        position: absolute;
        top: 14px;

        left: 20px;
        right: 86px;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .header a {
        text-decoration: none;
    }
    .header.loggedOut {
        right: 140px;
    }
    .header.hasBack {
        left: 50px;
    }
    .hasSuperHeader .header {
        top: 22px;
        font-size: 2.0rem;
    }

    .superHeader {
        font-size: 1.2rem;

        position: absolute;
        top: 8px;
        left: 20px;
        right: 140px;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .superHeader a {
        text-decoration: none;
        color: #aaaaaa;
    }
    .superHeader.hasBack {
        left: 50px;
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
        top: 7px;
        left: 5px;
        padding: 10px;

        width: 26px;
        height: 26px;

        cursor: pointer;
    }
    .hasSuperHeader .backButton {
        top: 13px;
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
        padding: 6px 6px;
        margin-top: 15px;

        font-size: 1.3rem;
        font-weight: 700;
    }
    .headerBar :global(.signUpButton) {
        display: inline-block;
        float: right;
    }
    .headerBar :global(.signUpButton .buttonContent) {
        margin: 11px;
        margin-right: 13px;
        margin-left: 6px;
        margin-top: 15px;

        padding: 6px 11px;

        font-size: 1.3rem;
        font-weight: 700;

        background-color: #222222;
        border-radius: 999px;
        color: #ffffff;
    }
</style>
<script>
    import { get, writable } from 'svelte/store';
    import { goto } from '@sapper/app';

    import locale from '../../locale';
    import promptIds from '../../config/promptIds';
    import { menuIds } from '../../config/menus';

    import config from '../../config';

    import Button from '../../components/Button.svelte';

	import OptionsMenuIcon from "../../assets/icons/menu.png";

    import { getSectionByPath, getIdForSection } from "../../models/sectionsModel";

    import { getUserModelFromData } from '../../models/usersModel';

    // import { getNotifications } from "../../models/notificationsModel";

    import {
        prevPath,
        viewMode,
        projectId,
        channelId,
        project,
        post,
        postType,
        channel,
        conversationGroupId,
        conversation,
        viewedUser,
        newConversation,
        user,
        userId,
        loggingIn,
        lastPreProjectPath,
        getIsCurrentUser,
        showBetaFeatures,
        goHome,
    } from '../../models/appModel';

    import  {
        getConversationOtherUser,
    } from '../../models/conversationsModel';

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

	// $: getNotifications({ userId: $userId, getUnviewed: true });

    loadCurrentUser();

    $: isCurrentUser = $user && getIsCurrentUser($viewedUser && $viewedUser.id);

    $: appState = {
        viewMode: $viewMode,
        viewingOwnProfile: isCurrentUser,
        // viewingOwnProfile: $viewedUser ? $viewedUser.isCurrentUser : false,
    };

    $: loggedIn = !!$user || $loggingIn;

    $: curSection = getSectionByPath(path, appState);
    $: isProjectView = curSection ? curSection.isProjectView : false;
    $: parentPath = curSection ? curSection.parentPath : null;
    $: showBack = curSection ? curSection.showBack : false;
    $: isMyProfile = curSection ? (curSection.segment === 'profile') : false;
    // $: sectionLabel = curSection ? curSection.label : '';


    $: hasCreated = $project && $project.hasCreated;

    let profileUser = writable(null);
    $: profileUsername = ($profileUser && $profileUser.username && '@' + $profileUser.username) || '';

    // $: console.log('profileUser', $profileUser);

    let sectionLabel = '';
    let hasSuperHeader = false;
    let superHeaderLabel = '';
    let headerLinkUrl = '';
    let overrideParentPath = null;


    $: {
        $profileUser = null;
        // console.log('reset profileUser', $profileUser);

        if (/\/projects\/.+/.test(path) && !/\/projects\/new/.test(path) && !/\/projects\/archive/.test(path) && $project) {
            sectionLabel = $project.title;
        } else if (/\/channels\/.+/.test(path) && $channel) {
            sectionLabel = (config.CHANNELS_INCLUDE_HASH ? '#' : '')+$channel.title;
        } else if (/\/posts\/.+/.test(path) && $channel) {
            sectionLabel = (config.CHANNELS_INCLUDE_HASH ? '#' : '')+$channel.title;
        } else if (/\/profile\/.+/.test(path) && $user && $viewedUser) {//$viewedUser && !$viewedUser.isCurrentUser) {
            if (isCurrentUser) {
                sectionLabel = 'My Profile';
            } else {
                sectionLabel = $viewedUser.name;
            }
        } else if (/\/messages\/.+/.test(path) && $user && ($newConversation || ($conversation && $conversation.isNew) || ($conversationGroupId && $viewedUser && $conversationGroupId + 'u-'+$viewedUser.id) || ($conversation && (($conversation.project && $project) || ($conversation.users && $conversation.users.length))))) { // $conversation.user
            // console.log('header, ', $conversation, $conversation.isNew);
            if ($conversation && !$conversation.isNew) {
                if ($conversation.project && $project) { // // temporary
                    sectionLabel = $project.title;
                } else {
                    const curUserItem = getConversationOtherUser($conversation);
                    if (curUserItem && curUserItem.name) {
                        sectionLabel = curUserItem.name;
                        $profileUser = get(getUserModelFromData(curUserItem));
                        // console.log('getUserModelFromData profileUser', $profileUser);
                    }
                    // sectionLabel = $conversation.user ? $conversation.user.firstName : $conversation.project.name;
                }
            } else if ($viewedUser) { // $newConversation && // temporary
                sectionLabel = $viewedUser.name;
                $profileUser = $viewedUser;
                // console.log('viewedUser profileUser', $profileUser);
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
            overrideParentPath = null;
        } else if (/\/posts\/.+/.test(path)) {
            // if (($post && $post.type === 'projectPost') || (/\/posts\/new/.test(path) && $postType === 'projectPost')) {
            //     hasSuperHeader = false;
            //     sectionLabel = ($project && $project.title) || '';
            //     headerLinkUrl = '';
            //     overrideParentPath = $projectId ? 'projects/' + $projectId : null;
            // } else {
                hasSuperHeader = true;
                if ($project) {
                    superHeaderLabel = $project.title;
                }
                if (($post && $post.type === 'projectPost') || (/\/posts\/new/.test(path) && $postType === 'projectPost')) {
                    sectionLabel = 'Updates';
                }
                headerLinkUrl = '';
                // headerLinkUrl = 'channels/' + $channelId;
                overrideParentPath = null;
            // }
        } else {
            hasSuperHeader = false;
            headerLinkUrl = '';
            overrideParentPath = null;
        }
    }

    function goBack () {
        if (isProjectView && hasCreated) {
            goto('projects');
        } else if (curSection && curSection.useLastPreProjectPath && $lastPreProjectPath) {
            goto($lastPreProjectPath);
        } else if (showBack && get(prevPath)) {
            history.back();
        } else if (overrideParentPath) {
            goto(overrideParentPath);
        } else if (parentPath) {
            let match;
            if (match = parentPath.match(/\[project\]/)) {
                parentPath = parentPath.substr(0, match.index) + $projectId + parentPath.substr(match.index + match[0].length);
            } else if (match = parentPath.match(/\[channel\]/)) {
                parentPath = parentPath.substr(0, match.index) + $channelId + parentPath.substr(match.index + match[0].length);
            }
            goto(parentPath);
        } /* else if (showBack) {
            history.back();
        }*/
    }

    function loadMyProfile() {
        if (!isMyProfile) {
            loadProfile($userId); // , {owner: true});
        }
    }

    function loadViewedProfile() {
        if ($profileUser && $profileUser.id) {
            loadProfile($profileUser.id); // , {owner: true});
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
    {#if segment === undefined || (segment === 'discover' && !$showBetaFeatures)}
        {#if $showBetaFeatures || segment === 'discover'}
            <div class="logo" class:button="{!$showBetaFeatures}" on:click="{!$showBetaFeatures ? goHome : null}">
                <img src='assets/logo.png' alt="Flock">
            </div>
        {/if}
    {:else}
        {#if hasSuperHeader}
            <div class="superHeader" class:hasBack="{showBack || parentPath}"><a href="projects/{$projectId}">{superHeaderLabel}</a></div>
        {/if}
        {#if $profileUser}
            <div class="profileHeader button" on:click="{loadViewedProfile}" class:hasBack="{showBack || parentPath}">
                <AvatarIcon user="{profileUser}" useThumb="{true}" />
                <div class="profileInfo">
                    <div class="profileDisplayName">
                        {sectionLabel}
                    </div>
                    <div class="profileUsername">
                        {profileUsername}
                    </div>
                </div>
            </div>
        {:else}
            <div class="header" class:loggedOut="{!loggedIn}" class:hasBack="{showBack || parentPath}">
                {#if headerLinkUrl}
                    <a href="{headerLinkUrl}">{sectionLabel}</a>
                {:else}
                    {sectionLabel}
                {/if}
            </div>
        {/if}
        {#if showBack || parentPath}
            <img class="backButton" src="{BackIcon}" alt="back" on:click|preventDefault="{goBack}" />
        {/if}
    {/if}
    {#if loggedIn}
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

    .profileHeader {
        position: absolute;
        top: 12px;

        left: 20px;
        right: 86px;
    }

    .profileHeader :global(.avatarIcon) {
        position: absolute;
    }

    .profileHeader.hasBack {
        left: 50px;
    }

    .profileInfo {
        position: absolute;
        left: 45px;
    }

    .profileInfo .profileDisplayName {
        font-size: 1.6rem;
        font-weight: 700;

        margin-top: -1px;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .profileUsername {
        font-size: 1.2rem;
        margin-top: -4px;

        color: #999999;
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
<script>
    import { menuIds } from '../../config/menus';

    import { getDisplayText } from '../../utils';

    import Button from '../../components/Button.svelte';

    import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

    import AvatarIcon from '../_components/AvatarIcon.svelte';
	import Location from '../_components/Location.svelte';
	import Audience from '../_components/Audience.svelte';

	import OptionsMenuIcon from "../../assets/icons/menu.png";
    import EditIcon from "../../assets/icons/edit.png";

    import SendMessageIcon from "../../assets/icons/send.png";
    import ConnectIcon from "../../assets/icons/connect.png";

    import ProfileDefaultImage from "../../assets/icons/profileDefault.png";

	import AddDetailsIcon from "../../assets/icons/add_highlight.png";

    import { viewedUser } from '../../models/appModel';

    import {
        getIsCurrentUser,
        showBetaFeatures,
        user,
    } from '../../models/appModel';

    import {
        getProfileCoverImage,
    } from '../../models/usersModel';

    import {
        showLikes,
        messageUser,
        showMenu,
        editProfile,
    } from '../../actions/appActions'

	import { requestConnection } from '../../actions/userActions';

	$: requestedConnection = ($viewedUser && $viewedUser.requestedConnection) || false;
	$: connected = ($viewedUser && $viewedUser.connected) || false;
    $: isCurrentUser = $user && getIsCurrentUser($viewedUser && $viewedUser.id);
    // $: isCurrentUser = ($viewedUser && $viewedUser.isCurrentUser) || false;

    $: showConnect = !requestedConnection && !connected;

    $: userId = ($viewedUser && $viewedUser.id) || '';
    $: username = ($viewedUser && $viewedUser.username && '@' + $viewedUser.username) || '';

    $: userName = ($viewedUser && $viewedUser.name) || '';
    $: userFirstName = ($viewedUser && $viewedUser.firstName) || '';
    $: userBio = ($viewedUser && $viewedUser.bio) || '';
    $: userLocation = ($viewedUser && $viewedUser.location) || '';

    $: userBioHTML = getDisplayText(userBio);

    $: postsCount = ($viewedUser && $viewedUser.postsCount) || 0;
    $: likesCount = ($viewedUser && $viewedUser.likesCount) || 0;
    $: followsCount = ($viewedUser && $viewedUser.followsCount) || 0;

    // $: coverImageId = ($viewedUser && $viewedUser.coverImage !== false) ? username : '_default';
    // $: coverImage = 'content/users/' + coverImageId + '/cover.jpg';

    $: coverImage = getProfileCoverImage($viewedUser, true);

	// $: profileImageSrc = 'content/users/' + username + '/profile.jpg';
    // $: profileImageSrc = ProfileDefaultImage;
    // $: profileImageBgStyling = userStyle ? 'background-image: linear-gradient(' + userStyle.profileTop + ', ' + userStyle.profileBottom + ');' : '';

    $: userStyle = ($viewedUser && $viewedUser.style) || null;
    $: coverBgStyling = (userStyle && userStyle.coverTop) ? 'background-image: linear-gradient(' + userStyle.coverTop + ', ' + userStyle.coverBottom + ');' : null;

    // $: proxyImage = isCurrentUser ? 'profile_overview_owner' : 'profile_overview';
    // $: proxyOverviewActionsImage = isCurrentUser ? 'profile_overview_owner_actions' : 'profile_overview_actions';

    function userRequestConnection() {
        requestConnection(userId);
    }

    function messageCurrentUser() {
        messageUser(userId);
    }

    function showProfileOptions() {
		if (isCurrentUser) {
			showMenu(menuIds.PROFILE_OWNER_MENU);
		} else {
			showMenu(menuIds.PROFILE_MENU);
		}
    }
</script>

<div class="content">
    <div class="profileOverview">
        <!-- <Proxy image="{proxyImage}" className="proxyOverview">
            <Hotspot onClick="{showLikes}" style="
                left: 199px;
                top: 144px;
                width: 77px;
                height: 39px;" />
        </Proxy> -->
        {#if coverImage}
            <div style="background-image: url({coverImage})" class="coverImage" alt="cover image" />
        {:else}
            <div class="coverImage" style="{coverBgStyling}" />
        {/if}
        <div class="profileOverviewHeader">
            <!-- <div class="profileImage" style="{profileImageBgStyling}">
                <img src="{profileImageSrc}" alt="{userFirstName}" />
            </div> -->
            <div class="avatarContainer">
                <AvatarIcon user="{viewedUser}" />
            </div>
            <Button className="optionsButton" icon="{OptionsMenuIcon}" onClick="{showProfileOptions}"></Button>
            {#if isCurrentUser}
                <Button className="editButton" icon="{EditIcon}" onClick="{editProfile}">edit</Button>
            {/if}
            {#if $showBetaFeatures}
                <div class="userStats">
                    <Button><span class="label">posts</span><div class="count">{postsCount}</div></Button>
                    <Button onClick="{showLikes}"><span class="label">likes</span><div class="count">{likesCount}</div></Button>
                    <Button><span class="label">follows</span><div class="count">{followsCount}</div></Button>
                </div>
            {/if}
            <div class="itemContent">
                <div class="header">{userName}</div>
                <div class="username">{username}</div>

                {#if userBio}
                    <div class="description">{@html userBioHTML}</div>
                {:else if isCurrentUser}
                    <Button className="addDetailsButton" onClick="{editProfile}" icon="{AddDetailsIcon}">add bio</Button>
                {/if}
            </div>

            <!-- <Proxy image="{proxyOverviewActionsImage}" className="proxyOverview">
                {#if !isCurrentUser}
                    <Hotspot onClick="{e => loadConversation('r70dp2bf')}" style="
                        left: 11px;
                        top: 7px;
                        width: 116px;
                        height: 40px;" />

                    {#if requestedConnection}
                        <Proxy image="profile_invitation_sent" absolutePlacement="true" style="
                            width: 336px;
                            height: 104px;

                            left: 209.5px;
                            top: 2.5px;" />
                    {:else}
                        <Hotspot onClick="{userRequestConnection}" style="
                            right: 5px;
                            top: 7px;
                            width: 137px;
                            height: 40px;" />
                    {/if}
                {/if}
            </Proxy> -->

            {#if !isCurrentUser}
                    <div class="overviewActions">
                        <Button className="sendMessageButton" onClick="{messageCurrentUser}" icon="{SendMessageIcon}">message</Button>
                        {#if $showBetaFeatures}
                            <Button className="connectButton {showConnect ? 'isButton' : ''}" onClick="{showConnect ? userRequestConnection : null}" icon="{ConnectIcon}">{showConnect ? 'connect' : (requestedConnection ? 'request sent' : 'connected')}</Button>
                        {/if}
                    </div>
            {/if}

            {#if userLocation}
                <!-- {#if $showBetaFeatures} -->
                    <div class="footerActions">
                        <Location location="{userLocation}" hideWithVisibility="{isCurrentUser}" />
                        {#if isCurrentUser && $showBetaFeatures}
                            <Audience />
                        {/if}
                    </div>
                <!-- {/if} -->
            {/if}
        </div>
    </div>
</div>

<style>
    .profileOverview {
        background-color: #ffffff;
        /* height: 377px; */
    }

	/* .content :global(.proxyOverview) {
		position: absolute;
        opacity: 0.5;
	} */

	.coverImage {
		width: 100%;
        padding-top: 48.7%;
    	background-size: cover;
        background-position: center;

        /* height: 200px; */
        /* object-fit: cover; */

        background-color: #dedede;
	}

    .profileOverviewHeader {
        position: relative;
    }

    .avatarContainer {
        position: absolute;
        top: 0;
        left: 0;
        height: 52px;
    }

    .content :global(.avatarIcon) {
        position: absolute;
        left: 16px;
        bottom: 0;
        /* margin-top: -48px; */

        /* width: 108px;
        height: 108px; */
        min-width: 108px;
        min-height: 108px;
        max-width: 156px;
        max-height: 156px;
        width: 40vw;
        height: 40vw;

        border: 4px solid #ffffff;
        box-sizing: content-box;
        overflow: initial;
    }
    .content :global(.avatarIconImage) {
        border: 1px solid #cacaca;
        border-radius: 999px;
        overflow: hidden;
        box-sizing: border-box;
    }

    /* .profileImage {
        position: absolute;
        left: 14px;
        margin-top: -48px;

        width: 108px;
        height: 108px;

        border-radius: 999px;
        border: 4px solid #ffffff;

        background-color: #C8C8C8;
    }
    .profileImage img {
        width: 100%;
        height: 100%;
        object-fit: cover;

        border-radius: 999px;
        overflow: hidden;
        border: 1px solid #cacaca;

        margin-left: -1px;
        margin-top: -1px;
    } */

    .itemContent {
        padding-top: 60px;
        padding-left: 23px;
        padding-bottom: 18px;
    }

    .header {
        font-size: 2.2rem;
        padding-top: 3px;
        padding-right: 136px;
    	line-height: 3rem;

        user-select: text;
	}

    .username {
        font-size: 1.5rem;
        padding-right: 60px;
        padding-bottom: 5px;
        margin-top: -6px;
        line-height: 3rem;

        user-select: text;

        color: #999999;
    }

    .description {
		padding: 10px;
        padding-top: 12px;
        padding-right: 23px;
        /* padding-right: 50px; */

        font-size: 1.5rem;
		line-height: 2rem;

		margin-left: -10px;

        user-select: text;

        overflow-wrap: break-word;
        word-wrap: break-word;

		color: #555555;
	}
    .description :global(a) {
        user-select: text;
    }

    .content :global(.addDetailsButton) {
		display: table;

		padding: 10px;
		padding-right: 45px;

        padding-left: 0;
        padding-top: 20px;

		font-size: 1.5rem;
		font-weight: 700;

		color: #DF3C3C;
	}
    .content :global(.addDetailsButton .icon) {
    	padding-left: 16px;
	}

    .content :global(.optionsButton) {
		position: absolute;

        top: 67px;
		right: 0;

		width: 28px;
		height: 26px;
		padding: 8px;
	}
    .content :global(.optionsButton .icon) {
		margin-top: 1px;
    	margin-left: 4px;
	}

    .content :global(.editButton) {
		position: absolute;

		top: 69px;
    	right: 45px;

		width: 28px;
		height: 26px;
		padding: 8px;

		font-size: 1.5rem;
		font-weight: 700;

        padding-right: 33px;
	}
    .content :global(.editButton .icon) {
        padding-left: 12px;
	}

    .userStats {
        position: absolute;
        top: 12px;
        left: 135px;
        right: 16px;

		display: flex;
		justify-content: space-between;
    }

    .userStats :global(.button) {
		width: 33%;
		display: flex;
		justify-content: center;
		align-items: center;

        padding: 8px 0;

        font-size: 1.3rem;
		font-weight: 700;
        color: #0D0D0D;

        white-space: nowrap;
        min-width: 65px;
    }

    .userStats :global(.count) {
		display: inline-block;
		vertical-align: bottom;
		position: relative;

        padding-bottom: 1px;
        padding-left: 6px;

        font-size: 1.2rem;
        font-weight: 700;
        color: #666666;
    }

    .userStats :global(.label) {
        border-bottom: 2px solid #CCCCCC;
        padding-bottom: 2px;
    }

    .overviewActions  {
        position: relative;
        width: 100%;
        height: 54px;
        /* margin-top: 4px; */
    }

    .overviewActions :global(.sendMessageButton) {
    	position: absolute;
		padding: 10px;
    	padding-right: 40px;

		margin-left: 13px;

		font-size: 1.5rem;
		font-weight: 700;

    	margin-top: 4px;
    }
    .overviewActions :global(.sendMessageButton .icon) {
    	padding-left: 12px;
	}

    .overviewActions :global(.connectButton) {
		position: absolute;
		top: 8px;
        right: 18px;

		padding: 6px 41px 6px 18px;

		font-size: 1.5rem;
		font-weight: 700;

    	margin-right: -6px;
    }
    .overviewActions :global(.connectButton .icon) {
		margin-left: 5px;
		margin-top: -2px;
    }
    .overviewActions :global(.isButton) {
		border: 2px solid #0B0B0B;
		margin-right: -2px; margin-top: -2px; /* factor in border */
		border-radius: 999px;
    }

    .footerActions {
        position: relative;
        padding-bottom: 10px;
        margin-top: -4px;
    }

    .footerActions :global(.audienceButton) {
		position: absolute;
        top: -3px;
        right: 8px;
	}
</style>
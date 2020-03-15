<script>
    import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

    import { viewedUser } from '../../models/appState';

    import { showLikes, loadConversation } from '../../actions/appActions.js';
	import { requestConnection } from '../../actions/userActions';

	$: requestedConnection = $viewedUser ? $viewedUser.requestedConnection : false;
    $: viewingOwnProfile = $viewedUser ? $viewedUser.isCurrentUser : false;

    $: username = $viewedUser ? $viewedUser.username : '';

    $: userFullName = $viewedUser ? $viewedUser.fullName : '';
    $: userFirstName = $viewedUser ? $viewedUser.firstName : '';
    $: userBio = $viewedUser ? $viewedUser.bio : '';

	$: coverImage = 'content/users/' + username + '/cover.jpg';
	$: profileImage = 'content/users/' + username + '/profile.jpg';

    $: proxyImage = viewingOwnProfile ? 'profile_overview_owner' : 'profile_overview';
	$: proxyOverviewActionsImage = viewingOwnProfile ? 'profile_overview_owner_actions' : 'profile_overview_actions';
</script>

<div class="content">
    <div class="profileOverview">
        <Proxy image="{proxyImage}" className="proxyOverview">
            <!-- Likes -->
            <Hotspot onClick="{showLikes}" style="
                left: 199px;
                top: 144px;
                width: 77px;
                height: 39px;" />
        </Proxy>
        <img src="{coverImage}" class="coverImage" alt="cover image" />
        <div class="profileOverviewHeader">
            <div class="profileImage">
                <img src="{profileImage}" alt="{userFirstName}" />
            </div>
            <div class="itemContent">
                <div class="header">{userFullName}</div>
                <div class="username">@{username}</div>
                <div class="description">{@html userBio}</div>
            </div>
        </div>
    </div>
    <Proxy image="{proxyOverviewActionsImage}">
        {#if !viewingOwnProfile}
            <!-- Send Message -->
            <Hotspot onClick="{e => loadConversation('r70dp2bf')}" style="
                left: 11px;
                top: 7px;
                width: 116px;
                height: 40px;" />

            {#if requestedConnection}
                <!-- Request Sent Notification -->
                <Proxy image="profile_invitation_sent" absolutePlacement="true" style="
                    width: 336px;
                    height: 104px;

                    left: 209.5px;
                    top: 2.5px;" />
            {:else}
                <!-- Connect -->
                <Hotspot onClick="{e => requestConnection('l40smlp3')}" style="
                    right: 5px;
                    top: 7px;
                    width: 137px;
                    height: 40px;" />
            {/if}
        {/if}
    </Proxy>
</div>

<style>
    .profileOverview {
        height: 377px;
    }

	.content :global(.proxyOverview) {
		position: absolute;
        opacity: 0.5;
	}

	.coverImage {
		width: 100%;
	}

    /* .profileOverviewHeader {

    } */
    .profileImage {
        position: absolute;
        left: 14px;
        margin-top: -48px;

        width: 108px;
        height: 108px;

        border-radius: 999px;
        overflow: hidden;
        border: 4px solid #ffffff;
    }
    .profileImage img {
        width: 100%;
    }

    .itemContent {
        padding-top: 70px;
        padding-left: 23px;
    }

    .header {
        font-size: 2.2rem;
        padding-top: 3px;
        padding-right: 136px;
    	line-height: 3rem;
	}

    .username {
        font-size: 1.5rem;
        padding-right: 60px;
        padding-bottom: 5px;
        margin-top: -6px;
        line-height: 3rem;

        color: #999999;
    }

    .description {
		padding: 10px;
		padding-top: 12px;
        padding-right: 50px;

        font-size: 1.5rem;
		line-height: 2rem;

		margin-left: -10px;

		color: #555555;
	}
</style>
<script>
    import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

    import { viewedUser } from '../../models/appState';

    import { showLikes, loadConversation } from '../../actions/appActions.js';
	import { requestConnection } from '../../actions/userActions';

	$: requestedConnection = $viewedUser ? $viewedUser.requestedConnection : false;
    $: viewingOwnProfile = $viewedUser ? $viewedUser.isCurrentUser : false;

	$: username = $viewedUser ? $viewedUser.username : '';

	$: coverImage = 'content/users/' + username + '/cover.jpg';

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
</style>
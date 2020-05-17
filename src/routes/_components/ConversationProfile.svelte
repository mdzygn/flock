<script>
    import Proxy from '../../components/Proxy.svelte';

    import AvatarIcon from '../_components/AvatarIcon.svelte';
    import Location from '../_components/Location.svelte';

    import {
        viewedUser
    } from '../../models/appModel';

    $: userDisplayName = ($viewedUser && $viewedUser.name) || '';
    $: username = ($viewedUser && $viewedUser.username && '@' + $viewedUser.username) || '';
    $: userLocation = ($viewedUser && $viewedUser.location) || '';
</script>

<div class="conversationProfile">
    <div class="profileInfo">
        <!-- <Proxy image="message_new_message_profile" className="proxyOverlay" /> -->

        <AvatarIcon user="{viewedUser}" useThumb="{true}" />

        <div class="userDisplayName">{userDisplayName}</div>
        <div class="username">{username}</div>

        {#if userLocation}
            <Location location="{userLocation}" />
        {/if}
    </div>
</div>

<style>
	/* .conversationProfile :global(.proxyOverlay) {
		position: absolute;
		opacity: 0.5;
	} */

	.conversationProfile {
    	width: 100%;
		display: flex;
        justify-content: center;
	}

	.profileInfo {
		position: absolute;
		top: 60px;
		width: 217px;
		display: flex;
        align-items: center;
        flex-direction: column;
	}

    .conversationProfile :global(.avatarIcon) {
        margin-top: 17px;
        height: 108px;
        width: 108px;
        /* position: absolute;
        top: 0;
        left: 16px; */
    }

    .userDisplayName {
        font-size: 2.2rem;
        padding-top: 6px;
    	line-height: 3rem;

        user-select: text;
    }

    .username {
        font-size: 1.5rem;
        margin-top: -6px;
        padding-bottom: 7px;
        line-height: 3rem;

        user-select: text;

        color: #999999;
    }

    .conversationProfile :global(.location) {
        margin-left: initial;
        font-size: 1.1rem;
    }
</style>
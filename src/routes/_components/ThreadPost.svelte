<script>
    import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

    import AvatarIcon from '../_components/AvatarIcon.svelte';

    import { parseHTML } from '../../utils';

    import { loadProfile } from '../../actions/appActions';

    import { getUser } from '../../models/usersModel';

    export let post;

    $: userId = ($post && $post.userId) || null;
    $: user = userId && getUser(userId) || null;
    $: userLoaded = ($user && $user.fullName) || false;
    $: userFullName = ($user && $user.fullName) || '&nbsp;';
    $: username = ($user && $user.username && '@' + $user.username) || '';

    $: title = ($post && $post.title) || '';
    $: message = ($post && $post.message) || '';

    $: titleHTML = parseHTML(title);
    $: messageHTML = parseHTML(message);

    const date = '5 Jan at 4:23pm';

    function viewUserProfile() {
        if (userLoaded) {
            loadProfile(userId);
        }
    }
</script>

<div class="threadPost">
    <!-- <div class="proxyOverlay">
        <Proxy image="thread_post" className="proxyTheadPost">
            <Hotspot onClick="{e => loadProfile('bl20a8lm')}" style="
                left: 12px;
                top: 9px;
                width: 67px;
                height: 65px;" />
        </Proxy>
        <Proxy image="thread_actions" className="proxyThreadActions" />
    </div> -->

    <AvatarIcon {user} onClick="{userLoaded ? viewUserProfile : null}" />
    <div class="info">
        <div class="userFullName" class:button="{userLoaded}">{@html userFullName}</div>
        <div class="username" class:button="{userLoaded}">{username}</div>
    </div>
    <div class="postContent">
        {#if date}
            <div class="date">{date}</div>
        {/if}
        {#if title}
            <div class="title">{@html titleHTML}</div>
        {/if}
        {#if message}
            <div class="message">{@html messageHTML}</div>
        {/if}
    </div>
</div>

<style>
	/* .threadPost :global(.proxyOverlay) {
		position: absolute;
		opacity: 0.5;
	} */

    .threadPost {
		margin-top: 5px;
        background-color: #ffffff;
        padding-bottom: 20px;
    }

    .threadPost :global(.avatarIcon) {
        position: absolute;
        left: 23px;
        top: 23px;
        height: 65px;
        width: 65px;
    }

    .info {
        position: absolute;
        padding-top: 29px;
        padding-right: 100px;
        padding-left: 104px;
    }

    .userFullName {
        font-size: 1.7rem;
        color: #222222;
        font-weight: 700;
    }

    .username {
        font-size: 1.4rem;
        color: #666666;
        margin-top: -2px;
    }

    .postContent {
        padding-top: 95px;
        padding-left: 26px;
        padding-right: 40px;
    }

    .date {
        font-size: 1.3rem;
        color: #999999;
        padding-bottom: 10px;
    }

    .title {
        font-size: 1.9rem;
        line-height: 2rem;
        color: #000000;
        font-weight: 700;
        padding-bottom: 10px;

        /* white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; */
    }

    .message {
        font-size: 1.5rem;
        line-height: 1.7rem;
        color: #333333;
    }
</style>
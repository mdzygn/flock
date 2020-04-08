<script>
    import { writable } from 'svelte/store';

    import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

    import AvatarIcon from '../_components/AvatarIcon.svelte';

	import NewPostButton from '../_components/NewPostButton.svelte';

    import { parseHTML, getDateString } from '../../utils';

    import {
        loadProfile,
        checkLoggedIn,
		newThreadPost,
    } from '../../actions/appActions';

    import { getUser } from '../../models/usersModel';

    export let post;

    let user = writable([]);

    $: userId = ($post && $post.userId) || null;
    $: { user = getUser(userId) };
    $: userLoaded = ($user && $user.fullName) || false;
    $: userFullName = ($user && $user.fullName) || '&nbsp;';
    $: username = ($user && $user.username && '@' + $user.username) || '';

    $: title = ($post && $post.title) || '';
    $: message = ($post && $post.message) || '';
    $: createdAt = ($post && $post.createdAt) || '';

    $: dateString = (createdAt && getDateString(createdAt, 'ddd d MMM') + ' at ' + getDateString(createdAt, 'h:mmtt')) || '&nbsp;';

    $: titleHTML = parseHTML(title);
    $: messageHTML = parseHTML(message);

    const date = ''; //'5 Jan at 4:23pm';

    function viewUserProfile() {
        if (userLoaded) {
            loadProfile(userId);
        }
    }

    function reply() {
		if (!checkLoggedIn()) { return; }
		newThreadPost();
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

    <div class="info" on:click="{userLoaded ? viewUserProfile : null}">
        <div class="userFullName" class:button="{userLoaded}">{@html userFullName}</div>
        <div class="username" class:button="{userLoaded}">{username}</div>
    </div>
    <AvatarIcon {user} onClick="{userLoaded ? viewUserProfile : null}" />
    <div class="postContent">
        <div class="date">{@html dateString}</div>
        {#if title}
            <div class="title">{@html titleHTML}</div>
        {/if}
        {#if message}
            <div class="message">{@html messageHTML}</div>
        {/if}
    </div>
	<NewPostButton onClick="{reply}" className="replyButton" type="reply" />
</div>

<style>
	/* .threadPost :global(.proxyOverlay) {
		position: absolute;
		opacity: 0.5;
	} */

    .threadPost {
		margin-top: 5px;
        background-color: #ffffff;
    }

    .button {
        cursor: pointer;
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

        user-select: text;
    }

    .username {
        font-size: 1.4rem;
        color: #666666;
        margin-top: -2px;

        user-select: text;
    }

    .postContent {
        padding-top: 95px;
        padding-left: 26px;
        padding-right: 40px;
        padding-bottom: 5px;
    }

    .date {
        font-size: 1.3rem;
        color: #999999;
        padding-bottom: 2px;

        user-select: text;
    }

    .title {
        font-size: 1.9rem;
        line-height: 2rem;
        color: #000000;
        font-weight: 700;
        padding-bottom: 2px;
        padding-top: 8px;

        user-select: text;

        /* white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; */
    }

    .message {
        font-size: 1.5rem;
        line-height: 1.7rem;
        color: #333333;
        padding-top: 8px;

        user-select: text;
    }
</style>
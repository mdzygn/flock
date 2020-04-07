<script>
	import { goto } from '@sapper/app';

    // import Button from '../../components/Button.svelte';
    // import Counter from '../_components/Counter.svelte';

    // import ArrowIcon from "../../assets/icons/next_arrow.png";

    import AvatarIcon from '../_components/AvatarIcon.svelte';

    import { parseHTML } from '../../utils';

    import { getUser } from '../../models/usersModel';

	import {
        loadProfile,
        loadPost,
	} from '../../actions/appActions';

    export let post;

    // export let type = 'thread';

    $: postId = ($post && $post.id) || null;

    $: userId = ($post && $post.userId) || null;
    $: user = userId && getUser(userId) || null;
    $: userLoaded = ($user && $user.fullName) || false;
    $: userFullName = ($user && $user.fullName) || '&nbsp;';

    $: title = ($post && $post.title) || null;
    $: message = ($post && $post.message) || null;

    // $: titleHTML = parseHTML(title);
    // $: messageHTML = parseHTML(message);

    function viewUserProfile(event) {
        if (userLoaded) {
            loadProfile(userId);
        }
        event && event.stopPropagation();
    }

    function loadCurrentPost() {
        if (postId) {
            loadPost(postId);
            // goto('posts/' + postId);
        }
    }
</script>

<div class="postItem" on:click="{loadCurrentPost}">
    <!-- <Avatar  -->
    <AvatarIcon {user} onClick="{userLoaded ? viewUserProfile : null}" />
    <div class="info">
        <div class="userFullName" class:button="{userLoaded}">{@html userFullName}</div>
        {#if title}
            <div class="title">{title}</div>
        {/if}
        {#if message}
            <div class="message">{message}</div>
        {/if}
    </div>

</div>

<style>
    .postItem {
        position: relative;

        background-color: #ffffff;

        margin-bottom: 5px;
    }

    .button {
        cursor: pointer;
    }

    .postItem :global(.avatarIcon) {
        position: absolute;
        left: 14px;
        top: 16px;
        height: 40px;
        width: 40px;
    }
    .info {
        padding: 15px;
        padding-left: 66px;
    }

    .userFullName {
        font-size: 1.3rem;
        color: #777777;
        font-weight: 700;
        padding-bottom: 5px;
    }

    .title {
        font-size: 1.5rem;
        line-height: 1.7rem;
        color: #000000;
        font-weight: 700;
        padding-bottom: 8px;

        /* white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; */
    }

    .message {
        font-size: 1.5rem;
        line-height: 1.7rem;
        color: #333333;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
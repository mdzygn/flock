<script>
	import { goto } from '@sapper/app';

    // import Button from '../../components/Button.svelte';
    // import Counter from '../_components/Counter.svelte';

    // import ArrowIcon from "../../assets/icons/next_arrow.png";

    import Counter from '../_components/Counter.svelte';

    import AvatarIcon from '../_components/AvatarIcon.svelte';

    import { parseHTML, getUnbrokenText } from '../../utils';

    import { getUser } from '../../models/usersModel';

	import {
        loadProfile,
        loadPost,
	} from '../../actions/appActions';

    export let post;

    export let type = 'thread';

    // export let type = 'thread';

    $: postId = ($post && $post.id) || null;

    $: userId = ($post && $post.userId) || null;
    $: user = userId && getUser(userId) || null;
    $: userLoaded = ($user && $user.fullName) || false;
    $: userFullName = ($user && $user.fullName) || '&nbsp;';

    $: title = ($post && $post.title) || null;
    $: message = ($post && $post.message) || null;

    $: showTitle = (type === 'thread');
    $: canLinkThrough = (type === 'thread');
    $: linkUserName = (type === 'threadPost');
    $: displayBreaks = (type !== 'thread');

    $: titleHTML = displayBreaks ? title : getUnbrokenText(title);
    $: messageHTML = displayBreaks ? message : getUnbrokenText(message);

    $: repliesCount = ($post && $post.postCount) || 0;


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

<div class="postItem" class:button="{canLinkThrough}" on:click="{canLinkThrough ? loadCurrentPost : null}">
    <!-- <Avatar  -->
    <AvatarIcon {user} onClick="{userLoaded ? viewUserProfile : null}" />
    <Counter visible="{repliesCount}" count="{repliesCount}" />
    <div class="info">
        <div class="userFullName" class:button="{linkUserName && userLoaded}" on:click="{linkUserName && userLoaded ? viewUserProfile : null}">{@html userFullName}</div>
        {#if showTitle && title}
            <div class="title">{@html titleHTML}</div>
        {/if}
        {#if message}
            <div class="message">{@html  messageHTML}</div>
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
        /* font-weight: 700; */
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

    .postItem :global(.counterContainer) {
        float: right;
        margin-top: 12px;
        margin-right: 18px;
    }
</style>
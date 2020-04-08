<script>
    import { goto } from '@sapper/app';
    import { writable } from 'svelte/store';

    // import Button from '../../components/Button.svelte';
    // import Counter from '../_components/Counter.svelte';

    // import ArrowIcon from "../../assets/icons/next_arrow.png";

    import Counter from '../_components/Counter.svelte';

    import AvatarIcon from '../_components/AvatarIcon.svelte';

    import CommentIcon from "../../assets/icons/comment_small.png";
    import ReplyIcon from "../../assets/icons/reply_small.png";

    import { parseHTML, getUnbrokenText, getDateString, getDateAge, getDateAgeString } from '../../utils';

    import { getUser } from '../../models/usersModel';

	import {
        loadProfile,
        loadPost,
	} from '../../actions/appActions';

    export let post;

    export let type = 'thread';

    // export let type = 'thread';

    let user = writable([]);

    $: postId = ($post && $post.id) || null;

    $: userId = ($post && $post.userId) || null;
    $: { user = getUser(userId) };
    $: userLoaded = ($user && $user.fullName) || false;
    $: userFullName = ($user && $user.fullName) || '&nbsp;';

    $: title = ($post && $post.title) || null;
    $: message = ($post && $post.message) || null;

    $: showTitle = (type === 'thread');
    $: canLinkThrough = (type === 'thread');
    $: linkUserName = (type === 'threadPost');
    $: displayBreaks = (type !== 'thread');
    $: showLastActiveTime = (type === 'thread');
    $: showReplyIcon = (type === 'thread');
    $: textSelectable = (type !== 'thread');
    $: messageLimited = (type === 'thread');

    $: titleHTML = displayBreaks ? title : getUnbrokenText(title);
    $: messageHTML = displayBreaks ? message : getUnbrokenText(message);

    $: repliesCount = ($post && $post.postCount) || 0;

    $: date = $post && showLastActiveTime ? $post.lastActiveAt : $post.createdAt;

    let dateString = '';
    // $: isRecent = !showLastActiveTime && getDateAge(date).hours < 1;
    // $: dateString = (showLastActiveTime && repliesCount) ? 'active ' + getDateAgeString(date) : (isRecent ? getDateAgeString(date) : getDateString(date));
    $: {
        if (date) {
            if (showLastActiveTime && repliesCount) {
                dateString = 'active ' + getDateAgeString(date);
            } else {
                const dateAge = getDateAge(date);
                if (dateAge.hours < 0.66) {
                    dateString = getDateAgeString(date);
                } else if (dateAge.days < 0.66) {
                    dateString = getDateString(date, 'h:mmtt');
                } else {
                    dateString = getDateString(date);
                }
            }
        }
    }


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
    {#if repliesCount}
        <div class="commentIcon" style="background-image: url({CommentIcon})"/>
        <Counter count="{repliesCount}" />
    {:else}
        {#if showReplyIcon}
            <div class="replyIcon" style="background-image: url({ReplyIcon})"/>
        {/if}
    {/if}
    <div class="info">
        <div class="userFullName" class:selectable="{textSelectable}">
            <span div="userFullNameLabel" class:button="{linkUserName && userLoaded}" on:click="{linkUserName && userLoaded ? viewUserProfile : null}">{@html userFullName}</span>
            {#if dateString}<span class="date"> - {dateString}</span>{/if}
        </div>
        {#if showTitle && title}
            <div class="title">{@html titleHTML}</div>
        {/if}
        {#if message}
            <div class="message" class:selectable="{textSelectable}" class:messageLimited="{messageLimited}">{@html  messageHTML}</div>
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
        padding-right: 20px;
    }

    .userFullName {
        font-size: 1.3rem;
        color: #777777;
        /* font-weight: 700; */
        padding-bottom: 5px;
    }

    .date {
        color: #bbbbbb;
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
    }
    .messageLimited {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .selectable {
        user-select: text;
    }

    .postItem :global(.counterContainer) {
        float: right;
        margin-top: 12px;
        margin-right: 18px;
    }

    .commentIcon {
        position: absolute;
        right: 48px;
        top: 15px;

        background-size: cover;
        width: 17px;
        height: 17px;
    }

    .replyIcon {
        position: absolute;
        right: 19px;
        top: 15px;

        background-size: cover;
        width: 22px;
        height: 22px;
    }
</style>
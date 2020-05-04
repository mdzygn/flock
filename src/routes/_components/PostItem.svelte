<script>
    import { goto } from '@sapper/app';
    import { get, writable } from 'svelte/store';

    import config from '../../config';
    import locale from '../../locale';

    import { menuIds } from '../../config/menus';

    import Button from '../../components/Button.svelte';
    // import Counter from '../_components/Counter.svelte';

    // import ArrowIcon from "../../assets/icons/next_arrow.png";

    import Counter from '../_components/Counter.svelte';

    import AvatarIcon from '../_components/AvatarIcon.svelte';

    import LikeIcon from "../../assets/icons/post_like.png";
    import LikeSelectedIcon from "../../assets/icons/post_like_selected.png";
    import CommentIcon from "../../assets/icons/comment_small.png";
    import ReplyIcon from "../../assets/icons/reply_small.png";
	import OptionsMenuIcon from "../../assets/icons/menu.png";

    import { parseHTML, getUnbrokenText, getDateString, getDateAge, getDateAgeString, secondsDiff } from '../../utils';

    import { getUser } from '../../models/usersModel';

	import {
        project,
        userId,
        targetPost,
		getHeaderImage,
    } from '../../models/appModel';

	import {
        loadProfile,
        loadPost,
        showMenu,
    } from '../../actions/appActions';

	import {
        postToggleLiked,
    } from '../../actions/postActions';

    import {
        getPost,
    } from '../../models/postsModel';

    export let post;

    export let type = 'thread';

    // export let type = 'thread';

    let user = writable([]);

	$: isArchived = ($project && $project.archived) || false;

    $: postId = ($post && $post.id) || null;

    $: postUserId = ($post && $post.userId) || null;
    $: { user = getUser(postUserId) };
    $: userLoaded = ($user && $user.name) || false;
    $: userName = ($user && $user.name) || '';
    $: userNameString = userName || ''; // '&nbsp;';

    $: title = ($post && $post.title) || null;
    $: message = ($post && $post.message) || null;
    $: image = ($post && $post.image) || null;

    $: thumbImage = image && getHeaderImage(image, true);

    $: liked = ($post && $post.liked) || false;

    $: canEdit = ($post && $post.userId && $post.userId === $userId) || false;

    $: showTitle = (type === 'thread');
    $: canLinkThrough = (type === 'thread');
    $: linkUserName = (type === 'threadPost');
    $: displayBreaks = (type !== 'thread');
    $: showLastActiveTime = (type === 'thread');
    $: textSelectable = (type !== 'thread');
    $: messageLimited = (type === 'thread');
    // $: compressedMargin = (type === 'threadPost');

    $: likeCount = ($post && $post.likeCount) || '';

    $: showRepliesIcon = (type === 'thread') && repliesCount;
    $: showReplyIcon = (type === 'thread') && !repliesCount;

    $: showOptionsButton = canEdit && (type !== 'thread');

    $: showEdited = ((type !== 'thread') && ($post && $post.edited && secondsDiff($post.createdAt, $post.editedAt) > config.SHOW_EDITED_MIN_TIME)) || false;
    $: editedDate = (showEdited && $post.editedAt && getDateString($post.editedAt)) || '';

    // $: console.log('post diff', secondsDiff($post.createdAt, $post.editedAt));

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
                dateString = 'active ' + getDateAgeString(date, {allowLessThanMinute: false});
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
            loadProfile(postUserId);
        }
        event && event.stopPropagation();
    }

    function loadCurrentPost() {
        if (postId) {
            loadPost(postId);
            // goto('posts/' + postId);
        }
    }

	function toggleLiked(event) {
        event && event.stopPropagation();
        postToggleLiked(postId);
    }

    function showPostOptions(event) {
        event && event.stopPropagation();

        const postModel = getPost(postId);
        if (postModel) {
            const post = get(postModel);
            $targetPost = post;

            showMenu(menuIds.POST_OPTIONS);
        }
    }
</script>

<div class="postItem" class:hasThumb="{!!thumbImage}" class:button="{canLinkThrough}" on:click="{canLinkThrough ? loadCurrentPost : null}"
    class:showReplyIcon="{showReplyIcon}"
    class:showRepliesIcon="{showRepliesIcon}"
    class:showOptionsButton="{showOptionsButton}">
    <!-- <Avatar  -->
    <AvatarIcon {user} onClick="{userLoaded ? viewUserProfile : null}" useThumb="{true}" />
    <div class="buttonGroup" class:buttonGroupOffset="{showOptionsButton}">
        {#if !isArchived}
            <Button className="likeButton" onClick="{toggleLiked}" icon="{liked ? LikeSelectedIcon : LikeIcon}">
                <!-- <div class="likeIcon" style="background-image: url({LikeIcon})"/> -->
                <div class="count">{likeCount}</div>
                <!-- <Counter count="{likeCount}" /> -->
            </Button>
        {/if}
        {#if showRepliesIcon}
            <Button className="commentButton">
                <div class="commentIcon" style="background-image: url({CommentIcon})"/>
                <Counter count="{repliesCount}" />
            </Button>
        {:else if !isArchived}
            {#if showReplyIcon}
                <div class="replyIcon" style="background-image: url({ReplyIcon})"/>
            {/if}
        {/if}
    </div>
    {#if showOptionsButton}
        <Button className="optionsButton" onClick="{showPostOptions}">
            <div class="optionsIcon" style="background-image: url({OptionsMenuIcon})"/>
        </Button>
    {/if}
    {#if thumbImage}
        <img class="thumb" src="{thumbImage}" alt="{title || 'thumbnail'}" />
    {/if}
    <div class="userName" class:selectable="{textSelectable}">
        <span div="userNameLabel" class:button="{linkUserName && userLoaded}" on:click="{linkUserName && userLoaded ? viewUserProfile : null}">{@html userNameString}</span>
        {#if dateString}<span class="date">{#if userName} - {/if}{dateString}</span>{/if}
        {#if showEdited}<span class="edited" title="{editedDate}">{locale.POST.EDITED}</span>{/if}
    </div>
    <div class="info">
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
    .userName {
        padding-top: 15px;
        padding-left: 66px;
        padding-right: 20px;
    }
    .info {
        /* padding: 15px; */
        padding-bottom: 15px;
        padding-left: 66px;
        padding-right: 20px;
    }

    .hasThumb .info {
        padding-left: 117px;
    }

    .thumb {
        position: absolute;
        left: 65px;
        top: 39px;

        width: 42px;
        height: 42px;
        object-fit: cover;
        border: 1px solid #D9D9D9;
    }

    .userName {
        font-size: 1.3rem;
        color: #777777;
        /* font-weight: 700; */
        padding-bottom: 5px;
        padding-right: 28px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .showReplyIcon .userName {
        padding-right: 64px;
    }
    .showRepliesIcon .userName {
        padding-right: 78px;
    }
    .showReplyIcon.showOptionsButton .userName {
        padding-right: 82px;
    }
    .showRepliesIcon.showOptionsButton .userName {
        padding-right: 96px;
    }
    /* .userName.showReplyIcon {
        padding-right: 20px;
    }
    .userName.showRepliesIcon {
        padding-right: 28px;
    } */

    .date {
        color: #bbbbbb;
    }

    .edited {
        display: inline-block;
        font-size: 1.1rem;
        color: #b9b9b9;
        background-color: #f7f5f5;
        padding: 1px 4px;
        border-radius: 3px;
        user-select: none;
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

    /* .message.compressedMargin {
        padding-right: 32px;
    } */

    .postItem :global(.likeButton) {
        position: absolute;
        right: -4px;
        top: 8px;
        width: 30px;
        margin-right: 9px;
        height: 20px;
        padding: 6px;
    }
    .postItem.showOptionsButton :global(.likeButton) {
        right: -2px;
    }
    .postItem :global(.likeButton .icon) {
        margin-top: -3px;
    }
    .postItem.showReplyIcon :global(.likeButton) {
        right: 30px;
    }
    .postItem.showRepliesIcon :global(.likeButton) {
        right: 44px;
    }

    .count {
        position: absolute;
        margin-top: 3px;
        margin-left: 23px;
        /* width: 20px;
        text-align: center; */

        font-size: 1rem;
        font-weight: 700;
        color: #444444;
    }

    .postItem :global(.commentButton) {
        position: absolute;
        right: 54px;
        top: 16px;
    }
    .commentIcon {
        position: absolute;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        width: 17px;
        height: 17px;
    }

    .buttonGroup.buttonGroupOffset {
        position: absolute;
        right: 16px;
    }

    .postItem :global(.optionsButton) {
        position: absolute;
        right: -1px;
        top: 6px;
        width: 33px;
        height: 38px;
    }
    .optionsIcon {
        position: absolute;
        top: 8px;
        width: 26px;
        height: 20px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }

    .postItem :global(.counterContainer) {
        position: absolute;
        margin-top: -1px;
        margin-left: 20px;
    }
    .postItem :global(.counter) {
        height: 18px;
        width: 18px;
        font-size: 1rem;
        font-weight: 700;
    }
    /*.postItem :global(.counter) {
        border-radius: initial;
        background-color: initial;
        font-size: 1rem;
        color: #333333;
    } */


    .replyIcon {
        position: absolute;
        right: 18px;
        top: 13px;
        /* right: 19px;
        top: 15px; */

        background-size: cover;
        width: 22px;
        height: 22px;
    }
</style>
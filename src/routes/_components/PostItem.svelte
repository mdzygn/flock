<script>
    import { goto } from '@sapper/app';
    import { get, writable } from 'svelte/store';
    import { tick } from 'svelte';

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

    import PlaceholderImage from "../../assets/images/postPlaceholder.png";

    import { getDisplayText, getDateString, getDateAge, getDateAgeString, secondsDiff, stopEvent } from '../../utils';

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
		loadChannel,
    } from '../../actions/appActions';

	import {
        postToggleLiked,
    } from '../../actions/postActions';

    import {
        getPost,
    } from '../../models/postsModel';

    import {
        getUnviewedThreadNotificationCount,
        getThreadUnviewed,
    } from '../../models/notificationsModel';

	import {
		getChannels,
    } from '../../models/channelsModel';

    export let post;

    export let type = 'thread';

    export let showChannelTags = false;

    export let onChannelSelect = null;

    let showFullImage = false;

    // export let type = 'thread';

    let user = writable([]);

	$: isArchived = ($project && $project.archived) || false;

    $: postId = ($post && $post.id) || null;

    $: channelId = ($post && $post.channelId) || null;

    // $: console.log('message', message, 'channelId', channelId, 'channelTagTitle', channelTagTitle);

    $: postUserId = ($post && $post.userId) || null;
    $: { user = getUser(postUserId) };
    $: userLoaded = ($user && $user.name) || false;
    $: userName = ($user && $user.name) || '';
    $: userNameString = userName || ''; // '&nbsp;';

    $: title = ($post && $post.title) || null;
    $: message = ($post && $post.message) || null;
    $: image = ($post && $post.image) || null;

    $: useThumbImage = (type === 'thread');

    // $: imageSrc = image && !useThumbImage && getHeaderImage(image);
    $: thumbImageSrc = image && useThumbImage && getHeaderImage(image, true);

    let imageSrc = PlaceholderImage;
    $: { // load placeholder to set image size
        image;
        if (image && !useThumbImage) {
            (async () => {
                await tick();
                imageSrc = PlaceholderImage;

                await tick();
                setTimeout(() => { // ensure allowing placeholder to resize - tick doesn't seem to be enough
                    imageSrc = getHeaderImage(image);
                }, 0);
            })();
        }
    }

    let canMaximizeImage = false;
    let initializedCanMaximizeImage = false;
    $: {
        if (image && imageSrc && imageSrc !== PlaceholderImage) {
            initializedCanMaximizeImage = true;

            let testImage = new Image();
            testImage.onload = () => {
                if (testImage && (testImage.width >= window.innerWidth || testImage.height >= window.innerWidth * 0.9)) {
                    canMaximizeImage = true;
                }
            };
            testImage.src = imageSrc;
        }
    }

    $: liked = ($post && $post.liked) || false;

    $: canEdit = ($post && $post.userId && $post.userId === $userId) || false;

    $: showTitle = (type === 'thread');
    $: canLinkThrough = (type === 'thread');
    $: linkUserName = (type === 'threadPost');
    // $: displayBreaks = (type !== 'thread');
    $: disallowLinks = (type === 'thread');
    $: showLastActiveTime = (type === 'thread');
    $: textSelectable = (type !== 'thread');
    $: messageLimited = (type === 'thread');
    $: messageLimitedSingleLine = (type === 'thread' && title);
    // $: compressedMargin = (type === 'threadPost');

    $: collapseBreaks = false; // messageLimitedSingleLine; // (type === 'thread');

    $: likeCount = ($post && $post.likeCount) || '';

    $: showRepliesIcon = (type === 'thread') && repliesCount;
    $: showReplyIcon = (type === 'thread') && !repliesCount;

    $: showOptionsButton = canEdit && (type !== 'thread');

    $: showEdited = ((type !== 'thread') && ($post && $post.edited && secondsDiff($post.createdAt, $post.editedAt) > config.SHOW_EDITED_MIN_TIME)) || false;
    $: editedDate = (showEdited && $post.editedAt && getDateString($post.editedAt)) || '';

    // $: console.log('post diff', secondsDiff($post.createdAt, $post.editedAt));
    
    let channels = writable(null);
    $: { if (showChannelTags && $project) channels = getChannels( { projectId: $project.id } ) };

    $: channelTagTitle = showChannelTags && $post && $channels && getChannelTagTitle();
    // $: curChannel = showChannelTags && $channels; // && getChannel();
    // $: channelTagTitle = showChannelTags && curChannel && get(curChannel) && $curChannel.title;

    // $: titleHTML = displayBreaks ? title : getUnbrokenText(title);
    // $: messageHTML = displayBreaks ? message : getUnbrokenText(message);

    $: titleHTML = getDisplayText(title, {disallowLinks, collapseBreaks});
    $: messageHTML = getDisplayText(message, {disallowLinks, collapseBreaks});

    $: repliesCount = ($post && $post.postCount) || 0;
    $: unviewedCount = ($post && getUnviewedThreadNotificationCount($post.id)) || writable(0);

    $: showUnseenIcon = (!repliesCount && $unviewedCount); // (type === 'thread') &&

    $: date = $post && (showLastActiveTime ? $post.lastActiveAt : $post.createdAt);

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
            const onlyHasUnreadReplies = !!($unviewedCount && !getThreadUnviewed(postId));
            // console.log(onlyHasUnreadReplies, $unviewedCount, getThreadUnviewed(postId));
            loadPost(postId, { anchorToBottom: onlyHasUnreadReplies });
            // loadPost(postId);
            // goto('posts/' + postId);
        }
    }

    // function getChannel() {
    function getChannelTagTitle() {
		const curChannel = $channels.find(match => get(match).id === channelId);
        // return curChannel;
        if (!curChannel) {
            return null;
        } else {
            // console.log('getChannelTagTitle', message, get(curChannel).title, get(curChannel).id, channelId);
            const channelTagTitle = get(curChannel).title;
            return channelTagTitle;
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

    function toggleFullImage() {
        showFullImage = !showFullImage;
    }

    function loadCurrentChannel(e) {
        stopEvent(e);

        if (onChannelSelect) {
            onChannelSelect(channelId);
        }
    }
</script>

<div class="postItem" class:hasThumb="{!!thumbImageSrc}" class:button="{canLinkThrough}" class:onlyImageShown="{showFullImage && !title && !message}" on:click="{canLinkThrough ? loadCurrentPost : null}"
    class:showReplyIcon="{showReplyIcon}"
    class:showRepliesIcon="{showRepliesIcon}"
    class:showOptionsButton="{showOptionsButton}"
    class:showUnseenIcon="{showUnseenIcon}">
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
                <Counter count="{$unviewedCount || repliesCount}" hasNew="{$unviewedCount}" />
            </Button>
        {:else if !isArchived}
            {#if showReplyIcon}
                <div class="replyIcon" style="background-image: url({ReplyIcon})"/>
            {/if}
            {#if showUnseenIcon}
                <div class="unseenIcon" />
            {/if}
        {/if}
    </div>
    {#if showOptionsButton}
        <Button className="optionsButton" onClick="{showPostOptions}">
            <div class="optionsIcon" style="background-image: url({OptionsMenuIcon})"/>
        </Button>
    {/if}
    {#if thumbImageSrc}
        <img class="thumb" src="{thumbImageSrc}" alt="{title || 'thumbnail'}" />
    {/if}
    <div class="userName" class:selectable="{textSelectable}">
        <span div="userNameLabel" class:button="{linkUserName && userLoaded}" on:click="{linkUserName && userLoaded ? viewUserProfile : null}">{@html userNameString}</span>
        {#if dateString}<span class="date">{#if userName} - {/if}{dateString}</span>{/if}
        {#if showEdited}<span class="edited" title="{editedDate}">{locale.POST.EDITED}</span>{/if}
    </div>
    <div class="info">
        {#if showTitle && title}
            <div class="title" class:titleLimited="{messageLimited}" class:titleNotLimited="{!messageLimited}">{@html titleHTML}</div>
        {/if}
        {#if message}
            <div class="message" class:selectable="{textSelectable}" class:messageLimited="{messageLimited && !messageLimitedSingleLine}" class:messageLimitedSingleLine="{messageLimitedSingleLine}" class:messageNotLimited="{!messageLimited && !messageLimitedSingleLine}">{@html  messageHTML}</div>
        {/if}
        {#if showChannelTags && channelTagTitle}
            <div class="channelTagContainer">
                <!-- <div class="channelTag">#{channelTagTitle}</div>  -->
                <!-- <Button className="channelTag" onClick="{e => loadChannel(channelId)}">#{channelTagTitle}</Button> -->
                <Button className="channelTag" onClick="{loadCurrentChannel}">#{channelTagTitle}</Button>
                <!-- <Button className="channelTag" onClick="{e => console.log('hi')}">#{channelTagTitle}</Button> -->
                <!-- <Button className="channelTag" onClick="{e => loadChannel(channelId)}">#{channelTagTitle}</Button> -->
                <!-- <Button className="channelTag" onClick="{e => { loadChannel(channelId); return stopEvent(e); }}">#{channelTagTitle}</Button> -->
            </div>
        {/if}
    </div>
    {#if image && !useThumbImage}
        <div class="postImageContainer" class:button="{canMaximizeImage}" on:click="{canMaximizeImage ? toggleFullImage : null}" class:showFullImage="{showFullImage}">
            <img class="postImage" src="{imageSrc}" alt="{title || 'post'}" />
        </div>
    {/if}
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
    .postItem.onlyImageShown :global(.avatarIcon) {
        top: 11px;
        left: 19px;
        height: 30px;
        width: 30px;
    }
    .info {
        /* padding: 15px; */
        padding-bottom: 15px;
        padding-left: 66px;
        padding-right: 20px;
    }

    .hasThumb .info {
        padding-top: 2px;
        padding-left: 128px;
        min-height: 42px;
    }

    .thumb {
        position: absolute;
        left: 65px;
        top: 39px;

        width: 50px;
        height: 50px;
        object-fit: cover;
        border: 1px solid #D9D9D9;
    }

    .userName {
        font-size: 1.3rem;
        color: #777777;
        /* font-weight: 700; */

        padding-top: 15px;
        padding-bottom: 5px;
        
        padding-left: 66px;
        padding-right: 60px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .showReplyIcon .userName {
        padding-right: 77px;
    }
    .showRepliesIcon .userName {
        padding-right: 82px;
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
        
        padding-top: 3px;
        padding-bottom: 8px;
        
        overflow: hidden;
        text-overflow: ellipsis;
        
        /* white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; */
    }

    .titleLimited {
        max-height: 2.8rem;
        overflow-wrap: break-word;
        word-wrap: break-word;
    }
    .titleNotLimited {
        overflow-wrap: break-word;
        word-wrap: break-word;
    }

    .message {
        font-size: 1.5rem;
        line-height: 1.7rem;
        color: #333333;
    }
    .messageLimited {
        overflow: hidden;
        text-overflow: ellipsis;

        max-height: 52px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }
    .messageLimitedSingleLine {
        overflow: hidden;
        text-overflow: ellipsis;

        max-height: 18px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }
    .messageNotLimited {
        overflow-wrap: break-word;
        word-wrap: break-word;
    }

    .channelTagContainer {
        margin-top: 2px;
        margin-bottom: -12px;
        margin-left: -1px;
        /* margin-top: 6px;
        margin-bottom: -6px; */
    }

    .postItem :global(.channelTag) {
        display: inline-block;
        font-size: 1rem;
        color: #0D0D0D;
        /* background-color: #EEEEEE; */
        /* border-radius: 100px; */
        /* padding: 0px 6px; */
    }

    .selectable {
        user-select: text;
    }
    .selectable :global(a) {
        user-select: text;
    }

	.postImageContainer {
        padding-left: 66px;
        padding-right: 43px;
        padding-bottom: 6px;
        margin-top: -4px;
	}
    .postImageContainer.showFullImage {
        padding-left: 0;
        padding-right: 0;
        display: flex;
        justify-content: center;
    }
	.postImage {
        max-width: 100%;
        max-height: 80vw;
        margin-bottom: 8px;
	}
	.postImageContainer.showFullImage .postImage {
        max-height: initial;
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
        right: 40px;
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
        right: 48px;
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
    .postItem :global(.counter.default) {
        background-color: initial;
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

    .postItem.showUnseenIcon .replyIcon {
        display: none;
        /* right: 29px; */
    }
    .postItem.showUnseenIcon :global(.likeButton) {
        right: -4px;
        /* right: 16px; */
        /* right: 38px; */
    }

    .unseenIcon {
        position: absolute;
        top: 18px;
        right: 54px;
        /* right: 13px; */
        width: 12px;
        height: 12px;
        background-color: #DF3C3C;
        border-radius: 999px;
    }
</style>
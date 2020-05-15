<script>
    import { get, writable } from 'svelte/store';

    import Button from '../../components/Button.svelte';

    import config from '../../config';
    import locale from '../../locale';

    import AvatarIcon from './AvatarIcon.svelte';

    import LikeSelectedIcon from "../../assets/icons/post_like_selected.png";

    import { getMessageTime, secondsDiff, getEllipsisText } from '../../utils';

    import { getUser, getUserModelFromData } from '../../models/usersModel';

    import { getConversationUserById } from '../../models/conversationsModel';

    import {
        userId,
        conversation,
        dateDebugOffset,
    } from '../../models/appModel';

    import {
        loadPost,
        loadChannel,
        loadProject,
        loadProfile,
    } from '../../actions/appActions';

    export let message;

    $: lastMessage = ($message && $message.lastMessage) || writable(null);

    $: messageText = ($message && $message.message) || '';

    $: messageId = ($message && $message.id) || null;

    // $: userConversationInfo = getUserConversationInfo($message);
    // $: viewed = userConversationInfo ? userConversationInfo.viewed : true;

    $: date = ($message && $message.createdAt) || null;
    $: dateString = (date && getMessageTime(date)) || '';

    $: actor = ($message && $conversation && getConversationUserById($conversation, $message.userId)) || null;
    $: actorUser = (actor && date && getUserModelFromData(actor, date)) || writable(null);
    $: actorName = ($actorUser && $actorUser.name) || (actor && actor.name) || '';

    // $: console.log('actorUser', $actorUser);

    $: isSelf = (actor && actor.id === $userId);

    $: userBreak = ($lastMessage && $message.userId !== $lastMessage.userId) || false;
    $: hideAvatarImage = ($lastMessage && $message.userId == $lastMessage.userId) || false;
    $: displayDate = ($message && (!$lastMessage || secondsDiff($lastMessage.createdAt, $message.createdAt) > config.DATE_SHOWN_MESSAGE_DATE_DIFF)) || false;

    // $: console.log('displayDate', displayDate, 'secondsDiff', $message && $lastMessage && secondsDiff($message.createdAt, $lastMessage.createdAt));
    // $: console.log('userBreak', userBreak, 'userId', $message.userId, 'last userId', $lastMessage && $lastMessage.userId);

    $: hasLikes = ($message && $message.likes && $message.likes.length) || false;

    // $: displayDate = ($message && $message.displayDate) || false;
    // $: hideAvatarImage = ($message && $message.hideAvatarImage) || false;
    // $: userBreak = ($message && $message.userBreak) || false;

    $: titleString = actorName || '';

    function toggleLiked() {

    }

    $: userLoaded = ($actorUser && $actorUser.name) || false;
    function viewUserProfile() {
        if (userLoaded) {
            loadProfile($actorUser.id);
        }
    }
</script>

<div class="messageListItem">
    {#if displayDate}
        <div class="dateHeader">{dateString}</div>
    {/if}
    <div class="messageContent"
        class:userBreak="{userBreak}"
        class:isSelf="{isSelf}">
        {#if !isSelf && !hideAvatarImage}
            <AvatarIcon user="{actorUser}" onClick="{userLoaded ? viewUserProfile : null}" useThumb="{true}" />
        {/if}
        <div class="detailContent">
            <div class="detailInnerContent">
                <div class="message">{@html messageText}</div>
            </div>
            {#if hasLikes}
                <Button className="likeButton" icon="{LikeSelectedIcon}" />
            {/if}
        </div>
        <!-- <div class="info">
            {#if !viewed}
                <div class="unseenIcon" />
            {/if}
        </div> -->
    </div>
</div>

<style>
    .messageListItem {
        position: relative;

        padding: 3px 0;

        /* cursor: pointer; */
    }

    .messageListItem :global(.avatarIcon) {
        position: absolute;
        top: -4px;
        left: 13px;
        width: 40px;
        height: 40px;
    }

    .messageContent {
        position: relative;
    }

    .messageListItem :global(.messageContent.userBreak) {
        margin-top: 7px;
    }

    .dateHeader {
        font-size: 1.1rem;
        text-align: center;
        color: #AAAAAA;
        margin-top: 12px;
        margin-bottom: 12px;
    }

    .detailContent {
        display: flex;
        margin-left: 66px;

        /* position: absolute; */
        /* margin-right: 110px; */

        /* top: 14px;
        bottom: 0;
        left: 96px;
        right: 46px; */

		/* display: flex;
        align-items: center; */
        /* padding-bottom: 3px; */
    }
    .detailInnerContent {
        display: inline-block;

        border: 1px solid #ACACAC;

        border-radius: 15px;
        padding: 8px 12px;
        max-width: 62%;

        /* width: 100%; */
    }

    .messageListItem :global(.messageContent.isSelf .detailContent)  {
        display: flex;
        /* justify-content: flex-end; */
        flex-direction: row-reverse;
        margin-right: 18px;
    }
    .messageListItem :global(.messageContent.isSelf .detailInnerContent)  {
        background-color: #DDDDDD;
        border-color: #DDDDDD;
    }

    .message {
        font-size: 1.3rem;
        line-height: 1.3rem;
        /* margin-top: 7px; */
    }

    /* .info {
        position: absolute;
        right: 0;
        top: 13px;
    } */

    .messageListItem :global(.likeButton) {
		/* position: absolute;
		top: 4px;
		left: 10px; */

        margin-top: 3px;
        margin-left: 3px;
        margin-right: 3px;

		width: 28px;
		height: 26px;
    }
    .messageListItem :global(.likeButton .icon) {
        padding-left: 10px;
        transform: scale(0.45, 0.45);
    }
</style>
<script>
    import { get, writable } from 'svelte/store';

    import config from '../../config';
    import locale from '../../locale';

    import AvatarIcon from './AvatarIcon.svelte';

    import { getDateString, getEllipsisText } from '../../utils';

    import { getUser, getUserModelFromData } from '../../models/usersModel';

    import { getConversationUser, getUserConversationInfo, getConversationUserById } from '../../models/conversationsModel';

    import {
        userId,
        conversation,
    } from '../../models/appModel';

    import { loadPost, loadChannel, loadProject } from '../../actions/appActions';

    export let message;

    $: messageText = ($message && $message.message) || '';

    $: messageId = ($message && $message.id) || null;

    // $: userConversationInfo = getUserConversationInfo($message);
    // $: viewed = userConversationInfo ? userConversationInfo.viewed : true;

    $: date = ($message && $message.createdAt) || null;
    $: dateString = (date && getDateString(date)) || '';

    $: actor = ($message && $conversation && getConversationUserById($conversation, $message.userId)) || null;
    $: actorUser = (actor && date && getUserModelFromData(actor, date)) || writable(null);
    $: actorName = ($actorUser && $actorUser.name) || (actor && actor.name) || '';

    // $: console.log('actorUser', $actorUser);

    $: isSelf = (actor && actor.id === $userId);

    $: hasLikes = ($message && $message.likes) || false;
    $: hideAvatarImage = ($message && $message.hideAvatarImage) || false;
    $: displayDate = ($message && $message.displayDate) || false;
    $: userBreak = ($message && $message.userBreak) || false;

    $: titleString = actorName || '';
</script>

<div class="messageListItem">
    {#if displayDate}
        <div class="dateHeader">{dateString}</div>
    {/if}
    <div class="messageContent"
        class:userBreak="{userBreak}"
        class:isSelf="{isSelf}">
        {#if !isSelf && !hideAvatarImage}
            <AvatarIcon user="{actorUser}" useThumb="{true}" />
        {/if}
        <div class="detailContent">
            <div class="detailInnerContent">
                <div class="message">{@html messageText}</div>
            </div>
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

        cursor: pointer;
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
        /* position: absolute; */
        margin-left: 66px;
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
        max-width: 35vw;

        /* width: 100%; */
    }

    .messageListItem :global(.messageContent.isSelf .detailContent)  {
        display: flex;
        justify-content: flex-end;
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
</style>
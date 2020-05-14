<script>
    import { get, writable } from 'svelte/store';

    import config from '../../config';
    import locale from '../../locale';

    import AvatarIcon from './AvatarIcon.svelte';

    import { getDateAgeString, getEllipsisText } from '../../utils';

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
    // $: dateString = (date && ' - ' + getDateAgeString(date)) || '';

    $: actor = ($message && $conversation && getConversationUserById($conversation, $message.userId)) || null;
    $: actorUser = (actor && date && getUserModelFromData(actor, date)) || writable(null);
    $: actorName = ($actorUser && $actorUser.name) || (actor && actor.name) || '';

    // $: console.log('actorUser', $actorUser);

    $: isSelf = (actor && actor.id === $userId);

    $: titleString = actorName || '';
</script>

<div class="messageListItem">
    {#if !isSelf}
        <AvatarIcon user="{actorUser}" useThumb="{true}" />
    {/if}
    <div class="detailContent" class:isSelf="{isSelf}">
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

<style>
    .messageListItem {
        position: relative;

        padding: 3px 0;

        cursor: pointer;
    }

    .messageListItem :global(.avatarIcon) {
        position: absolute;
        top: -1px;
        left: 13px;
        width: 40px;
        height: 40px;
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

    .messageListItem :global(.detailContent.isSelf)  {
        display: flex;
        justify-content: flex-end;
        margin-right: 18px;
    }
    .messageListItem :global(.detailContent.isSelf .detailInnerContent)  {
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
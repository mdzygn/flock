<script>
    import { get, writable } from 'svelte/store';

    import config from '../../config';
    import locale from '../../locale';

    import AvatarIcon from './AvatarIcon.svelte';

    import { getDisplayText, getDateAgeString, getEllipsisText } from '../../utils';

    import { getUser, getUserModelFromData } from '../../models/usersModel';

    import { getConversationOtherUser, getUserConversationInfo } from '../../models/conversationsModel';

    import { userId } from '../../models/appModel';

    import { loadPost, loadChannel, loadProject } from '../../actions/appActions';

	import { loadConversation } from '../../actions/appActions';

    export let conversation;

    // $: console.log('conversation', $conversation);

    $: title = ($conversation && $conversation.title) || '';

    $: lastSenderId = ($conversation && $conversation.lastSenderId) || null;

    $: lastMessageText = ($conversation && $conversation.lastMessageText) || '';
    $: lastMessageFormatted = lastMessageText && getDisplayText(lastMessageText, {disallowLinks: true, collapseBreaks: true});
    $: lastMessagePrefixed = lastMessageFormatted && (lastSenderId === $userId ? 'you: ' + lastMessageFormatted : lastMessageFormatted);
    $: lastMessageTruncated = lastMessagePrefixed && getEllipsisText(lastMessagePrefixed, config.CONVERSATION_MAX_PREVIEW_LENGTH);
    $: messagePreview = lastMessageTruncated || '(image)'; // TODO: use if image present to display this

    // $: message = $conversation ? (($conversation.lastMessageText && getEllipsisText($conversation.lastMessageText, config.CONVERSATION_MAX_PREVIEW_LENGTH)) || '(image)') : '';

    $: conversationId = ($conversation && $conversation.id) || null;
    $: projectId = ($conversation && $conversation.projectId) || null;

    $: viewed = $conversation ? $conversation.viewed : true;

    // $: userConversationInfo = getUserConversationInfo($conversation);
    // $: viewed = userConversationInfo ? userConversationInfo.viewed : true;

    // $: projectTitle = $conversation && $conversation.projectTitle;

    $: date = ($conversation && $conversation.lastMessageAt) || null;
    $: dateString = (date && ' - ' + getDateAgeString(date)) || '';

    $: actor = ($conversation && getConversationOtherUser($conversation)) || null;
    $: actorUser = (actor && date && getUserModelFromData(actor, date)) || writable(null);
    $: actorName = ($actorUser && $actorUser.name) || (actor && actor.name) || '';

    $: titleString = title || actorName || '';

    function loadItem() {
        if (conversationId) {
            loadConversation(conversationId);
        }
    }
</script>

<div class="conversationListItem" on:click="{loadItem}">
    <AvatarIcon user="{actorUser}" useThumb="{true}" />
    <div class="detailContent">
        <div class="detailInnerContent">
            <div class="title">{titleString}</div>
            <div class="message">{@html messagePreview}<span class="dateString">{dateString}</span></div>
        </div>
    </div>
    <div class="info">
        {#if !viewed}
            <div class="unseenIcon" />
        {/if}
    </div>
</div>

<style>
    .conversationListItem {
        position: relative;

        padding: 5px 0;
        height: 67px;
        margin-bottom: 0;

        cursor: pointer;
    }

    /* .thumb {
        position: absolute;
        top: 14px;
        left: 21px;
        width: 61px;
        height: 61px;
        object-fit: cover;

        border: 1px solid #D9D9D9;
    } */

    .conversationListItem :global(.avatarIcon) {
        position: absolute;
        top: 14px;
        left: 21px;
        width: 61px;
        height: 61px;
    }

    .detailContent {
        position: absolute;
        left: 96px;
        top: 14px;
        bottom: 0;
        right: 46px;

		display: flex;
        align-items: center;
        /* padding-bottom: 3px; */
    }
    .detailInnerContent {
        width: 100%;
    }

    .title {
        font-size: 1.5rem;
        line-height: 1.3rem;
        font-weight: 700;
    }

    .message {
        font-size: 1.2rem;
        line-height: 1.3rem;
        margin-top: 7px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* .messageString {
        display: inline-block;
        max-width: 172px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    } */

    .dateString {
        color: #999999;

        /* display: inline-block; */
    }

    .info {
        position: absolute;
        right: 0;
        top: 13px;
    }

    .info .unseenIcon {
        position: absolute;
        top: 23px;
        right: 25px;
        width: 16px;
        height: 16px;
        background-color: #DF3C3C;
        border-radius: 999px;
    }
</style>
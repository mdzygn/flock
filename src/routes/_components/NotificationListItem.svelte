<script>
    import { get, writable } from 'svelte/store';

    import locale from '../../locale';

    import AvatarIcon from './AvatarIcon.svelte';

    import { getDateAgeString } from '../../utils';

    import { getNotificationMessage } from '../../utils/NotificationUtil';

    import { getUser, getUserModelFromData } from '../../models/usersModel';

    import { loadPost, loadChannel, loadProject } from '../../actions/appActions';

    export let notification;

    $: thumbImage = ''; // getProjectHeaderImage($notification, true);

    $: isUserAction = ($notification && $notification.isUserAction) || true;

    $: title = ($notification && $notification.title) || '';
    $: message = ($notification && getNotificationMessage($notification)) || '';

    $: postId = ($notification && $notification.postId) || null;
    $: threadId = ($notification && $notification.threadId) || null;
    $: channelId = ($notification && $notification.channelId) || null;
    $: projectId = ($notification && $notification.projectId) || null;

    $: viewed = ($notification && $notification.viewed) || false;

    // $: console.log('$notification', $notification);

    $: projectTitle = $notification && $notification.projectTitle;

    $: date = ($notification && $notification.createdAt) || null;
    $: dateString = (date && getDateAgeString(date)) || '';

    $: actor = ($notification && $notification.actors && $notification.actors.length && $notification.actors[0]) || null;
    $: actorUser = (actor && date && getUserModelFromData(actor, date)) || writable(null);
    $: actorName = ($actorUser && $actorUser.name) || (actor && actor.name) || '';

    $: titleString = title || actorName || '';

    function loadItem() {
        if (threadId) {
            loadPost(threadId, { anchorToBottom: true });
        } else if (postId) {
            loadPost(postId);
        } else if (channelId) {
            loadChannel(channelId);
        } else if (projectId) {
            loadProject(projectId);
        }
    }
</script>

<div class="notifcationListItem" on:click="{loadItem}">
    {#if isUserAction}
        <AvatarIcon user="{actorUser}" useThumb="{true}" />
    {:else}
        <img class="thumb" src="{thumbImage}" alt="{titleString}" />
    {/if}
    <div class="detailContent">
        <div class="detailInnerContent">
            <div class="title">{titleString}</div>
            <div class="message">{@html message}</div>
            {#if dateString}
                <div class="detail">
                    {#if projectTitle}
                        {locale.NOTIFICATION.PROJECT_PREFIX}<span class="projectTitle">{projectTitle}</span> -
                    {/if}
                {dateString}</div>
            {/if}
        </div>
    </div>
    <div class="info">
        {#if !viewed}
            <div class="unseenIcon" />
        {/if}
    </div>
</div>

<style>
    .notifcationListItem {
        position: relative;

        padding: 5px 0;
        height: 67px;
        margin-bottom: 0;

        cursor: pointer;
    }

    .thumb {
        position: absolute;
        top: 14px;
        left: 21px;
        width: 61px;
        height: 61px;
        object-fit: cover;

        border: 1px solid #D9D9D9;
    }

    .notifcationListItem :global(.avatarIcon) {
        position: absolute;
        top: 14px;
        left: 21px;
        width: 61px;
        height: 61px;
    }

    .detailContent {
        position: absolute;
        left: 96px;
        top: 16px;
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
        font-size: 1.4rem;
        line-height: 1.3rem;
        font-weight: 700;
    }

    .message {
        font-size: 1.3rem;
        line-height: 1.3rem;
        margin-top: 3px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .detail {
        font-size: 1.1rem;
        margin-top: 4px;
        color: #888888;
        line-height: 1.3rem;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .projectTitle {
        font-weight: 700;
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
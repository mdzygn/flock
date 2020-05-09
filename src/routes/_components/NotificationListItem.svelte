<script>
    import AvatarIcon from './AvatarIcon.svelte';

    import { getDateAgeString } from '../../utils';

    import { getUser } from '../../models/usersModel';

    export let notification;

    $: thumbImage = ''; // getProjectHeaderImage($notification, true);

    $: isUserAction = ($notification && $notification.isUserAction) || true;

    $: user = (isUserAction && $notification && $notification.userId && getUser($notification.userId)) || null;

    $: date = $notification && $notification.createdAt;

    $: dateString = getDateAgeString(date);


    function loadItem() {
    }
</script>

<div class="notifcationListItem" on:click="{loadItem}">
    {#if isUserAction}
        <AvatarIcon {user} useThumb="{true}" />
    {:else}
        <img class="thumb" src="{thumbImage}" alt="{$notification.title}" />
    {/if}
    <div class="detailContent">
        <div class="detailInnerContent">
            <div class="title">{$notification.title}</div>
            <div class="message">{$notification.message}</div>
            {#if dateString}
                <div class="date">{dateString}</div>
            {/if}
        </div>
    </div>
    <div class="info">
        <div class="unseenIcon" />
        <!-- {#if $showBetaFeatures}
            <Counter visible="{$notification.unreadCount}" count="{$notification.unreadCount}" hasNew="{true}" />
        {/if} -->
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
        top: 0;
        bottom: 0;
        right: 60px;

		display: flex;
        align-items: flex-end;
        padding-bottom: 3px;
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
    }

    .date {
        font-size: 1.1rem;
        margin-top: 4px;
        color: #888888;
        line-height: 1.3rem;
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
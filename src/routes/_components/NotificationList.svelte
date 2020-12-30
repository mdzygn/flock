<script>
    import locale from '../../locale';

    import config from '../../config';

	import { get, writable } from 'svelte/store';

    import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import ContentPanel from './../_components/ContentPanel.svelte';
    import NotificationListItem from './NotificationListItem.svelte';
    import ContentLoader from './../_components/ContentLoader.svelte';
    
	import { stopEvent } from '../../utils';

	import { newProject } from '../../actions/appActions';

    import {
        userId,
        user,
        loggingIn,
		isUserLoaded,
    } from '../../models/appModel';

	import { getNotifications, loadingNotifications } from '../../models/notificationsModel';
    // const loadingNotifications = writable(false);

    $: isLoadingNotifications = $loadingNotifications && !$notifications; // (!$notifications || !$notifications.length); // - don't check length as causes to flash


	// import noficationData from '../data/notifications.json';
	// const notificationItems = JSON.parse(JSON.stringify(noficationData));
	// const notificationItemModels = notificationItems.map((item) => {
	// 	return writable(item);
	// })
    // const notifications = writable(notificationItemModels); // get from notificationsModel

    // export let notifications;

    let notifications = writable([]);
	$: { notifications = getNotifications({ userId: $userId }) };

    export let className = '';
</script>

<div class="notificationList {className}">
    {#if isLoadingNotifications || !isUserLoaded($user, $userId, $loggingIn)}
        <ContentLoader label="{locale.LOADING.NOTIFICATIONS}" />
    {:else}
        {#each $notifications as notification}
            {#if !get(notification).indirect && !get(notification).notPriority } <!-- TODO: remove notPriority -->
                <NotificationListItem {notification} />
            {/if}
        {:else}
            <div class="noNotifications">
                {locale.NOTIFICATIONS.NO_NOTIFICATIONS}<br/><br/>
                <a href="discover">Discover</a> inspiring projects to get involved with<br/>or create a <a href="/projects/new" on:click="{(e) => { newProject(); return stopEvent(e); }}">New Project</a>
            </div>
        {/each}
    {/if}
</div>

<style>
    .notificationList {
        padding-top: 10px;
        padding-bottom: 40px;
        /* padding-top: 310px; */
    }

    .notificationList :global(.panelContent) {
        margin-top: -6px;
        margin-bottom: -6px;
    }

    .noNotifications {
        padding: 0 20px;
        font-size: 1.2rem;
        line-height: 1.8rem;
        padding-top: 10px;
        padding-bottom: 20px;
    }

    .notificationList :global(.contentLoader) {
        padding: 0 20px;
        font-size: 1.2rem;
        padding-top: 10px;
        padding-bottom: 30px;
        line-height: 2.5rem;
    }
</style>
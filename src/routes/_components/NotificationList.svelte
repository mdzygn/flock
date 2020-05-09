<script>
    import locale from '../../locale';

    import config from '../../config';

	import { writable } from 'svelte/store';

    import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import ContentPanel from './../_components/ContentPanel.svelte';
    import NotificationListItem from './NotificationListItem.svelte';
    import ContentLoader from './../_components/ContentLoader.svelte';

	import { newProject } from '../../actions/appActions';

	// import { loadingNotifications } from '../../models/notificationsModel';
	const loadingNotifications = writable(false);

	// import { loadNotification } from '../../actions/appActions';

    export let notifications;

    export let className = '';
</script>

<div class="notificationList {className}">
    {#if $loadingNotifications && (!$notifications || !$notifications.length)}
        <ContentLoader label="{locale.LOADING.NOTIFICATIONS}" />
    {:else}
        {#each $notifications as notification}
            <NotificationListItem {notification} />
        {:else}
            <div class="noNotifications">
                {locale.NOTIFICATIONS.NO_NOTIFICATIONS}<br/><br/>
                <a href="discover">Discover</a> inspiring projects to follow<br/>or create a <a href="javascript:void(0)" on:click="{newProject}">New Project</a>
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
        padding-bottom: 30px;
    }

    .notificationList :global(.contentLoader) {
        padding: 0 20px;
        font-size: 1.2rem;
        padding-top: 10px;
        padding-bottom: 30px;
        line-height: 2.5rem;
    }
</style>
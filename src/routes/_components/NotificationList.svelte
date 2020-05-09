<script>
    import locale from '../../locale';

    import config from '../../config';

	import { writable } from 'svelte/store';

    import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import ContentPanel from './../_components/ContentPanel.svelte';
    import NotificationListItem from './NotificationListItem.svelte';
	import ContentLoader from './../_components/ContentLoader.svelte';

	// import { loadingNotifications } from '../../models/notificationsModel';
	const loadingNotifications = writable(false);

	// import { loadNotification } from '../../actions/appActions';

    export let notifications;

    export let className = '';
</script>

{#if ($notifications && $notifications.length)}
    <div class="notificationList {className}">
        {#if $loadingNotifications && (!$notifications || !$notifications.length)}
            <ContentLoader label="{locale.LOADING.NOTIFICATIONS}" />
        {:else}
            {#each $notifications as notification}
                <NotificationListItem {notification} />
            {:else}
                <div class="noNotifications">
                    <slot>no notifications yet</slot>
                </div>
            {/each}
        {/if}
    </div>
{/if}

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
        font-size: 1.2rem;
        padding-top: 10px;
        padding-bottom: 30px;
        line-height: 2.5rem;
    }

    .notificationList :global(.contentLoader) {
        padding: 0;
        font-size: 1.2rem;
        padding-top: 10px;
        padding-bottom: 30px;
        line-height: 2.5rem;
    }
</style>
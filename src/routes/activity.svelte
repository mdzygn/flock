<script>
	import ScrollView from '../components/ScrollView.svelte';
	import Proxy from '../components/Proxy.svelte';

	import { writable } from 'svelte/store';

	import NotificationList from './_components/NotificationList.svelte';

	import noficationData from '../data/notifications.json';
	const notificationItems = JSON.parse(JSON.stringify(noficationData));
	const notificationItemModels = notificationItems.map((item) => {
		return writable(item);
	})

	const notifications = writable(notificationItemModels); // get from notificationsModel
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="content">
	<ScrollView>
		<!-- <Proxy image="activity" className="proxyOverlay" /> -->

		<NotificationList {notifications} />
	</ScrollView>
</div>

<style>
	.content :global(.proxyOverlay) {
        position: absolute;
        opacity: 0.5;
	}
</style>
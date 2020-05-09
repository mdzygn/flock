<script>
	import ScrollView from '../components/ScrollView.svelte';
	import Proxy from '../components/Proxy.svelte';

	import { writable } from 'svelte/store';

	import NotificationList from './_components/NotificationList.svelte';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="content">
	<ScrollView id="activity">
		<!-- <Proxy image="activity" className="proxyOverlay" /> -->

		<NotificationList />
	</ScrollView>
</div>

<style>
	.content :global(.proxyOverlay) {
        position: absolute;
        opacity: 0.5;
	}
</style>
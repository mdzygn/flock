<script>
	import ScrollView from '../components/ScrollView.svelte';
	import Proxy from '../components/Proxy.svelte';

	import NotificationList from './_components/NotificationList.svelte';

	const notifications = [];
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<Proxy image="activity" />

	<!-- <NotificationList {notifications} /> -->
</ScrollView>

<style>
</style>
<script>
	import ScrollView from '../components/ScrollView.svelte';

	import Feed from './_components/Feed.svelte';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<img src="content/proxy/discover_search.jpg" style="width: 100%" alt="search" />

	<Feed type="discover" count="{5}"/>
</ScrollView>
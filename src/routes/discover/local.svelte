<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';

	import Hotspots from '../../components/Hotspots.svelte';

	import Feed from './../_components/Feed.svelte';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<div>
		<Hotspots>
			<a href="explore/local" style="
				left: 7px;
				top: 5px;
				width: 44px;
				height: 46px;">&nbsp;</a>
			<a href="discover" style="
				right: 10px;
				top: 5px;
				width: 232px;
				height: 46px;">&nbsp;</a>
		</Hotspots>

		<Proxy image="discover_search_local" />
	</div>

	<Feed type="discover" linkToProjects="{true}" count="{5}" offset="{3}"/>
</ScrollView>
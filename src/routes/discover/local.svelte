<script>
	import ScrollView from '../../components/ScrollView.svelte';

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

		<img class="contentItem" src="content/proxy/discover_search_local.jpg" style="width: 100%" alt="search" />
	</div>

	<Feed type="discover" count="{5}" offset="{3}"/>
</ScrollView>
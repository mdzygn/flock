<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';

	import Hotspots from '../../../components/Hotspots.svelte';

	import Feed from './../../_components/Feed.svelte';

	function setExploreMode() {
		dispatch('setViewMode', {viewMode: 'explore'});
	}
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView id="discover">
	<div>
		<Hotspots>
			<div on:click="{setExploreMode}" style="
				left: 7px;
				top: 5px;
				width: 38px;
				height: 39px;">&nbsp;</div>
			<a href="discover/local" style="
				right: 10px;
				top: 5px;
				width: 232px;
				height: 46px;">&nbsp;</a>
		</Hotspots>

		<Proxy image="discover_search" />
	</div>

	<Feed type="discover" linkToProjects="{true}" count="{5}"/>
</ScrollView>
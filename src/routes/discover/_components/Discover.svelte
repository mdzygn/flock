<script>
	import locale from '../../../locale';

	import { writable } from 'svelte/store';

	import ScrollView from '../../../components/ScrollView.svelte';
	import SearchBar from './../../_components/SearchBar.svelte';

	import Proxy from '../../../components/Proxy.svelte';
	import Hotspots from '../../../components/Hotspots.svelte';
    import Hotspot from '../../../components/Hotspot.svelte';

	import Feed from './../../_components/Feed.svelte';
	import ProjectItem from './../../_components/ProjectItem.svelte';
	import ContentLoader from './../../_components/ContentLoader.svelte';

	import {
		viewMode,
		locationMode,
		resetScrollRegionPosition,
		showBetaFeatures,
		discoverSearchString,
	} from '../../../models/appModel';

	import { getDiscoveryProjects, loadingProjects } from '../../../models/projectsModel';

	import { loadProject } from '../../../actions/appActions';

	let projects = writable({});
	$: { projects = getDiscoveryProjects(); }

	function toggleViewMode() {
		$viewMode = ($viewMode === 'explore') ? 'discover' : 'explore';
	}

	function toggleLocationMode() {
		$locationMode = ($locationMode === 'global') ? 'local' : 'global';
		resetScrollRegionPosition('discover');
	}

	$: proxyContentOffset = ($locationMode === 'global') ? 0 : 3;
	$: proxyFilterImage = ($locationMode === 'global') ? 'discover_search' : 'discover_search_local';
</script>

<div class="pageContent">
	<ScrollView id="discover" headerResetOnShow="{true}">
		<!-- <Feed type="discover" linkToProjects="{true}" count="{5}" offset="{proxyContentOffset}"/> -->

		<div class="feed">
			{#if $loadingProjects && (!$projects || !$projects.length) }
				<ContentLoader label="{locale.LOADING.DISCOVER}" />
			{:else}
				{#each $projects as project}
					<ProjectItem {project} />
				{:else}
					<ContentLoader label="{locale.DISCOVER.NO_PROJECTS}" />
				{/each}
			{/if}
		</div>

		<div slot="scrollHeader">
			{#if $showBetaFeatures}
				<Proxy image="{proxyFilterImage}">
					<!-- Toggle View Mode -->
					<Hotspot onClick="{toggleViewMode}" style="
						left: 7px;
						top: 5px;
						width: 38px;
						height: 39px;" />

					<!-- Toggle Location Mode -->
					<Hotspot onClick="{toggleLocationMode}" style="
						right: 10px;
						top: 5px;
						width: 232px;
						height: 46px;" />
				</Proxy>
			{:else}
				<SearchBar bind:searchString={$discoverSearchString} />
			{/if}
		</div>
	</ScrollView>
</div>

<style>
	.feed {
		width: 100%;

		padding-top: 5px;
	}

	/* .feed :global(.proxy) {
		padding-bottom: 10px;
	} */

	.pageContent :global(.scrollHeader) {
    	background-color: #ffffff;
	}

	.pageContent :global(.searchBarField) {
    	margin: 10px 16px;
    	/* margin: 8px 11px; */
	}
</style>
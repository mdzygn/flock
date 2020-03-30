<script>
	import locale from '../../locale';

	import { writable } from 'svelte/store';

	import ScrollView from '../../components/ScrollView.svelte';

	import Proxy from '../../components/Proxy.svelte';
	import Hotspot from '../../components/Hotspot.svelte';

    import Button from '../../components/Button.svelte';
	import SearchBar from './../_components/SearchBar.svelte';
	import ContentLoader from './../_components/ContentLoader.svelte';

	import ProjectList from './../_components/ProjectList.svelte';

    import AddProjectIcon from "../../assets/icons/add_project.png";

	import {
		getArchivedProjects,
		getFilteredProjects,
	} from '../../models/projectsModel';

	import {
		projectsArchiveSearchString,
	} from '../../models/appModel';

	$: searchString = $projectsArchiveSearchString;

	let archivedProjects = writable([]);
	let filteredArchivedProjects = writable([]);

	$: { archivedProjects = getArchivedProjects() }
	$: { $filteredArchivedProjects = getFilteredProjects($archivedProjects, { searchString }) }

</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="content">
	<ScrollView id="projects">
		<SearchBar bind:searchString={$projectsArchiveSearchString} />
		<ProjectList title="{null}" projects="{filteredArchivedProjects}" showLastActive="{true}" {searchString} showIfNoProjects="{true}"> <!--  title="Archived Projects" -->
			{#if searchString}
				<slot>No archived projects matching "{searchString}"</slot>
			{:else}
				<slot>You have not archived any projects</slot>
			{/if}
		</ProjectList>
	</ScrollView>
</div>

<style>
	.content :global(.projectList .contentPanel) {
    	padding-top: 7px;
		margin-bottom: 0;
	}

	.content :global(.projectList .panelTitle) {
    	padding-bottom: 8px;
	}

	.content :global(.projectListItem) {
    	margin-bottom: -3px;
	}

	.content :global(.projectListItem .thumb) {
		width: 60px;
		height: 60px;
	}

	.content :global(.projectListItem .detailContent) {
    	left: 74px;
	}

	.content :global(.projectListItem .detail) {
		font-size: 1.1rem;
		margin-top: 5px;
	}

	.content :global(.projectListItem .info ) {
    	top: 22px;
	}

	.content :global(.projectListItem .counter ) {
    	margin-right: 0;
	}

	.content :global(.projectListItem .followingIcon ) {
    	display: none;
	}
</style>
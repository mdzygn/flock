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

	import { getMyProjects, getFollowingProjects, getFilteredProjects, loadingProjects } from '../../models/projectsModel';

	import {
		projectsSearchString,
		displayingAllMyProjects,
		displayingAllFollowingProjects,
		displayingArchivedProjects,
	} from '../../models/appModel';

	import { newProject, loadProject } from '../../actions/appActions';

	const MY_PROJECTS_DISPLAY_LIMIT = 3;
	const FOLLOWED_PROJECTS_DISPLAY_LIMIT = 16;

	$: searchString = $projectsSearchString;

	function displayAllMyProjects() {
		$displayingAllMyProjects = true;
	}

	function displayAllFollowingProjects() {
		$displayingAllFollowingProjects = true;
	}

	function displayArchivedProjects() {
		$displayingArchivedProjects = true;
	}

	let myProjects = writable([]);
	let followingProjects = writable([]);

	let filteredMyProjects = writable([]);
	let filteredFollowingProjects = writable([]);

	$: { myProjects = getMyProjects() }
	$: { followingProjects = getFollowingProjects() }

	// add one to limit to ensure show more button appears
	$: { getFilteredProjects(filteredMyProjects, $myProjects, { searchString, limit: $displayingAllMyProjects ? 0 : MY_PROJECTS_DISPLAY_LIMIT + 1 }) }
	$: { getFilteredProjects(filteredFollowingProjects, $followingProjects, { searchString, limit: $displayingAllFollowingProjects ? 0 : FOLLOWED_PROJECTS_DISPLAY_LIMIT + 1 }) }

</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="content">
	<ScrollView id="projects">
		<!-- <Proxy image="projects" className="proxyOverlay">
			<Hotspot onClick="{e => loadProject('n4vh55hg')}" style="
				left: 0;
				width: 100%;
				top: 81px;
				height: 196px;" />
			<Hotspot onClick="{e => loadProject('msl30nhg')}" style="
				left: 0px;
				width: 100%;
				top: 359px;
				height: 527px;" />
			<Hotspot onClick="{newProject}" style="
				right: 10px;
				top: 277px;
				width: 142px;
				height: 46px;" />
		</Proxy> -->

		<SearchBar bind:searchString={$projectsSearchString} />
		{#if $loadingProjects && (!$myProjects || !$myProjects.length) && (!$followingProjects || !$followingProjects.length) }
			<ContentLoader label="{locale.LOADING.FOLLOWING}" />
		{:else}
			<div class="projectsContent">
				<ProjectList title="My Projects"
					projects="{filteredMyProjects}"
					{searchString}
					showLastActive="{true}"
					displayLimit="{$displayingAllMyProjects ? 0 : MY_PROJECTS_DISPLAY_LIMIT}"
					showMoreAction="{$displayingAllMyProjects ? displayArchivedProjects : displayAllMyProjects}"
					forceShowMoreShow="{$displayingAllMyProjects}"
					showMoreLabel="{$displayingAllMyProjects ? locale.FOLLOWING_PROJECTS.BUTTON_ARCHIVED_PROJECTS : null}"
					showIfNoProjects="{true}"
					hideShowMoreWithVisibility="{true}">
					{#if searchString}
						<slot>No projects found matching "{searchString}"</slot>
					{:else}
						<slot>You have not shared any projects<br/>Create a <a href="projects/new">New Project</a></slot>
					{/if}
				</ProjectList>
				<Button className="newProjectButton" onClick="{newProject}" icon="{AddProjectIcon}">new project</Button>
				<ProjectList title="Following" className="followingProjects" projects="{filteredFollowingProjects}" showLastActive="{true}" displayLimit="{$displayingAllFollowingProjects ? 0 : FOLLOWED_PROJECTS_DISPLAY_LIMIT}" showMoreAction="{displayAllFollowingProjects}" {searchString} showIfNoProjects="{true}">
					{#if searchString}
						<slot>No followed projects matching "{searchString}"</slot>
					{:else}
						<slot>You aren't following any projects<br/><a href="discover">Discover</a> inspiring projects to follow</slot>
					{/if}
				</ProjectList>
			</div>
		{/if}
	</ScrollView>
</div>

<style>
	/* .content :global(.proxyOverlay) {
		position: absolute;
		opacity: 0.5;
	} */

	.projectsContent {
		position: relative;
	}

	.content :global(.projectList .contentPanel) {
    	padding-top: 7px;
		margin-bottom: 0;
	}

	.content :global(.newProjectButton) {
		/* position: absolute;
		top: 243px;
		right: -1px; */

		position: relative;
		margin-top: -52px;
		float: right;

		padding: 15px;
    	padding-right: 63px;

		font-size: 1.5rem;
		font-weight: 700;
	}
	.content :global(.newProjectButton .icon) {
    	padding-left: 16px;
	}

	.content :global(.followingProjects) {
    	margin-top: 13px;
    	clear: both;
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
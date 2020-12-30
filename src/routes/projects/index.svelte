<script>
	import locale from '../../locale';

	import { goto } from '@sapper/app';
	import { writable } from 'svelte/store';

	import ScrollView from '../../components/ScrollView.svelte';

	import Proxy from '../../components/Proxy.svelte';
	import Hotspot from '../../components/Hotspot.svelte';

    import Button from '../../components/Button.svelte';
	import SearchBar from './../_components/SearchBar.svelte';
	import ContentLoader from './../_components/ContentLoader.svelte';

	import ProjectList from './../_components/ProjectList.svelte';

	import AddProjectIcon from "../../assets/icons/add_project.png";
	
	import { stopEvent } from '../../utils';

	import {
		getMyProjects,
		getFollowingProjects,
		getFilteredProjects,
		loadingProjects,
		getArchivedProjects,
	} from '../../models/projectsModel';

	import {
		projectsSearchString,
		projectsArchiveSearchString,
		displayingAllMyProjects,
		displayingAllFollowingProjects,
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
		if ($projectsSearchString) {
			$projectsArchiveSearchString = $projectsSearchString;
		}
		goto('projects/archive');
	}

	let myProjects = writable([]);
	let followingProjects = writable([]);
	let archivedProjects = writable([]);

	let filteredMyProjects = writable([]);
	let filteredFollowingProjects = writable([]);

	$: { myProjects = getMyProjects() }
	$: { followingProjects = getFollowingProjects() }
	$: { archivedProjects = getArchivedProjects() }

	// add one to limit to ensure show more button appears
	$: myProjectsLimit = $displayingAllMyProjects ? 0 : MY_PROJECTS_DISPLAY_LIMIT + 1;
	$: followingProjectLimit = $displayingAllFollowingProjects ? 0 : FOLLOWED_PROJECTS_DISPLAY_LIMIT + 1;

	$: showArchivedButton = ($archivedProjects && $archivedProjects.length) && ($displayingAllMyProjects || ($followingProjects && $filteredMyProjects.length < myProjectsLimit));

	$: { $filteredMyProjects = getFilteredProjects($myProjects, { searchString, limit: myProjectsLimit }) }
	$: { $filteredFollowingProjects = getFilteredProjects($followingProjects, { searchString, limit: followingProjectLimit }) }

</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="content">
	<ScrollView id="projects" headerStartHidden="{true}" headerHiddenOffset="{45}" hideHeaderShadowAtTop="{true}" hideShadowMargin="{45}">
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

		<div slot="scrollHeader">
			<SearchBar bind:searchString={$projectsSearchString} />
		</div>

		{#if $loadingProjects && (!$myProjects || !$myProjects.length) && (!$followingProjects || !$followingProjects.length) }
			<ContentLoader label="{locale.LOADING.FOLLOWING}" />
		{:else}
			<div class="projectsContent">
				<ProjectList title="Projects"
					projects="{filteredMyProjects}"
					{searchString}
					showLastActive="{true}"
					displayLimit="{$displayingAllMyProjects ? 0 : MY_PROJECTS_DISPLAY_LIMIT}"
					showMoreAction="{showArchivedButton ? displayArchivedProjects : displayAllMyProjects}"
					forceShowMoreShow="{showArchivedButton}"
					showMoreLabel="{showArchivedButton ? locale.FOLLOWING_PROJECTS.BUTTON_ARCHIVED_PROJECTS : null}"
					showIfNoProjects="{true}"
					hideShowMoreWithVisibility="{true}"
					showPrivateIcon="{true}">
					{#if searchString}
						<slot>no projects found matching "{searchString}"</slot>
					{:else}
						<slot>you have not shared any projects<br/>create a <a href="/projects/new" on:click="{(e) => { newProject(); return stopEvent(e); }}">New Project</a></slot>
					{/if}
				</ProjectList>
				<Button className="newProjectButton" onClick="{newProject}" icon="{AddProjectIcon}">new project</Button>
				<ProjectList title="Following" className="followingProjects" projects="{filteredFollowingProjects}" showLastActive="{true}" displayLimit="{$displayingAllFollowingProjects ? 0 : FOLLOWED_PROJECTS_DISPLAY_LIMIT}" showMoreAction="{displayAllFollowingProjects}" {searchString} showIfNoProjects="{true}" showPrivateIcon="{true}">
					{#if searchString}
						<slot>no followed projects matching "{searchString}"</slot>
					{:else}
						<slot>you aren't following any projects<br/><a href="discover">Discover</a> inspiring projects to follow</slot>
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

	.content :global(.searchBar) {
		/* height: 40px; */
	}

	.content :global(.scrollHeader) {
    	background-color: #ffffff;
	}

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
<script>
	import ScrollView from '../../components/ScrollView.svelte';

	import Proxy from '../../components/Proxy.svelte';
	import Hotspot from '../../components/Hotspot.svelte';

    import Button from '../../components/Button.svelte';
	import SearchBar from './../_components/SearchBar.svelte';

	import ProjectList from './../_components/ProjectList.svelte';

    import AddProjectIcon from "../../assets/icons/add_project.png";

	import { getMyProjectIds, getFollowingProjectIds } from '../../models/projectsModel';

	import { newProject, loadProject } from '../../actions/appActions';

	const myProjects = getMyProjectIds();
	const followedProjects = getFollowingProjectIds();

	// const myProjects = [
	// 	'n4vh55hg',
	// 	'msl30nhg',
	// 	'ma9l2h4h',
	// 	'm2lmad9a',
	// ];

	// const followedProjects = [
	// 	's7djj2s2',
	// 	'ma9l2h4h',
	// 	'm2lmad9a',
	// 	'36bsf5gs',
	// 	'9dm4l7ps',
	// 	'n4vh55hg',
	// 	'msl30nhg',
	// ];

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

		<SearchBar />
		<div class="projectsContent">
			<ProjectList title="My Projects" projects="{myProjects}" showLastActive="{true}" />
			<Button className="newProjectButton" onClick="{newProject}" icon="{AddProjectIcon}">New Project</Button>
			<ProjectList title="Following" className="followingProjects" projects="{followedProjects}" showLastActive="{true}" displayLimit="{12}" />
		</div>
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
		position: absolute;
		top: 243px;
		right: -1px;

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
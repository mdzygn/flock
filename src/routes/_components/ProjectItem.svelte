<script>
    // import { onDestroy } from 'svelte'; // afterUpdate

    import Button from '../../components/Button.svelte';

    import ActionBar from './ActionBar.svelte';

	import Proxy from '../../components/Proxy.svelte';
    import { linkProject } from '../../data/projects.js';
    import { loadProject } from '../../actions/appActions.js';

    import MoreArrowIcon from "../../assets/icons/more_arrow.png";

    export let projectId = null;

    let project = null;
    linkProject(projectId, val => project = val);

    $: projectSlug = project ? project.slug : null;

	$: headerImage = projectSlug ? 'content/projects/' + projectSlug + '/header.jpg' : '';

    $: projectTitle = project ? project.title : '';
    $: projectDescription = project ? project.description : '';
</script>

<div class="projectItem">
    <!-- <Proxy image="discover1" className="proxyImage" /> -->
    <img class="headerImage" src="{headerImage}" alt="project image" on:click="{e => loadProject(projectId)}" />
    <div class="contentContainer" on:click="{e => loadProject(projectId)}">
        <Button className="learnMoreButton" onClick="{e => { loadProject(projectId, { showInfo: true }); e.stopPropagation() }}" icon="{MoreArrowIcon}">read more</Button>
        <div class="itemContent">
            <div class="header">{projectTitle}</div>
            <div class="description">{projectDescription}</div>
        </div>
    </div>
    <ActionBar targetItemId="{projectId}" targetItem="{project}" />
</div>

<style>
    .projectItem {
        height: 314px;
        margin-bottom: 10px;

        background-color: #ffffff;
    }

    .contentContainer {
        position: relative;

        height: 102px;
        cursor: pointer;

        padding-left: 18px;
    }

    .contentContainer :global(.learnMoreButton) {
        position: absolute;
        top: 1px;
        right: 11px;

        padding: 10px;
        padding-right: 30px;

        font-size: 1.1rem;
        font-weight: 700;
    }

    .contentContainer :global(.learnMoreButton .icon) {
        padding-left: 15px;
    }

    .projectItem :global(.proxyImage) {
        position: absolute;
        width: 411px;
        height: 314px;
        opacity: 0.5;
    }

    .projectItem :global(.actionBar .actionButtonLeft .buttonContent) {
        /* position: absolute;
        left: 26px; */
        margin-right: 6px;
    }

    .projectItem :global(.actionBar .actionButtonMiddle .buttonContent) {
        margin-right: -12px;
    }

    .projectItem :global(.actionBar .actionButtonRight .buttonContent) {
        margin-right: -20px;
    }

    .headerImage {
        width: 100%;
        height: 154px;
        object-fit: cover;

        cursor: pointer;
    }

    .header {
        font-size: 2.2rem;
        padding-top: 3px;
    }

    .description {
        padding-top: 3px;
        padding-right: 50px;

        font-size: 1.5rem;
        line-height: 2rem;

        color: #555555;
    }
</style>
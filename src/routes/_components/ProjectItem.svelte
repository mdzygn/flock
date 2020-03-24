<script>
    // import { onDestroy } from 'svelte'; // afterUpdate

    import { get } from 'svelte/store';
    import { writable } from 'svelte/store';

    import Button from '../../components/Button.svelte';

    import ActionBar from './ActionBar.svelte';

	import Proxy from '../../components/Proxy.svelte';
    import { getProjectModel, getProjectHeaderImage } from '../../models/projectsModel';
    import { loadProject } from '../../actions/appActions';

    import MoreArrowIcon from "../../assets/icons/more_arrow.png";

    export let projectId = null;

    let project = writable({}); // declare store here to prevent SSR error
    $: { project = getProjectModel(projectId) } ;

    $: projectSlug = ($project && $project.slug) || null;

    $: headerImage = getProjectHeaderImage($project);

    $: projectTitle = ($project && $project.title) || '';
    $: projectDescription = ($project && $project.description) || '';
</script>

<div class="projectItem">
    <!-- <Proxy image="discover1" className="proxyImage" /> -->
    <img class="headerImage" src="{headerImage}" alt="project image" on:click="{e => loadProject(projectId)}" />
    <div class="contentContainer" on:click="{e => loadProject(projectId)}">
        <Button className="readMoreButton" onClick="{e => { loadProject(projectId, { showInfo: true }); e.stopPropagation() }}" icon="{MoreArrowIcon}">read more</Button>
        <div class="itemContent">
            <div class="header">{projectTitle}</div>
            <div class="description">{projectDescription}</div>
        </div>
    </div>
    <ActionBar targetItemId="{projectId}" targetItem="{$project}" />
</div>

<style>
    .projectItem {
        margin-bottom: 10px;

        background-color: #ffffff;
    }

    .contentContainer {
        position: relative;

        /* height: 102px; */
        cursor: pointer;

        margin-top: 7px;
        padding-left: 18px;
    }

    .contentContainer :global(.readMoreButton) {
        position: absolute;
        top: 1px;
        right: 11px;

        padding: 10px;
        padding-right: 30px;

        font-size: 1.1rem;
        font-weight: 700;
    }

    .contentContainer :global(.readMoreButton .icon) {
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

        min-height: 26px;

        color: #555555;
    }
</style>
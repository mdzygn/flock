<script>
    import Button from '../../components/Button.svelte';

	import Proxy from '../../components/Proxy.svelte';
    import { getProject } from '../../data/projects.js';
    import { loadProject } from '../../actions/appActions.js';

    export let projectId = null;

    $: project = getProject(projectId);

    $: projectSlug = project ? project.slug : null;

    $: projectTitle = project ? project.title : '';
    $: projectDescription = project ? project.description : '';

	$: headerImage = projectSlug ? 'content/projects/' + projectSlug + '/header.jpg' : '';
</script>

<div class="projectItem">
    <Proxy image="discover1" className="proxyImage" />
    <img class="headerImage" src="{headerImage}" alt="project image" on:click="{e => loadProject(projectId)}" />
    <div class="contentContainer" on:click="{e => loadProject(projectId)}">
        <Button className="learnMoreButton" onClick="{e => { loadProject(projectId, { showInfo: true }); e.stopPropagation() }}">learn more</Button>
        <div class="itemContent">
            <div class="header">{projectTitle}</div>
            <div class="description">{projectDescription}</div>
        </div>
        <div class="actionsBar"></div>
    </div>
</div>

<style>
    .projectItem {
        height: 314px;
        margin-bottom: 10px;

        background-color: #ffffff;
    }

    .projectItem :global(.learnMoreButton) {
        position: absolute;
        top: 1px;
        right: 31px;
        padding: 10px;

        font-size: 1.1rem;
        font-weight: 700;
    }

    .contentContainer {
        position: absolute;

        cursor: pointer;
    }

    .projectItem :global(.proxyImage) {
        position: absolute;
        width: 411px;
        height: 314px;
        opacity: 0.5;
    }

    .headerImage {
        width: 100%;
        height: 154px;
        object-fit: cover;

        cursor: pointer;
    }

    .header {
        font-size: 2.2rem;
        padding-left: 18px;
        padding-top: 3px;
    }

    .description {
        padding-left: 18px;
        padding-top: 3px;
        padding-right: 50px;

        font-size: 1.5rem;
        line-height: 2rem;

        color: #555555;
    }
</style>
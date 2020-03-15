<script>
	import Proxy from '../../components/Proxy.svelte';
    import { getProject } from '../../data/projects.js';
    import { loadProject } from '../../actions/appActions.js';

    export let projectId = null;

    $: project = getProject(projectId);

    $: projectSlug = project ? project.slug : null;

	$: headerImage = projectSlug ? 'content/projects/' + projectSlug + '/header.jpg' : '';
</script>

<div class="projectItem">
    <Proxy image="discover1" className="proxyImage" onClick="{e => loadProject('s7djj2s2')}" />
    <div class="contentContainer">
        <img class="headerImage" src="{headerImage}" alt="project image" />
    </div>
</div>

<style>
    .projectItem {
        height: 314px;
		padding-bottom: 10px;
    }

    .contentContainer {
        position: absolute;
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
    }
</style>
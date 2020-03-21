<script>
    import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import ContentPanel from './../_components/ContentPanel.svelte';
	import ProjectListItem from './ProjectListItem.svelte';

	import { getProjectsByIds } from '../../models/projectsModel';

	import { loadProject } from '../../actions/appActions';


    export let projects = null;

    export let displayLimit = 3;

    export let title = 'Projects';
    export let className = '';

    export let showLastActive = false;

    export let showMoreAction = null;

    $: projectItems = getProjectsByIds(projects, displayLimit);
    $: areMoreItems = displayLimit && projects && projects.length > displayLimit;
</script>

{#if projects && projects.length}
    <div class="projectList {className}">
        <!-- <Proxy image="profile_projects" className="proxyOverlay" >
            <Hotspot onClick="{e => loadProject('s7djj2s2')}" style="
                left: 0px;
                top: 40px;
                width: 100%;
                height: 154px;" />
        </Proxy> -->

        <ContentPanel title="{title}" showMoreAction="{areMoreItems ? showMoreAction : false}">
            {#each projectItems as project, index}
                <ProjectListItem {project} {showLastActive} />
            {/each}
        </ContentPanel>
    </div>
{/if}

<style>
    /* .projectList :global(.contentPanel) {
        background-color: rgba(255, 255, 255, 0.25);
    } */

    /* .projectList :global(.proxyOverlay) {
        position: absolute;
        opacity: 0.5;
    } */

    .projectList :global(.panelContent) {
        margin-top: -6px;
        margin-bottom: -6px;
    }
</style>
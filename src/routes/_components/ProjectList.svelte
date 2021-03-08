<script>
    import locale from '../../locale';

    import config from '../../config';

    import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import ContentPanel from './../_components/ContentPanel.svelte';
    import ProjectListItem from './ProjectListItem.svelte';
	import ContentLoader from './../_components/ContentLoader.svelte';

	import { loadingProjects } from '../../models/projectsModel';

	import { loadProject } from '../../actions/appActions';


    export let projects;

    export let displayLimit = 0; // config.MAX_PROJECT_PREVIEW_COUNT;

    export let title = 'Projects';
    export let className = '';

    export let searchString = null;

    export let showLastActive = false;
    export let showUpdateCounter = true;
    
    export let showProjectStatus = false;

    export let showMoreAction = false;

    export let showIfNoProjects = false;

    export let hideShowMoreWithVisibility = false;
    export let forceShowMoreShow = false;
    export let showMoreLabel = null;

    export let showPrivateIcon = false;

    $: areMoreItems = displayLimit && $projects.length > displayLimit;

    // $: projectItems = getProjectsByIds(projects, {limit: displayLimit ? displayLimit + 1 : 0, searchString: searchString});
    // $: areMoreItems = displayLimit && projectItems.length > displayLimit;
</script>

{#if ($projects && $projects.length) || showIfNoProjects}
    <div class="projectList {className}">
        <!-- <Proxy image="profile_projects" className="proxyOverlay" >
            <Hotspot onClick="{e => loadProject('s7djj2s2')}" style="
                left: 0px;
                top: 40px;
                width: 100%;
                height: 154px;" />
        </Proxy> -->

        <ContentPanel title="{title}" showMoreAction="{(areMoreItems || forceShowMoreShow) ? showMoreAction : false}" {hideShowMoreWithVisibility} {forceShowMoreShow} {showMoreLabel}>
			{#if $loadingProjects && (!$projects || !$projects.length)}
			    <ContentLoader label="{locale.LOADING.PROJECT_ITEMS}" />
            {:else}
                {#each $projects as project, index}
                    {#if !displayLimit || index < displayLimit}
                        <ProjectListItem {project} {showLastActive} {showProjectStatus} {showUpdateCounter} {showPrivateIcon} />
                    {/if}
                {:else}
                    <div class="noProjects">
                        {#if searchString}
                            <slot>no projects found matching "{searchString}"</slot>
                        {:else}
                            <slot>no projects found</slot>
                        {/if}
                    </div>
                {/each}
            {/if}
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

    .noProjects {
        font-size: 1.2rem;
        padding-top: 10px;
        padding-bottom: 30px;
        line-height: 2.5rem;
    }

    .projectList :global(.contentLoader) {
        padding: 0;
        font-size: 1.2rem;
        padding-top: 10px;
        padding-bottom: 30px;
        line-height: 2.5rem;
    }
</style>
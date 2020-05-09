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

    export let displayLimit = config.MAX_PROJECT_PREVIEW_COUNT;

    export let title = 'Projects';
    export let className = '';

    export let searchString = null;

    export let showLastActive = false;
    export let showUpdateCounter = true;

    export let showMoreAction = false;

    export let showIfNoProjects = false;

    export let hideShowMoreWithVisibility = false;
    export let forceShowMoreShow = false;
    export let showMoreLabel = null;

    export let showPrivateIcon = false;

    $: areMoreItems = displayLimit && $projects.length > displayLimit;
</script>

{#if ($projects && $projects.length) || showIfNoProjects}
    <div class="projectList {className}">
        <ContentPanel title="{title}" showMoreAction="{(areMoreItems || forceShowMoreShow) ? showMoreAction : false}" {hideShowMoreWithVisibility} {forceShowMoreShow} {showMoreLabel}>
			{#if $loadingProjects && (!$projects || !$projects.length)}
			    <ContentLoader label="{locale.LOADING.PROFILE_PROJECTS}" />
            {:else}
                {#each $projects as project, index}
                    {#if !displayLimit || index < displayLimit}
                        <ProjectListItem {project} {showLastActive} {showUpdateCounter} {showPrivateIcon} />
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
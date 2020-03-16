<script>
    import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import ContentPanel from './../_components/ContentPanel.svelte';

	import { getProjectsByIds } from '../../data/projects.js';

	import { loadProject } from '../../actions/appActions.js';

    export let projects = null;

    const MAX_PROJECT_PREVIEW_COUNT = 3;

    $: projectItems = getProjectsByIds(projects, MAX_PROJECT_PREVIEW_COUNT);
    $: areMoreItems = projects && projects.length > MAX_PROJECT_PREVIEW_COUNT;
</script>

{#if projects && projects.length}
    <div class="content">
        <Proxy image="profile_projects" className="proxyOverlay" >
            <!-- Project Links -->
            <Hotspot onClick="{e => loadProject('s7djj2s2')}" style="
                left: 0px;
                top: 40px;
                width: 100%;
                height: 154px;" />
        </Proxy>

        <ContentPanel title="Projects" showMoreAction="{areMoreItems}">
            {#each projectItems as project, index}
                <div class="project">
                    <div class="thumb"></div>
                    <div class="title">{project.title}</div>
                    <div class="detail"></div>
                    <div class="info">
                        <div class="count"></div>
                        <div class="following"></div>
                    </div>
                </div>
            {/each}
        </ContentPanel>
    </div>
{/if}

<style>
	/* .content :global(.contentItem) {
		width: 100%;

		margin-bottom: 10px;
	} */

    .content :global(.contentPanel) {
        background-color: rgba(255, 255, 255, 0.25);
    }

    .content :global(.proxyOverlay) {
        position: absolute;
        opacity: 0.5;
    }

    .thumb {

    }

    .title {

    }

    .detail {

    }

    .info {

    }

    .count {

    }

    .following {

    }
</style>
<script>
    import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import ContentPanel from './ContentPanel.svelte';
	import ProjectListItem from './ProjectListItem.svelte';
	import TagSet from './TagSet.svelte';

	import { getProjectsByIds } from '../../data/projects.js';

	import { loadProject } from '../../actions/appActions.js';

    export let project = null;

    $: skills = (project && project.skills) || null;
    $: isOwner = (project && project.isOwner) || false;

    $: areMoreItems = skills && skills.length > 0; // > MAX_PROJECT_PREVIEW_COUNT;
</script>

{#if skills && skills.length}
    <div class="content">
        <ContentPanel title="seeking skills:" showEdit="{isOwner}" showMoreAction="{areMoreItems}">
            <TagSet tags="{skills}" />
        </ContentPanel>
    </div>
{/if}

<style>
    .content :global(.panelTitle) {
        font-size: 1.3rem;
        font-weight: normal;
    }
</style>
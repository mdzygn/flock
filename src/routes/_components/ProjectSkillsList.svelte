<script>
	import ContentPanel from './ContentPanel.svelte';
    import TagSet from './TagSet.svelte';

	import { getSplitItems } from '../../utils';

    import {
        getIsProjectTeamMember,
        user,
    } from '../../models/appModel';

    export let project = null;

    // $: skills = (project && project.skills) || null;
	$: skills = (project && project.skills && getSplitItems(project.skills)) || null;
    $: isTeamMember = $user && getIsProjectTeamMember(project);

	$: canEdit = (isTeamMember && !project.archived) || false;

    $: areMoreItems = false; // skills && skills.length > 0; // > MAX_PROJECT_PREVIEW_COUNT;
</script>

{#if skills && skills.length}
    <div class="content">
        <ContentPanel title="Seeking Skills:" showEdit="{canEdit}" showMoreAction="{areMoreItems}">
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
<script>
	import ContentPanel from './ContentPanel.svelte';
    import TagSet from './TagSet.svelte';

    import config from '../../config';

	import { getSplitItems } from '../../utils';

    import {
        getIsProjectTeamMember,
        user,
    } from '../../models/appModel';

    export let project = null;

    let displayAllTags = false;

    $: displayLimit = displayAllTags ? 0 : config.MAX_SKILL_TAG_COUNT;

    // $: skills = (project && project.skills) || null;
	$: skills = (project && project.skills && getSplitItems(project.skills)) || null;
    $: isTeamMember = $user && getIsProjectTeamMember(project);

	$: canEdit = false; // (isTeamMember && !project.archived) || false;

    $: areMoreItems = skills && displayLimit && skills.length > displayLimit;

    // $: console.log('areMoreItems: ', !!(skills && skills.length > displayLimit), skills && skills.length, displayLimit);
    // $: console.log('show more items: ', !!(areMoreItems ? displayAllSkills : false));

	function displayAllSkills() {
        displayAllTags = true;
	}
</script>

{#if skills && skills.length}
    <div class="content">
        <ContentPanel title="Seeking Skills:" showEdit="{canEdit}" showMoreAction="{areMoreItems ? displayAllSkills : false}">
            <TagSet tags="{skills}" displayLimit="{displayLimit}" />
        </ContentPanel>
    </div>
{/if}

<style>
    .content :global(.panelTitle) {
        font-size: 1.3rem;
        font-weight: normal;
    }
</style>
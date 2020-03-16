<script>
	import ContentPanel from './ContentPanel.svelte';
	import TagSet from './TagSet.svelte';

    export let project = null;

    $: skills = (project && project.skills) || null;
    $: isOwner = (project && project.isOwner) || false;

    $: areMoreItems = skills && skills.length > 0; // > MAX_PROJECT_PREVIEW_COUNT;
</script>

{#if skills && skills.length}
    <div class="content">
        <ContentPanel title="Seeking Skills:" showEdit="{isOwner}" showMoreAction="{areMoreItems}">
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
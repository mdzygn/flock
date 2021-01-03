<script>
    import Button from '../../components/Button.svelte';

    let linkToDiscoverSearch = true;

    export let tags = null;

    export let displayLimit = 0;
</script>

{#if tags}
    <div class="tagSet">
        {#each tags as tag, index}
            {#if !displayLimit || index < displayLimit}
                <Button className="tag" href="{linkToDiscoverSearch ? 'discover?search=' + encodeURIComponent(tag) : ''}">{tag}{#if index < tags.length - 1 && (!displayLimit || index < displayLimit-1)}<span class="invisibleSeparator">,&nbsp;</span>{/if}</Button>
            {/if}
        {/each}
    </div>
{/if}

<style>
    .tagSet {
        margin-bottom: -8px;
    }

    .tagSet :global(.tag) {
        display: inline-block;
        background-color: #EEEEEE;

        border-radius: 100px;

        font-size: 1.5rem;

        margin-right: 5px;
        padding: 1px 11px;
        margin-bottom: 8px;

        color: #0D0D0D;
    }

    .tagSet :global(.buttonContent) {
        display: inline-block;
        user-select: text;
    }

    .invisibleSeparator {
        display: inline-block;
        overflow: hidden;
        opacity: 0;
        width: 1px;
        font-size: 1px;
    }
</style>
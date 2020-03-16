<script>
    import Button from '../../components/Button.svelte';

    export let tags = null;
</script>

{#if tags}
    <div class="tagSet">
        {#each tags as tag}
            <Button className="tag">{tag}</Button>
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
</style>
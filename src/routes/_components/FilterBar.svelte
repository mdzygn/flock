<script>
    import Button from '../../components/Button.svelte';
    // import TagSet from './TagSet.svelte';

    export let filterString = '';

    let items = ['all', 'design', 'arts', 'tech', 'environment', 'social', 'apps', 'games', 'music', 'food', 'education', 'media', 'narrative'];
</script>

<div class="filterBar">
    <!-- <TagSet tags="{items}" /> -->

    <div class="filterScrollRegion">
        <div class="filterSet">
            {#each items as item, index}
                <Button className="filterButton {index === 0 ? 'defaultItem' : ''}">{item}</Button>
            {/each}
        </div>
    </div>
</div>

<style>
    .filterBar {
        width: 100%;
    }

    .filterScrollRegion {
        overflow-x: scroll;
        overflow-y: hidden;
        -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
        white-space: nowrap;
	}
	.filterBar :global(.filterScrollRegion::-webkit-scrollbar) { /* Hide scrollbar for Chrome, Safari and Opera */
        display: none;
    }

    .filterSet {
        padding-left: 17px;
        padding-right: 10px;
        white-space: nowrap;
        display: inline-block;
    }

    .filterSet :global(.filterButton) {
        display: inline-block;
        background-color: #EEEEEE;

        border-radius: 100px;

        font-size: 1.5rem;

        margin-right: 5px;
        padding: 2px 11px;
        margin-bottom: 8px;

        color: #0D0D0D;
    }

    .filterSet :global(.defaultItem) {
        border: 2px solid #242424;
        background-color: initial;

        padding: 0px 11px;
    }


    .filterSet :global(.buttonContent) {
        display: inline-block;
        user-select: text;
    }
</style>
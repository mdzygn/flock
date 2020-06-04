<script>
    import Button from '../../components/Button.svelte';
    // import TagSet from './TagSet.svelte';

    export let filterString = '';

    let items = ['all', 'design', 'arts', 'tech', 'environment', 'social', 'apps', 'games', 'music', 'food', 'education', 'media', 'narrative'];

    function selectFilter(filterValue) {
        if (filterValue === 'all') {
            filterString = '';
        } else {
            filterString = filterValue;
        }
    }
</script>

<div class="filterBar">
    <!-- <TagSet tags="{items}" /> -->

    <div class="filterScrollRegion">
        <div class="filterSet">
            {#each items as item, index}
                <Button className="filterButton {(index ? item === filterString : filterString === '') ? 'selectedItem' : ''}" onClick={e => selectFilter(item)}>{item}</Button>
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

        padding: 2px 10px;

        margin-right: 5px;
        margin-bottom: 8px;

        color: #0D0D0D;
    }

    .filterSet :global(.selectedItem) {
        border: 2px solid #242424;
        background-color: initial;

        padding: 0px 8px;
    }


    .filterSet :global(.buttonContent) {
        display: inline-block;
        user-select: text;
    }
</style>
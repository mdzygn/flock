<script>
    import Button from '../../components/Button.svelte';
    // import TagSet from './TagSet.svelte';

    import { onMount, tick } from 'svelte';

    import { get, writable } from 'svelte/store';

	import {
		getChannels,
    } from '../../models/channelsModel';

    export let project;

    // export let filterString = '';

    export let currentChannelId = null;

    let channels = writable(null);
    $: { channels = $project && getChannels( { projectId: $project.id } ) };

    // let itemSet = ['announcements', 'general', 'workshop', 'questions', 'ideas', 'inspiration', 'random'];

    $: itemSet = $channels && $channels.map(item => {
        const itemModel = get(item);
        return {label: '# ' + itemModel.title, value: itemModel.id};
    });

    $: items = [{label: 'All', value: null}, ...itemSet];
    // $: items = ['all', ...itemSet];

    function selectFilter(item) {
        currentChannelId = item.value;
        // if (item === 'all') {
        //     filterString = '';
        // } else {
        //     filterString = item;
        // }
    }

    $: {
        currentChannelId; // filterString;
        if (mounted) {
            (async () => {
                await tick();
                scrollToSelectedItem();
            })();
        }
    }

    let scrollRegion;
    let mounted = false;

    // let selectingItem;

    const SCROLL_FOCUS_MARGIN = 10;
    const SCROLL_FOCUS_OFFSET = 40;

    onMount(() => {
        mounted = true;
    });

    function scrollToSelectedItem() {
        if (scrollRegion) { //  && !selectingItem
            const selectedElementArray = scrollRegion.getElementsByClassName('selectedItem');
            const selectedElement = selectedElementArray && selectedElementArray.length ? selectedElementArray[0] : null;
            if (selectedElement) {
                const selectedElementLeft = selectedElement.offsetLeft;
                const selectedElementRight = selectedElement.offsetLeft + selectedElement.offsetWidth;
                const scrollRegionWidth = scrollRegion.offsetWidth;
                const scrollRegionLeft = scrollRegion.scrollLeft;
                const scrollRegionRight = scrollRegion.scrollLeft + scrollRegionWidth;

                if (selectedElementRight < scrollRegionWidth - SCROLL_FOCUS_MARGIN) {
                    scrollRegion.scrollTo(0, 0);
                } else if (selectedElementRight > scrollRegionRight - SCROLL_FOCUS_MARGIN
                || selectedElementLeft < scrollRegionLeft + SCROLL_FOCUS_MARGIN) {
                    const offsetX = selectedElement.offsetLeft - SCROLL_FOCUS_OFFSET;
                    scrollRegion.scrollTo(offsetX, 0);
                }
            }
        }
    }
</script>

<div class="filterBar">
    <div class="filterScrollRegion" bind:this="{scrollRegion}">
        <div class="filterSet">
            {#each items as item}
                <Button className="filterButton {item.value === currentChannelId ? 'selectedItem' : ''}" onClick={e => selectFilter(item)}>{item.label}</Button>
                <!-- <Button className="filterButton {(index ? filterString.match(new RegExp('\\b' + item + '\\b')) : filterString === '') ? 'selectedItem' : ''}" onClick={e => selectFilter(item)}>{item}</Button> -->
            {/each}
        </div>
    </div>
</div>

<style>
    .filterBar {
        width: 100%;
        background-color: #ffffff;
        padding-bottom: 10px;
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
        /* margin-bottom: 8px; */

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
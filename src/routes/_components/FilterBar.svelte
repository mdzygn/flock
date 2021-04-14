<script>
    import Button from '../../components/Button.svelte';
    // import TagSet from './TagSet.svelte';
    
    import ScrollList from '../../components/ScrollList.svelte';

    import { onMount, tick } from 'svelte';

    export let filterString = '';

    export let isCategorySelector = false;

    const deselectOtherOnCategory = true;

    // , 'narrative'
    let itemSet = ['design', 'arts', 'tech', 'environment', 'community', 'apps', 'games', 'music', 'media', 'education', 'food'];

    $: items = isCategorySelector ? [...itemSet, 'other'] : ['all', ...itemSet];

    $: allowMultiSelect = isCategorySelector;

    function selectFilter(filterValue) {
        // selectingItem = true;

        // await tick();
        // console.log('set value');

        // console.log('before filterString', filterString);

        if (filterValue === 'all') {
            filterString = '';
        } else {
            if (allowMultiSelect) {
                if (filterValue) {
                    let curFilterItems = filterString.trim().split(', ');

                    if (deselectOtherOnCategory) {
                        if ((filterValue === 'other' || filterString === 'other') && (filterValue !== filterString)) {
                            curFilterItems = [];
                        }
                    }

                    const curItemIndex = curFilterItems.indexOf(filterValue);
                    // console.log('curItemIndex', curItemIndex);
                    if (curItemIndex !== -1) {
                        curFilterItems.splice(curItemIndex, 1);
                    } else {
                        curFilterItems.push(filterValue);
                    }
                    curFilterItems = curFilterItems.filter(item => item);

                    filterString = curFilterItems.join(', ').trim();
                }
            } else {
                filterString = filterValue;
            }
        }

        // console.log('after filterString', filterString);

        // await tick();
        // console.log('stop set value');
        // selectingItem = false;
    }

    let mounted = false;

    onMount(() => {
        mounted = true;
    });


    let scrollList;
    $: {
        itemSet;
        scrollList && scrollList.resize();
    }
    $: {
        filterString;
        if (mounted) {
            (async () => {
                await tick();
                scrollList && scrollList.scrollToSelectedItem();
                // scrollToSelectedItem();
            })();
        }
    }

    // let selectingItem;

    // let scrollRegion;

    // const SCROLL_FOCUS_MARGIN = 10;
    // const SCROLL_FOCUS_OFFSET = 40;

    // function scrollToSelectedItem() {
    //     // console.log('update value ' + selectingItem);
    //     if (scrollRegion) { //  && !selectingItem
    //         const selectedElementArray = scrollRegion.getElementsByClassName('selectedItem');
    //         const selectedElement = selectedElementArray && selectedElementArray.length ? selectedElementArray[0] : null;
    //         if (selectedElement) {
    //             const selectedElementLeft = selectedElement.offsetLeft;
    //             const selectedElementRight = selectedElement.offsetLeft + selectedElement.offsetWidth;
    //             const scrollRegionWidth = scrollRegion.offsetWidth;
    //             const scrollRegionLeft = scrollRegion.scrollLeft;
    //             const scrollRegionRight = scrollRegion.scrollLeft + scrollRegionWidth;

    //             // console.log('offset: ' + (selectedElement.offsetLeft + selectedElement.offsetWidth) + ' width: ' + scrollRegionWidth);
    //             // console.log(selectedElementRight + ' > ' + (scrollRegion.scrollLeft + scrollRegionWidth - SCROLL_FOCUS_MARGIN));
    //             // if (selectedElement.offsetLeft + selectedElement.offsetWidth > scrollRegionWidth) {
    //             if (selectedElementRight < scrollRegionWidth - SCROLL_FOCUS_MARGIN) {
    //                 // console.log('reset ' + selectedElementRight + ' < ' + (scrollRegionWidth - SCROLL_FOCUS_MARGIN));
    //                 // console.log('set scroll ' + 0);
    //                 scrollRegion.scrollTo(0, 0);
    //             } else if (selectedElementRight > scrollRegionRight - SCROLL_FOCUS_MARGIN
    //             || selectedElementLeft < scrollRegionLeft + SCROLL_FOCUS_MARGIN) {
    //                 const offsetX = selectedElement.offsetLeft - SCROLL_FOCUS_OFFSET;
    //                 // console.log('set scroll: ' + offsetX);
    //                 scrollRegion.scrollTo(offsetX, 0);
    //             }
    //         }
    //     }
    // }
</script>

<div class="filterBar" class:isCategorySelector="{isCategorySelector}">
    <!-- <TagSet tags="{items}" /> -->

    <!-- <div class="filterScrollRegion" bind:this="{scrollRegion}"> -->
    <ScrollList bind:this="{scrollList}">
        <div class="filterSet">
            {#each items as item, index}
                <Button className="filterButton {((index || isCategorySelector) ? filterString.match(new RegExp('\\b' + item + '\\b')) : filterString === '') ? 'selectedItem' : ''}" onClick={e => selectFilter(item)}>{item}</Button>
            {/each}
        </div>
    </ScrollList>
    <!-- </div> -->
</div>

<style>
    .filterBar {
        width: 100%;
        background-color: #ffffff;
        padding-bottom: 10px;
    }

    /* .filterScrollRegion {
        overflow-x: scroll;
        overflow-y: hidden;
        -ms-overflow-style: none;
        white-space: nowrap;
	}
	.filterBar :global(.filterScrollRegion::-webkit-scrollbar) {
        display: none;
    } */

    .filterSet {
        padding-left: 17px;
        padding-right: 10px;
        white-space: nowrap;
        display: inline-block;
    }

    .filterBar.isCategorySelector {
        padding-bottom: 0;
    }

    .filterBar.isCategorySelector {
        white-space: normal;
    }
    .filterBar.isCategorySelector .filterSet {
        white-space: normal;
        padding: 0;
        /* padding-left: 6px; */
        padding-top: 4px;
        padding-right: 6px;
    }
    .filterBar.isCategorySelector :global(.filterButton) {
        margin-bottom: 6px;
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
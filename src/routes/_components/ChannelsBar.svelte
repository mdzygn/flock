<script>
    import config from '../../config';
    import locale from '../../locale';

    import Button from '../../components/Button.svelte';
    import ScrollList from '../../components/ScrollList.svelte';
    // import TagSet from './TagSet.svelte';

    import { onMount, tick } from 'svelte';

    import { get, writable } from 'svelte/store';

	import {
		// getIsProjectTeamMember,
        // user,
    } from '../../models/appModel';
    
	import {
		getChannels,
        // getIsBaseDisplayChannel,
        // getIsTeamManagedChannel,
		displayChannelForUser,
    } from '../../models/channelsModel';

    export let project;

    // export let filterString = '';

    export let currentChannelId = null;

    // $: isTeamMember = $user && getIsProjectTeamMember($project);
    // $: following = ($project && $project.following) || false;

    let channels = writable(null);
    $: { channels = $project && getChannels( { projectId: $project.id } ) };

    // let itemSet = ['announcements', 'general', 'workshop', 'questions', 'ideas', 'inspiration', 'random'];

    $: itemSet = $channels ? $channels.map(item => {
        const itemModel = get(item);
        const noPosts = !itemModel.postCount;
        if (displayChannelForUser(item, project)) {
            return {label: (config.CHANNELS_INCLUDE_HASH ? '#' : '') + itemModel.title, value: itemModel.id, title: itemModel.title, noPosts}; // , channelModel: itemModel
        } else {
            return null;
        }
    }).filter(item => item) : [];

    $: items = [
        {label: locale.DISCUSSIONS.ALL_FILTER, title: null, value: null},
        // {label: locale.DISCUSSIONS.UPDATES_FILTER, title: null, value: 'updates'},
        ...itemSet
    ];
    // $: items = ['all', ...itemSet];

    function selectFilter(item) {
        currentChannelId = item.value;

        // if (item === 'all') {
        //     filterString = '';
        // } else {
        //     filterString = item;
        // }
    }

    let scrollList;
    $: {
        itemSet;
        scrollList && scrollList.resize();
    }
    $: {
        currentChannelId;
        if (mounted) {
            (async () => {
                await tick();
                scrollList && scrollList.scrollToSelectedItem();
            })();
        }
    }

    let mounted = false;

    onMount(() => {
        mounted = true;
    });

    // let selectingItem;

    // const SCROLL_FOCUS_MARGIN = 10;
    // const SCROLL_FOCUS_OFFSET = 40;

    // let scrollRegion;

    // function scrollToSelectedItem() {
    //     if (scrollRegion) { //  && !selectingItem
    //         const selectedElementArray = scrollRegion.getElementsByClassName('selectedItem');
    //         const selectedElement = selectedElementArray && selectedElementArray.length ? selectedElementArray[0] : null;
    //         if (selectedElement) {
    //             const selectedElementLeft = selectedElement.offsetLeft;
    //             const selectedElementRight = selectedElement.offsetLeft + selectedElement.offsetWidth;
    //             const scrollRegionWidth = scrollRegion.offsetWidth;
    //             const scrollRegionLeft = scrollRegion.scrollLeft;
    //             const scrollRegionRight = scrollRegion.scrollLeft + scrollRegionWidth;

    //             if (selectedElementRight < scrollRegionWidth - SCROLL_FOCUS_MARGIN) {
    //                 scrollRegion.scrollTo(0, 0);
    //             } else if (selectedElementRight > scrollRegionRight - SCROLL_FOCUS_MARGIN
    //             || selectedElementLeft < scrollRegionLeft + SCROLL_FOCUS_MARGIN) {
    //                 const offsetX = selectedElement.offsetLeft - SCROLL_FOCUS_OFFSET;
    //                 scrollRegion.scrollTo(offsetX, 0);
    //             }
    //         }
    //     }
    // }
</script>

<div class="filterBar">
    <!-- <div class="filterScrollRegion" bind:this="{scrollRegion}"> -->
    <ScrollList bind:this="{scrollList}">
        <div class="filterSet">
            {#each items as item}
                <!-- TODO move check here into list build -->
                <!-- {#if !item.channelModel || isTeamMember || item.channelModel.postCount || getIsBaseDisplayChannel(item.channelModel) || (following && !getIsTeamManagedChannel(item.channelModel))} -->
                    <Button className="filterButton {item.value === currentChannelId ? 'selectedItem' : ''} {item.noPosts ? 'noPosts' : ''}" onClick={e => selectFilter(item)}>{item.label}</Button>
                    <!-- <Button className="filterButton {(index ? filterString.match(new RegExp('\\b' + item + '\\b')) : filterString === '') ? 'selectedItem' : ''}" onClick={e => selectFilter(item)}>{item}</Button> -->
                <!-- {/if} -->
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
        padding-right: 17px;
        /* padding-right: 10px; */
        white-space: nowrap;
        display: inline-block;
    }

    .filterSet :global(.filterButton) {
        display: inline-block;
        background-color: #e6e6e6;
        /* background-color: #EEEEEE; */

        border-radius: 100px;

        font-size: 1.5rem;

        padding: 2px 10px;

        margin-right: 5px;
        /* margin-bottom: 8px; */

        color: #0D0D0D;
    }

    .filterSet :global(.filterButton.noPosts) {
        background-color: #f6f6f6;
    }

    .filterSet :global(.filterButton.selectedItem) {
        border: 2px solid #242424;
        background-color: initial;

        padding: 0px 8px;
    }

    .filterSet :global(.buttonContent) {
        display: inline-block;
        user-select: text;
    }

    .filterSet :global(.filterButton) {
        padding: 0px 3px;
        margin: 0 6px 0 4px;

        background-color: initial;

        border-radius: 0;
        border: none;
    }

    .filterSet :global(.filterButton.selectedItem) {
        padding: 0px 3px;

        border-radius: 0;
        border: none;
        border-bottom: 2px solid #242424;
    }

    .filterSet :global(.filterButton.noPosts) {
        background-color: initial;
        color: #aaaaaa;
    }
</style>
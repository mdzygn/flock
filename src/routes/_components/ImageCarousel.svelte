<script>
	import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { onMount, tick } from 'svelte';
    import Button from '../../components/Button.svelte';

    export let images = null;

    export let image = null;

    export let imageBasePath = '';
    export let imageExtension = '.jpg';

    export let searchString = null;

    const MIN_X = -600; // -200;
    const MAX_X = 1200; // 1500; // 400;

    let imageElements = {};

    let scrollRegion = null;

    let filteredImages = null;
    $: {
        // imageItems.length = 0;
        filteredImages = filterItems(images, searchString);
        (async () => {
            await tick();

            for (let imageItem, element, itemI = 0; itemI < filteredImages.length; itemI++) {
                imageItem = filteredImages[itemI];
                element = imageElements[imageItem.imageId];
                if (element) {
                    element.posX = undefined;
                }
            }

            updateScroll();
        })();
    }

    onMount(() => {
        scrollRegion.addEventListener('scroll', updateScroll);
        updateScroll();
    });

    function updateScroll() {
        if (scrollRegion) {
            const scrollX = scrollRegion.scrollLeft;
            // console.log('scrollX', scrollX, imageItems[1] && imageItems[1].offsetLeft);
            for (let imageItem, element, elementX, visible, itemI = 0; itemI < filteredImages.length; itemI++) {
                imageItem = filteredImages[itemI];
                element = imageElements[imageItem.imageId];
                if (element) {
                    // if (element.posX === undefined) {
                    //     if (element.lastPosX && element.lastPosX !== element.posX) {
                    //         console.log(element.lastPosX + ', ' + element.imageUrl);
                    //     }
                    //     element.posX = element.offsetLeft;
                    //     element.lastPosX = element.posX;
                    // };
                        element.posX = element.offsetLeft;
                    elementX = element.posX - scrollX;
                    visible = (elementX > MIN_X && elementX < MAX_X)
                    // if (itemI === 1) {
                    //     console.log('elementX', elementX, visible, element.isVisible, element.imageUrl);
                    // }
                    if (element.isVisible !== visible && element.imageUrl) {
                        element.isVisible = visible;
                        if (visible) {
                            element.style = 'visibility: visible; background-image: url(' + element.imageUrl + ')';
                        } else {
                            element.style = '';
                        }
                    }
                }
            }
        }
    }

    function selectImage(targetImage) {
        image = targetImage.imageId;
        dispatch('select', {thumbImage: imageBasePath + image + imageExtension});

        // console.log('imageItems', imageItems);
    }

    function filterItems(items, searchString) {
        const filteredItems = [];

        if (searchString) {
            searchString = searchString.toLowerCase();
        }

        let item, curProject;
        for (let index = 0; index < items.length; index++) {
            item = items[index];
            if (item && itemSearchMatch(item, searchString)) {
                filteredItems.push(item);
            }
        }

        return filteredItems;
    }

    function itemSearchMatch(item, searchString) {
        if (item.tags && item.tags.toLowerCase().includes(searchString)) return true;
        return false;
    }
</script>

<div class="imageCarousel" bind:this="{scrollRegion}">
    <div class="imageContainer">
        {#each filteredImages as image, index (image.imageId)}
            {#if !image.disabled}
                <Button className="imageItem" bind:element="{imageElements[image.imageId]}" imageUrl="{imageBasePath + image.imageId + imageExtension}" onClick="{() => { selectImage(image); } }" />
                <!-- style="background-image: url({imageBasePath + image.imageId + imageExtension})" -->
            {/if}
        {/each}
    </div>
</div>

<style>
    .imageCarousel {
        white-space: nowrap;

        overflow-x: scroll;
        overflow-y: hidden;

        padding: 0px 45px;

        -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
    }
	.imageCarousel::-webkit-scrollbar { /* Hide scrollbar for Chrome, Safari and Opera */
        display: none;
    }

    .imageContainer {
        display: inline-block;
    }

    .imageCarousel :global(.imageItem) {
        display: inline-block;
        position: relative;

        visibility: hidden;

        margin: 0 12px;

        width: 168px;
        height: 100px;
        /* width: 94px;
        height: 56px; */

        background-color: #333333;
        background-size: cover;
        border: 3px solid #ffffff;

        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.5);
    }
</style>
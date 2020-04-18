<script>
	import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { onMount, tick } from 'svelte';
    import Button from '../../components/Button.svelte';

    import { contextFilterItems, filterItems, removeContextStopWords } from '../../utils/searchUtils';

    export let images = null;

    export let image = null;

    export let imageBasePath = '';
    export let imageExtension = '.jpg';

    export let searchString = null;

    export let contextSearchString = '';

    const MIN_X = -1000; // -200;
    const MAX_X = 800; // 1500; // 400;

    let imageElements = {};

    let scrollRegion = null;

    $: {
        for (let imageItem, itemI = 0; itemI < images.length; itemI++) {
            imageItem = images[itemI];
            imageItem.imageUrl = imageBasePath + imageItem.imageId + imageExtension;
        }
    }

    let contextFilteredImages = null;
    let filteredImages = [];

    $: {
        updateContextFilteredImages(images, contextSearchString);
    }
    $: {
        updateFilteredImages(contextFilteredImages, searchString);
    }

    function updateContextFilteredImages(items, contextSearchString) {
        contextFilteredImages = contextFilterItems(items, removeContextStopWords(contextSearchString));
        // console.log('updateContextFilteredImages', contextSearchString);
    }
    function updateFilteredImages(items, searchString) {
        if (items) {
            filteredImages = filterItems(items, searchString);

            for (let imageItem, element, itemI = 0; itemI < filteredImages.length; itemI++) {
                imageItem = filteredImages[itemI];
                imageItem.posX = undefined;
            }

            (async () => {
                await tick();
                if (scrollRegion) {
                    scrollRegion.scrollLeft = 0;
                }
                updateScroll();
            })();
        }
    }

    onMount(() => {
        scrollRegion.addEventListener('scroll', updateScroll);
        updateScroll();
    });

    function updateScroll() {
        if (scrollRegion) {
            const scrollX = scrollRegion.scrollLeft;
            for (let imageItem, element, elementX, visible, itemI = 0; itemI < filteredImages.length; itemI++) {
                imageItem = filteredImages[itemI];
                element = imageElements[imageItem.imageId];
                if (element) {
                    if (imageItem.posX === undefined || imageItem.posX === 0) {
                        imageItem.posX = element.offsetLeft;
                    };
                    elementX = imageItem.posX - scrollX;
                    visible = (elementX > MIN_X && elementX < MAX_X)
                    if (element.isVisible !== visible && imageItem.imageUrl) {
                        element.isVisible = visible;
                        if (visible) {
                            element.style = 'visibility: visible; background-image: url(' + imageItem.imageUrl + ')';
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
    }
</script>

<div class="imageCarousel" bind:this="{scrollRegion}">
    <div class="imageContainer">
        {#each filteredImages as image, index (image.imageId)}
            {#if !image.disabled}
                <Button className="imageItem" bind:element="{imageElements[image.imageId]}" onClick="{() => { selectImage(image); } }" />
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

        pointer-events: none;
    }
	.imageCarousel::-webkit-scrollbar { /* Hide scrollbar for Chrome, Safari and Opera */
        display: none;
    }

    .imageContainer {
        display: inline-block;

        pointer-events: auto;
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

        background-color: #666666;
        background-size: cover;
        border: 3px solid #ffffff;

        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.5);
    }
</style>
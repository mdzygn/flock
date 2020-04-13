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
        contextFilteredImages = contextFilterItems(items, contextSearchString);
        // console.log('updateContextFilteredImages', contextSearchString);
    }
    function updateFilteredImages(items, searchString) {
        if (items) {
            // imageItems.length = 0;
            filteredImages = filterItems(items, searchString);
            // console.log('updateFilteredImages', searchString);

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
                    if (imageItem.posX === undefined) {
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

    function contextFilterItems(items, contextSearchString) {
        let filteredItems = [];

        const fullSeparateWordContextSearchString = '\\b' + contextSearchString.split(' ').join('\\b|\\b') + '\\b';
        const separateWordContextSearchString = contextSearchString.split(' ').join('|');

        if (!contextSearchString) {
            filteredItems = [...items];
        } else {
            let index, item, curProject;
            for (index = 0; index < items.length; index++) {
                item = items[index];
                if (itemRegexMatch(item, fullSeparateWordContextSearchString)) {
                    filteredItems.push(item);
                }
            }

            for (index = 0; index < items.length; index++) {
                item = items[index];
                if (itemRegexMatch(item, separateWordContextSearchString) && !filteredItems.includes(item)) {
                    filteredItems.push(item);
                }
            }

            for (index = 0; index < items.length; index++) {
                item = items[index];
                if (!filteredItems.includes(item)) {
                    filteredItems.push(item);
                }
            }
        }

        return filteredItems;
    }

    function filterItems(items, searchString) {
        let filteredItems = [];

        if (searchString) {
            searchString = searchString.toLowerCase().trim();
        }

        if (!searchString) {
            filteredItems = [...items];
        } else {
            let index, item, curProject;
            for (index = 0; index < items.length; index++) {
                item = items[index];
                if (itemSearchFullwordMatch(item, searchString)) {
                    filteredItems.push(item);
                }
            }

            for (index = 0; index < items.length; index++) {
                item = items[index];
                if (itemSearchMatch(item, searchString) && !filteredItems.includes(item)) {
                    filteredItems.push(item);
                }
            }
        }

        return filteredItems;
    }

    function itemSearchFullwordMatch(item, searchString) {
        if (item.tags.match(new RegExp('\\b' + searchString + '\\b', 'i'))) {
            return true;
        }
        return false;
    }

    function itemSearchMatch(item, searchString) {
        if (item.tags.toLowerCase().includes(searchString)) return true;
        return false;
    }

    function itemRegexMatch(item, searchString) {
        if (item.tags.match(new RegExp(searchString, 'i'))) {
            return true;
        }
        return false;
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

        background-color: #666666;
        background-size: cover;
        border: 3px solid #ffffff;

        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.5);
    }
</style>
<script>
    import { tick } from 'svelte';

    import locale from '../../locale';

    import config from '../../config';

    import { shuffle } from '../../utils';

    import Button from '../../components/Button.svelte';

	import SearchBar from '../_components/SearchBar.svelte';
    import ImageCarousel from './ImageCarousel.svelte';

    import EmptyImage from "../../assets/images/empty.png";

    import UploadImageIcon from "../../assets/icons/upload_image.png";

    import imageLibrary from '../../data/library/images/compiled/imageLibrary.json';
    // import imageLibrary from '../../data/library/images/_general.json';

    const libraryImages = shuffle(imageLibrary);

    export let image = null;

    export let contextSearchString = '';

    let carouselShown = true;
    let imageLibrarySearchString = '';

    let inited = false;
    $: {
        if (!inited) {
            inited = true;
            if (image) {
                carouselShown = false;
            }
        }
    }

    let imageSrc = null;
    $: {
        imageSrc = (image && (config.contentUrl + config.headerImageLibraryFolder + image + config.headerImageExtension)) || null;
    }

    function toggleCarousel() {
        if (image) {
            carouselShown = !carouselShown;
        }
    }

    async function selectImage(event) {
        await tick();
        imageSrc = EmptyImage; // force empty image to load first

        await tick();
        imageSrc = event.detail.thumbImage; // force thumb to load in image first

        await tick(); // then reupdate with current image
        imageSrc = (image && (config.contentUrl + config.headerImageLibraryFolder + image + config.headerImageExtension)) || null; //TODO: find better way

        await tick();
        carouselShown = false;
    }

    function uploadImage() {
    }
</script>

<div class="imageSelectionBox" class:opened="{carouselShown}">
    {#if imageSrc}
        <img class="imageSelectionBoxImage" class:carouselShown="{carouselShown}" on:click="{toggleCarousel}" src="{imageSrc}" alt="project header image" />
    {/if}
    <div class="carouselContainer" class:hidden="{!carouselShown}">
        <SearchBar bind:searchString={imageLibrarySearchString} />
        <ImageCarousel
            images="{libraryImages}"
            imageBasePath="{config.contentUrl + config.headerImageLibraryThumbFolder}"
            imageExtension="{config.headerImageExtension}"
            bind:image="{image}"
            searchString="{imageLibrarySearchString}"
            {contextSearchString}
            on:select="{selectImage}" />
        <!-- <Button className="uploadButton" onClick="{uploadImage}" disabled="{true}">
            <div class="uploadButtonIcon" style="background-image: url({UploadImageIcon})"/>
            <div class="buttonLabel">{locale.GENERAL.UPLOAD_IMAGE}</div>
        </Button> -->
    </div>
</div>

<style>
    .imageSelectionBox {
		width: 100%;
		height: 220px;

        position: relative;

    	background-color: #E3E3E3;
    }

	.imageSelectionBox :global(.searchBar) {
        position: absolute;

        pointer-events: none;
	}
	.imageSelectionBox :global(.searchBarField) {
        margin: 28px 100px;
        background-color: #ffffff;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.15);

        pointer-events: initial;
	}

    .hidden {
        display: none;
    }

    .imageSelectionBoxImage {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;

        cursor: pointer;
    }

    .carouselContainer {
        position: absolute;
        width: 100%;
        height: 100%;

        pointer-events: none;
    }

    .carouselShown {
        opacity: 0.4;
    }

    .imageSelectionBox :global(.imageCarousel) {
        position: absolute;
        top: 78px;
        left: 0;
        width: 100%;

        /* padding-top: 78px; */
        /* padding-top: 40px; */
    }

    .imageSelectionBox :global(.uploadButton) {
        position: absolute;
        top: 70%;
        left: 50%;
        margin-top: -75px;
        margin-left: -100px;
        width: 100px;
        padding: 50px;
    }

    .imageSelectionBox :global(.uploadButton .buttonContent) {
        width: 100%;
        height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
        flex-flow: wrap;
    }

    .imageSelectionBox :global(.uploadButton .uploadButtonIcon) {
        /* position: absolute; */
        /* top: -21.5px;
        left: -18.5px; */
        width: 43px;
        height: 37px;
        background-size: cover;
    }

    .imageSelectionBox :global(.uploadButton .buttonLabel) {
        margin-top: 5px;

        font-size: 1.2rem;
        font-weight: 700;
        color: #666666;
    }
</style>
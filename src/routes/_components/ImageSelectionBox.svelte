<script>
    import locale from '../../locale';

    import config from '../../config';

    import { shuffle } from '../../utils';

    import Button from '../../components/Button.svelte';

    import ImageCarousel from './ImageCarousel.svelte';

    import UploadImageIcon from "../../assets/icons/upload_image.png";

    import headerImageLibrary from '../../data/headerImageLibrary.json';

    const libraryImages = shuffle(headerImageLibrary);

    export let image = null;

    let carouselShown = true;

    let inited = false;
    $: {
        if (!inited) {
            inited = true;
            if (image) {
                carouselShown = false;
            }
        }
    }

    $: imageSrc = (image && (config.headerImageLibraryFolder + image + config.headerImageExtension)) || null;

    function toggleCarousel() {
        if (image) {
            carouselShown = !carouselShown;
        }
    }

    function uploadImage() {
    }
</script>

<div class="imageSelectionBox">
    {#if imageSrc}
        <img class="imageSelectionBoxImage" class:carouselShown="{carouselShown}" on:click="{toggleCarousel}" src="{imageSrc}" alt="project header image" />
    {/if}
    <div class="carouselContainer" class:hidden="{!carouselShown}">
        <ImageCarousel
            images="{libraryImages}"
            imageBasePath="{config.headerImageLibraryThumbFolder}"
            imageExtension="{config.headerImageExtension}"
            bind:image="{image}"
            on:select="{toggleCarousel}" />
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

    .carouselShown {
        opacity: 0.4;
    }

    .imageSelectionBox :global(.imageCarousel) {
        /* padding-top: 120px; */
        padding-top: 40px;
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
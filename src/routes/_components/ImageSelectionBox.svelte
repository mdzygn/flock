<script>
    import { tick, createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import locale from '../../locale';
    import promptIds from '../../config/promptIds';

    import config from '../../config';

    import { shuffle } from '../../utils';

    import UploadUtil from '../../utils/UploadUtil';

    import Button from '../../components/Button.svelte';

	import SearchBar from '../_components/SearchBar.svelte';
    import ImageCarousel from './ImageCarousel.svelte';

    import EmptyImage from "../../assets/images/empty.png";

    import UploadImageIcon from "../../assets/icons/upload_image.png";
    import CancelIcon from "../../assets/icons/clear.png";

    import imageLibrary from '../../data/library/images/compiled/imageLibrary.json';
    // import imageLibrary from '../../data/library/images/_general.json';

    import { getHeaderImage } from '../../models/appModel';
    import { showPrompt } from '../../actions/appActions';


    const libraryImages = shuffle(imageLibrary);

    export let image = null;

    export let contextSearchString = '';

    export let uploadType;
    export let itemId;
    export let itemIndex = '';

    export let containMode = false;

    export let imageType = 'image/jpeg';
    export let useLibrary = true;

    export let className = '';

    let carouselShown = true;
    let imageLibrarySearchString = '';

    let uploadFileInput;

    $: {
        carouselShown;
        dispatch('resize');
    }

    export let fileIsUploading = false;

    let inited = false;
    $: {
        if (!inited) {
            inited = true;
            if (image) {
                carouselShown = false;
            }
        }
    }

    let autoUploadTriggered = false;
    $: {
        if (!useLibrary) {
            if (carouselShown) {
                if (!autoUploadTriggered) {
                    autoUploadTriggered = true;
                    uploadHeaderImage();
                }
            } else {
                autoUploadTriggered = false;
            }
        }
    }

    let imageSrc = null;
    $: {
        if (!fileIsUploading && typeof image === 'string') {
            imageSrc = getHeaderImage(image);
        }
    }

    function toggleCarousel() {
        if (image) {
            carouselShown = !carouselShown;
        }
    }

    function hideCarousel() {
        carouselShown = false;
    }

    function showCarousel() {
        carouselShown = true;
    }

    async function selectImage(event) {
        fileIsUploading = false;

        await tick();
        imageSrc = EmptyImage; // force empty image to load first

        await tick();
        imageSrc = event.detail.thumbImage; // force thumb to load in image first

        await tick(); // then reupdate with current image
        imageSrc = (image && (config.SITE_CONTENT_URL + config.headerImageLibraryFolder + image + config.headerImageExtension)) || null; //TODO: find better way

        await tick();
        hideCarousel();
    }

    function uploadHeaderImage() {
        UploadUtil.uploadImage({
            uploadType,
            itemId,
            itemIndex,

            imageSettings: {
                maxWidth: config.UPLOAD_MAX_WIDTH,
                maxHeight: config.UPLOAD_MAX_HEIGHT,
                type: imageType,
            },
            thumbSettings: {
                maxWidth: config.UPLOAD_THUMB_MAX_WIDTH,
                maxHeight: config.UPLOAD_THUMB_MAX_HEIGHT,
                type: imageType,
            },

            onUploading: () => {
                imageSrc = EmptyImage;
                fileIsUploading = true;
                hideCarousel();
            },
            onImageLoaded: (imageFile) => {
                imageSrc = URL.createObjectURL(imageFile);
            },
            onComplete: (imageUrl) => {
                image = imageUrl;
                fileIsUploading = false;
            },
            onError: (error) => {
                image = null;
                fileIsUploading = false;

                if (useLibrary) {
                    showCarousel();
                }

                if (error && error.invalidType) {
                    showPrompt(promptIds.INVALID_IMAGE_TYPE_JPG_PNG);
                } else if (error && error.imageFileSizeTooLarge) {
                    showPrompt(promptIds.INVALID_IMAGE_FILESIZE_TOO_LARGE);
                } else {
                    console.error('Could not request image upload');
                }
            },
        });
    }
</script>

<div class="imageSelectionBox {className}" class:opened="{carouselShown && useLibrary}" class:noLibrary="{!useLibrary}">
    {#if imageSrc}
        <div class="imageSelectionBoxImage" class:containMode="{containMode}" style="background-image: url({imageSrc})" class:carouselShown="{carouselShown}" on:click="{toggleCarousel}" alt="project header" />
        {#if carouselShown}
            <Button className="selectCancelButton" icon="{CancelIcon}" />
        {:else if fileIsUploading}
            <div class="uploadingIndicator">uploading image...</div>
        {/if}
    {/if}
        <div class="carouselContainer" class:hidden="{!carouselShown}">
            {#if useLibrary}
                <SearchBar bind:searchString={imageLibrarySearchString} />
                <ImageCarousel
                    images="{libraryImages}"
                    imageBasePath="{config.SITE_CONTENT_URL + config.headerImageLibraryThumbFolder}"
                    imageExtension="{config.headerImageExtension}"
                    bind:image="{image}"
                    searchString="{imageLibrarySearchString}"
                    {contextSearchString}
                    on:select="{selectImage}" />
            {/if}
            <Button className="uploadButton" onClick="{uploadHeaderImage}">
                <div class="uploadButtonIcon" style="background-image: url({UploadImageIcon})"/>
                <div class="buttonLabel">{locale.GENERAL.UPLOAD_IMAGE}</div>
            </Button>
        </div>
</div>

<style>
    .imageSelectionBox {
		width: 100%;
        padding-top: 59.6%;
		/* height: 245px; */

        position: relative;

    	background-color: #E3E3E3;

        border-top: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
    }

	.imageSelectionBox.opened {
		height: 245px;
		padding-top: 0;
		/* height: initial; */
		/* padding-top: 59.6%; */
	}

	.imageSelectionBox :global(.searchBar) {
        position: absolute;
        top: 102px;

        pointer-events: none;

        display: flex;
        justify-content: center;
	}
	.imageSelectionBox :global(.searchBarField) {
        /* margin: 18px 100px; */
        /* margin: 0 100px; */
        margin: 0;
        width: 200px;

        background-color: #ffffff;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.15);

        pointer-events: initial;
	}

    .hidden {
        display: none;
    }

    .imageSelectionBoxImage {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        /* object-fit: cover; */

    	background-size: cover;
        background-position: center;

        cursor: pointer;
    }
    .imageSelectionBoxImage.containMode {
		background-size: contain;
		background-repeat: no-repeat;
    }

    .carouselContainer {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;

        pointer-events: none;
    }

    .carouselShown {
        opacity: 0.2;
    }

    .imageSelectionBox :global(.imageCarousel) {
        position: absolute;
        top: 142px;
        /* top: 62px; */
        /* top: 78px; */
        left: 0;
        width: 100%;

        /* padding-top: 78px; */
        /* padding-top: 40px; */
    }

    .imageSelectionBox :global(.selectCancelButton) {
        position: absolute;
        right: 17px;
        top: 17px;
        width: 30px;
        height: 30px;
        padding-left: 5px;
        padding-top: 2px;
        box-sizing: border-box;

        pointer-events: none;
    }

    .imageSelectionBox :global(.uploadButton) {
        position: absolute;

        top: 13px;
        margin-left: -37.5px;
        width: 75px;
        height: 75px;

        background-color: #ffffff;
        border-radius: 999px;

        /* margin-left: -50px;
        width: 100px;
        height: 80px; */

        /* top: 11px; */
        /* top: 235px; */

        left: 50%;
        padding: 10px 0;
        box-sizing: border-box;

        pointer-events: all;
    }
    .imageSelectionBox.noLibrary :global(.uploadButton) {
        top: 50%;
        margin-top: -37.5px;
    }
    .imageSelectionBox :global(.uploadButton .buttonContent) {
        width: 100%;
        height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
        flex-direction: column;
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
        margin-top: -2px;
        /* margin-top: 2px; */
        /* margin-top: 5px; */

        font-size: 1.2rem;
        font-weight: 700;
        /* color: #222222; */
        color: #333333;
    }

    .uploadingIndicator {
        position: absolute;
        right: 10px;
        bottom: 10px;

        padding: 4px 12px;
        font-size: 1.3rem;

        background-color: #ffffffcc;
        border-radius: 999px;
    }
</style>
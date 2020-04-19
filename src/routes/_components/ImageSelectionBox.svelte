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
    import CancelIcon from "../../assets/icons/clear.png";

    import imageLibrary from '../../data/library/images/compiled/imageLibrary.json';
    // import imageLibrary from '../../data/library/images/_general.json';

    import { getHeaderImage } from '../../models/appModel';

    const libraryImages = shuffle(imageLibrary);

    export let image = null;

    export let contextSearchString = '';

    export let uploadType = 'project';

    let carouselShown = true;
    let imageLibrarySearchString = '';

    let uploadFileInput;

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

    let imageSrc = null;
    $: {
        if (!fileIsUploading) {
            imageSrc = getHeaderImage(image);
        }
    }
    // $: { imageSrc = get
    //     if (!fileIsUploading) {
    //         const contextIndex = image && image.indexOf(config.CONTENT_IDENTIFIER_PATH);
    //         if (contextIndex === 0) {
    //             const imagePath = image.substr(config.CONTENT_IDENTIFIER_PATH.length);
    //             imageSrc = config.USER_CONTENT_URL + imagePath;
    //         } else {
    //             imageSrc = (image && (config.contentUrl + config.headerImageLibraryFolder + image + config.headerImageExtension)) || null;
    //         }
    //     }
    // }

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
        imageSrc = (image && (config.contentUrl + config.headerImageLibraryFolder + image + config.headerImageExtension)) || null; //TODO: find better way

        await tick();
        hideCarousel();
    }

    function uploadImage() {
        uploadFileInput.click();
    }

    async function onUploadFileSelect(event) {
        if (event.target.files && event.target.files.length) {
            var file = event.target.files[0];
            var fileName = file.name;

            // alert('The file "' + fileName +  '" has been selected.');
            // console.log('onUploadFileSelect', fileName);

            fileIsUploading = true;
            image = fileName;

            carouselShown = false;

            imageSrc = EmptyImage; // force empty image to load first

            await tick();
            imageSrc = URL.createObjectURL(file);

            await tick();
            getSignedRequest(file);
        }
    }

    function getSignedRequest(file){
        const request = new XMLHttpRequest();

        const fileName = encodeURIComponent(file.name);
        const fileType = encodeURIComponent(file.type);

        request.open('GET', `/api/requestUpload?file-name=${fileName}&file-type=${fileType}&upload-type=${uploadType}`);

        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200){
                    const response = JSON.parse(request.responseText);
                    uploadFile(file, response.signedRequest, response.url);

                    image = response.url;
                } else {
                    console.error('Could not request image upload');

                    image = null;
                    fileIsUploading = false;
                    showCarousel();
                }
            }
        };
        request.send();
    }

    function uploadFile(file, signedRequest, url){
        const request = new XMLHttpRequest();
        request.open('PUT', signedRequest);
        request.onreadystatechange = () => {
            if (request.readyState === 4){
                if (request.status === 200){
                    image = url;
                } else {
                    image = null;
                    showCarousel();
                    console.error('Could not upload image');
                }
                fileIsUploading = false;
            }
        };
        request.send(file);
    }
</script>

<div class="imageSelectionBox" class:opened="{carouselShown}">
    {#if imageSrc}
        <div class="imageSelectionBoxImage" style="background-image: url({imageSrc})" class:carouselShown="{carouselShown}" on:click="{toggleCarousel}" alt="project header image" />
        {#if carouselShown}
            <Button className="selectCancelButton" icon="{CancelIcon}" />
        {:else if fileIsUploading}
            <div class="uploadingIndicator">uploading image...</div>
        {/if}
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
        <Button className="uploadButton" onClick="{uploadImage}">
            <div class="uploadButtonIcon" style="background-image: url({UploadImageIcon})"/>
            <div class="buttonLabel">{locale.GENERAL.UPLOAD_IMAGE}</div>
        </Button>
        <input bind:this="{uploadFileInput}" on:change="{onUploadFileSelect}" type="file" accept="image/*" hidden/>
    </div>
</div>

<style>
    .imageSelectionBox {
		width: 100%;
        padding-top: 59.6%;
		/* height: 245px; */

        position: relative;

    	background-color: #E3E3E3;
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

        cursor: pointer;
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
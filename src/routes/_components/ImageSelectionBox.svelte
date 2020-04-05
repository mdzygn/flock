<script>
    import locale from '../../locale';

    import Button from '../../components/Button.svelte';

    import UploadImageIcon from "../../assets/icons/upload_image.png";

    // export let image = null;

    function uploadImage() {

    }
</script>

<div class="imageSelectionBox">
    <Button className="uploadButton" onClick="{uploadImage}">
        <div class="uploadButtonIcon" style="background-image: url({UploadImageIcon})"/>
        <div class="buttonLabel">{locale.GENERAL.UPLOAD_IMAGE}</div>
    </Button>
</div>

<style>
    .imageSelectionBox {
		width: 100%;
		height: 220px;

        position: relative;

    	background-color: #E3E3E3;
    }

    .imageSelectionBox :global(.uploadButton) {
        position: absolute;
        top: 50%;
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
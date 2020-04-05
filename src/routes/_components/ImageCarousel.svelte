<script>
	import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import Button from '../../components/Button.svelte';

    export let images = null;

    export let image = null;

    export let imageBasePath = '';
    export let imageExtension = '.jpg';

    function selectImage(targetImage) {
        image = targetImage.imageId;
        dispatch('select');
    }
</script>

<div class="imageCarousel">
    <div class="imageContainer">
        {#each images as image}
            {#if !image.disabled}
                <Button className="imageItem" onClick="{() => { selectImage(image); } }" style="background-image: url({imageBasePath + image.imageId + imageExtension})"/>
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

        margin: 0 12px;

        width: 168px;
        height: 100px;
        /* width: 94px;
        height: 56px; */

        background-size: cover;
        border: 3px solid #ffffff;

        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.5);
    }
</style>
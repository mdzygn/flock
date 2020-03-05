<script>
    import { onMount, afterUpdate, tick } from 'svelte';

    export let anchorToBottom = false;

    let scrollRegion;

    onMount(async () => {
        if (anchorToBottom) {
            // TODO: not correctly getting values when screen is navigated to

            // console.log('onMount: ' + scrollRegion.scrollHeight);
			scrollRegion.scrollTo(0, scrollRegion.scrollHeight);
        }
    });
</script>

<div class="scrollView" bind:this="{scrollRegion}">
    <slot></slot>
</div>

<style>
    .scrollView {
        position: absolute;
        top: 0;
        bottom: 0;

        width: 100%;

        overflow: hidden;
        overflow-y: scroll;

        -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
    }

    .scrollView::-webkit-scrollbar {
        /* Hide scrollbar for Chrome, Safari and Opera */
        display: none;
    }
</style>
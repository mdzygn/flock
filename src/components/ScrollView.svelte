<script>
    import { onMount } from 'svelte';

    export let anchorToBottom = false;

    let scrollRegion;

    // let curScrollTop = 0;
    // let scrollInited = false;

    onMount(async () => {
        if (anchorToBottom) {

            // TODO: components don't remember properties

            // if (!scrollInited) {
            //     curScrollTop = scrollRegion.scrollHeight;
            //     console.log('init curScrollTop: ' + curScrollTop);
            //     scrollInited = true;
            // }

            // console.log('curScrollTop: ' + curScrollTop);

            // TODO: not correctly getting values when screen is navigated to

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
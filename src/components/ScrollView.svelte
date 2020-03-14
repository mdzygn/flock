<script>
    import { scrollRegionProperties, getScrollRegionProperties } from '../models/appState';

    import { onMount, onDestroy, tick } from 'svelte'; // afterUpdate

    export let anchorToBottom = false;

    export let id = null;
    let regionProps = null;
    $: {
        regionProps = getScrollRegionProperties(id);
    }

    let hasScrollHeader = $$props.$$slots.scrollHeader;

    let scrollRegion;

    function updateScroll() {
        regionProps.scrollTop = scrollRegion.scrollTop;
        // console.log('update scroll ' + regionProps.scrollTop);
    }

    let scrollUpdateInited = false;

    const updateScrollPosition = async () => {
        if (!regionProps) {
            return;
        }

        await tick();

        if (!regionProps || !scrollRegion) {
            return;
        }

        if (!regionProps.inited) {
            regionProps.inited = true;

            if (anchorToBottom) {
                // TODO: check scroll if region height changes (e.g. image load)
                regionProps.scrollTop = scrollRegion.scrollHeight;
            } else {
                regionProps.scrollTop = 0;
            }
        }
        // console.log(id + ' regionProps.scrollTop: ' + regionProps.scrollTop + ' ' + anchorToBottom);

        const curScrollRegion = scrollRegion;

        // delay incase full height not yet loaded
        // TODO: check scroll if region height changes (e.g. image load)
        setTimeout(() => {
            curScrollRegion.scrollTo(0, regionProps.scrollTop);
        }, 2);
        setTimeout(() => {
            curScrollRegion.scrollTo(0, regionProps.scrollTop);
        }, 10);
        setTimeout(() => {
            curScrollRegion.scrollTo(0, regionProps.scrollTop);
        }, 50);
        setTimeout(() => {
            curScrollRegion.scrollTo(0, regionProps.scrollTop);
        }, 100);

        // console.log('load scroll "' + id + '": ' + regionProps.scrollTop);

        scrollRegion.scrollTo(0, regionProps.scrollTop);

        scrollRegion.addEventListener('scroll', updateScroll);
    }

    onMount(updateScrollPosition);

    const scrollRegionResetUnsubscribe = scrollRegionProperties.subscribe(event => {
        if (scrollUpdateInited) {
            updateScrollPosition();
        } else {
            scrollUpdateInited = true;
        }
    });

	onDestroy(() => {
        scrollRegionResetUnsubscribe();
        if (scrollRegion) {
            scrollRegion.removeEventListener('scroll', updateScroll);
        }
    });

    // causes export 500 on index error
	// onDestroy(() => {
    //     scrollRegion.removeEventListener('scroll', updateScroll);
	// });
</script>

<div class="scrollView" bind:this="{scrollRegion}">
    <slot></slot>
</div>

{#if hasScrollHeader}
    <div class="scrollHeader">
        <slot name="scrollHeader"></slot>
    </div>
{/if}

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

    .scrollHeader {
        position: absolute;
    }

    .scrollView::-webkit-scrollbar {
        /* Hide scrollbar for Chrome, Safari and Opera */
        display: none;
    }
</style>
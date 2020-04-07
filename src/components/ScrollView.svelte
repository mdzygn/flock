<svelte:window bind:innerWidth="{windowWidth}" />

<script>
    import { scrollRegionProperties, getScrollRegionProperties } from '../models/appModel';

    import { onMount, onDestroy, tick } from 'svelte'; // afterUpdate

    export let anchorToBottom = false;
    export let headerStartHidden = false;
    export let headerResetOnShow = false;

    export let id = null;
    let regionProps = null;
    $: {
        regionProps = getScrollRegionProperties(id);
    }

    let hasScrollHeader = ($$props.$$slots && $$props.$$slots.scrollHeader) || false;

    let windowWidth;
    let minScrollContentHeight = 0;

    $: {
        //listen to window resize
        if (hasScrollHeader && scrollHeader && windowWidth) {
            scrollHeaderHeight = scrollHeader.offsetHeight;
        }
        minScrollContentHeight = (scrollRegion && scrollRegion.offsetHeight) || 0;
    }

    let scrollRegion;
    let curScrollHeaderPosition = 0;
    let scrollHeaderOffset = 0;
    let scrollHeader;
    let scrollHeaderHeight = 0;

    function updateScroll() {
        if (!regionProps || !scrollRegion) {
            return;
        }

        regionProps.scrollTop = scrollRegion.scrollTop;

        if (hasScrollHeader && scrollHeader) {
            scrollHeaderHeight = scrollHeader.offsetHeight;
            curScrollHeaderPosition = Math.min(regionProps.scrollTop, Math.max(regionProps.scrollTop - scrollHeaderHeight, curScrollHeaderPosition));
            scrollHeaderOffset = curScrollHeaderPosition - regionProps.scrollTop;

            // console.log('curScrollHeaderPosition: ' + curScrollHeaderPosition + ', scrollHeaderOffset: ' + scrollHeaderOffset);
        }
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
            updateHeaderScrollPosition(true);
        }
        // console.log(id + ' regionProps.scrollTop: ' + regionProps.scrollTop + ' ' + anchorToBottom);

        const curScrollRegion = scrollRegion;

        // delay incase full height not yet loaded
        // TODO: check scroll if region height changes (e.g. image load)
        setTimeout(() => {
            if (regionProps) {
                curScrollRegion.scrollTo(0, regionProps.scrollTop);
                updateHeaderScrollPosition();
            }
        }, 2);
        setTimeout(() => {
            if (regionProps) {
                curScrollRegion.scrollTo(0, regionProps.scrollTop);
                if (hasScrollHeader && scrollHeader) {
                    scrollHeaderHeight = scrollHeader.offsetHeight;
                }
                updateHeaderScrollPosition();
            }
        }, 10);
        setTimeout(() => {
            if (regionProps) {
                curScrollRegion.scrollTo(0, regionProps.scrollTop);
                updateHeaderScrollPosition();
            }
        }, 50);
        setTimeout(() => {
            if (regionProps) {
                curScrollRegion.scrollTo(0, regionProps.scrollTop);
                if (hasScrollHeader && scrollHeader) {
                    scrollHeaderHeight = scrollHeader.offsetHeight;
                }
                updateHeaderScrollPosition();
            }
        }, 100);

        // console.log('load scroll "' + id + '": ' + regionProps.scrollTop);

        updateHeaderScrollPosition();

        scrollRegion.scrollTo(0, regionProps.scrollTop);
    }

    function updateHeaderScrollPosition(allowHeaderPositionReset) {
        if (hasScrollHeader && scrollHeader) {
            scrollHeaderHeight = scrollHeader.offsetHeight;

            if (headerResetOnShow) {
                curScrollHeaderPosition = regionProps.scrollTop;
            } else {
                if (allowHeaderPositionReset) {
                    if (headerStartHidden && !anchorToBottom) {
                        if (regionProps.scrollTop < 30) {
                            regionProps.scrollTop = scrollHeaderHeight;
                        }
                        curScrollHeaderPosition = (curScrollHeaderPosition - regionProps.scrollTop) - scrollHeaderHeight;
                        curScrollHeaderPosition = Math.min(regionProps.scrollTop, Math.max(regionProps.scrollTop - scrollHeaderHeight, curScrollHeaderPosition));
                        // console.log('regionProps.scrollTop: ' + regionProps.scrollTop + ' curScrollHeaderPosition: ' + curScrollHeaderPosition);
                        scrollRegion.scrollTo(0, regionProps.scrollTop);
                    } else {
                        curScrollHeaderPosition = regionProps.scrollTop;
                    }
                }
            }

            scrollHeaderOffset = curScrollHeaderPosition - regionProps.scrollTop;
            // console.log('scrollHeaderOffset: ' + scrollHeaderOffset);
        }
    }

    onMount(() => {
        scrollRegion.addEventListener('scroll', updateScroll);
        updateScrollPosition();
    });

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


{#if hasScrollHeader}
    <div class="content">
        <div class="scrollView" bind:this="{scrollRegion}" style="padding-top: {scrollHeaderHeight}px">
            <div class="scrollContent" style="min-height: {minScrollContentHeight}px">
                <slot></slot>
            </div>
        </div>
        <div class="scrollHeader" style="top: {scrollHeaderOffset}px" bind:this="{scrollHeader}">
            <slot name="scrollHeader"></slot>
        </div>
    </div>
{:else}
    <div class="scrollView" bind:this="{scrollRegion}">
        <div class="scrollContent" style="min-height: {minScrollContentHeight}px">
            <slot></slot>
        </div>
    </div>
{/if}

<style>
    .content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .scrollView {
        position: absolute;
        top: 0;
        bottom: 0;

        width: 100%;

        overflow: hidden;
        overflow-y: scroll;

        -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
    }
    .scrollView::-webkit-scrollbar { /* Hide scrollbar for Chrome, Safari and Opera */
        display: none;
    }

    .scrollHeader {
        position: absolute;
        width: 100%;

        box-shadow: 0 2px 3px 0 rgba(0,0,0,0.1);
    }

</style>
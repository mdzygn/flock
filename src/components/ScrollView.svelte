<svelte:window bind:innerWidth="{windowWidth}" />

<script>
    import { scrollRegionProperties, getScrollRegionProperties } from '../models/appModel';

    import { onMount, onDestroy, tick } from 'svelte'; // afterUpdate

    export let anchorToBottom = false;
    export let headerStartHidden = false;
    export let headerHideOffset = 0;
    export let headerResetOnShow = false;
    export let hideHeaderShadowAtTop = false
    export let headerHiddenOffset = 0;
    export let hideShadowMargin = 1;
    export let topOffset = 0;
    export let bottomOffset = 0;
    export let disabledMinHeight = false;
    export let onScroll = null;

    export let className = '';

    export let showScrollHeader = true;

    export let id = null;
    let regionProps = null;
    $: {
        regionProps = getScrollRegionProperties(id);
    }

    $: minHeightStyle = (minScrollContentHeight && !disabledMinHeight) ? 'min-height: ' + minScrollContentHeight + 'px' : '';

    let hasScrollHeader = ($$props.$$slots && $$props.$$slots.scrollHeader) || false;

    // $: console.log('hasScrollHeader', hasScrollHeader, 'showScrollHeader', showScrollHeader, '$$props.$$slots', $$props.$$slots, '$$props.$$slots.scrollHeader', $$props.$$slots.scrollHeader);

    let windowWidth;
    let minScrollContentHeight = 0;

    $: {
        //listen to window resize
        if (hasScrollHeader && scrollHeader && windowWidth) {
            scrollHeaderHeight = scrollHeader.offsetHeight;
        }

        const headerHideAmount = headerHideOffset; // headerHiddenOffset ? headerHiddenOffset : headerHideOffset;
        minScrollContentHeight = (scrollRegion && scrollRegion.offsetHeight && scrollRegion.offsetHeight + headerHideAmount) || 0;
    }

    export let scrollRegion = null;
    let curScrollHeaderPosition = 0;
    let scrollHeaderOffset = 0;
    let scrollHeader;
    let scrollHeaderHeight = 0;

    let shadowHidden = false;

    function updateScroll() {
        if (!regionProps || !scrollRegion) {
            return;
        }

        regionProps.scrollTop = scrollRegion.scrollTop;

        // if (headerStartHidden && !anchorToBottom) {
        //     regionProps.scrollTop = Math.max(regionProps.scrollTop, scrollHeaderHeight);
        // }

        if (hasScrollHeader && scrollHeader && showScrollHeader) {
            scrollHeaderHeight = scrollHeader.offsetHeight;
            curScrollHeaderPosition = Math.min(regionProps.scrollTop, Math.max(regionProps.scrollTop - scrollHeaderHeight, curScrollHeaderPosition));
            scrollHeaderOffset = curScrollHeaderPosition - regionProps.scrollTop;

            // console.log('curScrollHeaderPosition: ' + curScrollHeaderPosition + ', scrollHeaderOffset: ' + scrollHeaderOffset);
        }

        if (onScroll) {
            onScroll();
        }
    }

    $: {
        curScrollHeaderPosition;

        if (hideHeaderShadowAtTop) {
            if (regionProps.scrollTop <= hideShadowMargin) {
                shadowHidden = true;
            } else {
                shadowHidden = false;
            }
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

            if (headerResetOnShow && !headerStartHidden) {
                curScrollHeaderPosition = regionProps.scrollTop;
            } else {
                if (allowHeaderPositionReset) {
                    if (headerStartHidden && !anchorToBottom) {
                        const headerHideAmount = headerHiddenOffset ? headerHiddenOffset : scrollHeaderHeight;
                        if (regionProps.scrollTop < 30) {
                            regionProps.scrollTop = headerHideAmount;
                        }
                        curScrollHeaderPosition = (curScrollHeaderPosition - regionProps.scrollTop) - headerHideAmount;
                        curScrollHeaderPosition = Math.min(regionProps.scrollTop, Math.max(regionProps.scrollTop - headerHideAmount, curScrollHeaderPosition));
                        // console.log('regionProps.scrollTop: ' + regionProps.scrollTop + ' curScrollHeaderPosition: ' + curScrollHeaderPosition);
                        if (headerHideOffset) {
                            regionProps.scrollTop += headerHideOffset;
                        }
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

    const scrollRegionResetUnsubscribe = scrollRegionProperties.subscribe(event => {
        if (scrollUpdateInited) {
            updateScrollPosition();
        } else {
            scrollUpdateInited = true;
        }
    });

    onMount(() => {
        scrollRegion.addEventListener('scroll', updateScroll);
        updateScrollPosition();
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
    <div class="content {className}">
        <div class="scrollView" bind:this="{scrollRegion}" style="bottom: {bottomOffset}px; padding-top: {showScrollHeader ? scrollHeaderHeight : topOffset}px">
            <div class="scrollContent" style="{minHeightStyle}">
                <slot></slot>
            </div>
        </div>
        <div class="scrollHeader" class:hidden="{!showScrollHeader}" class:shadowHidden="{shadowHidden}" style="top: {scrollHeaderOffset}px" bind:this="{scrollHeader}">
            <slot name="scrollHeader"></slot>
        </div>
    </div>
{:else}
    <div class="scrollView {className}" bind:this="{scrollRegion}" style="bottom: {bottomOffset}px; padding-top: {topOffset}px">
        <div class="scrollContent" style="{minHeightStyle}">
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

        /* transition-property: box-shadow;
        transition-duration: 0.33s; */
    }

    .scrollHeader.hidden { 
        display: none;
    }

    .scrollHeader.shadowHidden {
        box-shadow: initial;
    }

</style>
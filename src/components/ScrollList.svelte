<script>
    import Button from './Button.svelte';

    import ScrollLeftIcon from "../assets/icons/scroll_left.png";
    import ScrollRightIcon from "../assets/icons/scroll_right.png";

    export let showArrows = true;

    let scrollRegion;

    const SCROLL_FOCUS_MARGIN = 10;
    const SCROLL_FOCUS_OFFSET = 40;

    export function scrollToSelectedItem() {
        if (scrollRegion) { //  && !selectingItem
            const selectedElementArray = scrollRegion.getElementsByClassName('selectedItem');
            const selectedElement = selectedElementArray && selectedElementArray.length ? selectedElementArray[0] : null;
            if (selectedElement) {
                const selectedElementLeft = selectedElement.offsetLeft;
                const selectedElementRight = selectedElement.offsetLeft + selectedElement.offsetWidth;
                const scrollRegionWidth = scrollRegion.offsetWidth;
                const scrollRegionLeft = scrollRegion.scrollLeft;
                const scrollRegionRight = scrollRegion.scrollLeft + scrollRegionWidth;

                if (selectedElementRight < scrollRegionWidth - SCROLL_FOCUS_MARGIN) {
                    scrollRegion.scrollTo(0, 0);
                } else if (selectedElementRight > scrollRegionRight - SCROLL_FOCUS_MARGIN
                || selectedElementLeft < scrollRegionLeft + SCROLL_FOCUS_MARGIN) {
                    const offsetX = selectedElement.offsetLeft - SCROLL_FOCUS_OFFSET;
                    scrollRegion.scrollTo(offsetX, 0);
                }
            }
        }
    }
</script>

<div class="content">
    <div class="scrollRegion" bind:this="{scrollRegion}">
        <slot></slot>
    </div>
    {#if showArrows}
        <div class="scrollIndicatorLeft">
            <div class="fadeBgLeft fadeBg"></div>
            <Button className="scrollLeftArrow arrowButton" icon="{ScrollLeftIcon}"></Button>
        </div>
        <div class="scrollIndicatorRight">
            <div class="fadeBgRight fadeBg"></div>
            <Button className="scrollRightArrow arrowButton" icon="{ScrollRightIcon}"></Button>
        </div>
    {/if}
</div>

<style>
    .content {
        position: relative;
    }

    .scrollRegion {
        overflow-x: scroll;
        overflow-y: hidden;
        -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
        white-space: nowrap;
	}
	.scrollRegion::-webkit-scrollbar { /* Hide scrollbar for Chrome, Safari and Opera */
        display: none;
    }

    .scrollIndicatorLeft, .scrollIndicatorRight {
        position: absolute;
        top: -6px;
    }
    .scrollIndicatorLeft {
        left: 0;
    }
    .scrollIndicatorRight {
        right: 0;
    }

    .content :global(.arrowButton) {
        position: absolute;
        /* top: -6px; */
        opacity: 0.7;

        width: 11px;
        padding: 5px;
        height: 25px;
    }
    .content :global(.arrowButton .icon) {
        transform: scale(0.3, 0.3);
    }
    .content :global(.scrollLeftArrow) {
        left: 0;
    }
    .content :global(.scrollRightArrow) {
        right: 0;
    }

    .content :global(.fadeBg) {
        position: absolute;
        /* top: -6px; */

        width: 24px;
        height: 38px;
        pointer-events: none;
    }
    .content :global(.fadeBgLeft) {
        left: 0;

        background-image: linear-gradient(to right, rgba(255,255,255,1) 62%, rgba(255,255,255,0));
    }
    .content :global(.fadeBgRight) {
        right: 0;

        background-image: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1) 28%);
    }
</style>
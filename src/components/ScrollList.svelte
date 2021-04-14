<script>
    // import Button from './components/Button.svelte';

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


<div class="scrollRegion" bind:this="{scrollRegion}">
    <slot></slot>
</div>

<style>
    .scrollRegion {
        overflow-x: scroll;
        overflow-y: hidden;
        -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
        white-space: nowrap;
	}
	.scrollRegion::-webkit-scrollbar { /* Hide scrollbar for Chrome, Safari and Opera */
        display: none;
    }
</style>
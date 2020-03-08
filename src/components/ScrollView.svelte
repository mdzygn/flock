<script context="module">
    const _regionProps = [];

    function getRegionProperty(id) {
        if (!id) {
            return null;
        }
        if (!_regionProps[id]) {
            _regionProps[id] = {
                scrollTop: 0,
            };
        }
        return _regionProps[id];
    }
</script>

<script>
	import { stores } from '@sapper/app';
	const { page } = stores();

    import { onMount, onDestroy, afterUpdate, tick } from 'svelte';

    export let anchorToBottom = false;

    export let id = null;
    $: regionProps = getRegionProperty(id);

    let scrollRegion;

    function updateScroll() {
        regionProps.scrollTop = scrollRegion.scrollTop;
        console.log('update scroll ' + regionProps.scrollTop);
    }

    onMount(async () => {
        if (!regionProps) {
            return;
        }

        // if ($page.query.rs !== undefined) {
        //     regionProps.inited = false;
        //     console.log('reset scroll');
        // } else {
        //     scrollRegion.scrollTo(0, regionProps.scrollTop);
        // }

        // scrollRegion.scrollTo(0, regionProps.scrollTop);

        await tick();

        if (!regionProps.inited) {
            regionProps.inited = true;

            if (anchorToBottom) {
                // TODO: check scroll if region height changes (e.g. image load)
                regionProps.scrollTop = scrollRegion.scrollHeight;
                // console.log('init scrollTop: ' + regionProps.scrollTop);
            } else {
                regionProps.scrollTop = 0;
            }
        }

        const curScrollRegion = scrollRegion;

        // delay incase full height not yet loaded
        // TODO: check scroll if region height changes (e.g. image load)
        setTimeout(() => {
            curScrollRegion.scrollTo(0, regionProps.scrollTop);
        }, 10);
        setTimeout(() => {
            curScrollRegion.scrollTo(0, regionProps.scrollTop);
        }, 50);
        setTimeout(() => {
            curScrollRegion.scrollTo(0, regionProps.scrollTop);
        }, 100);

        console.log('load scroll "' + id + '": ' + regionProps.scrollTop);

        scrollRegion.scrollTo(0, regionProps.scrollTop);

        scrollRegion.addEventListener('scroll', updateScroll);
    });

	onDestroy(() => {
        scrollRegion.removeEventListener('scroll', updateScroll);
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
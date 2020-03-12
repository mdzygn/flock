<script>
	import { DEBUG } from '../config';

	export let href = null;
	export let onClick = null;
	export let style = null;

	// $: { // can be a string and will still work?
	// 	if (DEBUG && onClick && typeof onClick !== 'function') {
	// 		console.error('onClick property not a function: "' + onClick + '" type: ' + typeof onClick);
	// 	}
	// }
</script>

{#if href}
	<a {href} on:click={onClick} class="hotspot" {style}>&nbsp;</a>
{:else}
	<div on:click={onClick} class="hotspot" class:button={onClick} {style} />
{/if}

<style>
	.hotspot {
        position: absolute;

        text-decoration: none;
        line-height: 0;

        /* background-color: rgba(255, 0, 0, 0.2); */
	}

	.button {
		cursor: pointer;
	}
</style>
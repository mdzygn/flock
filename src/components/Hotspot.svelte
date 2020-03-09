<script>
	import { DEBUG } from '../config';

	export let href = null;
	export let onClick = null;
	export let style = null;

	$: {
		if (DEBUG && onClick && typeof onClick !== 'function') {
			console.error('onClick property not a function: "' + onClick + '"');
		}
	}
</script>

{#if href}
	<a {href} on:click={onClick} {style}>&nbsp;</a>
{:else}
	<div on:click={onClick} class:button={onClick} {style} />
{/if}

<style>
	.button {
		cursor: pointer;
	}
</style>
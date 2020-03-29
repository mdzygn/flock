<script>
	import { curMenu, curPrompt } from '../../models/appModel';

	import OverlayMenu from './OverlayMenu.svelte';

	import { closeOverlay } from '../../actions/appActions';
</script>

{#if $curMenu || $curPrompt}
	<div class="overlayContainer">
		<div class="overlayBg" on:click="{closeOverlay}" />
		{#if $curMenu}
			<OverlayMenu menuId="{$curMenu}" />
		{:else}
			<OverlayMenu menuId="{$curPrompt}" />
		{/if}
	</div>
{/if}

<style>
	.overlayContainer {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 100;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.overlayContainer :global(.overlayMenu) {
		z-index: 101;
	}
	.overlayContainer :global(.overlayPrompt) {
		z-index: 102;
	}

	.overlayBg {
		position: absolute;
		background: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;

		cursor: pointer;
	}
</style>
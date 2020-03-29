<script>
	import { curOverlay } from '../../models/appModel';

	import { closeOverlay } from '../../actions/appActions';
</script>

{#if $curOverlay}
	<div class="overlayContainer" on:click="{closeOverlay}">
		<div class="overlayBg" />
	</div>
{/if}

<style>
	.overlayContainer {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 999;
	}

	.overlayBg {
		position: absolute;
		background: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
	}
</style>
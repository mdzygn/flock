<script>
	import Button from '../../components/Button.svelte';

	export let label = '';
	export let selectedLabel = null;

	export let action = null;
	export let icon = null;
	export let selectedIcon = null;

	export let targetItem = null;
	export let targetItemId = null;
	export let targetItemProperty = null;

	export let countProperty = null;

	export let style = null;
	export let buttonContentStyle = null;
	export let iconStyle = null;

	$: isSelected = targetItem && targetItem[targetItemProperty];
</script>

<div class="actionButton">
	<Button
		icon="{targetItem && targetItemProperty && targetItem[targetItemProperty] ? selectedIcon : icon}"
		onClick="{action ? (e => action(targetItemId)) : null}"
		className="{countProperty ? 'buttonContentWithCount' : (icon ? 'buttonContentWithIcon' : null)}"
		{buttonContentStyle}
		style="{style}" iconStyle="{iconStyle}"
	>
		{#if selectedLabel}
			<span style="visibility: {isSelected ? 'hidden' : 'visible'}">{label}</span><div class="selectedLabelContainer"><span class="selectedLabel" style="visibility: {isSelected ? 'visible' : 'hidden'}">{selectedLabel}</span></div>{:else}
		{label}{/if}{#if countProperty && targetItem}<div class="countContainer">
				<div class="count">{targetItem[countProperty]}</div>
			</div>
		{/if}
	</Button>
</div>

<style>
	.actionButton {
		/* width: 33%;
		display: flex;
		justify-content: center;
		align-items: center; */

		width: 100%;
		height: 100%;

		font-size: 1.3rem;
	}

	.actionButton :global(.button) {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.actionButton :global(.buttonContent) {
    	padding-bottom: 1px;
	}
	.actionButton :global(.buttonContentWithCount .buttonContent) {
    	padding-bottom: 1px;
    	padding-right: 56px;
	}
	.actionButton :global(.buttonContentWithIcon .buttonContent) {
    	padding-bottom: 1px;
    	padding-right: 37px;
	}

	.actionButton :global(.icon) {
    	padding-left: 20px;
	}

	.selectedLabelContainer {
		display: inline-block;
		position: relative;
		vertical-align: bottom;
	}
	.selectedLabel {
		position: absolute;
		right: 0;
    	bottom: 0;
	}

	.countContainer {
		vertical-align: bottom;
		display: inline-block;
		position: relative;
	}

	.count {
		position: absolute;
		left: 44px;
		bottom: 1px;

		font-weight: 700;
    	font-size: 1.1rem;
		color: #777777;
	}
</style>
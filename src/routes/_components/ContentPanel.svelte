<script>
    import locale from '../../locale';
    import Button from '../../components/Button.svelte';

    import EditIcon from "../../assets/icons/edit.png";

    export let title = null;
    export let showEdit = false;

    // export let editButtonAction = null;
    export let showMoreAction = null;
    export let editAction = null;

    export let titleOnClick = null;

    export let hideShowMoreWithVisibility = false;
    export let forceShowMoreShow = false;
    export let showMoreLabel = null;

    $: curShowMoreLabel = showMoreLabel || locale.GENERAL.SHOW_MORE;//show more
</script>

<div class="contentPanel">
    {#if title}
        {#if titleOnClick}
            <Button className="panelTitle" onClick="{titleOnClick}">{title}</Button>
        {:else}
            <div class="panelTitle">{title}</div>
        {/if}
    {/if}
    {#if showEdit}
        <Button className="editButton" icon="{EditIcon}" disabled="{!editAction}" onClick="{editAction}" />
    {/if}
    <div class="panelContent">
        <slot></slot>
    </div>
    {#if showMoreAction || hideShowMoreWithVisibility || forceShowMoreShow}
        <Button className="showMoreButton {hideShowMoreWithVisibility && !showMoreAction && !forceShowMoreShow ? 'hidden' : ''}" onClick="{showMoreAction && showMoreAction !== true ? showMoreAction : null}" disabled="{!showMoreAction || showMoreAction === true}">{curShowMoreLabel}</Button>
    {/if}
    <slot name="afterShowMore"></slot>
</div>

<style>
	.contentPanel {
        position: relative;
		margin-bottom: 10px;
        padding: 20px;

        background-color: #ffffff;
	}

    .contentPanel :global(.hidden) {
        visibility: hidden;
    }

    .contentPanel :global(.panelTitle) {
        display: block;
        
        font-size: 1.5rem;
        font-weight: 700;
        color: #444444;

        margin-top: -2px;
        padding-bottom: 15px;
	}

    .contentPanel :global(.editButton) {
		position: absolute;

        top: 5px;
        right: 10px;

		width: 28px;
		height: 26px;
		padding: 8px;
	}

	.contentPanel :global(.showMoreButton) {
		display: table;

		padding: 10px;
        padding-right: 30px;

        margin-top: 8px;
        margin-left: -10px;
        margin-bottom: -14px;

		font-size: 1.3rem;
		font-weight: 700;
	}
</style>
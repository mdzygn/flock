<script>
    import Button from '../../components/Button.svelte';

    import EditIcon from "../../assets/icons/edit.png";

    export let title = null;
    export let showEdit = false;

    // export let editButtonAction = null;
    export let showMoreAction = null;
</script>

<div class="contentPanel">
    {#if title}
        <div class="panelTitle">{title}</div>
    {/if}
    {#if showEdit}
        <Button className="editButton" icon="{EditIcon}" disabled="{true}" />
    {/if}
    <div class="panelContent">
        <slot></slot>
    </div>
    {#if showMoreAction}
        <Button className="showMoreButton" onClick="{showMoreAction && showMoreAction !== true}" disabled="{!showMoreAction || showMoreAction === true}">show more</Button>
    {/if}
</div>

<style>
	.contentPanel {
        position: relative;
		margin-bottom: 10px;
        padding: 20px;

        background-color: #ffffff;
	}

    .panelContent {

    }

	.panelTitle {
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
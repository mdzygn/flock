<script>
    import Button from '../../components/Button.svelte';

    import ArchiveBarBg from "../../assets/icons/archiveBarBg.png";

    export let onClick = null;

    function unarchive() {
        if (onClick) {
            onClick();
        }
    }
</script>

<div class="archiveBar" style="background-image: url({ArchiveBarBg})">
	<div class="label">this project has been archived</div>
    {#if onClick}
        <Button className="unarchiveButton" onClick="{unarchive}">Unarchive</Button>
    {/if}
</div>

<style>
	.archiveBar {
		height: 52px;

        padding: 14px 20px;
        box-sizing: border-box;

        box-sizing: border-box;

        background-color: #dddddd;
        background-size: 30px 30px;
	}

	.label {
        font-size: 1.5rem;
        font-weight: 700;
        color: #888888;
	}

	.archiveBar :global(.unarchiveButton) {
        position: absolute;
        top: 0;
        right: 0;

        font-size: 1.5rem;
        font-weight: 700;

        padding: 14px 20px;
	}
</style>
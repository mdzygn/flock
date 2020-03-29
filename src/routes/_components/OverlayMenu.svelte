<script>
    import OverlayMenuItem from './OverlayMenuItem.svelte';

    export let menuId;

    import menus from '../../config/menus';

    const conditions = {
        isPublic: false,
        isArchived: false,
    };

    const menuItems = [
        {
            label: 'Copy Link',
            action: 'projectCopyLink',
            disabled: true,
        },
        {
            label: 'Edit Project...',
            action: 'editProject',
            condition: '!isArchived',
        },
        {
            label: 'Make Private',
            action: 'makePrivate',
            condition: 'isPublic',
        },
        // {
        //     label: 'Make Public',
        //     action: 'makePublic',
        //     condition: '!isPublic && !isArchived',
        // },
        {
            label: 'Achive Project',
            action: 'archiveProject',
            condition: '!isArchived',
        },
        // {
        //     label: 'Unarchive Project',
        //     action: 'unarchiveProject',
        //     condition: 'isArchived',
        // },
    ]
</script>

<div class="overlayMenu">
    {#each menuItems as menuItem}
        <OverlayMenuItem {menuItem} />
    {/each}
</div>

<style>
	.overlayMenu {
        display: inline-block;

        padding: 6px 0;
        min-width: 171px;

        background-color: #ffffff;
        border-radius: 5px;
        overflow: hidden;
	}
</style>
<script>
    import OverlayMenuItem from './OverlayMenuItem.svelte';

	import { closeOverlay } from '../../actions/appActions';

    export let menuId;

    import { menus } from '../../config/menus';

    const conditions = {
        isPublic: false,
        isArchived: false,
        isFollowing: false,
    };

    $: menu = menus[menuId];
    $: menuItems = (menu && menu.menuItems) || null;

    $: console.log(menuId, menu);

    function selectMenuItem(event) {
        const menuItem = event.detail && event.detail.menuItem;
        const action = menuItem && menuItem.action;

        if (action) {
            action();
            closeOverlay();
        }
    }
</script>

<div class="overlayMenu">
    {#each menuItems as menuItem}
        <OverlayMenuItem {menuItem} on:select="{selectMenuItem}" />
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
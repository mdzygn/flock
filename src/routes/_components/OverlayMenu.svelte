<script>
    import OverlayMenuItem from './OverlayMenuItem.svelte';

	import { closeOverlay } from '../../actions/appActions';

    export let menuId;
    export let targetItem = null;

    import { menus, menuIds } from '../../config/menus';

    $: menu = menus[menuId];
    $: menuItems = (menu && menu.menuItems) || null;

    function selectMenuItem(event) {
        const menuItem = event.detail && event.detail.menuItem;
        const action = menuItem && menuItem.action;

        closeOverlay(); // ensure doing first in case opening new menu
        if (action) {
            action(targetItem);
        }
    }
</script>

<div class="overlayMenu">
    {#each menuItems as menuItem}
        {#if !menuItem.condition || menuItem.condition(targetItem)}
            <OverlayMenuItem {menuItem} on:select="{selectMenuItem}" />
        {/if}
    {/each}
</div>

<style>
	.overlayMenu {
        display: inline-block;

        padding: 6px 0;
        min-width: 230px;

        background-color: #ffffff;
        border-radius: 5px;
        overflow: hidden;
	}
</style>
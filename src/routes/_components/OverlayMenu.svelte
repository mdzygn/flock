<script>
    import OverlayMenuItem from './OverlayMenuItem.svelte';

	import { closeOverlay } from '../../actions/appActions';

    export let menuId;

    import { menus, menuIds } from '../../config/menus';

    // let conditions = null;
    // $: {
    //     switch (menu)
    //         case menuIds.PROJECT_OWNER_MENU:
    //         case menuIds.PROJECT_MENU:
    //             conditions = {
    //                 projectIsPublic: false,
    //                 projectIsArchived: false,
    //                 projectIsFollowing: false,
    //             };
    //             break;
    // }

    $: menu = menus[menuId];
    $: menuItems = (menu && menu.menuItems) || null;

    function selectMenuItem(event) {
        const menuItem = event.detail && event.detail.menuItem;
        const action = menuItem && menuItem.action;

        if (action) {
            action();
            closeOverlay();
        }
    }

    // function conditionMet(condition) {
    //     if (conditions) {
    //         const conditionExpression = 'result = ('+conditionExpression+');';

    //         var conditionFunction = function(variables) {
    //             var result = false;

    //             for (var prop in variables) {
    //                 if (!prop.match(/[^\a-zA-Z\-\_]/g)) { // doesn't contain invalid chars
    //                     var variableValue = variables[prop];
    //                     if (typeof variableValue === 'object') {
    //                         variableValue = JSON.stringify(variableValue);
    //                     }

    //                     if (typeof variableValue === 'string') {
    //                         contextString += 'var ' + prop + ' = "' + variableValue + '"; ';
    //                     } else {
    //                         contextString += 'var ' + prop + ' = ' + variableValue + '; ';
    //                     }
    //                 }
    //             }

    //             const fullEvaluationExpression = contextString+comparsionExpression;
    //             try {
    //                 eval(fullEvaluationExpression);
    //             } catch (error) {
    //                 console.error('conditional expression failed: "'+ expression +'". ' , error , fullEvaluationExpression);
    //             }
    //             return result;
    //         };
    //         var comparisonResult = conditionFunction.apply(this, [conditions]);
    //         return comparisonResult;
    //     }
    //     return true;
    // }
</script>

<div class="overlayMenu">
    {#each menuItems as menuItem}
        {#if !menuItem.condition || menuItem.condition()}
            <OverlayMenuItem {menuItem} on:select="{selectMenuItem}" />
        {/if}
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
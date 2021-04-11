<script>
	import locale from '../../locale';

    import ContentPanel from './ContentPanel.svelte';

    import TeamMemberItem from './TeamMemberItem.svelte';

	import AddIcon from "../../assets/icons/add.png";

	import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

    import Button from '../../components/Button.svelte';

    import { getUser } from '../../models/usersModel';

    import { loadProfile } from '../../actions/appActions';

    import promptIds from '../../config/promptIds';

    import {
        showPrompt,
    } from '../../actions/appActions';

    import {
        getIsProjectTeamMember,
        showBetaFeatures,
        user,
    } from '../../models/appModel';

    import {
        loadUsers,
    } from '../../models/usersModel';

    export let users = null;

    export let label = locale.TEAM.TITLE;
    export let andOthersLabel = 'and others';

    const MAX_USERS_DISPLAYED = 1;

    $: {
        if (users && users.length) {
            loadUsers( { ids: users } );
        }
    }

    $: areMoreItems = users && users.length > MAX_USERS_DISPLAYED;

    // function addTeamMembers() {
	// 	showPrompt(promptIds.ADD_TEAM_MEMBERS);
    // }

    // function onEditTeamMembers() {
	// 	showPrompt(promptIds.REMOVE_TEAM_MEMBERS);
    // }
</script>

{#if users && users.length}
    <div class="content">
        {#if label}
            <div class="label headerLabel">{label}</div>
        {/if}
        <div class="usersList">
            {#each users as user, index}
                {#if index < MAX_USERS_DISPLAYED}
                    <TeamMemberItem user="{getUser(user)}" />
                {/if}
            {/each}
        </div>
        {#if areMoreItems && andOthersLabel}
            <div class="label andOthersLabel">{andOthersLabel}</div>
        {/if}
    </div>
{/if}

<style>
    .content {
        padding-bottom: 2px;
    }
    .label {
        display: inline-block;
        padding-right: 2px;

        font-size: 1.3rem;
    }
    .headerLabel {
        padding-top: 1px;
        font-size: 1.2rem;
        /* padding-bottom: 4px;
        font-size: 1.3rem;
        font-weight: 700; */
        display: block;
    }
    .usersList {
        display: inline-block;
    }

	.content :global(.contentItem) {
		width: 100%;

		margin-bottom: 10px;
	}

	.content :global(.contentPanel) {
        /* background-color: initial; */
        padding: 20px 0;
        padding-top: 12px;
	}

	.content :global(.contentPanel .panelTitle) {
        padding-left: 20px;
        padding-bottom: 10px;
	}
	.content :global(.contentPanel .showMoreButton ) {
        padding-left: 30px;
        margin-top: -6px;
	}
	.content :global(.contentPanel .editButton ) {
        top: 8px;
        right: 5px;
	}

	.content :global(.panelContent) {
        padding: 0;
	}

    /* .scrollRegion {
        white-space: nowrap;

        overflow-x: scroll;
        overflow-y: hidden;

        padding: 0 20px;

        -ms-overflow-style: none;
    }
	.scrollRegion::-webkit-scrollbar {
        display: none;
    }*/

    .content :global(.addTeamMembersButton) {
        position: absolute;
        top: 8px;
        right: 7px;
        padding: 10px;
        padding-right: 40px;
        padding-left: 10px;

        /* float: right;
        margin-right: 40px;
        margin-top: 1px; */

        font-size: 1.3rem;
        font-weight: 700;

        color: #0D0D0D;
    }

    .content :global(.addTeamMembersButton.canRemove) {
        right: 46px;
    }

    .content :global(.addTeamMembersButton .icon) {
        margin-top: -2px;
        padding-left: 12px;
    }
    

    .content :global(.teamMemberItem) {
        padding-top: 0;
        height: initial;
    }
    .content :global(.teamMemberItem .avatarIcon) {
        height: 22px;
        width: 22px;
    }
    .content :global(.teamMemberItem .detailContent) {
        padding-top: 4px;
        height: initial;
        padding-left: 28px;
        padding-right: 0;
    }
    .content :global(.teamMemberItem .title) {
        font-size: 1.3rem;
        /* font-size: 1.2rem; */
        overflow: initial;
    }
    .content :global(.teamMemberItem .username) {
        display: none;
    }
</style>
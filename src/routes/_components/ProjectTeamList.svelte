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

    export let project = null;

    const MAX_TEAM_MEMBERS = 10;

	$: isTeamMember = $user && getIsProjectTeamMember(project);
    $: isNew = (project && project.isNew) || false;

	$: canEdit = (isTeamMember && !project.archived) || false;
	$: canRemove = canEdit && teamMembers && teamMembers.length >= 2;

    $: teamMembers = (project && project.team) || null;

    $: {
        if (teamMembers && teamMembers.length) {
            loadUsers( { ids: teamMembers } );
        }
    }

    $: areMoreItems = teamMembers && teamMembers.length > MAX_TEAM_MEMBERS;

    let proxyImage = 'project_team';
    $: {
        if (isNew) {
            proxyImage = 'project_team_populate';
        } else {
            if (isTeamMember) {
                proxyImage = 'project_team_owner';
            } else {
                proxyImage = 'project_team';
            }
        }
    }

    function addTeamMembers() {
		showPrompt(promptIds.ADD_TEAM_MEMBERS);
    }

    function onEditTeamMembers() {
		showPrompt(promptIds.REMOVE_TEAM_MEMBERS);
    }
</script>

{#if teamMembers && teamMembers.length}
    <div class="content">
        <!-- <Proxy image="{proxyImage}" className="contentItem proxyOverlay" >
            <Hotspot onClick="{e => loadProfile('bl20a8lm')}" style="
                left: 0;
                top: 31px;
                width: 100%;
                height: 56px;" />
        </Proxy> -->

        <ContentPanel title="{locale.TEAM.TITLE}" showEdit="{canRemove}" editAction="{onEditTeamMembers}"> <!-- showMoreAction="{areMoreItems}" -->
            {#if canEdit}
                <Button className="addTeamMembersButton{canRemove ? ' canRemove' : ''}" icon="{AddIcon}" onClick="{addTeamMembers}">add team members</Button>
            {/if}
            <div class="scrollRegion">
                {#each teamMembers as teamMember, index}
                    {#if index < MAX_TEAM_MEMBERS}
                        <TeamMemberItem user="{getUser(teamMember)}" />
                    {/if}
                {/each}
            </div>
        </ContentPanel>
    </div>
{/if}

<style>
	.content :global(.contentItem) {
		width: 100%;

		margin-bottom: 10px;
	}

	/* .content :global(.proxyOverlay) {
        position: absolute;
        opacity: 0.5;
	} */

	.content :global(.contentPanel) {
        /* background-color: initial; */
        padding: 20px 0;
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

    .scrollRegion {
        white-space: nowrap;

        overflow-x: scroll;
        overflow-y: hidden;

        /* margin-top: -19px; */
        padding: 0 20px;

        -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
    }
	.scrollRegion::-webkit-scrollbar { /* Hide scrollbar for Chrome, Safari and Opera */
        display: none;
    }

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
    
</style>
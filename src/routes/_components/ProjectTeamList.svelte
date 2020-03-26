<script>
    import ContentPanel from './ContentPanel.svelte';

    import TeamMemberItem from './TeamMemberItem.svelte';

	import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

    import { getUser } from '../../models/usersModel';

	import { loadProfile } from '../../actions/appActions';

    export let project = null;

	$: isOwner = (project && project.isOwner) || false;
    $: isNew = (project && project.isNew) || false;

	$: teamMembers = (project && project.team) || null;

    $: areMoreItems = teamMembers && teamMembers.length > 0; // > MAX_PROJECT_PREVIEW_COUNT;

    let proxyImage = 'project_team';
    $: {
        if (isNew) {
            proxyImage = 'project_team_populate';
        } else {
            if (isOwner) {
                proxyImage = 'project_team_owner';
            } else {
                proxyImage = 'project_team';
            }
        }
    }
</script>

{#if teamMembers && teamMembers.length}
    <div class="content">
        <Proxy image="{proxyImage}" className="contentItem proxyOverlay" >
            <!-- Contact Profile -->
            <Hotspot onClick="{e => loadProfile('bl20a8lm')}" style="
                left: 0;
                top: 31px;
                width: 100%;
                height: 56px;" />
        </Proxy>

        <ContentPanel title="Team" showEdit="{isOwner}" showMoreAction="{areMoreItems}">
            {#each teamMembers as teamMember}
                <TeamMemberItem user="{getUser(teamMember)}" />
            {/each}
        </ContentPanel>
    </div>
{/if}

<style>
	.content :global(.contentItem) {
		width: 100%;

		margin-bottom: 10px;
	}

	.content :global(.proxyOverlay) {
        position: absolute;
        opacity: 0.5;
	}

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
        margin-top: -10px;
	}

	.content :global(.panelContent) {
        white-space: nowrap;

        overflow-x: scroll;
        overflow-y: hidden;

        /* margin-top: -19px; */
        padding: 0 20px;

        -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
	}
	.content :global(.panelContent::-webkit-scrollbar) { /* Hide scrollbar for Chrome, Safari and Opera */
        display: none;
    }
</style>
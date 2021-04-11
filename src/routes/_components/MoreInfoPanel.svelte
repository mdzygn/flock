<script>
    import locale from '../../locale';
    
	import ContentPanel from './ContentPanel.svelte';

    import config from '../../config';

    import Button from '../../components/Button.svelte';

    import UsersMiniList from './UsersMiniList.svelte';

    import CollaborateCheckedIcon from "../../assets/icons/collaborate_checked.png";
    import CollaborateUncheckedIcon from "../../assets/icons/collaborate_unchecked.png";

    import {
        getIsProjectTeamMember,
        user,
    } from '../../models/appModel';

    export let project = null;

    $: isTeamMember = $user && getIsProjectTeamMember(project);

	$: isArchived = (project && project.archived) || false;

    $: teamMembers = (project && project.team) || null;
    
    let interestedToCollaborate = false;

    function toggleCollaborate() {
        interestedToCollaborate = !interestedToCollaborate;
    }
</script>

<div class="content">
    <ContentPanel>
        {#if !isTeamMember && !isArchived}
            <Button className="interestedButton" onClick="{toggleCollaborate}" icon="{interestedToCollaborate ? CollaborateCheckedIcon : CollaborateUncheckedIcon}">interested to collaborate</Button>
        {/if}
        <UsersMiniList users="{teamMembers}" />
        <Button className="moreInfoButton" onClick="{null}">more info</Button>
    </ContentPanel>
</div>

<style>
    .content {
        margin-top: -4px;
    }

    .content :global(.contentPanel) {
        padding-top: 8px;
        padding-bottom: 30px;
        
        /* padding-top: 0;
        padding-bottom: 0; */
    }

    .content :global(.panelTitle) {
        font-size: 1.3rem;
        font-weight: normal;
    }

    .content :global(.contentPanel) {
        min-height: 15px;
    }

    .content :global(.interestedButton) {
        position: absolute;
        top: 8px;
        right: 12px;

        padding: 10px;
        padding-right: 40px;
        padding-left: 10px;

        font-size: 1.3rem;
        font-weight: 700;

        color: #0D0D0D;
    }

    .content :global(.interestedButton .icon) {
        margin-top: -2px;
        padding-left: 12px;
    }

    .content :global(.moreInfoButton) {
		display: block;
        position: absolute;

        top: 38px;

		padding: 10px;
		padding-right: 30px;

    	margin-top: -11px;
		margin-left: -10px;

        font-size: 1.3rem;
		font-weight: 700;
        
        /* margin-top: 0;
        position: relative;
        top: initial;
        font-size: 1.5rem; */
	}
</style>
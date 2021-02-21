<script>
    import locale from '../../locale';
    
	import ContentPanel from './ContentPanel.svelte';
    import TagSet from './TagSet.svelte';

    import config from '../../config';

    import Button from '../../components/Button.svelte';

    // import CollaborateCheckedIcon from "../../assets/icons/add_highlight.png";
    // import CollaborateUncheckedIcon from "../../assets/icons/add.png";
    import CollaborateCheckedIcon from "../../assets/icons/collaborate_checked.png";
    import CollaborateUncheckedIcon from "../../assets/icons/collaborate_unchecked.png";
    import SendMessageIcon from "../../assets/icons/send.png";
    
    import {
        getSplitItems,
        trim,
		testInputDefocus,
    } from '../../utils';

    // import {
    //     editProjectDetails,
    // } from '../../actions/appActions';

    import {
        getIsProjectTeamMember,
        user,
        showBetaFeatures,
    } from '../../models/appModel';

    export let project = null;

    let displayAllTags = false;

    let interestedToCollaborate = false;
    let showMessageField = false;

    let messageField;

    $: displayLimit = (displayAllTags || interestedToCollaborate) ? 0 : config.MAX_SKILL_TAG_COUNT;

    // $: skills = (project && project.skills) || null;
	$: skills = (project && project.skills && getSplitItems(project.skills)) || null;
    $: isTeamMember = $user && getIsProjectTeamMember(project);

    $: hasSkills = false; // skills && skills.length;

	$: canEdit = (isTeamMember && !project.archived) || false;

    $: areMoreItems = skills && displayLimit && skills.length > displayLimit;

    // $: console.log('areMoreItems: ', !!(skills && skills.length > displayLimit), skills && skills.length, displayLimit);
    // $: console.log('show more items: ', !!(areMoreItems ? displayAllSkills : false));

    let collaborateMessage = '';
    $: sendMessageEnabled = trim(collaborateMessage);
    
	function displayAllSkills() {
        displayAllTags = true;
    }
    
    function toggleCollaborate() {
        interestedToCollaborate = !interestedToCollaborate;
        showMessageField = interestedToCollaborate;

        if (showMessageField && messageField) {
            messageField.focus();
        }
    }
    
	function testSubmit() {
		if (sendMessageEnabled) {
            collaborateMessage = '';
            showMessageField = false;
		}
    }
</script>

{#if hasSkills || !canEdit}
    <div class="content" class:skillsShown="{hasSkills}" class:noSkillsShown="{!hasSkills}" id="skills">
        <ContentPanel title="{(hasSkills || canEdit) ? 'Seeking Skills:' : ''}" showEdit="{canEdit}"editProjectDetails showMoreAction="{areMoreItems ? displayAllSkills : false}">
            {#if !canEdit}
                <Button className="interestedButton" onClick="{toggleCollaborate}" icon="{interestedToCollaborate ? CollaborateCheckedIcon : CollaborateUncheckedIcon}">interested to collaborate</Button>
            {/if}
            <!-- {#if hasSkills}
                <div class="skillsContent" id="skills">
                    <TagSet tags="{skills}" displayLimit="{displayLimit}" />
                </div>
            {/if} -->
            <span slot="afterShowMore">
                {#if showMessageField && !canEdit}
                        <div class="messagePanel">
                            <div class="messageField">
                                <div class="label">{locale.COLLABORATE.MESSAGE}</div>
                                <textarea bind:value="{collaborateMessage}" bind:this="{messageField}" on:keypress="{e => testInputDefocus(e, {action: testSubmit, actionOnCtrl: true})}" />
                                <!-- on:keypress="{e => testInputDefocus(e, {action: testSubmit})}" -->
                            </div>
                            <div class="actions">
                                <Button className="sendButton" disabled="{!sendMessageEnabled}" onClick="{testSubmit}" icon="{SendMessageIcon}">{locale.COLLABORATE.SEND}</Button>
                            </div>
                        </div>
                {/if}
            </span>
        </ContentPanel>
    </div>
{/if}

<style>
    .content :global(.panelTitle) {
        font-size: 1.3rem;
        font-weight: normal;
    }

    .content.noSkillsShown :global(.panelTitle) {
        padding-bottom: 0;
        margin-bottom: -6px;
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

    .content.skillsShown .messagePanel {
        padding-top: 30px;
    }
    .content.noSkillsShown .messagePanel {
        padding-top: 8px;
    }
    
    .content :global(.interestedButton .icon) {
        margin-top: -2px;
        padding-left: 12px;
    }
    
	textarea {
        border: 1px solid #cccccc;

        outline: none;
        background: none;

        width: 100%;
		height: 72px;

        box-sizing: border-box;

		font-size: 1.5rem;
		line-height: 2rem;
    	color: #555555;

        padding: 4px 6px;

    	margin-top: 4px;

		resize: none;
	}

	.messageField {
		padding-bottom: 2px;
	}
    
    .messageField .label {
        font-size: 1.3rem;
        /* font-weight: 700; */
        color: #444444;

        padding-bottom: 4px;
        margin-top: -2px;
    }

    .actions {
        pointer-events: none;
        position: relative;
        height: 20px;
    }
    .actions :global(.button) {
        pointer-events: initial;
    }

	.actions :global(.sendButton) {
        position: absolute;
        top: -5px;
        right: 0;

		padding: 10px;
		padding-right: 39px;

        font-size: 1.2rem;
        font-weight: 700;
    }
    .actions :global(.sendButton .icon) {
    	padding-left: 20px;
    	margin-top: -1px;
    }
</style>
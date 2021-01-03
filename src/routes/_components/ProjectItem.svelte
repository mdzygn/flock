<script>
    // import { onDestroy } from 'svelte'; // afterUpdate

    import locale from '../../locale';
    
    import { get } from 'svelte/store';
    import { writable } from 'svelte/store';
    
	import { getSplitItems, stopEvent } from '../../utils';

    import Button from '../../components/Button.svelte';
    import TagSet from './TagSet.svelte';

    import ActionBar from './ActionBar.svelte';
    import ActionButton from './ActionButton.svelte';

    import LikesIcon from "../../assets/icons/likes.png";
    import FollowerIcon from "../../assets/icons/followers.png";

    import Proxy from '../../components/Proxy.svelte';

    import { showProjectCounts, user, getIsProjectTeamMember } from '../../models/appModel'; // getProject
    import { getProjectHeaderImage } from '../../models/projectsModel'; // getProject
    import { loadProject } from '../../actions/appActions';

    import MoreArrowIcon from "../../assets/icons/more_arrow.png";

    // export let projectId = null;
    // let project = writable({}); // declare store here to prevent SSR error
    // $: { project = getProjectModel(projectId) } ;

    export let project;

    $: projectId = ($project && $project.id) || null;
    // $: projectOwnerId = ($project && $project.ownerId) || null;

    // TODO: change to is member
    // $: isProjectOwner = projectOwnerId && projectOwnerId === $userId;
    $: isTeamMember = $user && $project && getIsProjectTeamMember($project);

    $: projectSlug = ($project && $project.slug) || null;

    $: headerImage = getProjectHeaderImage($project);

    $: projectTitle = ($project && $project.title) || '';
    $: projectDescription = ($project && $project.description) || '';

	$: skills = ($project && $project.skills && getSplitItems($project.skills)) || null;
</script>

<div class="projectItem" class:ownerProjectItem="{isTeamMember}">
    <!-- <Proxy image="discover1" className="proxyImage" /> -->
    <div class="headerImage" style="background-image: url({headerImage})" alt="project image" on:click="{e => loadProject(projectId, { showInfo: true })}" />
    <div class="contentContainer" on:click="{e => loadProject(projectId, { showInfo: true })}">
        <Button className="readMoreButton" onClick="{e => { loadProject(projectId, { showInfo: true }); e.stopPropagation() }}" icon="{MoreArrowIcon}">read more</Button>
        <div class="itemContent">
            <div class="header">{projectTitle}</div>
            <div class="description">{projectDescription}</div>
            <!-- <ProjectSkillsList project="{$project}" /> -->
        </div>
    </div>
    {#if skills}
        <div class="skills"><a class="skillsLink" href="/projects/{projectId}" title="view project" on:click="{e => {loadProject(projectId, { showInfo: true }); return stopEvent(e); }}">
            <div class="skillsLabel">{locale.DISCOVER.PROJECT_SKILLS}</div>
            <TagSet tags="{skills}" linkToDiscoverSearch="{false}" />
        </a></div>
    {/if}
    {#if !isTeamMember}
        <ActionBar targetItemId="{projectId}" targetItem="{$project}" />
    {:else if $showProjectCounts}
        <ActionBar targetItemId="{projectId}" targetItem="{$project}">
            <div slot="buttonLeft">
                <ActionButton
                    label = "likes"

                    icon = "{LikesIcon}"

                    targetItem = "{$project}"
                    targetItemId = "{projectId}"

                    countProperty= "likeCount"

                    buttonContentStyle = "padding-right: 56px;"
                    iconStyle = "padding-bottom: 4px; margin-top: 1px;"
                />
            </div>
            <div slot="buttonMiddle">
                <ActionButton
                    label = "followers"

                    icon = "{FollowerIcon}"

                    targetItem = "{$project}"
                    targetItemId = "{projectId}"

                    countProperty= "followCount"

                    buttonContentStyle = "padding-right: 56px;"
                    iconStyle = "padding-bottom: 4px"
                />
            </div>
        </ActionBar>
    {/if}
    <!-- {#if isTeamMember}
        <ActionBar targetItemId="{projectId}" targetItem="{$project}">
            <div slot="buttonLeft">
                <ActionButton
                    label = "likes"

                    icon = "{LikesIcon}"

                    targetItem = "{$project}"
                    targetItemId = "{projectId}"

                    countProperty= "likeCount"

                    buttonContentStyle = "padding-right: 56px;"
                    iconStyle = "padding-bottom: 4px; margin-top: 1px;"
                />
            </div>
            <div slot="buttonMiddle">
                <ActionButton
                    label = "followers"

                    icon = "{FollowerIcon}"

                    targetItem = "{$project}"
                    targetItemId = "{projectId}"

                    countProperty= "followCount"

                    buttonContentStyle = "padding-right: 56px;"
                    iconStyle = "padding-bottom: 4px"
                />
            </div>
        </ActionBar>
    {:else}
        <ActionBar targetItemId="{projectId}" targetItem="{$project}" />
    {/if} -->
</div>

<style>
    .projectItem {
        margin-bottom: 10px;

        background-color: #ffffff;
    }

    .contentContainer {
        position: relative;

        /* height: 102px; */
        cursor: pointer;

        margin-top: 7px;
        padding-left: 23px;
        /* padding-left: 18px; */
    }

    .projectItem.ownerProjectItem .contentContainer {
        padding-bottom: 18px;
    }

    .contentContainer :global(.readMoreButton) {
        position: absolute;
        top: 1px;
        right: 11px;

        padding: 10px;
        padding-right: 30px;

        font-size: 1.1rem;
        font-weight: 700;
    }
    .contentContainer :global(.readMoreButton .icon) {
        padding-left: 15px;
    }

    .projectItem :global(.proxyImage) {
        position: absolute;
        width: 411px;
        height: 314px;
        opacity: 0.5;
    }

    .projectItem :global(.actionBar .actionButtonLeft .buttonContent) {
        /* position: absolute;
        left: 26px; */
        margin-right: 6px;
    }

    .projectItem :global(.actionBar .actionButtonMiddle .buttonContent) {
        margin-right: -12px;
    }

    .projectItem :global(.actionBar .actionButtonRight .buttonContent) {
        margin-right: -20px;
    }

    .headerImage {
        width: 100%;
    	padding-top: 59.6%;
    	background-size: cover;
        background-position: center;

        /* height: 245px;
        object-fit: cover; */

        background-color: #dedede;

        /* height: 154px;
        object-fit: cover; */

        cursor: pointer;
    }

    .header {
        font-size: 2.2rem;
        padding-top: 3px;
        padding-right: 105px;
    }

    .description {
        padding-top: 3px;
        padding-right: 23px;
        /* padding-right: 50px; */

        font-size: 1.5rem;
        line-height: 2rem;

        min-height: 26px;

        color: #555555;
    }

    .skills {
        padding-left: 23px;
        padding-right: 18px;
        
        padding-top: 6px;
        overflow-x: scroll;
        overflow-y: hidden;
        -ms-overflow-style: none;

        white-space: nowrap;
    }
    .skillsLink {
        text-decoration: none;
    }
	.skills::-webkit-scrollbar { /* Hide scrollbar for Chrome, Safari and Opera */
        display: none;
    }
    .skillsLabel {
        font-size: 1.1rem;
        /* font-weight: bold; */
        color: #888888;

        display: inline-block;
        /* float: left;
        padding-top: 5px;
        padding-right: 5px; */
    }

    .projectItem :global(.tagSet) {
        white-space: nowrap;
        display: inline-block;
        /* margin-left: -23px;
        padding-left: 18px; */
    }
    .projectItem :global(.tagSet .tag) {
        font-size: 1.1rem;
        /* font-weight: 700; */
        padding: 1px 7px;
    }
</style>
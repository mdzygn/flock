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

	import Location from '../_components/Location.svelte';

    import FollowIcon from "../../assets/icons/follow.png";
	import FollowSelectedIcon from "../../assets/icons/follow_selected.png";
    import ShareIcon from "../../assets/icons/share.png";

    import Proxy from '../../components/Proxy.svelte';

    import { showProjectCounts, user, getIsProjectTeamMember } from '../../models/appModel'; // getProject
    import { getProjectHeaderImage } from '../../models/projectsModel'; // getProject
    import {
        loadProject,
		showShareProjectDialog,
    } from '../../actions/appActions';
    
	import {
		projectToggleFollowing,
	} from '../../actions/projectActions';

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

	$: projectLocation = ($project && $project.location) || '';
	$: projectType = ($project && ($project.projectType || ($project.categories && $project.categories.trim && $project.categories.split(',')[0].trim())));
    $: projectStatus = (($project && $project.status) || locale.PROJECT.DEFAULT_STATUS).toUpperCase();

    $: headerImage = getProjectHeaderImage($project);

    $: projectTitle = ($project && $project.title) || '';
    $: projectDescription = ($project && $project.description) || '';

	$: skills = ($project && $project.skills && getSplitItems($project.skills)) || null;
    
	$: following = ($project && $project.following) || false;

	function toggleFollowing() {
		projectToggleFollowing(projectId);
	}

	function shareItem() {
		showShareProjectDialog(projectId);
	}
</script>

<div class="projectItem" class:ownerProjectItem="{isTeamMember}">
    <!-- <Proxy image="discover1" className="proxyImage" /> -->
    <div class="headerImage" style="background-image: url({headerImage})" alt="project image" on:click="{e => loadProject(projectId, { showInfo: true })}" />
    <div class="contentContainer" on:click="{e => loadProject(projectId, { showInfo: true })}">
        <!-- <Button className="readMoreButton" onClick="{e => { loadProject(projectId, { showInfo: true }); e.stopPropagation() }}" icon="{MoreArrowIcon}">read more</Button> -->
        <div class="contentHeader">
            <Button className="headerButton shareButton" onClick="{e => {shareItem(); return stopEvent(e); }}" icon="{ShareIcon}" title="Share"></Button>
            {#if !isTeamMember}
                <Button className="headerButton followButton {!following ? 'isButton' : ''}" onClick="{e => {toggleFollowing(); return stopEvent(e); }}" icon="{following ? FollowSelectedIcon : FollowIcon}" title="{following ? 'Unfollow' : 'Follow'}"></Button>
            {/if}
        </div>
        <div class="itemContent">
            <div class="header">{projectTitle}</div>
            {#if projectStatus}
                <div class="projectStatusLine">
                    <div class="projectStatus">{projectStatus}</div>
                </div>
            {/if}
            <div class="description">{projectDescription}</div>
            <!-- <ProjectSkillsList project="{$project}" /> -->
        </div>
        {#if skills}
            <div class="skills"><a class="skillsLink" href="/projects/{projectId}" title="view project" on:click="{e => {loadProject(projectId, { showInfo: true }); return stopEvent(e); }}">
                <div class="skillsLabel">{locale.DISCOVER.PROJECT_SKILLS}</div>
                <TagSet tags="{skills}" linkToDiscoverSearch="{false}" />
            </a></div>
        {/if}
        <div class="infoContainer">
            <Button className="readMoreButton" onClick="{e => { loadProject(projectId, { showInfo: true }); e.stopPropagation() }}" icon="{MoreArrowIcon}">read more</Button>
            {#if projectType}
                <Button className="projectType" href="{'discover?search=' + encodeURIComponent(projectType)}" onClick="{e => {e.stopPropagation()}}">{projectType}</Button>
            {/if}
            {#if projectLocation}
                <Location location="{projectLocation}" />
            {/if}
        </div>
    </div>
    <!-- {#if !isTeamMember}
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
    {/if} -->
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

    /* .projectItem.ownerProjectItem .contentContainer {
        padding-bottom: 18px;
    } */

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
        margin-top: -1px;
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
        line-height: 2.5rem;
        padding-top: 8px;
        padding-bottom: 8px;
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

        overflow-wrap: break-word;
        word-wrap: break-word;
    }

    .skills {
        margin-left: -23px;
        padding-left: 23px;
        padding-right: 18px;
        
        padding-top: 12px;
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
        /* font-weight: 700; */
        color: #888888;

        display: inline-block;

        padding-right: 2px;

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

    .contentHeader {
        padding-right: 7px;
    }

    .projectItem :global(.headerButton) {
        float: right;
        width: 28px;
        height: 28px;
        padding: 6px;
    }

    .infoContainer {
        position: relative;
        min-height: 42px;
        padding-right: 104px;
        padding-top: 7px;
    }

    .projectItem :global(.location) {
        display: inline-block;
        margin-left: -2px;
        margin-top: 0;
        padding: 0;
        padding-bottom: 10px;
        /* text-decoration: underline; */
    }

    .projectItem :global(.projectType) {
        display: inline-block;
        padding-bottom: 10px;
        padding-right: 10px;
        font-size: 1.2rem;
        text-decoration: underline;
        color: #888;
    }

    .projectStatusLine {    
        margin-top: -8px;
        margin-bottom: 5px;
        margin-left: -1px;
        padding-right: 23px;
    }

    .projectStatus {
        font-size: 1rem;
        background-color: #eee;
        padding: 0px 6px;
        border-radius: 5px;
        display: inline-block;
    }
</style>
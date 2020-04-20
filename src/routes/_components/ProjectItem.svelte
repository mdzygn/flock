<script>
    // import { onDestroy } from 'svelte'; // afterUpdate

    import { get } from 'svelte/store';
    import { writable } from 'svelte/store';

    import Button from '../../components/Button.svelte';

    import ActionBar from './ActionBar.svelte';
    import ActionButton from './ActionButton.svelte';

    import LikesIcon from "../../assets/icons/likes.png";
    import FollowerIcon from "../../assets/icons/followers.png";

    import Proxy from '../../components/Proxy.svelte';

    import { userId } from '../../models/appModel'; // getProject
    import { getProjectHeaderImage } from '../../models/projectsModel'; // getProject
    import { loadProject } from '../../actions/appActions';

    import MoreArrowIcon from "../../assets/icons/more_arrow.png";

    // export let projectId = null;
    // let project = writable({}); // declare store here to prevent SSR error
    // $: { project = getProjectModel(projectId) } ;

    export let project;

    $: projectId = ($project && $project.id) || null;
    $: projectOwnerId = ($project && $project.ownerId) || null;

    $: projectSlug = ($project && $project.slug) || null;

    $: headerImage = getProjectHeaderImage($project);

    $: projectTitle = ($project && $project.title) || '';
    $: projectDescription = ($project && $project.description) || '';
</script>

<div class="projectItem">
    <!-- <Proxy image="discover1" className="proxyImage" /> -->
    <div class="headerImage" style="background-image: url({headerImage})" alt="project image" on:click="{e => loadProject(projectId)}" />
    <div class="contentContainer" on:click="{e => loadProject(projectId, { showInfo: true })}">
        <Button className="readMoreButton" onClick="{e => { loadProject(projectId, { showInfo: true }); e.stopPropagation() }}" icon="{MoreArrowIcon}">read more</Button>
        <div class="itemContent">
            <div class="header">{projectTitle}</div>
            <div class="description">{projectDescription}</div>
        </div>
    </div>
    {#if projectOwnerId === $userId}
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
                    <!-- action = "{showProjectFollowers}" -->
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
    {/if}
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
        padding-left: 18px;
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
    }

    .description {
        padding-top: 3px;
        padding-right: 50px;

        font-size: 1.5rem;
        line-height: 2rem;

        min-height: 26px;

        color: #555555;
    }
</style>
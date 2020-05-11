<script>
    import { writable } from 'svelte/store';

    import Counter from './Counter.svelte';

    import { getDateAgeString, getDateAge, getDateString } from '../../utils';

    import { getProjectHeaderImage } from '../../models/projectsModel';

    import { getUnviewedProjectNotificationCount } from '../../models/notificationsModel';

    import { loadProject } from '../../actions/appActions';

	import { getIsProjectTeamMember, showBetaFeatures, user } from '../../models/appModel';

    import FollowingSmallIcon from "../../assets/icons/following_small.png";
	import PrivateIcon from "../../assets/icons/private.png";

    export let project;
    export let showLastActive = false;
    export let showUpdateCounter = true;
    export let showPrivateIcon = false;

    let enableLastActive = false; // hardcode until updating project active dates

    $: isTeamMember = $user && getIsProjectTeamMember($project);

    $: thumbImage = getProjectHeaderImage($project, true);

    $: date = $project && (showLastActive ? $project.lastActiveAt : $project.createdAt);
    // $: detail = (showLastActive ? $project.lastActiveInfo : $project.createdInfo) || '';

    $: projectUnviewedCount = ($project && getUnviewedProjectNotificationCount($project.id)) || writable(0);

    let dateString = '';
    $: {
        if (date) {
            if (showLastActive) {
                dateString = 'active ' + getDateAgeString(date);
            } else {
                dateString = 'created ' + getDateString(date, 'd MMM yyyy');
            }
        }
    }

    $: detail = dateString;

    $: isPrivate = ($project && !$project.public) || false;
    // $: postCount = ($project && $project.postsCount) || 0;

    function loadCurrentProject() {
        loadProject($project.id);
    }
</script>

<div class="projectListItem" on:click="{loadCurrentProject}">
    <img class="thumb" src="{thumbImage}" alt="{$project.title}" />
    <div class="detailContent">
        <div class="detailInnerContent">
            <div class="title">{$project.title}</div>
            {#if detail}
                <div class="detail">{detail}</div>
            {/if}
        </div>
    </div>
    {#if ($project.following || isTeamMember)}
        <div class="info">
            {#if showPrivateIcon && isPrivate}
                <div class="privateIcon" style="background-image: url({PrivateIcon})"></div>
            {/if}
            {#if showUpdateCounter && ($projectUnviewedCount)}
                <!--  || postCount -->
                <Counter count="{$projectUnviewedCount}" hasNew="{$projectUnviewedCount}" />
            {/if}
            <div class="followingIcon" style="background-image: url({FollowingSmallIcon})"></div>
        </div>
    {/if}
</div>

<style>
    .projectListItem {
        position: relative;

        padding: 6px 0;
        margin-bottom: 2px;

        cursor: pointer;
    }

    .thumb {
        width: 38px;
        height: 38px;
        object-fit: cover;

        border: 1px solid #D9D9D9;
    }

    .detailContent {
        position: absolute;
        left: 54px;
        top: 2px;
        bottom: 0;
        right: 60px;

		display: flex;
		align-items: center;
    }

    .title {
        font-size: 1.4rem;
        font-weight: 700;
        line-height: 1.3rem;
    }

    .detail {
        font-size: 1.2rem;
        margin-top: 4px;
        color: #888888;
        line-height: 1.3rem;
    }

    .info {
        position: absolute;
        right: 0;
        top: 13px;
    }

    .info :global(.counter) {
        margin-right: 32px;
    }

    .followingIcon {
        position: absolute;
        right: 3px;
        top: 2px;

        background-size: cover;
        width: 21px;
        height: 20px;
    }

    .info :global(.privateIcon) {
        float: right;
        position: relative;
        display: inline-block;

        background-size: cover;
        width: 18px;
        height: 18px;
        /* width: 19px;
        height: 20px; */

        margin-top: 3px;
        margin-left: 10px;
        margin-right: 2px;

        opacity: 0.75;
    }
</style>
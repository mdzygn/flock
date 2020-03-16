<script>
    import Counter from './Counter.svelte';

    import { loadProject } from '../../actions/appActions.js';

	import FollowingSmallIcon from "../../assets/icons/following_small.png";

    export let project;

    $: thumbImage = project.slug ? 'content/projects/' + project.slug + '/header.jpg' : '';

    function loadCurrentProject() {
        loadProject(project.id);
    }
</script>

<div class="projectListItem" on:click="{loadCurrentProject}">
    <img class="thumb" src="{thumbImage}" alt="{project.title}" />
    <div class="detailContent">
        <div class="title">{project.title}</div>
        <div class="detail">{project.createdInfo || ''}</div>
    </div>
    {#if project.following || project.isOwner}
        <div class="info">
            <Counter visible="{project.unreadCount}" count="{project.unreadCount}" hasNew="{true}" />
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
        top: 9px;
    }

    .title {
        font-size: 1.4rem;
        font-weight: 700;
    }

    .detail {
        font-size: 1.2rem;
        margin-top: -2px;
        color: #888888;
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
</style>
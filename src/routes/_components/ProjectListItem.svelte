<script>
	import { loadProject } from '../../actions/appActions.js';

    export let project;

    $: thumbImage = project.slug ? 'content/projects/' + project.slug + '/header.jpg' : '';

    function loadCurrentProject() {
        loadProject(project.id);
    }
</script>

<div class="projectListItem" on:click="{loadCurrentProject}">
    <img class="thumb" src="{thumbImage}" alt="{project.title}" />
    <div class="content">
        <div class="title">{project.title}</div>
        <div class="detail">{project.createdInfo || ''}</div>
    </div>
    <div class="info">
        <div class="count"></div>
        <div class="following"></div>
    </div>
</div>

<style>
    .projectListItem {
        position: relative;
        padding-bottom: 14px;

        cursor: pointer;
    }

    .thumb {
        width: 38px;
        height: 38px;
        object-fit: cover;

        border: 1px solid #D9D9D9;
    }

    .content {
        position: absolute;
        left: 54px;
        top: 2px;
    }

    .title {
        font-size: 1.4rem;
        font-weight: 700;
    }

    .detail {
        font-size: 1.3rem;
        margin-top: -3px;
    }

    .info {

    }

    .count {

    }

    .following {

    }
</style>
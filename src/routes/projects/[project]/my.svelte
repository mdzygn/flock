<script>
	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';

	import Feed from './../../_components/Feed.svelte';

	import NewPostButton from '../../../components/NewPostButton.svelte';

	import ProjectTeamList from './../../_components/ProjectTeamList.svelte';

	let projectId = 'm62lsp2o';
</script>

<svelte:head>
	<title>World Creator - Flock</title>
</svelte:head>

<ScrollView id="project/{projectId}">
	<div class="content">
		<div class="header">
			<Proxy image="project_actions_owner">
			</Proxy>
			<Proxy image="project_header_image_compact" />
			<Proxy image="project_overview_owner">
				<!-- Read More -->
				<a href="projects/{projectId}/info" style="
					left: 0;
					top: 55px;
					width: 100%;
					height: 70px;">&nbsp;</a>
				<a href="projects/{projectId}/info" style="
					left: 8px;
					top: 125px;
					width: 110px;
					height: 36px;">&nbsp;</a>

				<!-- Messages -->
				<!-- <a href="messages/group" style="
					right: 7px;
					top: 122px;
					width: 150px;
					height: 39px;">&nbsp;</a> -->
			</Proxy>
		</div>
		<Proxy image="project_channels_owner" className="contentItem" href="channels/7m2ldksm" />
		<NewPostButton type="project_post_update" />
		<Proxy image="project_links_owner" className="contentItem" />
		<Proxy image="project_skills_owner" className="contentItem" />
		<ProjectTeamList isOwner="{true}" />
		<Proxy image="project_post_1" className="contentItem" />
		<Proxy image="project_post_2" className="contentItem" />
		<Proxy image="project_post_3" className="contentItem" />
		<NewPostButton type="project_post_update" />
	</div>
</ScrollView>

<style>
	.content {
		width: 100%;

    	line-height: 0;
	}
	.content :global(.header) {
		margin-bottom: 3px;
	}
	.content :global(.contentItem) {
		width: 100%;

		margin-bottom: 10px;
	}
</style>
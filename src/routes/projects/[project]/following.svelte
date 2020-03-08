<script>
	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';

	import Feed from './../../_components/Feed.svelte';

	import ProjectTeamView from './../../_components/ProjectTeamView.svelte';

	let projectId = 'm62lsp2o';
</script>

<svelte:head>
	<title>World Creator - Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<div class="header">
			<Proxy image="project_actions_following">
				<!-- Action Unfollow -->
				<a href="projects/{projectId}" style="
					left: 120px;
					top: 0px;
					width: 106px;
					height: 47px;">&nbsp;</a>
			</Proxy>
			<Proxy image="project_header_image_compact" />
			<Proxy image="project_overview_following">
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

				<!-- Message -->
				<a href="messages/group" style="
					right: 14px;
					top: 122px;
					width: 114px;
					height: 39px;">&nbsp;</a>
			</Proxy>
		</div>
		<Proxy image="project_channels_following" className="contentItem" href="channels/7m2ldksm" />
		<Proxy image="project_links" className="contentItem" />
		<Proxy image="project_skills" className="contentItem" />
		<ProjectTeamView />
		<Proxy image="project_post_1" className="contentItem" />
		<Proxy image="project_post_2" className="contentItem" />
		<Proxy image="project_post_3" className="contentItem" />
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
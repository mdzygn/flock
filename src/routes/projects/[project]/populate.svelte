<script>
	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';

	import Feed from './../../_components/Feed.svelte';

	import NewPostButton from '../../../components/NewPostButton.svelte';

	import ProjectTeamView from './../../_components/ProjectTeamView.svelte';

	let projectId = 'm62lsp2o';
</script>

<svelte:head>
	<title>World Creator - Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<div class="contentItem">
			<!-- <Proxy image="project_actions_owner">
			</Proxy> -->
			<Proxy image="project_header_image_compact" />
			<Proxy image="project_overview_populate">
				<!-- Add Details -->
				<a href="projects/{projectId}/details" style="
					left: 8px;
					top: 123px;
					width: 172px;
					height: 38px;">&nbsp;</a>

				<!-- Make Public -->
				<a href="projects/{projectId}/my" style="
					right: 11px;
					top: 120px;
					width: 125px;
					height: 41px;">&nbsp;</a>
			</Proxy>
		</div>
		<ProjectTeamView isNew="{true}" isOwner="{true}" />
		<Proxy image="project_links_populate" className="contentItem" />
		<Proxy image="project_skills_populate" className="contentItem" />
		<Proxy image="project_channels_populate" className="contentItem" href="channels/7m2ldksm" />
		<NewPostButton type="project_post_update" />
	</div>
</ScrollView>

<style>
	.content {
		width: 100%;

    	line-height: 0;
	}
	.content :global(.contentItem) {
		width: 100%;

		margin-bottom: 10px;
	}
</style>
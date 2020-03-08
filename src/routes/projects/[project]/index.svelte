<script>
	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';

	import Feed from './../../_components/Feed.svelte';

	let projectId = 'm62lsp2o';
</script>

<svelte:head>
	<title>World Creator - Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<div class="contentItem">
			<Proxy image="project_actions">
				<!-- Action Follow -->
				<a href="projects/{projectId}/follow" style="
					left: 120px;
					top: 0px;
					width: 106px;
					height: 47px;">&nbsp;</a>
			</Proxy>
			<Proxy image="project_header_image" />
			<Proxy image="project_overview">
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
    				height: 30px;">&nbsp;</a>

				<!-- Message -->
				<a href="messages/group" style="
					left: 7px;
					top: 155px;
					width: 121px;
					height: 46px;">&nbsp;</a>

				<!-- Follow -->
				<a href="projects/{projectId}/follow" style="
					right: 35px;
					top: 155px;
					width: 110px;
					height: 46px;">&nbsp;</a>
			</Proxy>
		</div>
		<Proxy image="project_team" className="contentItem"/>
		<Proxy image="project_skills" className="contentItem" />
		<Proxy image="project_links" className="contentItem" />
		<Proxy image="project_channels" className="contentItem" href="channels/7m2ldksm" />
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
	.content :global(.contentItem) {
		width: 100%;

		margin-bottom: 10px;
	}
</style>
<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';

	import Feed from './../_components/Feed.svelte';
</script>

<svelte:head>
	<title>World Creator - Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<div class="contentItem">
			<Proxy image="project_actions" />
			<Proxy image="project_header_image" />
			<Proxy image="project_overview">
				<a href="messages/group" style="
					left: 7px;
					top: 155px;
					width: 121px;
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
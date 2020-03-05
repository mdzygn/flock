<script>
	import ScrollView from '../../components/ScrollView.svelte';

	import Feed from './../_components/Feed.svelte';
</script>

<svelte:head>
	<title>World Creator - Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<div class="contentItem">
			<img src="content/proxy/project_actions.jpg" alt="search" />
			<img src="content/proxy/project_header_image.jpg" alt="search" />
			<img src="content/proxy/project_overview.jpg" alt="search" />
		</div>
		<div class="contentItem"><img src="content/proxy/project_team.jpg" alt="search" /></div>
		<div class="contentItem"><img src="content/proxy/project_skills.jpg" alt="search" /></div>
		<div class="contentItem"><img src="content/proxy/project_links.jpg" alt="search" /></div>
		<div class="contentItem"><img src="content/proxy/project_channels.jpg" alt="search" /></div>
		<div class="contentItem"><img src="content/proxy/project_post_1.jpg" alt="search" /></div>
		<div class="contentItem"><img src="content/proxy/project_post_2.jpg" alt="search" /></div>
		<div class="contentItem"><img src="content/proxy/project_post_3.jpg" alt="search" /></div>
	</div>
</ScrollView>

<style>
	.content {
		width: 100%;

    	line-height: 0;
	}
	.contentItem {
		width: 100%;

		margin-bottom: 10px;
	}
	img {
		width: 100%;
	}
</style>
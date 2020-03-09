<script>
	import { onMount } from 'svelte';

	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';

	import {
		returnView,
		following,
		owner,
		isNew,
		showingInfo,
		liked,
	} from '../../../models/projectViewState.js';

	let proxyHeaderImage;
	let proxyActionsImage;
	let proxyOverviewImage;
	let proxyChannelsImage;

	$: {
		if ($returnView) {
			proxyHeaderImage = 'project_header_image_compact';
		} else {
			proxyHeaderImage = 'project_header_image';
		}

		if ($following) {
			proxyActionsImage = 'project_actions_following';
			if ($returnView) {
				proxyOverviewImage = 'project_overview_following';
			} else {
				proxyOverviewImage = 'project_overview_following_changed';
			}
			proxyChannelsImage = 'project_channels_following';
		} else {
			proxyActionsImage = 'project_actions';
			if ($returnView) {
				proxyOverviewImage = 'project_overview_following';
			} else {
				proxyOverviewImage = 'project_overview';
			}
			proxyChannelsImage = 'project_channels';
		}
	}

	import Feed from './../../_components/Feed.svelte';

	import ProjectTeamList from './../../_components/ProjectTeamList.svelte';

	function toggleFollowing() {
		$following = !$following;
	}

    onMount(() => {
		$returnView = $following || $owner || $liked;
	});

	let projectId = 'm62lsp2o';
</script>

<svelte:head>
	<title>World Creator - Flock</title>
</svelte:head>

<ScrollView id="project/{projectId}">
	<div class="content">
		<div class="contentItem" class:collapsedHeader="{$returnView}">
			<Proxy image="{proxyActionsImage}">
				<!-- Action Follow -->
				<div on:click="{toggleFollowing}" style="
					left: 120px;
					top: 0px;
					width: 106px;
					height: 47px;">&nbsp;</div>
			</Proxy>
			<Proxy image="{proxyHeaderImage}" />
			<Proxy image="{proxyOverviewImage}">
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
				<div on:click="{toggleFollowing}" style="
					right: 35px;
					top: 155px;
					width: 110px;
					height: 46px;">&nbsp;</div>
			</Proxy>
		</div>
		{#if $returnView}
			<Proxy image="{proxyChannelsImage}" className="contentItem" href="channels/7m2ldksm" />
			<Proxy image="project_links" className="contentItem" />
			<Proxy image="project_skills" className="contentItem" />
			<ProjectTeamList />
			<Proxy image="project_post_1" className="contentItem" />
			<Proxy image="project_post_2" className="contentItem" />
			<Proxy image="project_post_3" className="contentItem" />
		{:else}
			<ProjectTeamList />
			<Proxy image="project_skills" className="contentItem" />
			<Proxy image="project_links" className="contentItem" />
			<Proxy image="{proxyChannelsImage}" className="contentItem" href="channels/7m2ldksm" />
			<div id="post" />
			<Proxy image="project_post_1" className="contentItem" />
			<Proxy image="project_post_2" className="contentItem" />
			<Proxy image="project_post_3" className="contentItem" />
		{/if}
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

	.content .collapsedHeader {
		margin-bottom: 3px;
	}
</style>
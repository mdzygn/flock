<script>
	import { onMount } from 'svelte';

	import ScrollView from '../../../components/ScrollView.svelte';

	import Proxy from '../../../components/Proxy.svelte';
	import Hotspot from '../../../components/Hotspot.svelte';

	import { projectId, project } from '../../../models/appState';

	import {
		returnView,
		showingInfo,
	} from '../../../models/projectViewState.js';

	import {
		makePublic,
		loadChannel,
		loadConversation,
		editProjectDetails,
		showProjectInfo,
	} from '../../../actions/appActions.js';

	import {
		projectToggleFollowing,
		projectToggleLiked,
	} from '../../../actions/projectActions.js';

	import Feed from './../../_components/Feed.svelte';

	import ProjectTeamList from './../../_components/ProjectTeamList.svelte';

	import NewPostButton from '../../../components/NewPostButton.svelte';

	function toggleFollowing() {
		projectToggleFollowing($projectId);
	}
	function toggleLiked() {
		projectToggleLiked($projectId);
	}

	let proxyHeaderImage;
	let proxyActionsImage;
	let proxyOverviewImage;
	let proxyShowingInfoActionsImage;
	let proxyChannelsImage;
	let proxyLinksImage;
	let proxySkillsImage;

	$: isOwner = $project ? $project.isOwner : false;
	$: isNew = $project ? $project.isNew : false;
	$: following = $project ? $project.following : false;
	$: liked = $project ? $project.liked : false;

	// $: console.log('isNew: ' + isNew, $project);

	$: {
		if ($returnView) {
			proxyHeaderImage = 'project_header_image_compact';
		} else {
			proxyHeaderImage = 'project_header_image';
		}

		if (isOwner) {
			proxyActionsImage = 'project_actions_owner';

			if (isNew) {
				proxyOverviewImage = 'project_overview_populate';
				proxyChannelsImage = 'project_channels_populate';
			} else {
				proxyOverviewImage = 'project_overview_owner';
				proxyChannelsImage = 'project_channels_owner';
			}

			if (isNew) {
				proxyLinksImage = 'project_links_populate';
				proxySkillsImage = 'project_skills_populate';
			} else {
				proxyLinksImage = 'project_links_owner';
				proxySkillsImage = 'project_skills_owner';
			}
		} else {
			if (following) {
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

			proxyLinksImage = 'project_links';
			proxySkillsImage = 'project_skills';
		}

		if (isOwner) {
			proxyShowingInfoActionsImage = 'project_info_actions_owner';
		} else if (following) {
			proxyShowingInfoActionsImage = 'project_info_actions_following';
		} else {
			proxyShowingInfoActionsImage = 'project_info_actions';
		}
	}
</script>

<svelte:head>
	<title>World Creator - Flock</title>
</svelte:head>

<ScrollView id="project">
	<div class="content">
		<div class="contentItem" class:collapsedHeader="{$returnView && !$showingInfo && !isNew}">
			{#if !isNew}
				<Proxy image="{proxyActionsImage}">
					{#if !isOwner}
						<!-- Action Follow -->
						<Hotspot onClick="{toggleFollowing}" style="
							left: 120px;
							top: 0px;
							width: 142px;
							height: 47px;" />
					{/if}

					<!-- Like Icon -->
					{#if liked}
						<Proxy image="project_actions_like_selected" absolutePlacement="true" style="
							left: 45px;
							top: 12px;" />
					{/if}

					<!-- Like -->
					<Hotspot onClick="{toggleLiked}" style="
						left: 0;
						top: 0px;
						width: 112px;
						height: 47px;" />
				</Proxy>
			{/if}
			<Proxy image="{proxyHeaderImage}" />
			{#if isNew}
				<Proxy image="{proxyOverviewImage}">
					<!-- Add Details -->
					<Hotspot onClick="{editProjectDetails}" style="
						left: 8px;
						top: 123px;
						width: 172px;
						height: 38px;" />

					<!-- Make Public -->
					<Hotspot onClick="{makePublic}" style="
						right: 11px;
						top: 120px;
						width: 125px;
						height: 41px;" />
				</Proxy>
			{:else if !$showingInfo}
				<Proxy image="{proxyOverviewImage}">
					<!-- Read More -->
					<Hotspot onClick="{showProjectInfo}" style="
						left: 0;
						top: 55px;
						width: 100%;
						height: 70px;" />
					<Hotspot onClick="{showProjectInfo}" style="
						left: 8px;
						top: 125px;
						width: 110px;
						height: 30px;" />

					<!-- Message -->
					{#if isOwner}
						<Hotspot href="projects/{$projectId}/messages" style="
							right: 11px;
							top: 122px;
							width: 147px;
							height: 40px;" />
					{:else if $returnView}
						<Hotspot onClick="{e => loadConversation('s0g1la34')}" style="
							right: 11px;
							top: 122px;
							width: 116px;
							height: 40px;" />
					{:else}
						<Hotspot onClick="{e => loadConversation('s0g1la34')}" style="
							left: 7px;
							top: 155px;
							width: 121px;
							height: 46px;" />
					{/if}

					{#if !isOwner && !$returnView}
						<!-- Like Icon -->
						{#if liked}
							<Proxy image="project_like_selected" absolutePlacement="true" style="
								left: 175px;
								top: 164px;" />
						{/if}

						<!-- Like -->
						<Hotspot onClick="{toggleLiked}" style="
							left: 170px;
							top: 159px;
							width: 59px;
							height: 40px;" />
					{/if}

					<!-- Follow -->
					{#if !isOwner}
						<Hotspot onClick="{toggleFollowing}" style="
							right: 35px;
							top: 155px;
							width: 110px;
							height: 46px;" />
					{/if}
				</Proxy>
			{:else}
				<Proxy image="project_overview_info" />
				<div>
					<Proxy image="project_info_image_1" />
					<Proxy image="project_info_content_1" />
					<Proxy image="project_info_image_2" />
					<Proxy image="project_info_content_2" />
					<Proxy image="project_info_image_3" />
					<Proxy image="project_info_content_3" />
				</div>
				<Proxy image="{proxyShowingInfoActionsImage}">
					{#if isOwner}
						<!-- Send Message -->
						<Hotspot onClick="{e => loadConversation('s0g1la34')}" style="
							right: 6px;
							top: 2px;
							width: 156px;
							height: 46px;" />
					{:else}
						<!-- Send Message -->
						<Hotspot onClick="{e => loadConversation('s0g1la34')}" style="
							left: 7px;
							top: 8px;
							width: 121px;
							height: 46px;" />

						<!-- Like Icon -->
						{#if liked}
							<Proxy image="project_like_selected" absolutePlacement="true" style="
								left: 175px;
								top: 16px;" />
						{/if}

						<!-- Like -->
						<Hotspot onClick="{toggleLiked}" style="
							left: 170px;
							top: 11px;
							width: 59px;
							height: 40px;" />

						<!-- Follow -->
						<Hotspot onClick="{toggleFollowing}" style="
							right: 35px;
							top: 8px;
							width: 110px;
							height: 46px;" />
					{/if}
				</Proxy>
			{/if}
		</div>
		{#if isNew}
			<ProjectTeamList isOwner="{isOwner}" isNew="{isNew}" />
			<Proxy image="{proxyLinksImage}" className="contentItem" />
			<Proxy image="{proxySkillsImage}" className="contentItem" />
			<Proxy image="{proxyChannelsImage}" className="contentItem" onClick="{e => loadChannel('7m2ldksm')}" />
			{#if isOwner}
				<NewPostButton type="project_post_update" />
			{/if}
		{:else if $returnView}
			<Proxy image="{proxyChannelsImage}" className="contentItem" onClick="{e => loadChannel('7m2ldksm')}" />
			{#if isOwner}
				<NewPostButton type="project_post_update" />
			{/if}
			<Proxy image="{proxyLinksImage}" className="contentItem" />
			<Proxy image="{proxySkillsImage}" className="contentItem" />
			<ProjectTeamList isOwner="{isOwner}" isNew="{isNew}" />
			<div>
				<Proxy image="project_post_1" className="contentItem" />
				<Proxy image="project_post_2" className="contentItem" />
				<Proxy image="project_post_3" className="contentItem" />
			</div>
			{#if isOwner}
				<NewPostButton type="project_post_update" />
			{/if}
		{:else}
			<ProjectTeamList isOwner="{isOwner}" isNew="{isNew}" />
			<Proxy image="{proxySkillsImage}" className="contentItem" />
			<Proxy image="{proxyLinksImage}" className="contentItem" />
			<Proxy image="{proxyChannelsImage}" className="contentItem" onClick="{e => loadChannel('7m2ldksm')}" />
			<div id="post" />
			<div>
				<Proxy image="project_post_1" className="contentItem" />
				<Proxy image="project_post_2" className="contentItem" />
				<Proxy image="project_post_3" className="contentItem" />
			</div>
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
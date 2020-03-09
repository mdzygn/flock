<script>
	import { onMount } from 'svelte';

	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';
	import Hotspot from '../../../components/Hotspot.svelte';

	import {
		returnView,
		following,
		owner,
		isNew,
		showingInfo,
		liked,
	} from '../../../models/projectViewState.js';

	import { makePublic } from '../../../actions/appActions.js';

	import Feed from './../../_components/Feed.svelte';

	import ProjectTeamList from './../../_components/ProjectTeamList.svelte';

	import NewPostButton from '../../../components/NewPostButton.svelte';

    // onMount(() => {
	// 	$showingInfo = false;
	// 	$returnView = $following || $owner || $liked;
	// });

	let proxyHeaderImage;
	let proxyActionsImage;
	let proxyOverviewImage;
	let proxyShowingInfoActionsImage;
	let proxyChannelsImage;
	let proxyLinksImage;
	let proxySkillsImage;

	$: {
		if ($returnView) {
			proxyHeaderImage = 'project_header_image_compact';
		} else {
			proxyHeaderImage = 'project_header_image';
		}

		if ($owner) {
			proxyActionsImage = 'project_actions_owner';

			if ($isNew) {
				proxyOverviewImage = 'project_overview_populate';
				proxyChannelsImage = 'project_channels_populate';
			} else {
				proxyOverviewImage = 'project_overview_owner';
				proxyChannelsImage = 'project_channels_owner';
			}

			if ($isNew) {
				proxyLinksImage = 'project_links_populate';
				proxySkillsImage = 'project_skills_populate';
			} else {
				proxyLinksImage = 'project_links_owner';
				proxySkillsImage = 'project_skills_owner';
			}
		} else {
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

			proxyLinksImage = 'project_links';
			proxySkillsImage = 'project_skills';
		}

		if ($owner) {
			proxyShowingInfoActionsImage = 'project_info_actions_owner';
		} else if ($following) {
			proxyShowingInfoActionsImage = 'project_info_actions_following';
		} else {
			proxyShowingInfoActionsImage = 'project_info_actions';
		}
	}

	function toggleFollowing() {
		$following = !$following;
	}
	function showInfo() {
		$showingInfo = true;
	}

	let projectId = 'm62lsp2o';
</script>

<svelte:head>
	<title>World Creator - Flock</title>
</svelte:head>

<ScrollView id="project">
	<div class="content">
		<div class="contentItem" class:collapsedHeader="{$returnView && !$showingInfo && !$isNew}">
			{#if !$isNew}
				<Proxy image="{proxyActionsImage}">
					<!-- Action Follow -->
					<div on:click="{toggleFollowing}" style="
						left: 120px;
						top: 0px;
						width: 106px;
						height: 47px;">&nbsp;</div>
				</Proxy>
			{/if}
			<Proxy image="{proxyHeaderImage}" />
			{#if $isNew}
				<Proxy image="{proxyOverviewImage}">
					<!-- Add Details -->
					<a href="projects/{projectId}/details" style="
						left: 8px;
						top: 123px;
						width: 172px;
						height: 38px;">&nbsp;</a>

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
					<div on:click="{showInfo}" style="
						left: 0;
						top: 55px;
						width: 100%;
						height: 70px;">&nbsp;</div>
					<div on:click="{showInfo}" style="
						left: 8px;
						top: 125px;
						width: 110px;
						height: 30px;">&nbsp;</div>

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
					<!-- Message -->
					<a href="messages/group" style="
						left: 7px;
						top: 8px;
						width: 121px;
						height: 46px;">&nbsp;</a>

					<!-- Follow -->
					<div on:click="{toggleFollowing}" style="
						right: 35px;
						top: 8px;
						width: 110px;
						height: 46px;">&nbsp;</div>
				</Proxy>
			{/if}
		</div>
		{#if $isNew}
			<ProjectTeamList isOwner="{$owner}" isNew="{$isNew}" />
			<Proxy image="{proxyLinksImage}" className="contentItem" />
			<Proxy image="{proxySkillsImage}" className="contentItem" />
			<Proxy image="{proxyChannelsImage}" className="contentItem" href="channels/7m2ldksm" />
			{#if $owner}
				<NewPostButton type="project_post_update" />
			{/if}
		{:else if $returnView}
			<Proxy image="{proxyChannelsImage}" className="contentItem" href="channels/7m2ldksm" />
			{#if $owner}
				<NewPostButton type="project_post_update" />
			{/if}
			<Proxy image="{proxyLinksImage}" className="contentItem" />
			<Proxy image="{proxySkillsImage}" className="contentItem" />
			<ProjectTeamList isOwner="{$owner}" isNew="{$isNew}" />
			<div>
				<Proxy image="project_post_1" className="contentItem" />
				<Proxy image="project_post_2" className="contentItem" />
				<Proxy image="project_post_3" className="contentItem" />
			</div>
			{#if $owner}
				<NewPostButton type="project_post_update" />
			{/if}
		{:else}
			<ProjectTeamList isOwner="{$owner}" isNew="{$isNew}" />
			<Proxy image="{proxySkillsImage}" className="contentItem" />
			<Proxy image="{proxyLinksImage}" className="contentItem" />
			<Proxy image="{proxyChannelsImage}" className="contentItem" href="channels/7m2ldksm" />
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
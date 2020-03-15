<script>
	import { onMount } from 'svelte';

    import Button from '../../../components/Button.svelte';

	import ScrollView from '../../../components/ScrollView.svelte';

	import ActionBar from '../../_components/ActionBar.svelte';
	import ActionButton from '../../_components/ActionButton.svelte';

    import SendMessageIcon from "../../../assets/icons/send.png";
	import LocationIcon from "../../../assets/icons/location.png";
	import OptionsMenuIcon from "../../../assets/icons/options_menu.png";

    import LikeIcon from "../../../assets/icons/like.png";
    import LikeSelectedIcon from "../../../assets/icons/like_selected.png";
    import FollowIcon from "../../../assets/icons/follow.png";
    import FollowSelectedIcon from "../../../assets/icons/follow_selected.png";

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
		showProjectFollowers,
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

	// let proxyHeaderImage;
	// let proxyActionsImage;
	let proxyOverviewImage;
	let proxyShowingInfoActionsImage;
	let proxyChannelsImage;
	let proxyLinksImage;
	let proxySkillsImage;

	$: isOwner = $project ? $project.isOwner : false;
	$: isNew = $project ? $project.isNew : false;
	$: following = $project ? $project.following : false;
	$: liked = $project ? $project.liked : false;

	$: likeCount = $project ? $project.likeCount : 0;
	$: followCount = $project ? $project.followCount : 0;

	$: projectSlug = $project ? $project.slug : '';

	$: headerImage = 'content/projects/' + projectSlug + '/header.jpg';

    $: projectTitle = $project ? $project.title : '';
	$: projectDescription = $project ? $project.description : '';
	$: projectLocation = $project ? $project.location : '';
	$: projectHasDetails = $project ? $project.projectHasDetails : false;

	$: {
		// if ($returnView) {
		// 	proxyHeaderImage = 'project_header_image_compact';
		// } else {
		// 	proxyHeaderImage = 'project_header_image';
		// }

		if (isOwner) {
			// proxyActionsImage = 'project_actions_owner';

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
				// proxyActionsImage = 'project_actions_following';
				if ($returnView) {
					proxyOverviewImage = 'project_overview_following';
				} else {
					proxyOverviewImage = 'project_overview_following_changed';
				}
				proxyChannelsImage = 'project_channels_following';
			} else {
				// proxyActionsImage = 'project_actions';
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

<div class="pageContent">
	<ScrollView id="project" headerStartHidden="{true}">
		<div class="content">
			<div class="contentItem" class:collapsedHeader="{$returnView && !$showingInfo && !isNew}">
				<img src="{headerImage}" class="headerImage" class:headerImageCollapsed="{$returnView}" alt="project header image" />
				{#if isNew}
					<Proxy image="{proxyOverviewImage}" className="proxyOverview">
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
					<Proxy image="{proxyOverviewImage}" className="proxyOverview" style="pointer-events: none">
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

						{#if !$returnView}
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

							<!-- Follow -->
							<Hotspot onClick="{toggleFollowing}" style="
								right: 35px;
								top: 155px;
								width: 110px;
								height: 46px;" />
						{/if}
					</Proxy>
				{:else}
					<Proxy image="project_overview_info" className="proxyOverview" />
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

				<div class="overviewContent">
					<div class="contentContainer">
						<Button className="projectOptions" icon="{OptionsMenuIcon}"></Button>
						<div class="itemContent">
							<div class="header">{projectTitle}</div>
							<div class="description" class:button="{projectHasDetails}" on:click="{projectHasDetails ? showProjectInfo : null}">{projectDescription}</div>
						</div>
						{#if !$showingInfo && projectHasDetails}
							<Button className="readMoreButton" onClick="{showProjectInfo}">read more</Button>
						{/if}
					</div>
					<div class="projectActions">
						<div class="projectActionButtons">
							{#if !isOwner}
								<Button className="sendMessageButton" onClick="{e => loadConversation('s0g1la34')}" icon="{SendMessageIcon}">messages</Button>
							{/if}
							{#if !$returnView && !isOwner}
								<Button className="likeButton" onClick="{toggleLiked}" icon="{liked ? LikeSelectedIcon : LikeIcon}"><div class="countContainer">
									<div class="count">{likeCount}</div>
								</div></Button>
								<Button className="followButton {!following ? 'isButton' : ''}" onClick="{toggleFollowing}" icon="{following ? FollowSelectedIcon : FollowIcon}">{following ? 'following' : 'follow'}<div class="countContainer">
									<div class="count">{followCount}</div>
								</div></Button>
							{/if}
						</div>
						{#if projectLocation}
							<div class="location"><div class="locationIcon" style="background-image: url({LocationIcon})" />{projectLocation}</div>
						{/if}
					</div>
				</div>
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

		<div slot="scrollHeader">
			{#if isOwner}
				<ActionBar targetItemId="{$projectId}" targetItem="{$project}">
					<div slot="buttonMiddle">
						<ActionButton
							label = "followers"

							icon = "{FollowSelectedIcon}"

							targetItem = "{$project}"
							targetItemId = "{$projectId}"
							action = "{showProjectFollowers}"

							countProperty= "followCount"

							buttonContentStyle = "padding-right: 56px;"
							iconStyle = "padding-bottom: 4px"
						/>
					</div>
				</ActionBar>
			{:else}
				<ActionBar targetItemId="{$projectId}" targetItem="{$project}" />
			{/if}
		</div>
	</ScrollView>
</div>

<style>
	.content {
		width: 100%;

    	/* line-height: 0; */
	}

	.content :global(.contentItem) {
		width: 100%;

		margin-bottom: 10px;
	}

	/* .pageContent :global(.actionBar .actionButtonMiddle .buttonContent) {
		padding-right: 44px;
	} */

	.headerImage {
		width: 100%;
	}

	.headerImageCollapsed {
		height: 150px;
    	object-fit: cover;
	}

    .contentContainer {
        position: relative;

        height: 171px;

		padding-left: 23px;
	}

	.overviewContent {
		background-color: #ffffff;
	}

    .contentContainer :global(.projectOptions) {
		position: absolute;

		top: 13px;
		right: 14px;

		width: 28px;
		height: 26px;
		padding: 8px;
	}

    .contentContainer :global(.readMoreButton) {
		display: table;

		padding: 10px;
		margin-left: -10px;

		font-size: 1.5rem;
		font-weight: 700;
	}

	.projectActions {
		position: relative;

		width: 100%;

    	padding-bottom: 6px;

    	/* margin-top: 171px; */
	}

	.projectActionButtons {
		height: 50px;
	}

    .projectActions :global(.sendMessageButton) {
    	position: absolute;
		padding: 10px;
    	padding-right: 40px;

		margin-left: 13px;

		font-size: 1.5rem;
		font-weight: 700;

    	margin-top: 4px;
    }
    .projectActions :global(.sendMessageButton .icon) {
    	padding-left: 12px;
	}

    .projectActions :global(.likeButton ) {
		position: absolute;
		top: 4px;
		right: 180px;
		width: 28px;
		height: 26px;
		padding: 8px;
    }

    .projectActions :global(.followButton) {
		position: absolute;
		top: 8px;
		right: 48px;
		padding: 6px 41px 6px 18px;

		font-size: 1.5rem;
		font-weight: 700;

    	margin-right: -6px;
    }
    .projectActions :global(.followButton.isButton) {
		border: 2px solid #0B0B0B;
		margin-right: -2px; margin-top: -2px; /* factor in border */
		border-radius: 999px;
    }
    .projectActions :global(.followButton .icon) {
		margin-left: 5px;
		margin-top: -2px;
    }

	.content .collapsedHeader {
		margin-bottom: 3px;
	}

	.pageContent :global(.proxyOverview) {
		position: absolute;
		opacity: 0;
	}

    .header {
		font-size: 2.5rem;
		padding-top: 21px;
    }

    .description {
		padding-top: 12px;
        padding-right: 50px;

        font-size: 1.5rem;
        line-height: 2rem;

		color: #555555;
	}

	.button {
		cursor: pointer;
	}

    .pageContent :global(.actionBar .actionButtonMiddle .buttonContent) {
        margin-right: -11px;
    }

    .pageContent :global(.actionBar .actionButtonRight .buttonContent) {
        margin-right: -20px;
	}

	.location {
		display: table;

		padding: 5px;
    	margin-left: 16px;
		margin-top: -2px;

		font-size: 1.2rem;
		color: #999999;
	}

	.locationIcon {
		display: inline-block;
		background-size: cover;
		width: 11px;
		height: 13px;
		vertical-align: middle;
    	margin-right: 3px;
	}

	.countContainer {
		vertical-align: bottom;
		display: inline-block;
		position: relative;
	}

	.count {
		position: absolute;
		left: 35px;
		bottom: 3px;

		font-weight: 700;
    	font-size: 1.1rem;
		color: #777777;
	}

    .projectActions :global(.followButton.isButton .count) {
    	left: 49px;
    }
    .projectActions :global(.followButton .count) {
    	left: 43px;
    }
</style>
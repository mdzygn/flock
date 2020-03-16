<script>
	import { onMount } from 'svelte';

    import Button from '../../../components/Button.svelte';

	import ScrollView from '../../../components/ScrollView.svelte';

	import ActionBar from '../../_components/ActionBar.svelte';
	import ActionButton from '../../_components/ActionButton.svelte';
	import Counter from '../../_components/Counter.svelte';
	import Location from '../../_components/Location.svelte';
	import Audience from '../../_components/Audience.svelte';

    import SendMessageIcon from "../../../assets/icons/send.png";
	import OptionsMenuIcon from "../../../assets/icons/options_menu.png";
	import HideInfoIcon from "../../../assets/icons/collapse.png";
	import AddDetailsIcon from "../../../assets/icons/add_highlight.png";
	import EditIcon from "../../../assets/icons/edit.png";
	import MessagesIcon from "../../../assets/icons/nav_messages.png";

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
		loadChannel,
		loadConversation,
		editProjectDetails,
		showProjectInfo,
		hideProjectInfo,
		showProjectFollowers,
	} from '../../../actions/appActions.js';

	import {
		makePublic,
		togglePublic,
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
	$: isPublic = $project ? $project.public : false;
	$: unreadMessageCount = $project ? $project.unreadMessageCount : false;
	$: messageCount = $project ? $project.messageCount : false;

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
			<div class="contentItem" class:collapsedOptions="{$returnView && !$showingInfo}" class:collapsedHeader="{$returnView && !$showingInfo && !isNew}">
				<img src="{headerImage}" class="headerImage" class:headerImageCollapsed="{$returnView}" alt="project header image" />
				<!-- {#if isNew}
					<Proxy image="{proxyOverviewImage}" className="proxyOverview">
						<Hotspot onClick="{editProjectDetails}" style="
							left: 8px;
							top: 123px;
							width: 172px;
							height: 38px;" />

						<Hotspot onClick="{makePublic}" style="
							right: 11px;
							top: 120px;
							width: 125px;
							height: 41px;" />
					</Proxy>
				{:else if !$showingInfo}
					<Proxy image="{proxyOverviewImage}" className="proxyOverview" style="pointer-events: none">
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
							{#if liked}
								<Proxy image="project_like_selected" absolutePlacement="true" style="
									left: 175px;
									top: 164px;" />
							{/if}

							<Hotspot onClick="{toggleLiked}" style="
								left: 170px;
								top: 159px;
								width: 59px;
								height: 40px;" />

							<Hotspot onClick="{toggleFollowing}" style="
								right: 35px;
								top: 155px;
								width: 110px;
								height: 46px;" />
						{/if}
					</Proxy>
				{:else}
					<div class="proxyOverview">
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
								<Hotspot onClick="{e => loadConversation('s0g1la34')}" style="
									right: 6px;
									top: 2px;
									width: 156px;
									height: 46px;" />
							{:else}
								<Hotspot onClick="{e => loadConversation('s0g1la34')}" style="
									left: 7px;
									top: 8px;
									width: 121px;
									height: 46px;" />

								{#if liked}
									<Proxy image="project_like_selected" absolutePlacement="true" style="
										left: 175px;
										top: 16px;" />
								{/if}

								<Hotspot onClick="{toggleLiked}" style="
									left: 170px;
									top: 11px;
									width: 59px;
									height: 40px;" />

								<Hotspot onClick="{toggleFollowing}" style="
									right: 35px;
									top: 8px;
									width: 110px;
									height: 46px;" />
							{/if}
						</Proxy>
					</div>
				{/if} -->

				<div class="overviewContent" class:returnView="{$returnView}">
					<div class="contentContainer">
						<Button className="optionsButton" icon="{OptionsMenuIcon}" disabled="{true}"></Button>
						<Button className="editButton" onClick="{editProjectDetails}" icon="{EditIcon}"></Button>
						<Audience {isPublic} onClick="{togglePublic}" />
						<div class="itemContent">
							<div class="header" class:headerOwner="{isOwner}">{projectTitle}</div>
							<div class="description" class:button="{projectHasDetails && !$showingInfo}" on:click="{projectHasDetails && !$showingInfo ? showProjectInfo : null}">{projectDescription}</div>
						</div>
						{#if projectHasDetails}
							{#if !$showingInfo}
								{#if !$returnView}
									<Button className="readMoreButton" onClick="{showProjectInfo}">read more</Button>
								{/if}
							{:else}
								<Button className="infoCollapseButton" onClick="{hideProjectInfo}" icon="{HideInfoIcon}" />
							{/if}
						{/if}
					</div>
					{#if $showingInfo}
						<div class="projectInfo">
							<Proxy image="project_info_image_1" />
							<Proxy image="project_info_content_1" />
							<Proxy image="project_info_image_2" />
							<Proxy image="project_info_content_2" />
							<Proxy image="project_info_image_3" />
							<Proxy image="project_info_content_3" />
						</div>
					{/if}
					<div class="projectActions">
						<div class="projectActionButtons">
							{#if projectHasDetails && !$showingInfo && $returnView}
								<Button className="readMoreButton" onClick="{showProjectInfo}">read more</Button>
							{:else if !projectHasDetails && isOwner}
								<Button className="addProjectDetailsButton" onClick="{editProjectDetails}" icon="{AddDetailsIcon}">add project details</Button>
							{/if}
							{#if !isOwner}
								<Button className="sendMessageButton" onClick="{e => loadConversation('s0g1la34')}" icon="{SendMessageIcon}">message</Button>
							{:else if isNew && !isPublic}
								<Button className="makePublicButton isButton" onClick="{makePublic}">make public</Button>
							{:else}
								<Button className="messagesButton" href="projects/{$projectId}/messages" icon="{MessagesIcon}">messages
									<Counter count="{unreadMessageCount ? unreadMessageCount : messageCount}" hasNew="{unreadMessageCount}" />
								</Button>
							{/if}
							{#if (!$returnView || $showingInfo) && !isOwner}
								<Button className="likeButton" onClick="{toggleLiked}" icon="{liked ? LikeSelectedIcon : LikeIcon}"><div class="countContainer">
									<div class="count">{likeCount}</div>
								</div></Button>
								<Button className="followButton {!following ? 'isButton' : ''}" onClick="{toggleFollowing}" icon="{following ? FollowSelectedIcon : FollowIcon}">{following ? 'following' : 'follow'}<div class="countContainer">
									<div class="count">{followCount}</div>
								</div></Button>
							{/if}
						</div>
						{#if (!$returnView || $showingInfo) && projectLocation}
							<Location className="{(isOwner && $showingInfo) ? 'ownerLocation' : ''}" location="{projectLocation}" />
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

		padding-left: 23px;
	}

	.overviewContent {
		position: relative;
		background-color: #ffffff;
	}

    .contentContainer :global(.optionsButton) {
		position: absolute;

		top: 13px;
		right: 14px;

		width: 28px;
		height: 26px;
		padding: 8px;
	}

    .contentContainer :global(.editButton) {
		position: absolute;

		top: 16px;
		right: 52px;

		width: 28px;
		height: 26px;
		padding: 8px;
	}

    .contentContainer :global(.audienceButton) {
		position: absolute;
		top: 21px;
		right: 92px;
	}

    .overviewContent :global(.readMoreButton) {
		display: table;

		padding: 10px;
		padding-right: 30px;

    	margin-top: -11px;
		margin-left: -10px;

		font-size: 1.5rem;
		font-weight: 700;
	}

    .overviewContent :global(.addProjectDetailsButton) {
		display: table;

		padding: 10px;
		padding-right: 30px;

    	padding-left: 23px;

		font-size: 1.5rem;
		font-weight: 700;

		color: #DF3C3C;
	}
    .overviewContent :global(.addProjectDetailsButton .icon) {
    	padding-left: 16px;
	}

    .contentContainer :global(.infoCollapseButton) {
		/* display: table; */
		/* position: absolute;
		right: 0; */

    	float: right;
    	margin-top: -25px;

		padding: 10px;
    	padding-left: 20px;
    	padding-right: 40px;
		margin-left: -12px;
	}

	.projectActions {
		position: relative;

		width: 100%;

    	padding-bottom: 6px;
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

    .projectActions :global(.messagesButton) {
    	position: absolute;
		padding: 10px;
    	padding-right: 79px;

    	top: 0;
    	right: 2px;

		font-size: 1.5rem;
		font-weight: 700;

    	margin-top: 4px;
    }
    .projectActions :global(.messagesButton .icon) {
    	margin-left: -3px;
		margin-top: -2px;
	}
    .projectActions :global(.messagesButton .counterContainer) {
    	position: absolute;
    }
    .projectActions :global(.messagesButton .counter) {
    	margin-left: 42px;
    }

    .projectActions :global(.makePublicButton) {
		position: absolute;
		padding: 3px 11px;

		top: 7px;
		right: 22px;

		font-size: 1.5rem;
		font-weight: 700;
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
    .projectActions :global(.isButton) {
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
		padding-top: 23px;
		padding-right: 60px;
		padding-bottom: 5px;
    	line-height: 3rem;
	}

    .headerOwner {
    	padding-right: 160px;
	}

    .description {
		padding: 10px;
		padding-top: 12px;
        padding-right: 50px;

        font-size: 1.5rem;
		line-height: 2rem;

		margin-left: -10px;

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

	.countContainer {
		vertical-align: bottom;
		display: inline-block;
		position: relative;
	}

	.count {
		position: absolute;
		left: 35px;
		bottom: 1px;

		font-size: 1.2rem;
		font-weight: 700;

		color: #777777;
	}

    .projectActions :global(.followButton.isButton .count) {
    	left: 49px;
    }
    .projectActions :global(.followButton .count) {
    	left: 43px;
	}

    .projectActions :global(.followButton.isButton .count) {
    	left: 49px;
	}

	.collapsedOptions :global(.readMoreButton) {
    	padding-left: 23px;
		margin-top: 0;
		margin-left: 0;
	}
	.collapsedOptions .projectActionButtons {
		height: 44px;
    	margin-top: -6px;
	}
	.collapsedOptions :global(.sendMessageButton) {
    	top: 0;
    	right: 18px;
    	margin-top: 0;
	}
	.collapsedOptions :global(.messagesButton) {
    	top: 0;
    	margin-top: 0;
	}

	.projectActions :global(.ownerLocation) {
		padding-bottom: 14px;
		margin-top: -37px;
	}
</style>
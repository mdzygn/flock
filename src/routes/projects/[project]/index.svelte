<script>
	import locale from '../../../locale';
	import config from '../../../config';
	import { menuIds } from '../../../config/menus';
	import { parseHTML } from '../../../utils';

	import { onMount } from 'svelte';

    import Button from '../../../components/Button.svelte';

	import ScrollView from '../../../components/ScrollView.svelte';

	import ActionBar from '../../_components/ActionBar.svelte';
	import ActionButton from '../../_components/ActionButton.svelte';
	import ArchivedBar from '../../_components/ArchivedBar.svelte';
	import Counter from '../../_components/Counter.svelte';
	import Location from '../../_components/Location.svelte';
	import Audience from '../../_components/Audience.svelte';
	import ProjectSkillsList from '../../_components/ProjectSkillsList.svelte';
	import ProjectLinks from '../../_components/ProjectLinks.svelte';
	import ChannelList from '../../_components/ChannelList.svelte';
	import ContentLoader from '../../_components/ContentLoader.svelte';

    import SendMessageIcon from "../../../assets/icons/send.png";
	import OptionsMenuIcon from "../../../assets/icons/menu.png";
	import HideInfoIcon from "../../../assets/icons/collapse.png";
	import AddDetailsIcon from "../../../assets/icons/add_highlight.png";
	import EditIcon from "../../../assets/icons/edit.png";
	import MessagesIcon from "../../../assets/icons/nav_messages.png";

    import LikeIcon from "../../../assets/icons/like.png";
    import LikeSelectedIcon from "../../../assets/icons/like_selected.png";
    import FollowIcon from "../../../assets/icons/follow.png";
	import FollowSelectedIcon from "../../../assets/icons/follow_selected.png";

    import LikesIcon from "../../../assets/icons/likes.png";
    import FollowerIcon from "../../../assets/icons/followers.png";

	import Proxy from '../../../components/Proxy.svelte';
	import Hotspot from '../../../components/Hotspot.svelte';

	import {
		projectId,
		project,
		projectReturnView,
		projectShowingInfo,
		getIsProjectTeamMember,
		showBetaFeatures,
		user,
		userId,
	} from '../../../models/appModel';

	import {
		getProjectHeaderImage,
		getProjectHasDetails,
		loadingProjects,
	} from '../../../models/projectsModel';

	import {
		// loadChannel,
		loadConversation,
		editProjectDetails,
		showProjectInfo,
		hideProjectInfo,
		toggleProjectInfo,
		showProjectFollowers,
		showMenu,
		showTogglePublicDialog,
	} from '../../../actions/appActions';

	import {
		projectToggleFollowing,
		projectToggleLiked,
		unarchiveProject,
	} from '../../../actions/projectActions';

	import Feed from './../../_components/Feed.svelte';

	import ProjectTeamList from './../../_components/ProjectTeamList.svelte';

	import NewPostButton from '../../_components/NewPostButton.svelte';

	$: userLoading = (!($user && $user.loaded) && $userId);

	function toggleFollowing() {
		projectToggleFollowing($projectId);
	}
	function toggleLiked() {
		projectToggleLiked($projectId);
	}

	function showProjectOptions() {
		if (isTeamMember) {
			showMenu(menuIds.PROJECT_OWNER_MENU);
		} else {
			showMenu(menuIds.PROJECT_MENU);
		}
	}

	function unarchiveCurrentProject() {
		unarchiveProject($projectId);
	}

	function getProjectDetailImage(imageId) {
		return config.contentUrl + config.headerImageLibraryFolder + imageId + config.headerImageExtension;
	}

	// let proxyChannelsImage;

	$: isTeamMember = $user && getIsProjectTeamMember($project);
	$: isNew = ($project && $project.isNew) || false;
	$: following = ($project && $project.following) || false;
	$: liked = ($project && $project.liked) || false;
	$: isPublic = ($project && $project.public) || false;

	$: canEdit = (isTeamMember && !$project.archived) || false;
	$: isArchived = (isTeamMember && $project && $project.archived) || false;

	$: unreadMessageCount = ($project && $project.unreadMessageCount) || 0;
	$: messageCount = ($project && $project.messageCount) || 0;

	$: likeCount = ($project && $project.likeCount) || 0;
	$: followCount = ($project && $project.followCount) || 0;

	$: projectSlug = ($project && $project.slug) || null;

    $: headerImage = getProjectHeaderImage($project, true);

    $: projectTitle = ($project && $project.title) || '';
	$: projectDescription = ($project && $project.description) || '';
	$: projectLocation = ($project && $project.location) || '';

    $: projectDescriptionHTML = parseHTML(projectDescription);

	$: projectDetails = ($project && $project.details) || null;

	$: projectHasDetails = getProjectHasDetails($project);
	$: showInfo = $projectShowingInfo && projectHasDetails;

	// $: {
	// 	if (isTeamMember) {
	// 		if (isNew) {
	// 			proxyChannelsImage = 'project_channels_populate';
	// 		} else {
	// 			proxyChannelsImage = 'project_channels_owner';
	// 		}
	// 	} else {
	// 		if (following) {
	// 			proxyChannelsImage = 'project_channels_following';
	// 		} else {
	// 			proxyChannelsImage = 'project_channels';
	// 		}
	// 	}
	// }
</script>

<svelte:head>
	<title>World Creator - Flock</title>
</svelte:head>

<div class="pageContent" class:archived="{isArchived}">
	{#if ($loadingProjects && (!$project || $project.id !== $projectId )) || userLoading || (!$project && $loadingProjects) }
		<ContentLoader label="{locale.LOADING.PROJECT}" />
	{:else if !$project || !$project.id}
		<ContentLoader label="{locale.PROJECT.NOT_FOUND}" />
	{:else}
		<ScrollView id="project" headerStartHidden="{!isArchived}">
			<div class="content">
				<div class="contentItem" class:collapsedOptions="{$projectReturnView && !showInfo}" class:collapsedHeader="{$projectReturnView && !showInfo && !isNew && $showBetaFeatures}">
					<img src="{headerImage}" class="headerImage" class:headerImageCollapsed="{$projectReturnView}" alt="project header image" />

					<div class="overviewContent" class:returnView="{$projectReturnView}">
						<div class="contentContainer">
							<Button className="optionsButton" icon="{OptionsMenuIcon}" onClick="{showProjectOptions}"></Button>
							{#if isTeamMember}
								<Button className="editButton" onClick="{() => editProjectDetails({editingProject: true})}" icon="{EditIcon}" disabled="{!canEdit}"></Button>
								<Audience {isPublic} onClick="{showTogglePublicDialog}" disabled="{!canEdit}" />
							{/if}
							<div class="itemContent">
								<div class="header" class:headerOwner="{isTeamMember}">{projectTitle}</div>
								<div class="description" class:button="{projectHasDetails}" on:click="{projectHasDetails ? toggleProjectInfo : null}">{@html projectDescriptionHTML}</div>
							</div>
							{#if projectHasDetails}
								{#if !showInfo}
									{#if !$projectReturnView}
										<Button className="readMoreButton" onClick="{showProjectInfo}">read more</Button>
									{/if}
								{:else}
									<Button className="infoCollapseButton" onClick="{hideProjectInfo}" icon="{HideInfoIcon}" />
								{/if}
							{/if}
						</div>
						{#if showInfo}
							<div class="projectInfo">
								{#each projectDetails as projectDetailItem, index}
									{#if projectDetailItem.detail}
										{#if projectDetailItem.image}
											{#if projectDetailItem.image === true}
												<Proxy image="project_info_image_{index + 1}" />
											{:else}
												<img class="projectDetailImage" src="{getProjectDetailImage(projectDetailItem.image)}" alt="project header image" />
											{/if}
										{/if}
										<!-- <Proxy image="project_info_content_3" className="proxyOverlay" /> -->
										<div class="projectInfoDetail">{@html parseHTML(projectDetailItem.detail)}</div>
									{/if}
								{/each}
							</div>
						{/if}
						<div class="projectActions">
							<div class="projectActionButtons">
								{#if projectHasDetails && !showInfo && $projectReturnView}
									<Button className="readMoreButton" onClick="{showProjectInfo}">read more</Button>
								{:else if !projectHasDetails && isTeamMember}
									<Button className="addProjectDetailsButton" onClick="{editProjectDetails}" icon="{AddDetailsIcon}">add project details</Button>
								{/if}
								{#if !isTeamMember}
									<Button disabled="{!$showBetaFeatures}" className="sendMessageButton" onClick="{e => loadConversation('s0g1la34')}" icon="{SendMessageIcon}">message</Button>
								{:else if isNew && !isPublic}
									<Button className="makePublicButton isButton" onClick="{showTogglePublicDialog}">make public</Button>
								{:else}
									<Button disabled="{!$showBetaFeatures}" className="messagesButton" href="projects/{$projectId}/messages" icon="{MessagesIcon}">messages
										<Counter count="{unreadMessageCount ? unreadMessageCount : messageCount}" hasNew="{unreadMessageCount}" />
									</Button>
								{/if}
								{#if (!$projectReturnView || showInfo) && !isTeamMember}
									<Button className="likeButton" onClick="{toggleLiked}" icon="{liked ? LikeSelectedIcon : LikeIcon}"><div class="countContainer">
										<div class="count">{likeCount}</div>
									</div></Button>
									<Button className="followButton {!following ? 'isButton' : ''}" onClick="{toggleFollowing}" icon="{following ? FollowSelectedIcon : FollowIcon}">{following ? 'following' : 'follow'}<div class="countContainer">
										<div class="count">{followCount}</div>
									</div></Button>
								{/if}
							</div>
							{#if (!$projectReturnView || showInfo) && projectLocation}
								<Location className="{(isTeamMember && showInfo) ? 'ownerLocation' : ''}" location="{projectLocation}" />
							{/if}
						</div>
					</div>
				</div>

				{#if isNew}
					<ProjectTeamList project="{$project}" />
					{#if $showBetaFeatures}
						<ProjectLinks project="{$project}" />
						<ProjectSkillsList project="{$project}" />
					{/if}
						<!-- <Proxy image="{proxyChannelsImage}" className="contentItem channelsItem" onClick="{e => loadChannel('7m2ldksm')}" /> -->
						<ChannelList project="{project}" />
					{#if $showBetaFeatures}
						{#if canEdit}
							<NewPostButton type="project_post_update" />
						{/if}
					{/if}
				{:else if $projectReturnView}
					<!-- <Proxy image="{proxyChannelsImage}" className="contentItem channelsItem" onClick="{e => loadChannel('7m2ldksm')}" /> -->
					<ChannelList project="{project}" />
					{#if $showBetaFeatures}
						{#if canEdit}
							<NewPostButton type="project_post_update" />
						{/if}
						<ProjectLinks project="{$project}" />
						<ProjectSkillsList project="{$project}" />
					{/if}
					<ProjectTeamList project="{$project}" />
					{#if $showBetaFeatures}
						<div>
							<Proxy image="project_post_1" className="contentItem projectPost" />
							<Proxy image="project_post_2" className="contentItem projectPost" />
							<Proxy image="project_post_3" className="contentItem projectPost" />
						</div>
						{#if canEdit}
							<NewPostButton type="project_post_update" />
						{/if}
					{/if}
				{:else}
					<ProjectTeamList project="{$project}" />
					{#if $showBetaFeatures}
						<ProjectSkillsList project="{$project}" />
						<ProjectLinks project="{$project}" />
					{/if}
					<!-- <Proxy image="{proxyChannelsImage}" className="contentItem channelsItem" onClick="{e => loadChannel('7m2ldksm')}" /> -->
					<ChannelList project="{project}" />
					{#if $showBetaFeatures}
						<div id="post" />
						<div>
							<Proxy image="project_post_1" className="contentItem projectPost" />
							<Proxy image="project_post_2" className="contentItem projectPost" />
							<Proxy image="project_post_3" className="contentItem projectPost" />
						</div>
					{/if}
				{/if}
			</div>

			<div slot="scrollHeader">
				{#if isArchived}
					<ArchivedBar onClick="{unarchiveCurrentProject}"/>
				{:else}
					{#if isTeamMember}
						<ActionBar targetItemId="{$projectId}" targetItem="{$project}">
							<div slot="buttonLeft">
								<ActionButton
									label = "likes"

									icon = "{LikesIcon}"

									targetItem = "{$project}"
									targetItemId = "{$projectId}"

									countProperty= "likeCount"

									buttonContentStyle = "padding-right: 56px;"
									iconStyle = "padding-bottom: 4px; margin-top: 1px;"
								/>
							</div>
							<div slot="buttonMiddle">
								<ActionButton
									label = "followers"

									icon = "{FollowerIcon}"

									targetItem = "{$project}"
									targetItemId = "{$projectId}"

									countProperty= "followCount"

									buttonContentStyle = "padding-right: 56px;"
									iconStyle = "padding-bottom: 4px"
								/>
									<!-- action = "{showProjectFollowers}" -->
							</div>
						</ActionBar>
					{:else}
						<ActionBar targetItemId="{$projectId}" targetItem="{$project}" />
					{/if}
				{/if}
			</div>
		</ScrollView>
	{/if}
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
		height: 245px;
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
	.archived .overviewContent {
    	background-color: #eeeeee;
	}

    .contentContainer :global(.optionsButton) {
		position: absolute;

    	top: 16px;
    	right: 0;

		width: 28px;
		height: 26px;
		padding: 8px;
	}
    .contentContainer :global(.optionsButton .icon) {
		margin-top: 1px;
    	margin-left: 4px;
	}

    .contentContainer :global(.editButton) {
		position: absolute;

		top: 16px;
    	right: 41px;

		width: 28px;
		height: 26px;
    	padding: 8px 6px;
	}

    .contentContainer :global(.audienceButton) {
		position: absolute;
		top: 21px;
    	right: 84px;
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
		padding-right: 45px;

    	padding-left: 23px;

		font-size: 1.5rem;
		font-weight: 700;

		color: #DF3C3C;
	}
    .overviewContent :global(.addProjectDetailsButton .icon) {
    	padding-left: 16px;
	}


	.projectInfo {
    	padding-top: 30px;
	}

	.projectDetailImage {
		width: 100%;
	}

	.projectInfoDetail {
		padding: 22px 23px;
		padding-right: 35px;
    	padding-bottom: 32px;

		font-size: 1.5rem;
		line-height: 2rem;
	}

    .contentContainer :global(.infoCollapseButton) {
		/* display: table; */
		/* position: absolute;
		right: 0; */

		float: left;
		margin-top: -7px;

		padding: 10px;
		padding-left: 20px;
    	padding-right: 105px;
		margin-left: -22px;

    	/* float: right;
    	margin-top: -14px;

		padding: 10px;
    	padding-left: 20px;
    	padding-right: 40px;
		margin-left: -12px; */
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
    .projectActions :global(.followButton .icon) {
		margin-left: 5px;
		margin-top: -2px;
    }
    .projectActions :global(.isButton) {
		border: 2px solid #0B0B0B;
		margin-right: -2px; margin-top: -2px; /* factor in border */
		border-radius: 999px;
    }

	.content .collapsedHeader {
		margin-bottom: 3px;
	}

	.pageContent :global(.proxyOverlay) {
		position: absolute;
		opacity: 0.5;
	}

    .header {
		font-size: 2.4rem;
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

    	min-height: 50px;

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

	.archived :global(.contentPanel) {
    	background-color: #eeeeee;
	}

	/* .archived :global(.channelsItem) {
    	opacity: 0.75;
	} */
	.archived :global(.projectPost) {
    	opacity: 0.5;
	}
</style>
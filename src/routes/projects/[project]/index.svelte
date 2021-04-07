<script>
	import locale from '../../../locale';
	import config from '../../../config';

	import { writable } from 'svelte/store';

	import { menuIds } from '../../../config/menus';
	import {
		getDisplayText,
		stopEvent, 
		gotoAnchor,
	} from '../../../utils';

    import PostTypes from '../../../config/PostTypes';

	import { tick, onMount } from 'svelte';

    import Button from '../../../components/Button.svelte';

	import ScrollView from '../../../components/ScrollView.svelte';

	import ActionBar from '../../_components/ActionBar.svelte';
	import ActionButton from '../../_components/ActionButton.svelte';
	import ArchivedBar from '../../_components/ArchivedBar.svelte';
	import Counter from '../../_components/Counter.svelte';
	import Location from '../../_components/Location.svelte';
	import Audience from '../../_components/Audience.svelte';
	import ProjectCollaboratePanel from '../../_components/ProjectCollaboratePanel.svelte';
	import ProjectSkillsList from '../../_components/ProjectSkillsList.svelte';
	import ProjectLinks from '../../_components/ProjectLinks.svelte';
	import DiscussionFeed from '../../_components/DiscussionFeed.svelte';
	import ContentLoader from '../../_components/ContentLoader.svelte';
	import ProjectPostItem from '../../_components/ProjectPostItem.svelte';

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
    import ShareIcon from "../../../assets/icons/share.png";

    import LikesIcon from "../../../assets/icons/likes.png";
    import FollowerIcon from "../../../assets/icons/followers.png";

	import Proxy from '../../../components/Proxy.svelte';
	import Hotspot from '../../../components/Hotspot.svelte';

	import EditPost from '../../posts/_components/EditPost.svelte';
	import AddPost from '../../posts/_components/AddPost.svelte';

	import {
		projectId,
		project,
		projectReturnView,
		projectShowingInfo,
		getIsProjectTeamMember,
		postType,
		showBetaFeatures,
		user,
		userId,
		isProjectLoaded,
		isUserLoaded,
		loggingIn,
		getHeaderImage,
	} from '../../../models/appModel';

	import {
		getProjectHeaderImage,
		getProjectHasDetails,
		loadingProjects,
	} from '../../../models/projectsModel';

	import PostsModel, {
		getPosts,
	} from '../../../models/postsModel'

	import {
		// loadChannel,
		loadConversationByProject,
		editProjectDetails,
		showProjectInfo,
		hideProjectInfo,
		toggleProjectInfo,
		showProjectFollowers,
		newProjectPost,
		showMenu,
		showTogglePublicDialog,
		showShareProjectDialog,
		checkLoggedIn,
	} from '../../../actions/appActions';

	import {
		projectToggleFollowing,
		projectToggleLiked,
		unarchiveProject,
	} from '../../../actions/projectActions';

	import Feed from './../../_components/Feed.svelte';

	import ProjectTeamList from './../../_components/ProjectTeamList.svelte';

	import NewPostButton from '../../_components/NewPostButton.svelte';

	//$: userLoading = (!($user && $user.loaded) && $userId);

	PostsModel.on('postsUpdated', onPostsUpdated);

	const DISPLAY_BOTTOM_LINK_POST_COUNT = 4;

	function toggleFollowing() {
		projectToggleFollowing($projectId);
	}
	function toggleLiked() {
		projectToggleLiked($projectId);
	}
	
	function shareItem() {
		showShareProjectDialog($projectId);
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
		return getHeaderImage(imageId);
		// return config.SITE_CONTENT_URL + config.headerImageLibraryFolder + imageId + config.headerImageExtension;
	}

	async function addNewProjectPost(event) {
		stopEvent(event);
		if (!checkLoggedIn()) { return; }

		newProjectPost();
		
		if (showAddDiscussionPost) {
			showAddDiscussionPost = false;
		}
		showAddProjectPost = true;
		gotoAnchor('projectPosts');

		if (newProjectPostMessageField) {
			await tick();
			newProjectPostMessageField.focus();
		}
	}

	function hideAddProjectPostPanel() {
		showAddProjectPost = false;
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

	$: projectType = ($project && ($project.projectType || ($project.categories && $project.categories.trim && $project.categories.split(',')[0].trim())));
    $: projectStatus = (($project && $project.status) || locale.PROJECT.DEFAULT_STATUS).toUpperCase();

    $: headerImage = getProjectHeaderImage($project);

    $: projectTitle = ($project && $project.title) || '';
	$: projectDescription = ($project && $project.description) || '';
	$: projectLocation = ($project && $project.location) || '';

    $: projectDescriptionHTML = getDisplayText(projectDescription);

	$: projectDetails = ($project && $project.details) || null;

	$: projectTitleString = ($project && $project.title && $project.title + ' - ') || '';
	
	// $: skills = ($project && $project.skills && getSplitItems($project.skills)) || null;

	// $: forceShowInfo = !following && !isTeamMember;

	$: projectHasDetails = getProjectHasDetails($project);
	$: showInfo = ($projectShowingInfo || forceProjectShowingInfo) && projectHasDetails;
	
	let projectPosts = writable([]);
	$: { projectPosts = getPosts( { projectId: $projectId, type: 'projectPost', sortByCreated: true, createNewSet: true } ) }; // 'thread'
	function onPostsUpdated() {
		projectPosts = getPosts( { projectId: $projectId, type: 'projectPost', sortByCreated: true, createNewSet: true, dontReloadPosts: true } )
	}

	let forceProjectShowingInfo = false;
	let projectStateLoaded = false;

	let showAddDiscussionPost = false;

	let showAddProjectPost = false;
	let newProjectPostMessageField = null;

	let newProjectPostMessage = '';

	$: {
		showAddDiscussionPost;
		onShowAddDiscussionPostChanged();
	}

	$: {
		showAddProjectPost;
		onProjectPostPanelResized();
	}

	let projectPostRegion = null;
	let projectPostPanelHeight = 0;

	async function onProjectPostPanelResized() {
		await tick();

		if (showAddProjectPost) {
			projectPostPanelHeight = (projectPostRegion && projectPostRegion.offsetHeight) || 0;
		} else {
			projectPostPanelHeight = 0;
		}
	}
	
	function onShowAddDiscussionPostChanged() {
		if (showAddDiscussionPost) {
			hideAddProjectPostPanel();
		}
	}

	$: {
		if (!projectStateLoaded) {
			if (isProjectLoaded($project, $projectId) && isUserLoaded($user, $userId, $loggingIn)) {
				if (!isTeamMember && !following) {
					forceProjectShowingInfo = true;
				}
				projectStateLoaded = true;
			}
		}
	}

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
	<title>{projectTitleString}Flock</title>
</svelte:head>

<div class="pageContent" class:archived="{isArchived}">
	{#if ($loadingProjects && (!$project || $project.id !== $projectId )) || !isUserLoaded($user, $userId, $loggingIn) || (!$project && $loadingProjects) }
		<ContentLoader label="{locale.LOADING.PROJECT}" />
	{:else if !$project || !$project.id}
		<ContentLoader label="{locale.PROJECT.NOT_FOUND}" />
	{:else}
		<ScrollView id="project" headerStartHidden="{!isArchived}" headerHideOffset="{$projectReturnView ? config.RETURN_PROJECT_HEADER_OFFSET : 0}" bottomOffset="{projectPostPanelHeight}">
			<div class="content">
				<div class="contentItem" class:collapsedOptions="{$projectReturnView && !showInfo}" class:collapsedHeader="{$projectReturnView && !showInfo && !isNew && $showBetaFeatures}">
					<div style="background-image: url({headerImage})" class="headerImage" alt="project header image" />
					 <!-- class:headerImageCollapsed="{$projectReturnView}" -->

					<div class="overviewContent" class:returnView="{$projectReturnView}">
						<div class="contentContainer">
							<Button className="optionsButton" icon="{OptionsMenuIcon}" onClick="{showProjectOptions}"></Button>
							<Button className="shareButton" onClick="{e => {shareItem(); return stopEvent(e); }}" icon="{ShareIcon}" title="Share" disabled="{isArchived}"></Button>
							{#if isTeamMember}
								<Button className="editButton" onClick="{editProjectDetails}" icon="{EditIcon}" disabled="{!canEdit}"></Button>
								<Audience {isPublic} onClick="{showTogglePublicDialog}" disabled="{!canEdit}" />
							{:else}
								{#if !isArchived}
									<Button className="followButton {!following ? 'isButton' : ''}" onClick="{e => {toggleFollowing(); return stopEvent(e); }}" icon="{following ? FollowSelectedIcon : FollowIcon}" title="{following ? 'Unfollow' : 'Follow'}"></Button>
								{/if}
							{/if}
							<div class="itemContent">
								<div class="header" class:headerOwner="{isTeamMember}">{projectTitle}</div>
								{#if projectStatus}
									<div class="projectStatusLine">
										<div class="projectStatus">{projectStatus}</div>
									</div>
								{/if}
								<div class="description" class:button="{projectHasDetails && !forceProjectShowingInfo}" on:click="{(projectHasDetails && !forceProjectShowingInfo) ? toggleProjectInfo : null}">{@html projectDescriptionHTML}</div>
							</div>
							{#if projectHasDetails}
								{#if !showInfo}
									{#if !$projectReturnView}
										<Button className="readMoreButton" onClick="{showProjectInfo}">read more</Button>
									{/if}
								{:else}
									<div class="overviewHeader" class:button="{!forceProjectShowingInfo}" on:click="{!forceProjectShowingInfo ? hideProjectInfo : null}">{locale.PROJECT.OVERVIEW_HEADER}</div>
								{/if}
								<!-- {:else if !forceProjectShowingInfo}
									<Button className="infoCollapseButton" onClick="{hideProjectInfo}" icon="{HideInfoIcon}" />
								{/if} -->
							{/if}
						</div>
						{#if showInfo}
							<div class="projectInfo" class:forceShowInfo="{forceProjectShowingInfo}">
								{#each projectDetails as projectDetailItem, index}
									{#if projectDetailItem && (projectDetailItem.detail || projectDetailItem.image)}
										{#if projectDetailItem.image}
											{#if projectDetailItem.image === true}
												<Proxy image="project_info_image_{index + 1}" className="projectDetailImage {!projectDetailItem.detail ? 'soloImage' : ''}" />
											{:else}
												<img class="projectDetailImage {!projectDetailItem.detail ? 'soloImage' : ''}" src="{getProjectDetailImage(projectDetailItem.image)}" alt="project detail" />
											{/if}
										{/if}
										<!-- <Proxy image="project_info_content_3" className="proxyOverlay" /> -->
										{#if projectDetailItem.detail}
											<div class="projectInfoDetail" class:noImage="{!projectDetailItem.image}">
												{#if projectDetailItem.title}
													<div class="detailTitle">{projectDetailItem.title}</div>
												{/if}
												<div class="detailText">
													{@html getDisplayText(projectDetailItem.detail)}
												</div>
											</div>
										{/if}
									{/if}
								{/each}
							</div>
						{/if}
						<div class="projectActions">
							<!-- <div class="projectActionButtons"> --><!-- TODO: keep outside but scale height depending on child elements -->
								{#if projectHasDetails && !showInfo && $projectReturnView}
									<div class="projectActionButtons">
										<Button className="readMoreButton" onClick="{showProjectInfo}">read more</Button>
									</div>
								{:else if !projectHasDetails && isTeamMember && !isArchived}
									<div class="projectActionButtons">
										<Button className="addProjectDetailsButton" onClick="{() => editProjectDetails({editingProjectMode: 'addDetails'})}" icon="{AddDetailsIcon}">add project details</Button>
									</div>
								{/if}
								{#if !isTeamMember}
									<!-- <Button disabled="{!$showBetaFeatures}" className="sendMessageButton" onClick="{e => loadConversationByProject($projectId)}" icon="{SendMessageIcon}">message</Button> -->
								{:else if isNew && !isPublic}
									{#if !isArchived}
										<div class="projectActionButtons">
											<Button className="makePublicButton isButton" onClick="{showTogglePublicDialog}">make public</Button>
										</div>
									{/if}
								{:else}
									<!-- <Button disabled="{!$showBetaFeatures}" className="messagesButton" href="projects/{$projectId}/messages" icon="{MessagesIcon}">messages
										<Counter count="{unreadMessageCount ? unreadMessageCount : messageCount}" hasNew="{unreadMessageCount}" />
									</Button> -->
								{/if}
								{#if (!$projectReturnView || showInfo) && !isTeamMember}
									<div class="projectActionButtons">
										<!-- <Button className="likeButton" onClick="{toggleLiked}" icon="{liked ? LikeSelectedIcon : LikeIcon}">like</Button> -->
										<Button className="followButton {!following ? 'isButton' : ''}" onClick="{toggleFollowing}" icon="{following ? FollowSelectedIcon : FollowIcon}">{following ? 'following' : 'follow'}<!-- <div class="countContainer">
											<div class="count">{followCount}</div>
										</div>--></Button>
									</div>
								{/if}
							{#if (!$projectReturnView || showInfo) && (projectType || projectLocation)}
								<div class="infoContainer">
									{#if projectType}
										<Button className="projectType" href="{'discover?search=' + encodeURIComponent(projectType)}" onClick="{e => {e.stopPropagation()}}">{projectType}</Button>
									{/if}
									{#if projectLocation}							
										<Location className="{(isTeamMember && showInfo) ? 'ownerLocation' : ''}" location="{projectLocation}" />
									{/if}
								</div>
							{/if}
						</div>
					</div>
				</div>

				{#if isNew}
					{#if canEdit && !showAddProjectPost}
						<AddPost className="addProjectPost projectHeaderPostPanel" newPostMessage="{newProjectPostMessage}" onClick="{addNewProjectPost}" placeholderLabel="{locale.PROJECT.POST_UPDATE_PLACEHOLDER}" submitLabel="{locale.PROJECT.POST_ACTION}" />
					{/if}
					<ProjectTeamList project="{$project}" />
					<ProjectSkillsList project="{$project}" />
					<ProjectCollaboratePanel project="{$project}" />
					{#if $showBetaFeatures}
						<ProjectLinks project="{$project}" />
					{/if}
					<!-- <Proxy image="{proxyChannelsImage}" className="contentItem channelsItem" onClick="{e => loadChannel('7m2ldksm')}" /> -->
					<DiscussionFeed project="{project}" bind:showAddPost="{showAddDiscussionPost}" />
					<!-- {#if $showBetaFeatures} -->
					<div class="posts" id="projectPosts">
						{#if canEdit && !showAddProjectPost}
							<AddPost className="addProjectPost" newPostMessage="{newProjectPostMessage}" onClick="{addNewProjectPost}" placeholderLabel="{locale.PROJECT.POST_UPDATE_PLACEHOLDER}" submitLabel="{locale.PROJECT.POST_ACTION}" />
							<!-- <NewPostButton label="{locale.PROJECT.POST_UPDATE}" onClick="{newProjectPost}" /> -->
								<!-- type="project_post_update" -->
						{/if}
						{#each $projectPosts as post}
							<ProjectPostItem {post} />
						{/each}
						{#if canEdit && !showAddProjectPost && $projectPosts.length >= DISPLAY_BOTTOM_LINK_POST_COUNT}
							<AddPost className="addProjectPost" newPostMessage="{newProjectPostMessage}" onClick="{addNewProjectPost}" placeholderLabel="{locale.PROJECT.POST_UPDATE_PLACEHOLDER}" submitLabel="{locale.PROJECT.POST_ACTION}" />
						{/if}
					</div>
				{:else if $projectReturnView}
					{#if canEdit && !showAddProjectPost}
						<AddPost className="addProjectPost projectHeaderPostPanel" newPostMessage="{newProjectPostMessage}" onClick="{addNewProjectPost}" placeholderLabel="{locale.PROJECT.POST_UPDATE_PLACEHOLDER}" submitLabel="{locale.PROJECT.POST_ACTION}" />
					{/if}
					<!-- <Proxy image="{proxyChannelsImage}" className="contentItem channelsItem" onClick="{e => loadChannel('7m2ldksm')}" /> -->
					<DiscussionFeed project="{project}" bind:showAddPost="{showAddDiscussionPost}" />
					<!-- {#if $showBetaFeatures} -->
						<!-- {#if canEdit}
							<NewPostButton label="{locale.PROJECT.POST_UPDATE}" onClick="{newProjectPost}" />
						{/if} -->
					{#if $showBetaFeatures}
						<ProjectLinks project="{$project}" />
					{/if}
					<ProjectSkillsList project="{$project}" />
					<ProjectCollaboratePanel project="{$project}" />
					<ProjectTeamList project="{$project}" />
					<div class="posts" id="projectPosts">
						{#if canEdit && !showAddProjectPost}
							<AddPost className="addProjectPost" newPostMessage="{newProjectPostMessage}" onClick="{addNewProjectPost}" placeholderLabel="{locale.PROJECT.POST_UPDATE_PLACEHOLDER}" submitLabel="{locale.PROJECT.POST_ACTION}" />
							<!-- <NewPostButton label="{locale.PROJECT.POST_UPDATE}" onClick="{newProjectPost}" /> -->
						{/if}
						{#each $projectPosts as post}
							<ProjectPostItem {post} />
						{/each}
						{#if canEdit && !showAddProjectPost && $projectPosts.length >= DISPLAY_BOTTOM_LINK_POST_COUNT}
							<AddPost className="addProjectPost" newPostMessage="{newProjectPostMessage}" onClick="{addNewProjectPost}" placeholderLabel="{locale.PROJECT.POST_UPDATE_PLACEHOLDER}" submitLabel="{locale.PROJECT.POST_ACTION}" />
						{/if}
					</div>
					<!-- {#if $showBetaFeatures}
						<div>
							<Proxy image="project_post_1" className="contentItem projectPost" />
							<Proxy image="project_post_2" className="contentItem projectPost" />
							<Proxy image="project_post_3" className="contentItem projectPost" />
						</div>
					{/if} -->
				{:else}
					{#if canEdit && !showAddProjectPost}
						<AddPost className="addProjectPost projectHeaderPostPanel" newPostMessage="{newProjectPostMessage}" onClick="{addNewProjectPost}" placeholderLabel="{locale.PROJECT.POST_UPDATE_PLACEHOLDER}" submitLabel="{locale.PROJECT.POST_ACTION}" />
					{/if}
					<ProjectSkillsList project="{$project}" />
					<ProjectCollaboratePanel project="{$project}" />
					<ProjectTeamList project="{$project}" />
					{#if $showBetaFeatures}
						<ProjectLinks project="{$project}" />
					{/if}
					<!-- <Proxy image="{proxyChannelsImage}" className="contentItem channelsItem" onClick="{e => loadChannel('7m2ldksm')}" /> -->
					<DiscussionFeed project="{project}" bind:showAddPost="{showAddDiscussionPost}" />
					<div class="posts" id="projectPosts">
						{#if canEdit && !showAddProjectPost}
							<AddPost className="addProjectPost" newPostMessage="{newProjectPostMessage}" onClick="{addNewProjectPost}" placeholderLabel="{locale.PROJECT.POST_UPDATE_PLACEHOLDER}" submitLabel="{locale.PROJECT.POST_ACTION}" />
							<!-- <NewPostButton label="{locale.PROJECT.POST_UPDATE}" onClick="{newProjectPost}" /> -->
						{/if}
						{#each $projectPosts as post}
							<ProjectPostItem {post} />
						{/each}
						{#if canEdit && !showAddProjectPost && $projectPosts.length >= DISPLAY_BOTTOM_LINK_POST_COUNT}
							<AddPost className="addProjectPost" newPostMessage="{newProjectPostMessage}" onClick="{addNewProjectPost}" placeholderLabel="{locale.PROJECT.POST_UPDATE_PLACEHOLDER}" submitLabel="{locale.PROJECT.POST_ACTION}" />
						{/if}
					</div>
				{/if}
			</div>

			<div slot="scrollHeader"><div class="pageHeader">
				{#if isArchived}
					<ArchivedBar onClick="{unarchiveCurrentProject}"/>
				{/if}
				<!-- {:else}
					{#if isTeamMember}
						<ActionBar targetItemId="{$projectId}" targetItem="{$project}">
							<div slot="buttonLeft">
								<ActionButton
									label = "likes"

									icon = "{LikesIcon}"

									targetItem = "{$project}"
									targetItemId = "{$projectId}"

									countProperty = "likeCount"
									displayZeroCountValue = "{true}"

									buttonContentStyle = "padding-right: 56px;"
									iconStyle = "padding-bottom: 4px; margin-top: 1px;"
									countStyle = "left: 40px"
								/>
							</div>
							<div slot="buttonMiddle">
								<ActionButton
									label = "followers"

									icon = "{FollowerIcon}"

									targetItem = "{$project}"
									targetItemId = "{$projectId}"

									countProperty = "followCount"
									displayZeroCountValue = "{true}"

									buttonContentStyle = "padding-right: 56px;"
									iconStyle = "padding-bottom: 4px"
									countStyle = "left: 40px"
								/>
							</div>
						</ActionBar>
					{:else}
						<ActionBar targetItemId="{$projectId}" targetItem="{$project}" />
					{/if}
				{/if} -->
			</div></div>
		</ScrollView>
	{/if}

	<EditPost targetPostType="{PostTypes.PROJECT_POST}" className="editProjectPost" shown="{showAddProjectPost}" bind:message="{newProjectPostMessage}" bind:messageField="{newProjectPostMessageField}" inlineComponent="{true}" smallNextButton="{true}" submitLabel="{locale.PROJECT.POST_ACTION}" bind:element="{projectPostRegion}" on:hide="{hideAddProjectPostPanel}" on:resize="{onProjectPostPanelResized}" />
</div>

<style>
	.content {
		width: 100%;

		padding-bottom: 10px;
    	/* line-height: 0; */
	}

	.content :global(.contentItem) {
		width: 100%;

		margin-bottom: 5px;
		/* margin-bottom: 10px; */
	}

	.content :global(.contentPanel) {
		margin-bottom: 5px;
	}

	/* .pageContent :global(.actionBar .actionButtonMiddle .buttonContent) {
		padding-right: 44px;
	} */

	.headerImage {
		width: 100%;
    	padding-top: 59.6%;
    	background-size: cover;
        background-position: center;

		/* height: 245px;
    	object-fit: cover; */

        background-color: #dedede;
	}

	/* .headerImageCollapsed {
		height: 150px;
	} */

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
	
    /* .contentContainer :global(.headerButton) {
        float: right;
        width: 28px;
        height: 28px;
        padding: 6px;
    } */

    .contentContainer :global(.shareButton) {
		position: absolute;
		top: 16px;
		right: 37px;
		width: 28px;
		height: 26px;
		padding: 8px 6px;
    }

	.contentContainer :global(.followButton) {
		position: absolute;
		top: 16px;
		right: 76px;
		width: 28px;
		height: 26px;
		padding: 8px 6px;
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
		/* margin-top: 1px; */
    	margin-left: 4px;
	}

    .contentContainer :global(.editButton) {
		position: absolute;

		top: 16px;
    	right: 76px;

		width: 28px;
		height: 26px;
    	padding: 8px 6px;
	}

    .contentContainer :global(.audienceButton) {
		position: absolute;
		top: 21px;
    	right: 118px;
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

	.overviewHeader {
		padding: 10px;
		padding-right: 30px;
    	padding-top: 2px;

		margin-left: -10px;

		font-size: 1.7rem;
		font-weight: 700;

    	color: #666666;

		user-select: text;
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
    	padding-top: 5px;
    	/* padding-top: 30px; */
	}
	/* .projectInfo.forceShowInfo {
    	padding-top: 20px;
	} */

	.projectDetailImage {
		width: 100%;
	}
	.projectDetailImage.soloImage {
		margin-bottom: 30px;
	}

	.projectInfoDetail {
		padding: 22px 23px;
		/* padding-right: 35px; */
    	padding-bottom: 32px;

		font-size: 1.5rem;
		line-height: 2rem;

		user-select: text;
		
        overflow-wrap: break-word;
        word-wrap: break-word;
	}
	.projectInfoDetail div {
        user-select: text;
	}
    .projectInfoDetail :global(a) {
        user-select: text;
    }
	.projectInfoDetail.noImage {
		padding-top: 0;
	}

	.detailTitle {
		font-size: 1.5rem;
		font-weight: 700;

		color: #444444;

    	padding-bottom: 12px;
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

    /* .projectActions :global(.likeButton) {
		position: absolute;
		top: 4px;
    	right: 140px;
		padding: 8px;
		
		top: 6px;
    	right: 142px;
    	padding-right: 36px;
		font-size: 1.5rem;
    }
    .projectActions :global(.likeButton .iconContainer) {
    	padding-left: 7px;
    } */

    .projectActions :global(.followButton) {
		position: absolute;
		top: 8px;
    	right: 24px;
		/* right: 48px; */
		padding: 6px 41px 6px 18px;

		font-size: 1.5rem;
		font-weight: normal;

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

		font-weight: 700;
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
    	padding-right: 118px;
		padding-bottom: 5px;
		line-height: 3rem;

		user-select: text;
	}

    .headerOwner {
    	padding-right: 188px;
	}

    .description {
		padding: 10px;
		padding-top: 12px;
        padding-right: 23px;
    	padding-bottom: 18px;
        /* padding-right: 50px; */

        font-size: 1.5rem;
		line-height: 2rem;

		margin-left: -10px;

    	min-height: 40px;

		color: #555555;

		user-select: text;
		
        overflow-wrap: break-word;
        word-wrap: break-word;
	}
    .description :global(a) {
        user-select: text;
    }

	.button {
		cursor: pointer;
	}

    .pageContent :global(.pageHeader .actionBar .actionButtonMiddle .buttonContent) {
        margin-right: -11px;
    }

    .pageContent :global(.pageHeader .actionBar .actionButtonRight .buttonContent) {
        margin-right: -20px;
	}

	/* .countContainer {
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
	} */

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

	.posts {
		margin-top: 10px;
	}

	.infoContainer {
        position: relative;
        /* min-height: 42px; */
        padding-right: 104px;
        padding-top: 7px;
    	padding-left: 23px;
	}

    .infoContainer :global(.projectType) {
        display: inline-block;
        padding-bottom: 10px;
        padding-right: 10px;
        font-size: 1.2rem;
        text-decoration: underline;
        color: #888;
    }

    .infoContainer :global(.location) {
        display: inline-block;
        margin-left: -2px;
        margin-top: 0;
        padding: 0;
        padding-bottom: 10px;
    }

    .projectStatusLine {    
        margin-top: -8px;
        margin-bottom: 5px;
        margin-left: -1px;
        padding-right: 23px;
    }

    .projectStatus {
        font-size: 1rem;
        background-color: #eee;
        padding: 0px 6px;
        border-radius: 5px;
        display: inline-block;
    }

    .content :global(.addPostPanel.addProjectPost) {
    	margin-bottom: 5px;
	}
    .content :global(.addPostPanel.addProjectPost textarea) {
		padding: 0px 6px;
		height: 22px;
    	margin-top: 6px;
		border: none;
    	border-bottom: 1px solid #cccccc;
	}
    .content :global(.addPostPanel.projectHeaderPostPanel) {
    	margin-top: -3px;
	}
	
	.pageContent :global(.editPostContent.editProjectPost.inlineComponent .addImage) {
		right: 117px;
	}
	.pageContent :global(.editPostContent.editProjectPost.inlineComponent .removeImage) {
		right: initial;
	}
	.pageContent :global(.addPostPanel.addProjectPost .newMessageArea) {
		padding-right: 120px;
	}

	
	.pageContent :global(.editPostContent.editProjectPost.inlineComponent .pageTitle) {
		padding-bottom: 7px;
		font-size: 1.5rem;
		padding-top: 1px;
	}
	.pageContent :global(.editPostContent.editProjectPost.inlineComponent .collapsePanel) {
		top: 2px;
		right: 2px;
		height: 40px;
	}
</style>
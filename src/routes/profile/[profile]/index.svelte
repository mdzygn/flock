<script>
	import { writable } from 'svelte/store';

	import ScrollView from '../../../components/ScrollView.svelte';

	import Proxy from '../../../components/Proxy.svelte';
    import Hotspot from '../../../components/Hotspot.svelte';

	import ProfileOverview from './../../_components/ProfileOverview.svelte';

	import ContentPanel from './../../_components/ContentPanel.svelte';
	import TagSet from './../../_components/TagSet.svelte';

	import ProjectList from './../../_components/ProjectList.svelte';

	import { getUserProjectsFromId } from '../../../models/projectsModel';

	import { viewedUser, profileDisplayingAllProjects } from '../../../models/appModel';

	import { loadConversation, messageUser, showShareProfileDialog } from '../../../actions/appActions';

	import { requestConnection } from '../../../actions/userActions';

    import {
        getIsCurrentUser,
	} from '../../../models/appModel';

	$: userId = ($viewedUser && $viewedUser.id) || null;

	$: requestedConnection = ($viewedUser && $viewedUser.requestedConnection) || false;
    $: isCurrentUser = getIsCurrentUser($viewedUser && $viewedUser.id);
	// $: isCurrentUser = ($viewedUser && $viewedUser.isCurrentUser) || false;

	$: skills = ($viewedUser && $viewedUser.skills) || null;
	$: projectIds = ($viewedUser && $viewedUser.projects) || null;

	const PROJECTS_DISPLAY_LIMIT = 3;

	let userProjects = writable({});
	$: { getUserProjectsFromId(userProjects, projectIds) }

	$: proxyActionsImage = isCurrentUser ? 'profile_actions_owner' : 'profile_actions';
	$: proxySkillsImage = isCurrentUser ? 'profile_skills_owner' : 'profile_skills';

	function displayAllProjects() {
		$profileDisplayingAllProjects = true;
	}

    function messageCurrentUser() {
        messageUser(userId);
	}

	function shareCurrentProfile() {
		showShareProfileDialog(userId);
	}
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView id="profile" headerStartHidden="{true}">
	<div class="content">
		<div class="contentItem">
			<ProfileOverview />
		</div>
		<!-- <Proxy image="{proxySkillsImage}" className="proxyOverlay" /> -->
		{#if skills && skills.length}
			<ContentPanel title="Skills" showEdit="{isCurrentUser}">
				<TagSet tags="{skills}" />
			</ContentPanel>
		{/if}
		{#if projectIds && projectIds.length}
			<ProjectList projects="{userProjects}" showIfNoProjects="{true}" displayLimit="{$profileDisplayingAllProjects ? 0 : PROJECTS_DISPLAY_LIMIT}" showMoreAction="{displayAllProjects}" />
		{/if}
	</div>

	<div slot="scrollHeader">
		<Proxy image="{proxyActionsImage}">
			{#if isCurrentUser}
				<!-- Connections -->
				<Hotspot href="contacts" style="
					left: 0px;
					top: 0px;
					width: 122px;
					height: 47px;" />

				<!-- Messages -->
				<Hotspot href="messages" style="
					left: 152px;
					top: 0px;
					width: 129px;
					height: 47px;" />

				<!-- Share -->
				<Hotspot onClick="{shareCurrentProfile}" style="
    				right: 0;
					top: 0px;
    				width: 95px;
					height: 47px;" />
			{:else}
				<!-- Request Connect -->
				<Hotspot onClick="{e => requestConnection(userId)}" style="
					left: 0px;
					top: 0px;
					width: 122px;
					height: 47px;" />

				<!-- Action Send Message -->
				<Hotspot onClick="{messageCurrentUser}" style="
					left: 128px;
					top: 0px;
					width: 132px;
					height: 47px;" />

				<!-- Share -->
				<Hotspot onClick="{shareCurrentProfile}" style="
    				right: 0;
					top: 0px;
    				width: 111px;
					height: 47px;" />
			{/if}
		</Proxy>
	</div>
</ScrollView>

<style>
	.content :global(.contentItem) {
		width: 100%;

		margin-bottom: 10px;
	}

	.content :global(.proxyOverlay) {
		position: absolute;
		opacity: 0.5;
	}
</style>
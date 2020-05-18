<script>
	import locale from '../../../locale';
	import { writable } from 'svelte/store';

	import { getSplitItems } from '../../../utils';

	import ScrollView from '../../../components/ScrollView.svelte';

	import Proxy from '../../../components/Proxy.svelte';
    import Hotspot from '../../../components/Hotspot.svelte';

	import ContentLoader from '../../_components/ContentLoader.svelte';
	import ProfileOverview from './../../_components/ProfileOverview.svelte';

	import ContentPanel from './../../_components/ContentPanel.svelte';
	import TagSet from './../../_components/TagSet.svelte';

	import ProjectList from './../../_components/ProjectList.svelte';

	import { getUserProjectsFromId } from '../../../models/projectsModel';

	import {
		viewedUser,
		profileId,
		profileDisplayingAllProjects,
		showBetaFeatures,
		user,
		userId,
		isUserLoaded,
		loggingIn,
	} from '../../../models/appModel';

	import { loadConversation, messageUser, showShareProfileDialog } from '../../../actions/appActions';

	import { requestConnection } from '../../../actions/userActions';

	import { loadingUsers } from '../../../models/usersModel';

    import {
        getIsCurrentUser,
	} from '../../../models/appModel';

	// $: userLoading = (!($user && $user.loaded) && $userId);

	$: viewedUserLoaded = ($viewedUser && $viewedUser.name) || false;
	$: viewedUserId = ($viewedUser && $viewedUser.id) || null;

	$: requestedConnection = ($viewedUser && $viewedUser.requestedConnection) || false;
    $: isCurrentUser = $user && getIsCurrentUser($viewedUser && $viewedUser.id);
	// $: isCurrentUser = ($viewedUser && $viewedUser.isCurrentUser) || false;

	$: skills = ($viewedUser && $viewedUser.skills && getSplitItems($viewedUser.skills)) || null;
	$: projectIds = ($viewedUser && $viewedUser.projects) || null;

	const PROJECTS_DISPLAY_LIMIT = 3;

	let userProjects = writable({});
	$: { getUserProjectsFromId(userProjects, projectIds, null, {filterArchived: false, filterPrivate: false}) }

	$: proxyActionsImage = isCurrentUser ? 'profile_actions_owner' : 'profile_actions';
	$: proxySkillsImage = isCurrentUser ? 'profile_skills_owner' : 'profile_skills';

	function displayAllProjects() {
		$profileDisplayingAllProjects = true;
	}

    function messageCurrentUser() {
        messageUser(viewedUserId);
	}

	function shareCurrentProfile() {
		showShareProfileDialog(viewedUserId);
	}
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

{#if ($loadingUsers && (!viewedUserLoaded || $viewedUser.id !== $profileId )) || !isUserLoaded($user, $userId, $loggingIn) }
	<ContentLoader label="{locale.LOADING.PROFILE}" />
{:else if !viewedUserLoaded || !$viewedUser.id}
	<ContentLoader label="{locale.PROFILE.NOT_FOUND}" />
{:else}
	<ScrollView id="profile" headerStartHidden="{true}">
		<div class="content">
			<div class="contentItem">
				<ProfileOverview />
			</div>
			<!-- <Proxy image="{proxySkillsImage}" className="proxyOverlay" /> -->
            <!-- {#if $showBetaFeatures} -->
				{#if skills && skills.length}
					<ContentPanel title="Skills" showEdit="{false && isCurrentUser}">
						<TagSet tags="{skills}" />
					</ContentPanel>
				{/if}
				{#if $userProjects && $userProjects.length}
					<ProjectList projects="{userProjects}" showIfNoProjects="{true}" displayLimit="{$profileDisplayingAllProjects ? 0 : PROJECTS_DISPLAY_LIMIT}" showMoreAction="{displayAllProjects}" />
				{/if}
			<!-- {/if} -->
		</div>
	</ScrollView>
{/if}

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
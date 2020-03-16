<script>
	import ScrollView from '../../../components/ScrollView.svelte';

	import Proxy from '../../../components/Proxy.svelte';
    import Hotspot from '../../../components/Hotspot.svelte';

	import ProfileOverview from './../../_components/ProfileOverview.svelte';

	import ContentPanel from './../../_components/ContentPanel.svelte';
	import TagSet from './../../_components/TagSet.svelte';

	import ProjectList from './../../_components/ProjectList.svelte';

	import { viewedUser } from '../../../models/appState';

	$: requestedConnection = ($viewedUser && $viewedUser.requestedConnection) || false;
	$: isCurrentUser = ($viewedUser && $viewedUser.isCurrentUser) || false;

	$: skills = ($viewedUser && $viewedUser.skills) || null;

	import { loadConversation } from '../../../actions/appActions';
	import { requestConnection } from '../../../actions/userActions';

	$: proxyActionsImage = isCurrentUser ? 'profile_actions_owner' : 'profile_actions';
	$: proxySkillsImage = isCurrentUser ? 'profile_skills_owner' : 'profile_skills';
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
			<ContentPanel title="Skills" showEdit="{isCurrentUser}" showMoreAction="{true}">
				<TagSet tags="{skills}" />
			</ContentPanel>
		{/if}
		<ProjectList />
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
			{:else}
				<!-- Request Connect -->
				<Hotspot onClick="{e => requestConnection('l40smlp3')}" style="
					left: 0px;
					top: 0px;
					width: 122px;
					height: 47px;" />

				<!-- Action Send Message -->
				<Hotspot onClick="{e => loadConversation('r70dp2bf')}" style="
					left: 128px;
					top: 0px;
					width: 132px;
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
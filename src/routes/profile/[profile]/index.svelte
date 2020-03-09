<script>
	import ScrollView from '../../../components/ScrollView.svelte';

	import Proxy from '../../../components/Proxy.svelte';
    import Hotspot from '../../../components/Hotspot.svelte';

	import ProfileOverview from './../../_components/ProfileOverview.svelte';
	import ProjectList from './../../_components/ProjectList.svelte';

	import { profileId, viewingOwnProfile } from '../../../models/appState';
	import { loadConversation } from '../../../actions/appActions';

	$: proxyActionsImage = $viewingOwnProfile ? 'profile_actions_owner' : 'profile_actions';
	$: proxyOverviewActionsImage = $viewingOwnProfile ? 'profile_overview_owner_actions' : 'profile_overview_actions';
	$: proxySkillsImage = $viewingOwnProfile ? 'profile_skills_owner' : 'profile_skills';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView id="profile">
	<div class="content">
		<div class="contentItem">
			{#if !$viewingOwnProfile}
				<Proxy image="{proxyActionsImage}">
					<!-- Connections -->
					<!--<Hotspot href="contacts" style="
						left: 0px;
						top: 0px;
						width: 122px;
						height: 47px;" />

					<!-- Messages -->
					<!--<Hotspot href="messages" style="
						left: 152px;
						top: 0px;
						width: 129px;
						height: 47px;" />
				{:else}-->
					<!-- Action Send Message -->
					<Hotspot onClick="{e => loadConversation('l40smlp3')}" style="
						left: 128px;
						top: 0px;
						width: 132px;
						height: 47px;" />
				</Proxy>
			{/if}
			<ProfileOverview  isOwner="{$viewingOwnProfile}" />
			<Proxy image="{proxyOverviewActionsImage}">
				{#if !$viewingOwnProfile}
					<!-- Send Message -->
					<Hotspot onClick="{e => loadConversation('l40smlp3')}" style="
						left: 11px;
						top: 7px;
						width: 116px;
						height: 40px;" />
				{/if}
			</Proxy>
		</div>
		<Proxy image="{proxySkillsImage}" className="contentItem" />
		<ProjectList />
	</div>
</ScrollView>

<style>
	.content :global(.contentItem) {
		width: 100%;

		margin-bottom: 10px;
	}
</style>
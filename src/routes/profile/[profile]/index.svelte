<script>
	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';

	import ProfileOverview from './../../_components/ProfileOverview.svelte';
	import ProjectList from './../../_components/ProjectList.svelte';

	import { profileId, viewingOwnProfile } from '../../../models/appState';

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
			<Proxy image="{proxyActionsImage}">
				{#if $viewingOwnProfile}
					<!-- Connections -->
					<a href="contacts" style="
						left: 0px;
						top: 0px;
						width: 122px;
						height: 47px;">&nbsp;</a>

					<!-- Messages -->
					<a href="messages" style="
						left: 152px;
						top: 0px;
						width: 129px;
						height: 47px;">&nbsp;</a>
				{:else}
					<!-- Action Send Message -->
					<a href="messages/l40smlp3" style="
						left: 128px;
						top: 0px;
						width: 132px;
						height: 47px;">&nbsp;</a>
				{/if}
			</Proxy>
			<ProfileOverview  isOwner="{$viewingOwnProfile}" />
			<Proxy image="{proxyOverviewActionsImage}">
				{#if !$viewingOwnProfile}
					<!-- Send Message -->
					<a href="messages/l40smlp3" style="
						left: 11px;
						top: 7px;
						width: 116px;
						height: 40px;">&nbsp;</a>
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
<script>
	import ScrollView from '../../../components/ScrollView.svelte';

	import Proxy from '../../../components/Proxy.svelte';
    import Hotspot from '../../../components/Hotspot.svelte';

	import ProfileOverview from './../../_components/ProfileOverview.svelte';
	import ProjectList from './../../_components/ProjectList.svelte';

	import { profileId, viewingOwnProfile, requestConnectionSent } from '../../../models/appState';

	import { loadConversation } from '../../../actions/appActions';
	import { requestConnection } from '../../../actions/userActions';

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
			<!--{#if !$viewingOwnProfile}
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
					<!--<Hotspot onClick="{e => loadConversation('l40smlp3')}" style="
						left: 128px;
						top: 0px;
						width: 132px;
						height: 47px;" />
				<!--</Proxy>
			{/if}-->
			<ProfileOverview  isOwner="{$viewingOwnProfile}" />
			<Proxy image="{proxyOverviewActionsImage}">
				{#if !$viewingOwnProfile}
					<!-- Send Message -->
					<Hotspot onClick="{e => loadConversation('l40smlp3', {isNew: true})}" style="
						left: 11px;
						top: 7px;
						width: 116px;
						height: 40px;" />

					<!-- Request Sent Notification -->
					{#if $requestConnectionSent}
						<Proxy image="profile_invitation_sent" absolutePlacement="true" style="
							width: 336px;
							height: 104px;

							left: 209.5px;
							top: 2.5px;" />
					{/if}

					<!-- Connect -->
					<Hotspot onClick="{e => requestConnection('l40smlp3')}" style="
						right: 5px;
						top: 7px;
						width: 137px;
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
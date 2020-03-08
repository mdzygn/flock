<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';

	import ProfileOverview from './../_components/ProfileOverview.svelte';
	import ProjectList from './../_components/ProjectList.svelte';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView id="profile">
	<div class="content">
		<div class="contentItem">
			<Proxy image="profile_actions_owner">
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
			</Proxy>
			<ProfileOverview isOwner="{true}" />
			<Proxy image="profile_overview_owner_actions" />
		</div>
		<Proxy image="profile_skills_owner" className="contentItem" />
		<ProjectList />
	</div>
</ScrollView>

<style>
	.content :global(.contentItem) {
		width: 100%;

		margin-bottom: 10px;
	}
</style>
<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';

	import ProfileOverview from './../_components/ProfileOverview.svelte';
	import ProjectList from './../_components/ProjectList.svelte';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<div class="contentItem">
			<Proxy image="profile_actions">
				<!-- Action Connect -->
				<!-- <a href="contacts" style="
					left: 0px;
					top: 0px;
					width: 122px;
					height: 47px;">&nbsp;</a> -->

				<!-- Action Message -->
				<a href="messages/l40smlp3" style="
					left: 128px;
					top: 0px;
					width: 132px;
					height: 47px;">&nbsp;</a>
			</Proxy>
			<ProfileOverview />
			<Proxy image="profile_overview_actions">
				<!-- Send Message -->
				<a href="messages/l40smlp3" style="
					left: 11px;
					top: 7px;
					width: 116px;
					height: 40px;">&nbsp;</a>
			</Proxy>
		</div>
		<Proxy image="profile_skills" className="contentItem" />
		<ProjectList />
	</div>
</ScrollView>

<style>
	.content :global(.contentItem) {
		width: 100%;

		margin-bottom: 10px;
	}
</style>
<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<div class="contentItem">
			<Proxy image="profile_actions">
				<!-- Connect -->
				<!-- <a href="contacts" style="
					left: 0px;
					top: 0px;
					width: 122px;
					height: 47px;">&nbsp;</a> -->

				<!-- Message -->
				<a href="messages/l40smlp3" style="
					left: 128px;
					top: 0px;
					width: 132px;
					height: 47px;">&nbsp;</a>
			</Proxy>
			<Proxy image="profile_overview" />
			<Proxy image="profile_overview_actions">
				<!-- Message -->
				<a href="messages/l40smlp3" style="
					left: 11px;
					top: 7px;
					width: 116px;
					height: 40px;">&nbsp;</a>
			</Proxy>
		</div>
		<Proxy image="profile_skills" className="contentItem" />
		<Proxy image="profile_projects" className="contentItem" />
	</div>
</ScrollView>

<style>
	.content :global(.contentItem) {
		width: 100%;

		margin-bottom: 10px;
	}
</style>
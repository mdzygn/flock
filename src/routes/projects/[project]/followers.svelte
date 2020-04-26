<script>
	import ScrollView from '../../../components/ScrollView.svelte';

	import Proxy from '../../../components/Proxy.svelte';
    import Hotspot from '../../../components/Hotspot.svelte';

	import { project } from '../../../models/appModel';

	import { loadProfile, loadConversation } from '../../../actions/appActions';

	$: projectTitleString = ($project && $project.title && $project.title + ' - ') || '';
</script>

<svelte:head>
	<title>{projectTitleString}Flock</title>
</svelte:head>

<ScrollView id="followers">
	<Proxy image="contacts">
		<!-- Contact Profiles -->
		<Hotspot onClick="{e => loadProfile('bl20a8lm')}" style="
			left: 9px;
			top: 46px;
			width: 256px;
			height: 693px;" />

		<!-- Send Message -->
		<Hotspot onClick="{e => loadConversation('r70dp2bf')}" style="
			right: 7px;
			top: 51px;
			width: 59px;
			height: 678px;" />
	</Proxy>
</ScrollView>

<style>
</style>
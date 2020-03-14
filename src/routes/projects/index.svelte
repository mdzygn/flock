<script>
	import ScrollView from '../../components/ScrollView.svelte';

	import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import { newProject, loadProject } from '../../actions/appActions.js';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView id="projects">
	<Proxy image="projects">
		<Hotspot onClick="{e => loadProject('n4vh55hg')}" style="
			left: 0;
			width: 100%;
			top: 81px;
			height: 196px;" />
		<Hotspot onClick="{e => loadProject('msl30nhg')}" style="
			left: 0px;
			width: 100%;
			top: 359px;
			height: 527px;" />
		<Hotspot onClick="{newProject}" style="
			right: 10px;
			top: 277px;
			width: 142px;
			height: 46px;" />
	</Proxy>
</ScrollView>

<style>
</style>
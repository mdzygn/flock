<script>
	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';
	import Hotspot from '../../../components/Hotspot.svelte';

	import { projectId } from '../../../models/appModel';
	import { saveProjectDetails } from '../../../actions/projectActions.js';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<Proxy image="create_project_2">
			<Hotspot onClick="{saveProjectDetails}" style="
				right: 10px;
				top: 827px;
				width: 108px;
				height: 48px;" />
			<Hotspot href="projects/{$projectId}" style="
				left: 10px;
				top: 827px;
				width: 108px;
				height: 48px;" />
		</Proxy>
	</div>
</ScrollView>

<style>
</style>
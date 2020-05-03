<script>
	import ScrollView from '../../components/ScrollView.svelte';

	import EditPost from './_components/EditPost.svelte';

	import {
		project,
	} from '../../models/appModel';

	$: projectTitleString = ($project && $project.title && $project.title + ' - ') || '';
</script>

<svelte:head>
	<title>{projectTitleString}Flock</title>
	<style>
		body {
			overscroll-behavior-y: contain; /* Disables pull-to-refresh but allows overscroll effects. */
		}
	</style>
</svelte:head>

<ScrollView>
	<div class="content">
		<EditPost />
	</div>
</ScrollView>

<style>
</style>
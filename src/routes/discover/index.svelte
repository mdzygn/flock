<script context="module">
	import { get } from '../../api';

	export function preload({ params, query }) {
		// return this.fetch('/api/projects').then(r => r.json()).then(projects => {
		return get('projects').then(projects => {
			return { projects };
		}).catch(e => { console.error(e); });
	}
</script>

<script>
	import { viewMode, exploreZoomed } from '../../models/appModel';

	import Discover from './_components/Discover.svelte';
	import Explore from './_components/Explore.svelte';
	import ExploreZoomed from './_components/ExploreZoomed.svelte';

	export let projects;

	$: console.log('projects', projects);
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

{#if $viewMode === 'discover'}
	<Discover />
{:else}
	{#if $exploreZoomed}
		<ExploreZoomed />
	{:else}
		<Explore />
	{/if}
{/if}
<script>
	import { viewMode, exploreZoomed } from '../../models/appModel';

	import Discover from './_components/Discover.svelte';
	import Explore from './_components/Explore.svelte';
	import ExploreZoomed from './_components/ExploreZoomed.svelte';
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
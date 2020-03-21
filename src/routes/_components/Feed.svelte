<script>
	import { loadProject } from '../../actions/appActions';

	import Proxy from '../../components/Proxy.svelte';

	export let type = 'feed';
	export let count = 6;
	export let offset = 0;

	export let linkToProjects = false;
</script>

<div class="feed">
	{#each new Array(count) as item, index}
		<div class="feedItem">
			{#if linkToProjects}
				<div class="button" on:click="{e => loadProject('s7djj2s2')}">
					<Proxy image="{type}{((index + offset) % count) + 1}" />
				</div>
			{:else}
				<Proxy image="{type}{((index + offset) % count) + 1}" />
			{/if}
		</div>
	{/each}
</div>

<style>
	.feed {
		width: 100%;

		padding-top: 10px;

    	line-height: 0;
	}

	.feedItem {
		padding-bottom: 10px;
	}

	.button {
		cursor: pointer;
	}
</style>
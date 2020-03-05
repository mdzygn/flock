<script>
	export let type = 'feed';
	export let count = 6;
	export let offset = 0;

	export let linkToProjects = false;
</script>

<div class="feed">
	{#each new Array(count) as item, index}
		<div class="feedItem">
			{#if linkToProjects}
				<a href="projects/m62lsp2o">
					<img src="content/proxy/{type}{((index + offset) % count) + 1}.jpg" alt="post" />
				</a>
			{:else}
				<img src="content/proxy/{type}{((index + offset) % count) + 1}.jpg" alt="post" />
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

	.feedItem img {
		padding-bottom: 10px;
	}

	.feedItem img {
		width: 100%;
	}
</style>
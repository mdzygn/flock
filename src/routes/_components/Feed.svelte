<script>
	export let type = 'feed';
	export let count = 6;
</script>

<div class="feed">
	{#each new Array(count) as item, index}
		<div class="feedItem">
			<img src="content/proxy/{type}{index + 1}.jpg" alt="post" />
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
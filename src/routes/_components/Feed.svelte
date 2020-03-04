<script>
	let numNewsItems = 6;

	export let type = 'proxy';
</script>

<div class="feed">
	{#each new Array(numNewsItems) as item, index}
		<div class="feedItem">
			<img src="content/{type}/feed{index + 1}.jpg" alt="post" />
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
<script>
	let numNewsItems = 6;
</script>

<div class="feed">
	{#each new Array(numNewsItems) as item, index}
		<div class="feedItem">
			<img src="content/proxy/feed{index + 1}.jpg" />
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
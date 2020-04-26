<script>
	export let status;
	export let error;

	const dev = (!!process.env.NODE_ENV.match(/development|staging/));

	$: {
		// refresh page if imported module failed - likely site was updating
		if (typeof window !== 'undefined' && error && error.message.indexOf('Failed to fetch dynamically imported module') !== -1) {
			status = '';
			error.message = '';
			error = error;

			window.setTimeout(() => {
				location.href = location.href;
			}, 1000); // give delay to avoid infinite loop
		}
	}
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<div class="content">
	<h1>{status}</h1>

	<p>{error.message}</p>

	{#if dev && error.stack}
		<pre>{error.stack}</pre>
	{/if}
</div>

<style>
	/* seems to need any css to compile */
	* {
	}

	.content {
		padding: 20px;
	}

	.content pre {
    	overflow-x: scroll;
	}
</style>
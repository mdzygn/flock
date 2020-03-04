<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`projects/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { project: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let project;
</script>

<svelte:head>
	<title>{project.title} - Flock</title>
</svelte:head>

<div class="content">
	<h1>{project.title}</h1>

	<div class='bodyContent'>
		{@html project.html}
	</div>
</div>

<style>
	.content {
		padding: 20px;
	}

	/* .content :global(p) {
	}*/
</style>
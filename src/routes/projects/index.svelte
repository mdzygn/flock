<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`projects.json`).then(r => r.json()).then(projects => {
			return { projects };
		});
	}
</script>

<script>
	import Feed from './../_components/Feed.svelte';

	// export let projects;
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<Feed />

<!-- <div class="content">

	<ul>
		{#each projects as project}
			<li><a rel='prefetch' href='projects/{project.slug}'>{project.title}</a></li>
		{/each}
	</ul>

</div> -->

<style>
	.content {
		padding: 20px;
	}

	ul {
    	padding: 0;
	}

	ul li {
		list-style-type: none;
	}
</style>
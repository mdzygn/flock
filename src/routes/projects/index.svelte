<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`projects.json`).then(r => r.json()).then(projects => {
			return { projects };
		});
	}
</script>

<script>
	export let projects;
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="content">

	<!-- <h1>Test</h1>

	<h2>Test</h2>

	<h3>Test</h3> -->

	<ul>
		{#each projects as project}
			<!-- we're using the non-standard `rel=prefetch` attribute to
					tell Sapper to load the data for the page as soon as
					the user hovers over the link or taps it, instead of
					waiting for the 'click' event -->
			<li><a rel='prefetch' href='projects/{project.slug}'>{project.title}</a></li>
		{/each}
	</ul>

</div>

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
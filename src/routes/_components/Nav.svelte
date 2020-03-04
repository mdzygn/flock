<script>
	export let segment;
</script>

<nav>
	<ul>
		<li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>home</a></li>
		<li><a aria-current='{segment === "discover" ? "discover" : undefined}' href='discover'>discover</a></li>
		<li><a rel=prefetch aria-current='{segment === "projects" ? "page" : undefined}' href='projects'>projects</a></li>
		<li><a rel=prefetch aria-current='{segment === "activity" ? "page" : undefined}' href='activity'>activity</a></li>
		<li><a rel=prefetch aria-current='{segment === "messages" ? "page" : undefined}' href='messages'>messages</a></li>
	</ul>
</nav>

<style>
	nav {
		box-sizing: border-box;

		/* border-bottom: 1px solid rgba(255,62,0,0.1); */
		font-weight: 300;
		padding: 0 1em;

		bottom: 0;
		position: absolute;

		width: 100%;
		height: 87px;

		box-shadow: 0 -2px 5px 0 rgba(0,0,0,0.15);
	}

	a {
		text-decoration: none;
		padding: 1em 0.35em;
		display: block;

    	font-size: 0.98em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: #333333;
		display: block;
		bottom: -1px;
	}
</style>
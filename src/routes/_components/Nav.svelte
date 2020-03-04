<script>
	import NavIcon from "../../components/NavIcon.svelte";
	import sections from "../../models/sections.js";

	export let segment;
</script>

<nav>
	<ul>
		{#each sections as section}
			<li><a aria-current='{segment === section.segment ? "page" : undefined}' href='{section.segment ? section.segment : "."}' title='{section.label}'>
				<NavIcon iconId='{section.id}' active='{segment === section.segment}' label='{section.label}' />
			</a></li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		box-sizing: border-box;

		/* border-bottom: 1px solid rgba(255,62,0,0.1); */
		font-weight: 300;
		padding: 0 10px;

		bottom: 0;
		position: absolute;

		width: 100%;
    	height: 76px;

		background: #ffffff;
		box-shadow: 0 -2px 5px 0 rgba(0,0,0,0.15);
	}

	a {
		text-decoration: none;
    	padding: 10px 0;
		display: block;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	ul {
		margin: 0;
		padding: 0;

		display: flex;
		justify-content: space-between;
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

  		flex: 1;
	}

	/* [aria-current] {
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
	} */
</style>
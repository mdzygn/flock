<script>
	import NavIcon from "../../components/NavIcon.svelte";
	export let segment;

	let sections = [
		{segment: undefined, iconId: 'home'},
		{segment: 'discover', iconId: 'discover'},
		{segment: 'projects', iconId: 'following'},
		{segment: 'activity', iconId: 'activity'},
		{segment: 'messages', iconId: 'messages'},
	];
</script>

<nav>
	<ul>
		{#each sections as section}
			<li><a aria-current='{segment === section.segment ? "page" : undefined}' href='{section.segment ? section.segment : "."}'>
				<NavIcon iconId='{section.iconId}' active='{segment === section.segment}' />
			</a></li>
		{/each}
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

		background: #ffffff;
		box-shadow: 0 -2px 5px 0 rgba(0,0,0,0.15);
	}

	a {
		text-decoration: none;
		padding-top: 16px;
		display: block;

		/* font-size: 0.98em; */

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
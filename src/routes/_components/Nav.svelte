<script>
	import NavHomeIcon from "../../components/icons/NavHomeIcon.svelte";
	import NavExploreIcon from "../../components/icons/NavExploreIcon.svelte";
	import NavFollowingIcon from "../../components/icons/NavFollowingIcon.svelte";
	import NavActivityIcon from "../../components/icons/NavActivityIcon.svelte";
	import NavMessagesIcon from "../../components/icons/NavMessagesIcon.svelte";

	export let segment;

	let sections = [
		{segment: undefined, icon: NavHomeIcon},
		{segment: 'discover', icon: NavExploreIcon},
		{segment: 'projects', icon: NavFollowingIcon},
		{segment: 'activity', icon: NavActivityIcon},
		{segment: 'messages', icon: NavMessagesIcon},
	];
</script>

<nav>
	<ul>
		{#each sections as section}
			<li><a aria-current='{segment === section.segment ? "page" : undefined}' href='{section.segment ? section.segment : "."}'>
				<svelte:component this={section.icon} active='{segment === section.segment}'/>
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

		box-shadow: 0 -2px 5px 0 rgba(0,0,0,0.15);
	}

	a {
		text-decoration: none;
		padding: 22px 0;
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
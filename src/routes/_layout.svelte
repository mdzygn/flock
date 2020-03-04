<script>
	import HeaderBar from './_components/HeaderBar.svelte';
	import Nav from './_components/Nav.svelte';

	export let segment;
</script>

<appContent>
	<HeaderBar {segment}/>
	<Nav {segment}/>

	<main>
		<slot></slot>
	</main>
</appContent>

<style>
	@media (min-width: 480px) {
		appContent {
			position: absolute;

			width: 100%;
			height: 100%;

			max-width: 375px;
			max-height: 667px;

			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);

			border: 1px solid #e0e0e0;
        	box-shadow: rgba(8, 8, 8, 0.2) 0px 5px 30px -5px;
		}
	}

	main {
		padding: 1.5em;

        margin-top: 60px; /* header height */
	}

</style>
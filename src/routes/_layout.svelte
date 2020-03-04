<script>
	import HeaderBar from './_components/HeaderBar.svelte';
	import Nav from './_components/Nav.svelte';

	export let segment;
</script>

<appContainer>
	<appContent>
		<pageContent>
			<main>
				<slot></slot>
			</main>
		</pageContent>
		<HeaderBar {segment}/>
		<Nav {segment}/>
	</appContent>
</appContainer>

<style>
	@media (min-width: 480px) {
		appContainer {
			position: absolute;
			height: 100%;
			width: 100%;

			display:flex;
			align-items: center;
			justify-content: center;
		}

		appContent {
			position: relative;

			/* position: absolute;

			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%); */

			width: 100%;
			height: 100%;

			max-width: 375px;
			max-height: 667px;

			border: 1px solid #e0e0e0;
        	box-shadow: rgba(8, 8, 8, 0.2) 0px 5px 30px -5px;
		}
	}

	pageContent {
		position: absolute;
		top: 60px; /* header height */
		bottom: 76px; /* nav height */
		width: 100%;

		background-color: #DDDDDD;

		overflow: hidden;
		overflow-y: scroll;

		-ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
	}

	pageContent::-webkit-scrollbar {
		/* Hide scrollbar for Chrome, Safari and Opera */
		display: none;
	}

	main {
		position: absolute;
	}

</style>
<script>
	import { stores } from '@sapper/app';
	// import { afterUpdate } from 'svelte';

	const { page } = stores();

	import ScrollView from '../components/ScrollView.svelte';
	import HeaderBar from './_components/HeaderBar.svelte';
	import Nav from './_components/Nav.svelte';

	export let segment;
	$: path = $page ? $page.path : '';

	let scrollRegion;

	$: showFeedBg = (segment === undefined || segment === 'discover');

	// afterUpdate(() => {
	// 	console.log('afterUpdate scrollRegion.scrollHeight: ' + scrollRegion.scrollHeight)
	// 	switch (segment) {
	// 		case 'message_view':
	// 			scrollRegion.scrollTo(0, scrollRegion.scrollHeight);
	// 			break;
	// 	}
	// });
</script>

<appContainer>
	<appContent class:showFeedBg="{showFeedBg}">
		<div class="pageContent">
			<ScrollView>
				<main>
					<slot></slot>
				</main>
			</ScrollView>
		</div>
		<HeaderBar {segment} {path} />
		<Nav {segment} {path} />
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

	.pageContent {
		position: absolute;
		top: 60px; /* header height */
		bottom: 76px; /* nav height */
		width: 100%;
	}

	/* .pageContent {
		position: absolute;
		top: 60px;
		bottom: 76px;
		width: 100%;

		overflow: hidden;
		overflow-y: scroll;

		-ms-overflow-style: none;
	}

	.pageContent::-webkit-scrollbar {
		display: none;
	} */

	.showFeedBg {
		background-color: #DDDDDD;
	}

	main {
		position: absolute;
		height: 100%;
		width: 100%;

    	line-height: 0;
	}

</style>
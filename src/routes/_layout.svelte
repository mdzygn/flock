<svelte:window bind:innerHeight={viewHeight} bind:innerWidth={viewWidth} />

<script>
	import { stores } from '@sapper/app';
	const { page } = stores();
	import { onMount, tick } from 'svelte';

	import config from '../config';

    import GoogleAnalytics from '../components/GoogleAnalytics.svelte';

	import { isDarkBgForPath } from "../models/sectionsModel.js";

	import ScrollView from '../components/ScrollView.svelte';
	import HeaderBar from './_components/HeaderBar.svelte';
	import Nav from './_components/Nav.svelte';
	import Overlays from './_components/Overlays.svelte';

	import DesktopWarning from './_components/DesktopWarning.svelte';
	import Splash from './_components/Splash.svelte';

	export let segment;
	$: path = ($page && $page.path) || '';

	import {
		loadProject,
		loadConversation,
		loadProfile,
		loadChannel,
		loadPost,
		closeOverlay,
	} from '../actions/appActions';

	import {
		curPath,
		prevPath,

		projectId,
		conversationId,
		profileId,
		channelId,
		postId,

		conversation,
		viewedUser,
		project,
		post,

		channel,

		checkParams,
	} from '../models/appModel';

	let mounted = false;
    onMount(() => {
		mounted = true;
    });

	$: {
		const changedPath = ($curPath !== $page.path);

		if ($curPath !== $page.path) {
			if ($prevPath !== $curPath) {
				$prevPath = $curPath;
			}
			$curPath = $page.path;

			console.log('curPath', $curPath, 'prevPath', $prevPath);
		}

		checkParams($page.query);

		if (mounted) {
			const params = $page.params;
			if (params) {
				if (params.conversation) {
					if ($conversationId !== params.conversation || !$conversation) {
						loadConversation(params.conversation);
					}
				}
				if (params.profile) {
					if ($profileId !== params.profile || !$viewedUser) {
						loadProfile(params.profile);
					}
				}
				if (params.project) {
					if ($projectId !== params.project || !$project) {
						loadProject(params.project);
					}
				}
				if (params.channel) {
					if ($channelId !== params.channel || !$channel) {
						loadChannel(params.channel);
					}
				}
				if (params.post) {
					if ($postId !== params.post || !$post) {
						loadPost(params.post);
					}
				}
			}

			if (changedPath) {
				closeOverlay();
			}
		}
	}

	let viewHeight;
	let viewWidth;

	let prevViewHeight = 0;
	let curViewHeight = 0;

	let initialHeightSet = false;
	let initialHeight = false;
	let keyboardShown = false;

	let landscapeScrollMode = false;

	$: {
		if (!initialHeightSet) {
			initialHeight = viewHeight;
			if (initialHeight) {
				initialHeightSet = true;
			}
		} else if (viewHeight && viewWidth < config.MOBILE_DEVICE_MAX_WIDTH && viewHeight < initialHeight) {
			keyboardShown = true;
		} else {
			keyboardShown = false;
		}
	}

	$: {
		prevViewHeight = curViewHeight || viewHeight;
		const newLandscapeScrollMode = viewHeight < config.MOBILE_DEVICE_MAX_HEIGHT;
		curViewHeight = viewHeight;

		if (newLandscapeScrollMode !== landscapeScrollMode) {
			let curScrollView = document.getElementsByClassName('scrollView');
			curScrollView = (curScrollView && curScrollView[0]) || null;

			let curScrollPosition = 0;

			if (curScrollView) {
				if (landscapeScrollMode) {
					curScrollPosition = document.documentElement.scrollTop;
					// console.log('document.documentElement.scrollTop', document.documentElement.scrollTop);
				} else {
					curScrollPosition = curScrollView.scrollTop;
					// console.log('curScrollView.scrollTop', curScrollView.scrollTop);
				}
				// console.log('origScrollPosition', curScrollPosition);
				curScrollPosition += prevViewHeight/2;
				// console.log('curScrollPosition', curScrollPosition, prevViewHeight/2);

				landscapeScrollMode = newLandscapeScrollMode;

				(async () => {
					await tick();
					if (curScrollView) {
						curScrollPosition -= curViewHeight/2;
						// console.log('output curScrollPosition', curScrollPosition, curViewHeight/2);
						if (landscapeScrollMode) {
							document.documentElement.scrollTop = curScrollPosition;
							// console.log('new document.documentElement.scrollTop', document.documentElement.scrollTop);
						} else {
							curScrollView.scrollTop = curScrollPosition;
							// console.log('new curScrollView.scrollTop', curScrollView.scrollTop);
						}
					}
				})();
			} else {
				landscapeScrollMode = newLandscapeScrollMode;
			}
		}
	}

	$: showFeedBg = isDarkBgForPath(path);

	let scrollRegion;
</script>

<appContainer>
	<GoogleAnalytics />
	<appContent class:showFeedBg="{showFeedBg}">
		<DesktopWarning />
		<Splash />
		<Overlays />
		<div class="pageContent" class:landscapeScrollMode="{landscapeScrollMode}" class:keyboardShown="{keyboardShown}">
			<main>
				<slot></slot>
			</main>
		</div>
		<HeaderBar {segment} {path} />
		<Nav {segment} {path} {keyboardShown} />
	</appContent>
</appContainer>

<style>
	appContent {
		position: absolute;

		width: 100%;
		height: 100%;
	}

	.pageContent {
		position: absolute;
		top: 60px; /* header height */
		bottom: 76px; /* nav height */
		width: 100%;
	}

	@media (min-width: 480px) and (min-height: 480px) {
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

			max-width: 411px;
			max-height: 720px;

			border: 1px solid #e0e0e0;
        	box-shadow: rgba(8, 8, 8, 0.2) 0px 5px 30px -5px;
		}
	}

	.pageContent.keyboardShown {
		bottom: 0; /* collapse nav */
	}

	@media (max-height: 480px) {
		appContent :global(.headerBar) {
			display: none;
		}

		appContent :global(nav) {
			display: none;
		}

		/* appContent {
			height: 120%;
		} */

		.pageContent {
			top: 0;
			bottom: 0;
			/* position: relative; */
		}
		/* .pageContent :global(.content) {
			position: relative;
		}
		.pageContent :global(.scrollView) {
			position: relative;
		} */
	}

	.pageContent.landscapeScrollMode {
		position: relative;
	}
	.pageContent.landscapeScrollMode :global(.content) {
		position: relative;
	}
	.pageContent.landscapeScrollMode :global(.scrollView) {
		position: relative;
	}

	.showFeedBg {
		background-color: #DDDDDD;
	}

	main {
		position: absolute;
		height: 100%;
		width: 100%;

    	/* line-height: 0; */
	}

</style>
<script>
	import { stores } from '@sapper/app';
	const { page } = stores();

	import { isDarkBgForPath } from "../models/sectionsModel.js";

	import ScrollView from '../components/ScrollView.svelte';
	import HeaderBar from './_components/HeaderBar.svelte';
	import Nav from './_components/Nav.svelte';

	export let segment;
	$: path = ($page && $page.path) || '';

	import {
		loadProject,
		loadConversation,
		loadProfile,
	} from '../actions/appActions';

	import {
		curPath,
		projectId,
		conversationId,
		profileId,

		conversation,
		viewedUser,
		project,
	} from '../models/appModel';
	$: {
		$curPath = $page.path;

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
		}
	}

	$: showFeedBg = isDarkBgForPath(path);

	let scrollRegion;
</script>

<appContainer>
	<appContent class:showFeedBg="{showFeedBg}">
		<div class="pageContent">
			<main>
				<slot></slot>
			</main>
		</div>
		<HeaderBar {segment} {path} />
		<Nav {segment} {path} />
	</appContent>
</appContainer>

<style>
	appContent {
		position: absolute;

		width: 100%;
		height: 100%;
	}

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

			max-width: 411px;
			max-height: 720px;

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
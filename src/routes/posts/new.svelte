<script>
	import locale from '../../locale';
	import {
		testInputDefocus,
		getUnformattedText,
	} from '../../utils';

	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';

	import Button from '../../components/Button.svelte';

	import ImageSelectionBox from '../_components/ImageSelectionBox.svelte';

    import NextArrowIcon from "../../assets/icons/next_arrow.png";

	import {
		channel,
		channelId,
		projectId,
		postType,
		postId,
	} from '../../models/appModel';

	import {
		loadCurrentChannel,
	} from '../../actions/appActions';

	import {
		createPost,
	} from '../../actions/postActions';

	import { loadChannels } from '../../models/channelsModel';

	let title = '';
	let message = '';
	// let image = null; // 'header2';

	let titleField;
	let messageField;

	loadCurrentChannel();

    // $: titleField && titleField.focus();

	$: nextEnabled = title || message;

	$: showTitleField = ($postType === 'thread');

	function createNewPost() {
		if ($postType) {
			const postDetails = {
				message: getUnformattedText(message),
				type: $postType,
				channelId: $channel && $channel.id,
				projectId: $channel && $channel.projectId,
			};
			switch ($postType) {
				case 'thread':
					postDetails.title =title;
					break;
				case 'threadPost':
					postDetails.threadId = $postId;
					break;
			}
			createPost(postDetails);
		}
	}

	function testSubmit() {
		if (nextEnabled) {
			createNewPost();
		}
	}

</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<!-- <Proxy image="create_project" className="proxyOverlay" /> -->
		<div class="panelContent">
			{#if showTitleField}
				<div class="field">
					<div class="label">{locale.NEW_THREAD.TITLE}</div>
					<!-- <input type="text" bind:value="{title}" bind:this="{titleField}" on:keypress="{e => testInputDefocus(e, {target: messageField})}" /> -->
					<textarea class="titleField" bind:value="{title}" bind:this="{titleField}" on:keypress="{e => testInputDefocus(e, {target: messageField})}" />
				</div>
			{/if}
			<div class="field messageField">
				<div class="label">{locale.NEW_THREAD.MESSAGE}</div>
        		<textarea bind:value="{message}" bind:this="{messageField}" />
				<!-- on:keypress="{e => testInputDefocus(e, {action: testSubmit})}" -->
			</div>
			<!-- <div class="field headerImageField">
				<div class="label headerImageLabel">{locale.NEW_PROJECT.HEADER_IMAGE}</div>
				<ImageSelectionBox bind:image />
			</div> -->
			<div class="actions">
				<Button className="nextButton" disabled="{!nextEnabled}" onClick="{createNewPost}" icon="{NextArrowIcon}">{locale.NEW_THREAD.CONFIRM}</Button>
			</div>
		</div>
	</div>
</ScrollView>

<style>
	.panelContent {
    	padding: 28px 0;
	}

	.field {
    	padding: 0 21px;
		padding-bottom: 5px;
	}

	.messageField {
    	padding-bottom: 10px;
    	/* padding-bottom: 18px; */
	}

	.label {
		font-size: 1.3rem;
    	padding-left: 4px;
    	padding-bottom: 4px;
		color: #555555;
	}

	textarea {
        border: 1px solid #999999;

        outline: none;
        background: none;

        width: 100%;
		height: 142px;

        box-sizing: border-box;

        font-size: 1.5rem;
    	color: #555555;

        padding: 6px 4px;

    	margin-top: 4px;

		resize: none;
	}

	.titleField {
		height: 32px;
		/* height: 52px; */
	}

	/* .headerImageField {
    	padding: 0;
	}

	.headerImageLabel {
    	padding-left: 25px;
    	padding-right: 21px;
	}

	.headerImageField :global(.imageSelectionBox) {
		height: 220px;
    	margin-top: 10px;
	} */

	.actions {
		position: relative;
		height: 60px;
		/* margin-top: 10px; */
	}

	.content :global(.nextButton) {
        position: absolute;
		top: 3px;
		right: 12px;

		padding: 10px;
		padding-right: 39px;

        font-size: 1.5rem;
        font-weight: 700;
    }
    /* .content :global(.nextButton.disabled) {
		opacity: 0.15;
    } */
    .content :global(.nextButton .icon) {
    	padding-left: 20px;
    	margin-top: -1px;
    }
</style>
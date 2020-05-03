<script>
	import locale from '../../../locale';

	import { onMount, tick } from 'svelte';

	import {
		testInputDefocus,
		getUnformattedText,
	} from '../../../utils';

	import Proxy from '../../../components/Proxy.svelte';

	import Button from '../../../components/Button.svelte';

	import ImageSelectionBox from '../../_components/ImageSelectionBox.svelte';

    import NextArrowIcon from "../../../assets/icons/next_arrow.png";
	import SaveIcon from "../../../assets/icons/save.png";

	import {
		channel,
		channelId,
		projectId,
		postType,
        postId,
        post,
        project,
        curPath,
	} from '../../../models/appModel';

	import {
		loadCurrentChannel,
	} from '../../../actions/appActions';

	import {
        createPost,
        savePost,
	} from '../../../actions/postActions';

	import { loadChannels } from '../../../models/channelsModel';

	let title = '';
	let message = '';

	let titleField;
	let messageField;

    loadCurrentChannel();

    $: editPost = ($curPath && $curPath.match(/posts\/.+\/edit/)) || false;

    $: nextEnabled = title || message;

    $: curPostType = (editPost && $post) ? $post.type : $postType;

	$: showTitleField = (curPostType === 'thread');

	$: pageTitle = (curPostType === 'thread') ? (
        editPost ? locale.EDIT_THREAD.PAGE_TITLE : locale.NEW_THREAD.PAGE_TITLE
    ) : (
        editPost ? locale.EDIT_THREAD_POST.PAGE_TITLE : locale.NEW_THREAD_POST.PAGE_TITLE
    );

    let editPostInitialized = false;

    $: {
        if (editPost && $post && !editPostInitialized) {
            editPostInitialized = true;

            title = ($post && $post.title) || '';
            message = ($post && $post.message) || '';
        }
    }

    onMount(async () => {
		await tick();
		if (showTitleField) {
			titleField && titleField.focus();
		} else {
			messageField && messageField.focus();
		}
    });

	function createNewPost() {
		if (!editPost && $postType) {
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

    function saveCurrentPost() {
		if (editPost) {
            const postDetails = {
                title,
                message,
            };

            savePost(postDetails);
        }
    }

	function testSubmit() {
		if (nextEnabled) {
            if (editPost) {
                saveCurrentPost();
            } else {
                createNewPost();
            }
		}
	}
</script>

{#if !editPost || $post }
    <div class="editPostContent">
        <!-- <Proxy image="create_project" className="proxyOverlay" /> -->
        <div class="panelContent">
            <div class="pageTitle">{pageTitle}</div>
            {#if showTitleField}
                <div class="field">
                    <div class="label">{locale.NEW_THREAD.TITLE}{#if !editPost}<span class="tip">{@html locale.NEW_THREAD.TITLE_TIP}</span>{/if}</div>
                    <!-- <input type="text" bind:value="{title}" bind:this="{titleField}" on:keypress="{e => testInputDefocus(e, {target: messageField})}" /> -->
                    <textarea class="titleField" bind:value="{title}" bind:this="{titleField}" on:keypress="{e => testInputDefocus(e, {target: messageField, action: testSubmit, actionOnCtrl: true})}" />
                </div>
            {/if}
            <div class="field messageField">
                <div class="label">{locale.NEW_THREAD.MESSAGE}</div>
                <textarea bind:value="{message}" bind:this="{messageField}" on:keypress="{e => testInputDefocus(e, {action: testSubmit, actionOnCtrl: true})}" />
                <!-- on:keypress="{e => testInputDefocus(e, {action: testSubmit})}" -->
            </div>
            <!-- <div class="field headerImageField">
                <div class="label headerImageLabel">{locale.NEW_PROJECT.HEADER_IMAGE}</div>
                <ImageSelectionBox bind:image />
            </div> -->
			{#if !editPost}
				<div class="fieldNote">{@html locale.NEW_THREAD.EDIT_NOTE}</div>
			{/if}
            <div class="actions">
                {#if !editPost}
                    <Button className="nextButton" disabled="{!nextEnabled}" onClick="{createNewPost}" icon="{NextArrowIcon}">{locale.NEW_THREAD.CONFIRM}</Button>
                {:else}
                    <Button className="nextButton" disabled="{!nextEnabled}" onClick="{saveCurrentPost}" icon="{SaveIcon}">{locale.EDIT_THREAD.CONFIRM}</Button>
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
	.panelContent {
    	padding: 28px 0;
	}

	.pageTitle {
        font-size: 1.5rem;
        font-weight: 700;
        color: #444444;

		padding-left: 23px;
        margin-top: -2px;
        padding-bottom: 15px;
	}

	.field {
    	padding: 0 16px;
		padding-bottom: 5px;
	}

	.messageField {
		padding-bottom: 0;
    	/* padding-bottom: 10px; */
    	/* padding-bottom: 18px; */
	}

	.label {
		font-size: 1.3rem;
    	padding-left: 7px;
    	padding-bottom: 4px;
		color: #555555;
	}

	.tip {
    	padding-left: 10px;

    	font-size: 1.1rem;
		font-weight: initial;

		color: #aaaaaa;
	}

	textarea {
        border: 1px solid #cccccc;

        outline: none;
        background: none;

        width: 100%;
		height: 150px;

        box-sizing: border-box;

		font-size: 1.5rem;
		line-height: 2rem;
    	color: #555555;

        padding: 4px 6px;

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

	.editPostContent :global(.nextButton) {
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
    .editPostContent :global(.nextButton .icon) {
    	padding-left: 20px;
    	margin-top: -1px;
    }

	.fieldNote {
    	font-size: 1.1rem;
    	color: #aaaaaa;

		/* margin-top: -5px; */
		padding-top: 5px;
		padding-left: 27px;
		margin-bottom: -10px;
	}
</style>
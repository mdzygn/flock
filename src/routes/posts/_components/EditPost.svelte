<script>
	import locale from '../../../locale';

	import { onMount, tick, createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

	import {
		testInputDefocus,
		getUnformattedText,
		getFormattedText,
		strCompare,
	} from '../../../utils';

	import Proxy from '../../../components/Proxy.svelte';

	import Button from '../../../components/Button.svelte';

	import ImageSelectionBox from '../../_components/ImageSelectionBox.svelte';

    import NextArrowIcon from "../../../assets/icons/next_arrow.png";
	import SaveIcon from "../../../assets/icons/save.png";
	import AddImageIcon from "../../../assets/icons/add_small.png";
	import RemoveImageIcon from "../../../assets/icons/clear.png";
    import SendMessageIcon from "../../../assets/icons/send.png";
	import UploadImageIcon from "../../../assets/icons/upload_image.png";
	import CollapseIcon from "../../../assets/icons/collapse_down.png";

	import {
		channel,
		channelId,
		projectId,
		postType,
        postId,
        post,
        project,
		curPath,
		saveDraftPost,
		getDraftPost,
		clearDraftPost,
	} from '../../../models/appModel';

	import {
		loadCurrentChannel,
	} from '../../../actions/appActions';

	import {
        createPost,
        savePost,
	} from '../../../actions/postActions';

	import {
        getNewPostId,
	} from '../../../models/postsModel';

	import { loadChannels } from '../../../models/channelsModel';

	export let inlineComponent = false;

	let title = '';
	let message = '';
	let image = null;

	let titleField;
	let messageField;

	let origTitle = '';
	let origMessage = '';
	let origImage = null;

	let addingImage = false;
	let imageIsUploading = false;

	let newPostId = getNewPostId();

    loadCurrentChannel();

	let editPost = false;
	let editPostInitialized = false;
	$: {
		if (!editPostInitialized && $curPath) {
			editPostInitialized = true;

			editPost = ($curPath && !!$curPath.match(/posts\/.+\/edit/)) || false;
		}
	}

	$: curPostId = editPost ? $postId : newPostId;

    $: nextEnabled = (title || message || (image && curPostType !== 'thread')) && !imageIsUploading;

	$: curPostType = (editPost && $post) ? $post.type : $postType;

	$: draftId = (editPost ? ($post && $post.id) : ((curPostType === 'thread') ? $channelId : $postId)) || null;

	$: showTitleField = (curPostType === 'thread');

	$: imageType = (curPostType === 'thread') ? 'image/jpeg' : null;
	$: useLibrary = (curPostType === 'thread') ? true : false;

	$: showImageOption = true; // (curPostType === 'thread');

	$: pageTitle = (curPostType === 'thread') ? (
        editPost ? locale.EDIT_THREAD.PAGE_TITLE : locale.NEW_THREAD.PAGE_TITLE
    ) : (
		(inlineComponent) ? (
			locale.REPLY_THREAD.PAGE_TITLE
		) : (
			editPost ? locale.EDIT_THREAD_POST.PAGE_TITLE : locale.NEW_THREAD_POST.PAGE_TITLE
		)
    );

    let postContentInitialized = false;

    $: {
		if (!postContentInitialized) {
			if (editPost) {
				if ($post) {
					title = ($post && $post.title) || '';
					message = ($post && $post.message) || '';
					image = ($post && $post.image) || '';

					message = getFormattedText(message);

					origTitle = title;
					origMessage = message;
					origImage = image;

					getPostDraftContent();
					postContentInitialized = true;
				}
			} else {
				if (draftId) {
					getPostDraftContent();
					postContentInitialized = true;
				}
			}
		}
	}

	$: {
		// if (title || message) {
		if (draftId) {
			const draftPost = {
				title,
				message,
				image,
			};
			if (!editPost) {
				draftPost.itemId = newPostId;
			}
			const curDraftPost = getDraftPost(curPostType, draftId, editPost);
			if (editPost) {
				if ($post) {
					if (curDraftPost || (
						!strCompare(title, origTitle) ||
						!strCompare(message, origMessage) ||
						image !== origImage
					)) {
						if (
							strCompare(title, origTitle) &&
							strCompare(message, origMessage) &&
							image === origImage
						) {
							clearDraftPost(curPostType, draftId, editPost);
						} else {
							saveDraftPost(curPostType, draftId, editPost, draftPost);
						}
					}
				}
			} else {
				if (curDraftPost || title || message || image) {
					if (!(title || message || image)) {
						clearDraftPost(curPostType, draftId, editPost);
					} else {
						saveDraftPost(curPostType, draftId, editPost, draftPost);
					}
				}
			}
		}
	}

	async function getPostDraftContent() {
		if (draftId) {
			const draftPost = getDraftPost(curPostType, draftId, editPost);
			if (draftPost) {
				await tick();

				title = draftPost.title || '';
				message = draftPost.message || '';
				image = draftPost.image || null;

				if (draftPost.itemId) {
					newPostId = draftPost.itemId;
				}
			}
		}
		return null;
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
				id: newPostId,
				message: getUnformattedText(message),
				image,
				type: $postType,
				channelId: $channel && $channel.id,
				projectId: $channel && $channel.projectId,
			};
			switch ($postType) {
				case 'thread':
					postDetails.title = title;
					break;
				case 'threadPost':
					postDetails.threadId = $postId;
					break;
			}
			createPost(postDetails).then((result) => {
				// console.log('create post result', result);
				if (result && result.success) {
					clearDraftPost(curPostType, draftId, editPost);
				}
			});
		}
    }

    function saveCurrentPost() {
		if (editPost) {
            const postDetails = {
                message: getUnformattedText(message),
            };
			switch ($post.type) {
				case 'thread':
					postDetails.title = title;
					break;
			}
			if (image !== origImage) {
				postDetails.image = image;
			}

			const result = savePost(postDetails);
			if (result) {
				result.then((result) => {
					// console.log('save post result', result);
					if (result && result.success) {
						clearDraftPost(curPostType, draftId, editPost);
					}
				});
			}
        }
	}

	let changesSaved = false;
	$: {
		if (editPost && draftId) {
			const draftPost = getDraftPost(curPostType, draftId, editPost);
			if (draftPost && $post) {
				changesSaved = (
					!strCompare(title, origTitle) ||
					!strCompare(message, origMessage) ||
					image !== origImage
				);
			} else {
				changesSaved = false;
			}
			// console.log('changesSaved', changesSaved);
		}
	}

	function resetChanges() {
		if (editPost && changesSaved && draftId) {
			title = origTitle;
			message = origMessage;
			image = origImage;

			clearDraftPost(curPostType, draftId, editPost);
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

	function addImage() {
		addingImage = true;
	}

	function removeImage() {
		addingImage = false;
		image = null;
	}

	function hide() {
        dispatch('hide');
	}
</script>

{#if !editPost || $post }
    <div class="editPostContent" class:inlineComponent="{inlineComponent}">
        <!-- <Proxy image="create_project" className="proxyOverlay" /> -->
        <div class="panelContent" class:showImage="{showImageOption && (image || addingImage)}">
			{#if inlineComponent}
				<Button className="collapsePanel" icon="{CollapseIcon}" onClick="{hide}" />
			{/if}
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

			{#if showImageOption}
				{#if inlineComponent}
					{#if image || addingImage}
						<div class="field headerImageField">
							<ImageSelectionBox bind:image bind:fileIsUploading="{imageIsUploading}" containMode="{true}" {imageType} {useLibrary} uploadType="post" itemId="{curPostId}" />
						</div>
						<div class="imageField removeImageField">
							<Button className="addImage removeImage" icon="{RemoveImageIcon}" onClick="{removeImage}">{locale.NEW_THREAD.REMOVE_IMAGE}</Button>
						</div>
					{:else}
						<div class="imageField">
							<Button className="addImage" icon="{UploadImageIcon}" onClick="{addImage}"></Button>
						</div>
					{/if}
					<!-- <ImageSelectionBox bind:image bind:fileIsUploading="{imageIsUploading}" containMode="{true}" {imageType} {useLibrary} uploadType="post" itemId="{curPostId}" /> -->
				{:else}
					{#if image || addingImage}
						<div class="imageField">
							<Button className="addImage removeImage" icon="{RemoveImageIcon}" onClick="{removeImage}">{locale.NEW_THREAD.REMOVE_IMAGE}</Button>
						</div>
						<div class="field headerImageField">
							<ImageSelectionBox bind:image bind:fileIsUploading="{imageIsUploading}" containMode="{true}" {imageType} {useLibrary} uploadType="post" itemId="{curPostId}" />
						</div>
					{:else}
						<div class="imageField">
							<Button className="addImage" icon="{AddImageIcon}" onClick="{addImage}">{locale.NEW_THREAD.ADD_IMAGE}</Button>
						</div>
					{/if}
				{/if}
			{/if}

			{#if !editPost}
				<div class="fieldNote">{@html locale.NEW_THREAD.EDIT_NOTE}</div>
			{:else}
				<div class="fieldNote">{@html locale.NEW_THREAD.EDITING_NOTE}
					{#if changesSaved}
						<div><a href="javascript:void(0)" on:click="{resetChanges}">{locale.NEW_THREAD.REST_ACTION}</a>{locale.NEW_THREAD.REST_NOTE}</div>
					{/if}
				</div>
			{/if}
            <div class="actions">
                {#if !editPost}
					{#if inlineComponent}
                    	<Button className="nextButton" disabled="{!nextEnabled}" onClick="{saveCurrentPost}" icon="{SendMessageIcon}">{locale.REPLY_THREAD.CONFIRM}</Button>
					{:else}
                    	<Button className="nextButton" disabled="{!nextEnabled}" onClick="{createNewPost}" icon="{NextArrowIcon}">{locale.NEW_THREAD.CONFIRM}</Button>
					{/if}
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

	.actions {
		pointer-events: none;
		position: relative;
		height: 60px;
		/* margin-top: 10px; */
	}
	.actions :global(.button) {
		pointer-events: initial;
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
		position: absolute;
    	font-size: 1.1rem;
    	color: #aaaaaa;

		/* margin-top: -5px; */
		padding-top: 5px;
		padding-left: 27px;
		/* margin-bottom: -10px; */
	}

	.imageField {
		position: relative;
		height: 40px;
	}
	.editPostContent :global(.detailImageSelector) {
		margin-top: 20px;
	}

	.headerImageField {
    	padding: 0;
		padding-bottom: 10px;
    	margin-top: -15px;
	}

	.headerImageField :global(.imageSelectionBox) {
    	margin-top: 10px;
	}

	.editPostContent :global(.addImage) {
		position: absolute;
    	top: -4px;
		right: 5px;

		padding: 10px;
		padding-right: 45px;
		padding-left: 13px;

		font-size: 1.2rem;
		font-weight: 700;
    }
    .editPostContent :global(.addImage .icon) {
    	padding-left: 14px;
		margin-top: -1px;
    }
    .editPostContent :global(.addImage.removeImage .icon) {
		transform: scale(0.4, 0.4);
		opacity: 0.6;
    	padding-left: 24px;
    }


    .inlineComponent {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ffffff;
		box-shadow: 0 -2px 5px 0 rgba(0,0,0,0.15);
    }
    .inlineComponent :global(.panelContent) {
    	padding-top: 10px;
    	padding-bottom: 0;
    }
    .inlineComponent :global(.pageTitle) {
		padding-bottom: 2px;
		font-size: 1.3rem;
    }
    .inlineComponent :global(.messageField .label) {
		display: none;
    }
    .inlineComponent :global(.addImage) {
		right: initial;
		padding-left: 16px;
    }
    .inlineComponent :global(.imageField) {
		height: 0;
    }
    .inlineComponent :global(.removeImage) {
    	top: -5px;
    	padding-right: 24px;
    }
    .inlineComponent :global(.removeImage .buttonContent) {
    	padding-left: 28px;
    }
    .inlineComponent :global(.removeImage .iconContainer) {
		position: absolute;
    	left: 13px;
		top: 20px;
    }
    /* .inlineComponent :global(.removeImageField) {
    	height: 30px;
    }
    .inlineComponent :global(.removeImageField .addImage) {
    	right: -5px;
    	top: -9px;
    } */
    .inlineComponent :global(.fieldNote) {
		line-height: 1.3rem;
		padding-left: 58px;
    	padding-top: 1px;
		pointer-events: none;
    }
    .inlineComponent .showImage :global(.fieldNote) {
		display: none;
    }
    .inlineComponent :global(.actions) {
		height: 42px;
	}
    .inlineComponent :global(.addImage .icon) {
		padding-left: 0;
		transform: scale(0.375, 0.375);
    }
    .inlineComponent :global(.nextButton) {
    	top: -6px;
    	font-size: 1.2rem;
	}
    .inlineComponent :global(.nextButton .icon) {
		padding-left: 18px;
		margin-top: -2px;
	}
	.inlineComponent :global(.headerImageField) {
		margin-top: -6px;
	}
    .inlineComponent :global(.imageSelectionBox) {
    	padding-top: 35%;
	}
    .inlineComponent :global(.collapsePanel) {
		position: absolute;
		top: 0;
		right: 0;
		width: 50px;
		height: 32px;
	}
    .inlineComponent :global(.collapsePanel .icon) {
		margin-top: 3px;
		margin-left: 10px;
	}
    /* .inlineComponent :global(.headerImageField) {
    	position: absolute;
		width: 40px;
		height: 40px;
		padding: 0;

    	margin-left: 16px;

		border: 1px solid #cccccc;
	}
    .inlineComponent :global(.imageSelectionBox) {
		margin-top: 0;
		padding: 0;
		height: 100%;
	}
    .inlineComponent :global(.carouselContainer) {
		display: none;
	} */
</style>
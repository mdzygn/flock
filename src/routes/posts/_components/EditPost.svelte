<script>
	import locale from '../../../locale';

	import { onMount, tick, createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

	import { get } from 'svelte/store';

	import {
		testInputDefocus,
		// getUnformattedText,
		getFormattedText,
		strCompare,
		trim,
		gotoAnchor,
	} from '../../../utils';

	import {
		displayChannelForUser,
	} from '../../../models/channelsModel';

	import Proxy from '../../../components/Proxy.svelte';

	import Button from '../../../components/Button.svelte';
	import Select from '../../../components/Select';

	import ImageSelectionBox from '../../_components/ImageSelectionBox.svelte';

    import NextArrowIcon from "../../../assets/icons/next_arrow.png";
	import SaveIcon from "../../../assets/icons/save.png";
	import AddImageIcon from "../../../assets/icons/add_small.png";
	import RemoveImageIcon from "../../../assets/icons/clear.png";
    import SendMessageIcon from "../../../assets/icons/send.png";
	import UploadImageIcon from "../../../assets/icons/upload_image.png";

	import CloseIcon from "../../../assets/icons/clear.png";
	// import CollapseIcon from "../../../assets/icons/collapse_down.png";

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
		savingPost,
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

	export let element = null;

	export let submitLabel = null;

	export let shown = true;

	export let smallNextButton = false;
	
    export let className = '';

    export let targetPostType = null;

    export let targetChannelId = null;

	export let showChannelSelect = false;

	export let channels = null;
	
    $: channelItems = (channels && $channels) ? $channels.map(channel => {
        // const noPosts = !itemModel.postCount;
		// if (isTeamMember || channelModel.postCount || getIsBaseDisplayChannel(channelModel) || (following && !getIsTeamManagedChannel(channelModel))}
		if (displayChannelForUser(channel, project)) {
        	const channelModel = get(channel);
        	return {label: '#' + channelModel.title, value: channelModel.id};
		} else {
			return null;
		}
    }).filter(item => item) : [];

	let title = '';
	export let message = '';
	let image = null;

	let titleField;
	export let messageField;

	let origTitle = '';
	let origMessage = '';
	let origImage = null;

	let addingImage = false;
	let imageIsUploading = false;

	let newPostId = getNewPostId();

	loadCurrentChannel();

	let mounted = false;

	let editPost = false;
	let editPostInitialized = false;

	$: curChannelId = targetChannelId || ($channel && $channel.id); // $channelId;

	function updateEditPostState() {
		if (!editPostInitialized) {
			editPostInitialized = true;

			editPost = ($curPath && !!$curPath.match(/posts\/.+\/edit/)) || false;
			postContentInitialized = false;
		}
	}

	$: curPostId = editPost ? $postId : newPostId;

    $: nextEnabled = (trim(title) || trim(message) || (image && curPostType !== 'thread')) && !imageIsUploading;

	$: curPostType = targetPostType || ((editPost && $post) ? $post.type : $postType);

	$: draftId = (editPost ? ($post && $post.id) : ((curPostType === 'thread') ? curChannelId : (curPostType === 'projectPost') ? $projectId : $postId)) || null;
	// $: draftId = (editPost ? ($post && $post.id) : ((curPostType === 'thread') ? $channelId : $postId)) || null;

	$: showTitleField = trim(title); // (curPostType === 'thread'); // 

	$: imageType = (curPostType === 'thread') ? 'image/jpeg' : null;
	$: useLibrary = (curPostType === 'thread' || isProjectPost) ? true : false; // TODO: isProjectPost temporary for testing

	$: showImageOption = true; // (curPostType === 'thread');

	$: isProjectPost = (curPostType === 'projectPost');
	// $: isProjectPost = $postType === 'projectPost';
	// $: {
	// 	if (isProjectPost) {
	// 		addingImage = true;
	// 	}
	// }

	$: pageTitle = (curPostType === 'projectPost') ? (
        editPost ? locale.EDIT_PROJECT_POST.PAGE_TITLE : locale.NEW_PROJECT_POST.PAGE_TITLE
    ) : (
		(curPostType === 'thread') ? (
        editPost ? locale.EDIT_THREAD.PAGE_TITLE : locale.NEW_THREAD.PAGE_TITLE
		) : (
			(inlineComponent) ? (
				locale.REPLY_THREAD.PAGE_TITLE
			) : (
				editPost ? locale.EDIT_THREAD_POST.PAGE_TITLE : locale.NEW_THREAD_POST.PAGE_TITLE
			)
		)
	);

	$: imageShown = showImageOption && (image || addingImage);

	$: {
		imageShown;
		resize();
	}

    let postContentInitialized = false;

    $: {
		if (!postContentInitialized && editPostInitialized && mounted) {
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
		if (draftId && editPostInitialized && mounted) {
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
		// console.log('savingPost', $savingPost, getDraftPost(curPostType, draftId, editPost));
		if (draftId && !$savingPost) {
			const draftPost = getDraftPost(curPostType, draftId, editPost);
			if (draftPost) {
				await tick();

				if (showTitleField) {
					title = draftPost.title || '';
				}
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
		mounted = true;
		await tick();
		if (showTitleField) {
			titleField && titleField.focus();
		} else {
			messageField && messageField.focus();
		}
		curPath.subscribe(updateEditPostState);
    });

	function createNewPost() {
		if (!editPost && curPostType) { // $postType) {
			const postDetails = {
				id: newPostId,
				message: trim(message),
				image,
				type: curPostType, // $postType,
				// channelId: $channel && $channel.id,
				// projectId: $channel && $channel.projectId,
			};
			switch (curPostType) { // $postType) {
				case 'thread':
					postDetails.title = trim(title);
					postDetails.channelId = curChannelId; // $channel && $channel.id;
					postDetails.projectId = (!targetChannelId && $channel && $channel.projectId) || $projectId;
					break;
				case 'threadPost':
					postDetails.threadId = $postId;
					postDetails.channelId = curChannelId; // $channel && $channel.id;
					postDetails.projectId = (!targetChannelId && $channel && $channel.projectId) || $projectId;
					break;
				case 'projectPost':
					postDetails.projectId = $projectId;
					gotoAnchor('projectPosts');
					break;
			}
			let result = createPost(postDetails);
			if (result) {
				result.then((result) => {
					// console.log('create post result', result);
					if (result && (result.success || result.addedPost || result.duplicateKey)) {
						clearDraftPost(curPostType, draftId, editPost);
						
						// switch ($postType) {
						// 	case 'projectPost':
						// 		gotoAnchor('projectPosts');
						// 		break;
						// }
					}
				});
			}
			clearCurrentPost();
			hide();
		}
    }

	function clearCurrentPost() {
		message = '';
		addingImage = false;
		image = null;
		newPostId = getNewPostId();

		if (inlineComponent) {
			dispatch('submit');
		}
	}

    function saveCurrentPost() {
		if (editPost) {
            const postDetails = {
                message: trim(message),
            };
			switch ($post.type) {
				case 'thread':
					postDetails.title = trim(title);
					break;
			}
			if (image !== origImage) {
				postDetails.image = image;
			}

			const result = savePost(postDetails);
			if (result) {
				result.then((result) => {
					// console.log('save post result', result);
					if (result && (result.success || result.addedPost || result.duplicateKey)) {
						clearDraftPost(curPostType, draftId, editPost);
					}
				});
			}
			hide();
        }
	}

	let changesSaved = false;
	$: {
		if (editPost && draftId && editPostInitialized && mounted) {
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
		if (inlineComponent) {
			dispatch('hide');
		}
	}

	function resize() {
		if (inlineComponent) {
			dispatch('resize');
		}
	}
</script>

{#if !editPost || $post }
    <div class="editPostContent {className}" bind:this="{element}" class:isProjectPost="{isProjectPost}" class:hidden="{!shown}" class:inlineComponent="{inlineComponent}" class:useLibrary="{useLibrary}">
        <!-- <Proxy image="create_project" className="proxyOverlay" /> -->
        <div class="panelContent" class:showImage="{imageShown}">
			{#if inlineComponent}
				<Button className="collapsePanel" icon="{CloseIcon}" onClick="{hide}" />
			{/if}
            <div class="pageTitle">{pageTitle}</div>
            {#if showTitleField}
                <div class="field">
                    <div class="label">{locale.NEW_THREAD.TITLE}{#if !editPost}<span class="tip">{@html locale.NEW_THREAD.TITLE_TIP}</span>{/if}</div>
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
							<ImageSelectionBox bind:image bind:fileIsUploading="{imageIsUploading}" containMode="{true}" {imageType} {useLibrary} uploadType="post" itemId="{curPostId}" on:resize="{resize}" />
						</div>
						<div class="imageField removeImageField">
							<Button className="addImage removeImage" icon="{RemoveImageIcon}" onClick="{removeImage}" title="{locale.NEW_THREAD.REMOVE_IMAGE}">{locale.NEW_THREAD.REMOVE_IMAGE}</Button>
						</div>
					{:else}
						<div class="imageField">
							<Button className="addImage" icon="{UploadImageIcon}" onClick="{addImage}" title="{locale.NEW_THREAD.ADD_IMAGE}"></Button>
						</div>
					{/if}
					<!-- <ImageSelectionBox bind:image bind:fileIsUploading="{imageIsUploading}" containMode="{true}" {imageType} {useLibrary} uploadType="post" itemId="{curPostId}" /> -->
				{:else}
					{#if image || addingImage}
						<div class="imageField">
							<Button className="addImage removeImage" icon="{RemoveImageIcon}" onClick="{removeImage}" title="{locale.NEW_THREAD.REMOVE_IMAGE}">{locale.NEW_THREAD.REMOVE_IMAGE}</Button>
						</div>
						<div class="field headerImageField">
							<ImageSelectionBox bind:image bind:fileIsUploading="{imageIsUploading}" containMode="{true}" {imageType} {useLibrary} uploadType="post" itemId="{curPostId}" on:resize="{resize}" />
						</div>
					{:else}
						<div class="imageField">
							<Button className="addImage" icon="{AddImageIcon}" onClick="{addImage}" title="{locale.NEW_THREAD.ADD_IMAGE}">{locale.NEW_THREAD.ADD_IMAGE}</Button>
						</div>
					{/if}
				{/if}
			{/if}

			{#if showChannelSelect}
				<div class="channelSelectContainer">
					<div class="channelSelectLabel">{locale.NEW_THREAD.CHANNEL_SELECT}</div>
					<div class="channelSelectBoxContainer">
						<Select items="{channelItems}" bind:selectedValueString="{targetChannelId}"></Select>
					</div>
				</div>
			{:else}
				{#if !editPost}
					<div class="fieldNote">{@html locale.NEW_THREAD.EDIT_NOTE}</div>
				{:else}
					<div class="fieldNote">{@html locale.NEW_THREAD.EDITING_NOTE}
						{#if changesSaved}
							<div><a href="{location.href}" on:click="{resetChanges}">{locale.NEW_THREAD.REST_ACTION}</a>{locale.NEW_THREAD.REST_NOTE}</div>
						{/if}
					</div>
				{/if}
			{/if}

            <div class="actions">
                {#if !editPost}
					{#if inlineComponent}
                    	<Button className="nextButton {smallNextButton?'smallNextButton':''}" disabled="{!nextEnabled}" onClick="{createNewPost}" icon="{SendMessageIcon}">{submitLabel || locale.REPLY_THREAD.CONFIRM}</Button>
					{:else}
                    	<Button className="nextButton {smallNextButton?'smallNextButton':''}" disabled="{!nextEnabled}" onClick="{createNewPost}" icon="{NextArrowIcon}">{locale.NEW_THREAD.CONFIRM}</Button>
					{/if}
				{:else}
                    <Button className="nextButton {smallNextButton?'smallNextButton':''}" disabled="{!nextEnabled}" onClick="{saveCurrentPost}" icon="{SaveIcon}">{locale.EDIT_THREAD.CONFIRM}</Button>
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
	.panelContent {
    	padding: 28px 0;
	}

	.hidden {
		display: none;
	}

	.pageTitle {
        font-size: 1.5rem;
        font-weight: 700;
        color: #444444;

		/* padding-left: 23px;
        margin-top: -2px; */

		padding-left: 16px;
		margin-top: -1px;

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
	
	.isProjectPost textarea {
    	height: 70px;
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
    	padding-top: 12px;
    	padding-bottom: 0;
    }
    .inlineComponent :global(.pageTitle) {
		padding-bottom: 4px;
		font-size: 1.3rem;
    }
    .inlineComponent :global(.messageField) {
		padding-bottom: 2px;
    }
    .inlineComponent :global(.messageField .label) {
		display: none;
    }
    .inlineComponent :global(textarea) {
    	height: 90px;
    }
    .inlineComponent :global(.addImage) {
		right: 92px;
		padding-right: 40px;
		padding-left: 7px;
		/* right: initial;
		padding-left: 16px; */
    }
    .inlineComponent :global(.imageField) {
		height: 0;
    }
    .inlineComponent :global(.removeImage) {
		right: initial;
    	top: -5px;
    	padding-left: 13px;
    	padding-right: 24px;
    }
    .inlineComponent :global(.removeImage .buttonContent) {
    	padding-left: 34px;
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
		padding-left: 16px;
    	padding-top: 1px;
		pointer-events: none;
    }
    .inlineComponent .showImage :global(.fieldNote) {
		display: none;
    }
    .inlineComponent :global(.actions) {
		height: 44px;
	}
    .inlineComponent :global(.addImage .icon) {
		padding-left: 0;
		transform: scale(0.375, 0.375);
    }
    .inlineComponent :global(.nextButton) {
    	top: -5px;
    	font-size: 1.2rem;
    	/* padding-right: 30px; */
	}
    .inlineComponent :global(.nextButton .icon) {
		padding-left: 18px;
		margin-top: -2px;
    	/* transform: scale(0.4, 0.4); */
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
		height: 35px;
	}
    .inlineComponent :global(.collapsePanel .icon) {
		/* margin-top: 5px;
		margin-left: 10px; */

		margin-top: 12px;
		margin-left: 16px;
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
	
	.inlineComponent :global(.nextButton.smallNextButton) {
    	padding-right: 30px;
    }
    .inlineComponent :global(.nextButton.smallNextButton .icon) {
    	transform: scale(0.4, 0.4);
    }

	.inlineComponent.useLibrary :global(.imageSelectionBox.opened) {
		height: 204px;
		padding-top: 0;
	}
	.inlineComponent.useLibrary :global(.imageSelectionBox .imageCarousel) {
    	top: 124px;
	}
	.inlineComponent.useLibrary :global(.imageSelectionBox .imageItem) {
		width: 96px;
		height: 57px;
		margin: 0 4px;
	}
	.inlineComponent.useLibrary :global(.imageSelectionBox .uploadButton) {
		width: 62px;
		height: 62px;
		margin-left: -31px;
	}
	.inlineComponent.useLibrary :global(.imageSelectionBox .uploadButtonIcon) {
		width: 31px;
		height: 27px;
	}
	.inlineComponent.useLibrary :global(.imageSelectionBox .buttonLabel) {
		margin-top: -1px;
		font-size: 1.1rem;
	}
	.inlineComponent.useLibrary :global(.imageSelectionBox .searchBar) {
		top: 88px;
	}
	.inlineComponent.useLibrary :global(.imageSelectionBox .searchIcon) {
		width: 18px;
		height: 18px;
	}
	.inlineComponent.useLibrary :global(.imageSelectionBox .searchFieldInput) {
    	padding: 5px 11px;
    	font-size: 1.4rem;
	}

	.channelSelectContainer {
		position: absolute;
		padding-top: 4px;
    	padding-left: 16px;
		display: flex;
		align-items: center;
	}
	.channelSelectLabel {
		display: inline-block;
    	font-size: 1.3rem;
    	padding-right: 7px;
	}
	.channelSelectBoxContainer {
		display: inline-block;
	}
	.editPostContent :global(.selectContainer) {
    	width: 165px;
	}
	.editPostContent :global(.selectContainer input) {
		border: 1px solid #cccccc;
    	border-radius: 100px;
    	padding: 3px 10px;
    	font-size: 1.3rem;
	}
	.editPostContent :global(.selectContainer .selectedItem) {
    	padding: 3px 10px;
    	font-size: 1.3rem;
	}
	.editPostContent :global(.selectContainer .indicator) {
    	padding-right: 4px;
	}
</style>
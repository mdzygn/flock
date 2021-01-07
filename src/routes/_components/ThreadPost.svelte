<script>
    import { get, writable } from 'svelte/store';
    import { tick } from 'svelte';

    import { menuIds } from '../../config/menus';

    import config from '../../config';
    import locale from '../../locale';

    import Button from '../../components/Button.svelte';

    import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import ActionBar from './ActionBar.svelte';
	import ActionButton from './ActionButton.svelte';

    import AvatarIcon from '../_components/AvatarIcon.svelte';

    import ShareIcon from "../../assets/icons/share.png";
    import LikeIcon from "../../assets/icons/like.png";
    import LikeSelectedIcon from "../../assets/icons/like_selected.png";
    import ReplyIcon from "../../assets/icons/reply.png";
	import OptionsMenuIcon from "../../assets/icons/menu.png";
    import FollowIcon from "../../assets/icons/follow.png";
    import FollowSelectedIcon from "../../assets/icons/follow_selected.png";

    import PlaceholderImage from "../../assets/images/postPlaceholder.png";


	// import NewPostButton from '../_components/NewPostButton.svelte';

    import { getDisplayText, getDateString, getDateAgeString, secondsDiff } from '../../utils';

    import {
        project,
        userId,
        user,
        targetPost,
		getHeaderImage,
        postType,
        getIsProjectTeamMember,
    } from '../../models/appModel';

    import {
        loadProfile,
        checkLoggedIn,
        newThreadPost,
        showSharePostDialog,
        showMenu,
    } from '../../actions/appActions';

	import {
        postToggleLiked,
        followPost,
    } from '../../actions/postActions';

    import {
        getPost,
    } from '../../models/postsModel';

	import {
        getProjectHeaderImage,
	} from '../../models/projectsModel';


    import { getUser } from '../../models/usersModel';

    export let post;

    let postUser = writable([]);

	$: isArchived = ($project && $project.archived) || false;
    $: isTeamMember = $user && $project && getIsProjectTeamMember($project);

	$: isProjectPost = true; // ($post && $post.type === 'project') || false;

    $: following = ($post && $post.following) || false;

    $: postUserId = ($post && $post.userId) || null;
    $: postId = ($post && $post.id) || null;
    $: { postUser = getUser(postUserId) };
    $: userLoaded = ($postUser && $postUser.name) || false;
    $: userName = ($postUser && $postUser.name) || '&nbsp;';
    $: username = ($postUser && $postUser.username && '@' + $postUser.username) || '';

    $: projectTitle = ($project && $project.title) || '';
    $: projectThumbImage = (isProjectPost && ($project && getProjectHeaderImage($project, true))) || null;

    $: canEdit = ($post && $post.userId && $post.userId === $userId) || false;

    $: showFollowOption = !canEdit && !isTeamMember;

    $: showEdited = ($post && $post.edited && secondsDiff($post.createdAt, $post.editedAt) > config.SHOW_EDITED_MIN_TIME) || false;
    $: editedDate = (showEdited && $post.editedAt && getDateString($post.editedAt)) || '';

    // $: console.log('thread diff', secondsDiff($post.createdAt, $post.editedAt));

    $: title = ($post && $post.title) || '';
    $: message = ($post && $post.message) || '';
    $: image = ($post && $post.image) || '';
    $: createdAt = ($post && $post.createdAt) || '';

    $: dateString = (createdAt && getDateString(createdAt, 'ddd d MMM') + ' at ' + getDateString(createdAt, 'h:mmtt')) || '&nbsp;';

    $: titleHTML = getDisplayText(title);
    $: messageHTML = getDisplayText(message);

    let currentImageSrc = PlaceholderImage;
    $: { // load placeholder to set image size
        image;

        (async () => {
            await tick();
            currentImageSrc = PlaceholderImage;

            await tick();
            setTimeout(() => { // ensure allowing placeholder to resize - tick doesn't seem to be enough
                currentImageSrc = getHeaderImage(image);
            }, 0);
        })();
    }

    const date = ''; //'5 Jan at 4:23pm';

    function viewUserProfile() {
        if (userLoaded) {
            loadProfile(postUserId);
        }
    }

    function reply() {
        if (!checkLoggedIn()) { return; }
        newThreadPost();
    }

	function shareItem() {
		showSharePostDialog(postId);
    }

    function showPostOptions() {
        const postModel = getPost(postId);
        if (postModel) {
            const post = get(postModel);
            $targetPost = post;

            showMenu(menuIds.THREAD_POST_OPTIONS);
        }
    }

    function toggleFollowPost() {
        followPost(postId, following);
    }
</script>

<div class="threadPost" class:isProjectPost="{isProjectPost}">
    <!-- <div class="proxyOverlay">
        <Proxy image="thread_post" className="proxyTheadPost">
            <Hotspot onClick="{e => loadProfile('bl20a8lm')}" style="
                left: 12px;
                top: 9px;
                width: 67px;
                height: 65px;" />
        </Proxy>
        <Proxy image="thread_actions" className="proxyThreadActions" />
    </div> -->

    {#if canEdit || showFollowOption}
        <Button className="optionsButton" icon="{OptionsMenuIcon}" onClick="{showPostOptions}"></Button>
    {/if}
    {#if showFollowOption}
        <Button className="followButton" onClick="{toggleFollowPost}" icon="{following ? FollowSelectedIcon : FollowIcon}" />
    {/if}

    <div class="info" on:click="{userLoaded ? viewUserProfile : null}">
        {#if isProjectPost}
            <div class="projectTitle">{projectTitle}</div>
            <div class="date">{@html dateString}{#if showEdited}<span class="edited" title="{editedDate}">{locale.POST.EDITED}</span>{/if}</div>
        {:else}
            <div class="userName" class:button="{userLoaded}">{@html userName}</div>
            <div class="username" class:button="{userLoaded}">{username}</div>
        {/if}
    </div>
    {#if isProjectPost}
        <img class="projectThumb" src="{projectThumbImage}" alt="{projectTitle}" />
    {:else}
        <AvatarIcon user="{postUser}" onClick="{userLoaded ? viewUserProfile : null}" useThumb="{true}" />
    {/if}
    <div class="postContent">
        {#if !isProjectPost}
            <div class="date">{@html dateString}{#if showEdited}<span class="edited" title="{editedDate}">{locale.POST.EDITED}</span>{/if}</div>
        {/if}
        {#if title}
            <div class="title">{@html titleHTML}</div>
        {/if}
        {#if message}
            <div class="message">{@html messageHTML}</div>
        {/if}
    </div>
    {#if image}
        <img class="postImage" src="{currentImageSrc}" alt="post" />
    {/if}

    <!-- <Proxy image="thread_actions" className="proxyThreadActions proxyOverlay" /> -->

    {#if !isArchived}
        <ActionBar targetItemId="{postId}" targetItem="{$post}">
            <div slot="buttonLeft">
                <ActionButton
                    label = "like"
                    icon = "{LikeIcon}"
                    selectedIcon = "{LikeSelectedIcon}"

                    targetItem = "{$post}"
                    targetItemId = "{postId}"
                    action = "{postToggleLiked}"
                    targetItemProperty = "liked"
                    countProperty = "likeCount"
                />
            </div>
            <div slot="buttonMiddle">
                <ActionButton
                    label = "share"

                    icon = "{ShareIcon}"

                    action = "{shareItem}"
                />
            </div>
            <div slot="buttonRight">
                <ActionButton
                    label = "reply"

                    icon = "{ReplyIcon}"

                    action = "{reply}"
                />
            </div>
        </ActionBar>
    {/if}
	<!-- <NewPostButton onClick="{reply}" className="replyButton" type="reply">
        <ActionButton
            label = "like"
            icon = "{LikeIcon}"
            selectedIcon = "{LikeSelectedIcon}"

            targetItem = "{$post}"
            targetItemId = "{postId}"
            action = "{postToggleLiked}"
            targetItemProperty = "liked"
            countProperty = "likeCount"
        />
    </NewPostButton> -->
</div>

<style>
	/* .threadPost :global(.proxyOverlay) {
		position: absolute;
		opacity: 0.5;
	} */

    .threadPost {
        position: relative;
		margin-top: 5px;
        background-color: #ffffff;
    }

    .threadPost :global(.optionsButton) {
		position: absolute;

        top: 20px;
        right: 2px;

        width: 32px;
		height: 26px;
        padding: 8px 3px;
	}
    .threadPost :global(.optionsButton .icon) {
        margin-left: 11px;
        transform: scale(0.45, 0.45);
	}

    .threadPost.isProjectPost :global(.optionsButton) {
        top: 12px;
    }

    .threadPost :global(.followButton) {
        position: absolute;
        top: 30px;
        right: 33px;
        width: 24px;
        height: 26px;
        padding: 3px 3px;
	}
    .threadPost :global(.followButton .icon) {
        margin-left: 2px;
        transform: scale(0.36, 0.36);
	}

    .button {
        cursor: pointer;
    }

    .projectThumb {
        width: 38px;
        height: 38px;
        position: absolute;
        margin-top: 23px;
        margin-left: 23px;

        object-fit: cover;

        border: 1px solid #D9D9D9;
    }

    .threadPost :global(.avatarIcon) {
        position: absolute;
        left: 23px;
        top: 18px;
        height: 65px;
        width: 65px;
    }

    .info {
        position: absolute;
        padding-top: 29px;
        padding-right: 100px;
        padding-left: 104px;
    }

    .isProjectPost .info {
        padding-top: 21px;
        padding-left: 79px;
    }

    .userName, .projectTitle {
        font-size: 1.7rem;
        color: #222222;
        font-weight: 700;

        user-select: text;
    }

    .username {
        font-size: 1.4rem;
        color: #666666;
        margin-top: -2px;

        user-select: text;
    }

    .postContent {
        padding-top: 95px;
        padding-left: 23px;
        padding-right: 23px;
        /* padding-left: 26px;
        padding-right: 40px; */
        padding-bottom: 22px;
    }
    
    .isProjectPost .postContent {
        padding-top: 84px;
    }

    .date {
        font-size: 1.3rem;
        color: #999999;
        padding-bottom: 2px;

        user-select: text;
    }

    .edited {
        display: inline-block;
        margin-left: 4px;
        font-size: 1.1rem;
        color: #b9b9b9;
        background-color: #f7f5f5;
        padding: 1px 4px;
        border-radius: 3px;
        user-select: none;
    }

    .title {
        font-size: 1.9rem;
        line-height: 2rem;
        color: #000000;
        font-weight: 700;
        padding-bottom: 2px;
        padding-top: 8px;

        user-select: text;
        
        overflow-wrap: break-word;
        word-wrap: break-word;

        /* white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; */
    }
    .title :global(a) {
        user-select: text;
    }

    .message {
        font-size: 1.5rem;
        line-height: 1.7rem;
        color: #333333;
        padding-top: 8px;

        user-select: text;
        
        overflow-wrap: break-word;
        word-wrap: break-word;
    }
    .message :global(a) {
        user-select: text;
    }

	.postImage {
		width: 100%;
        background-color: #dedede;
        margin-bottom: 8px;
	}

    .threadPost :global(.actionBar ) {
        position: relative;
    }

    .threadPost :global(.actionContainerButton) {
        position: absolute;
        width: 94px;
        top: 0;
        bottom: 0;
        left: 106px;
    }

    .threadPost :global(.button .button) {
        justify-content: initial;
    }

    .threadPost :global(.actionContainerButton.actionButtonLeft) {
        position: absolute;
        left: 0;
        width: initial;
        top: 0;
        bottom: 0;
    }
    .threadPost :global(.actionContainerButton.actionButtonLeft .buttonContent) {
        padding-right: 0;
        margin-left: 26px;
        margin-right: 67px;
    }

    .threadPost :global(.actionContainerButton.actionButtonMiddle) {
        position: absolute;
        left: 112px;
        width: initial;
        top: 0;
        bottom: 0;
    }
    .threadPost :global(.actionContainerButton.actionButtonMiddle .buttonContent) {
        padding-right: 0;
        margin-left: 9px;
        margin-right: 14px;
    }

    .threadPost :global(.actionContainerButton.actionButtonRight) {
        position: absolute;
        left: initial;
        right: 0;
        width: initial;
        top: 0;
        bottom: 0;
    }
    .threadPost :global(.actionContainerButton.actionButtonRight .buttonContent) {
        padding-right: 0;
        margin-left: 32px;
        margin-right: 20px;

        font-size: 1.6rem;
        font-weight: 700;
    }
    .threadPost :global(.actionContainerButton.actionButtonRight .buttonContent) {
        padding-right: 0;
        margin-left: 32px;
        margin-right: 57px;

        font-size: 1.6rem;
        font-weight: 700;
    }
    .threadPost :global(.actionContainerButton.actionButtonRight .icon) {
        padding-left: 16px;
    }
</style>
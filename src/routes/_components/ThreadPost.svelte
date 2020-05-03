<script>
    import { get, writable } from 'svelte/store';

    import { menuIds } from '../../config/menus';

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


	// import NewPostButton from '../_components/NewPostButton.svelte';

    import { parseHTML, getDateString } from '../../utils';

    import {
        project,
        userId,
        targetPost,
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
    } from '../../actions/postActions';

    import {
        getPost,
    } from '../../models/postsModel';


    import { getUser } from '../../models/usersModel';

    export let post;

    let user = writable([]);

	$: isArchived = ($project && $project.archived) || false;

    $: postUserId = ($post && $post.userId) || null;
    $: postId = ($post && $post.id) || null;
    $: { user = getUser(postUserId) };
    $: userLoaded = ($user && $user.name) || false;
    $: userName = ($user && $user.name) || '&nbsp;';
    $: username = ($user && $user.username && '@' + $user.username) || '';

    $: canEdit = ($post && $post.userId && $post.userId === $userId) || false;

    $: title = ($post && $post.title) || '';
    $: message = ($post && $post.message) || '';
    $: createdAt = ($post && $post.createdAt) || '';

    $: dateString = (createdAt && getDateString(createdAt, 'ddd d MMM') + ' at ' + getDateString(createdAt, 'h:mmtt')) || '&nbsp;';

    $: titleHTML = parseHTML(title);
    $: messageHTML = parseHTML(message);

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

            showMenu(menuIds.POST_OPTIONS);
        }
    }
</script>

<div class="threadPost">
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

    {#if canEdit}
        <Button className="optionsButton" icon="{OptionsMenuIcon}" onClick="{showPostOptions}"></Button>
    {/if}

    <div class="info" on:click="{userLoaded ? viewUserProfile : null}">
        <div class="userName" class:button="{userLoaded}">{@html userName}</div>
        <div class="username" class:button="{userLoaded}">{username}</div>
    </div>
    <AvatarIcon {user} onClick="{userLoaded ? viewUserProfile : null}" useThumb="{true}" />
    <div class="postContent">
        <div class="date">{@html dateString}</div>
        {#if title}
            <div class="title">{@html titleHTML}</div>
        {/if}
        {#if message}
            <div class="message">{@html messageHTML}</div>
        {/if}
    </div>

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
		margin-top: 5px;
        background-color: #ffffff;
    }

    .threadPost :global(.optionsButton) {
		position: absolute;

    	top: 25px;
        right: 2px;

        width: 32px;
		height: 26px;
        padding: 8px 3px;
	}
    .threadPost :global(.optionsButton .icon) {
        margin-left: 11px;
        transform: scale(0.45, 0.45);
	}

    .button {
        cursor: pointer;
    }

    .threadPost :global(.avatarIcon) {
        position: absolute;
        left: 23px;
        top: 23px;
        height: 65px;
        width: 65px;
    }

    .info {
        position: absolute;
        padding-top: 29px;
        padding-right: 100px;
        padding-left: 104px;
    }

    .userName {
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
        padding-left: 26px;
        padding-right: 40px;
        padding-bottom: 22px;
    }

    .date {
        font-size: 1.3rem;
        color: #999999;
        padding-bottom: 2px;

        user-select: text;
    }

    .title {
        font-size: 1.9rem;
        line-height: 2rem;
        color: #000000;
        font-weight: 700;
        padding-bottom: 2px;
        padding-top: 8px;

        user-select: text;

        /* white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; */
    }

    .message {
        font-size: 1.5rem;
        line-height: 1.7rem;
        color: #333333;
        padding-top: 8px;

        user-select: text;
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
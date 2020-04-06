<script>
    // import Button from '../../components/Button.svelte';
    // import Counter from '../_components/Counter.svelte';

    // import ArrowIcon from "../../assets/icons/next_arrow.png";

    import AvatarIcon from '../_components/AvatarIcon.svelte';

    import { getUser } from '../../models/usersModel';

    export let post;

    // export let type = 'thread';

    $: userId = ($post && $post.userId) || null;
    $: user = userId && getUser(userId) || null;

    $: userFullName = (user && user.fullName) || '';

    $: console.log('userId', userId);

    $: title = ($post && $post.title) || null;
    $: message = ($post && $post.message) || null;
</script>

<div class="postItem">
    <!-- <Avatar  -->
    <AvatarIcon {user} />
    <div class="info">
        <div class="userFullName">{userFullName}</div>
        {#if title}
            <div class="title">{title}</div>
        {/if}
        {#if message}
            <div class="message">{message}</div>
        {/if}
    </div>

</div>

<style>
    .postItem {
        position: relative;

        background-color: #ffffff;

        margin-bottom: 5px;
    }

    .postItem :global(.avatarIcon) {
        position: absolute;
        left: 14px;
        top: 16px;
        height: 40px;
        width: 40px;
    }
    .info {
        padding: 15px;
        padding-left: 66px;
    }

    .userFullName {
        font-size: 1.3rem;
        color: #777777;
        font-weight: 700;
        padding-bottom: 5px;
    }

    .title {
        font-size: 1.5rem;
        line-height: 1.7rem;
        color: #000000;
        font-weight: 700;
        padding-bottom: 8px;
    }

    .message {
        font-size: 1.5rem;
        line-height: 1.7rem;
        color: #333333;
    }
</style>
<script>
    import AvatarIcon from './AvatarIcon.svelte';

    import { loadProfile } from '../../actions/appActions';

    export let user;

    $: name = ($user && $user.name) || '';
    $: username = ($user && $user.username && '@' + $user.username) || '';

    function loadCurrentUser() {
        if ($user) {
            loadProfile($user.id);
        }
    }
</script>

<div class="teamMemberItem" on:click="{(loadCurrentUser)}">
    <AvatarIcon {user} useThumb="{true}" />
    <div class="detailContent">
        <div class="detailInnerContent">
            <div class="title">{name}</div>
            <div class="username">{username}</div>
        </div>
    </div>
</div>

<style>
    .teamMemberItem {
        display: inline-block;
        position: relative;

        padding-top: 6px;

        height: 50px;
        /* width: 177px; */

        cursor: pointer;
    }

    .teamMemberItem :global(.avatarIcon) {
        position: absolute;
        height: 42px;
        width: 42px;
    }

    .detailContent {
        /* position: absolute;
        left: 54px;
        right: 60px;
        top: 2px;
        bottom: 0; */

		/* display: flex;
		align-items: center; */

        padding-top: 9px;
        height: 100%;
        padding-left: 53px;
        padding-right: 25px;
    }

    .detailInnerContent {

    }

    .title {
        font-size: 1.6rem;
        font-weight: 700;
        line-height: 1.3rem;

        max-width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-bottom: 5px; margin-bottom: -5px; /* fix clipping decenders */
    }

    .username {
        font-size: 1.1rem;
        margin-top: 4px;
        color: #666666;
        line-height: 1.3rem;
    }
</style>
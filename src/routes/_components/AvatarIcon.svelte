<script>
    // import { writable } from 'svelte/store';

    import { getContentImage } from '../../models/appModel';

    import ProfileDefaultImage from "../../assets/icons/profileDefault_small.png";

    export let user = null; // writable({})

    export let useThumb = false;

    export let onClick = null;

    let avatarImageSrc = ProfileDefaultImage;

    $: thumbImageId = ($user && $user.username) || '_default';
    $: avatarImage = ($user && $user.avatarImage) || null;

    $: {
        if (avatarImage) {
            avatarImageSrc = getContentImage(avatarImage, useThumb);
        } else {
            avatarImageSrc = ProfileDefaultImage;
        }
    }
    $: {
        if ($user && $user.avatarImageRawSrc) {
            avatarImageSrc = $user.avatarImageRawSrc;
        }
    }

    // $: profileImageSrc = 'content/users/' + thumbImageId + '/thumb.jpg';

    // $: profileImageSrc = ProfileDefaultImage;

    $: userStyle = ($user && $user.style) || null;
    $: profileImageBgStyling = (!avatarImage && userStyle && userStyle.profileTop !== undefined) ? 'background-image: linear-gradient(' + userStyle.profileTop + ', ' + userStyle.profileBottom + ');' : '';
</script>

<div class="avatarIcon" style="{profileImageBgStyling}" class:button="{onClick}" on:click="{onClick}">
    <div class="avatarIconImage" style='background-image: url({avatarImageSrc})'></div>
</div>

<style>
    .avatarIcon {
        box-sizing: border-box;

        height: 36px;
        width: 36px;

        border-radius: 999px;

        background-color: #C8C8C8;
        /* background-size: cover; */

        overflow: hidden;

        border: 1px solid #cacaca;
    }

    .avatarIconImage {
        width: 100%;
        height: 100%;

        background-size: cover;
    }

    .button {
        cursor: pointer;
    }
</style>
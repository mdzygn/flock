<script>
    import ProfileDefaultImage from "../../assets/icons/profileDefault_small.png";

    export let user = null;

    $: thumbImageId = (user && user.username) || '_default';

    // $: profileImageSrc = 'content/users/' + thumbImageId + '/thumb.jpg';

    $: profileImageSrc = ProfileDefaultImage;

    $: userStyle = (user && user.style) || null;
    $: profileImageBgStyling = userStyle ? 'background-image: linear-gradient(' + userStyle.profileTop + ', ' + userStyle.profileBottom + ');' : '';
</script>

<div class="avatarIcon" style="{profileImageBgStyling}">
    <div class="avatarIconImage" style='background-image: url({profileImageSrc})'></div>
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

        border: 1px solid #AAA;
    }

    .avatarIconImage {
        width: 100%;
        height: 100%;

        background-size: cover;
    }
</style>
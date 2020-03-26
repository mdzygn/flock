<script>
    export let user;

    let profileImageSrc = (user && user.username && 'content/profile-images/thumbs/' + user.username + '.jpg') || 'content/profile-images/thumbs/_default.jpg';
</script>

<div class="avatarIcon" style='background-image: url({profileImageSrc})'>
</div>

<style>
    .avatarIcon {
        box-sizing: border-box;

        height: 36px;
        width: 36px;

        border-radius: 999px;

        background-color: #C8C8C8;
        background-size: contain;

        overflow: hidden;

        border: 1px solid #AAA;
    }
</style>
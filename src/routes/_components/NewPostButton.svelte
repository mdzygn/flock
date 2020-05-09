<script>
    import Proxy from '../../components/Proxy.svelte';
    import Button from '../../components/Button.svelte';

    import locale from '../../locale';

    import NewPostIcon from "../../assets/icons/create_post.png";

    // export let type = 'new_post';

    export let icon = NewPostIcon;
    export let label = locale.GENERAL.NEW_POST; // 'new post';

    export let className = '';

    export let onClick = null;
</script>

<div class="newPostButtonPanel {className}">
    <!-- <Proxy image="{type}" className="proxyOverlay" /> -->

    <Button className="newPostButton" {onClick} icon="{icon}">{label}</Button>

    <!-- <slot></slot> -->
</div>

<style>
    /* .newPostButtonPanel :global(.proxyOverlay) {
        position: absolute;
        opacity: 0.5;
    } */

	.newPostButtonPanel {
        position: relative;
        background-color: #ffffff;
        height: 41px;
        padding-top: 3px;
        padding-bottom: 3px;
        margin-top: 10px;
        margin-bottom: 10px;
	}

    .newPostButtonPanel :global(.proxy) {
        position: absolute;
    }

    .newPostButtonPanel :global(.newPostButton) {
        position: absolute;
        top: 11px;
        right: 0;
        padding-right: 58px;
        /* padding-right: 63px; */
        font-weight: 700;
        font-size: 1.7rem;
    }
    .newPostButtonPanel :global(.newPostButton .icon) {
        padding-left: 25px;
        /* padding-left: 30px; */
        margin-top: -2px;
    }

    /* .button {
        cursor: pointer;
    } */
</style>
<script>
    import Proxy from '../../components/Proxy.svelte';

    export let type = 'new_post';
</script>

<div class="content">
    <Proxy image="{type}" className="newPostButton" />
</div>

<style>
	.content :global(.newPostButton) {
        margin-top: 10px;
        margin-bottom: 10px;

        /* cursor: pointer; */
	}
</style>
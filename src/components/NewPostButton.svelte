<script>
	import Proxy from './Proxy.svelte';
</script>

<div class="content">
    <Proxy image="new_post" className="newPostButton" />
</div>

<style>
	.content :global(.newPostButton) {
        margin-top: 10px;
        margin-bottom: 10px;

        cursor: pointer;
	}
</style>
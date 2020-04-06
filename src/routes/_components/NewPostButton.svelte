<script>
    import Proxy from '../../components/Proxy.svelte';

    export let type = 'new_post';
    export let className = '';

    export let onClick = null;
</script>

<div class="newPostButton {className}" class:button="{onClick}" on:click="{onClick}">
    <Proxy image="{type}" />
</div>

<style>
	.newPostButton {
        padding-top: 10px;
        padding-bottom: 10px;
	}

    .button {
        cursor: pointer;
    }
</style>
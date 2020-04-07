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
        background-color: #ffffff;
        height: 41px;
        padding-top: 3px;
        padding-bottom: 3px;
        margin-top: 10px;
        margin-bottom: 10px;
	}

    .button {
        cursor: pointer;
    }
</style>
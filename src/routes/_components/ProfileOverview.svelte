<script>
    import Proxy from '../../components/Proxy.svelte';

    export let isOwner = false;
    $: proxyImage = isOwner ? 'profile_overview_owner' : 'profile_overview';

	let projectId = 'm62lsp2o';
</script>

<div class="content">
	<Proxy image="{proxyImage}" >
        <!-- Likes -->
        <a href="profile/likes" style="
            left: 199px;
            top: 144px;
            width: 77px;
            height: 39px;">&nbsp;</a>
    </Proxy>
</div>

<style>
</style>
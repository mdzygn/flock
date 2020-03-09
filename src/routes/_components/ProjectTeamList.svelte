<script>
	import Proxy from '../../components/Proxy.svelte';

    export let isOwner = false;
    export let isNew = false;

    let proxyImage = 'project_team';
    $: {
        if (isNew) {
            proxyImage = 'project_team_populate';
        } else {
            if (isOwner) {
                proxyImage = 'project_team_owner';
            } else {
                proxyImage = 'project_team';
            }
        }
    }
</script>

<div class="content">
	<Proxy image="{proxyImage}" className="contentItem" >
        <!-- Contact Profile -->
        <a href="profile/bl20a8lm" style="
            left: 0;
            top: 31px;
            width: 100%;
            height: 56px;">&nbsp;</a>
    </Proxy>
</div>

<style>
	.content :global(.contentItem) {
		width: 100%;

		margin-bottom: 10px;
	}
</style>
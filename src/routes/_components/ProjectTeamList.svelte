<script>
	import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import { loadProfile } from '../../actions/appActions';

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
        <Hotspot onClick="{e => loadProfile('bl20a8lm')}" style="
            left: 0;
            top: 31px;
            width: 100%;
            height: 56px;" />
    </Proxy>
</div>

<style>
	.content :global(.contentItem) {
		width: 100%;

		margin-bottom: 10px;
	}
</style>
<script>
    import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import { showLikes } from '../../actions/appActions.js';

    export let isOwner = false;
    $: proxyImage = isOwner ? 'profile_overview_owner' : 'profile_overview';
</script>

<div class="content">
	<Proxy image="{proxyImage}" >
        <!-- Likes -->
        <Hotspot onClick="{showLikes}" style="
            left: 199px;
            top: 144px;
            width: 77px;
            height: 39px;" />
    </Proxy>
</div>

<style>
</style>
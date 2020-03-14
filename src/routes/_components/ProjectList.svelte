<script>
    import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import { loadProject } from '../../actions/appActions.js';
</script>

<div class="content">
	<Proxy image="profile_projects" className="contentItem" >
        <!-- Project Links -->
        <Hotspot onClick="{e => loadProject('s7djj2s2')}" style="
            left: 0px;
            top: 40px;
            width: 100%;
            height: 154px;" />
    </Proxy>
</div>

<style>
	.content :global(.contentItem) {
		width: 100%;

		margin-bottom: 10px;
	}
</style>
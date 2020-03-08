<script>
    import Proxy from '../../components/Proxy.svelte';

	let projectId = 'm62lsp2o';
</script>

<div class="content">
	<Proxy image="profile_projects" className="contentItem" >
        <!-- Project Link -->
        <a href="projects/{projectId}" style="
            left: 0px;
            top: 40px;
            width: 100%;
            height: 154px;">&nbsp;</a>
    </Proxy>
</div>

<style>
	.content :global(.contentItem) {
		width: 100%;

		margin-bottom: 10px;
	}
</style>
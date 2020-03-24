<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';

	import locale from '../../locale';

	import { createProject } from '../../actions/projectActions';

	let title = '';
	let description = '';
	let headerImage = 'header2';

	function createNewProject() {
		const projectDetails = {
			title,
			description,
			headerImage,
		};
		createProject(projectDetails);
	}

</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<Proxy image="create_project" className="proxyOverlay" /> <!-- onClick="{createNewProject}" -->
		<div class="panelContent">
			<div class="field">
				<div class="label">{locale.NEW_PROJECT.TITLE}</div>
        		<input type="text" bind:value="{title}" />
			</div>
			<div class="field">
				<div class="label">{locale.NEW_PROJECT.DESCRIPTION}</div>
        		<textarea bind:value="{description}" />
			</div>
		</div>
	</div>
</ScrollView>

<style>
    .content :global(.proxyOverlay) {
        position: absolute;
		pointer-events: none;
        opacity: 0.5;
    }

	.panelContent {
    	padding: 28px 21px;
	}

	.field {
		padding-bottom: 30px;
	}

	.label {
		font-size: 1.3rem;
    	padding-left: 4px;
    	padding-bottom: 4px;
	}

	input {
        border: none;
        outline: none;
        background: none;

		border-bottom: 1px solid #999999;

        width: 100%;
        box-sizing: border-box;

        font-size: 1.5rem;
		color: #555555;

        padding: 6px 4px;
	}

	textarea {
        border: 1px solid #999999;

        outline: none;
        background: none;

        width: 100%;
		height: 70px;

        box-sizing: border-box;

        font-size: 1.5rem;
    	color: #555555;

        padding: 6px 4px;

    	margin-top: 4px;

		resize: none;
	}
</style>
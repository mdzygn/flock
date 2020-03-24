<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';

	import Button from '../../components/Button.svelte';

    import NextArrowIcon from "../../assets/icons/next_arrow.png";

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
			<div class="field descriptionField">
				<div class="label">{locale.NEW_PROJECT.DESCRIPTION}</div>
        		<textarea bind:value="{description}" />
			</div>
			<div class="field headerImageField">
				<div class="label headerImageLabel">{locale.NEW_PROJECT.HEADER_IMAGE}</div>
        		<div class="headerImageContainer"></div>
			</div>
			<div class="actions">
				<Button className="nextButton" onClick="{createNewProject}" icon="{NextArrowIcon}">next</Button>
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
    	padding: 28px 0;
	}

	.field {
    	padding: 0 21px;
		padding-bottom: 30px;
	}

	.descriptionField {
    	padding-bottom: 18px;
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

	.headerImageField {
    	padding: 0;
	}

	.headerImageLabel {
    	padding-left: 25px;
    	padding-right: 21px;
	}

	.headerImageContainer {
		width: 100%;
		height: 220px;

    	background-color: #E3E3E3;
    	margin-top: 10px;
	}

	.actions {
		position: relative;
		height: 30px;
		margin-top: 10px;
	}

	.content :global(.nextButton) {
        position: absolute;
		top: 3px;
		right: 12px;

		padding: 10px;
		padding-right: 39px;

        font-size: 1.5rem;
        font-weight: 700;
    }
    .content :global(.nextButton .icon) {
    	padding-left: 20px;
    }
</style>
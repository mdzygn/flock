<script>
	import locale from '../../locale';

	import config from '../../config';

	import { testInputDefocus, delayedTimeout } from '../../utils';

	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';

	import LimitedTextfield from '../../components/LimitedTextfield.svelte';
	import Button from '../../components/Button.svelte';

	import ImageSelectionBox from '../_components/ImageSelectionBox.svelte';

    import NextArrowIcon from "../../assets/icons/next_arrow.png";

	import { createProject } from '../../actions/projectActions';

	let title = '';
	let description = '';
	let image = null; // 'header2';

	let titleField;
	let descriptionField;

	let remainingChars;
	$: charCountLow = remainingChars < config.PROJECT_DESCRIPTION_CHARS_LOW;

	let contextSearchString = '';

	$: {
		updateContextString(title, description);
	}

	function updateContextString() {
		delayedTimeout('updateContextString', () => {
			contextSearchString = (title + ' ' + description).trim();
		}, config.UPDATE_CONTEXT_STRING_DELAY);
	}

    // $: titleField && titleField.focus();

	$: nextEnabled = title && description && image;

	function createNewProject() {
		const projectDetails = {
			title,
			description,
			headerImage: image,
		};
		createProject(projectDetails);
	}

	function testSubmit() {
		if (nextEnabled) {
			createNewProject();
		}
	}

</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<!-- <Proxy image="create_project" className="proxyOverlay" /> -->
		<div class="panelContent">
			<div class="field">
				<div class="label">{locale.NEW_PROJECT.TITLE}</div>
        		<input type="text" bind:value="{title}" bind:this="{titleField}" on:keypress="{e => testInputDefocus(e, {target: descriptionField})}" />
			</div>
			<div class="field descriptionField">
				<div class="label">{locale.NEW_PROJECT.DESCRIPTION}</div>
				<div class="fieldCharCount" class:charCountLow="{charCountLow}">{remainingChars}{charCountLow ? ' characters remaining' : ''}</div>
				<LimitedTextfield bind:value="{description}" bind:field="{descriptionField}" bind:remainingChars="{remainingChars}" maxlength="{config.MAX_PROJECT_DESCRIPTION_CHARS}" on:keypress="{e => testInputDefocus(e, {action: testSubmit})}" />
				<div class="fieldNote">{@html locale.NEW_PROJECT.DESCRIPTION_NOTE}</div>
			</div>
			<div class="field headerImageField">
				<div class="label headerImageLabel">{locale.NEW_PROJECT.HEADER_IMAGE}</div>
				<ImageSelectionBox bind:image {contextSearchString} />
			</div>
			<div class="actions">
				<Button className="nextButton" disabled="{!nextEnabled}" onClick="{createNewProject}" icon="{NextArrowIcon}">{locale.NEW_PROJECT.CONFIRM}</Button>
			</div>
		</div>
	</div>
</ScrollView>

<style>
    /* .content :global(.proxyOverlay) {
        position: absolute;
		pointer-events: none;
        opacity: 0.5;
    } */

	.panelContent {
    	padding: 28px 0;
	}

	.field {
		position: relative;
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
		color: #555555;
	}

	.fieldCharCount {
		position: absolute;
		right: 20px;
		margin-top: -22px;
		font-size: 1.2rem;
		color: #888888;
	}
	.charCountLow {
		color: #DF3C3C;
	}

	.fieldNote {
    	font-size: 1.1rem;
    	color: #aaaaaa;
    	/* color: #999999; */
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

	.content :global(textarea) {
        border: 1px solid #999999;

        outline: none;
        background: none;

        width: 100%;
		height: 88px;

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

	.headerImageField :global(.imageSelectionBox) {
		height: 245px;
    	margin-top: 10px;
	}

	.actions {
		position: relative;
		height: 60px;
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
    /* .content :global(.nextButton.disabled) {
		opacity: 0.15;
    } */
    .content :global(.nextButton .icon) {
    	padding-left: 20px;
    	margin-top: -1px;
    }
</style>
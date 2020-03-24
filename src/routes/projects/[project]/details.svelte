<script>
    import { tick } from 'svelte';
	import { goto } from '@sapper/app';

	import locale from '../../../locale';

	import { testInputDefocus } from '../../../utils/utils';

	import { editingProject } from '../../../models/projectViewModel';

	import { getFormattedText, getUnformattedText } from '../../../utils/utils';

	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';
	import Hotspot from '../../../components/Hotspot.svelte';

	import Button from '../../../components/Button.svelte';

	import AddImageIcon from "../../../assets/icons/add_small.png";
    import CancelIcon from "../../../assets/icons/cancel.png";
	import SaveIcon from "../../../assets/icons/save.png";

	import { project, projectId } from '../../../models/appModel';
	import { saveProjectDetails } from '../../../actions/projectActions';

	let title = ($project && $project.title) || '';
	let description = ($project && $project.description) || '';
	let headerImage = ($project && $project.headerImage) || '';

	$: saveEnabled = !editingProject || (title && description);

	let detail1 = '';
	let detail2 = '';
	let detail3 = '';
	let detail4 = '';

	let descriptionInput;
	let detailInput1;
	let detailInput2;
	let detailInput3;
	let detailInput4;

	let detailInitialized = false;

	let MIN_DETAIL_INPUT_HEIGHT = 140;
	let MAX_DETAIL_INPUT_HEIGHT = 385;
	let DETAIL_INPUT_PADDING = 4;

	$: {
		if (!detailInitialized) {
			detailInitialized= true;
			detail1 = getFormattedDetail($project, 0);
			detail2 = getFormattedDetail($project, 1);
			detail3 = getFormattedDetail($project, 2);
			detail4 = getFormattedDetail($project, 3);

			updateRegionSizes();
		}
	}

	async function updateRegionSizes() {
        await tick();

		// if (descriptionInput) { descriptionInput.style = 'height: ' + getRegionHeight(descriptionInput.scrollHeight) + 'px'; }
		if (detailInput1) { detailInput1.style = 'height: ' + getRegionHeight(detailInput1.scrollHeight) + 'px'; }
		if (detailInput2) { detailInput2.style = 'height: ' + getRegionHeight(detailInput2.scrollHeight) + 'px'; }
		if (detailInput3) { detailInput3.style = 'height: ' + getRegionHeight(detailInput3.scrollHeight) + 'px'; }
		if (detailInput4) { detailInput4.style = 'height: ' + getRegionHeight(detailInput4.scrollHeight) + 'px'; }
	}

	function getRegionHeight(height) {
		return Math.min(Math.max(height + DETAIL_INPUT_PADDING, MIN_DETAIL_INPUT_HEIGHT), MAX_DETAIL_INPUT_HEIGHT);
	}

	function getFormattedDetail(project, index) {
		const text = (project && project.details && project.details[index] && project.details[index].detail) || '';
		if (text) {
			return getFormattedText(text); // text.replace(/<br\/>/g, '\r\n');
		} else {
			return text;
		}
	}

	function save() {
		let details = null;
		if ($project.details) {
			details = JSON.parse(JSON.stringify($project.details));
		}

		if (!details) {
			details = [];
		}

		const sourceDetails = [
			detail1,
			detail2,
			detail3,
			detail4,
		];

		for (let detailI = 0; detailI < 4; detailI++) {
			details[detailI] = details[detailI] || {};
			details[detailI].detail = getUnformattedText(sourceDetails[detailI]);
		}

		const projectDetails = {
			details,
		};

		if ($editingProject) {
			Object.assign(projectDetails, {
				title,
				description,
				headerImage,
			});
		}

		saveProjectDetails(projectDetails, {showProjectInfo: !$editingProject});
	}

	function cancel() {
		goto('projects/' + $projectId);
	}
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<!-- <Proxy image="create_project_2" className="proxyOverlay">
			<Hotspot onClick="{save}" style="
				right: 10px;
				top: 827px;
				width: 108px;
				height: 48px;" />
			<Hotspot onClick="{cancel}" style="
				left: 10px;
				top: 827px;
				width: 108px;
				height: 48px;" />
		</Proxy> -->

		<div class="panelContent">
			{#if $editingProject}
			<div class="mainProjectDetails">
				<div class="actions topActions">
					<Button className="saveButton" onClick="{save}" icon="{SaveIcon}" disabled="{!saveEnabled}">{locale.EDIT_PROJECT_DETAILS.CONFIRM}</Button>
				</div>
				<div class="field">
					<div class="label">{locale.NEW_PROJECT.TITLE}</div>
					<input type="text" bind:value="{title}" on:keypress="{(e) => testInputDefocus(e, {target: descriptionInput})}" />
				</div>
				<div class="field descriptionField">
					<div class="label">{locale.NEW_PROJECT.DESCRIPTION}</div>
					<textarea bind:this="{descriptionInput}" bind:value="{description}" on:keypress="{testInputDefocus}" />
				</div>
				<div class="field headerImageField">
					<div class="label headerImageLabel">{locale.NEW_PROJECT.HEADER_IMAGE}</div>
					<div class="headerImageContainer"></div>
				</div>
			</div>
			{/if}
			<div class="imageField">
				<Button className="addImage" icon="{AddImageIcon}" disabled="{true}">{locale.EDIT_PROJECT_DETAILS.ADD_IMAGE}</Button>
			</div>
			<div class="field">
				<div class="label">{locale.EDIT_PROJECT_DETAILS.DETAIL_1_LABEL}<span class="tip">{@html locale.EDIT_PROJECT_DETAILS.DETAIL_1_TIP}</span></div>
        		<textarea bind:this="{detailInput1}" bind:value="{detail1}" class="detailTextarea" />
			</div>

			<div class="imageField">
				<Button className="addImage" icon="{AddImageIcon}" disabled="{true}">{locale.EDIT_PROJECT_DETAILS.ADD_IMAGE}</Button>
			</div>
			<div class="field">
				<div class="label">{locale.EDIT_PROJECT_DETAILS.DETAIL_2_LABEL}<span class="tip">{@html locale.EDIT_PROJECT_DETAILS.DETAIL_2_TIP}</span></div>
        		<textarea bind:this="{detailInput2}" bind:value="{detail2}" class="detailTextarea" />
			</div>

			<div class="imageField">
				<Button className="addImage" icon="{AddImageIcon}" disabled="{true}">{locale.EDIT_PROJECT_DETAILS.ADD_IMAGE}</Button>
			</div>
			<div class="field">
				<div class="label">{locale.EDIT_PROJECT_DETAILS.DETAIL_3_LABEL}<span class="tip">{@html locale.EDIT_PROJECT_DETAILS.DETAIL_3_TIP}</span></div>
        		<textarea bind:this="{detailInput3}" bind:value="{detail3}" class="detailTextarea" />
			</div>

			<div class="imageField">
				<Button className="addImage" icon="{AddImageIcon}" disabled="{true}">{locale.EDIT_PROJECT_DETAILS.ADD_IMAGE}</Button>
			</div>
			<div class="field">
				<div class="label">{locale.EDIT_PROJECT_DETAILS.DETAIL_4_LABEL}<span class="tip">{@html locale.EDIT_PROJECT_DETAILS.DETAIL_4_TIP}</span></div>
        		<textarea bind:this="{detailInput4}" bind:value="{detail4}" class="detailTextarea" />
			</div>

			<div class="actions">
				<Button className="cancelButton" onClick="{cancel}" icon="{CancelIcon}">{locale.EDIT_PROJECT_DETAILS.CANCEL}</Button>
				<Button className="saveButton" onClick="{save}" icon="{SaveIcon}" disabled="{!saveEnabled}">{locale.EDIT_PROJECT_DETAILS.CONFIRM}</Button>
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
    	padding-top: 4px;
	}

	.field {
    	padding: 0 21px;
    	padding-top: 18px;
	}

	.imageField {
		position: relative;
		height: 29px;
	}

	.label {
		font-size: 1.3rem;
    	padding-left: 4px;
    	padding-bottom: 4px;
		color: #555555;
	}

	.tip {
    	padding-left: 13px;

		color: #999999;
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

	.headerImageContainer {
		width: 100%;
		height: 220px;

    	background-color: #E3E3E3;
    	margin-top: 10px;
	}


	.mainProjectDetails {
		padding-bottom: 20px;
	}


	.detailTextarea {
        border: 1px solid #999999;

        outline: none;
        background: none;

        width: 100%;
    	height: 140px;
    	/* height: 236px; */

        box-sizing: border-box;

        /* font-size: 1.5rem; */
    	font-size: 1.4rem;
    	color: #555555;

        padding: 6px 4px;

    	margin-top: 4px;

		resize: none;
	}

	.content :global(.addImage) {
		position: absolute;
    	top: 6px;
		right: 5px;

		padding: 10px;
		padding-right: 45px;
		padding-left: 13px;

		font-size: 1.2rem;
		font-weight: 700;
    }
    .content :global(.addImage .icon) {
    	padding-left: 14px;
		margin-top: -1px;
    }


	.actions {
		position: relative;
		height: 60px;
		margin-top: 10px;
	}
	.topActions {
		height: 0;
		margin-top: 0;
	}


	.content :global(.saveButton) {
        position: absolute;
		top: 3px;
		right: 17px;

		padding: 10px;
		padding-right: 46px;

        font-size: 1.5rem;
        font-weight: 700;
    }
    .content :global(.saveButton .icon) {
    	padding-left: 20px;
    	margin-top: -1px;
    }


	.content :global(.cancelButton) {
        position: absolute;
		top: 3px;
    	left: 19px;

		padding: 10px;
		padding-right: 39px;

        font-size: 1.5rem;
        font-weight: 700;
    }
    .content :global(.cancelButton .icon) {
    	padding-left: 12px;
    	margin-top: -1px;
    }
</style>
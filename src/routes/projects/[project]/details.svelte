<script>
    import { tick } from 'svelte';
	import { goto } from '@sapper/app';

	import Select from '../../../components/Select';
  	// import Select from 'svelte-select';

	import config from '../../../config';
	import { gotoAnchor, inputFormat } from '../../../utils';
	import locale from '../../../locale';

	import { trim, testInputDefocus, getFormattedText } from '../../../utils';

	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';
	import Hotspot from '../../../components/Hotspot.svelte';

	import LimitedTextfield from '../../../components/LimitedTextfield.svelte';
	import Button from '../../../components/Button.svelte';
	import ImageSelectionBox from '../../_components/ImageSelectionBox.svelte';
	import FilterBar from './../../_components/FilterBar.svelte';

	import AddImageIcon from "../../../assets/icons/add_small.png";
	import RemoveImageIcon from "../../../assets/icons/clear.png";
    import CancelIcon from "../../../assets/icons/cancel.png";
	import SaveIcon from "../../../assets/icons/save.png";
    import NextArrowIcon from "../../../assets/icons/next_arrow.png";

	import { project, projectId, editingProjectMode, showBetaFeatures } from '../../../models/appModel';
	import { saveProjectDetails } from '../../../actions/projectActions';
	
	import ProjectTypes, { ProjectTypeCategories } from '../../../config/ProjectTypes';
	import ProjectStatuses from '../../../config/ProjectStatuses';

	let title = ($project && $project.title) || '';
	let description = ($project && $project.description) || '';
	let image = ($project && $project.headerImage) || '';
	let categories = ($project && $project.categories) || '';
	let tags = ($project && $project.tags) || '';
	let skills = ($project && $project.skills) || '';
	// let skills = ($project && $project.skills && (typeof $project.skills === 'string' ? $project.skills : $project.skills.join(', '))) || '';
	let location = ($project && $project.location) || '';
	let projectType = ($project && $project.projectType) || '';
	let projectStatus = ($project && $project.status) || '';

	// let projectTypeValue = undefined;
	// $: {
	// 	if (!projectTypeValue) {
	// 		projectTypeValue = {value: projectType, label: projectType};
	// 	} else if (projectType !== projectTypeValue.value) {
	// 		projectType = projectTypeValue.value;
	// 	}
	// }

	$: projectTitleString = ($project && $project.title && $project.title + ' - ') || '';

    let categoriesInvalid = false;
	let projectTypeInvalid = false;
	let projectStatusInvalid = false;

	let projectTypeItems = ProjectTypes.map(item => {return {value: item, label: item};});
	let projectStatusItems = ProjectStatuses.map(item => {return {value: item, label: item};});
	
	// [
	// 	{value: 'chocolate', label: 'Chocolate'},
	// 	{value: 'pizza', label: 'Pizza'},
	// 	{value: 'cake', label: 'Cake'},
	// 	{value: 'chips', label: 'Chips'},
	// 	{value: 'ice-cream', label: 'Ice Cream'},
	// ];

	let headerImageIsUploading;
	let detail1ImageIsUploading;
	let detail2ImageIsUploading;
	let detail3ImageIsUploading;
	let detail4ImageIsUploading;

	$: imageIsUploading = headerImageIsUploading || detail1ImageIsUploading || detail2ImageIsUploading || detail3ImageIsUploading || detail4ImageIsUploading;

	let remainingChars;
	let descriptionCharsOver;
	$: charCountLow = (remainingChars !== '') && remainingChars < config.PROJECT_DESCRIPTION_CHARS_LOW;

	$: saveEnabled = (($editingProjectMode !== 'edit') || (trim(title) && trim(description) && !descriptionCharsOver)) && !imageIsUploading;
	// $: saveEnabled = (!editingProject || (title && description)) && !imageIsUploading;

	let detail1 = '';
	let detail2 = '';
	let detail3 = '';
	let detail4 = '';

	let detailImage1 = null;
	let detailImage2 = null;
	let detailImage3 = null;
	let detailImage4 = null;

	let addingDetailImage = [];

	let descriptionInput;
	let tagsInput;
	let skillsInput;
	let locationInput;
	let typeInput;
	let statusInput;

	let detailInput1;
	let detailInput2;
	let detailInput3;
	let detailInput4;

	let detailInitialized = false;

	const MIN_DETAIL_INPUT_HEIGHT = 130; // 140;
	const MAX_DETAIL_INPUT_HEIGHT = 388; // 385;
	const DETAIL_INPUT_PADDING = 4;

	const detailImageType = null; // /image\/jpeg|image\/gif/; // null;

	$: {
		if (!detailInitialized) {
			detailInitialized= true;
			detail1 = getFormattedDetail($project, 0);
			detail2 = getFormattedDetail($project, 1);
			detail3 = getFormattedDetail($project, 2);
			detail4 = getFormattedDetail($project, 3);

			detailImage1 = getDetailImage($project, 0);
			detailImage2 = getDetailImage($project, 1);
			detailImage3 = getDetailImage($project, 2);
			detailImage4 = getDetailImage($project, 3);

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

	function getDetailImage(project, index) {
		const image = (project && project.details && project.details[index] && project.details[index].image) || null;
		return image;
	}

	function save() {
		if (!saveEnabled) {
			return;
		}

		if (!projectType.trim()) {
			projectTypeInvalid = true;
			gotoAnchor('projectType');
			return;
		} else {
			projectTypeInvalid = false;
		}

		if (!categories.trim()) {
			categoriesInvalid = true;
			gotoAnchor('categories');
			return;
		} else {
			categoriesInvalid = false;
		}

		if (!projectStatus.trim()) {
			projectStatusInvalid = true;
			gotoAnchor('projectStatus');
			return;
		} else {
			projectStatusInvalid = false;
		}

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
		const sourceDetailsImages = [
			detailImage1,
			detailImage2,
			detailImage3,
			detailImage4,
		];

		for (let detailI = 0; detailI < 4; detailI++) {
			details[detailI] = details[detailI] || {};
			details[detailI].detail = trim(sourceDetails[detailI]);
			details[detailI].image = sourceDetailsImages[detailI];
		}

		const projectDetails = {
			details,
		};

		if ($editingProjectMode === 'edit') {
			Object.assign(projectDetails, {
				title: trim(title),
				description: trim(description),
				headerImage: image,
				categories: trim(categories),
				tags: trim(tags),
				skills: trim(skills),
				location: trim(location),
				projectType: trim(projectType),
				status: trim(projectStatus),
			});
		} else if ($editingProjectMode === 'details2') {
			Object.assign(projectDetails, {
				categories: trim(categories),
				tags: trim(tags),
				skills: trim(skills),
				location: trim(location),
				projectType: trim(projectType),
				status: trim(projectStatus),
			});
		}

		saveProjectDetails(projectDetails, {editProjectDetails: ($editingProjectMode === 'details2'), showProjectInfo: ($editingProjectMode === 'addDetails' || $editingProjectMode === 'details3')});
	}

	function addImage(index) {
		addingDetailImage[index] = true;
	}

	function removeImage(index) {
		addingDetailImage[index] = false;
		switch (index) {
			case 0:
				detailImage1 = null;
				break;
			case 1:
				detailImage2 = null;
				break;
			case 2:
				detailImage3 = null;
				break;
			case 3:
				detailImage4 = null;
				break;
		}
	}

	function cancel() {
		goto('projects/' + $projectId);
	}

	function onProjectTypeSelect() {
		const projectTypeCategory = ProjectTypeCategories[projectType];

		if (projectTypeCategory && projectTypeCategory.length) {
            const categoryItems = categories.trim().split(', ');
			projectTypeCategory.forEach(item => {
				if (categoryItems.indexOf(item) === -1) {
					categoryItems.push(item);
				}
			});
			categories = categoryItems.join(', ').trim();
		}
	}
</script>

<svelte:head>
	<title>{projectTitleString}Flock</title>
	<style>
		body {
			overscroll-behavior-y: contain; /* Disables pull-to-refresh but allows overscroll effects. */
		}
	</style>
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
			{#if ($editingProjectMode === 'edit' || $editingProjectMode === 'addDetails')}
				<div class="actions topActions">
					<Button className="saveButton" onClick="{save}" icon="{SaveIcon}" disabled="{!saveEnabled}">{locale.EDIT_PROJECT_DETAILS.CONFIRM}</Button>
				</div>
			{/if}

			{#if ($editingProjectMode === 'edit' || $editingProjectMode === 'details2')}
				<div class="mainProjectDetails">
					{#if ($editingProjectMode === 'edit')}
						<div class="field">
							<div class="label">{locale.NEW_PROJECT.TITLE}</div>
							<input type="text" bind:value="{title}" autocapitalize="sentences" on:keypress="{(e) => testInputDefocus(e, {target: descriptionInput})}" on:keyup="{(e) => inputFormat(e, {capitalizeFirstKeypress: true})}" />
						</div>
						<div class="field descriptionField">
							<div class="label">{locale.NEW_PROJECT.DESCRIPTION}</div>
							<!-- <textarea bind:value="{description}" bind:this="{descriptionInput}" on:keypress="{testInputDefocus}" /> -->
							<div class="fieldCharCount" class:charCountLow="{charCountLow}" class:charCountOver="{descriptionCharsOver}">{descriptionCharsOver ? descriptionCharsOver : remainingChars}{descriptionCharsOver ? ' characters over': (charCountLow ? ' characters remaining' : '')}</div>
							<LimitedTextfield bind:value="{description}" bind:field="{descriptionInput}" bind:remainingChars="{remainingChars}" bind:charsOver="{descriptionCharsOver}" maxlength="{config.MAX_PROJECT_DESCRIPTION_CHARS}" autocapitalize="sentences" on:keypress="{testInputDefocus}" />
						</div>
						<div class="field headerImageField">
							<div class="label headerImageLabel">{locale.NEW_PROJECT.HEADER_IMAGE}</div>
							<ImageSelectionBox bind:image bind:fileIsUploading="{headerImageIsUploading}" uploadType="projectHeader" itemId="{$projectId}" />
						</div>
					{/if}

					<div id="projectType" class="field">
						<div class="label labelDetails">{locale.EDIT_PROJECT_DETAILS.TYPE}
							{#if projectTypeInvalid}
								<span class="errorLabel">{@html locale.EDIT_PROJECT_DETAILS.TYPE_ERROR}</span>
							{:else}
								<span class="tip">{@html locale.EDIT_PROJECT_DETAILS.TYPE_TIP}</span>
							{/if}
						</div>
						<Select items="{projectTypeItems}" bind:selectedValueString="{projectType}" on:select="{onProjectTypeSelect}"></Select>
					</div>
					<div id="categories" class="field descriptionField">
						<div class="label labelDetails">{locale.EDIT_PROJECT_DETAILS.CATEGORIES}
							{#if categoriesInvalid}
								<span class="errorLabel">{locale.EDIT_PROJECT_DETAILS.CATEGORIES_ERROR}</span>
							{:else}
								<span class="tip">{@html locale.EDIT_PROJECT_DETAILS.CATEGORIES_TIP}</span>
							{/if}
						</div>
						<FilterBar bind:filterString={categories} isCategorySelector="{true}" />
					</div>
					<div class="field descriptionField">
						<div class="label labelDetails">{locale.EDIT_PROJECT_DETAILS.TAGS}<span class="tip">{@html locale.EDIT_PROJECT_DETAILS.TAGS_TIP}</span></div>
						<textarea bind:value="{tags}" bind:this="{tagsInput}" on:keyup="{(e) => inputFormat(e, {keepLowerCase: true})}" />
					</div>
					<div class="field">
						<div class="label labelDetails">{locale.EDIT_PROJECT_DETAILS.LOCATION}<span class="tip">{@html locale.EDIT_PROJECT_DETAILS.LOCATION_TIP}</span></div>
						<input type="text" bind:value="{location}" bind:this="{locationInput}" on:keypress="{(e) => testInputDefocus(e, {target: skillsInput})}" autocapitalize="sentences" on:keyup="{(e) => inputFormat(e, {capitalizeFirstKeypress: true})}" />
					</div>
					<div id="projectStatus" class="field">
						<div class="label labelDetails">{locale.EDIT_PROJECT_DETAILS.STATUS}
							{#if projectStatusInvalid}
								<span class="errorLabel">{@html locale.EDIT_PROJECT_DETAILS.STATUS_ERROR}</span>
							{:else}
								<span class="tip">{@html locale.EDIT_PROJECT_DETAILS.STATUS_TIP}</span>
							{/if}
						</div>
						<Select items="{projectStatusItems}" bind:selectedValueString="{projectStatus}"></Select>
						<!-- <input type="text" bind:value="{projectStatus}" bind:this="{statusInput}" on:keypress="{(e) => testInputDefocus(e, {target: tagsInput})}" autocapitalize="sentences" on:keyup="{(e) => inputFormat(e, {capitalizeFirstKeypress: true})}" /> -->
					</div>
					<div class="field descriptionField">
						<div class="label labelDetails">{locale.EDIT_PROJECT_DETAILS.SKILLS}<span class="tip">{@html locale.EDIT_PROJECT_DETAILS.SKILLS_TIP}</span></div>
						<textarea bind:value="{skills}" bind:this="{skillsInput}" on:keyup="{(e) => inputFormat(e, {keepLowerCase: true})}" />
					</div>
				</div>
			{/if}

			{#if ($editingProjectMode !== 'details2')}
				<div class="sectionTitle">{locale.EDIT_PROJECT_DETAILS.OVERVIEW_HEADING}</div>

				{#if detailImage1 || addingDetailImage[0]}
					<div class="imageField">
						<Button className="addImage removeImage" icon="{RemoveImageIcon}" onClick="{() => removeImage(0) }">{locale.EDIT_PROJECT_DETAILS.REMOVE_IMAGE}</Button>
					</div>
					<ImageSelectionBox className="detailImageSelector" bind:image="{detailImage1}" containMode="{true}" imageType="{detailImageType}" bind:fileIsUploading="{detail1ImageIsUploading}" itemIndex="1" uploadType="projectDetail" itemId="{$projectId}" />
				{:else}
					<div class="imageField">
						<Button className="addImage" icon="{AddImageIcon}" onClick="{() => addImage(0) }">{locale.EDIT_PROJECT_DETAILS.ADD_IMAGE}</Button>
					</div>
				{/if}

				<div class="field">
					<div class="label labelDetails">{locale.EDIT_PROJECT_DETAILS.DETAIL_1_LABEL}<span class="tip">{@html locale.EDIT_PROJECT_DETAILS.DETAIL_1_TIP}</span></div>
					<textarea bind:this="{detailInput1}" bind:value="{detail1}" class="detailTextarea" autocapitalize="sentences" on:keyup="{(e) => inputFormat(e, {capitalizeFirstKeypress: true})}" />
				</div>

				{#if detailImage2 || addingDetailImage[1]}
					<div class="imageField">
						<Button className="addImage" onClick="{() => removeImage(1) }">{locale.EDIT_PROJECT_DETAILS.REMOVE_IMAGE}</Button>
					</div>
					<ImageSelectionBox className="detailImageSelector" bind:image="{detailImage2}" containMode="{true}" imageType="{detailImageType}" bind:fileIsUploading="{detail2ImageIsUploading}" itemIndex="2" uploadType="projectDetail" itemId="{$projectId}" />
				{:else}
					<div class="imageField">
						<Button className="addImage" icon="{AddImageIcon}" onClick="{() => addImage(1) }">{locale.EDIT_PROJECT_DETAILS.ADD_IMAGE}</Button>
					</div>
				{/if}
				<div class="field">
					<div class="label labelDetails">{locale.EDIT_PROJECT_DETAILS.DETAIL_2_LABEL}<span class="tip">{@html locale.EDIT_PROJECT_DETAILS.DETAIL_2_TIP}</span></div>
					<textarea bind:this="{detailInput2}" bind:value="{detail2}" class="detailTextarea" autocapitalize="sentences" on:keyup="{(e) => inputFormat(e, {capitalizeFirstKeypress: true})}" />
				</div>

				{#if detailImage3 || addingDetailImage[2]}
					<div class="imageField">
						<Button className="addImage" onClick="{() => removeImage(2) }">{locale.EDIT_PROJECT_DETAILS.REMOVE_IMAGE}</Button>
					</div>
					<ImageSelectionBox className="detailImageSelector" bind:image="{detailImage3}" containMode="{true}" imageType="{detailImageType}" bind:fileIsUploading="{detail3ImageIsUploading}" itemIndex="3" uploadType="projectDetail" itemId="{$projectId}" />
				{:else}
					<div class="imageField">
						<Button className="addImage" icon="{AddImageIcon}" onClick="{() => addImage(2) }">{locale.EDIT_PROJECT_DETAILS.ADD_IMAGE}</Button>
					</div>
				{/if}
				<div class="field">
					<div class="label labelDetails">{locale.EDIT_PROJECT_DETAILS.DETAIL_3_LABEL}<span class="tip">{@html locale.EDIT_PROJECT_DETAILS.DETAIL_3_TIP}</span></div>
					<textarea bind:this="{detailInput3}" bind:value="{detail3}" class="detailTextarea" autocapitalize="sentences" on:keyup="{(e) => inputFormat(e, {capitalizeFirstKeypress: true})}" />
				</div>

				{#if detailImage4 || addingDetailImage[3]}
					<div class="imageField">
						<Button className="addImage" onClick="{() => removeImage(3) }">{locale.EDIT_PROJECT_DETAILS.REMOVE_IMAGE}</Button>
					</div>
					<ImageSelectionBox className="detailImageSelector" bind:image="{detailImage4}" containMode="{true}" imageType="{detailImageType}" bind:fileIsUploading="{detail4ImageIsUploading}" itemIndex="4" uploadType="projectDetail" itemId="{$projectId}" />
				{:else}
					<div class="imageField">
						<Button className="addImage" icon="{AddImageIcon}" onClick="{() => addImage(3) }">{locale.EDIT_PROJECT_DETAILS.ADD_IMAGE}</Button>
					</div>
				{/if}
				<div class="field">
					<div class="label labelDetails">{locale.EDIT_PROJECT_DETAILS.DETAIL_4_LABEL}<span class="tip">{@html locale.EDIT_PROJECT_DETAILS.DETAIL_4_TIP}</span></div>
					<textarea bind:this="{detailInput4}" bind:value="{detail4}" class="detailTextarea" autocapitalize="sentences" on:keyup="{(e) => inputFormat(e, {capitalizeFirstKeypress: true})}" />
				</div>
			{/if}

			<div class="actions">
				{#if ($editingProjectMode === 'edit' || $editingProjectMode === 'addDetails')}
					<Button className="cancelButton" onClick="{cancel}" icon="{CancelIcon}">{locale.EDIT_PROJECT_DETAILS.CANCEL}</Button>
				{/if}

				{#if ($editingProjectMode === 'details2')}
					<Button className="saveButton" onClick="{save}" disabled="{!saveEnabled}" icon="{SaveIcon}">{locale.NEW_PROJECT.DETAILS_2_CONFIRM}</Button>
				{:else if ( $editingProjectMode === 'details3')}
					<Button className="saveButton" onClick="{save}" disabled="{!saveEnabled}" icon="{SaveIcon}">{locale.NEW_PROJECT.DETAILS_3_CONFIRM}</Button>
				{:else}
					<Button className="saveButton" onClick="{save}" disabled="{!saveEnabled}" icon="{SaveIcon}">{locale.EDIT_PROJECT_DETAILS.CONFIRM}</Button>
				{/if}
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
    	padding: 0 16px;
    	padding-top: 18px;
	}

	.imageField {
		position: relative;
		height: 44px;
		margin-bottom: -20px;
	}
	.content :global(.detailImageSelector) {
		margin-top: 20px;
	}

	.sectionTitle {
        font-size: 1.5rem;
        font-weight: 700;
		color: #444444;

		padding-left: 23px;
		padding-bottom: 6px;
		padding-top: 13px;
	}


	.label {
		font-size: 1.3rem;
    	padding-left: 7px;
    	padding-bottom: 4px;
		color: #555555;
	}

	.labelDetails {
		font-weight: 700;
	}

	.fieldCharCount {
		position: absolute;
		right: 20px;
		margin-top: -22px;
		font-size: 1.2rem;
		color: #888888;
	}
	.charCountLow {
		color: #888888;
	}
	.charCountOver {
		color: #DF3C3C;
		font-weight: 700;
	}

	.tip {
    	padding-left: 13px;

    	font-size: 1.2rem;
		font-weight: initial;

		color: #999999;
	}


	input {
        border: none;
        outline: none;
        background: none;

		border-bottom: 1px solid #cccccc;

        width: 100%;
        box-sizing: border-box;

        font-size: 1.5rem;
		color: #555555;

        padding: 6px 7px;
		/* padding-left: 0; */
	}

	.content :global(textarea) {
        border: 1px solid #cccccc;

        outline: none;
        background: none;

        width: 100%;
		height: 90px;

        box-sizing: border-box;

        font-size: 1.5rem;
		line-height: 2rem;
    	color: #555555;

        padding: 4px 6px;

    	margin-top: 4px;

		resize: none;
	}
	.content :global(textarea.charsOver) {
		color: #DF3C3C;
	}

	.headerImageField {
    	padding: 0;
    	padding-top: 10px;
	}

	.headerImageLabel {
		padding-left: 23px;
		padding-right: 23px;
	}


	.headerImageField :global(.imageSelectionBox) {
		/* height: 245px; */
    	margin-top: 10px;
	}

	.mainProjectDetails {
		padding-bottom: 20px;
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
    .content :global(.addImage.removeImage .icon) {
		transform: scale(0.4, 0.4);
		opacity: 0.6;
    	padding-left: 24px;
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
		right: 8px;

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
    	left: 13px;

		padding: 10px;
		padding-right: 39px;

        font-size: 1.5rem;
        font-weight: 700;
    }
    .content :global(.cancelButton .icon) {
    	padding-left: 12px;
    	margin-top: -1px;
    }

    .errorLabel {
    	padding-left: 13px;
		font-weight: 700;
		/* font-weight: initial; */

    	/* padding-left: 7px;
		padding-bottom: 12px;
		padding-top: 2px;
		margin-bottom: -18px; */

        /* position: absolute;
        right: 20px; */

        font-size: 1.2rem;

        color: #DF3C3C;
    }
</style>
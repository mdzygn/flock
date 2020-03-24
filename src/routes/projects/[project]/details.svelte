<script>
	import { goto } from '@sapper/app';

	import locale from '../../../locale';

	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';
	import Hotspot from '../../../components/Hotspot.svelte';

	import Button from '../../../components/Button.svelte';

	import AddImageIcon from "../../../assets/icons/add_small.png";
    import CancelIcon from "../../../assets/icons/cancel.png";
	import SaveIcon from "../../../assets/icons/save.png";

	import { project, projectId } from '../../../models/appModel';
	import { saveProjectDetails } from '../../../actions/projectActions';

	let detail1 = '';
	let detail2 = '';
	let detail3 = '';
	let detail4 = '';

	let detailInitialized = false;

	$: {
		if (!detailInitialized) {
			detailInitialized= true;
			detail1 = ($project.details && $project.details[0] && $project.details[0].detail) || '';
			detail2 = ($project.details && $project.details[1] && $project.details[1].detail) || '';
			detail3 = ($project.details && $project.details[2] && $project.details[2].detail) || '';
			detail4 = ($project.details && $project.details[3] && $project.details[3].detail) || '';
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
			details[detailI].detail = sourceDetails[detailI];
		}

		const projectDetails = {
			details,
		};

		saveProjectDetails(projectDetails);
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
		<Proxy image="create_project_2" className="proxyOverlay">
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
		</Proxy>

		<div class="panelContent">
			<div class="imageField">
				<Button className="addImage" icon="{AddImageIcon}" disabled="{true}">{locale.EDIT_PROJECT_DETAILS.ADD_IMAGE}</Button>
			</div>
			<div class="field">
				<div class="label">{locale.EDIT_PROJECT_DETAILS.DETAIL_1_LABEL}</div>
        		<textarea bind:value="{detail1}" />
			</div>

			<div class="imageField">
				<Button className="addImage" icon="{AddImageIcon}" disabled="{true}">{locale.EDIT_PROJECT_DETAILS.ADD_IMAGE}</Button>
			</div>
			<div class="field">
				<div class="label">{locale.EDIT_PROJECT_DETAILS.DETAIL_2_LABEL}</div>
        		<textarea bind:value="{detail2}" />
			</div>

			<div class="imageField">
				<Button className="addImage" icon="{AddImageIcon}" disabled="{true}">{locale.EDIT_PROJECT_DETAILS.ADD_IMAGE}</Button>
			</div>
			<div class="field">
				<div class="label">{locale.EDIT_PROJECT_DETAILS.DETAIL_3_LABEL}</div>
        		<textarea bind:value="{detail3}" />
			</div>

			<div class="imageField">
				<Button className="addImage" icon="{AddImageIcon}" disabled="{true}">{locale.EDIT_PROJECT_DETAILS.ADD_IMAGE}</Button>
			</div>
			<div class="field">
				<div class="label">{locale.EDIT_PROJECT_DETAILS.DETAIL_4_LABEL}</div>
        		<textarea bind:value="{detail4}" />
			</div>

			<div class="actions">
				<Button className="cancelButton" onClick="{cancel}" icon="{CancelIcon}">{locale.EDIT_PROJECT_DETAILS.CANCEL}</Button>
				<Button className="saveButton" onClick="{save}" icon="{SaveIcon}">{locale.EDIT_PROJECT_DETAILS.CONFIRM}</Button>
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

	textarea {
        border: 1px solid #999999;

        outline: none;
        background: none;

        width: 100%;
    	height: 140px;

        box-sizing: border-box;

        font-size: 1.5rem;
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
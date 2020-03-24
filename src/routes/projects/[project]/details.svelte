<script>
	import { goto } from '@sapper/app';

	import locale from '../../../locale';

	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';
	import Hotspot from '../../../components/Hotspot.svelte';

	import Button from '../../../components/Button.svelte';

    import NextArrowIcon from "../../../assets/icons/next_arrow.png";

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

		// for (let detailI = 0; detailI < sourceDetails.length; detailI++) {
		// 	if (sourceDetails[detailI] || details[detailI]) {
		// 		details[detailI] = details[detailI] || {};
		// 		details[detailI].detail = sourceDetails[detailI];
		// 	}
		// }

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
			<div class="field descriptionField">
				<div class="label">{locale.NEW_PROJECT.DESCRIPTION}</div>
        		<textarea bind:value="{detail1}" />
			</div>
			<div class="field descriptionField">
				<div class="label">{locale.NEW_PROJECT.DESCRIPTION}</div>
        		<textarea bind:value="{detail2}" />
			</div>
			<div class="field descriptionField">
				<div class="label">{locale.NEW_PROJECT.DESCRIPTION}</div>
        		<textarea bind:value="{detail3}" />
			</div>
			<div class="field descriptionField">
				<div class="label">{locale.NEW_PROJECT.DESCRIPTION}</div>
        		<textarea bind:value="{detail4}" />
			</div>
			<div class="field headerImageField">
				<div class="label headerImageLabel">{locale.NEW_PROJECT.HEADER_IMAGE}</div>
        		<div class="headerImageContainer"></div>
			</div>
			<div class="actions">
				<Button className="nextButton" onClick="{save}" icon="{NextArrowIcon}">{locale.NEW_PROJECT.EDIT_PROJECT_DETAILS}</Button>
			</div>
		</div>
	</div>
</ScrollView>

<style>
    .content :global(.proxyOverlay) {
        position: absolute;
		pointer-events: none;
        opacity: 0;
    }

	.panelContent {
    	padding: 28px 0;
	}

	.field {
    	padding: 0 21px;
		padding-bottom: 30px;
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
		height: 70px;

        box-sizing: border-box;

        font-size: 1.5rem;
    	color: #555555;

        padding: 6px 4px;

    	margin-top: 4px;

		resize: none;
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
    	margin-top: -1px;
    }
</style>
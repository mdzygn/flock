<script>
	import { tick } from 'svelte';
	import { writable } from 'svelte/store';
	import { goto } from '@sapper/app';

	import config from '../../../config';
	import locale from '../../../locale';

	import { testInputDefocus, getFormattedText, getUnformattedText } from '../../../utils';

	import ScrollView from '../../../components/ScrollView.svelte';
	import Proxy from '../../../components/Proxy.svelte';
	import Hotspot from '../../../components/Hotspot.svelte';

	import LimitedTextfield from '../../../components/LimitedTextfield.svelte';
	import Button from '../../../components/Button.svelte';
	import ImageSelectionBox from '../../_components/ImageSelectionBox.svelte';

    import AvatarIcon from '../../_components/AvatarIcon.svelte';

	import AddImageIcon from "../../../assets/icons/add_small.png";
    import CancelIcon from "../../../assets/icons/cancel.png";
	import SaveIcon from "../../../assets/icons/save.png";

	import { user, userId, showBetaFeatures } from '../../../models/appModel';
	import { saveProfile } from '../../../actions/userActions';

	import { getUserClone, randomiseUserProfileImageColor } from '../../../models/usersModel';

	let curUserProps = writable(null);
    $: { curUserProps = getUserClone(user) };

	let name = ($user && $user.name) || '';
	let bio = ($user && $user.bio && getFormattedText($user.bio)) || '';
	let image = ($user && $user.coverImage) || '';
	let skills = ($user && $user.skills) || '';
	let location = ($user && $user.location) || '';

	let remainingChars;
	$: charCountLow = (remainingChars !== '') && remainingChars < config.PROFILE_DESCRIPTION_CHARS_LOW;

	$: saveEnabled = !!(name);

	let bioInput;
	let skillsInput;
	let locationInput;

	function save() {
		const profileDetails = {
			name,
			bio: getUnformattedText(bio),
			coverImage: image,
			skills,
			location,
			style: $curUserProps.style,
		};

		saveProfile(profileDetails);
	}

    function randomiseProfileColor() {
        randomiseUserProfileImageColor(curUserProps);
    }

	function cancel() {
		goto('profile/' + $userId);
	}
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<div class="panelContent">
			<div class="mainProfileDetails">
				<div class="actions topActions">
					<Button className="saveButton" onClick="{save}" icon="{SaveIcon}" disabled="{!saveEnabled}">{locale.EDIT_PROFILE.CONFIRM}</Button>
				</div>

    			<AvatarIcon user="{curUserProps}" onClick="{randomiseProfileColor}"/>
				<div class="field">
					<div class="label">{locale.EDIT_PROFILE.NAME}</div>
					<input type="text" bind:value="{name}" on:keypress="{(e) => testInputDefocus(e, {target: bioInput})}" />
				</div>
				<div class="field bioField">
					<div class="label">{locale.EDIT_PROFILE.BIO}<span class="tip">{@html locale.EDIT_PROFILE.BIO_TIP}</span></div>
					<!-- <div class="fieldCharCount" class:charCountLow="{charCountLow}">{remainingChars}{charCountLow ? ' characters remaining' : ''}</div> -->
					<textarea bind:value="{bio}" bind:this="{bioInput}" on:keypress="{testInputDefocus}" />
					<!-- <LimitedTextfield bind:value="{bio}" bind:field="{bioInput}" bind:remainingChars="{remainingChars}" maxlength="{config.MAX_PROFILE_DESCRIPTION_CHARS}" on:keypress="{testInputDefocus}" /> -->
				</div>
				<div class="field headerImageField">
					<div class="label headerImageLabel">{locale.EDIT_PROFILE.COVER_IMAGE}</div>
					<ImageSelectionBox bind:image uploadType="user" />
				</div>
				<div class="field skillsField">
					<div class="label labelDetails">{locale.EDIT_PROFILE.SKILLS}<span class="tip">{@html locale.EDIT_PROFILE.SKILLS_TIP}</span></div>
					<textarea bind:value="{skills}" bind:this="{skillsInput}" />
				</div>
				<div class="field">
					<div class="label labelDetails">{locale.EDIT_PROFILE.LOCATION}<span class="tip">{@html locale.EDIT_PROFILE.LOCATION_TIP}</span></div>
					<input type="text" bind:value="{location}" bind:this="{locationInput}" on:keypress="{testInputDefocus}" />
				</div>
			</div>

			<div class="actions">
				<Button className="cancelButton" onClick="{cancel}" icon="{CancelIcon}">{locale.EDIT_PROFILE.CANCEL}</Button>
				<Button className="saveButton" onClick="{save}" icon="{SaveIcon}" disabled="{!saveEnabled}">{locale.EDIT_PROFILE.CONFIRM}</Button>
			</div>
		</div>
	</div>
</ScrollView>

<style>
	.panelContent {
    	padding-top: 4px;
	}

	.content :global(.avatarIcon) {
		width: 108px;
		height: 108px;

		margin-top: 20px;
		margin-left: 20px;
	}

	.field {
    	padding: 0 21px;
    	padding-top: 18px;
	}

	.label {
		font-size: 1.3rem;
    	padding-left: 4px;
    	padding-bottom: 4px;
		color: #555555;
	}

	.labelDetails {
		font-weight: 700;
	}

	/* .fieldCharCount {
		position: absolute;
		right: 20px;
		margin-top: -22px;
		font-size: 1.2rem;
		color: #888888;
	}
	.charCountLow {
		color: #DF3C3C;
	} */

	.tip {
    	padding-left: 13px;

		font-weight: initial;

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
    	padding-top: 10px;
	}

	.headerImageLabel {
    	padding-left: 25px;
    	padding-right: 21px;
	}


	.headerImageField :global(.imageSelectionBox) {
		height: 200px;
    	margin-top: 10px;
	}
	.headerImageField :global(.imageSelectionBox.opened) {
		height: 245px;
	}


	.mainProfileDetails {
		padding-bottom: 20px;
	}


	.bioField textarea {
    	height: 200px;
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
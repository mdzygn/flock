<script>
	import { tick } from 'svelte';
	import { writable } from 'svelte/store';
	import { goto } from '@sapper/app';

	import config from '../../../config';
	import locale from '../../../locale';

	import { trim, testInputDefocus, inputFormat, getFormattedText } from '../../../utils';

    import UploadUtil from '../../../utils/UploadUtil';

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
	import UploadImageIcon from "../../../assets/icons/upload_image.png";

    import EmptyImage from "../../../assets/images/empty.png";

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

	let profileImageIsUploading;
	let headerImageIsUploading;

	let remainingChars;
	$: charCountLow = (remainingChars !== '') && remainingChars < config.PROFILE_DESCRIPTION_CHARS_LOW;

	$: saveEnabled = !!(trim(name) && !profileImageIsUploading && !headerImageIsUploading);

	let bioInput;
	let skillsInput;
	let locationInput;

	function save() {
		if (saveEnabled) {
			const profileDetails = {
				name: trim(name),
				bio: trim(bio),
				avatarImage: $curUserProps.avatarImage || null,
				coverImage: image,
				skills,
				location,
				style: $curUserProps.style,
			};

			saveProfile(profileDetails);
		}
	}

	function avatarIconClick() {
		if ($curUserProps.avatarImage) {
			uploadProfileImage();
		} else {
			randomiseProfileColor();
		}
	}

    function randomiseProfileColor() {
        randomiseUserProfileImageColor(curUserProps);
    }

	function cancel() {
		goto('profile/' + $userId);
	}

	function uploadProfileImage() {
        UploadUtil.uploadImage({
            uploadType: 'userProfile',
            itemId: $userId,

            imageSettings: {
                maxWidth: config.PROFILE_UPLOAD_MAX_WIDTH,
                maxHeight: config.PROFILE_UPLOAD_MAX_HEIGHT,
            },
            thumbSettings: {
                maxWidth: config.PROFILE_UPLOAD_THUMB_MAX_WIDTH,
                maxHeight: config.PROFILE_UPLOAD_THUMB_MAX_HEIGHT,
            },

            onUploading: () => {
				$curUserProps.avatarImageRawSrc = EmptyImage;
				$curUserProps = $curUserProps;
                profileImageIsUploading = true;
            },
            onImageLoaded: (imageFile) => {
				$curUserProps.avatarImageRawSrc = URL.createObjectURL(imageFile);
				$curUserProps = $curUserProps;
            },
            onComplete: (imageUrl) => {
				$curUserProps.avatarImageRawSrc = null;
				$curUserProps.avatarImage = imageUrl;
                profileImageIsUploading = false;
            },
            onError: (error) => {
				$curUserProps.avatarImageRawSrc = null;
				$curUserProps.avatarImage = null;
				$curUserProps = $curUserProps;

                profileImageIsUploading = false;

                if (error && error.invalidType) {
                    showPrompt(promptIds.INVALID_IMAGE_TYPE_JPG_PNG);
                } else if (error && error.imageFileSizeTooLarge) {
                    showPrompt(promptIds.INVALID_IMAGE_FILESIZE_TOO_LARGE);
                } else {
                    showPrompt(promptIds.IMAGE_UPLOAD_ERROR);
                }
            },
        });
	}
</script>

<svelte:head>
	<title>Flock</title>
	<style>
		body {
			overscroll-behavior-y: contain; /* Disables pull-to-refresh but allows overscroll effects. */
		}
	</style>
</svelte:head>

<ScrollView>
	<div class="content">
		<div class="panelContent">
			<div class="mainProfileDetails">
				<div class="actions topActions">
					<Button className="saveButton" onClick="{save}" icon="{SaveIcon}" disabled="{!saveEnabled}">{locale.EDIT_PROFILE.CONFIRM}</Button>
				</div>

    			<AvatarIcon user="{curUserProps}" onClick="{avatarIconClick}"/>
				<Button className="uploadAvatarButton" onClick="{uploadProfileImage}" icon="{UploadImageIcon}">{locale.EDIT_PROFILE.UPLOAD_PROFILE_IMAGE}</Button>
				<div class="field">
					<div class="label">{locale.EDIT_PROFILE.NAME}</div>
					<input type="text" bind:value="{name}" on:keypress="{(e) => testInputDefocus(e, {target: bioInput})}" autocapitalize="words" on:keyup="{(e) => inputFormat(e, {capitalizeFirstKeypress: true})}" />
				</div>
				<div class="field bioField">
					<div class="label">{locale.EDIT_PROFILE.BIO}<span class="tip">{@html locale.EDIT_PROFILE.BIO_TIP}</span></div>
					<!-- <div class="fieldCharCount" class:charCountLow="{charCountLow}">{remainingChars}{charCountLow ? ' characters remaining' : ''}</div> -->
					<textarea bind:value="{bio}" bind:this="{bioInput}" on:keypress="{testInputDefocus}" />
					<!-- <LimitedTextfield bind:value="{bio}" bind:field="{bioInput}" bind:remainingChars="{remainingChars}" maxlength="{config.MAX_PROFILE_DESCRIPTION_CHARS}" autocapitalize="sentences" on:keypress="{testInputDefocus}" /> -->
				</div>
				<div class="field headerImageField">
					<div class="label headerImageLabel">{locale.EDIT_PROFILE.COVER_IMAGE}</div>
					<ImageSelectionBox bind:image bind:fileIsUploading="{headerImageIsUploading}" uploadType="userCover" itemId="{$userId}" />
				</div>
				<div class="field skillsField">
					<div class="label labelDetails">{locale.EDIT_PROFILE.SKILLS}<span class="tip">{@html locale.EDIT_PROFILE.SKILLS_TIP}</span></div>
					<textarea bind:value="{skills}" bind:this="{skillsInput}" on:keyup="{(e) => inputFormat(e, {keepLowerCase: true})}" />
				</div>
				<div class="field">
					<div class="label labelDetails">{locale.EDIT_PROFILE.LOCATION}<span class="tip">{@html locale.EDIT_PROFILE.LOCATION_TIP}</span></div>
					<input type="text" bind:value="{location}" bind:this="{locationInput}" on:keypress="{testInputDefocus}" autocapitalize="sentences" on:keyup="{(e) => inputFormat(e, {capitalizeFirstKeypress: true})}" />
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
    	padding: 0 16px;
    	padding-top: 18px;
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

	.headerImageField {
    	padding: 0;
    	padding-top: 10px;
	}

	.headerImageLabel {
		padding-left: 23px;
		padding-right: 23px;
    	padding-bottom: 0;
	}


	.headerImageField :global(.imageSelectionBox) {
		padding-top: 48.7%;

		/* height: 200px;
		padding-top: initial; */

    	margin-top: 10px;
	}
	.headerImageField :global(.imageSelectionBox.opened) {
		height: 245px;
		padding-top: 0;
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

    .content :global(.uploadAvatarButton) {
        position: absolute;

		top: 105px;
		left: 120px;

		padding: 10px 10px;

    	font-size: 1.3rem;
		font-weight: 700;
    }
    .content :global(.uploadAvatarButton .buttonContent) {
		position: relative;
		padding-left: 32px;
		color: #333333;
    }
    .content :global(.uploadAvatarButton .iconContainer) {
		position: absolute;
		left: 0;
    	top: 10px;
    }
    .content :global(.uploadAvatarButton .icon) {
    	transform: scale(0.32, 0.32);
    }
</style>
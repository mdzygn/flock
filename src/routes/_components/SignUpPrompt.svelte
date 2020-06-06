<script>
    import locale from '../../locale';
    import config from '../../config';

	import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { trim, testInputDefocus, formatAsId, validateEmail, delayedTimeout } from '../../utils';

    import { signUpFormValidated, newUsername } from '../../models/appModel';

    import { getNewUser, randomiseUserProfileImageColor } from '../../models/usersModel';

    import AvatarIcon from '../_components/AvatarIcon.svelte';

    export const newUser = getNewUser();

    let firstNameField;
    let lastNameField;
    let emailField;

    $newUsername = '';

    $: firstNameField && firstNameField.focus();

    $: emailValidated = validateEmail(trim($newUser.email));
    $: $signUpFormValidated = !!(trim($newUser.firstName) && emailValidated); //  && trim($newUser.lastName)
    $: $newUser.fullName = trim($newUser.firstName) + ' ' + trim($newUser.lastName);
    $: $newUser.name = trim($newUser.fullName);
    // $: $newUser.username = formatAsId($newUser.firstName + $newUser.lastName.substr(0, Math.min(1, $newUser.lastName.length)), config.MAX_ID_LENGTH);

    $: {
        $signUpFormValidated;
        dispatch('change');
    }

    $: { // prevent disallowed characters
        if ($newUser.email) {
            $newUser.email = $newUser.email.replace(/[^a-zA-Z0-9_/-@.]/g,'')
        }
    }

    let emailFlagInvalid = false;
    $: {
        $newUser.email;

        emailFlagInvalid = false;

        delayedTimeout('email', () => {
            emailFlagInvalid = $newUser.email && !emailValidated;
        }, config.INVALID_FIELD_DELAY);
    }

    function submit() {
        if ($signUpFormValidated) {
            dispatch('confirm');
        }
    }

    function randomiseProfileColor() {
        randomiseUserProfileImageColor(newUser);
    }
</script>

<div class="signUpPrompt">
    <AvatarIcon user="{newUser}" onClick="{randomiseProfileColor}"/>
    <div class="field">
        <div class="label">{locale.SIGN_UP.FIRST_NAME}</div>
        <input type="text" id="fname" name="fname" autocomplete="given-name" autocapitalize="words" bind:value="{$newUser.firstName}" bind:this="{firstNameField}" on:keypress="{(e) => testInputDefocus(e, {target: lastNameField})}" />
    </div>
    <div class="field">
        <div class="label">{locale.SIGN_UP.LAST_NAME}</div>
        <input type="text" id="lname" name="lname" autocomplete="family-name" autocapitalize="words" bind:value="{$newUser.lastName}" bind:this="{lastNameField}" on:keypress="{(e) => testInputDefocus(e, {target: emailField})}" />
    </div>
    <div class="field">
        <div class="label">{locale.SIGN_UP.EMAIL}</div>
        <input type="text" id="email" name="email" autocomplete="email" class:invalid="{emailFlagInvalid}" bind:value="{$newUser.email}" bind:this="{emailField}" on:keypress="{(e) => testInputDefocus(e, {action: submit})}" />
        {#if emailFlagInvalid}<div class="errorLabel">invalid email</div>{/if}
    </div>
</div>

<style>
    .signUpPrompt {
        display:flex;
        align-items: center;
        justify-content: center;
        flex-flow: wrap;

        padding-bottom: 2px;
    }

    .signUpPrompt :global(.avatarIcon) {
        width: 80px;
        height: 80px;
        /* width: 98px;
        height: 98px; */

        border: 4px solid #ffffff;
        box-sizing: content-box;
        overflow: initial;

        margin-top: 0;
        margin-bottom: -4px;
    }
    .signUpPrompt :global(.avatarIconImage) {
        border: 1px solid #cacaca;
        border-radius: 999px;
        overflow: hidden;
        box-sizing: border-box;
    }

	.field {
        position: relative;
    	padding: 0 16px;
        padding-top: 20px;
        /* padding-bottom: 10px; */
	}

	.label {
		font-size: 1.3rem;
    	padding-left: 7px;
		color: #888888;

        text-align: left;
	}

	input {
        border: none;
        outline: none;
        background: none;

		border-bottom: 1px solid #cccccc;

        width: 100%;
        box-sizing: border-box;

        font-size: 1.5rem;
		color: #333333;

        padding: 6px 7px;
        /* padding-left: 0; */
	}

    .invalid {
        color: #DF3C3C;
    }

    .errorLabel {
        position: absolute;
        right: 20px;

        font-size: 1.2rem;

        color: #DF3C3C;
    }
</style>
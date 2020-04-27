<script>
    import locale from '../../locale';
    import config from '../../config';

	import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { testInputDefocus, formatAsId, validateUserName, delayedTimeout } from '../../utils';

    import {
        setAccountFormValidated,
        user,
        userId,
        newUsername,
    } from '../../models/appModel';

    import { getNewUser, randomiseUserProfileImageColor } from '../../models/usersModel';

    import AvatarIcon from '../_components/AvatarIcon.svelte';

    export let userDetails = {};

    let usernameField;
    let passField;
    let passRepeatField;

    // let username = $user.username;

    $: usernameField && usernameField.focus();

    //let username = $user.username || $newUsername || formatAsId($user.firstName + $user.lastName.substr(0, Math.min(1, $user.lastName.length)), config.MAX_ID_LENGTH);
    let username = $user.username || $newUsername || formatAsId($user.name, config.MAX_ID_LENGTH);
    let pass = '';
    let passRepeat = '';

	$: { // prevent disallowed characters
		username = username.toLowerCase();
		username = username.replace(/[^a-z0-9._]/g, ''); // lowercase only
		// username = username.replace(/[^a-zA-Z0-9._]/gi, '');
    }

    $: usernameValidated = validateUserName(username);
    $: usernameTooShort = username.length < config.USER_NAME_MIN_LENGTH;
    $: usernameTooLong = username.length > config.USER_NAME_MAX_LENGTH;

    $: passValidated = pass && passRepeat && pass === passRepeat;

    $: $setAccountFormValidated = !!(usernameValidated && pass && passRepeat && passValidated);

    $: {
        userDetails.id = $userId;
        userDetails.username = username;
        userDetails.pass = pass
    }

    let passwordInvalid = false;
    $: {
        pass; passRepeat;

        passwordInvalid = false;

        delayedTimeout('pass', () => {
            passwordInvalid = pass && passRepeat && !passValidated;
        }, config.INVALID_FIELD_DELAY);
    }

    let usernameFlagInvalid = false;
    let usernameFlagTooShort = false;
    let usernameFlagTooLong = false;
    $: {
        username;

        usernameFlagInvalid = false;
        usernameFlagTooShort = false;
        usernameFlagTooLong = false;

        delayedTimeout('username', () => {
            usernameFlagInvalid = username && !usernameValidated;
            usernameFlagTooShort = username && usernameTooShort;
            usernameFlagTooLong = username && usernameTooLong;
        }, config.INVALID_FIELD_DELAY);
    }

    $: {
        $setAccountFormValidated;
        dispatch('change');
    }

    function submit() {
        if ($setAccountFormValidated) {
            dispatch('confirm');
        }
    }
</script>

<div class="setAccountPrompt">
    <div class="field usernameField">
        <div class="label">{locale.SET_ACCOUNT.USERNAME}</div>
        <input bind:value="{username}" bind:this="{usernameField}" class:invalid="{usernameFlagInvalid}" on:keypress="{(e) => testInputDefocus(e, {target: passField})}" />
        {#if usernameFlagTooShort}<div class="errorLabel">username too short</div>
        {:else if usernameFlagTooLong}<div class="errorLabel">username too long</div>
        {:else if usernameFlagInvalid}<div class="errorLabel">invalid username</div>{/if}
        <!-- {:else if usernameExists}<div class="errorLabel">username exists</div>{/if} -->
    </div>
    <div class="field">
        <div class="label">{locale.SET_ACCOUNT.PASS}</div>
        <input type="password" bind:value="{pass}" bind:this="{passField}" on:keypress="{(e) => testInputDefocus(e, {target: passRepeatField})}" />
    </div>
    <div class="field" class:hidden="{!pass}">
        <div class="label">{locale.SET_ACCOUNT.PASS_REPEAT}</div>
        <input type="password" bind:value="{passRepeat}" bind:this="{passRepeatField}" class:invalid="{passwordInvalid}" on:keypress="{(e) => testInputDefocus(e, {action: submit})}" />
        {#if passwordInvalid}<div class="errorLabel">passwords don't match</div>{/if}
    </div>
</div>

<style>
    .setAccountPrompt {
        display:flex;
        align-items: center;
        justify-content: center;
        flex-flow: wrap;

        padding-bottom: 2px;
    }

    .setAccountPrompt :global(.avatarIcon) {
        width: 108px;
        height: 108px;

        border: 4px solid #ffffff;
        box-sizing: content-box;
        overflow: initial;

        margin-top: 4px;
        margin-bottom: -4px;
    }
    .setAccountPrompt :global(.avatarIconImage) {
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

    .hidden {
        visibility: hidden;
    }

    .usernameField {
        padding-top: 15px;
        padding-bottom: 35px;
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

		border-bottom: 1px solid #999999;

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
<script>
    import locale from '../../locale';
    import config from '../../config';

	import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { testInputDefocus, formatAsId } from '../../utils';

    import { setAccountFormValidated, user, userId } from '../../models/appModel';

    import { getNewUser, randomiseUserProfileImageColor } from '../../models/usersModel';

    import AvatarIcon from '../_components/AvatarIcon.svelte';

    export let userDetails = {};

    let usernameField;
    let passField;
    let passRepeatField;

    // let username = $user.username;

    $: usernameField && usernameField.focus();

    let username = $user.username || formatAsId($user.firstName + $user.lastName.substr(0, Math.min(1, $user.lastName.length)), config.MAX_ID_LENGTH);
    let pass = '';
    let passRepeat = '';

    $: passValidated = pass && passRepeat && pass === passRepeat;

    $: $setAccountFormValidated = !!(username && pass && passRepeat && passValidated);

    $: {
        userDetails.id = $userId;
        userDetails.username = username;
        userDetails.pass = pass
    }

    let usernameExists = false;
    // let passwordInvalid = false;

    let passwordInvalid = false;
    let passwordValidateTimeout = null;
    $: {
        pass;

        passwordInvalid = false;
        if (typeof window !== 'undefined') {
            if (passwordValidateTimeout !== null) {
                window.clearTimeout(passwordValidateTimeout);
                passwordValidateTimeout = null;
            }
            passwordValidateTimeout = window.setTimeout(() => {
                passwordInvalid = pass && passRepeat && !passValidated;
            }, config.INVALID_FIELD_DELAY);
        }
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
        <input bind:value="{username}" bind:this="{usernameField}" class:invalid="{usernameExists}" on:keypress="{(e) => testInputDefocus(e, {target: passField})}" />
        {#if usernameExists}<div class="errorLabel">Username exists</div>{/if}
    </div>
    <div class="field">
        <div class="label">{locale.SET_ACCOUNT.PASS}</div>
        <input type="password" bind:value="{pass}" bind:this="{passField}" on:keypress="{(e) => testInputDefocus(e, {target: passRepeatField})}" />
    </div>
    <div class="field" class:hidden="{!pass}">
        <div class="label">{locale.SET_ACCOUNT.PASS_REPEAT}</div>
        <input type="password" bind:value="{passRepeat}" bind:this="{passRepeatField}" class:invalid="{passwordInvalid}" on:keypress="{(e) => testInputDefocus(e, {action: submit})}" />
        {#if passwordInvalid}<div class="errorLabel">Passwords don't match</div>{/if}
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
    	padding: 0 21px;
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
    	padding-left: 4px;
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

        padding: 6px 4px;
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
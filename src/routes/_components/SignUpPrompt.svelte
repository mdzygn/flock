<script>
    import locale from '../../locale';
    import config from '../../config';

	import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { testInputDefocus, formatAsId } from '../../utils';

    import { signUpFormValidated } from '../../models/appModel';

    import { getNewUser, randomiseUserProfileImageColor } from '../../models/usersModel';

    import AvatarIcon from '../_components/AvatarIcon.svelte';

    export const newUser = getNewUser();

    let firstNameField;
    let lastNameField;
    let emailField;

    $: firstNameField && firstNameField.focus();

    $: emailValidated = ($newUser.email || '').match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.[A-Z]{2,8}$/i);
    $: $signUpFormValidated = !!($newUser.firstName && $newUser.lastName && emailValidated);
    $: $newUser.fullName = $newUser.firstName + ' ' + $newUser.lastName;
    $: $newUser.username = formatAsId($newUser.firstName + $newUser.lastName, config.MAX_ID_LENGTH);

    $: {
        $signUpFormValidated;
        dispatch('change');
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
        <input type="text" id="lname" name="lname" autocomplete="family-name" autocapitalize="words" bind:value="{$newUser.lastName}" bind:this="{lastNameField}" on:keypress="{(e) => testInputDefocus(e, {action: emailField})}" />
    </div>
    <div class="field">
        <div class="label">{locale.SIGN_UP.EMAIL}</div>
        <input type="text" id="email" name="email" autocomplete="email" bind:value="{$newUser.email}" bind:this="{emailField}" on:keypress="{(e) => testInputDefocus(e, {action: submit})}" />
    </div>
</div>

<style>
    .signUpPrompt {
        display:flex;
        align-items: center;
        justify-content: center;
        flex-flow: wrap;
    }

    .signUpPrompt :global(.avatarIcon) {
        width: 108px;
        height: 108px;

        border: 4px solid #ffffff;
        box-sizing: content-box;
        overflow: initial;

        margin-top: 8px;
    }
    .signUpPrompt :global(.avatarIconImage) {
        border: 1px solid #cacaca;
        border-radius: 999px;
        overflow: hidden;
        box-sizing: border-box;
    }

	.field {
    	padding: 0 21px;
        padding-top: 20px;
        padding-bottom: 10px;
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
</style>
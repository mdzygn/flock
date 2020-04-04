<script>
    import locale from '../../locale';

    import { testInputDefocus } from '../../utils';

    import { getNewUser, randomiseUserProfileImageColor } from '../../models/usersModel';

    import AvatarIcon from '../_components/AvatarIcon.svelte';

    export const newUser = getNewUser();

    let firstNameField;
    let lastNameField;

    $: firstNameField && firstNameField.focus();

    export let firstName = '';
    export let lastName = '';

    export let onConfirm = null;

    function submit() {
        if (onConfirm) {
            onConfirm();
        }
    }

    function randomiseProfileColor() {
        randomiseUserProfileImageColor(newUser);
    }
</script>

<div class="signUpPrompt">
    <AvatarIcon user="{newUser}" onClick="{randomiseProfileColor}"/>
    <div class="field descriptionField">
        <div class="label">{locale.SIGN_UP.FIRST_NAME}</div>
        <input type="text" bind:value="{firstName}" bind:this="{firstNameField}" on:keypress="{(e) => testInputDefocus(e, {target: lastNameField})}" />
    </div>
    <div class="field descriptionField">
        <div class="label">{locale.SIGN_UP.LAST_NAME}</div>
        <input type="text" bind:value="{lastName}" bind:this="{lastNameField}" on:keypress="{(e) => testInputDefocus(e, {action: submit})}" />
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
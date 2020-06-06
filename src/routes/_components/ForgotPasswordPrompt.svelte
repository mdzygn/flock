<script>
    import locale from '../../locale';
    import config from '../../config';

	import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { trim, testInputDefocus, formatAsId, validateEmail, delayedTimeout } from '../../utils';

    import { forgotPasswordFormValidated } from '../../models/appModel';

    export let email = '';

    let emailField;

    $: emailField && emailField.focus();

    $: emailValidated = validateEmail(trim(email));
    $: $forgotPasswordFormValidated = emailValidated;

    $: {
        $forgotPasswordFormValidated;
        dispatch('change');
    }

    function submit() {
        if ($forgotPasswordFormValidated) {
            dispatch('confirm');
        }
    }

    $: { // prevent disallowed characters
        if (email) {
            email = email.replace(/[^a-zA-Z0-9_/-@.]/g,'')
        }
    }

    let emailFlagInvalid = false;
    $: {
        email;

        emailFlagInvalid = false;

        delayedTimeout('email', () => {
            emailFlagInvalid = email && !emailValidated;
        }, config.INVALID_FIELD_DELAY);
    }
</script>

<div class="forgotPasswordPrompt">
    <div class="field">
        <div class="label">{locale.SIGN_UP.EMAIL}</div>
        <input type="text" id="email" name="email" autocomplete="email" class:invalid="{emailFlagInvalid}" bind:value="{email}" bind:this="{emailField}" on:keypress="{(e) => testInputDefocus(e, {action: submit})}" />
        {#if emailFlagInvalid}<div class="errorLabel">invalid email</div>{/if}
    </div>
</div>

<style>
    .forgotPasswordPrompt {
        display:flex;
        align-items: center;
        justify-content: center;
        flex-flow: wrap;

        padding-bottom: 2px;
    }

	.field {
        position: relative;
    	padding: 0 16px;
        padding-top: 20px;
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
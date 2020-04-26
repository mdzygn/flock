<script>
    import locale from '../../locale';
    import config from '../../config';

	import { writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { testInputDefocus } from '../../utils';

    import {
        logInFormValidated,
        username,
        usercode,
    } from '../../models/appModel';

    export const details = writable({});

    let usernameField;
    let passField;

    $details.username = $username;
    $details.pass = ''; // $usercode;

    $: {
        if ($username) {
            passField && passField.focus();
        } else {
            usernameField && usernameField.focus();
        }
    }

    $: $logInFormValidated = !!($details.username && $details.pass);

    $: {
        $logInFormValidated;
        dispatch('change');
    }

    function submit() {
        if ($logInFormValidated) {
            dispatch('confirm');
        }
    }

    function randomiseProfileColor() {
        randomiseUserProfileImageColor(newUser);
    }
</script>

<div class="logInPrompt">
    <div class="field">
        <div class="label">{locale.LOG_IN.USERNAME}</div>
        <input bind:value="{$details.username}" bind:this="{usernameField}" on:keypress="{(e) => testInputDefocus(e, {target: passField})}" />
    </div>
    <div class="field">
        <div class="label">{locale.LOG_IN.PASS}</div>
        <input type="password" bind:value="{$details.pass}" bind:this="{passField}" on:keypress="{(e) => testInputDefocus(e, {action: submit})}" />
    </div>
</div>

<style>
    .logInPrompt {
        display:flex;
        align-items: center;
        justify-content: center;
        flex-flow: wrap;
    }

	.field {
    	padding: 0 21px;
        padding-top: 20px;
        padding-bottom: 10px;
	}

	.label {
		font-size: 1.3rem;
    	/* padding-left: 4px; */
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
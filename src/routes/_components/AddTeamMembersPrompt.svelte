<script>
    import locale from '../../locale';
    import config from '../../config';

	import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { trim, testInputDefocus, delayedTimeout } from '../../utils';

    import { addTeamMembersFormValidated } from '../../models/appModel';

    export let userList = '';

    let userListField;

    $: userListField && userListField.focus();

    $: userListValidated = trim(userList);
    $: $addTeamMembersFormValidated = userListValidated;

    $: {
        $addTeamMembersFormValidated;
        dispatch('change');
    }

    function submit() {
        if ($addTeamMembersFormValidated) {
            dispatch('confirm');
        }
    }

    $: { // prevent disallowed characters
        if (userList) {
            userList = userList.replace(/[^a-zA-Z0-9._ ,]/g, '').toLowerCase();
        }
    }

    let userListFlagInvalid = false;
    $: {
        userList;

        userListFlagInvalid = false;

        delayedTimeout('userList', () => {
            userListFlagInvalid = userList && !userListValidated;
        }, config.INVALID_FIELD_DELAY);
    }
</script>

<div class="forgotPasswordPrompt">
    <div class="field">
        <div class="label">{locale.ADD_TEAM_MEMBERS.TEAM_LIST}</div>
        <input type="text" id="userList" name="userList" class:invalid="{userListFlagInvalid}" bind:value="{userList}" bind:this="{userListField}" on:keypress="{(e) => testInputDefocus(e, {action: submit})}" />
        {#if userListFlagInvalid}<div class="errorLabel">invalid user list</div>{/if}
    </div>
</div>

<style>
    .forgotPasswordPrompt {
        display:flex;
        align-items: center;
        justify-content: center;
        flex-flow: wrap;

        margin-top: -18px;

        padding-bottom: 2px;
    }

	.field {
        position: relative;
    	padding: 0 16px;
        padding-top: 20px;
	}

	.label {
		font-size: 1.2rem;

        /* padding-left: 0px;
        margin-right: -10px; */
    	/* padding-left: 7px; */

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
        padding: 6px 0;
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
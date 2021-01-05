<script>
	import promptIds from '../../config/promptIds';

	import LogInPrompt from './LogInPrompt.svelte';
	import SignUpPrompt from './SignUpPrompt.svelte';
	import SetAccountPrompt from './SetAccountPrompt.svelte';
	import ForgotPasswordPrompt from './ForgotPasswordPrompt.svelte';
	import AddTeamMembersPrompt from './AddTeamMembersPrompt.svelte';

	import { user, curMenu, curPrompt, dontAllowOverlayClose } from '../../models/appModel';

	import OverlayMenu from './OverlayMenu.svelte';
	import OverlayPrompt from './OverlayPrompt.svelte';

	import { createUser, setAccountDetails, sendPasswordReset } from '../../actions/userActions';

	import { closeOverlay, login } from '../../actions/appActions';
	import { addProjectTeamMembers, removeProjectTeamMembers} from '../../actions/projectActions';

    import { menus } from '../../config/menus';
    import prompts from '../../config/prompts';

    $: menu = $curMenu ? menus[$curMenu] : null;
	$: prompt = $curPrompt ? prompts[$curPrompt] : null;

	$: resetPass = $user && $user.resetPass;

	let logInDetails;
	let logInUpdateMenuItems;
	function logInSubmit() {
		closeOverlay();
		login($logInDetails);
	}

	let signUpNewUser;
	let signUpUpdateMenuItems;
	function signUpSubmit() {
		closeOverlay();
		createUser(signUpNewUser);
	}

	let userDetails;
	let setAccountUpdateMenuItems;
	function setAccountSubmit() {
		closeOverlay();
		setAccountDetails(userDetails, resetPass);
	}

	let forgotPasswordEmail;
	let forgotPasswordUpdateMenuItems;
	function forgotPasswordSubmit() {
		closeOverlay();
		sendPasswordReset(forgotPasswordEmail);
	}

	let addTeamMembersList;
	let addTeamMembersUpdateMenuItems;
	function addTeamMembersSubmit() {
		closeOverlay();
		addProjectTeamMembers(addTeamMembersList);
	}

	let removeTeamMembersList;
	let removeTeamMembersUpdateMenuItems;
	function removeTeamMembersSubmit() {
		closeOverlay();
		removeProjectTeamMembers(removeTeamMembersList);
	}

	$: canClose = ((menu && menu.allowClose !== false) || (prompt && prompt.allowClose !== false)) && !$dontAllowOverlayClose;

	function close() {
		if (canClose) {
			closeOverlay();
		}
	}
</script>

{#if $curMenu || $curPrompt}
	<div class="overlayContainer"><div class="overlayContent">
		<div class="overlayBg" class:button="{canClose}" on:click="{close}" />
		{#if $curMenu}
			<OverlayMenu menuId="{$curMenu}" />
		{:else}
			{#if $curPrompt === promptIds.LOG_IN }
				<OverlayPrompt promptId="{$curPrompt}" onConfirm="{logInSubmit}" bind:updateMenuItems="{logInUpdateMenuItems}">
					<LogInPrompt
						bind:details="{logInDetails}"
						on:confirm="{logInSubmit}"
						on:change="{logInUpdateMenuItems}"
					/>
				</OverlayPrompt>
			{:else if $curPrompt === promptIds.SIGN_UP }
				<OverlayPrompt promptId="{$curPrompt}" onConfirm="{signUpSubmit}" bind:updateMenuItems="{signUpUpdateMenuItems}">
					<SignUpPrompt
						bind:newUser="{signUpNewUser}"
						on:confirm="{signUpSubmit}"
						on:change="{signUpUpdateMenuItems}"
					/>
				</OverlayPrompt>
			{:else if $curPrompt === promptIds.SET_ACCOUNT || $curPrompt === promptIds.RESET_PASSWORD }
				<OverlayPrompt promptId="{$curPrompt}" onConfirm="{setAccountSubmit}" bind:updateMenuItems="{setAccountUpdateMenuItems}">
					<SetAccountPrompt
						bind:userDetails="{userDetails}"
						on:confirm="{setAccountSubmit}"
						on:change="{setAccountUpdateMenuItems}"
					/>
				</OverlayPrompt>
			{:else if $curPrompt === promptIds.FORGOT_PASSWORD }
				<OverlayPrompt promptId="{$curPrompt}" onConfirm="{forgotPasswordSubmit}" bind:updateMenuItems="{forgotPasswordUpdateMenuItems}">
					<ForgotPasswordPrompt
						bind:email="{forgotPasswordEmail}"
						on:confirm="{forgotPasswordSubmit}"
						on:change="{forgotPasswordUpdateMenuItems}"
					/>
				</OverlayPrompt>
			{:else if $curPrompt === promptIds.ADD_TEAM_MEMBERS}
				<OverlayPrompt promptId="{$curPrompt}" onConfirm="{addTeamMembersSubmit}" bind:updateMenuItems="{addTeamMembersUpdateMenuItems}">
					<AddTeamMembersPrompt
						bind:userList="{addTeamMembersList}"
						on:confirm="{addTeamMembersSubmit}"
						on:change="{addTeamMembersUpdateMenuItems}"
					/>
				</OverlayPrompt>
			{:else if $curPrompt === promptIds.REMOVE_TEAM_MEMBERS}
				<OverlayPrompt promptId="{$curPrompt}" onConfirm="{removeTeamMembersSubmit}" bind:updateMenuItems="{removeTeamMembersUpdateMenuItems}">
					<AddTeamMembersPrompt
						bind:userList="{removeTeamMembersList}"
						on:confirm="{removeTeamMembersSubmit}"
						on:change="{removeTeamMembersUpdateMenuItems}"
					/>
				</OverlayPrompt>
			{:else}
				<OverlayPrompt promptId="{$curPrompt}" />
			{/if}
		{/if}
	</div></div>
{/if}

<style>
	.overlayContainer {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 100;
	}
	@media (max-height: 480px) {
		.overlayContainer {
			position: fixed;
		}
	}

	.overlayContent {
		position: relative;
		width: 100%;
		min-height: 100%;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.overlayContainer :global(.overlayMenu) {
		z-index: 101;
	}
	.overlayContainer :global(.overlayPrompt) {
		z-index: 102;
    	margin: 20px 0;
	}

	.overlayBg {
		position: absolute;
		background: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
	}
	.button {
		cursor: pointer;
	}
</style>
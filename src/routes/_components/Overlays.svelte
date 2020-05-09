<script>
	import promptIds from '../../config/promptIds';

	import LogInPrompt from './LogInPrompt.svelte';
	import SignUpPrompt from './SignUpPrompt.svelte';
	import SetAccountPrompt from './SetAccountPrompt.svelte';

	import { curMenu, curPrompt, dontAllowOverlayClose } from '../../models/appModel';

	import OverlayMenu from './OverlayMenu.svelte';
	import OverlayPrompt from './OverlayPrompt.svelte';

	import { createUser, setAccountDetails } from '../../actions/userActions';

	import { closeOverlay, login } from '../../actions/appActions';

    import { menus } from '../../config/menus';
    import prompts from '../../config/prompts';

    $: menu = $curMenu ? menus[$curMenu] : null;
    $: prompt = $curPrompt ? prompts[$curPrompt] : null;

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
		setAccountDetails(userDetails);
	}

	$: canClose = ((menu && menu.allowClose !== false) || (prompt && prompt.allowClose !== false)) && !$dontAllowOverlayClose;

	function close() {
		if (canClose) {
			closeOverlay();
		}
	}
</script>

{#if $curMenu || $curPrompt}
	<div class="overlayContainer">
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
			{:else if $curPrompt === promptIds.SET_ACCOUNT }
				<OverlayPrompt promptId="{$curPrompt}" onConfirm="{setAccountSubmit}" bind:updateMenuItems="{setAccountUpdateMenuItems}">
					<SetAccountPrompt
						bind:userDetails="{userDetails}"
						on:confirm="{setAccountSubmit}"
						on:change="{setAccountUpdateMenuItems}"
					/>
				</OverlayPrompt>
			{:else}
				<OverlayPrompt promptId="{$curPrompt}" />
			{/if}
		{/if}
	</div>
{/if}

<style>
	.overlayContainer {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 100;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.overlayContainer :global(.overlayMenu) {
		z-index: 101;
	}
	.overlayContainer :global(.overlayPrompt) {
		z-index: 102;
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
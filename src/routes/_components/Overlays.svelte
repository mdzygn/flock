<script>
	import promptIds from '../../config/promptIds';

	import SignUpPrompt from './SignUpPrompt.svelte';
	import LogInPrompt from './LogInPrompt.svelte';

	import { curMenu, curPrompt } from '../../models/appModel';

	import OverlayMenu from './OverlayMenu.svelte';
	import OverlayPrompt from './OverlayPrompt.svelte';

	import { createUser, loginUser } from '../../actions/userActions';

	import { closeOverlay } from '../../actions/appActions';

	let signUpNewUser;
	let signUpUpdateMenuItems;
	function signUpSubmit() {
		closeOverlay();
		createUser(signUpNewUser);
	}

	let logInDetails;
	let logInUpdateMenuItems;
	function logInSubmit() {
		closeOverlay();
		loginUser($logInDetails);
	}
</script>

{#if $curMenu || $curPrompt}
	<div class="overlayContainer">
		<div class="overlayBg" on:click="{closeOverlay}" />
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
			{:else}
				<OverlayPrompt promptId="{$curPrompt}" />
			{/if}
		{/if}
	</div>
{/if}

<style>
	.overlayContainer {
		position: absolute;
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

		cursor: pointer;
	}
</style>
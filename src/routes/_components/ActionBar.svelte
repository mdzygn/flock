<script>
	import Button from '../../components/Button.svelte';

	import ActionButton from './ActionButton.svelte';

    import LikeIcon from "../../assets/icons/like.png";
    import LikeSelectedIcon from "../../assets/icons/like_selected.png";
    import FollowIcon from "../../assets/icons/follow.png";
    import FollowSelectedIcon from "../../assets/icons/follow_selected.png";
    import ShareIcon from "../../assets/icons/share.png";

	import {
		projectToggleFollowing,
		projectToggleLiked,
	} from '../../actions/projectActions.js';

	export let targetItemId = null;
	export let targetItem = null;
</script>

<div class="actionBar">
	<div class="actionContainerButton actionButtonLeft">
		<slot name="buttonLeft">
			<ActionButton
				label = "like"
				icon = "{LikeIcon}"
				selectedIcon = "{LikeSelectedIcon}"

				targetItem = "{targetItem}"
				targetItemId = "{targetItemId}"
				action = "{projectToggleLiked}"
				targetItemProperty = "liked"
				countProperty = "likeCount"
			/>
		</slot>
	</div>
	<div class="actionContainerButton actionButtonMiddle">
		<slot name="buttonMiddle">
				<ActionButton
					label = "follow"
					selectedLabel = "following"

					icon = "{FollowIcon}"
					selectedIcon = "{FollowSelectedIcon}"

					targetItem = "{targetItem}"
					targetItemId = "{targetItemId}"
					action = "{projectToggleFollowing}"
					targetItemProperty = "following"
					countProperty= "followCount"

					buttonContentStyle = "padding-right: 48px;"
					iconStyle = "padding-bottom: 4px"
				/>
			</slot>
		</div>
	<div class="actionContainerButton actionButtonRight">
		<slot name="buttonRight">
			<ActionButton
				label = "share"

				icon = "{ShareIcon}"

				action = "{null}"
				disabled = "{true}"
			/>
		</slot>
	</div>
</div>

<style>
	.actionBar {
		display: flex;
		justify-content: space-between;

    	/* margin-top: 3px; */
		height: 52px;

		background-color: #ffffff;
	}

	.actionBar :global(.actionContainerButton) {
		width: 33%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.actionBar :global(.actionContainerButton > div) {
		width: 100%;
		height: 100%;
	}

    /* .actionBar :global(.actionButtonMiddle .buttonContent) {
        margin-right: 48px;
    } */
</style>
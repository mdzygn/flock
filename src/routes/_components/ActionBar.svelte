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
	<slot name="buttonLeft">
		<div class="actionButton actionButtonLeft">
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
		</div>
	</slot>
	<slot name="buttonMiddle">
		<div class="actionButton actionButtonMiddle">
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

				iconStyle = "padding-bottom: 4px"
			/>
		</div>
	</slot>
	<slot name="buttonRight">
		<div class="actionButton actionButtonRight">
			<ActionButton
				label = "share"

				icon = "{ShareIcon}"

				action= "{null}"
			/>
		</div>
	</slot>
</div>

<style>
	.actionBar {
		display: flex;
		justify-content: space-between;

    	/* margin-top: 3px; */
		height: 52px;

		background-color: #ffffff;
	}

	.actionBar :global(.actionButton) {
		width: 33%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
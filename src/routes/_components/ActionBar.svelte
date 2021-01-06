<script>
	import Button from '../../components/Button.svelte';

	import ActionButton from './ActionButton.svelte';

    import LikeIcon from "../../assets/icons/like.png";
    import LikeSelectedIcon from "../../assets/icons/like_selected.png";
    import FollowIcon from "../../assets/icons/follow.png";
    import FollowSelectedIcon from "../../assets/icons/follow_selected.png";
    import ShareIcon from "../../assets/icons/share.png";

	import {
		showProjectCounts
	} from '../../models/appModel';

	import {
		showShareProjectDialog,
		showSharePostDialog,
	} from '../../actions/appActions';

	import {
		projectToggleFollowing,
		projectToggleLiked,
	} from '../../actions/projectActions';

	import {
		postToggleLiked
	} from '../../actions/postActions';

	export let targetItemId = null;
	export let targetItem = null;
	export let type = 'project';

	function shareItem() {
		switch (type) {
			case 'project':
				showShareProjectDialog(targetItemId);
				break;
			case 'post':
				showSharePostDialog(targetItemId);
				break;
		}
	}
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
				action = "{type === 'project' ? projectToggleLiked : postToggleLiked}"
				targetItemProperty = "liked"

				countProperty= "{($showProjectCounts || type !== 'project') ? 'likeCount' : ''}"
			/>
				<!-- countProperty = "likeCount" -->
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
				action = "{type === 'project' ? projectToggleFollowing : null}"
				targetItemProperty = "following"

				buttonContentStyle = "padding-right: 48px;"
				iconStyle = "padding-bottom: 4px"

				countProperty= "{$showProjectCounts ? 'followCount' : ''}"
			/>
				<!-- countProperty= "followCount" -->
		</slot>
	</div>
	<div class="actionContainerButton actionButtonRight">
		<slot name="buttonRight">
			<ActionButton
				label = "share"

				icon = "{ShareIcon}"

				action = "{shareItem}"
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
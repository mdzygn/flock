<script>
	import Button from '../../components/Button.svelte';

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

	export let buttons = [
		{
			label: 'like',
			action: projectToggleLiked,
			icon: LikeIcon,
			selectedIcon: LikeSelectedIcon,
			targetItemProperty: 'liked',
			countProperty: 'likeCount',
		},
		{
			label: 'follow',
			action: projectToggleFollowing,
			icon: FollowIcon,
			selectedIcon: FollowSelectedIcon,
			targetItemProperty: 'following',
			countProperty: 'followCount',
		},
		{
			label: 'share',
			action: null,
			icon: ShareIcon,
		}
	];
</script>

<div class="actionBar">
	{#each buttons as button}
		<Button
			icon="{targetItem && button.targetItemProperty && targetItem[button.targetItemProperty] ? button.selectedIcon : button.icon}"
			onClick="{button.action ? (e => button.action(targetItemId)) : null}"
		>{button.label}{#if button.countProperty && targetItem}<div class="countContainer"><div class="count">{targetItem[button.countProperty]}</div></div>{/if}</Button>
	{/each}
</div>

<style>
	.actionBar {
		display: flex;
		justify-content: space-between;

    	/* margin-top: 3px; */
    	height: 52px;
	}

	.actionBar :global(.button) {
		width: 33%;
		display: flex;
		justify-content: center;
		align-items: center;

		font-size: 1.3rem;
	}

	.actionBar :global(.buttonContent) {
    	padding-bottom: 3px;
		padding-right: 42px;
	}

	.actionBar :global(.icon) {
    	padding-left: 20px;
	}

	.countContainer {
		vertical-align: bottom;
		display: inline-block;
		position: relative;
	}

	.count {
		position: absolute;
		left: 44px;
		bottom: 0;

		font-weight: 700;
		font-size: 1.2rem;
		color: #777777;
	}
</style>
<script>
	import locale from '../../../locale';

	import Button from '../../../components/Button.svelte';

    import SendMessageIcon from "../../../assets/icons/send.png";

    export let newPostMessage = '';

    export let submitLabel = null;

    export let placeholderLabel = locale.CHANNEL.ADD_POST_MESSAGE_PLACEHOLDER;

    export let onClick = null;

	export let element = null;
</script>

<div class="addPostPanel" bind:this="{element}">
    <div class="newMessageArea" on:click="{onClick}">
        <textarea bind:value="{newPostMessage}" placeholder="{placeholderLabel}" />
        <Button className="nextButton" disabled="{!newPostMessage}" icon="{SendMessageIcon}">{submitLabel || locale.REPLY_THREAD.CONFIRM}</Button>
        <!-- <NewPostButton onClick="{newPost}" className="newPostHeader" /> -->
    </div>
</div>

<style>
    .addPostPanel {
        background-color: #ffffff;

        margin-top: 5px;
        padding-top: 7px;
        padding-bottom: 2px;
    }
	.newMessageArea {
    	position: relative;

		padding-left: 16px;
        padding-right: 88px;
		/* padding-right: 106px; */
	}

	.newMessageArea textarea {
        border: 1px solid #cccccc;

        outline: none;
        background: none;

        width: 100%;
		height: 30px;

        box-sizing: border-box;

		font-size: 1.5rem;
		line-height: 2rem;
    	color: #555555;

        padding: 4px 6px;

    	/* margin-top: 4px; */

		resize: none;
	}
	
	.newMessageArea textarea::placeholder {
    	color: #cccccc;
	}
	
	.newMessageArea :global(.nextButton) {
        position: absolute;
    	top: -5px;
		right: 12px;

		padding: 10px;
    	padding-right: 30px;
		/* padding-right: 39px; */

    	font-size: 1.2rem;
        font-weight: 700;
    }
    .newMessageArea :global(.nextButton .icon) {
		padding-left: 18px;
		margin-top: -2px;
    	transform: scale(0.4, 0.4);
    }
</style>
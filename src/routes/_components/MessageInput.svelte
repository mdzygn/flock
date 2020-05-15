<script>
    import Button from '../../components/Button.svelte';

    import Proxy from '../../components/Proxy.svelte';

    import ImageIcon from "../../assets/icons/image.png";
    import SendMessageIcon from "../../assets/icons/send.png";

    import {
        testInputDefocus,
		getUnformattedText,
		getFormattedText,
    } from '../../utils';

    import {
        conversationId,
    } from '../../models/appModel';

    import {
        getNewMessageId
    } from '../../models/messagesModel';

    import {
        createMessage
    } from '../../actions/messageActions';

    export let message = '';
    export let image = null;

	let newMessageId = getNewMessageId();

    let messageField;

    $: submitEnabled = $conversationId && !!(message || image);

	function createNewMessage() {
		if (submitEnabled) {
            // console.log('createNewMessage', message);

			const messageDetails = {
				id: newMessageId,
				conversationId: $conversationId,
				message: getUnformattedText(message),
            };
            if (image) {
                messageDetails.image = image;
            }

            message = '';
            newMessageId = getNewMessageId();

            const draftId = $conversationId;

			createMessage(messageDetails).then((result) => {
				if (result && (result.success || result.addedMessage || result.duplicateKey)) {
                    // console.log('clear draft message', draftId);
					// clearDraftPost('message', draftId);
				}
			});
		}
    }

    function submit() {
        if (submitEnabled) {
            createNewMessage();
        }
    }

    function uploadImage() {

    }
</script>

<div class="messageInput">
	<!-- <Proxy image="message_input" className="proxyOverlay" /> -->

    <div class="fieldRegion">
        <Button className="sendButton" disabled="{!submitEnabled}" onClick="{submit}" icon="{SendMessageIcon}" />
        <Button className="imageButton" disabled="{true}" onClick="{uploadImage}" icon="{ImageIcon}" />
        <div class="field">
            <input type="text" bind:value="{message}" bind:this="{messageField}" on:keypress="{(e) => testInputDefocus(e, {action: submit, preventBlur: true})}" />
        </div>
    </div>
</div>

<style>
	/* .messageInput :global(.proxyOverlay) {
        position: absolute;
        opacity: 0.5;
	} */

	.messageInput {
		position: absolute;
        width: 100%;
    	bottom: 0;
        height: 54px;
        background-color: #ffffff;
        /* padding: 5px; */
	}

    .fieldRegion {
        position: absolute;
        height: 36px;

        bottom: 10px;
        left: 10px;
        right: 10px;

        border: 1px solid #B0B0B0;
        background-color: #ffffff;
        border-radius: 999px;
        /* margin: 7px; */
    }

    .field {
        display: flex;
        height: 100%;
        align-items: center;

        padding-left: 40px;
        padding-right: 36px;
    }

    input {
        font-size: 1.5rem;
		color: #333333;

        border: none;
        outline: none;
        background: none;

        width: 100%;

        padding: 6px 7px;
    }

	.messageInput :global(.imageButton) {
        position: absolute;
        left: 10px;
        width: 35px;
        height: 37px;
	}
	.messageInput :global(.imageButton .icon) {
        margin-top: 6px;
	}

	.messageInput :global(.sendButton) {
        position: absolute;
        right: 0;
        width: 35px;
        height: 37px;
	}
	.messageInput :global(.sendButton .icon) {
        margin-top: 6px;
        transform: scale(0.475, 0.475);
	}

</style>
<script>
    import { onMount, tick } from 'svelte'; // afterUpdate

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
        newConversation,
        newConversationUserIds,
    } from '../../models/appModel';

    import {
        getNewMessageId
    } from '../../models/messagesModel';

    import {
        getNewConversationId
    } from '../../models/conversationsModel';

    import {
        createMessage
    } from '../../actions/messageActions';

    export let message = '';
    export let image = null;

    let newMessageId = getNewMessageId();

    let newConversationId = getNewConversationId();

    let messageField;

    $: submitEnabled = ($conversationId || $newConversation) && !!(message || image);

	function createNewMessage() {
		if (submitEnabled) {
            // console.log('createNewMessage', message);

			const messageDetails = {
				id: newMessageId,
				message: getUnformattedText(message),
            };
            if ($conversationId && !$newConversation) {
                messageDetails.conversationId = $conversationId;
            }
            if (image) {
                messageDetails.image = image;
            }
            if ($newConversation) {
                messageDetails.newConversation = true;
                messageDetails.targetUserIds = $newConversationUserIds;
                messageDetails.conversationId = newConversationId
            }

            message = '';
            newMessageId = getNewMessageId();

            const draftId = $conversationId;

            // console.log('createNewMessage', messageDetails);

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

            if (messageField) {
                messageField.focus();
            }
        }
    }

    function uploadImage() {

    }

    onMount(() => {
        if (messageField) {
            messageField.focus();
        }
    })

    $: {
        message;
        resizeMessageField();
    }

    function resizeMessageField() {
        (async () => {
            await tick();
            if (messageField && messageField.style && typeof window !== 'undefined' && window.getComputedStyle) {
                messageField.style.height = 'inherit';

                const computedStyle = window.getComputedStyle(messageField);
                // console.log('computedStyle', computedStyle);

                if (computedStyle) {
                    const fieldHeight = messageField.scrollHeight + 4; // add extra height padding
                    // const height = parseInt(computedStyle.getPropertyValue('border-top-width'), 10)
                    //             + parseInt(computedStyle.getPropertyValue('padding-top'), 10)
                    //             + messageField.scrollHeight
                    //             + parseInt(computedStyle.getPropertyValue('padding-bottom'), 10)
                    //             + parseInt(computedStyle.getPropertyValue('border-bottom-width'), 10);
                    // console.log('height', fieldHeight,
                    //     messageField.scrollHeight,
                    //     computedStyle.getPropertyValue('border-top-width'),
                    //     computedStyle.getPropertyValue('padding-top'),
                    //     computedStyle.getPropertyValue('padding-bottom'),
                    //     computedStyle.getPropertyValue('border-top-width'));

                    messageField.style.height = fieldHeight + 'px';
                }
            }
        })();
    }
</script>

<div class="messageInput">
	<!-- <Proxy image="message_input" className="proxyOverlay" /> -->

    <div class="fieldRegion">
        <Button className="sendButton" disabled="{!submitEnabled}" onClick="{submit}" icon="{SendMessageIcon}" />
        <!-- <Button className="imageButton" disabled="{true}" onClick="{uploadImage}" icon="{ImageIcon}" /> -->
        <div class="field">
            <textarea bind:value="{message}" rows="1" bind:this="{messageField}" on:keypress="{(e) => testInputDefocus(e, {action: submit, actionOnCtrl: true, preventBlur: true})}" />
            <!-- <input type="text" bind:value="{message}" bind:this="{messageField}" on:keypress="{(e) => testInputDefocus(e, {action: submit, actionOnCtrl: true, preventBlur: true})}" /> -->
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
        background-color: #ffffff;

        /* height: 54px; */

        box-sizing: border-box;
        padding: 10px;
        padding-top: 6px;

        /* padding: 5px; */

        /* box-shadow: 0 -1px 6px 0 rgba(0,0,0,0.1); */
	}

    .fieldRegion {
        position: relative;
        /* position: absolute; */

        /* bottom: 10px;
        left: 10px;
        right: 10px; */
        /* padding-right: 50px; */
        /* right: 10px; */

        min-height: 38px;
        line-height: 0;

        /* height: 36px; */

        border: 1px solid #B0B0B0;
        background-color: #ffffff;

        border-radius: 19px;

        /* border-radius: 999px; */

        /* margin: 7px; */
    }

    .field {
        /* display: flex;
        height: 100%;
        align-items: center; */

        /* padding: 6px; */
        padding-left: 16px;
        padding-right: 42px;
        /* padding-left: 10px;
        padding-right: 36px; */

        /* padding-left: 40px; */
    }

    /* input { */
    textarea {
        font-size: 1.5rem;
		color: #333333;

        border: none;
        outline: none;
        background: none;

        width: 100%;
        max-height: 120px;

        /* padding: 6px 7px; */
        /* padding: 9px 0; */

        padding-top: 10px;
        padding-bottom: 7px;

        margin: 0;

        /* height: 100px; */

        box-sizing: border-box;

        resize: none;

        -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
	}
	.messageInput :global(textarea::-webkit-scrollbar) { /* Hide scrollbar for Chrome, Safari and Opera */
        display: none;
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
        bottom: 0;
        width: 35px;
        height: 37px;
	}
	.messageInput :global(.sendButton .iconInnerContainer) {
        height: 100%;
        width: 100%;
	}
	.messageInput :global(.sendButton .icon) {
        margin-top: -1px;
        /* margin-top: 6px; */
        transform: scale(0.475, 0.475);
	}

</style>
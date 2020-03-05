<script>
	import ScrollView from '../../components/ScrollView.svelte';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="messagesView">
	<ScrollView anchorToBottom="{true}">
		<img src="content/proxy/messages_group_view.jpg" style="width: 100%" alt="search" />
	</ScrollView>
</div>

<div class="messageInput">
	<img src="content/proxy/message_input.jpg" style="width: 100%" alt="search" />
</div>

<style>
	.messagesView {
		position: absolute;
		top: 0;
		bottom: 48px;
		width: 100%;
	}

	.messageInput {
		position: absolute;
    	bottom: 0;
	}
</style>
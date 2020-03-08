<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<div class="messagesView">
	<ScrollView anchorToBottom="{true}">
		<Proxy image="message_view" />
	</ScrollView>
</div>

<div class="messageInput">
	<Proxy image="message_input" />
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
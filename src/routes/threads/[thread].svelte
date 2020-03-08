<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';

	import NewPostButton from '../../components/NewPostButton.svelte';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<Proxy image="thread_post" className="threadPost" />
		<Proxy image="thread_actions" className="threadActions" />
		<Proxy image="thread_posts" className="threadPosts" />
		<NewPostButton type="thread_reply" />
	</div>
</ScrollView>

<style>
	.content {
		margin-bottom: 40px;
	}

	.content :global(.threadPost) {
		margin-top: 5px;
	}

	.content :global(.threadPosts) {
		margin-top: 10px;
	}
</style>
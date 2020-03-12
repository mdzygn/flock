<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import NewPostButton from '../../components/NewPostButton.svelte';

	import { threadId } from '../../models/appState';
	import { loadProfile } from '../../actions/appActions';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView id="thread">
	<div class="content">
		<Proxy image="thread_post" className="threadPost">
			<!-- Profile -->
			<Hotspot onClick="{e => loadProfile('bl20a8lm')}" style="
				left: 12px;
				top: 9px;
				width: 67px;
				height: 65px;" />
		</Proxy>
		<Proxy image="thread_actions" className="threadActions" />
		<Proxy image="thread_posts" className="threadPosts">
			<!-- Profiles -->
			<Hotspot onClick="{e => loadProfile('bl20a8lm')}" style="
				left: 7px;
				top: 8px;
				width: 49px;
				height: 1013px;" />
		</Proxy>
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
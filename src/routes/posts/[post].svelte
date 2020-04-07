<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';
    import Hotspot from '../../components/Hotspot.svelte';

	import ThreadPost from '../_components/ThreadPost.svelte';

	import NewPostButton from '../_components/NewPostButton.svelte';

	import { loadProfile } from '../../actions/appActions';

	import {
		postId,
		post,
	} from '../../models/appModel';

	import {
		loadCurrentChannel,
		loadCurrentPost,
	} from '../../actions/appActions';

	import {
		getPost,
	} from '../../models/postsModel';

	loadCurrentChannel();
	loadCurrentPost();

    // let post = writable([]);
	// $: { post = getPost( { postId: $postId, type: 'thread' } ) };

</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView id="thread">
	<div class="content">
		<ThreadPost {post} />
		<!-- <Proxy image="thread_posts" className="threadPosts">
			<Hotspot onClick="{e => loadProfile('bl20a8lm')}" style="
				left: 7px;
				top: 8px;
				width: 49px;
				height: 1013px;" />
		</Proxy> -->
		<!-- <NewPostButton type="thread_reply" /> -->
	</div>
</ScrollView>

<style>
	/* .content :global(.proxyOverlay) {
		position: absolute;
		opacity: 0.5;
	} */

	.content {
		margin-bottom: 40px;
	}

	/* .content :global(.proxyThreadPost) {
		margin-top: 5px;
	} */

	.content :global(.threadPosts) {
		margin-top: 10px;
	}
</style>
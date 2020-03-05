<script>
	import ScrollView from '../../components/ScrollView.svelte';
	import Proxy from '../../components/Proxy.svelte';
</script>

<svelte:head>
	<title>Flock</title>
</svelte:head>

<ScrollView>
	<div class="content">
		<Proxy image="create_project_populate" />
	</div>
</ScrollView>

<style>
	.content {
		margin-bottom: 40px;
	}
</style>
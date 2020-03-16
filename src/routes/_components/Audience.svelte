<script>
    import Button from '../../components/Button.svelte';

	import PublicIcon from "../../assets/icons/public.png";
	import PrivateIcon from "../../assets/icons/private.png";

    export let isPublic = true;
    export let onClick = null;
</script>

<div class="audienceButton">
    <Button className="button" {onClick} icon="{isPublic ? PublicIcon : PrivateIcon}">{isPublic ? 'public' : 'private'}</Button>
</div>

<style>
    .audienceButton :global(.button) {
		padding: 8px;
		padding-right: 29px;

		font-size: 1.1rem;

		color: #333333;
	}
    .audienceButton :global(.icon) {
    	padding-left: 6px;
	}
</style>
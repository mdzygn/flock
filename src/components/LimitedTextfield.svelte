<script>
	import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let value = '';
    export let field;
    export let maxlength;

    export let remainingChars = 0;

    $: { remainingChars = Math.max(0, maxlength - value.length) };

	$: {
		if (value.length > maxlength) {
			value = value.substr(0, maxlength);
		}
	}
	$: {
        if (field) {
            field.addEventListener('keypress', e => checkFieldLimit(e));
        }
	}

	function checkFieldLimit(event) {
		if (value.length >= maxlength) {
            event.preventDefault();
		}
	}
</script>

<textarea bind:value="{value}" bind:this="{field}" on:keypress on:keypress />
<!-- {maxlength}  -->

<style>
</style>
<script>
	import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let value = '';
    export let field = null;
	export let maxlength;

    export let allowOverflow = true;

    export let remainingChars = '';
    export let charsOver = '';

	$: { remainingChars = Math.max(0, maxlength - value.length) };
	$: { charsOver = Math.max(0, value.length - maxlength) };

	$: {
		if (!allowOverflow && value.length > maxlength) {
			value = value.substr(0, maxlength);
		}
	}
	$: {
        if (!allowOverflow && field) {
            field.addEventListener('keypress', e => checkFieldLimit(e));
        }
	}

	function checkFieldLimit(event) {
		if (value.length >= maxlength) {
            event.preventDefault();
		}
	}
</script>

<textarea bind:value="{value}" class:charsOver="{allowOverflow && charsOver}" bind:this="{field}" maxlength="{maxlength && !allowOverflow ? maxlength : ''}" on:keypress on:keypress />

<style>
	.charsOver {
		color: #DF3C3C;
	}
</style>
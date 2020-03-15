<script>
    export let href = null;
    export let onClick = null;

    export let className = '';
    // export let style = null;

    // let hasSlots = $$props.$$slots;
</script>

{#if href}
    <a {href} class="button {className}" on:click={onClick}>
        <slot></slot>
    </a>
{:else}
    <div class="button {className}" on:click={onClick} class:isButton={onClick}>
        <slot></slot>
    </div>
{/if}

<style>
    /* .button {
    } */

    .isButton {
        cursor: pointer;
    }
</style>
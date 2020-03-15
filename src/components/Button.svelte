<script>
    export let href = null;
    export let onClick = null;

    export let className = '';
    // export let style = null;

    export let icon = null;

    // let hasSlots = $$props.$$slots;
</script>

{#if href}
    <a {href} class="button {className}" on:click={onClick}>
        <slot></slot>{#if icon}<div class="iconContainer"><div class="iconInnerContainer">
            <img class="icon" src="{icon}" alt="read more" />
        </div></div>{/if}
    </a>
{:else}
    <div class="button {className}" on:click={onClick} class:isButton={onClick}>
        <slot></slot>{#if icon}<div class="iconContainer"><div class="iconInnerContainer">
            <img class="icon" src="{icon}" alt="read more" />
        </div></div>{/if}
    </div>
{/if}

<style>
    /* .button {
    } */

    .iconContainer {
        display: inline-block;
        vertical-align: middle;
    }

    .iconInnerContainer {
        position: absolute;
        display: flex;
        align-items: center;
        /* position: absolute; */
    }

    .icon {
        position: absolute;
        transform: scale(0.5, 0.5);
        /* vertical-align: middle;
        width: 50%; */
    }

    .isButton {
        cursor: pointer;
    }
</style>
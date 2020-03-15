<script>
    export let href = null;
    export let onClick = null;

    export let className = '';

    export let style = null;
    export let buttonContentStyle = null;
    export let iconStyle = null;

    export let icon = null;

    // let hasSlots = $$props.$$slots;
</script>

{#if href}
    <a {href} class="button {className}" on:click={onClick} {style}>
        <div class="buttonContent" style="{buttonContentStyle}">
            <slot></slot>{#if icon}<div class="iconContainer"><div class="iconInnerContainer">
                <img class="icon" src="{icon}" alt="read more" {iconStyle} />
            </div></div>{/if}
        </div>
    </a>
{:else}
    <div class="button {className}" on:click={onClick} class:isButton={onClick} {style}>
        <div class="buttonContent" style="{buttonContentStyle}">
            <slot></slot>{#if icon}<div class="iconContainer"><div class="iconInnerContainer">
                <img class="icon" src="{icon}" alt="read more" style="{iconStyle}" />
            </div></div>{/if}
        </div>
    </div>
{/if}

<style>
    .button {
        text-decoration: none;
    }

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
        transform-origin: left;
        /* vertical-align: middle;
        width: 50%; */
    }

    .isButton {
        cursor: pointer;
    }
</style>
<script>
    export let href = null;
    export let onClick = null;

    export let className = '';
    export let disabled = false;

    export let title = null;

    export let style = null;
    export let buttonContentStyle = null;
    export let iconStyle = null;

    export let icon = null;

    export let element = null;

    $: {
        onClick;
        checkHref();
    }

    function checkHref() {
        if (typeof onClick === "string") {
            href = onClick;
        }
    }

    // let hasSlots = $$props.$$slots;
</script>

{#if href && !disabled}
    <a {href} bind:this="{element}" class="button {className}" class:disabled="{disabled}" class:activeButton={!disabled &&  onClick} on:click={onClick} {style} {title}>
        <div class="buttonContent" style="{buttonContentStyle}">
            <slot></slot>{#if icon}<div class="iconContainer"><div class="iconInnerContainer">
                <img class="icon" src="{icon}" alt="read more" {iconStyle} />
            </div></div>{/if}
        </div>
    </a>
{:else}
    <div bind:this="{element}" class="button {className}" class:disabled="{disabled}" class:activeButton={!disabled &&  onClick} on:click={!disabled ? onClick : null} {style} {title}>
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

    .activeButton {
        cursor: pointer;
    }

	.disabled {
        cursor: initial;
    	opacity: 0.25;
	}
</style>
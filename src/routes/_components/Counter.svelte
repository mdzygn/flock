<script>
    export let count = 0;
    export let hasNew = false;
    export let visible = true;
</script>

{#if visible}
    <div class="counterContainer">
        <div class="counter" class:hasNew="{hasNew}">{count}</div>
    </div>
{/if}

<style>
    .counterContainer {
		vertical-align: bottom;
		display: inline-block;
		position: relative;
    }

    .counter {
        width: 22px;
        height: 22px;

        font-size: 1.2rem;

        border-radius: 100px;

        color: #444444;
        background-color: #D7D7D7;

		display: flex;
		justify-content: center;
		align-items: center;
    }

    .hasNew {
        color: #FFFFFF;
        background-color: #DF3C3C;
    }
</style>
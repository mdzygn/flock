<script>
</script>

<div class="desktopWarningContainer">
    <div class="message">best viewed on mobile</div>
</div>

<style>
    .desktopWarningContainer {
        display: none;
        position: absolute;
        width: 100%;
    }

	@media (min-width: 480px) and (min-height: 480px) {
        .desktopWarningContainer {
            display: block;
        }
    }

    .message {
        width: 100%;
        bottom: 0;
        position: absolute;
        text-align: center;
        padding-bottom: 12px;
        font-size: 1.3rem;
        color: #999999;
    }
</style>
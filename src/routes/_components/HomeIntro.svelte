<script>
    import locale from '../../locale';

	import Proxy from '../../components/Proxy.svelte';
</script>

<div class="homeIntro">
	<Proxy image="home_intro" className="proxyOverview" />

    <div class="headerRegion">
        <div class="header">
            <div class="title">{@html locale.HOME_INTRO.TITLE}</div>
            <div class="headerText">{@html locale.HOME_INTRO.HEADER_TEXT}</div>
        </div>
    </div>

    <div class="panelContent">
        <div class="introText">{@html locale.HOME_INTRO.INTRO_TEXT}</div>
    </div>
</div>

<style>
	.homeIntro :global(.proxyOverview) {
		position: absolute;
        opacity: 0.5;
    }

    .homeIntro {
        height: 520px;
        background-color: #ffffff;
    }

    .headerRegion {
        position: relative;
        width: 100%;
        height: 243px;
        /* padding-top: 59%; */
        background-image: url('../assets/intro_image.jpg');
        background-size: cover;
        background-position: center;
    }

    .header {
        position: absolute;
        bottom: 0;
        padding-left: 23px;
        padding-bottom: 27px;
        color: #ffffff;
    }

    .title {
        font-size: 3rem;
        font-weight: 700;
        padding-bottom: 3px;
    }

    .headerText {
        font-size: 1.6rem;
        font-weight: 700;
        line-height: 1.8rem;
        padding-bottom: 10px;
    }

    .panelContent {
        padding: 23px 23px;
        padding-right: 54px;
    }

    .introText {
        font-size: 1.4rem;
        line-height: 2rem;
        padding-bottom: 16px;
    }
</style>
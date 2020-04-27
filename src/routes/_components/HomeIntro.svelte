<script>
    import locale from '../../locale';
    import config from '../../config';

    import Button from '../../components/Button.svelte';

    import Proxy from '../../components/Proxy.svelte';

    import promptIds from '../../config/promptIds';

    import MoreArrowIcon from "../../assets/icons/next_arrow.png";
    import DiscoverArrowIcon from "../../assets/icons/discover_arrow_icon.png";

    import { loadProject } from '../../actions/appActions';

    import {
        showPrompt,
    } from '../../actions/appActions';

    function signIn() {
		showPrompt(promptIds.LOG_IN);
    }
    function signUp() {
		showPrompt(promptIds.SIGN_UP);
    }
</script>

<div class="homeIntro">
	<!-- <Proxy image="home_intro" className="proxyOverview" /> -->

    <div class="headerRegion"></div>

    <div class="header">
        <div class="title">{@html locale.HOME_INTRO.TITLE}</div>
        <div class="headerText">{@html locale.HOME_INTRO.HEADER_TEXT}</div>
    </div>

    <div class="panelContent">
        <div class="introText">{@html locale.HOME_INTRO.INTRO_TEXT}</div>
    </div>

    <div class="readMoreContainer">
        <Button className="readMoreButton" onClick="{e => { loadProject(config.FLOCK_PROJECT, { showInfo: true }); }}" icon="{MoreArrowIcon}">{locale.HOME_INTRO.LEARN_MORE}</Button>
    </div>

    <div class="actions">
        <!-- <Button className="readMoreButton" onClick="{e => { loadProject(config.FLOCK_PROJECT, { showInfo: true }); }}" icon="{MoreArrowIcon}">{locale.HOME_INTRO.LEARN_MORE}</Button> -->
        <div class="actionButtonsContainer">
            <Button className="signInButton" onClick="{signIn}">{locale.HOME_INTRO.SIGN_IN}</Button>
            <Button className="signUpButton" onClick="{signUp}">{locale.HOME_INTRO.SIGN_UP}</Button>
        </div>
    </div>

    <div class="discoverIndicatorContainer">
        <Button className="discoverIndicator" icon="{DiscoverArrowIcon}">{locale.HOME_INTRO.DISCOVER}</Button>
    </div>
</div>

<style>
	/* .homeIntro :global(.proxyOverview) {
		position: absolute;
        opacity: 0.5;
    } */

    .homeIntro {
        position: relative;
        /* height: 520px; */
        background-color: #ffffff;
        padding-bottom: 2px;
    }

    .headerRegion {
        position: relative;
        width: 100%;
        padding-top: 35.5%;
        /* height: 200px; */
        /* padding-top: 59%; */
        background-image: url('../assets/intro_image.jpg');
        background-size: cover;
        background-position: center;
    }

    .header {
        /* position: absolute;
        bottom: 0;
        padding-bottom: 27px; */
        padding-top: 18px;
        padding-left: 23px;
        padding-bottom: 21px;
        color: #222222;
        /* color: #ffffff; */
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
    }

    .panelContent {
        padding-left: 23px;
        padding-top: 23px;
        padding-right: 54px;
        padding-bottom: 18px;
    }

    .introText {
        font-size: 1.4rem;
        line-height: 2rem;
    }

    .actions {
        position: relative;
		display: flex;
		justify-content: center;
        /* padding: 0 23px;
        padding-bottom: 6px; */
    }

    .actions {
        position: relative;
        padding: 0 23px;
        padding-bottom: 2px;
    }

    .homeIntro :global(.signUpButton) {
        display: inline-block;
        margin-left: -9px;
        /* margin-left: -6px; */
    }
    .homeIntro :global(.signUpButton .buttonContent) {
        margin: 11px;
        margin-right: 13px;
        margin-left: 6px;
        margin-top: 15px;

        padding: 8px 21px;

        font-size: 1.5rem;
        font-weight: 700;

        background-color: #222222;
        border-radius: 999px;
        color: #ffffff;
    }

    .homeIntro :global(.signInButton) {
        display: inline-block;
        /* margin-left: -9px; */
    }
    .homeIntro :global(.signInButton .buttonContent) {
        margin: 11px;
        margin-right: 13px;
        margin-left: 6px;
        margin-top: 15px;

        padding: 6px 14px;

        font-size: 1.5rem;
        font-weight: 700;

        /* background-color: #222222; */
        border: 2px solid #222222;
        border-radius: 999px;
        color: #222222;
    }

    .readMoreContainer {
        position: relative;
        height: 24px;
    }

    .homeIntro :global(.readMoreButton) {
        position: absolute;
        top: -13px;
        /* top: 12px; */
        right: 15px;

        padding: 10px;
        padding-right: 30px;

        font-size: 1.3rem;
        /* font-size: 1.5rem; */
        font-weight: 700;
    }
    .homeIntro :global(.readMoreButton .icon) {
        padding-left: 13px;
    }

    .discoverIndicatorContainer {
		display: flex;
		justify-content: center;
    }

    .homeIntro :global(.discoverIndicator) {
        padding: 10px;
        padding-bottom: 48px;

        font-size: 1.7rem;
    }
    .homeIntro :global(.discoverIndicator .icon) {
        transform-origin: top;
    }
    .homeIntro :global(.discoverIndicator .iconContainer) {
        display: block;
        position: absolute;
        padding-top: 12px;
        left: 50%;
    }
    .homeIntro :global(.discoverIndicator .iconInnerContainer) {
        justify-content: center;
        align-items: initial;
    }

</style>
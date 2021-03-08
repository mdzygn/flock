<script>
    import locale from '../../locale';
    import config from '../../config';

    import Button from '../../components/Button.svelte';

    import Proxy from '../../components/Proxy.svelte';

    import promptIds from '../../config/promptIds';

    import MoreArrowIcon from "../../assets/icons/next_arrow.png";
    import DiscoverArrowIcon from "../../assets/icons/discover_arrow_icon.png";

	import FilterBar from './../_components/FilterBar.svelte';

    import { loadProject } from '../../actions/appActions';

    import {
        user,
		discoverFilterString,
    } from '../../models/appModel';

    import {
        showPrompt,
    } from '../../actions/appActions';

    export let onDiscoverScrollDown = null;

    $: loggedIn = !!$user;

    function signIn() {
		showPrompt(promptIds.LOG_IN);
    }
    function signUp() {
		showPrompt(promptIds.SIGN_UP);
    }
    function showFlockInfo() {
        loadProject(config.FLOCK_PROJECT, { showInfo: true });
    }
</script>

<div class="homeIntro">
	<!-- <Proxy image="home_intro" className="proxyOverview" /> -->

    <div class="headerRegion button" on:click="{showFlockInfo}"></div>

    <div class="header button" on:click="{showFlockInfo}">
        <div class="title">{@html locale.HOME_INTRO.TITLE}</div>
        <div class="headerText">{@html locale.HOME_INTRO.HEADER_TEXT}</div>
    </div>

    <!-- <div class="panelContent button" on:click="{showFlockInfo}">
        <div class="introText">{@html locale.HOME_INTRO.INTRO_TEXT}</div>
    </div> -->

    <div class="readMoreContainer">
        <Button className="readMoreButton" onClick="{showFlockInfo}" icon="{MoreArrowIcon}">{locale.HOME_INTRO.LEARN_MORE}</Button>
    </div>

    {#if !loggedIn}
        <div class="actions">
            <!-- <Button className="readMoreButton" onClick="{e => { loadProject(config.FLOCK_PROJECT, { showInfo: true }); }}" icon="{MoreArrowIcon}">{locale.HOME_INTRO.LEARN_MORE}</Button> -->
            <div class="actionButtonsContainer">
                <!-- <Button className="signInButton" onClick="{signIn}">{locale.HOME_INTRO.SIGN_IN}</Button> -->
                <Button className="signUpButton" onClick="{signUp}">{locale.HOME_INTRO.SIGN_UP}</Button>
            </div>
        </div>
    {/if}

    <div class="discoverIndicatorContainer">
        <Button className="discoverIndicator" icon="{DiscoverArrowIcon}" onClick="{onDiscoverScrollDown}">{(!loggedIn ? locale.HOME_INTRO.DISCOVER_PREFIX : '') + locale.HOME_INTRO.DISCOVER}</Button>
    </div>

	<FilterBar bind:filterString={$discoverFilterString} />
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

    .homeIntro :global(.filterBar .filterSet .filterButton) {
        padding: 0px 6px;
        margin: 0 9px 0 4px;

        background-color: initial;
    }

    .homeIntro :global(.filterBar .filterSet .filterButton.selectedItem) {
        border-radius: 0;
        border: none;
        border-bottom: 2px solid #242424;
    }

    .button {
        cursor: pointer;
    }

    .headerRegion {
        position: relative;
        width: 100%;
        padding-top: 39%;
        /* padding-top: 35.5%; */
        /* height: 200px; */
        /* padding-top: 59%; */
        background-image: url('https://flock-hub.s3-us-west-2.amazonaws.com/static/intro_image.jpg');
        /* background-image: url('../assets/intro_image.jpg'); */
        background-size: cover;
        background-position: center;
    }

    .header {
        /* position: absolute;
        bottom: 0;
        padding-bottom: 27px; */

        padding-top: 14px;
        padding-left: 23px;
        /* padding-right: 23px; */
        /* padding-bottom: 21px; */

        padding-right: 40px; /* for text wrapping */
        max-width: 295px;

        color: #222222;
        /* color: #ffffff; */
    }

    .title {
        font-size: 2rem;
        line-height: 2.5rem;

        /* font-size: 2.4rem;
        padding-bottom: 5px; */

        font-weight: 700;
        padding-top: 5px;
        padding-bottom: 12px;
    }

    .headerText {
        font-size: 1.6rem;

        line-height: 2.2rem;
        padding-bottom: 6px;

        /* font-weight: 700;
        line-height: 1.8rem; */
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
        padding-bottom: 4px;
        /* padding-bottom: 2px; */
    }

    .homeIntro :global(.signUpButton) {
        display: inline-block;

        /* margin-left: -9px; */
        /* margin-left: -6px; */
    }
    .homeIntro :global(.signUpButton .buttonContent) {
        margin: 11px;
        margin-top: 15px;

        /* margin-right: 13px;
        margin-left: 6px; */

        margin-top: 8px;

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
        /* position: relative;
        height: 24px; */
        padding-bottom: 4px;
    }

    .homeIntro :global(.readMoreButton) {
        /* position: absolute;
        top: -13px;
        right: 15px; */
        /* top: 12px; */

        display: inline-block;

        padding: 10px;
        padding-right: 30px;

        padding-left: 23px;

        font-size: 1.3rem;
        /* font-size: 1.5rem; */
        font-weight: 700;
    }
    .homeIntro :global(.readMoreButton .icon) {
        padding-left: 13px;
        margin-top: -1px;
    }

    .discoverIndicatorContainer {
		display: flex;
		justify-content: center;
        margin-top: -3px;

        /* padding-top: 5px;
        padding-bottom: 10px; */

        padding-bottom: 4px;
        /* padding-bottom: 8px; */
    }

    .homeIntro :global(.discoverIndicator) {
        /* padding: 10px; */
        padding-bottom: 42px;

        font-size: 1.5rem;
        /* font-size: 1.7rem; */
    }
    .homeIntro :global(.discoverIndicator .icon) {
        transform-origin: top;

        transform: scale(0.3, 0.3);
    }
    .homeIntro :global(.discoverIndicator .iconContainer) {
        display: block;
        position: absolute;
        padding-top: 8px;
        left: 50%;
    }
    .homeIntro :global(.discoverIndicator .iconInnerContainer) {
        justify-content: center;
        align-items: initial;
    }

</style>
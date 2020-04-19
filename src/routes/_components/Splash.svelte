<script>
    import config from '../../config';

    import { onMount } from 'svelte';

    import Proxy from '../../components/Proxy.svelte';

    import LogoImage from "../../assets/images/logo.png";
    import TagLineImage from "../../assets/images/splash_tagline.png";
    import HeartImage from "../../assets/images/heart.png";
    import FooterTaglineImage from "../../assets/images/splash_footer_tagline.png";

    let shown = true;
    let timeoutInited = false;

    function hideSplash() {
        shown = false;
    }

    onMount(() => {
        if (!timeoutInited && setTimeout) {
            timeoutInited = true;

            setTimeout(() => {
                hideSplash();
            }, config.SPLASH_TIMEOUT * 1000);
        }
    });
</script>

{#if shown}
    <div class="splash" on:click="{hideSplash}">
        <!-- <Proxy image="splash" className="contentItem proxyOverlay" ></Proxy> -->
        <div class="logoContainer">
            <div class="logo">
                <img class="logoImage" src="{LogoImage}" alt="Flock" />
                <img class="tagLineImage" src="{TagLineImage}" alt="projects that matter" />
            </div>
        </div>
        <div class="footerContainer">
            <div class="footer">
                <img class="heartImage" src="{HeartImage}" alt="Heart Icon" />
                <img class="footerTaglineImage" src="{FooterTaglineImage}" alt="share  ~  connect  ~  collaborate" />
            </div>
        </div>
    </div>
{/if}

<style>
    .splash {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 110;

        background-color: #ffffff;

        cursor: pointer;
    }

	/* .splash :global(.proxyOverlay) {
        position: absolute;
        opacity: 0.5;
	} */

    .logoContainer {
		position: absolute;
		width: 100%;
		height: 100%;

		display: flex;
        flex-direction: column;
		justify-content: center;
		align-items: center;
    }

    .footerContainer {
        position: absolute;
        width: 100%;
        bottom: 23px;

		/* position: absolute;
		width: 100%;
		height: 100%;

		display: flex;
        flex-direction: column;
		justify-content: center;
		align-items: center; */
    }

    .logo {
		display: flex;
        flex-direction: column;
		justify-content: center;
		align-items: center;

        margin-top: -26px;
    }

    .footer {
		display: flex;
        flex-direction: column;
		justify-content: center;
		align-items: center;
    }

    .logoImage {
        display: block;
        width: 223px;
        height: 119px;
    }
    .tagLineImage {
        display: block;
        width: 178px;
        height: 27px;

        margin-top: 22px;
    }

    .heartImage {
        display: block;
        width: 30px;
        height: 27px;
    }
    .footerTaglineImage {
        display: block;
        width: 371px;
        height: 40px;

        margin-top: 16px;
    }
</style>
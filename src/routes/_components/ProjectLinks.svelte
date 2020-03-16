<script>
	import ContentPanel from './ContentPanel.svelte';
	import TagSet from './TagSet.svelte';

	import PatreonButton from "../../assets/icons/patreon_button.png";
	import GitHubButton from "../../assets/icons/github_button.png";

    export let project = null;

    $: links = (project && project.links) || null;
    $: isOwner = (project && project.isOwner) || false;

    $: areMoreItems = false; // links && links.length > 0; // > MAX_PROJECT_PREVIEW_COUNT;

    function getUrlLabel(url) {
        const protocolIndex = url.indexOf('://');
        if (protocolIndex !== -1) {
            return url.substring(protocolIndex + 3);
        } else {
            return url;
        }
    }
    function getUrlHref(url) {
        const protocolIndex = url.indexOf('://');
        if (protocolIndex === -1) {
            return 'https://' + url;
        } else {
            return url;
        }
    }
</script>

{#if links && links.length}
    <div class="content">
        <ContentPanel showEdit="{isOwner}" showMoreAction="{areMoreItems}">
            {#each links as link}
                <div class="linkItem">
                    <div class="linkButtonContainer">
                        {#if link.type === 'patreon'}
                            <a class="linkImageButton patreonButton" href="{getUrlHref(link.url)}" target="_blank"><img src="{PatreonButton}" alt="Become a Patron"></a>
                        {:else if link.type === 'github'}
                            <a class="linkImageButton gitHubButton" href="{getUrlHref(link.url)}" target="_blank"><img src="{GitHubButton}" alt="View on GitHub"></a>
                        {:else}
                            <a href="{getUrlHref(link.url)}" target="_blank">{getUrlLabel(link.url)}</a>
                        {/if}
                    </div>
                    <div class="linkLabel">
                        {#if link.type === 'patreon'}
                            Support on Patreon
                        {:else if link.type === 'github'}
                            Contribute on Github
                        {:else}
                            Visit Website
                        {/if}
                    </div>
                </div>
            {/each}
        </ContentPanel>
    </div>
{/if}

<style>
    .content :global(.panelContent) {
        margin-bottom: -10px;
    }

    .linkItem {
        position: relative;
        padding-top: 4px;
        padding-bottom: 4px;
        margin-bottom: 16px;
    }

    .linkLabel {
        font-size: 1.4rem;
    }

    .linkButtonContainer {
        position: absolute;
        right: 6px;
        font-size: 1.4rem;
    }

    .linkButtonContainer a {
        padding: 10px;
        margin-top: -10px;
        margin-right: -10px;
    }

    .linkImageButton {
        position: absolute;
        right: 0;
    }

    .linkImageButton img {
        width: 100%;
    }

    .patreonButton {
        width: 154.5px;
        height: 36px;

        top: -8px;
    }
    .gitHubButton {
        width: 134px;
        height: 26px;

        top: -4px;
    }
</style>
<script>
	import ContentPanel from './ContentPanel.svelte';
	import TagSet from './TagSet.svelte';

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
                            <a href="{getUrlHref(link.url)}" target="_blank">{getUrlLabel(link.url)}</a>
                        {:else if link.type === 'github'}
                            <a href="{getUrlHref(link.url)}" target="_blank">{getUrlLabel(link.url)}</a>
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
                            View Website
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
        right: 25px;
        font-size: 1.4rem;
    }

    .linkButtonContainer a {
        padding: 10px;
        margin-top: -10px;
        margin-right: -10px;
    }
</style>
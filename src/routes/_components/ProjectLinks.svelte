<script>
	import ContentPanel from './ContentPanel.svelte';
	import TagSet from './TagSet.svelte';

	import PatreonButton from "../../assets/icons/patreon_button.png";
    import GitHubButton from "../../assets/icons/github_button.png";

    import {
        getIsProjectTeamMember,
    } from '../../models/appModel';

    export let project = null;

    const MAX_DISPLAYED_LINK_COUNT = 3;

    $: links = (project && project.links) || null;
    $: isTeamMember = getIsProjectTeamMember(project);

	$: canEdit = (isTeamMember && !project.archived) || false;

    $: areMoreItems = links && links.length > MAX_DISPLAYED_LINK_COUNT;

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
    <div class="content" class:isEditable="{canEdit}">
        <ContentPanel showEdit="{canEdit}" showMoreAction="{areMoreItems}">
            {#each links as link, index}
                {#if index < MAX_DISPLAYED_LINK_COUNT}
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
                                {link.label || 'Visit Website'}
                            {/if}
                        </div>
                    </div>
                {/if}
            {/each}
        </ContentPanel>
    </div>
{/if}

<style>
    .content :global(.panelContent) {
        margin-bottom: -16px;
    }

    .content :global(.showMoreButton) {
        padding-top: 16px;
    }

    .content.isEditable :global(.panelContent) {
        margin-bottom: 27px;
    }

    .content :global(.editButton) {
        top: initial;
        bottom: 5px;
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
        right: 0;
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
<script>
	import { writable } from 'svelte/store';

	import NavIcon from '../_components/NavIcon.svelte';

	import { getMainSections, getIconForSection, getMainSectionForSegment, getMainSectionForRoute, getIdForSection } from '../../models/sectionsModel.js';

	import { project, getIsProjectTeamMember, showBetaFeatures, user } from '../../models/appModel';

	import { projectsUnviewedCount, notificationUnviewedCount } from '../../models/notificationsModel';
	import { conversationsUnviewedCount } from '../../models/conversationsModel';

	import { setNavSection } from '../../actions/appActions';

	export let segment;
	export let path;

	$: isFollowing = $project && ($project.following || $user && getIsProjectTeamMember($project)); // $project.isOwner);

	let mainSections = getMainSections();

	let notificationModels = {
		'activity': notificationUnviewedCount,
		'projects': projectsUnviewedCount,
		'messages': conversationsUnviewedCount,
	};

	export let keyboardShown = false;

	let mainSection;

	$: {
		mainSection = getMainSectionForRoute(segment, path);
		if (/\/projects\/.+/.test(path) && !isFollowing) {
			mainSection = null; // don't select 'following' nav icon if not following or not owner of project
		} else if (/\/channels\/.+/.test(path) && isFollowing) {
			mainSection = 'projects';
		} else if (/\/posts\/.+/.test(path) && isFollowing) {
			mainSection = 'projects';
		}
		// if (mainSection === 'projects' && !isFollowing) {
		// 	mainSection = null;
		// }
		// console.log('mainSection',mainSection);
	}
	// $: mainSection = getMainSectionForSegment(segment);
	// export let path;

	function selectSection() {

	}
</script>

{#if !keyboardShown}
	<nav>
		<ul>
			{#each mainSections as section}
				{#if $showBetaFeatures || !section.betaHidden}
					<li><div class="button" class:disabled="{!$showBetaFeatures && section.beta}" class:active="{mainSection === section.segment}" aria-current="{mainSection === section.segment ? 'page' : undefined}" on:click="{($showBetaFeatures || !section.beta) ? () => setNavSection(section) : null}" title="{section.label}">
						<NavIcon iconId="{getIconForSection(section)}" active="{mainSection === section.segment}" label="{section.label}" notificationModel="{notificationModels[getIdForSection(section)]}" />
						<div class="navLabel">{section.label}</div>
					</div></li>
				{/if}
			{/each}
		</ul>
	</nav>
{/if}

<style>
	nav {
		box-sizing: border-box;

		/* border-bottom: 1px solid rgba(255,62,0,0.1); */
		font-weight: 300;
		padding: 0 10px;

		bottom: 0;
		position: absolute;

		width: 100%;
    	height: 76px;

		background: #ffffff;
		box-shadow: 0 -2px 5px 0 rgba(0,0,0,0.15);
	}

	.button {
		cursor: pointer;

		text-decoration: none;

		position: relative;
		padding: 5px 0 21px 0;
    	/* padding: 10px 0; */

		display: block;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.navLabel {
		position: absolute;
		bottom: 6px;
		font-size: 1rem;
		font-weight: 700;
    	color: #999999;
	}

	.button.active .navLabel {
		color: #333333;
	}

	.disabled {
		cursor: initial;
		opacity: 0.2;
	}

	ul {
		margin: 0;
		padding: 0;

		display: flex;
		justify-content: space-between;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;

  		flex: 1;
	}

	/* [aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: #333333;
		display: block;
		bottom: -1px;
	} */
</style>
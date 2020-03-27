import sections from './sections';

export const getMainSections = () => {
	return sections.filter(section => section.main);
}

export const getIdForSection = (section) => {
	return section.id || section.segment;
}

export const getIconForSection = (section) => {
	return section.iconId || getIdForSection(section);
}

export const getPathForSection = (section) => {
	if (section.id === 'home') {
		return '/';
	}
	const sectionId = getIdForSection(section);
	return section.path || '/' + sectionId;
}

export const getMainSectionForSegment = (segment) => {
	const section = getSectionBySegment(segment);
	return getMainSectionForSection(section);
}
export const getMainSectionForRoute = (segment, path) => {
	let section = getSectionByPath(path);
	if (!section || !section.mainSection) {
		section = getSectionBySegment(segment);
	}
	return getMainSectionForSection(section);
}
export const getMainSectionForSection = (section) => {
	if (section) {
		if (section.mainSection !== undefined) {
			return section.mainSection;
		} else {
			return section.segment;
		}
	} else {
		return null;
	}
}

export const isDarkBgForPath = (path) => {
	const section = getSectionByPath(path);
	return (section && section.darkBg) || false;
}

export const getSectionByPath = (path, appState) => {
	if (appState && path === '/discover' && appState.viewMode === 'explore') {
		path = '/explore';
	}
	if (appState && /\/messages\/.+/.test(path) && appState.viewingGroupConversation) {
		path = '/messages/group';
	}
	if (appState && /\/profile\/.+/.test(path) && !/\/profile\/.+\/.+/.test(path) && appState.viewingOwnProfile) {
		path = '/profile';
	}

	return sections.find(item => {
		let sectionPath = getPathForSection(item);
		return new RegExp('^' + sectionPath + '\/?$').test(path)
	});
}

export const getSectionBySegment = (segment) => {
	return sections.find(item => item.segment === segment);
}
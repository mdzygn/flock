import { objectsMatch } from '../utils';

const loadingRequests = {};

function isLoading(id, options) {
	return !!getLoadingItem(id, options);
}
function getLoadingItem(id, options) {
	return loadingRequests[id] && loadingRequests[id].find(request => objectsMatch(request.options, options));
}
function setLoading(id, options, startCallback) {
	if (!loadingRequests[id]) {
		loadingRequests[id] = [];
	}
	loadingRequests[id].push({options});
	// console.log('add '+ loadingRequests[id].length, JSON.stringify(options));
	if (startCallback) {
		startCallback();
	}
}
function clearLoading(id, options, endCallback) {
	const matchItem = getLoadingItem(id, options);
	if (matchItem) {
		const matchId = loadingRequests[id].indexOf(matchItem);
		loadingRequests[id].splice(matchId, 1);

		// console.log('remove '+ loadingRequests[id].length);
		if (loadingRequests[id].length === 0) {
			// console.log('stopped loading');
			if (endCallback) {
				endCallback();
			}
		}
	}
}

const loadingRequestUtil = {
    isLoading,
    setLoading,
    clearLoading,
}

export default loadingRequestUtil;
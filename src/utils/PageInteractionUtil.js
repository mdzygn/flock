// import { writable, get } from 'svelte/store';

import config from '../config';

// import EventEmitter from 'eventemitter3';

const PageInteractionUtil = {}; // new EventEmitter();

PageInteractionUtil.lastInteractionTime = (new Date()).getTime();

PageInteractionUtil.isActive = function() {
    const curTime = (new Date()).getTime();
    const lastActiveDuration = (curTime - PageInteractionUtil.lastInteractionTime) / 1000;
    const active = lastActiveDuration < config.ACTIVE_INTERACTION_DELAY;
    // console.log('active', active, 'lastActiveDuration', lastActiveDuration);
    return active;
}

// PageInteractionUtil.focused = writable(true);

PageInteractionUtil.init = function() {
	if (typeof window !== 'undefined') {
        window.addEventListener('mousemove', onInteraction);
        window.addEventListener('mousedown', onInteraction);
        window.addEventListener('mouseup', onInteraction);
        window.addEventListener('touchmove', onInteraction);
        window.addEventListener('touchstart', onInteraction);
        window.addEventListener('touchend', onInteraction);
        window.addEventListener('keyup', onInteraction);
        window.addEventListener('scroll', onInteraction);
        window.addEventListener('mousewheel', onInteraction);

        function onInteraction(event) {
            // console.log('onInteraction', event.type);

            PageInteractionUtil.lastInteractionTime = (new Date()).getTime();
        }
	}
}

PageInteractionUtil.init();

export default PageInteractionUtil;
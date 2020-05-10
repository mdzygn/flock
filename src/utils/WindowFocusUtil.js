import { writable, get } from 'svelte/store';

// import EventEmitter from 'eventemitter3';

const WindowFocusUtil = {}; // new EventEmitter();

WindowFocusUtil.focused = writable(true);

WindowFocusUtil.init = function() {
	if (typeof window !== 'undefined') {
        let isFocused = document.hasFocus();
        if (isFocused === undefined) {
            isFocused = true;
        }
        // console.log('init focused ' + isFocused);
        WindowFocusUtil.focused.set(isFocused);

        window.onblur = function(){
            isFocused = false;
            // console.log('blurred ' + isFocused);
            WindowFocusUtil.focused.set(isFocused);
        }
        window.onfocus = function(){
            isFocused = true;
            // console.log('focused ' + isFocused);
            WindowFocusUtil.focused.set(isFocused);
        }
	}
}

WindowFocusUtil.init();

export default WindowFocusUtil;
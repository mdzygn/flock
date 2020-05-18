export const DEBUG = (!!process.env.NODE_ENV.match(/development|staging/));

export const HOSTNAME = (typeof window !== 'undefined') ? window.location.hostname : 'localhost';
export const LOCAL = (!!process.env.NODE_ENV.match(/development/)) && (HOSTNAME === 'localhost' || HOSTNAME === '192.168.1.5');

export const MAIN_USER = 'sl3p5oms';
export const GENERAL_USER = 'bl20a8lm';

export const SITE_CONTENT_URL = (!!process.env.NODE_ENV.match(/development|staging/)) ? 'https://flock-hub-dev.s3-us-west-2.amazonaws.com/' : 'https://flock-hub.s3-us-west-2.amazonaws.com/';
export const USER_CONTENT_URL = (!!process.env.NODE_ENV.match(/development|staging/)) ? 'https://flock-hub-dev-content.s3-us-west-2.amazonaws.com/' : 'https://flock-hub-content.s3-us-west-2.amazonaws.com/';

export const contentFolder = 'content/';
export const projectContentFolder = 'content/projects/';
export const projectHeaderImage = 'header.jpg';

export const headerImageLibraryFolder = 'library/images/';
export const headerImageLibraryThumbFolder = 'library/images/thumbs/';
export const headerImageExtension = '.jpg';

export const CONTENT_IDENTIFIER_PATH = 'content/';

export const MOBILE_DEVICE_MAX_WIDTH = 768;
export const MOBILE_DEVICE_MAX_HEIGHT = 480;

export const MAX_ID_LENGTH = 12;

export const MAX_PROJECT_DESCRIPTION_CHARS = 140;
export const PROJECT_DESCRIPTION_CHARS_LOW = 20;

export const MAX_PROFILE_DESCRIPTION_CHARS = 500;
export const PROFILE_DESCRIPTION_CHARS_LOW = 50;

export const INVALID_FIELD_DELAY = 600;
export const UPDATE_CONTEXT_STRING_DELAY = 600;

export const USER_NAME_MIN_LENGTH = 4;
export const USER_NAME_MAX_LENGTH = 16;

export const RETURN_PROJECT_HEADER_OFFSET = 75; // 100;

export const UPLOAD_MAX_WIDTH = 1024;
export const UPLOAD_MAX_HEIGHT = 4096;
export const UPLOAD_THUMB_MAX_WIDTH = 350;
export const UPLOAD_THUMB_MAX_HEIGHT = 350;

export const PROFILE_UPLOAD_MAX_WIDTH = 512;
export const PROFILE_UPLOAD_MAX_HEIGHT = 512;
export const PROFILE_UPLOAD_THUMB_MAX_WIDTH = 128;
export const PROFILE_UPLOAD_THUMB_MAX_HEIGHT = 128;

export const MAX_PROJECT_PREVIEW_COUNT = 3;
export const MAX_SKILL_TAG_COUNT = 8;

export const SHOW_EDITED_MIN_TIME = 2 * 60;

export const SPLASH_TIMEOUT = 3;

export const FLOCK_PROJECT = 'hPS9cRq2';
export const MAX_FLOCK_PROJECT_INDEX = 4;

export const ITEM_VIEWED_DELAY = 0.33;
export const REPLY_VIEWED_DELAY = 2;
export const CONVERSATIION_VIEWED_DELAY = 0.5;

export const POLL_CHECK_DURATION = 1;

export const ACTIVE_INTERACTION_DELAY = 60; // 30;

export const NOTIFICATION_POLL_DELAY_FOCUSED = 6; // 5; // 1; // 5;
export const NOTIFICATION_POLL_DELAY = 10; // 20; // 3; // 20; // 15;
export const NOTIFICATION_POLL_DELAY_IDLE = 3 * 60;

export const CONVERSATION_POLL_DELAY_FOCUSED = 3; // 4; // 2;
export const CONVERSATION_POLL_DELAY = 5; // 8;
export const CONVERSATION_POLL_DELAY_IDLE = 60;

export const CONVERSATION_MAX_PREVIEW_LENGTH = 32;

export const DATE_SHOWN_MESSAGE_DATE_DIFF = 6 * 3600; // 3600 = seconds/hour

export const MIN_AUTO_SCROLL_BOTTOM_DIST = 200;
export const MIN_HIDE_MESSAGES_BOTTOM_DIST = 60;

export const MAX_IMAGE_UPLOAD_SIZE = {
    'image/gif': 8,
    'image/png': 3,
    'image/jpeg': 2,
};

export default {
    DEBUG,

    HOSTNAME,
    LOCAL,

    MAIN_USER,
    GENERAL_USER,

    SITE_CONTENT_URL,
    USER_CONTENT_URL,

    contentFolder,
    projectContentFolder,
    projectHeaderImage,

    headerImageLibraryFolder,
    headerImageLibraryThumbFolder,
    headerImageExtension,

    CONTENT_IDENTIFIER_PATH,

    MOBILE_DEVICE_MAX_WIDTH,
    MOBILE_DEVICE_MAX_HEIGHT,

    MAX_ID_LENGTH,

    MAX_PROJECT_DESCRIPTION_CHARS,
    PROJECT_DESCRIPTION_CHARS_LOW,

    MAX_PROFILE_DESCRIPTION_CHARS,
    PROFILE_DESCRIPTION_CHARS_LOW,

    INVALID_FIELD_DELAY,
    UPDATE_CONTEXT_STRING_DELAY,

    USER_NAME_MIN_LENGTH,
    USER_NAME_MAX_LENGTH,

    RETURN_PROJECT_HEADER_OFFSET,

    MAX_PROJECT_PREVIEW_COUNT,
    MAX_SKILL_TAG_COUNT,

    SPLASH_TIMEOUT,

    UPLOAD_MAX_WIDTH,
    UPLOAD_MAX_HEIGHT,
    UPLOAD_THUMB_MAX_WIDTH,
    UPLOAD_THUMB_MAX_HEIGHT,

    PROFILE_UPLOAD_MAX_WIDTH,
    PROFILE_UPLOAD_MAX_HEIGHT,
    PROFILE_UPLOAD_THUMB_MAX_WIDTH,
    PROFILE_UPLOAD_THUMB_MAX_HEIGHT,

    FLOCK_PROJECT,
    MAX_FLOCK_PROJECT_INDEX,

    SHOW_EDITED_MIN_TIME,

    MAX_IMAGE_UPLOAD_SIZE,

    ITEM_VIEWED_DELAY,
    REPLY_VIEWED_DELAY,
    CONVERSATIION_VIEWED_DELAY,

    ACTIVE_INTERACTION_DELAY,

    POLL_CHECK_DURATION,

    NOTIFICATION_POLL_DELAY_FOCUSED,
    NOTIFICATION_POLL_DELAY,
    NOTIFICATION_POLL_DELAY_IDLE,

    CONVERSATION_POLL_DELAY_FOCUSED,
    CONVERSATION_POLL_DELAY,
    CONVERSATION_POLL_DELAY_IDLE,

    CONVERSATION_MAX_PREVIEW_LENGTH,

    DATE_SHOWN_MESSAGE_DATE_DIFF,

    MIN_AUTO_SCROLL_BOTTOM_DIST,
    MIN_HIDE_MESSAGES_BOTTOM_DIST,
};
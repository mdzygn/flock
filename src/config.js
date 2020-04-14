export const DEBUG = (process.env.NODE_ENV === 'development');

export const MAIN_USER = 'sl3p5oms';
export const GENERAL_USER = 'bl20a8lm';

export const contentUrl = 'https://flock-hub-dev.s3-us-west-2.amazonaws.com/';

export const contentFolder = 'content/';
export const projectContentFolder = 'content/projects/';
export const projectHeaderImage = 'header.jpg';

export const headerImageLibraryFolder = 'library/images/';
export const headerImageLibraryThumbFolder = 'library/images/thumbs/';
export const headerImageExtension = '.jpg';

export const MAX_ID_LENGTH = 12;

export const MAX_PROJECT_DESCRIPTION_CHARS = 140;
export const PROJECT_DESCRIPTION_CHARS_LOW = 20;

export const MAX_PROFILE_DESCRIPTION_CHARS = 500;
export const PROFILE_DESCRIPTION_CHARS_LOW = 50;

export const INVALID_FIELD_DELAY = 600;
export const UPDATE_CONTEXT_STRING_DELAY = 800;

export const USER_NAME_MIN_LENGTH = 4;
export const USER_NAME_MAX_LENGTH = 16;

export default {
    DEBUG,

    MAIN_USER,
    GENERAL_USER,

    contentUrl,

    contentFolder,
    projectContentFolder,
    projectHeaderImage,

    headerImageLibraryFolder,
    headerImageLibraryThumbFolder,
    headerImageExtension,

    MAX_ID_LENGTH,

    MAX_PROJECT_DESCRIPTION_CHARS,
    PROJECT_DESCRIPTION_CHARS_LOW,

    MAX_PROFILE_DESCRIPTION_CHARS,
    PROFILE_DESCRIPTION_CHARS_LOW,

    INVALID_FIELD_DELAY,
    UPDATE_CONTEXT_STRING_DELAY,

    USER_NAME_MIN_LENGTH,
    USER_NAME_MAX_LENGTH,
};
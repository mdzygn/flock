export const DEBUG = (process.env.NODE_ENV === 'development');

export const MAIN_USER = 'sl3p5oms';
export const GENERAL_USER = 'bl20a8lm';

export const contentFolder = 'content/';
export const projectContentFolder = 'content/projects/';
export const projectHeaderImage = 'header.jpg';

export const headerImageLibraryFolder = 'content/library/headers/';
export const headerImageLibraryThumbFolder = 'content/library/headers/thumbs/';
export const headerImageExtension = '.jpg';

export const MAX_ID_LENGTH = 12;

export const MAX_PROJECT_DESCRIPTION_CHARS = 140;
export const PROJECT_DESCRIPTION_CHARS_LOW = 20;

export const INVALID_FIELD_DELAY = 700;

export default {
    DEBUG,

    MAIN_USER,
    GENERAL_USER,

    contentFolder,
    projectContentFolder,
    projectHeaderImage,

    headerImageLibraryFolder,
    headerImageLibraryThumbFolder,
    headerImageExtension,

    MAX_ID_LENGTH,

    MAX_PROJECT_DESCRIPTION_CHARS,
    PROJECT_DESCRIPTION_CHARS_LOW,

    INVALID_FIELD_DELAY,
};
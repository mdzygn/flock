const NotificationTypes = {
        CHANNEL_ADDED: 'channelAdded',
        CHANNEL_ARCHIVED: 'channelArchived',
            // CHANNEL_REMOVED: 'channelArchived',
        CHANNEL_RENAMED: 'channelRenamed',
        CHANNEL_DESCRIPTION_UPDATED: 'channelDescriptionUpdated',
    POST_ADDED: 'postAdded',
        POST_EDITED: 'postEdited', // moderation
        POST_REMOVED: 'postRemoved', // moderation
        POST_LIKED: 'postLiked',
        PROJECT_ARCHIVED: 'projectArchived',
            // PROJECT_REMOVED: 'projectRemoved',
        PROJECT_FOLLOWED: 'projectFollowed',
        PROJECT_LIKED: 'projectLiked',
        PROJECT_NEW_MESSAGE: 'projectNewMessage',
        PROJECT_MEMBER_ADDED: 'projectMemberAdded',
            // PROJECT_MEMBER_REMOVED: 'projectMemberRemoved',
        PROJECT_RENAMED: 'projectRenamed',
        PROJECT_DESCRIPTION_UPDATED: 'projectDescriptionUpdated',
        PROJECT_HEADER_UPDATED: 'projectHeaderUpdated',
        PROJECT_DETAILS_UPDATED: 'projectDetailsUpdated',
        PROJECT_LOCATION_UPDATED: 'projectLocationUpdated',
        PROJECT_TAGS_UPDATED: 'projectTagsUpdated',
        PROJECT_SKILLS_UPDATED: 'projectSkillsUpdated',
        PROJECT_VISIBILITY_UPDATED: 'projectVisibilityUpdated',
        PROFILE_FOLLOWED: 'profileFollowed',
            // PROFILE_IMAGE_UPDATED: 'profileImageUpdated',
            // PROFILE_COVER_UPDATED: 'profileCoverUpdated',
            // PROFILE_SKILLS_UPDATED: 'profileSkillsUpdated',
            // PROFILE_BIO_UPDATED: 'profileBioUpdated',
}

export default NotificationTypes;
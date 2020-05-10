import config, { DEBUG } from './config';

import { generateId, errorResponse } from '../server/mongo';

import NotificationTypes from '../config/NotificationTypes';

const MAX_NOTIFICATION_TEXT_LENGTH = 24;
const INCLUDE_ACTOR = false;

async function createNotification(db, details, data, res, completedData) {
    if (DEBUG) {
        if (!details.type) {
            errorResponse(res, completedData, {errorMsg: 'createNotification - "type" parameter missing'});
            return -1;
            // throw new Error('"type" parameter missing in call to createNotification', details);
        }
        if (!details.actors) {
            errorResponse(res, completedData, {errorMsg: 'createNotification - "actors" parameter missing'});
            return -1;
            // throw new Error('"actors" parameter missing in call to createNotification', details);
        }
    }

    details.createdAt = (new Date()).getTime();


    // const postTitle = data && data.postTitle;

    let getProjectDetails = false;
    let sendToProjectMembers = false;
    let sendToProjectFollowers = false;
    let getActorDetails = false;
    let getThreadTitle = false;
    let sendToThreadOwner = false;
    let getChannelTitle = false;

    let threadOwnerId = null; // get thread owner


    switch (details.type) {
        case NotificationTypes.POST_ADDED:
            details.isUserAction = true;
            sendToProjectMembers = true;
            sendToProjectFollowers = true;

            getProjectDetails = true;
            getActorDetails = true;
            if (details.threadId) {
                sendToThreadOwner = true;

                getThreadTitle = true;
            } else {
                getChannelTitle = true;
            }
            break;
    }

    let projectTitle = null; // set from project
    let threadTitle = null;
    let channelTitle = null; // 'Questions'; // set from channel

    // details.actors.forEach((actor) => {
    //     actor.username =
    //     actor.name =
    //     actor.avatarImage =
    //     actor.style =  // user style if no avatarImage set
    // });

    // if sendToProjectMembers  // add to users and set projectMembers
    // if sendToProjectFollowers  // add to users
    // add one for each member and follower of project
    // const users = [{
    //     id: 'YRVQ6vOE',
    //     thumb: 'Test User',
    //     isTeamMember: true,
    // }]

    if (getProjectDetails || sendToProjectMembers || sendToProjectFollowers) {
        if (DEBUG) {
            if (!details.projectId) {
                errorResponse(res, completedData, {errorMsg: 'createNotification - "projectId" parameter missing'});
                return -1;
                // throw new Error('"projectId" parameter missing in call to createNotification', details);
            }
        }
    }
    if (sendToThreadOwner) {
        if (DEBUG) {
            if (!details.threadId) {
                errorResponse(res, completedData, {errorMsg: 'createNotification - "threadId" parameter missing'});
                return -1;
                // throw new Error('"projectId" parameter missing in call to createNotification', details);
            }
        }
    }

    let targetUserIds = [];
    let projectMembers = [];
    // projectMembers = ['YRVQ6vOE'];

    if (getProjectDetails || sendToProjectMembers) {
        const projectFilter = { id: details.projectId };
        const projectResult = await db.collection('projects').findOne(projectFilter);

        if (projectResult) {
            if (getProjectDetails) {
                projectTitle = projectResult.title;
                projectMembers = projectResult.team;
            }

            if (sendToProjectMembers) {
                targetUserIds = [...targetUserIds, ...projectMembers];
            }
        } else {
            errorResponse(res, completedData, {errorMsg: 'createNotification - project not found'});
            return -1;
        }
    }

    if (sendToProjectFollowers) {
        const userProjectFilter = { "projectId": details.projectId };

        const followsResult = await db.collection('follows').find(userProjectFilter).toArray();
        if (followsResult) {
            const projectFollowers = followsResult.map((follow) => follow.userId);

            projectFollowers.forEach((follower) => {
                if (!targetUserIds.includes(follower)) {
                    targetUserIds.push(follower);
                }
            });

            // console.log('projectFollowers', projectFollowers);
        } else {
            errorResponse(res, completedData, {errorMsg: 'createNotification - project not found'});
            return -1;
        }
    }

    if (sendToThreadOwner) {
        const threadFilter = { id: details.threadId };
        const threadResult = await db.collection('posts').findOne(threadFilter);

        if (threadResult) {
            threadOwnerId = threadResult.userId;

            if (!targetUserIds.includes(threadOwnerId)) {
                targetUserIds.push(threadOwnerId);
            }
        } else {
            errorResponse(res, completedData, {errorMsg: 'createNotification - thread not found'});
            return -1;
        }
    }

    let actorIds = [];
    if (getActorDetails) {
        actorIds = details.actors.map((actor) => actor.id);
        const usersFilter = { id: { $in: actorIds } };
        const actorResults = await db.collection('users').find(usersFilter).toArray();

        if (actorResults) {
            details.actors = actorResults.map((actor) => {
                const newActor = {
                    id: actor.id,
                    username: actor.username,
                    avatarImage: actor.avatarImage,
                    name: actor.name || actor.fullName,
                };
                if (!actor.avatarImage) {
                    newActor.style = actor.style;
                }
                return newActor;
            })
        } else {
            errorResponse(res, completedData, {errorMsg: 'createNotification - actors not found'});
            return -1;
        }
    }

    if (getThreadTitle) {
        const threadFilter = { id: details.threadId };
        const threadResult = await db.collection('posts').findOne(threadFilter);

        if (threadResult) {
            threadTitle = threadResult.title || threadResult.message;
            if (threadTitle && threadTitle.length > MAX_NOTIFICATION_TEXT_LENGTH) {
                threadTitle = threadTitle.substring(0, MAX_NOTIFICATION_TEXT_LENGTH);
            }
        } else {
            errorResponse(res, completedData, {errorMsg: 'createNotification - thread post not found'});
            return -1;
        }
    }

    if (getThreadTitle && !threadTitle) {
        getChannelTitle = true;
    }

    if (getChannelTitle) {
        const channelFilter = { id: details.channelId };
        const channelResult = await db.collection('channels').findOne(channelFilter);

        if (channelResult) {
            channelTitle = channelResult.title;
        } else {
            errorResponse(res, completedData, {errorMsg: 'createNotification - channel not found'});
            return -1;
        }
    }

    var allResults = [];

    let curUserId;
    let curDetails;
    let isThreadOwner;
    let isProjectMember;

    for (let userI = 0; userI < targetUserIds.length; userI++) {
        curUserId = targetUserIds[userI];

        // console.log(actorIds, curUserId);
        if (!actorIds.includes(curUserId) || INCLUDE_ACTOR) {
            curDetails = JSON.parse(JSON.stringify(details));
            curDetails.userId = curUserId;

            isProjectMember = projectMembers.includes(curUserId);

            curDetails.id = generateId(16);

            // curDetails.message = null;

            switch (curDetails.type) {
                case NotificationTypes.POST_ADDED:
                    if (curDetails.threadId) {
                        isThreadOwner = (curUserId === threadOwnerId);
                        if (!isThreadOwner && !isProjectMember) {
                            curDetails.notPriority = true;
                            // continue; // skip if not thread owner or not member of project
                        }
                    }
                    // if (curDetails.threadId) {
                    //     isThreadOwner = (curUserId === threadOwnerId);
                    //     if (isThreadOwner || isProjectMember) {
                    //         if (threadTitle) {
                    //             curDetails.message = 'replied to "' + threadTitle + '"';
                    //         } else if (channelTitle) {
                    //             curDetails.message = 'replied to a post in #' + channelTitle + '';
                    //         } else {
                    //             curDetails.message = 'replied to a post';
                    //         }
                    //     } else {
                    //         curDetails.notPriority = true;
                    //         // continue; // skip if not thread owner or not member of project
                    //     }
                    // } else if (curDetails.channelId) {
                    //     if (channelTitle) {
                    //         curDetails.message = 'added a post to #' + channelTitle + '';
                    //     } else {
                    //         curDetails.message = 'added a post';
                    //     }
                    // } else {
                    //     curDetails.message = 'posted an update';
                    // }

                    break;
            }

            if (!curDetails.notPriority) {
                if (projectTitle) {
                    curDetails.projectTitle = projectTitle;
                }
                if (threadTitle) {
                    curDetails.threadTitle = threadTitle;
                }
                if (channelTitle) {
                    curDetails.channelTitle = channelTitle;
                }
            }

            // if (DEBUG && !curDetails.message && !curDetails.notPriority) {
            //     throw new Error('no message set in createNotification', curDetails);
            // }

            const curResult = db.collection('notifications').insertOne(curDetails);
            allResults.push(curResult);
        }
    }

    const result = await Promise.all(allResults).then((values) => {
        let failed = false;

        let lastResult = true;
        values.forEach((curResult, index) => {
            // console.log('result ' + index, curResult);
            if (!curResult) {
                failed = true;
            }
            lastResult = curResult;
        });
        if (failed) {
            return null;
        } else {
            return lastResult;
        }
    });

    return result;
}

export default createNotification;